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
            class="btn btn-primary"
            :to="'/poduzeca/' + compURL + '/radnici/' + radnici.Ime"
            >Detalji</router-link
          >
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editWorker"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ radnici.Ime }} {{ radnici.Prezime }}
            </h5>
            <button
              @click="modalCloseEditWorker()"
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            Pozicija: {{ radnici.Pozicija }} <br />
            Mjesto Poslovanja: {{ radnici.MjestoPoslovanja }} <br />
            Mjesto Stanovanja: {{ radnici.MjestoStanovanja }}
          </div>
          <div class="modal-body">
            Radni sati: {{ radnici.RadniSati }}<br />
            Plaća po satu: {{ radnici.Placa }}<br />
            Ukupna plaća: {{ radnici.RadniSati * radnici.Placa }}
          </div>
          <div class="modal-footer">
            <button
              @click="modalCloseEditWorker()"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
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
  background: #f84545 !important;
  border-color: #f84545 !important;
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
