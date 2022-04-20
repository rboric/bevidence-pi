<template>
  <div class="PoduzecaDetails">
    <preloader />
    <div class="container" v-for="compCard in compCards" :key="compCard.id">
      <button class="backBtn" onclick="history.back()">&#8249;</button>
      <div class="row">
        <div class="col-12">
          <h5 class="h5margin">
            <Strong>{{ compCard.Naziv }} - {{ compCard.Lokacija }}</Strong>
          </h5>
          <p>
            <b> Adresa:</b> <br />
            {{
              compCard.Ulica +
              " " +
              compCard.Broj +
              ", " +
              compCard.PostanskiBroj +
              " - " +
              compCard.Drzava
            }}
          </p>
          <p><b> Vlasnik:</b> <br />{{ compCard.Vlasnik }}</p>
          <p>
            <b> Djelatnost:</b> <br />
            {{ compCard.Djelatnost }}
          </p>
          <p>
            <b> Broj zaposlenih:</b> <br />
            {{ wCards.length }}
          </p>
          <button
            type="button"
            @click="modalEditCompany()"
            class="btn btn-primary"
          >
            Uredi
          </button>
          <button
            type="button"
            @click="deleteCompany()"
            class="btn btn-primary"
          >
            Obriši
          </button>
        </div>
        <div class="line">
          <hr />
          <h5><b>Zaposlenici</b></h5>
        </div>
        <radnik v-for="wCard in wCards" :key="wCard.id" :radnici="wCard" />
        <div class="col-12 add-div">
          <a
            class="addButton"
            type="button"
            @click="addWorkerModal()"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            ><img src="@/assets/add-button.svg" alt=""
          /></a>
        </div>
      </div>
      <!-- MODAL EDIT COMPANY -->
      <div
        class="modal fade"
        id="editPoduzece"
        tabindex="-1"
        aria-labelledby="editPoduzeceLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPoduzeceLabel">Uredi poduzeće</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="novo-poduzece">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-12">
                      <form
                        class="form-editcompany row g-3"
                        @submit.prevent="updateCompany"
                      >
                        <div class="col-md-4">
                          <label for="companyName" class="form-label">
                            Naziv
                          </label>
                          <input
                            v-model="compCard.Naziv"
                            type="text"
                            class="form-control"
                            id="companyName"
                            required
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="companyBusiness" class="form-label"
                            >Djelatnost</label
                          >
                          <input
                            v-model="compCard.Djelatnost"
                            type="text"
                            class="form-control"
                            id="companyBusiness"
                            required
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="businessOwner" class="form-label"
                            >Vlasnik</label
                          >
                          <input
                            v-model="compCard.Vlasnik"
                            type="text"
                            class="form-control"
                            id="businessOwner"
                            required
                          />
                        </div>
                        <div class="col-md-10">
                          <label for="inputAddress" class="form-label"
                            >Ulica</label
                          >
                          <input
                            v-model="compCard.Ulica"
                            type="string"
                            class="form-control"
                            id="inputAddress"
                            required
                          />
                        </div>
                        <div class="col-md-2">
                          <label for="inputAddressNumber" class="form-label"
                            >Broj</label
                          >
                          <input
                            v-model="compCard.Broj"
                            type="string"
                            class="form-control"
                            id="inputAddressNumber"
                            required
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="inputCity" class="form-label">Grad</label>
                          <input
                            v-model="compCard.Lokacija"
                            type="text"
                            class="form-control"
                            id="inputCity"
                            required
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="inputState" class="form-label"
                            >Država</label
                          >
                          <input
                            v-model="compCard.Drzava"
                            type="text"
                            class="form-control"
                            id="inputState"
                            required
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="inputZip" class="form-label"
                            >Poštanski broj</label
                          >
                          <input
                            v-model="compCard.PostanskiBroj"
                            type="number"
                            class="form-control"
                            id="inputZip"
                            required
                          />
                        </div>
                        <div class="submit-button">
                          <button class="btn btn-primary">Uredi</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL NEW WORKER -->
    <div
      class="modal fade"
      id="addWorker"
      tabindex="-1"
      aria-labelledby="addRadnikLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addRadnikLabel">Novi radnik</h5>
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
                    <form
                      class="form-addworker row g-3"
                      @submit.prevent="addWorker"
                    >
                      <div class="col-md-6">
                        <label for="wName" class="form-label">Ime</label>
                        <input
                          v-model="wName"
                          type="string"
                          class="form-control"
                          id="wName"
                          required
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="wSurname" class="form-label">Prezime</label>
                        <input
                          v-model="wSurname"
                          type="string"
                          class="form-control"
                          id="wSurname"
                          required
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="wJob" class="form-label">Pozicija</label>
                        <input
                          v-model="wJob"
                          type="string"
                          class="form-control"
                          id="wJob"
                          required
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="wCityOfLiving" class="form-label"
                          >Mjesto stanovanja</label
                        >
                        <input
                          v-model="wCityOfLiving"
                          type="string"
                          class="form-control"
                          id="wCityOfLiving"
                          required
                        />
                      </div>
                      <div class="col-md-6">
                        <label for="wJobCity" class="form-label"
                          >Mjesto poslovanja</label
                        >
                        <input
                          v-model="wJobCity"
                          type="string"
                          class="form-control"
                          id="wJobCity"
                          required
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="wWorkHours" class="form-label"
                          >Radni sati</label
                        >
                        <input
                          v-model="wWorkHours"
                          type="string"
                          class="form-control"
                          id="wWorkHours"
                          required
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="wSalary" class="form-label"
                          >Početna plaća</label
                        >
                        <input
                          v-model="wSalary"
                          type="string"
                          class="form-control"
                          id="wSalary"
                          required
                        />
                      </div>
                      <div class="submit-button">
                        <button class="btn btn-primary">Dodaj</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import Radnik from "@/components/Radnik.vue";
