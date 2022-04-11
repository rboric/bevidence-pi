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
      }, 1000);
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

.circles {
  display: flex;
  margin-top: 10px;
}

.circle {
  width: 5px;
  height: 5px;
  margin: 5px;
  background-color: tomato;
  border-radius: 50%;
  animation-name: scaleIn;
  animation-duration: 1s;
  transform: scale(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.logo {
  animation-name: scaleOut;
  animation-duration: 1s;
  transform: scale(0);
}

p {
  animation-name: scaleOut;
  animation-duration: 1s;
  transform: scale(0);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes scaleOut {
  100% {
    transform: scale(1);
  }
  0% {
    transform: scale(0);
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>