<template>
  <v-row justify="center">
    <v-dialog v-model="isDialogOpen" max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Start game
        </v-btn>
      </template>
      <v-card>
        <v-card-title> Select the number of pairs of cards </v-card-title>
        <v-card-text>
          <v-select
            v-model="numberOfPairs"
            :items="numberOfPairsRange"
            label="Pairs of cards"
            class="shrink"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="startSettingsSelected">
            Start
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import * as _ from "lodash";

const MAX_NUMBER_OF_PAIRS = 25;

export default {
  name: "StartMenu",

  props: {
    parentSetStartSettings: {
      type: Function,
      required: true,
    },
  },

  data: function () {
    return {
      numberOfPairs: 1,
      isDialogOpen: false,
    };
  },

  computed: {
    numberOfPairsRange: function () {
      return _.range(2, MAX_NUMBER_OF_PAIRS + 1);
    },
  },

  methods: {
    setNumberOfCards(numSelected) {
      this.numberOfPairs = numSelected;
    },

    startSettingsSelected() {
      // close the dialog:
      this.isDialogOpen = false;

      this.parentSetStartSettings({
        numberOfPairs: this.numberOfPairs,
      });
    },
  },
};
</script>
