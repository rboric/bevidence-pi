<template>
  <div class="col-sm-4 card-container">
    <div class="componentRadnik">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <strong>{{ radnici.Ime }} {{ radnici.Prezime }}</strong>
          </h5>
          <p class="card-text">Pozicija: {{ radnici.Pozicija }}</p>
          <p class="card-text">Firma: {{ radnici.MjestoPoslovanja }}</p>
          <router-link
            @click="func1()"
            class="btn btn-primary"
            :to="'/poduzeca/' + compURL + '/radnici/' + radnici.Ime"
            >Detalji</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["radnici", "compCard"],
  name: "Radnik",
  data() {
    return {
      compURL: "",
    };
  },
  mounted() {
    this.compURL = this.$route.params.compURL;
  },
  methods: {
    modalEditWorker() {
      $("#editWorker").modal("show");
    },
    modalCloseEditWorker() {
      $("#editWorker").modal("toggle");
    },
  },
};
</script>

<style scoped>
.card {
  padding: 2px;
}

.card-container {
  padding: 10px;
}

.btn-primary {
  color: #fff;
  background-color: #f84545 !important;
  border-color: #f84545 !important;
  font-size: 16px;
  font-weight: 400;
}

.btn-primary:hover {
  background-color: #d71818 !important;
  border-color: #d71818 !important;
}

.btn-secondary {
  color: #fff;
  background-color: #383838 !important;
  border-color: #383838 !important;
  font-size: 16px;
  font-weight: 400;
}

.btn-secondary:hover {
  color: #fff;
  background-color: #161616 !important;
  border-color: #161616 !important;
}
.card p {
  margin: 0 0 10px !important;
}

td a {
  text-decoration: none;
  color: #f84545;
}

td a:hover {
  color: #d71818;
}
</style>
