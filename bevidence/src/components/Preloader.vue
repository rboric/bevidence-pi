<template>
  <transition name="fade">
    <div v-if="show" class="preloader">
      <div class="logo"><img src="../assets/B.svg" alt="" /></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "preloader",
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    this.showToggle();
  },
  methods: {
    showToggle() {
      setTimeout(() => {
        this.show = false;
      }, 1500);
    },
  },
};
</script>

<style scoped>
.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 9999;
}

.logo {
  background-repeat: no-repeat;
}

p {
  margin-top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.logo {
  animation-name: scaleIn;
  animation-duration: 1.5s;
  transform: scale(0);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes scaleIn {
  100% {
    transform: scale(1);
  }
  0% {
    transform: scale(0);
  }
}
</style>