<template>
  <div class="registration">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form>
            <div class="form-login">
              <!-- <div class="form-group">
                <label for="exampleInputFirstName">Ime</label>
                <input
                  v-model="firstname"
                  type="text"
                  class="form-control"
                  id="exampleInputFirstName"
                  aria-describedby="emailHelp"
                  placeholder="Unesi ime"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputLastName">Prezime</label>
                <input
                  v-model="lastname"
                  type="text"
                  class="form-control"
                  id="exampleInputLastName"
                  aria-describedby="emailHelp"
                  placeholder="Unesi prezime"
                />
              </div>-->
              <div class="form-group">
                <label for="exampleInputEmail1">Email adresa</label>
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Unesi email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Lozinka</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Unesi lozinku"
                />
              </div>
              <!--<div class="form-group">
                <label for="exampleInputPassword2">Ponovi lozinku</label>
                <input
                  v-model="passwordRepeat"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword2"
                  placeholder="Ponovi lozinku"
                />
              </div>-->
              <!-- <div class="form-group">
                <label for="exampleInputDate">Datum rođenja</label>
                <input
                  v-model="date"
                  type="date"
                  class="form-control"
                  id="exampleInputDate"
                />
              </div>-->
              <div class="submit-button">
                <button type="button" @click="register" class="btn btn-primary">
                  Registriraj se
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
  name: "Register",
  data() {
    return {
      //  firstname: "",
      // lastname: "",
      email: "",
      password: "",
      // date: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          //this.firstname,
          //this.lastname,
          this.email,
          this.password
          // this.date
        )
        .then(function () {
          console.log("Uspješna registracija");
        })
        .catch(function (error) {
          console.error("Došlo je do greške", error);
        });
      console.log("Nastavak");
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
