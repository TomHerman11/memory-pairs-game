<template>
  <v-container>
    <v-row>
      <v-col v-for="(card, index) in cards" :key="index">
        <Card :cardInfo="card" @cardClicked="handleCardClicked" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as _ from "lodash";
import Card from "./Card";
import * as cardUtils from "../assets/CardUtils";

export default {
  name: "CardsBoard",

  components: {
    Card,
  },

  props: {
    numberOfGroups: {
      // group can be just a pair or greater
      type: Number,
      required: true,
    },

    groupSize: {
      // 2 for a pair, can be greater
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
    this.cards = this.createAndshuffleCards();
  },

  methods: {
    createAndshuffleCards() {
      const shuffledCardsBuilder = [];
      for (let groupId = 0; groupId < this.numberOfGroups; groupId++) {
        for (
          let groupInternalId = 0;
          groupInternalId < this.groupSize;
          groupInternalId++
        ) {
          shuffledCardsBuilder.push(cardUtils.CardFactory(groupId));
        }
      }

      const shuffledCards = _.shuffle(shuffledCardsBuilder);
      for (let i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i].cardIndex = i;
      }
      return shuffledCards;
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

      if (this.session.length === this.groupSize) {
        this.session = [];
      }
      return;
    },

    clearFailedSession() {
      console.log("clearing failed session:", this.session);
      setTimeout(() => {
        while (this.session.length) {
          const cardInfo = this.session.pop();
          this.cards.splice(cardInfo.cardIndex, 1, {
            ...this.cards[cardInfo.cardIndex],
            isShow: false,
          });
        }
      }, 500);
    },
  },
};
</script>
