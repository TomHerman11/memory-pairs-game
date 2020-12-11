<template>
  <div>
    {{ timerAsString }}
  </div>
</template>

<script>
export default {
  name: "Timer",

  props: {
    tick: {
      type: Boolean,
      required: true,
    },

    watchShouldRestart: {
      type: Number,
      required: true,
    },
  },

  data: function () {
    return {
      time: 0,
      interval: undefined,
    };
  },

  computed: {
    timerAsString() {
      const seconds = this.time % 60;
      const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

      const minutes = Math.floor(this.time / 60);
      const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

      return minutesString + ":" + secondsString;
    },
  },

  mounted() {
    if (this.tick) {
      this.interval = setInterval(() => (this.time += 1), 1000);
    }
  },

  watch: {
    tick: function (shouldTick) {
      if (!shouldTick) {
        clearInterval(this.interval);
      }
    },

    watchShouldRestart() {
      this.restartTimer();
    },
  },

  methods: {
    restartTimer() {
      clearInterval(this.interval);
      this.time = 0;
      this.interval = setInterval(() => (this.time += 1), 1000);
    },
  },
};
</script>
