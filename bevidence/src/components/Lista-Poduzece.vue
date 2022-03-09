<template>
  <li>
    <a class="dropdown-item" href="#"
      >{{ listaPoduzece.Naziv }} - {{ listaPoduzece.Lokacija }}</a
    >
  </li>
</template>

<script>
export default {
  props: ["listaPoduzece"],
  name: "ListaPoduzece",
  data() {
    return {};
  },
};
</script>
