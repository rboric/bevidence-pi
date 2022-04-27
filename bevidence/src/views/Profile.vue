<template>
  <div class="Profile">
    <preloader />
    <button class="backBtn" onclick="history.back()">&#8249;</button>
    <div v-for="user in userData" :key="user.id" :userData="userData">
      <section class="vh-100">
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
                  ></div>
                  <div class="col-md-8">
                    <div class="card-body p-4">
                      <h6>{{ user.Ime }} {{ user.Prezime }}</h6>
                      <hr class="mt-0 mb-4" />
                      <div class="row pt-1">
                        <div class="col-12 mb-3">
                          <h6>Email</h6>
                          <p class="text-muted">{{ user.Email }}</p>
                        </div>
                        <div class="col-12 mb-12">
                          <button
                            class="btn btn-primary"
                            @click="resetPassword"
                          >
                            Promjena lozinke
                          </button>
                          <button
                            disabled
                            class="btn btn-primary"
                            @click="contactForm"
                          >
                            Kontakt
                          </button>
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
      <div
        class="modal fade"
        id="contact"
        tabindex="-1"
        aria-labelledby="contactLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="contactLabel">Kontakt</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="contact-form">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-12">
                      <form
                        class="form-newContactForm row g-3"
                        @submit.prevent="newContactForm"
                      >
                        <div class="col-md-6">
                          <label for="userName" class="form-label"
                            >Korisnik</label
                          >
                          <input
                            v-model="user.Ime"
                            type="text"
                            class="form-control"
                            id="userName"
                            required
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="userEmail" class="form-label"
                            >Email</label
                          >
                          <input
                            v-model="user.Email"
                            type="text"
                            class="form-control"
                            id="userEmail"
                            required
                          />
                        </div>
                        <div class="col-md-12">
                          <label for="userMessage" class="form-label"
                            >Poruka</label
                          >
                          <textarea
                            v-model="userMessage"
                            type="text"
                            class="form-control"
                            id="userMessage"
                            required
                          />
                        </div>
                        <div class="submit-button">
                          <button class="btn btn-primary">
                            Pošalji poruku
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
import Preloader from "@/components/Preloader.vue";

export default {
  name: "Home",
  data() {
    return {
      localuser,
      userData: [],
      userMessage: "",
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
              });
            });
        });
    },
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
          alert("Email je poslan");
        })
        .catch(() => {});
    },
    contactForm() {
      $("#contact").modal("show");
    },
  },
  components: { Preloader },
};
</script>

<style>
.modal {
  padding-top: 75px;
}

.Profile {
  padding-top: 100px;
}
.gradient-custom {
  background: #f84545;
  background: -webkit-linear-gradient(to right bottom, #f84545 #d71818);
  background: linear-gradient(to right bottom, #f84545 #d71818);
}

.backBtn {
  text-decoration: none;
  display: inline-block;
  background-color: #f84545;
  width: 35px;
  height: 35px;
  margin-top: 20px;
  margin-left: 10px;
  border-radius: 50px;
  color: white;
  transition: 0.3s;
}

.backBtn:hover {
  background-color: #d71818;
  transition: 0.3s;
}
.btn-primary {
  background: #f84545 !important;
  border-color: #f84545 !important;
  color: white !important;
}
.btn {
  margin-top: 10px;
  margin-right: 10px;
}

@media screen and (min-width: 1080px) {
  .backBtn {
    display: none;
  }
}
</style>
