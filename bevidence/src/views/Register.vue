<template>
  <div class="registration">
    <preloader />
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form @submit.prevent="addNewUser">
            <div class="form-login">
              <div class="form-group">
                <label for="exampleInputrName">Ime</label>
                <input
                  v-model="rName"
                  type="text"
                  class="form-control"
                  id="exampleInputrName"
                  aria-describedby="emailHelp"
                  placeholder="Unesi ime"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputrSurname">Prezime</label>
                <input
                  v-model="rSurname"
                  type="text"
                  class="form-control"
                  id="exampleInputrSurname"
                  aria-describedby="emailHelp"
                  placeholder="Unesi prezime"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputrEmail">Email adresa</label>
                <input
                  v-model="rEmail"
                  type="email"
                  class="form-control"
                  id="exampleInputrEmail"
                  aria-describedby="emailHelp"
                  placeholder="Unesi email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputrPassword">Lozinka</label>
                <input
                  v-model="rPassword"
                  type="password"
                  class="form-control"
                  id="exampleInputrPassword"
                  placeholder="Unesi lozinku"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputrRepeatPassword"
                  >Ponovljena lozinka</label
                >
                <input
                  v-model="rRepeatPassword"
                  type="password"
                  class="form-control"
                  id="exampleInputrRepeatPassword"
                  placeholder="Ponovi lozinku"
                />
              </div>

              <div class="submit-button">
                <button class="btn btn-primary">Registriraj se</button>
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
      rName: "",
      rSurname: "",
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
        .then(() => {
          firebase
            .firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .set({
              Ime: this.rName,
              Prezime: this.rSurname,
              Email: this.rEmail,
            })
            .catch((error) => {
              console.log(
                "Something went wrong with added user to firestore: ",
                error
              );
            });
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
