<template>
  <div class="home">
    <div v-if="localuser.currentUser">
      <div v-for="user in userData" :key="user.id" :userData="userData">
        <div class="h1-text">
          <h1>
            <b>Dobrodošao/la {{ user.Ime }}.</b>
          </h1>
        </div>
      </div>
    </div>
    <div v-if="!localuser.currentUser"></div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { firebase } from "@/firebase";
import localuser from "@/localuser";
import Preloader from "../components/Preloader.vue";

export default {
  name: "Home",
  data() {
    return {
      localuser,
      userData: [],
    };
  },
  mounted() {
    this.h1textShow();
    this.userGetData();
  },
  methods: {
    userGetData() {
      db.collection("user")
        .get()
        .then(() => {
          db.collection("user")
            .where("Email", "==", firebase.auth().currentUser.email)
            .get()
            .then((query) => {
              this.userData = [];
              query.forEach((user) => {
                const data = user.data();

                this.userData.push({
                  Ime: data.Ime,
                });
              });
            });
        });
    },
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
  /* background-image: url("../assets/background-image.png"); */
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
