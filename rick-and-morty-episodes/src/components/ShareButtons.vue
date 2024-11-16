<template>
  <div class="share-buttons">
    <button @click.stop="shareOnTwitter" class="share-btn twitter">
      <i class="fab fa-twitter"></i>
      <span>Twitter</span>
    </button>
    <button @click.stop="shareOnFacebook" class="share-btn facebook">
      <i class="fab fa-facebook"></i>
      <span>Facebook</span>
    </button>
    <button @click.stop="copyLink" class="share-btn copy">
      <i class="fas fa-link"></i>
      <span>Copiar</span>
    </button>
  </div>
</template>

<script>
import '../assets/styles/components/ShareButtons.scss'
export default {
  name: 'ShareButtons',
  props: {
    episodeData: {
      type: Object,
      required: true
    }
  },
  methods: {
    shareOnTwitter() {
      const text = `Mira este episodio de Rick and Morty: ${this.episodeData.name}`
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
      window.open(url, '_blank')
    },
    shareOnFacebook() {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
      window.open(url, '_blank')
    },
    async copyLink() {
      try {
        await navigator.clipboard.writeText(window.location.href)
        this.showToast('¡Enlace copiado!')
      } catch (err) {
        console.error('Error al copiar:', err)
      }
    },
    showToast(message) {
      // Implementar un toast o alert simple
      alert(message)
    }
  }
}
</script>
