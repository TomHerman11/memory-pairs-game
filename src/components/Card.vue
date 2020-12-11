<template>
  <v-card hover :width="70" :height="90" @click="emitCardClicked">
    <div v-if="cardInfo.isShow">
      <v-img :src="getImageUrl()"></v-img>
    </div>
    <div v-else>
      <v-img
        src="../assets/images/card-background.jpg"
        alt="background"
      ></v-img>
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

    getImageUrl() {
      console.log(this.cardInfo.imageFileName);
      return require(`../assets/images/${this.cardInfo.imageFileName}`);
    },
  },
};
</script>
