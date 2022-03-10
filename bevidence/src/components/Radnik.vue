<template>
  <tr>
    <td>
      <img class="radnici-img" src="@/assets/p_p.png" alt="" />
    </td>
    <td>{{ radnici.Ime }}</td>
    <td>{{ radnici.Prezime }}</td>
    <td>{{ radnici.Pozicija }}</td>
    <td>{{ radnici.MjestoPoslovanja }}</td>
    <td>{{ radnici.MjestoStanovanja }}</td>
    <td><a href="">UREDI</a></td>
  </tr>
</template>

<script>
export default {
  props: ["radnici"],
  name: "Radnik",
  data() {
    return {};
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
