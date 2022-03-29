<template>
  <div>
    <radnici-detalji />
  </div>
</template>

<script>
import RadniciDetalji from "@/components/RadniciDetalji.vue";

export default {
  props: ["radnici"],
  name: "RadniciDetails",
  data() {
    return {
      Data: [],
    };
  },
  mounted() {
    this.wURL = this.$route.params.wURL;
    console.log(this.wURL);
    this.Data = this.radnici.find((Data) => Data.Ime == this.wURL);
  },
  components: {
    RadniciDetalji,
  },
};
</script>

<style></style>
