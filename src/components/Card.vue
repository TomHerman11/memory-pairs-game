<template>
  <v-card
    hover
    width="130"
    height="130"
    @click="emitCardClicked"
    class="justify-center"
  >
    <div class="pa-0 center-content">
      <v-spacer></v-spacer>
      <div v-if="cardInfo.isShow">
        <v-img
          :src="getImageUrl()"
          class="rounded"
          max-width="130px"
          max-height="130px"
          width="auto"
          height="auto"
        ></v-img>
      </div>
      <div v-else>
        <v-img
          src="../assets/images/card-background.jpg"
          alt="background"
          class="rounded"
          max-width="130px"
          max-height="130px"
        ></v-img>
      </div>
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
      return require(`../assets/images/${this.cardInfo.imageFileName}`);
    },
  },
};
</script>

<style>
.center-content {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>