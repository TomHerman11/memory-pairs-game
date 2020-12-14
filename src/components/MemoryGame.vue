<template>
  <div class="mainScreen">
    <div>
      <v-card color="rgb(255,255,255,0.7)" class="mainMenu">
        <v-card-title class="justify-center">
          Matching: {{ groupSizeAsString }}
        </v-card-title>

        <v-card-title class="justify-center">
          Matches found: {{ matchesFound }} / {{ numberOfGroups }}
        </v-card-title>

        <div class="statsContainer">
          <v-card-title class="justify-center">
            Moves: {{ movesMade }}
          </v-card-title>

          <v-card-title class="justify-center">
            <Timer
              :tick="matchesFound < numberOfGroups"
              :watchShouldRestart="gamesPlayed"
            />
          </v-card-title>
        </div>

        <v-card-actions class="statsContainer">
          <v-btn @click="restartGame" class="restartButton" color="secondary">
            Restart
          </v-btn>
          <SettingsMenu
            :numberOfGroups="numberOfGroups"
            :groupSize="groupSize"
            @settingsChanged="applyNewSettings"
          />
        </v-card-actions>
      </v-card>
      <div class="text--secondary my-2">
        Images credit:
        <a href="http://www.freepik.com">Designed by brgfx / Freepik</a>
      </div>
    </div>

    <div>
      <CardsBoard
        :numberOfGroups="numberOfGroups"
        :groupSize="groupSize"
        :watchShouldRestart="gamesPlayed"
        @moveMade="increaseMovesMade"
        @matchFound="increaseMatchFound"
        @emitFirstImageName="setMainImageName"
      />
    </div>

    <div>
      <GameCompletedMessage
        :showCompletedMessage="matchesFound === numberOfGroups"
        :imageName="mainImageName"
      />
    </div>
  </div>
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

<style scoped>
.mainScreen {
  display: flex;
  margin-left: 1vw;
  margin-right: 1vw;
  margin-top: 2vh;
}

.statsContainer {
  display: flex;
}

@media screen and (orientation: portrait) {
  .mainScreen {
    flex-direction: column;
  }

  .statsContainer {
    flex-direction: row;
    justify-content: center;
  }

  .restartButton {
    margin-right: 10vw;
  }
}

@media screen and (orientation: landscape) {
  .mainScreen {
    flex-direction: row;
  }

  .statsContainer {
    flex-direction: column;
  }

  .mainMenu {
    width: 25vw;
  }

  .restartButton {
    margin-bottom: 2vh;
  }
}
</style>
