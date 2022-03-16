<template>
  <div class="col-sm-6 card-container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          {{ poduzece.Naziv }} - {{ poduzece.Lokacija }}
        </h5>
        <p class="card-text">
          Adresa:
          {{
            poduzece.Adresa.Ulica +
            " " +
            poduzece.Adresa.Broj +
            ", " +
            poduzece.Adresa.PostanskiBroj
          }}
        </p>
        <p class="card-text">Broj zaposlenika: {{ poduzece.BrojZaposlenih }}</p>
        <button type="button" @click="showCompany" class="btn btn-primary">
          Detalji
        </button>
      </div>
    </div>
    <!-- <div
      class="modal fade"
      id="showPoduzece"
      tabindex="-1"
      aria-labelledby="showPoduzeceLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="showPoduzeceLabel">
              Detalji o poduzeću
            </h5>
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
                    <form class="row g-3">
                      <div class="col-md-4">
                        <h6>Naziv</h6>
                        <p>{{ poduzece.Naziv }}</p>
                      </div>
                      <div class="col-md-4">
                        <h6>Djelatnost</h6>
                        <p>{{ poduzece.Djelatnost }}</p>
                      </div>
                      <div class="col-md-4">
                        <h6>Vlasnik</h6>
                        <p>{{ poduzece.Vlasnik }}</p>
                      </div>
                      <div class="col-md-8">
                        <h6>Ulica</h6>
                        <p>{{ poduzece.Adresa.Ulica }}</p>
                      </div>
                      <div class="col-md-4">
                        <h6>Broj</h6>
                        <p>{{ poduzece.Adresa.Broj }}</p>
                      </div>
                      <div class="col-md-4">
                        <h6>Grad</h6>
                        <p>{{ poduzece.Lokacija }}</p>
                      </div>
                      <div class="col-md-4">
                        <h6>Država</h6>
                        <p>{{ poduzece.Drzava }}</p>
                      </div>
                      <div class="col-md-4">
                        <h6>Poštanski broj</h6>
                        <p>{{ poduzece.Adresa.PostanskiBroj }}</p>
                      </div>
                      <div class="col-12">
                        <div class="col-md-2">
                          <h6>Broj zaposlenika</h6>
                          <p>{{ poduzece.BrojZaposlenih }}</p>
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
              Obriši
            </button>
            <button
              type="button"
              @click.prevent="editCompany"
              class="btn btn-primary"
            >
              Uredi
            </button>
          </div>
        </div>
      </div>
    </div>
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
            <h5 class="modal-title" id="editPoduzeceLabel">Novo poduzeće</h5>
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
              @click.prevent="editCompany"
              class="btn btn-primary"
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  props: ["poduzece"],
  name: "PoduzeceCard",

  data() {
    return {};
  },
  methods: {
    showCompany(card) {
      $("#showPoduzece").modal("show");
    },
    editCompany(card) {
      $("#editPoduzece").modal("show");
    },
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
  padding: 2px;
}

.card-container {
  padding: 10px;
}

.btn-primary {
  background: #f84545 !important;
  border-color: #f84545 !important;
}

.card p {
  margin: 0 0 10px !important;
}
</style>
