<template>
  <div class="home">
    <div v-if="localuser.currentUser">DOBRO JUTROOOOOOOOO</div>
    <div v-if="!localuser.currentUser">
      <img src="@/assets/background-image.png" alt="" />
    </div>
  </div>
</template>

<script>
import localuser from "@/localuser";

export default {
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
