<template>
  <v-card hover :width="70" :height="90" @click="emitCardClicked">
    <div v-if="cardInfo.isShow">
      {{ cardInfo.groupId }}
    </div>
    <div v-else>
      <v-img :src="require('../assets/card-background.jpg')"></v-img>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Card",

  props: {
    cardInfo: {
      type: Object,
      required: true,
    },
  },

  methods: {
    emitCardClicked() {
      this.$emit("cardClicked", this.cardInfo);
    },
  },
};
</script>
