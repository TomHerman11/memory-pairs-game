<template>
  <v-container class="pt-0">
    <v-row justify="space-around">
      <v-col v-for="(card, index) in cards" :key="index" cols="auto">
        <Card :cardInfo="card" @cardClicked="handleCardClicked" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as _ from "lodash";
import Card from "./Card";
import * as Utils from "../assets/Utils";

const TIME_WRONG_GUESS_HIDE_CARDS = 900;

export default {
  name: "CardsBoard",

  components: {
    Card,
  },

  props: {
    groupSize: {
      type: Number,
      required: true,
    },

    numberOfGroups: {
      type: Number,
      required: true,
    },

    watchShouldRestart: {
      type: Number,
      required: true,
    },
  },

  data: function () {
    return {
      cards: [],
      session: [], // Holds the cards that are clicked within one session
    };
  },

  mounted() {
    this.createAndshuffleCards();
  },

  watch: {
    watchShouldRestart() {
      this.restartBoard();
    },
  },

  methods: {
    createAndshuffleCards() {
      const shuffledCardsBuilder = [];
      const shuffledImages = Utils.getShuffledAnimalsFiles();

      if (this.numberOfGroups <= shuffledImages.length) {
        // emit the first image to parent component, will present the image:
        this.emitFirstImageName(
          shuffledImages.length ? shuffledImages[0] : undefined
        );

        // make groups of cards with the same groupId:
        for (let groupId = 0; groupId < this.numberOfGroups; groupId++) {
          for (
            let groupInternalId = 0;
            groupInternalId < this.groupSize;
            groupInternalId++
          ) {
            shuffledCardsBuilder.push(
              Utils.CardFactory(groupId, shuffledImages[groupId])
            );
          }
        }
      }

      const shuffledCards = _.shuffle(shuffledCardsBuilder);
      for (let i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i].cardIndex = i;
      }

      this.cards = shuffledCards;
    },

    handleCardClicked(cardInfo) {
      if (cardInfo.isShow) return;

      // First, show the card:
      this.cards.splice(cardInfo.cardIndex, 1, {
        ...this.cards[cardInfo.cardIndex],
        isShow: true,
      });

      if (_.isEmpty(this.session)) {
        this.session.push(cardInfo);
      } else if (this.session.length < this.groupSize) {
        const lastInSession = _.last(this.session);
        this.session.push(cardInfo);

        if (cardInfo.groupId !== lastInSession.groupId) {
          this.clearFailedSession();
          return;
        }
      }

      // A match is found!
      if (this.session.length === this.groupSize) {
        this.session = [];
        this.emitMoveMade();
        this.emitMatchFound();
      }
      return;
    },

    clearFailedSession() {
      const cardsToClear = this.session;
      this.session = [];

      setTimeout(() => {
        while (cardsToClear.length) {
          const cardInfo = cardsToClear.pop();
          this.cards.splice(cardInfo.cardIndex, 1, {
            ...this.cards[cardInfo.cardIndex],
            isShow: false,
          });
        }

        this.emitMoveMade();
      }, TIME_WRONG_GUESS_HIDE_CARDS);
    },

    emitMoveMade() {
      this.$emit("moveMade");
    },

    emitMatchFound() {
      this.$emit("matchFound");
    },

    emitFirstImageName(imageName) {
      if (imageName) {
        this.$emit("emitFirstImageName", { imageName });
      }
    },

    restartBoard() {
      this.cards = [];
      this.session = [];
      this.createAndshuffleCards();
    },
  },
};
</script>
