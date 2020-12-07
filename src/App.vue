<template>
  <v-app>
    <v-app-bar app color="primary" dark> Memory Game </v-app-bar>
    <v-main>
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
