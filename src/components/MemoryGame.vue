<template>
  <v-container fluid class="teal darken-2">
    <v-row no-gutters>
      <v-col :cols="3">
        <v-card color="rgb(255,255,255,0.7)">
          <v-card-title class="justify-center">
            Matching: {{ groupSizeAsString }}
          </v-card-title>
          <v-card-title class="justify-center">
            Number of {{ groupSizeAsString }}: {{ numberOfGroups }}
          </v-card-title>
          <v-card-title class="justify-center">
            <Timer :tick="true" />
          </v-card-title>
        </v-card>

        <!-- <StartMenu :parentSetStartSettings="setStartSettings" /> -->
      </v-col>
      <v-col :cols="9">
        <CardsBoard :numberOfGroups="numberOfGroups" :groupSize="groupSize" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import StartMenu from "./StartMenu";
import CardsBoard from "./CardsBoard";
import Timer from "./Timer";

export default {
  name: "MemoryGame",

  components: {
    // StartMenu,
    Timer,
    CardsBoard,
  },

  data: function () {
    return {
      numberOfGroups: 10,
      groupSize: 2,
      isDialogOpen: false,
    };
  },

  computed: {
    groupSizeAsString() {
      const groupSizes = {
        2: "pairs",
        3: "triplets",
        4: "quartets",
      };

      return groupSizes[this.groupSize]
        ? groupSizes[this.groupSize]
        : `${this.groupSize}-of-a-kind`;
    },
  },

  methods: {
    setStartSettings(settings) {
      this.numberOfPairs = settings.numberOfPairs;
    },
  },
};
</script>
