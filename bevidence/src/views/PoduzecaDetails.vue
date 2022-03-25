<template>
  <div class="PoduzecaDetails">
    <div class="container">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <div class="col-sm-12 card-container">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <Strong>{{ Data.Naziv }} - {{ Data.Lokacija }}</Strong>
                </h5>
                <p class="card-text">
                  Adresa:
                  {{
                    Data.Ulica +
                    " " +
                    Data.Broj +
                    ", " +
                    Data.PostanskiBroj +
                    "(" +
                    Data.Drzava +
                    ")"
                  }}
                </p>
                <p class="card-text">Vlasnik: {{ Data.Vlasnik }}</p>
                <p class="card-text">Djelatnost: {{ Data.Djelatnost }}</p>
                <button
                  type="button"
                  @click="editCompany(Data)"
                  class="btn btn-primary"
                >
                  Uredi
                </button>
                <button
                  type="button"
                  @click="deleteCompany"
                  class="btn btn-primary"
                >
                  Obriši
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
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
                    <form @submit.prevent="addNewCompany" class="row g-3">
                      <div class="col-md-4">
                        <label for="companyName" class="form-label">
                          Naziv
                        </label>
                        <input
                          v-model="Data.Naziv"
                          type="text"
                          class="form-control"
                          id="companyName"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="companyBusiness" class="form-label"
                          >Djelatnost</label
                        >
                        <input
                          v-model="Data.Djelatnost"
                          type="text"
                          class="form-control"
                          id="companyBusiness"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="businessOwner" class="form-label"
                          >Vlasnik</label
                        >
                        <input
                          v-model="Data.Vlasnik"
                          type="text"
                          class="form-control"
                          id="businessOwner"
                        />
                      </div>
                      <div class="col-md-10">
                        <label for="inputAddress" class="form-label"
                          >Ulica</label
                        >
                        <input
                          v-model="Data.Ulica"
                          type="string"
                          class="form-control"
                          id="inputAddress"
                          placeholder=""
                        />
                      </div>
                      <div class="col-md-2">
                        <label for="inputAddressNumber" class="form-label"
                          >Broj</label
                        >
                        <input
                          v-model="Data.Broj"
                          type="string"
                          class="form-control"
                          id="inputAddressNumber"
                          placeholder=""
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputCity" class="form-label">Grad</label>
                        <input
                          v-model="Data.Lokacija"
                          type="text"
                          class="form-control"
                          id="inputCity"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputState" class="form-label"
                          >Država</label
                        >
                        <input
                          v-model="Data.Drzava"
                          type="text"
                          class="form-control"
                          id="inputState"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="inputZip" class="form-label"
                          >Poštanski broj</label
                        >
                        <input
                          v-model="Data.PostanskiBroj"
                          type="number"
                          class="form-control"
                          id="inputZip"
                        />
                      </div>
                      <div class="col-12">
                        <div class="col-md-2">
                          <label for="employeesNumber" class="form-label"
                            >Broj zaposlenih</label
                          >
                          <input
                            v-model="Data.BrojZaposlenih"
                            type="number"
                            class="form-control"
                            id="employeesNumber"
                          />
                        </div>
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
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Odustani
            </button>
            <button
              type="button"
              @click="updateCompany()"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >
              Spremi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import { company_id } from "../components/Lista-Poduzece.vue";

export default {
  data() {
    return {
      Data: [],
      data: {
        compName: "",
        compBusiness: "",
        compBusinessOwner: "",
        compAddress: "",
        compAddressNumber: "",
        compCity: "",
        compState: "",
        compZip: "",
        compEmployeesNumber: "",
      },
      modal: "",
    };
  },
  props: ["compCards"],
  mounted() {
    this.compURL = this.$route.params.compURL;
    this.Data = this.compCards.find((Data) => Data.Naziv == this.compURL);
  },
  methods: {
    editCompany(Data) {
      this.modal = "edit";
      this.data = Data;
      $("#editPoduzece").modal("show");
    },
    deleteCompany() {
      $("#showPoduzece").modal("show");
    },
    updateCompany() {
      db.collection("user/" + firebase.auth().currentUser.uid + "/companies")
        .get()
        .then(() => {
          var varijabla = this.Data.Naziv;
          console.log(varijabla);
          db.collection(
            "user/" + firebase.auth().currentUser.uid + "/companies"
          )
            .where("Naziv", "==", varijabla)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                company_id = doc.id;
                console.log(this.company_id);
              });
            })
            .then(() => {
              db.collection(
                "user/" + firebase.auth().currentUser.uid + "/companies"
              )
                .doc("6ndWqAFsa6te9JFT6cc3")
                .update({
                  name: this.Data.Naziv,
                  business: this.Data.Djelatnost,
                  owner: this.Data.Vlasnik,
                  address: this.Data.Ulica,
                  number: this.Data.Broj,
                  city: this.Data.Lokacija,
                  state: this.Data.Drzava,
                  zip: this.Data.PostanskiBroj,
                  employees: this.Data.BrojZaposlenih,
                });
            });
        });
    },
  },
};
</script>

<style>
.btn {
  margin: 2px;
}
.form-control {
  color: red;
}
</style>