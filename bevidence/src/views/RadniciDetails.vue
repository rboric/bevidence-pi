<template>
  <div>
    <radnici-detalji />
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import RadniciDetalji from "@/components/RadniciDetalji.vue";
import comp from "@/views/RadniciDetails.vue";

export default {
  props: ["radnici"],
  name: "RadniciDetails",
  data() {
    return {
      wCards: [],
    };
  },
  mounted() {
    this.wURL = this.$route.params.wURL;
    console.log(this.wURL);
    /* this.Data = this.radnici.find((Data) => Data.Ime == this.wURL); */
    this.wGetData();
  },
  methods: {
    wGetData() {
      db.collection("user")
        .get()
        .then(() => {
          db.collection(
            "user/" +
              firebase.auth().currentUser.uid +
              "/companies/" +
              comp +
              "/workers"
          )
            .get()
            .then((query) => {
              this.wCards = [];
              query.forEach((workers) => {
                const data = workers.data();

                this.wCards.push({
                  Ime: data.name,
                  Prezime: data.surname,
                  Pozicija: data.job,
                  MjestoPoslovanja: data.cityOfJob,
                  MjestoStanovanja: data.cityOfLiving,
                  RadniSati: data.workHours,
                  Placa: data.salary,
                });
                console.log(wCards);
              });
            });
        });
    },
  },
  components: {
    RadniciDetalji,
  },
};
</script>

<style></style>
