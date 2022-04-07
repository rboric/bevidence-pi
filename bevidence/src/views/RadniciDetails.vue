<template>
  <div>
    <div v-for="wCard in wCards" :key="wCard.id">
      <div class="info-container row">
        <div class="col-12">
          <h3 style="word-break: break-all">
            <b>{{ wCard.Ime }} {{ wCard.Prezime }}</b>
          </h3>
        </div>
        <div class="information col-6">
          <p><b>Pozicija:</b></p>
          <p><b>Mjesto poslovanja:</b></p>
          <p><b>Mjesto stanovanja:</b></p>
          <p><b>Radni sati:</b></p>
          <p><b>Plaća:</b></p>
          <p><b>Ukupna plaća:</b></p>
        </div>
        <div class="information col-6">
          <p>{{ wCard.Pozicija }}</p>
          <p>{{ wCard.MjestoPoslovanja }}</p>
          <p>{{ wCard.MjestoStanovanja }}</p>
          <p>{{ wCard.RadniSati }} h</p>
          <p>{{ wCard.Placa }} kn / h</p>
          <p>{{ wCard.Placa * wCard.RadniSati }} kn</p>
        </div>
      </div>
      <div class="row button-container">
        <div class="buttons-container col-12">
          <button class="btn btn-primary" @click="editWorker()">Uredi</button>
          <button class="btn btn-primary" @click="deleteWorker()">
            Obriši
          </button>
          <button class="btn btn-primary" @click="addSalary()">Plaća</button>
        </div>
      </div>

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
                            v-model="wCard.MjestoPoslovanja"
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
                Spremi
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
      <!-- MODAL NEW WORKER -->
      <div
        class="modal fade"
        id="zabPlaca"
        tabindex="-1"
        aria-labelledby="addRadnikLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addRadnikLabel">
                Novi zapis o plaći
              </h5>
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
                      <form @submit.prevent="addNewSalary" class="row g-3">
                        <div class="col-md-6">
                          <label for="wWorkHours" class="form-label"
                            >Radni sati</label
                          >
                          <input
                            v-model="wCard.RadniSati"
                            type="number"
                            class="form-control"
                            id="wWorkHours"
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="wSalary" class="form-label"
                            >Početna plaća</label
                          >
                          <input
                            v-model="wCard.Placa"
                            type="number"
                            class="form-control"
                            id="wSalary"
                          />
                        </div>
                        <div class="col-md-3">
                          <label for="overtimeHours" class="form-label"
                            >Prekovremeni Sati</label
                          >
                          <input
                            v-model="overtimeHours"
                            type="number"
                            class="form-control"
                            id="overtimeHours"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="overtimeHoursSalary" class="form-label"
                            >Plaća za prekovremene sate</label
                          >
                          <input
                            v-model="overtimeHoursSalary"
                            type="number"
                            class="form-control"
                            id="overtimeHoursSalary"
                          />
                        </div>
                        <div class="col-md-3">
                          <label for="salaryAddition" class="form-label"
                            >Dodatak na plaću</label
                          >
                          <input
                            v-model="salaryAddition"
                            type="number"
                            class="form-control"
                            id="salaryAddition"
                          />
                        </div>
                        <div class="col-md-2">
                          <label for="salaryMonth" class="form-label"
                            >Mjesec</label
                          >
                          <input
                            v-model="salaryMonth"
                            type="string"
                            class="form-control"
                            id="salaryMonth"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="salaryYear" class="form-label"
                            >Godina</label
                          >
                          <input
                            v-model="salaryYear"
                            type="string"
                            class="form-control"
                            id="salaryYear"
                          />
                        </div>
                        <div class="col-md-8">
                          <label for="result" class="form-label">Ukupno</label>
                          <input
                            v-model="result"
                            type="number"
                            class="form-control"
                            id="result"
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
                @click.prevent="addNewSalary"
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
      salaryAddition: null,
      salaryMonth: null,
      salaryYear: null,
      overtimeHours: null,
      overtimeHoursSalary: null,
      total_salary: [],
    };
  },
  mounted() {
    this.getWorkerData();
    console.log(this.wCards.total_salary);
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
                .where("company_name", "==", varijabla)
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
                          .where("username", "==", varijabla)
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
                                  TotalSalary: data.total_salary,
                                },
                              ];
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
    addSalary() {
      $("#zabPlaca").modal("show");
    },
    addNewSalary() {
      var varijabla = this.$route.params.wURL;
      var izracun =
        this.wCards[0].RadniSati * this.wCards[0].Placa +
        this.salaryAddition +
        this.overtimeHours * this.overtimeHoursSalary;
      var mjesec = this.salaryMonth;
      var godina = this.salaryYear;
      this.inTotal = izracun;
      db.collection(
        "user/" +
          firebase.auth().currentUser.uid +
          "/companies/" +
          this.comp +
          "/workers"
      )
        .where("username", "==", varijabla)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.worker_id = doc.id;
            db.collection(
              "user/" +
                firebase.auth().currentUser.uid +
                "/companies/" +
                this.comp +
                "/workers"
            )
              .doc(this.worker_id)
              .update({
                total_salary: firebase.firestore.FieldValue.arrayUnion({
                  mjesec,
                  godina,
                  izracun,
                }),
              });
          });
        });
      $("#zabPlaca").modal("toggle");
    },
    updateWorker() {
      var varijabla = this.$route.params.wURL;
      db.collection(
        "user/" +
          firebase.auth().currentUser.uid +
          "/companies/" +
          this.comp +
          "/workers"
      )
        .where("username", "==", varijabla)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.worker_id = doc.id;
            db.collection(
              "user/" +
                firebase.auth().currentUser.uid +
                "/companies/" +
                this.comp +
                "/workers"
            )
              .doc(this.worker_id)
              .update({
                name: this.wCards[0].Ime,
                surname: this.wCards[0].Prezime,
                job: this.wCards[0].Pozicija,
                cityOfJob: this.wCards[0].MjestoPoslovanja,
                cityOfLiving: this.wCards[0].MjestoStanovanja,
                workHours: this.wCards[0].RadniSati,
                salary: this.wCards[0].Placa,
              })
              .then(() => {
                location.reload();
              });
          });
        });
    },
    deleteWorker() {
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
            .where("username", "==", varijabla)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                this.worker_id = doc.id;
                db.collection(
                  "user/" +
                    firebase.auth().currentUser.uid +
                    "/companies/" +
                    this.comp +
                    "/workers"
                )
                  .doc(this.worker_id)
                  .delete();
                this.$router.push({ name: "Poduzeca" });
              });
            });
        });
    },
  },
  components: {},
  computed: {
    result() {
      var a =
        this.wCards[0].RadniSati * this.wCards[0].Placa +
        this.salaryAddition +
        this.overtimeHours * this.overtimeHoursSalary;
      var b = this.salaryAddition;
      var c = this.overtimeHours * this.overtimeHoursSalary;
      return a;
    },
  },
};
</script>

<style>
.information p {
  word-break: break-all;
}

.info-container {
  padding: 20px;
  width: 40%;
  margin: 20px auto auto auto;

  border: 1px solid #f84545;
  border-radius: 5px;
}

.button-container {
  padding: 20px;
  width: 10%;
  margin: 20px auto auto auto;
}

.buttons-container button {
  width: 100%;
}

.btn {
  width: 100px;
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

@media screen and (max-width: 1480px) {
  .info-container {
    width: 70%;
  }
  .button-container {
    width: 20%;
  }
}

@media screen and (max-width: 1080px) {
  .info-container {
    width: 70%;
  }
  .button-container {
    width: 20%;
  }
}

@media screen and (max-width: 700px) {
  .info-container {
    width: 70%;
  }
  .button-container {
    width: 50%;
  }
}

@media screen and (max-width: 600px) {
  .info-container {
    width: 90%;
  }
  .button-container {
    width: 50%;
  }
}
</style>
