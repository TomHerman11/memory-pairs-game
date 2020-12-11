<template>
  <v-dialog v-model="showDialog" max-width="420">
    <v-card>
      <v-card-title class="justify-center"> WELL DONE! </v-card-title>

      <v-card-text>
        <div class="pb-2">What now?</div>
        <div>1. Restart the game, or:</div>
        <div>2. Change the game settings and start a new game.</div>
      </v-card-text>
      <v-card-text class="text-center">
        <div>You are welcome to visit the source code of this project at:</div>
        <div>
          <a
            href="https://github.com/TomHerman11/memory-pairs-game"
            target="_blank"
          >
            https://github.com/TomHerman11/memory-pairs-game
          </a>
        </div>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="green darken-1" text @click="showDialog = false">
          Thank you
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GameCompletedMessage",

  props: {
    showCompletedMessage: {
      type: Boolean,
      required: true,
    },
  },

  data: function () {
    return {
      showDialog: this.showCompletedMessage,
    };
  },

  watch: {
    showCompletedMessage(val) {
      console.log("'showCompletedMessage' changed!");
      this.showDialog = val;
    },
  },
};
</script>
