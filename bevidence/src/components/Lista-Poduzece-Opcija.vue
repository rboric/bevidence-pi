<template>
  <option id="opcija" :value="listaPoduzeceOpcija.Naziv">
    <a class="dropdown-item" href="#"
      >{{ listaPoduzeceOpcija.Naziv }} - {{ listaPoduzeceOpcija.Lokacija }}</a
    >
  </option>
</template>

<script>
export default {
  props: ["listaPoduzeceOpcija"],
  name: "ListaPoduzeceOpcija",
  data() {
    return {};
  },
  methods: {},
};
</script>
