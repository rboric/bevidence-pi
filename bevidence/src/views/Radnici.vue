<template>
  <div class="radnici">
    <div class="container">
      <div class="row">
        <div class="col-sm-1"></div>
        <div class="col-sm-10">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mjesto rada
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Firma 1</a></li>
              <li><a class="dropdown-item" href="#">Firma 2</a></li>
              <li><a class="dropdown-item" href="#">Firma 3</a></li>
              <li><a class="dropdown-item" href="#">Svi radnici</a></li>
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
                <th scope="col">Mjesto</th>
                <th scope="col">UREDI</th>
              </tr>
            </thead>
            <tbody>
              <radnik />
            </tbody>
          </table>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-12 add-div">
          <a href=""><img src="@/assets/add-button.svg" alt="" /></a>
        </div>
      </div>
      <!-- Start modal -->
      <div>
        <!-- Button trigger modal -->
        <button>Launch demo modal</button>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import Radnik from "@/components/Radnik.vue";
import { db } from "@/firebase";
import design from "@/design";

export default {
  name: "Radnici",
  data() {
    return {
      wName: "",
      wSurname: "",
      wCity: "",
    };
  },
  methods: {
    addWorker() {
      $("#exampleModalCenter").modal("show");
    },
    components: {
      Radnik,
    },
  },
};
</script>

<style>
.add-div {
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.radnici {
  padding: 25px;
}

.radnici-img {
  border-radius: 100%;
  height: auto;
  width: 40px;
}

.btn-secondary {
  color: #fff;
  background-color: #f84545 !important;
  border-color: #f84545 !important;
}

.dropdown {
  padding: 10px;
}
</style>
