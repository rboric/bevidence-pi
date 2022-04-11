<template>
  <div class="home">
    <preloader />
    <div v-if="localuser.currentUser">
      <img src="@/assets/background-image.png" alt="" />
    </div>
    <div v-if="!localuser.currentUser">
      <img src="@/assets/background-image.png" alt="" />
    </div>
  </div>
</template>

<script>
import localuser from "@/localuser";
import Preloader from "../components/Preloader.vue";

export default {
  components: { Preloader },
  name: "Home",
  data() {
    return {
      localuser,
    };
  },
};
</script>

<style>
.home img {
  height: 100%;
  width: 100%;
}
</style>
