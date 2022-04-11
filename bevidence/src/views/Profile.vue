<template>
  <div class="Profile">
    <preloader />
    <div
      v-for="userDetail in userDetails"
      :key="userDetail.id"
      :userDetails="userDetails"
    >
      {{ userDetail.Ime }} {{ userDetail.Prezime }}
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
</style>