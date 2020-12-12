<template>
  <v-app>
    <v-app-bar app color="primary" dark short class="text-center">
      <v-spacer></v-spacer>
      <h1>Memory Game</h1>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="light-blue lighten-4">
      <MemoryGame />
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