<template>
  <div class="col-sm-4 card-container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          {{ radnici.Ime }}
          {{ radnici.Prezime }}
        </h5>
        <h6>{{ radnici.MjestoPoslovanja }}</h6>
        <p class="card-text">
          {{ radnici.Pozicija }}
        </p>
        <button type="button" class="btn btn-primary">Detalji</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["radnici"],
  name: "Radnik",
  data() {
    return {};
  },
};
</script>

<style scoped>
.card {
  padding: 2px;
  background-color: lightgrey;
}

.card-container {
  padding: 10px;
}
td a {
  text-decoration: none;
  color: #f84545;
}

td a:hover {
  color: #d71818;
}
</style>
