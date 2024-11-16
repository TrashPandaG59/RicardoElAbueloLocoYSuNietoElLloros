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
export default {
  name: 'SeasonFilter',
  emits: ['filter'],
  data() {
    return {
      selectedSeason: '',
      seasons: [1, 2, 3, 4, 5, 6] // Actualizado con todas las temporadas
    }
  },
  methods: {
    handleChange() {
      this.$emit('filter', this.selectedSeason)
    }
  }
}
</script>
<style lang="scss" scoped>
.season-filter {
  select {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;  // Color fijo
    background-color: white; // Color fijo
    color: #333;            // Color fijo
    font-size: 1rem;
    cursor: pointer;
    min-width: 200px;

    &:focus {
      outline: none;
      border-color: #97ce4c;  // Color fijo del primary
    }

    option {
      background-color: white; // Color fijo
      color: #333;            // Color fijo
    }
  }
}
</style>
