<template>
  <div class="RadniciDetails">
    <preloader />
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
        <div class="information col-3">
          <p>{{ wCard.Pozicija }}</p>
          <p>{{ wCard.MjestoPoslovanja }}</p>
          <p>{{ wCard.MjestoStanovanja }}</p>
          <p>{{ wCard.RadniSati }} h</p>
          <p>{{ wCard.Placa }} kn / h</p>
          <p>{{ wCard.Placa * wCard.RadniSati }} kn</p>
        </div>
        <div class="information col-3">
          <div class="buttons-container">
            <button class="btn btn-primary" @click="editWorker()">Uredi</button>
            <p></p>
            <button class="btn btn-primary" @click="deleteWorker()">
              Obriši
            </button>
            <p></p>
            <button class="btn btn-primary" @click="addSalary()">Plaća</button>
          </div>
        </div>
        <hr />
        <div class="information col-12">
          <h3><b>Slobodni dani</b></h3>
          <p></p>
          <button
            style="width: 20%"
            class="btn btn-primary"
            @click="modalDaysOff()"
          >
            Slobodni dani
          </button>
          <v-data-table
            :headers="headersDaysOff"
            :items="daysOff"
            class="elevation-1"
            hide-default-footer
          ></v-data-table>
        </div>
        <hr />
        <div class="information col-6">
          <h3><b>Detaljni prikaz plaće</b></h3>
        </div>
        <div class="information">
          <v-data-table
            :headers="headersSalary"
            :items="totalSalary"
            class="elevation-1"
            hide-default-footer
          ></v-data-table>
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
                            type="string"
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
                            type="string"
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
                            type="string"
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
                            type="string"
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
                            type="string"
                            class="form-control"
                            id="salaryAddition"
                          />
                        </div>
                        <div class="col-md-2">
                          <label for="salaryMonth" class="form-label"
                            >Mjesec</label
                          >
                          <select
                            v-model="salaryMonth"
                            type="string"
                            class="form-control"
                            id="salaryMonth"
                          >
                            <option value="Siječanj">Siječanj</option>
                            <option value="Veljača">Veljača</option>
                            <option value="Ožujak">Ožujak</option>
                            <option value="Travanj">Travanj</option>
                            <option value="Svibanj">Svibanj</option>
                            <option value="Lipanj">Lipanj</option>
                            <option value="Srpanj">Srpanj</option>
                            <option value="Kolovoz">Kolovoz</option>
                            <option value="Rujan">Rujan</option>
                            <option value="Listopad">Listopad</option>
                            <option value="Studeni">Studeni</option>
                            <option value="Prosinac">Prosinac</option>
                          </select>
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
                            type="string"
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
      <!-- MODAL NEW DAYS OFF -->
      <div
        class="modal fade"
        id="addDaysOff"
        tabindex="-1"
        aria-labelledby="addDaysOffLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addDaysOffLabel">
                Novi zapis o slobodnim danima
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="days-off">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-12">
                      <form @submit.prevent="addNewDaysOff" class="row g-3">
                        <div class="col-md-6">
                          <label for="doDateBegin" class="form-label"
                            >Početak</label
                          >
                          <input
                            v-model="doDateBegin"
                            type="date"
                            class="form-control"
                            id="doDateBegin"
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="doDateEnd" class="form-label">Kraj</label>
                          <input
                            v-model="doDateEnd"
                            type="date"
                            class="form-control"
                            id="doDateEnd"
                          />
                        </div>
                        <div class="col-md-12">
                          <label for="doReason" class="form-label"
                            >Razlog</label
                          >
                          <input
                            v-model="doReason"
                            type="string"
                            class="form-control"
                            id="doReason"
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
                @click.prevent="addDaysOff"
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
import Preloader from "../components/Preloader.vue";

