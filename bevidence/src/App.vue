<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"
          ><img
            src="@/assets/white-logo.svg"
            alt="Bevidence logo"
            class="white-logo"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-if="localuser.currentUser" class="nav-item">
              <router-link to="/poduzeca" class="nav-link"
                >Poduzeća</router-link
              >
            </li>
            <li v-if="localuser.currentUser" class="nav-item">
              <router-link to="/" class="nav-link">Profil</router-link>
            </li>
          </ul>
          <ul class="nav-item navbar-nav">
            <li v-if="localuser.currentUser">
              <a href="#" @click.prevent="logout()" class="nav-link">Odjava</a>
            </li>
            <li v-if="!localuser.currentUser" class="nav-item">
              <router-link to="/login" class="nav-link">Prijava</router-link>
            </li>
            <li v-if="!localuser.currentUser" class="nav-item">
              <router-link to="/register" class="nav-link"
                >Registracija</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view :compCards="compCards" />
  </div>
</template>

<script>
import { db } from "@/firebase";
import { firebase } from "@/firebase";
import localuser from "@/localuser";
import router from "@/router";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    console.log(user.email);
    localuser.currentUser = user.email;

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    }
  } else {
    localuser.currentUser = null;
    console.log("No user");

    if (currentRoute.meta.needsUser) {
      router.push({ name: "Login" });
    }
  }
});

export default {
  name: "App",
  data() {
    return {
      localuser,
      compCards: [],
      userDetails: [],
    };
  },
  mounted() {
    this.compGetData();
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    },
    compGetData() {
      db.collection("user")
        .get()
        .then(() => {
          db.collection(
            "user/" + firebase.auth().currentUser.uid + "/companies"
          )
            .get()
            .then((query) => {
              this.compCards = [];
              query.forEach((companies) => {
                const data = companies.data();

                this.compCards.push({
                  Naziv: data.name,
                  Djelatnost: data.business,
                  Vlasnik: data.owner,
                  Lokacija: data.city,
                  Ulica: data.address,
                  Broj: data.number,
                  PostanskiBroj: data.zip,
                  Drzava: data.state,
                  BrojZaposlenih: data.employees,
                  Company_Name: data.company_name,
                });
              });
            });
        });
    },
  },
  components: {},
};
</script>

<style>
body {
  font-family: "Montserrat", sans-serif;
}

.navbar {
  background-color: #f84545 !important;
}

.white-logo {
  width: 150px;
  padding: 5px;
}

.nav-link {
  font-weight: 400;
  color: white !important;
  padding-left: 20px !important;
}

.nav-link:hover {
  color: rgb(214, 214, 214) !important;
}
</style>
