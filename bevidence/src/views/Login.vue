<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form>
            <div class="form-login">
              <div class="form-group">
                <label for="exampleInputlEmail">E-mail</label>
                <input
                  v-model="lEmail"
                  type="email"
                  class="form-control"
                  id="exampleInputlEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputlPassword">Lozinka</label>
                <input
                  v-model="lPassword"
                  type="password"
                  class="form-control"
                  id="exampleInputlPassword"
                  placeholder="Password"
                />
              </div>
              <div class="submit-button">
                <button type="button" @click="login" class="btn btn-primary">
                  Prijava
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-sm-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";

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
        .then(() => {
          this.$router.replace({ name: "Home" });
        })
        .catch();
    },
  },
};
</script>

<style>
.login {
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
