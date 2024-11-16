<template>
    <div class="character-card">
      <img :src="character.image" :alt="character.name">
      <h3>{{ character.name }}</h3>
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
    </div>
  </template>
  
  <script>
  import '../assets/styles/CaracterCard.scss'
  export default {
    name: 'CharacterCard',
    props: {
      character: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  