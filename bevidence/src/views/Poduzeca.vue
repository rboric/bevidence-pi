<template>
  <div class="poduzeca">
    <preloader />
    <div class="container">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <div class="row">
            <poduzece-card
              v-for="compCard in compCards"
              :key="compCard.id"
              :compCard="compCard"
            />
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-12 add-div">
          <a
            class="addCompanyButton"
            type="button"
            @click="modalAddCompany()"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <img src="@/assets/add-button.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="addCompany"
      tabindex="-1"
      aria-labelledby="addCompanyLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCompanyLabel">Novo poduzeće</h5>
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
                      class="form-addcompany row g-3"
                      @submit.prevent="addCompany"
                    >
                      <div class="col-md-4">
                        <label for="compName" class="form-label">Naziv</label>
                        <input
                          v-model="compName"
                          type="text"
                          class="form-control"
                          id="compName"
                          required
                        />
                      </div>
                      <div class="form-group col-md-4">
                        <label for="compBusiness" class="form-label"
                          >Djelatnost</label
                        >
                        <input
                          v-model="compBusiness"
                          type="text"
                          class="form-control"
                          id="compBusiness"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="compBusinessOwner" class="form-label"
                          >Vlasnik</label
                        >
                        <input
                          v-model="compBusinessOwner"
                          type="text"
                          class="form-control"
                          id="compBusinessOwner"
                          required
                        />
                      </div>
                      <div class="col-md-10">
                        <label for="compAddress" class="form-label"
                          >Ulica</label
                        >
                        <input
                          v-model="compAddress"
                          type="string"
                          class="form-control"
                          id="compAddress"
                          required
                        />
                      </div>
                      <div class="col-md-2">
                        <label for="compAddressNumber" class="form-label"
                          >Broj</label
                        >
                        <input
                          v-model="compAddressNumber"
                          type="string"
                          class="form-control"
                          id="compAddressNumber"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="compCity" class="form-label">Grad</label>
                        <input
                          v-model="compCity"
                          type="text"
                          class="form-control"
                          id="compCity"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="compState" class="form-label">Država</label>
                        <input
                          v-model="compState"
                          type="text"
                          class="form-control"
                          id="compState"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="compZip" class="form-label"
                          >Poštanski broj</label
                        >
                        <input
                          v-model="compZip"
                          type="number"
                          class="form-control"
                          id="compZip"
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
import PoduzeceCard from "@/components/Poduzece-Card.vue";
import Preloader from "@/components/Preloader.vue";
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import localuser from "@/localuser";
export default {
  name: "Poduzeca",
  data: function () {
    return {
      compCards: [],
      compName: "",
      compBusiness: "",
      compBusinessOwner: "",
      compAddress: "",
      compAddressNumber: "",
      compCity: "",
      compState: "",
      compZip: "",
      compEmployeesNumber: "",
      localuser,
    };
  },
  mounted() {
    this.compGetData();
  },
  methods: {
    modalAddCompany() {
      $("#addCompany").modal("show");
    },
    compGetData() {
      db.collection("user")
        .get()
        .then(() => {
          db.collection(
            "user/" + firebase.auth().currentUser.uid + "/companies"
          )
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
    addCompany() {
      db.collection("user/" + firebase.auth().currentUser.uid + "/companies")
        .add({
          name: this.compName,
          business: this.compBusiness,
          owner: this.compBusinessOwner,
          address: this.compAddress,
          number: this.compAddressNumber,
          city: this.compCity,
          state: this.compState,
          zip: this.compZip,
          employees: this.compEmployeesNumber,
          company_name:
            this.compName.toLowerCase() +
            "." +
            Math.floor(Math.random() * 100) +
            1,
          useradd: localuser.currentUser,
        })
        .then(() => {
          alert("Uspješno dodano novo poduzeće");
          location.reload();
        });
    },
  },
  components: {
    PoduzeceCard,
    Preloader,
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.poduzeca {
  padding: 5px;
}
.add-div {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addCompanyButton {
  transition: 0.3s;
}
.addCompanyButton:hover {
  opacity: 0.8;
  transition: 0.3s;
}
.card {
  padding: 5px;
}
.card-container {
  padding: 10px;
}
.btn {
  margin-top: 10px;
  margin-right: 10px;
}
</style>