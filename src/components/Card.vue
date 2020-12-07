<template>
  <v-card>
    <v-img
      :aspect-ratio="9 / 16"
      :width="70"
      :src="require('../assets/card-background.jpg')"
    ></v-img>

    <v-card-title v-if="shouldReveal">
      {{ id }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "Card",

  props: {
    id: {
      type: Number,
      required: true,
    },
    shouldReveal: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
