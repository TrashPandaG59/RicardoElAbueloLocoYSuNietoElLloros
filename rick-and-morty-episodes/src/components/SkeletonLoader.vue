<template>
    <div class="skeleton-grid">
      <div v-for="n in 6" :key="n" class="skeleton-card">
        <div class="skeleton-title"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text"></div>
      </div>
    </div>
  </template>
  
  <script>
  import '../assets/styles/components/SkeletonLoader.scss'
  export default {
    name: 'SkeletonLoader'
  }
  </script>
  