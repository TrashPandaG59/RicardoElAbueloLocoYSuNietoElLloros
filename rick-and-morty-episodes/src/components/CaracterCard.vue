<template>
    <div class="character-card">
      <img :src="character.image" :alt="character.name">
      <h3>{{ character.name }}</h3>
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
    </div>
  </template>
  
  <script>
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
  
  <style>
  .character-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    background: white;
    transition: transform 0.2s;
  }
  
  .character-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .character-card img {
    width: 100%;
    border-radius: 4px;
  }
  </style>
  