<template>
  <v-container fluid class="teal darken-2">
    <v-row no-gutters>
      <v-col :cols="3">
        <v-card color="rgb(255,255,255,0.7)">
          <v-card-title class="justify-center">
            Matching {{ groupSizeAsString }}
          </v-card-title>
          <v-card-title class="justify-center">
            Matches found: {{ matchesFound }} / {{ numberOfGroups }}
          </v-card-title>
          <v-card-title class="justify-center">
            Moves: {{ movesMade }}
          </v-card-title>
          <v-card-title class="justify-center">
            <Timer
              :tick="matchesFound < numberOfGroups"
              :watchShouldRestart="gamesPlayed"
            />
          </v-card-title>
          <v-card-actions class="justify-center">
            <SettingsMenu
              :numberOfGroups="numberOfGroups"
              :groupSize="groupSize"
              @settingsChanged="applyNewSettings"
            />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col :cols="9">
        <CardsBoard
          :numberOfGroups="numberOfGroups"
          :groupSize="groupSize"
          @moveMade="increaseMovesMade"
          @matchFound="increaseMatchFound"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardsBoard from "./CardsBoard";
import SettingsMenu from "./SettingsMenu";
import Timer from "./Timer";
import * as Utils from "../assets/Utils";

const DEFAULT_GROUP_SIZE = 2;
const DEFAULT_NUMBER_OF_GROUPS = 5;

export default {
  name: "MemoryGame",

  components: {
    // StartMenu,
    CardsBoard,
    SettingsMenu,
    Timer,
  },

  data: function () {
    return {
      isDialogOpen: false,
      groupSize: DEFAULT_GROUP_SIZE,
      numberOfGroups: DEFAULT_NUMBER_OF_GROUPS,
      movesMade: 0,
      matchesFound: 0,
      gamesPlayed: 0,
    };
  },

  computed: {
    groupSizeAsString() {
      return Utils.getGroupSizeAsString(this.groupSize);
    },
  },

  methods: {
    increaseMovesMade() {
      this.movesMade += 1;
    },

    increaseMatchFound() {
      this.matchesFound += 1;
    },

    applyNewSettings({ newNumberOfGroups, newGroupSize }) {
      this.groupSize = newGroupSize;
      this.numberOfGroups = newNumberOfGroups;
      this.gamesPlayed += 1;
    },
  },
};
</script>
