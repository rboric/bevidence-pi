<template>
  <div class="home">
    <preloader />
    <div v-if="localuser.currentUser">
      <div v-for="user in userData" :key="user.id" :userData="userData">
        <div class="h1-text">
          <h1>
            <b>Dobrodošao/la {{ user.Ime }}.</b>
          </h1>
        </div>
      </div>
    </div>
    <div v-if="!localuser.currentUser">
      <div class="main">
        <div class="main-body">
          <h1 class="headline">
            <b>Upravljanje poduzećem nikad nije bilo lakše.</b>
          </h1>
          <div class="carousel-div">
            <div
              id="carouselExampleSlidesOnly"
              class="carousel-div carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    class="d-block w-50"
                    src="../assets/background-image.png"
                    alt="First slide"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    class="d-block w-50"
                    src="../assets/background-image.png"
                    alt="Second slide"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    class="d-block w-50"
                    src="../assets/background-image.png"
                    alt="Third slide"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row container-place">
              <div class="col-sm">
                <img src="../assets/poduzeca.png" alt="" />
                <h2><b>Upravljanje poduzećem</b></h2>
              </div>
              <div class="col-sm">
                <img src="../assets/placa.png" alt="" />
                <h2><b>Upravljanje plaćama</b></h2>
              </div>
              <div class="col-sm">
                <img src="../assets/slobodnidani.png" alt="" />
                <h2><b>Upravljanje slobodnim danima</b></h2>
              </div>
            </div>
          </div>
          <div class="col">
            <img src="../assets/footerpic.png" alt="" />
          </div>
        </div>
      </div>
    </div>
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
    this.slider();
    this.userGetData();
  },
  methods: {
    slider() {
      $(".carousel").carousel({
        interval: 3000,
      });
    },
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
                  Ime: data.Name,
                });
              });
            });
        });
    },
  },
  components: { Preloader },
};
</script>

<style scoped>
.grid-container {
  width: 100%;
}

.container-place {
  margin: auto;
  text-align: center;
}

.container-place img {
  height: 150px;
  padding-top: 40px;
}

div h2 {
  padding: 50px;
  color: #f84545;
}

.carousel-div {
  padding: 50px;
  background-color: #f84545;
}

.headline {
  padding: 50px;
  width: 40%;
  margin: auto;
  text-align: center;
  color: #f84545;
  font-size: 4rem;
}
.main-body {
  height: 100vh;
}

.carousel-item img {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: auto;
  width: 40% !important;
}

.carousel-item {
  position: relative;
  z-index: 2;
}

.home {
  /* background-image: url("../assets/background-image.png"); */
  height: 100vh;
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
