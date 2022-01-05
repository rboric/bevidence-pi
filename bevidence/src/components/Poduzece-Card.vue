<template>
  <div class="col-sm-6 card-container">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ poduzece.Lokacija }}</h5>
        <p class="card-text">Broj zaposlenih: {{ poduzece.BrojZaposlenih }}</p>
        <a href="#" class="btn btn-primary">Uredi</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["poduzece"],
  name: "PoduzeceCard",
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

.btn-primary {
  background: #f84545 !important;
  border-color: #f84545 !important;
}
</style>
