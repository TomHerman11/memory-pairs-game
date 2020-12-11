<template>
  <v-dialog v-model="shouldShowDialog" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Game Settings
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Game Settings</v-card-title>
      <v-card-text>
        <v-select
          v-model="newGroupSize"
          :items="groupSizeRange"
          label="Group size"
        ></v-select>
      </v-card-text>
      <v-card-text>
        <v-select
          v-model="newNumberOfGroups"
          :items="numberOfGroupsRange"
          label="Number of groups"
          class="shrink"
        ></v-select>
      </v-card-text>
      <v-card-text>
        Total number of cards: {{ newGroupSize * newNumberOfGroups }}
      </v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" text @click="settingsNotChanged">
          Resume
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          :disabled="
            newNumberOfGroups == numberOfGroups && newGroupSize == groupSize
          "
          text
          @click="emitSettingsChanged"
        >
          Start new game
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as _ from "lodash";
import * as Utils from "../assets/Utils";

// (A pair is a GROUP of size 2)
const MIN_NUMBER_OF_GROUPS = 2;
const MAX_NUMBER_OF_GROUPS = 20;

const MIN_GROUP_SIZE = 2;
const MAX_GROUP_SIZE = 7;

export default {
  name: "SettingsMenu",

  props: {
    numberOfGroups: {
      type: Number,
      required: true,
    },

    groupSize: {
      type: Number,
      required: true,
    },
  },

  data: function () {
    return {
      shouldShowDialog: false,
      newNumberOfGroups: this.numberOfGroups,
      newGroupSize: this.groupSize,
    };
  },

  computed: {
    groupSizeRange() {
      return _.map(_.range(MIN_GROUP_SIZE, MAX_GROUP_SIZE + 1), (size) => {
        return {
          value: size,
          text: _.capitalize(Utils.getGroupSizeAsString(size)),
        };
      });
    },

    numberOfGroupsRange() {
      return _.range(MIN_NUMBER_OF_GROUPS, MAX_NUMBER_OF_GROUPS + 1);
    },
  },

  methods: {
    settingsNotChanged() {
      this.shouldShowDialog = false;
    },

    emitSettingsChanged() {
      this.shouldShowDialog = false;
      this.$emit("settingsChanged", {
        newNumberOfGroups: this.newNumberOfGroups,
        newGroupSize: this.newGroupSize,
      });
    },
  },
};
</script>
