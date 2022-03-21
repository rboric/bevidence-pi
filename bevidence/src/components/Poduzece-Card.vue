<template>
  <div class="col-sm-6 card-container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          {{ poduzece.Naziv }} - {{ poduzece.Lokacija }}
        </h5>
        <p class="card-text">
          Adresa:
          {{
            poduzece.Adresa.Ulica +
            " " +
            poduzece.Adresa.Broj +
            ", " +
            poduzece.Adresa.PostanskiBroj
          }}
        </p>
        <p class="card-text">Broj zaposlenika: {{ poduzece.BrojZaposlenih }}</p>
        <button type="button" @click="showCompany" class="btn btn-primary">
          Detalji
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["poduzece"],
  name: "PoduzeceCard",

  data() {
    return {};
  },
  methods: {
    showCompany() {
      $("#showPoduzece").modal("show");
    },
    editCompany() {
      $("#editPoduzece").modal("show");
    },
  },
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
