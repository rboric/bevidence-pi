<template>
  <div>
    <p>1234{{ wCards[0].Ime }} {{ wCards[0].Prezime }}</p>
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
    this.compURL = this.$route.params.compURL;
    this.wURL = this.$route.params.wURL;
    this.getWorkerData();
    /* this.Data = this.radnici.find((Data) => Data.Ime == this.wURL); */
  },
  methods: {
    getWorkerData() {
      db.collection("user")
        .get()
        .then(() => {
          db.collection(
            "user/" + firebase.auth().currentUser.uid + "/companies"
          )
            .get()
            .then(() => {
              var varijabla = this.compURL;
              db.collection(
                "user/" + firebase.auth().currentUser.uid + "/companies"
              )
                .where("name", "==", varijabla)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    this.comp = doc.id;
                    db.collection(
                      "user/" +
                        firebase.auth().currentUser.uid +
                        "/companies/" +
                        this.comp +
                        "/workers"
                    )
                      .get()
                      .then(() => {
                        var varijabla = this.$route.params.wURL;

                        db.collection(
                          "user/" +
                            firebase.auth().currentUser.uid +
                            "/companies/" +
                            this.comp +
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
                              console.log(data);
                            });
                          });
                      });
                  });
                });
            });
        });
    },
  },
  components: {},
};
</script>

<style></style>
