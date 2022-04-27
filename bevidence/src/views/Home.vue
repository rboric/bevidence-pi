<template>
  <div class="home">
    <preloader />
    <div v-if="localuser.currentUser">
      <div v-for="user in userData" :key="user.id" :userData="userData">
        <div class="bg-image">
          <div class="h1-text">
            <h1>
              <b>Dobrodošao/la {{ user.Ime }}.</b>
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!localuser.currentUser">
      <div class="main">
        <div class="main-body">
          <h1 class="headline">
            <b>Upravljanje poduzećem nikad nije bilo lakše.</b>
          </h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#f84545"
              fill-opacity="1"
              d="M0,192L34.3,208C68.6,224,137,256,206,234.7C274.3,213,343,139,411,133.3C480,128,549,192,617,192C685.7,192,754,128,823,101.3C891.4,75,960,85,1029,117.3C1097.1,149,1166,203,1234,186.7C1302.9,171,1371,85,1406,42.7L1440,0L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
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
                    src="../assets/showcase/poduzece-details.png"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    class="d-block w-50"
                    src="../assets/showcase/poduzece-edit.png"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    class="d-block w-50"
                    src="../assets/showcase/poduzece-show.png"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    class="d-block w-50"
                    src="../assets/showcase/radnik-add.png"
                  />
                </div>
                <div class="carousel-item">
                  <img
                    class="d-block w-50"
                    src="../assets/showcase/radnik-details.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#f84545"
              fill-opacity="1"
              d="M0,192L34.3,208C68.6,224,137,256,206,234.7C274.3,213,343,139,411,133.3C480,128,549,192,617,192C685.7,192,754,128,823,101.3C891.4,75,960,85,1029,117.3C1097.1,149,1166,203,1234,186.7C1302.9,171,1371,85,1406,42.7L1440,0L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            ></path>
          </svg>
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
          <div class="footer-pic">
            <h1 class="headline-2">
              <b>Upravljajte zaposlenicima s lakoćom</b>
            </h1>
          </div>
          <div class="footer-register">
            <div class="container">
              <div class="row">
                <button>
                  <router-link to="/register">REGISTRIRAJ SE!</router-link>
                </button>
              </div>
            </div>
          </div>
          <div class="footer-headline">
            <div class="container">
              <div class="row">
                <div class="col-sm"></div>
                <div class="col-sm rights">
                  © Bevidence 2022. All Rights Reserved.
                </div>
                <div class="col-sm"></div>
              </div>
            </div>
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
.h1-text h1 {
  color: white;
  padding-top: 10%;
  font-size: 150px;
  width: 100%;
}

.bg-image {
  height: 100vh;
  background-image: url("../assets/mesh.png");
  background-size: 100% 100%;
}

.footer-headline {
  background-color: rgb(43, 43, 43);
  height: 150px;
  color: white;
  text-align: center;
}

.footer-register {
  background-image: url("../assets/mesh.png");
  background-size: 100% 100%;
  /* background-color: #f84545; */
  padding: 80px;
}

.footer-register button {
  cursor: default;
}

.footer-register button a {
  padding: 20px;
  border: 1px solid white;
  width: 15%;
  margin: auto;
  transition: 0.4s;
  color: white;
  text-decoration: none;
}

.footer-register button a:hover {
  background-color: white;
  color: #f84545;
  transition: 0.4s;
}

.rights {
  position: relative;
  top: 60px;
  color: gray;
}

::selection {
  background: rgb(80, 12, 8);
}

.grid-container {
  width: 100%;
}

.container-place {
  margin: auto;
  text-align: center;
}

.container-place img {
  height: 150px;
  padding-top: 60px;
  margin-top: -15%;
  transition: 0.4s;
}

.container-place img:hover {
  height: 160px;
  transition: 0.4s;
}

div h2 {
  padding: 50px;
  color: #f84545;
}

.carousel-div {
  background-color: #f84545;
}

.headline {
  padding: 50px;
  width: 40%;
  margin: 150px auto auto auto;
  text-align: center;
  color: #f84545;
  font-size: 4rem;
}

.headline-2 {
  padding: 200px;
  width: 100%;
  margin: auto;
  text-align: center;
  color: white;
  font-size: 4rem;
}
.main-body {
  position: relative;
  height: 100vh;
}

.carousel-item img {
  width: 70% !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 25px auto 25px auto;
}

.carousel-item {
  position: relative;
  z-index: 2;
}

.footer-pic {
  height: 500px;
  width: 100%;
  background-image: url("../assets/footerpic.png");
  background-size: 100% 100%;
}
@media screen and (max-width: 1500px) {
  .h1-text h1 {
    padding-top: 20%;
    font-size: 100px;
  }
  .headline {
    width: 80%;
  }
  .headline-2 {
    padding-top: 130px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media screen and (max-width: 800px) {
  .h1-text h1 {
    padding-top: 30%;
    font-size: 70px;
  }
  .headline {
    width: 100%;
    font-size: 50px;
  }
  .headline-2 {
    margin: auto;
    font-size: 60px;
    padding-top: 130px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media screen and (max-width: 700px) {
  .h1-text h1 {
    padding-top: 50%;
    font-size: 50px;
  }
  .headline-2 {
    margin: auto;

    font-size: 60px;
    padding-top: 130px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media screen and (max-width: 650px) {
  .h1-text h1 {
    padding-top: 60%;
    padding-left: 10px;
    font-size: 40px;
  }
  .headline-2 {
    margin: auto;

    font-size: 50px;
    padding-top: 130px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media screen and (max-width: 600px) {
  .h1-text h1 {
    padding-top: 60%;
    padding-left: 10px;
    font-size: 35px;
  }
  .headline-2 {
    margin: auto;

    font-size: 45px;
    padding-top: 130px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media screen and (max-width: 390px) {
  .headline-2 {
    margin: auto;
    font-size: 50px;
    padding-top: 130px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media screen and (max-width: 370px) {
  .headline {
    font-size: 45px;
  }
  .headline-2 {
    margin: auto;
    font-size: 45px;
    padding-top: 130px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .footer-register button a {
    padding: 15px;
  }
}
</style>
