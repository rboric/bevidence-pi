<template>
  <div class="Profile">
    <preloader />
    <button class="backBtn" onclick="history.back()">&#8249;</button>
    <div v-for="user in userData" :key="user.id" :userData="userData">
      <section class="vh-100" style="background-color: #f4f5f7">
        <div class="container py-5 h-100">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col col-lg-6 mb-4 mb-lg-0">
              <div class="card mb-3" style="border-radius: 0.5rem">
                <div class="row g-0">
                  <div
                    class="col-md-4 gradient-custom text-center text-white"
                    style="
                      border-top-left-radius: 0.5rem;
                      border-bottom-left-radius: 0.5rem;
                    "
                  >
                    <i class="far fa-edit mb-5"></i>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body p-4">
                      <h6>{{ user.Ime }} {{ user.Prezime }}</h6>
                      <hr class="mt-0 mb-4" />
                      <div class="row pt-1">
                        <div class="col-12 mb-3">
                          <h6>Email</h6>
                          <p class="text-muted">{{ user.Email }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                  Ime: data.Name,
                  Prezime: data.Surname,
                  Email: data.Email,
                });
                console.log(this.userData);
              });
            });
        });
    },
  },
  components: { Preloader },
};
</script>

<style>
.gradient-custom {
  background: #f84545;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right bottom, #f84545 #d71818);

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right bottom, #f84545 #d71818);
}

.backBtn {
  text-decoration: none;
  display: inline-block;
  background-color: #f84545;
  width: 35px;
  height: 35px;
  margin-top: 20px;
  border-radius: 50px;
  color: white;
  transition: 0.3s;
}

.backBtn:hover {
  background-color: #d71818;
  transition: 0.3s;
}

@media screen and (min-width: 1080px) {
  .backBtn {
    display: none;
  }
}
</style>
