<template>
  <div class="PasswordReset">
    <preloader />
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form class="form-resetPassword" @submit.prevent="resetPassword">
            <div class="form">
              <div class="form-group">
                <label for="inputResetEmail">E-mail</label>
                <input
                  v-model="resetEmail"
                  type="email"
                  class="form-control"
                  id="inputResetEmail"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="submit-button">
                <button class="btn btn-primary">Pošalji mail</button>
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
      resetEmail: "",
    };
  },
  methods: {
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.resetEmail)
        .then(() => {
          alert("Email je poslan");
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          document
            .querySelector(".form-resetPassword")
            .querySelector(".error").innerHTML = err.message;
        });
    },
  },
  components: { Preloader },
};
</script>

<style>
.PasswordReset {
  padding-top: 100px;
}
.error {
  padding-top: 10px;
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