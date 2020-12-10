<template>
  <v-container fluid class="teal darken-2">
    <v-row no-gutters>
      <v-col :cols="3">
        <StartMenu :parentSetStartSettings="setStartSettings" />
      </v-col>
      <v-col :cols="8">
        <CardsBoard :numberOfGroups="4" :groupSize="3" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StartMenu from "./StartMenu";
import CardsBoard from "./CardsBoard";

export default {
  name: "MemoryGame",

  components: {
    StartMenu,
    CardsBoard,
  },

  data: function () {
    return {
      numberOfPairs: 2,
      isDialogOpen: false,
    };
  },

  methods: {
    setStartSettings(settings) {
      this.numberOfPairs = settings.numberOfPairs;
    },
  },
};
</script>
