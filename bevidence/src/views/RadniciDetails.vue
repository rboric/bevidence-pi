<template>
  <div class="col-sm-4 card-container">
    <div class="componentRadnik">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <strong>{{ Data }} {{ Data.Prezime }}</strong>
          </h5>
          <p class="card-text">
            {{ Data.Pozicija }}
          </p>
          <p class="card-text">
            {{ Data.MjestoPoslovanja }}
          </p>
          <p class="card-text">
            {{ Data.MjestoStanovanja }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Data: {},
    };
  },
  props: ["work"],
  mounted() {
    this.radnici_url = this.$route.params.radnici_url;
    console.log(this.radnici_url);
    this.Data = this.work.find((Data) => Data.name == this.radnici_url);
    console.log(this.work);
    console.log(this.Data);
  },
};
</script>

<style>
</style>