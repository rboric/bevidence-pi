<template>
  <div class="col-sm-4 card-container">
    <div class="componentRadnik">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <strong>{{ Data.Ime }} {{ radnici.Prezime }}</strong>
          </h5>
          <p class="card-text">
            {{ radnici.Pozicija }}
          </p>
          <p class="card-text">
            {{ radnici.MjestoPoslovanja }}
          </p>
          <p class="card-text">
            {{ radnici.MjestoStanovanja }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["radnici"],
  name: "RadniciDetalji",
  data() {
    return {};
  },
  mounted() {
    this.wURL = this.$route.params.wURL;
    console.log(this.wURL);
    /*  this.Data = this.wCards.find((Data) => Data.Ime == this.wURL); */
    console.log(this.wGetData);
  },
};
</script>

<style></style>
