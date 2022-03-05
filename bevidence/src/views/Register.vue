<template>
  <div class="registration">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <form @submit.prevent="addNewUser2">
            <div class="form-login">
              <div class="form-group">
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
              </div>
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
              <div class="form-group">
                <label for="exampleInputDate">Datum rođenja</label>
                <input
                  v-model="date"
                  type="date"
                  class="form-control"
                  id="exampleInputDate"
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
import { db } from "@/firebase";

export default {
  name: "Register",
  data() {
    return {
      ID: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      date: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((su_reg) => {
          console.log("Uspješna registracija", su_reg);
        })
        .catch((error_reg) => {
          console.error("Došlo je do greške", error_reg);
        });
      console.log("Nastavak");
    },
    addNewUser() {
      console.log("ok");
      db.collection("user")
        .add({
          Ime: this.firstname,
          Prezime: this.lastname,
          Email: this.email,
          Datum: this.date,
        })
        .firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((su_reg_pod) => {
          console.log("Uspješno dodano", su_reg_pod);
        })
        .catch((e) => {
          console.error("Greška", e);
        });
    },
    addNewUser2() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          firebase
            .firestore()
            .collection("user")
            .doc(firebase.auth().currentUser.uid)
            .set({
              Ime: this.firstname,
              Prezime: this.lastname,
              Email: this.email,
              Datum: this.date,
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
