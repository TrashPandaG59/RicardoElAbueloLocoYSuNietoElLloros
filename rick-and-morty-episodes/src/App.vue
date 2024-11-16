<template>
  <div class="app">
    <header>
      <h1>Episodios de Ricardo el abuelo loco y Mortadelo, su nieto llorica

      </h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import EpisodeList from './components/EpisodeList.vue'
import './assets/styles/main.scss'
import './assets/styles/app.scss'

export default {
  name: 'App',
  components: {
    EpisodeList
  }
}
</script>
