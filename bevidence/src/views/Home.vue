<template>
  <div class="home">
    <preloader />
    <div v-if="localuser.currentUser">
      <div
        v-for="userDetail in userDetails"
        :key="userDetail.id"
        :userDetails="userDetails"
      >
        {{ userDetail.Ime }} {{ userDetail.Prezime }}
      </div>
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
  name: "Home",
  props: ["userDetails"],
  data() {
    return {
      localuser,
    };
  },
  components: { Preloader },
};
</script>

<style>
.home img {
  height: 100%;
  width: 100%;
}
</style>
