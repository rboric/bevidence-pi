<template>
  <div class="registration">
    <preloader />
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form class="form-register" @submit.prevent="addNewUser">
            <div class="form">
              <div class="form-group">
                <label for="inputrIme">Ime</label>
                <input
                  v-model="rIme"
                  type="text"
                  class="form-control"
                  id="inputrIme"
                  placeholder="Unesi ime"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputrPrezime">Prezime</label>
                <input
                  v-model="rPrezime"
                  type="text"
                  class="form-control"
                  id="inputrPrezime"
                  placeholder="Unesi prezime"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputrEmail">Email adresa</label>
                <input
                  v-model="rEmail"
                  type="email"
                  class="form-control"
                  id="inputrEmail"
                  aria-describedby="emailHelp"
                  placeholder="Unesi email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputrPassword">Lozinka</label>
                <input
                  v-model="rPassword"
                  type="password"
                  class="form-control"
                  id="inputrPassword"
                  placeholder="Unesi lozinku"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputrRepeatPassword">Ponovljena lozinka</label>
                <input
                  v-model="rRepeatPassword"
                  type="password"
                  class="form-control"
                  id="inputrRepeatPassword"
                  placeholder="Ponovi lozinku"
                  required
                />
              </div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  @click="showPassword()"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault"
                  >Prikaži lozinke</label
                >
              </div>
              <div class="submit-button">
                <button class="btn btn-primary">Registriraj se</button>
              </div>
            </div>
            <p class="error"></p>
          </form>
        </div>
        <div class="col-sm-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import Preloader from "@/components/Preloader.vue";

export default {
  name: "Register",
  data() {
    return {
      rIme: "",
      rPrezime: "",
      rEmail: "",
      rPassword: "",
      rRepeatPassword: "",
    };
  },
  methods: {
    addNewUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.rEmail, this.rPassword)
        .catch((err) => {
          document
            .querySelector(".form-register")
            .querySelector(".error").innerHTML = err.message;
        })
        .then(() => {
          if (this.rPassword == this.rRepeatPassword) {
            firebase
              .firestore()
              .collection("user")
              .doc(firebase.auth().currentUser.uid)
              .set({
                Name: this.rIme,
                Surname: this.rPrezime,
                Email: this.rEmail,
              });
          } else {
            document
              .querySelector(".form-register")
              .querySelector(".error").innerHTML =
              "Lozinka i ponovljena lozinka se ne podudaraju";
          }
        });
    },
    showPassword() {
      var password = document.getElementById("inputrPassword");
      var repeatPassword = document.getElementById("inputrRepeatPassword");

      if (password.type === "password" && repeatPassword.type === "password") {
        password.type = "text";
        repeatPassword.type = "text";
      } else {
        password.type = "password";
        repeatPassword.type = "password";
      }
    },
  },
  components: { Preloader },
};
</script>

<style scoped>
.error {
  color: red;
}
.form-check {
  padding-top: 10px;
}
.registration {
  padding: 25px;
}
.btn-primary {
  background: #f84545 !important;
  border-color: #f84545 !important;
}
.submit-button {
  padding: 10px;
}
</style>
