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
        <div
          v-if="design.currentUser"
          class="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <!--<li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>-->
            <li class="nav-item">
              <router-link to="/poduzeca" class="nav-link"
                >Poduzeća</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/radnici" class="nav-link">Radnici</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/evidencija-radnih-sati" class="nav-link"
                >Radni sati</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/evidencija-slobodnih-dana" class="nav-link"
                >Slobodni dani</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/izracun-place" class="nav-link"
                >Plaće</router-link
              >
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li v-if="design.currentUser" class="nav-item">
              <router-link to="/" class="nav-link">Profil</router-link>
            </li>
            <li v-if="design.currentUser" class="nav-item">
              <!--<router-link to="/" class="nav-link">Odjava</router-link>-->
              <a href="#" @click.prevent="logout()" class="nav-link">Odjava</a>
            </li>
            <li v-if="!design.currentUser" class="nav-item">
              <router-link to="/login" class="nav-link">Prijava</router-link>
            </li>
            <li v-if="!design.currentUser" class="nav-item">
              <router-link to="/register" class="nav-link"
                >Registracija</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import design from "@/design";
import router from "@/router";

firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    console.log(user.email);
    design.currentUser = user.email;

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "Home" });
    }
  } else {
    console.log("No user");
    design.currentUser = null;

    if (currentRoute.meta.needsUser) {
      router.push({ name: "Login" });
    }
  }
});

export default {
  name: "App",
  data() {
    return {
      design,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
};
</script>

<style>
.navbar {
  background-image: linear-gradient(to right, #f84545, #faa6a6) !important;
}

.white-logo {
  width: 150px;
  padding: 5px;
}

.nav-link {
  font-weight: bold;
  color: white !important;
  padding-left: 20px !important;
}
</style>
