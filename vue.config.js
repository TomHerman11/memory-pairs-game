module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/memory-pairs-game/'
    : '/'
}

// 'memory-pairs-game' is the name of the Github repository, see:
// https://cli.vuejs.org/guide/deployment.html#github-pages