export default {
  name: "RadniciDetails",
  data() {
    return {
      wCards: [],
      doReason: "",
      doDateBegin: "",
      doDateEnd: "",
      salaryAddition: 0,
      salaryMonth: "",
      salaryYear: new Date().getFullYear(),
      overtimeHours: 0,
      overtimeHoursSalary: 0,
      totalSalary: [],
      daysOff: [],
      headersSalary: [
        {
          text: "Mjesec",
          align: "start",
          sortable: false,
          value: "mjesec",
        },
        { text: "Godina", value: "godina" },
        { text: "Plaća", value: "placa" },
        { text: "Dodatak na plaću", value: "dodatak" },
        { text: "Prekovremeni sati", value: "prekovremeniSati" },
        { text: "Prekovremeni satnica", value: "prekovremeniSatnica" },
        { text: "Prekovremeni ukupno", value: "prekovremeniUkupno" },
        { text: "Sveukupni izračun", value: "izracun" },
      ],
      headersDaysOff: [
        {
          text: "Početni datum",
          align: "start",
          value: "pocetniDatum",
          width: "15%",
        },
        { text: "Završni datum", value: "zavrsniDatum", width: "15%" },

        { text: "Razlog", sortable: false, value: "razlog", width: "70%" },
      ],
    };
  },
  mounted() {
    this.getWorkerData();
    this.getWorkerSalaryData();
    this.getWorkerDaysOffData();
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
                              this.wCards.push({
                                Ime: data.name,
                                Prezime: data.surname,
                                Pozicija: data.job,
                                MjestoPoslovanja: data.cityOfJob,
                                MjestoStanovanja: data.cityOfLiving,
                                RadniSati: data.workHours,
                                Placa: data.salary,
                              });
                            });
                          });
                      });
                  });
                });
            });
        });
    },
    getWorkerSalaryData() {
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
                            query.forEach((doc) => {
                              const data = doc.data();
                              this.totalSalary = data.total_salary;
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
    modalDaysOff() {
      $("#addDaysOff").modal("show");
    },
    addNewSalary() {
      var varijabla = this.$route.params.wURL;
      var placa = this.wCards[0].RadniSati * this.wCards[0].Placa;
      var b = this.salaryAddition;
      var c = this.overtimeHours * this.overtimeHoursSalary;
      var izracun = parseFloat(placa) + parseFloat(b) + parseFloat(c);
      var mjesec = this.salaryMonth;
      var godina = this.salaryYear;
      var dodatak = this.salaryAddition;
      var prekovremeniSati = this.overtimeHours;
      var prekovremeniSatnica = this.overtimeHoursSalary;
      var prekovremeniUkupno = prekovremeniSati * prekovremeniSatnica;

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
                  placa,
                  dodatak,
                  prekovremeniSati,
                  prekovremeniSatnica,
                  prekovremeniUkupno,
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
    addDaysOff() {
      var varijabla = this.$route.params.wURL;
      var razlog = this.doReason;
      var pocetniDatum = this.doDateBegin;
      var zavrsniDatum = this.doDateEnd;
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
                days_off: firebase.firestore.FieldValue.arrayUnion({
                  razlog,
                  pocetniDatum,
                  zavrsniDatum,
                }),
              });
          });
        });
      $("#addDaysOff").modal("toggle");
    },
    getWorkerDaysOffData() {
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
                            query.forEach((doc) => {
                              const data = doc.data();
                              this.daysOff = data.days_off;
                            });
                          });
                      });
                  });
                });
            });
        });
    },
  },
  components: { Preloader },
  computed: {
    result() {
      var a = this.wCards[0].RadniSati * this.wCards[0].Placa;
      var b = this.salaryAddition;
      var c = this.overtimeHours * this.overtimeHoursSalary;
      return parseFloat(a) + parseFloat(b) + parseFloat(c);
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
  width: 60%;
  margin: 20px auto 20px auto;
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
    width: 100%;
    padding: 5px;
    border: none;
  }
  .button-container {
    width: 50%;
  }
}
@media screen and (max-width: 400px) {
  body {
    font-size: 14px;
  }
  .info-container {
    width: 100%;
    padding: 5px;
    border: none;
  }
  .button-container {
    width: 50%;
  }
  .buttons-container button {
    width: 110%;
  }
}
</style>
