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
        <router-link
          class="btn btn-primary"
          :to="'/poduzeca/' + compCard.Company_Name"
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
.add-div {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  border: 1px solid#ff8080;
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
</style>
