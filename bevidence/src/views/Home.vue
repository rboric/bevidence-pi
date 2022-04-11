<template>
  <div class="home">
    <div v-if="localuser.currentUser">
      <div
        v-for="userDetail in userDetails"
        :key="userDetail.id"
        :userDetails="userDetails"
      >
        <div class="h1-text">
          <h1>
            <b>Dobrodošao/la {{ userDetail.Ime }}.</b>
          </h1>
        </div>
      </div>
    </div>
    <div v-if="!localuser.currentUser"></div>
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
  mounted() {
    this.h1textShow();
  },
  methods: {
    h1textShow() {
      setTimeout(() => {
        $("h1").animate({ top: "43%" }, 702);
      }, 100);
    },
  },
  components: { Preloader },
};
</script>

<style scoped>
.home {
  background-image: url("../assets/background-image.png");
  height: 100vh;
}

h1 {
  position: absolute;
  color: white;
  font-size: 100px;
  top: -45%;
  left: 1%;
}
@media screen and (max-width: 800px) {
  h1 {
    font-size: 60px;
  }
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 50px;
  }
}

@media screen and (max-width: 400px) {
  h1 {
    font-size: 40px;
  }
}
</style>
