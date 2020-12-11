<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      short
      hide-on-scroll
      class="text-center"
    >
      <v-spacer></v-spacer>
      <h1>Memory Game</h1>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="light-blue lighten-4">
      <MemoryGame />
      <div id="imagesCredit" class="text--secondary">
        Images credit:
        <a href="http://www.freepik.com">Designed by brgfx / Freepik</a>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import MemoryGame from "./components/MemoryGame";

export default {
  name: "App",

  components: {
    MemoryGame,
  },
};
</script>


<style scoped>
#imagesCredit {
  font-size: 0.8rem;
}
</style>