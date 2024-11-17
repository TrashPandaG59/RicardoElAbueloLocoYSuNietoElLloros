<template>
  <div class="character-card" @click="goToCharacter">
    <div class="image-container">
      <img :src="character.image" :alt="character.name">
    </div>
    <div class="character-info">
      <h3>{{ character.name }}</h3>
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import '../assets/styles/components/CaracterCard.scss'

export default {
  name: 'CharacterCard',
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()

    const goToCharacter = () => {
      router.push({
        name: 'character-detail',
        params: { id: props.character.id }
      })
    }

    return {
      goToCharacter
    }
  }
}
</script>