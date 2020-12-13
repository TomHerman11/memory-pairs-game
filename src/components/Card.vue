<template>
  <v-card hover :width="cardSize" :height="cardSize" @click="emitCardClicked">
    <div class="pa-0">
      <div v-if="cardInfo.isShow">
        <v-img :src="getImageUrl()" class="rounded"></v-img>
      </div>
      <div v-else>
        <v-img
          src="../assets/images/card-background.jpg"
          alt="background"
          class="rounded"
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

  data: function () {
    return {
      cardSize: 130,
    };
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
