<template>
  <v-container fluid class="light-blue lighten-4">
    <v-row no-gutters>
      <v-col :cols="3">
        <v-card color="rgb(255,255,255,0.7)">
          <v-card-title class="justify-center">
            Matching: {{ groupSizeAsString }}
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

          <v-card-actions class="flex-column justify-center">
            <v-btn @click="restartGame" class="mb-2" color="secondary">
              Restart
            </v-btn>
            <SettingsMenu
              :numberOfGroups="numberOfGroups"
              :groupSize="groupSize"
              @settingsChanged="applyNewSettings"
            />
          </v-card-actions>
        </v-card>
        <div class="text--secondary">
          Images credit:
          <a href="http://www.freepik.com">Designed by brgfx / Freepik</a>
        </div>
      </v-col>
      <v-col :cols="9">
        <CardsBoard
          :numberOfGroups="numberOfGroups"
          :groupSize="groupSize"
          :watchShouldRestart="gamesPlayed"
          @moveMade="increaseMovesMade"
          @matchFound="increaseMatchFound"
          @emitFirstImageName="setMainImageName"
        />
      </v-col>
    </v-row>
    <v-row>
      <GameCompletedMessage
        :showCompletedMessage="matchesFound === numberOfGroups"
        :imageName="mainImageName"
      />
    </v-row>
  </v-container>
</template>

<script>
import CardsBoard from "./CardsBoard";
import SettingsMenu from "./SettingsMenu";
import Timer from "./Timer";
import GameCompletedMessage from "./GameCompletedMessage";
import * as Utils from "../assets/Utils";

const DEFAULT_GROUP_SIZE = 2;
const DEFAULT_NUMBER_OF_GROUPS = 5;

export default {
  name: "MemoryGame",

  components: {
    CardsBoard,
    SettingsMenu,
    Timer,
    GameCompletedMessage,
  },

  data: function () {
    return {
      isDialogOpen: false,
      groupSize: DEFAULT_GROUP_SIZE,
      numberOfGroups: DEFAULT_NUMBER_OF_GROUPS,
      movesMade: 0,
      matchesFound: 0,
      gamesPlayed: 0,
      mainImageName: "",
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

    setMainImageName({ imageName }) {
      this.mainImageName = imageName;
    },

    applyNewSettings({ newNumberOfGroups, newGroupSize }) {
      this.groupSize = newGroupSize;
      this.numberOfGroups = newNumberOfGroups;

      this.restartGame();
    },

    restartGame() {
      this.movesMade = 0;
      this.matchesFound = 0;
      this.gamesPlayed += 1;
    },
  },
};
</script>