import localuser from "@/localuser";
import Preloader from "@/components/Preloader.vue";

export default {
  data() {
    return {
      compCards: [],
      comp: "",
      wCards: [],
      wName: "",
      wSurname: "",
      wJob: "",
      wJobCity: "",
      wCityOfLiving: "",
      wWorkHours: "",
      wSalary: "",
      wTotalSalary: [],

      localuser,
    };
  },
  mounted() {
    this.getWorkerData();
    this.compGetData();
  },
  methods: {
    modalEditCompany() {
      $("#editPoduzece").modal("show");
    },
    compGetData() {
      this.compURL = this.$route.params.compURL;
      db.collection("user")
        .get()
        .then(() => {
          var varijabla = this.compURL;
          db.collection(
            "user/" + firebase.auth().currentUser.uid + "/companies"
          )
            .where("company_name", "==", varijabla)
            .get()
            .then((query) => {
              this.compCards = [];
              query.forEach((companies) => {
                const data = companies.data();

                this.compCards.push({
                  Naziv: data.name,
                  Djelatnost: data.business,
                  Vlasnik: data.owner,
                  Lokacija: data.city,
                  Ulica: data.address,
                  Broj: data.number,
                  PostanskiBroj: data.zip,
                  Drzava: data.state,
                  BrojZaposlenih: data.employees,
                  Company_Name: data.company_name,
                });
              });
            });
        });
    },
    getWorkerData() {
      this.compURL = this.$route.params.compURL;
      db.collection("user")
        .get()
        .then(() => {
          db.collection(
            "user/" + firebase.auth().currentUser.uid + "/companies"
          )
            .get()
            .then(() => {
              var varijabla = this.$route.params.compURL;
              db.collection(
                "user/" + firebase.auth().currentUser.uid + "/companies"
              )
                .where("company_name", "==", varijabla)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    this.comp = doc.id;
                    db.collection("user")
                      .get()
                      .then(() => {
                        db.collection(
                          "user/" +
                            firebase.auth().currentUser.uid +
                            "/companies/" +
                            this.comp +
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
                                Username: data.username,
                              });
                            });
                          });
                      });
                  });
                });
            });
        });
    },
    updateCompany() {
      db.collection("user/" + firebase.auth().currentUser.uid + "/companies")
        .doc(this.comp)
        .update({
          name: this.compCards[0].Naziv,
          business: this.compCards[0].Djelatnost,
          owner: this.compCards[0].Vlasnik,
          address: this.compCards[0].Ulica,
          number: this.compCards[0].Broj,
          city: this.compCards[0].Lokacija,
          state: this.compCards[0].Drzava,
          zip: this.compCards[0].PostanskiBroj,
          employees: this.compCards[0].BrojZaposlenih,
        })
        .then(() => {
          alert("Uspješno izvršene promjene na poduzeću");
          location.reload();
        });
    },
    deleteCompany() {
      let confirmAction = confirm(
        "Jeste li sigurni da želite obrisati poduzeće?"
      );
      if (confirmAction) {
        db.collection("user/" + firebase.auth().currentUser.uid + "/companies")
          .doc(this.comp)
          .delete();
        alert("Poduzeće je uspješno obrisano");
        this.$router.push({ name: "Poduzeca" });
      } else {
        alert("Brisnje otkazano");
      }
    },
    addWorkerModal() {
      $("#addWorker").modal("show");
    },
    addWorker() {
      this.compURL = this.$route.params.compURL;
      db.collection(
        "user/" +
          firebase.auth().currentUser.uid +
          "/companies/" +
          this.comp +
          "/workers"
      )
        .add({
          name: this.wName,
          surname: this.wSurname,
          job: this.wJob,
          cityOfJob: this.wJobCity,
          cityOfLiving: this.wCityOfLiving,
          workHours: this.wWorkHours,
          salary: this.wSalary,
          username:
            this.wName.toLowerCase() +
            "." +
            this.wSurname.toLowerCase() +
            "." +
            Math.floor(Math.random() * 100) +
            1,
        })
        .then(() => {
          alert("Uspješno ste dodali novog radnika");
          location.reload();
        });
    },
  },
  components: {
    Radnik,
    Preloader,
  },
};
export var comp;
</script>

<style scoped>
.backBtn {
  text-decoration: none;
  display: inline-block;
  background-color: #f84545;
  width: 35px;
  height: 35px;
  margin-top: 20px;
  border-radius: 50px;
  color: white;
  transition: 0.3s;
}

.backBtn:hover {
  background-color: #d71818;
  transition: 0.3s;
}

.add-div {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addButton img {
  transition: 0.3s;
}
.addButton:hover img {
  opacity: 0.7;
  transition: 0.3s;
}
.addButton {
  margin-bottom: 40px;
}
.h5margin {
  margin-top: 20px;
}
hr {
  background-color: #f84545;
}
.btn {
  margin-top: 10px;
  margin-right: 10px;
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

@media screen and (min-width: 1080px) {
  .backBtn {
    display: none;
  }
}
</style>
