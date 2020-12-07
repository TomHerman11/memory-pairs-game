<template>
  <h1 class="display-2 font-weight-bold mb-3">{{ getTimerAsString() }}</h1>
</template>

<script>
export default {
  name: "Timer",

  data: function () {
    return {
      time: 0,
      interval: undefined,
    };
  },

  methods: {
    startTimer() {
      this.interval = setInterval(() => (this.time += 1), 1000);
    },

    stopTimer() {
      clearInterval(this.interval);
    },

    clearTimer() {
      this.time = 0;
    },

    getTimerAsString() {
      const seconds = this.time % 60;
      const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

      const minutes = Math.floor(this.time / 60);
      const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

      return minutesString + ":" + secondsString;
    },
  },
};
</script>
