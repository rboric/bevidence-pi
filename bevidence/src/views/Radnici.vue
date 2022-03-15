<template>
  <div class="radnici">
    <div class="container">
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mjesto rada
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <lista-poduzece
                v-for="card in cards"
                :key="card.id"
                :listaPoduzece="card"
              />
            </ul>
          </div>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Slika</th>
                <th scope="col">Ime</th>
                <th scope="col">Prezime</th>
                <th scope="col">Pozicija</th>
                <th scope="col">Mjesto poslovanja</th>
                <th scope="col">Mjesto stanovanja</th>
                <th scope="col">UREDI</th>
              </tr>
            </thead>
            <tbody>
              <radnik v-for="row in rows" :key="row.id" :radnici="row" />
            </tbody>
          </table>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-12 add-div">
          <a
            type="button"
            @click="addWorkerModal()"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            ><img src="@/assets/add-button.svg" alt=""
          /></a>
        </div>
      </div>
      <!-- Start modal -->
      <div
        class="modal fade"
        id="addWorker"
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
                      <form @submit.prevent="addWorker" class="row g-3">
                        <div class="col-md-6">
                          <label for="wName" class="form-label">Ime</label>
                          <input
                            v-model="wName"
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
                            v-model="wSurname"
                            type="string"
                            class="form-control"
                            id="wSurname"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="wJob" class="form-label">Pozicija</label>
                          <input
                            v-model="wJob"
                            type="string"
                            class="form-control"
                            id="wJob"
                          />
                        </div>
                        <div class="col-md-4">
                          <label for="wJobCity" class="form-label"
                            >Mjesto poslovanja</label
                          >

                          <select
                            v-model="wJobCity"
                            class="form-control"
                            id="wJobCity"
                          >
                            <lista-poduzece-opcija
                              v-for="card in cards"
                              :key="card.id"
                              :listaPoduzeceOpcija="card"
                            />
                          </select>
                        </div>
                        <div class="col-md-4">
                          <label for="wCityOfLiving" class="form-label"
                            >Mjesto stanovanja</label
                          >
                          <input
                            v-model="wCityOfLiving"
                            type="string"
                            class="form-control"
                            id="wCityOfLiving"
                            placeholder=""
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
                @click.prevent="addWorker"
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
import design from "@/design";
import Radnik from "@/components/Radnik.vue";
import { company_id } from "@/components/Lista-Poduzece.vue";
import ListaPoduzece from "@/components/Lista-Poduzece.vue";
import ListaPoduzeceOpcija from "@/components/Lista-Poduzece-Opcija.vue";

export default {
  name: "Radnici",
  data: function () {
    return {
      cards: [],
      rows: [],
      wName: "",
      wSurname: "",
      wJob: "",
      wJobCity: "",
      wCityOfLiving: "",
      design,
    };
  },
  mounted() {
    this.getData();
    this.wGetData();
  },
  methods: {
    getData() {
      db.collection("user")
        .get()
        .then(() => {
          db.collection(
            "user/" + firebase.auth().currentUser.uid + "/companies"
          )
            .get()
            .then((query) => {
              this.cards = [];
              query.forEach((companies) => {
                const data = companies.data();

                this.cards.push({
                  Naziv: data.name,
                  Lokacija: data.city,
                });
              });
            });
        });
    },
    wGetData() {
      db.collection("user")
        .get()
        .then(() => {
          db.collection(
            "user/" +
              firebase.auth().currentUser.uid +
              "/companies/" +
              company_id +
              "/workers"
          )
            .get()
            .then((query) => {
              this.rows = [];
              query.forEach((workers) => {
                const data = workers.data();

                this.rows.push({
                  Ime: data.name,
                  Prezime: data.surname,
                  Pozicija: data.job,
                  MjestoPoslovanja: data.cityOfJob,
                  MjestoStanovanja: data.cityOfLiving,
                });
              });
            });
        });
    },
    addWorkerModal() {
      $("#addWorker").modal("show");
    },
    addWorker() {
      db.collection(
        "user/" +
          firebase.auth().currentUser.uid +
          "/companies/x31IgY5LL5hDSh3zPFQt/workers"
      )
        .add({
          name: this.wName,
          surname: this.wSurname,
          job: this.wJob,
          cityOfJob: this.wJobCity,
          cityOfLiving: this.wCityOfLiving,
        })
        .then(() => {
          location.reload();
        });
    },
  },
  components: {
    Radnik,
    ListaPoduzece,
    ListaPoduzeceOpcija,
  },
};
</script>

ListaPoduzece
<style>
.add-div {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.radnici {
  padding: 25px;
  overflow-x: auto;
}

.radnici-img {
  border-radius: 100%;
  height: auto;
  width: 40px;
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

.dropdown {
  padding: 10px;
}
</style>
