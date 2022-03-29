<template>
  <div class="col-sm-4 card-container">
    <div class="componentRadnik">
      <div class="card">
        <!--         <div class="card-body">
          <h5 class="card-title">
            <strong>{{ Data.Ime }} {{ Data.Prezime }}</strong>
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db } from "@/firebase";

export default {
  name: "RadniciDetails",
  data() {
    return {
      Data: [],
    };
  },
  props: ["radnici"],
  mounted() {
    this.wURL = this.$route.params.wURL;
    console.log(this.wURL);
    /*  this.Data = this.wCards.find((Data) => Data.Ime == this.wURL); */
    console.log(this.radnici);
  },
};
</script>

<style>
</style>