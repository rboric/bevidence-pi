<template>
  <div class="novo-poduzece">
    <div class="container">
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <form @submit.prevent="addNewCompany" class="row g-3">
            <div class="col-md-4">
              <label for="companyName" class="form-label">Naziv</label>
              <input
                v-model="companyName"
                type="text"
                class="form-control"
                id="companyName"
              />
            </div>
            <div class="col-md-4">
              <label for="companyBusiness" class="form-label">Djelatnost</label>
              <input
                v-model="companyBusiness"
                type="text"
                class="form-control"
                id="companyBusiness"
              />
            </div>
            <div class="col-md-4">
              <label for="businessOwner" class="form-label">Vlasnik</label>
              <input
                v-model="businessOwner"
                type="text"
                class="form-control"
                id="businessOwner"
              />
            </div>
            <div class="col-md-10">
              <label for="inputAddress" class="form-label">Ulica</label>
              <input
                v-model="inputAddress"
                type="string"
                class="form-control"
                id="inputAddress"
                placeholder=""
              />
            </div>
            <div class="col-md-2">
              <label for="inputAddressNumber" class="form-label">Broj</label>
              <input
                v-model="inputAddressNumber"
                type="string"
                class="form-control"
                id="inputAddressNumber"
                placeholder=""
              />
            </div>
            <div class="col-md-4">
              <label for="inputCity" class="form-label">Grad</label>
              <input
                v-model="inputCity"
                type="text"
                class="form-control"
                id="inputCity"
              />
            </div>
            <div class="col-md-4">
              <label for="inputState" class="form-label">Država</label>
              <input
                v-model="inputState"
                type="text"
                class="form-control"
                id="inputState"
              />
            </div>
            <div class="col-md-4">
              <label for="inputZip" class="form-label">Poštanski broj</label>
              <input
                v-model="inputZip"
                type="number"
                class="form-control"
                id="inputZip"
              />
            </div>
            <div class="col-12">
              <div class="col-md-2">
                <label for="employeesNumber" class="form-label"
                  >Početni broj zaposlenih</label
                >
                <input
                  v-model="employeesNumber"
                  type="number"
                  class="form-control"
                  id="employeesNumber"
                />
              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Dodaj</button>
              <button
                type="button"
                @click="odustani"
                class="btn btn-primary btn-odustani"
              >
                Odustani
              </button>
            </div>
          </form>
        </div>
        <div class="col-sm-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import design from "@/design";

export default {
  name: "NewCompany",
  data() {
    return {
      companyName: "",
      companyBusiness: "",
      businessOwner: "",
      inputAddress: "",
      inputAddressNumber: "",
      inputCity: "",
      inputState: "",
      inputZip: "",
      employeesNumber: "",
      design,
    };
  },
  methods: {
    addNewCompany() {
      console.log("ok");

      db.collection("companies")
        .add({
          name: this.companyName,
          buisness: this.companyBusiness,
          owner: this.businessOwner,
          address: this.inputAddress,
          number: this.inputAddressNumber,
          city: this.inputCity,
          state: this.inputState,
          zip: this.inputZip,
          employees: this.employeesNumber,
          useradd: design.currentUser,
        })
        .then((doc) => {
          console.log("Uspješno dodano", doc);
          alert("Dodano novo poduzeće");
          this.$router.push({ name: "Poduzeca" });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    odustani() {
      console.log("odustani");
      this.$router.push({ name: "Poduzeca" });
    },
  },
};
</script>

<style>
.novo-poduzece {
  padding: 25px;
}

.btn-primary {
  margin: 5px;
  background-color: #f84545 !important;
  border-color: #f84545 !important;
}

.btn-odustani {
  color: #f84545 !important;
  background-color: white !important;
}
</style>