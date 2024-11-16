import { ref, watch } from 'vue'

export function useFavorites() {
  const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

  watch(favorites, (newValue) => {
    localStorage.setItem('favorites', JSON.stringify(newValue))
  })

  const toggleFavorite = (episodeId) => {
    const index = favorites.value.indexOf(episodeId)
    if (index === -1) {
      favorites.value.push(episodeId)
    } else {
      favorites.value.splice(index, 1)
    }
  }

  const isFavorite = (episodeId) => {
    return favorites.value.includes(episodeId)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite
  }
}
