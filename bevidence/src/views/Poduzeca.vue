<template>
  <div class="poduzeca">
    <div class="container">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <div class="row">
            <poduzece-card
              v-for="card in cards"
              :key="card.id"
              :poduzece="card"
            />
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-12 add-div">
          <button
            type="button"
            @click="addCompany()"
            class="btn btn-primary add-button"
          >
            Dodaj
          </button>
        </div>
        <!--<div class="col-12 add-div">
          <button
            type="button"
            @click="test()"
            class="btn btn-primary add-button"
          >
            Test
          </button>
        </div>-->
      </div>
    </div>

    <div
      class="modal fade"
      id="addPoduzece"
      tabindex="-1"
      aria-labelledby="addPoduzeceLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addPoduzeceLabel">Novo poduzeće</h5>
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
                        <label for="companyName" class="form-label"
                          >Naziv</label
                        >
                        <input
                          v-model="companyName"
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
                          v-model="companyBusiness"
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
                          v-model="businessOwner"
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
                          v-model="inputAddress"
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
                        <label for="inputState" class="form-label"
                          >Država</label
                        >
                        <input
                          v-model="inputState"
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
                          v-model="inputZip"
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
                            v-model="employeesNumber"
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
              data-bs-dismiss="modal"
            >
              Odustani
            </button>
            <button
              type="button"
              @click.prevent="addNewCompany"
              class="btn btn-primary"
            >
              Dodaj
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
import design from "@/design";

export default {
  name: "Poduzeca",
  data: function () {
    return {
      cards: [],
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
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      db.collection("companies")
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((companies) => {
            const data = companies.data();

            this.cards.push({
              id: data.id,
              Naziv: data.name,
              Djelatnost: data.business,
              Vlasnik: data.owner,
              Lokacija: data.city,
              Adresa: {
                Ulica: data.address,
                Broj: data.number,
                PostanskiBroj: data.zip,
              },
              Drzava: data.state,
              BrojZaposlenih: data.employees,
            });
          });
        });
    },
    addCompany() {
      $("#addPoduzece").modal("show");
    },
    /*test() {
      console.log("RADI", firebase.auth().currentUser.uid);
    },*/
    addNewCompany() {
      console.log("ok");
      var user_id = firebase.auth().currentUser.uid;
      db.collection("companies")
        .add({
          userid: user_id,
          name: this.companyName,
          business: this.companyBusiness,
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
          location.reload();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    /*addNewCompany() {
      console.log("ok");

      firebase
        .firestore()
        .collection("companies")
        .doc(firebase.auth().currentUser.uid)
        .add({
          id: this.currentUser.uid,
          name: this.companyName,
          business: this.companyBusiness,
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
          location.reload();
        })
        .catch((e) => {
          console.error(e);
        });
    },*/
  },
  components: {
    PoduzeceCard,
  },
};
</script>

<style>
.poduzeca {
  padding: 5px;
}

.add-div {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  padding: 5px;
}

.card-container {
  padding: 10px;
}
</style>
