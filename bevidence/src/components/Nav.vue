<template>
  <div class="nav">
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
                <router-link to="/radnici" class="nav-link"
                  >Radnici</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/evidencija-radnih-sati" class="nav-link"
                  >Evidencija radnih sati</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/evidencija-slobodnih-dana" class="nav-link"
                  >Evidencija slobodnih dana</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/izracun-place" class="nav-link"
                  >Izračun plaće</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
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

.nav a {
  font-weight: bold;
  color: white !important;
  padding-left: 20px !important;
}
</style>
