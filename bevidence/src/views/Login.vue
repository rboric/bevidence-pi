<template>
  <div class="login">
    <preloader />
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form class="form-login" @submit.prevent="login">
            <div class="form">
              <div class="form-group">
                <label for="inputlEmail">E-mail</label>
                <input
                  v-model="lEmail"
                  type="email"
                  class="form-control"
                  id="inputlEmail"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputlPassword">Lozinka</label>
                <input
                  v-model="lPassword"
                  type="password"
                  class="form-control"
                  id="inputlPassword"
                  placeholder="Lozinka"
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
                  >Prikaži lozinku</label
                >
                <a class="passwordreset" href="/passwordreset"
                  >Zaboravili ste lozinku?</a
                >
              </div>
              <div class="submit-button">
                <button class="btn btn-primary">Prijava</button>
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
  name: "Login",
  data() {
    return {
      lEmail: "",
      lPassword: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.lEmail, this.lPassword)
        .catch((err) => {
          document
            .querySelector(".form-login")
            .querySelector(".error").innerHTML = err.message;
          var a = 1;
        })
        .then(() => {
          if (a == 0) {
            this.$router.replace({ name: "Home" });
          }
        });
    },
    showPassword() {
      var password = document.getElementById("inputlPassword");

      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    },
  },
  components: { Preloader },
};
</script>

<style scoped>
.passwordreset {
  float: right;
  color: #f84545;
}
.error {
  color: red;
}
.form-check {
  padding-top: 10px;
}
.login {
  padding: 25px;
  padding-top: 100px;
}
.btn-primary {
  background: #f84545 !important;
  border-color: #f84545 !important;
  color: white !important;
}
.btn {
  margin-top: 10px;
}
</style>
