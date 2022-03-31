<template>
  <div>
    <div v-for="wCard in wCards" :key="wCard.id">
      <p>Ime i Prezime: {{ wCard.Ime }} {{ wCard.Prezime }}</p>
      <p>Pozicija: {{ wCard.Pozicija }}</p>
      <p>MjestoPoslovanja: {{ wCard.MjestoPoslovanja }}</p>
      <p>MjestoStanovanja: {{ wCard.MjestoStanovanja }}</p>
      <p>RadniSati: {{ wCard.RadniSati }}</p>
      <p>Placa: {{ wCard.Placa }}</p>

      <button class="btn btn-primary" @click="editWorker()">Uredi</button>
      <button class="btn btn-primary" @click="deleteWorker()">Obriši</button>
      <!-- MODAL EDIT WORKER -->
      <div
        class="modal fade"
        id="editRadnik"
        tabindex="-1"
        aria-labelledby="editRadnikLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editRadnikLabel">Uredi radnika</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="novi-radnik">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-12">
                      <form @submit.prevent="updateWorker" class="row g-3">
                        <div class="col-md-6">
                          <label for="wName" class="form-label">Ime</label>
                          <input
                            v-model="wCard.Ime"
                            type="string"
                            class="form-control"
                            id="wName"
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="wSurname" class="form-label"
                            >Prezime</label
                          >
                          <input
                            v-model="wCard.Prezime"
                            type="string"
                            class="form-control"
                            id="wSurname"
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="wJob" class="form-label">Pozicija</label>
                          <input
                            v-model="wCard.Pozicija"
                            type="string"
                            class="form-control"
                            id="wJob"
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="wCityOfLiving" class="form-label"
                            >Mjesto stanovanja</label
                          >
                          <input
                            v-model="wCard.MjestoStanovanja"
                            type="string"
                            class="form-control"
                            id="wCityOfLiving"
                            placeholder=""
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="wCityOfJob" class="form-label"
                            >Mjesto poslovanja</label
                          >
                          <input
                            v-model="wCard.MjestoStanovanja"
                            type="string"
                            class="form-control"
                            id="wCityOfJob"
                            placeholder=""
                          />
                        </div>
                        <div class="col-md-3">
                          <label for="wWorkHours" class="form-label"
                            >Radni sati</label
                          >
                          <input
                            v-model="wCard.RadniSati"
                            type="string"
                            class="form-control"
                            id="wWorkHours"
                          />
                        </div>
                        <div class="col-md-3">
                          <label for="wSalary" class="form-label"
                            >Početna plaća</label
                          >
                          <input
                            v-model="wCard.Placa"
                            type="string"
                            class="form-control"
                            id="wSalary"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                @click.prevent="updateWorker"
                class="btn btn-primary"
              >
                Dodaj
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Odustani
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, db } from "@/firebase";

export default {
  name: "RadniciDetails",
  data() {
    return {
      wCards: [],
    };
  },
  mounted() {
    this.getWorkerData();
  },
  methods: {
    getWorkerData() {
      this.compURL = this.$route.params.compURL;
      this.wURL = this.$route.params.wURL;
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
    editWorker() {
      $("#editRadnik").modal("show");
    },
    updateWorker() {
      db.collection(
        "user/" +
          firebase.auth().currentUser.uid +
          "/companies/" +
          this.comp +
          "/workers"
      )
        .doc("Bziw2T49VT65Cp9nuZF5")
        .update({
          name: this.wCards.Ime,
          surname: this.wCards.Prezime,
          job: this.wCards.Pozicija,
          cityOfJob: this.wCards.MjestoPoslovanja,
          cityOfLiving: this.wCards.MjestoStanovanja,
          workHours: this.wCards.RadniSati,
          salary: this.wCards.Placa,
        });
    },
    deleteWorker() {
      db.collection(
        "user/" +
          firebase.auth().currentUser.uid +
          "/companies/WvjqmB5wsDePaZe2uO3e/workers"
      )
        .doc("KIMjXnSETYWSQ0i6erA3")
        .delete();
    },
  },
  components: {},
};
</script>

<style>
.btn {
  margin: 2px;
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

.form-control {
  color: red;
}
</style>
