<template>
  <v-container>
    <v-row v-for="(row, rowIndex) in cardsMatrix" :key="rowIndex">
      <v-col v-for="(col, colIndex) in row" :key="colIndex">
        <Card :id="col.id" :shouldReveal="col.shouldReveal" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as _ from "lodash";
import Card from "./Card";

const MINIMUM_CARDS_IN_FULL_ROW = 4;
const MAX_NUMBER_OF_FULL_ROWS = 3;

export default {
  name: "CardsBoard",

  components: {
    Card,
  },

  props: {
    numberOfPairs: {
      type: Number,
      required: true,
    },
  },

  computed: {
    cardsMatrix() {
      const numberOfFullRows = Math.min(
        MAX_NUMBER_OF_FULL_ROWS,
        Math.floor((this.numberOfPairs * 2) / MINIMUM_CARDS_IN_FULL_ROW)
      );

      const numberOfColumns = Math.floor(
        (this.numberOfPairs * 2) / numberOfFullRows
      );

      const cards = [];
      for (let i = 0; i < this.numberOfPairs; i++) {
        const cardInfo = {
          id: i,
          shouldReveal: true,
        };

        // Insert 2 cards with the same "id"
        cards.push(cardInfo);
        cards.push(cardInfo);
      }

      const shuffledCards = _.shuffle(cards);
      const cardsMatrixBuilder = [];
      let shuffledCardsIndex = 0;

      for (let i = 0; i < numberOfFullRows; i++) {
        cardsMatrixBuilder.push([]);
        for (let j = 0; j < numberOfColumns; j++) {
          cardsMatrixBuilder[i].push(shuffledCards[shuffledCardsIndex]);
          shuffledCardsIndex++;
        }
      }

      // add a not-always-full last row:
      if (shuffledCardsIndex < shuffledCards.length) {
        const finalRow = cards.slice(shuffledCardsIndex);
        cardsMatrixBuilder.push(finalRow);
      }

      console.log(cardsMatrixBuilder);
      return cardsMatrixBuilder;
    },
  },
};
</script>
