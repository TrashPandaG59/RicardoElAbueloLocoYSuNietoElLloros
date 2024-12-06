<template>
  <div class="app">
    <header class="main-header">
      <div class="title-container">
        <h1 class="main-title">Episodios de Ricardo el abuelo loco y Mortadelo, su nieto llorica</h1>
        
      </div>
    </header>
    <IdleDetector />
    <router-view></router-view>
  </div>
</template>

<script>
import '../src/assets/styles/app.scss'
import IdleDetector from './components/IdleDetector.vue'

export default {
  name: 'App', 
  components: {
    IdleDetector
  }
}
</script>