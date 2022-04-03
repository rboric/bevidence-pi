<template>
  <div class="poduzeca">
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
                    <form @submit.prevent="addCompany" class="row g-3">
                      <div class="col-md-4">
                        <label for="compName" class="form-label">Naziv</label>
                        <input
                          v-model="compName"
                          type="text"
                          class="form-control"
                          id="compName"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="compBusiness" class="form-label"
                          >Djelatnost</label
                        >
                        <input
                          v-model="compBusiness"
                          type="text"
                          class="form-control"
                          id="compBusiness"
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
                          placeholder=""
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
                          placeholder=""
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="compCity" class="form-label">Grad</label>
                        <input
                          v-model="compCity"
                          type="text"
                          class="form-control"
                          id="compCity"
                        />
                      </div>
                      <div class="col-md-4">
                        <label for="compState" class="form-label">Država</label>
                        <input
                          v-model="compState"
                          type="text"
                          class="form-control"
                          id="compState"
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
              @click.prevent="addCompany"
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
</template>

<script>
import PoduzeceCard from "@/components/Poduzece-Card.vue";
import { firebase } from "@/firebase";
import { db } from "@/firebase";
import localuser from "@/localuser";

export default {
  name: "Poduzeca",
  props: ["compCards"],
  data: function () {
    return {
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
  methods: {
    modalAddCompany() {
      $("#addCompany").modal("show");
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
          useradd: localuser.currentUser,
        })
        .then((doc) => {
          console.log("Uspješno dodano", doc);
          alert("Dodano novo poduzeće");
          location.reload();
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  components: {
    PoduzeceCard,
  },
};
</script>

<style scoped>
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
</style>
