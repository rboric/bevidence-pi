<template>
  <div class="col-sm-6 card-container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          {{ compCard.Naziv }} - {{ compCard.Lokacija }}
        </h5>
        <p class="card-text">
          Adresa:
          {{
            compCard.Ulica + " " + compCard.Broj + ", " + compCard.PostanskiBroj
          }}
        </p>
        <router-link class="btn btn-primary" :to="'/poduzeca/' + compCard.Naziv"
          >Detalji</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["compCard"],
  name: "PoduzeceCard",

  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.poduzeca {
  padding: 5px;
}

.add-div {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  padding: 2px;
}

.card-container {
  padding: 10px;
}

.btn-primary {
  background: #f84545 !important;
  border-color: #f84545 !important;
}

.card p {
  margin: 0 0 10px !important;
}
</style>
