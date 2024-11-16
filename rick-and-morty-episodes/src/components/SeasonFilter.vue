<template>
  <div class="season-filter">
    <select v-model="selectedSeason" @change="handleChange">
      <option value="">Todas las temporadas</option>
      <option v-for="season in seasons" :key="season" :value="season">
        Temporada {{ season }}
      </option>
    </select>
  </div>
</template>

<script>
import '../assets/styles/components/SeasonFilter.scss'
export default {
  name: 'SeasonFilter',
  emits: ['filter'],
  data() {
    return {
      selectedSeason: '',
      seasons: [1, 2, 3, 4, 5] // Actualizado con todas las temporadas
    }
  },
  methods: {
    handleChange() {
      this.$emit('filter', this.selectedSeason)
    }
  }
}
</script>
