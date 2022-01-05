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
              <tr>
                <td>
                  <img class="radnici-img" src="@/assets/p_p.png" alt="" />
                </td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Zagreb</td>
                <td><a href="">UREDI</a></td>
              </tr>
              <tr>
                <td>
                  <img class="radnici-img" src="@/assets/p_p.png" alt="" />
                </td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Zagreb</td>
                <td><a href="">UREDI</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-12 add-div">
          <a href=""><img src="@/assets/add-button.svg" alt="" /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radnici",
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

.radnici-card {
  display: flex;
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