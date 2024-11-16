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

<style lang="scss" scoped>
.share-buttons {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);

  .share-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    color: white;

    i {
      font-size: 1rem;
    }

    &.twitter {
      background-color: #1DA1F2;
      &:hover { background-color: darken(#1DA1F2, 10%); }
    }

    &.facebook {
      background-color: #4267B2;
      &:hover { background-color: darken(#4267B2, 10%); }
    }

    &.copy {
      background-color: var(--primary-color);
      color: white;
      &:hover { background-color: darken(#97ce4c, 10%); }
    }

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    span {
      display: none;
      @media (min-width: 768px) {
        display: inline;
      }
    }
  }
}

// Modo oscuro específico
:root[data-theme="dark"] {
  .share-btn {
    &.copy {
      background-color: #97ce4c;
      &:hover { background-color: lighten(#97ce4c, 10%); }
    }
  }
}
</style>
