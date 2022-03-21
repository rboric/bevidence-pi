<template>
  <div class="componentRadnik">
    <tr>
      <td>
        <img class="radnici-img" src="@/assets/p_p.png" alt="" />
      </td>
      <td>{{ radnici.Ime }}</td>
      <td>{{ radnici.Prezime }}</td>
      <td>{{ radnici.Pozicija }}</td>
      <td>{{ radnici.MjestoPoslovanja }}</td>
      <td>{{ radnici.MjestoStanovanja }}</td>
      <td>{{ radnici.RadniSati }}</td>
      <td>{{ radnici.Placa }}</td>
      <td>{{ radnici.RadniSati * radnici.Placa }}</td>
      <td>
        <button
          @click="modalEditWorker()"
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#editWorker"
        >
          Launch demo modal
        </button>
      </td>
    </tr>
    <!-- Modal -->
    <div
      class="modal fade"
      id="editWorker"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ radnici.Ime }} {{ radnici.Prezime }}
            </h5>
            <button
              @click="modalCloseEditWorker()"
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            Pozicija: {{ radnici.Pozicija }} <br />
            Mjesto Poslovanja: {{ radnici.MjestoPoslovanja }} <br />
            Mjesto Stanovanja: {{ radnici.MjestoStanovanja }}
          </div>
          <div class="modal-body">
            Radni sati: {{ radnici.RadniSati }}<br />
            Plaća po satu: {{ radnici.Placa }}<br />
            Ukupna plaća: {{ radnici.RadniSati * radnici.Placa }}
          </div>
          <div class="modal-footer">
            <button
              @click="modalCloseEditWorker()"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["radnici"],
  name: "Radnik",
  data() {
    return {};
  },
  methods: {
    modalEditWorker() {
      $("#editWorker").modal("show");
    },
    modalCloseEditWorker() {
      $("#editWorker").modal("toggle");
    },
  },
};
</script>
<style scoped>
td a {
  text-decoration: none;
  color: #f84545;
}

td a:hover {
  color: #d71818;
}
</style>
