<template>
  <div class="registration">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form>
            <div class="form-login">
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword2">Repeat Password</label>
                <input
                  v-model="passwordRepeat"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword2"
                  placeholder="Repeat Password"
                />
              </div>
              <div class="submit-button">
                <button type="button" @click="register" class="btn btn-primary">
                  Submit
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
import firebase from "@/firebase";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(function () {
          console.log("Uspješna regitracija");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
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
