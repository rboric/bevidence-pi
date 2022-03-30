<template>
  <div>
    <p>{{ wCards[0].Ime }} {{ wCards[0].Prezime }}</p>
  </div>
</template>

<script>
import { firebase, db } from "@/firebase";

export default {
  name: "RadniciDetails",
  data() {
    return {};
  },
  mounted() {
    this.getWorkerData();
    this.wURL = this.$route.params.wURL;
    console.log(this.wURL + " mounted");
    /* this.Data = this.radnici.find((Data) => Data.Ime == this.wURL); */
  },
  methods: {
    getWorkerData() {
      db.collection(
        "user/" +
          firebase.auth().currentUser.uid +
          "/companies/" +
          "WvjqmB5wsDePaZe2uO3e" +
          "/workers"
      )
        .get()
        .then(() => {
          var varijabla = this.$route.params.wURL;

          db.collection(
            "user/" +
              firebase.auth().currentUser.uid +
              "/companies/" +
              "WvjqmB5wsDePaZe2uO3e" +
              "/workers"
          )
            .where("name", "==", varijabla)
            .get()
            .then((query) => {
              this.wCards = [];
              query.forEach((doc) => {
                const data = doc.data();
                this.wCards = [
                  {
                    Ime: data.name,
                    Prezime: data.surname,
                    Pozicija: data.job,
                    MjestoPoslovanja: data.cityOfJob,
                    MjestoStanovanja: data.cityOfLiving,
                    RadniSati: data.workHours,
                    Placa: data.salary,
                  },
                ];
                console.log(this.wCards);
              });
            });
        });
    },
  },
  components: {},
};
</script>

<style></style>
