<template>
  <div class="poduzeca">
    <div class="container">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <div class="row">
            <poduzece-card
              v-for="card in cards"
              :key="card.lokacija"
              :poduzece="card"
            />
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-12 add-div">
          <a href=""><img src="@/assets/add-button.svg" alt="" /></a>
          <!--<a href="#" class="btn btn-primary add-button">Dodaj novo poduzeće</a>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PoduzeceCard from "@/components/Poduzece-Card.vue";

let cards = [];

cards = [
  {
    Lokacija: "Zagreb",
    BrojZaposlenih: "10",
  },
  {
    Lokacija: "Pula",
    BrojZaposlenih: "110",
  },
  {
    Lokacija: "Osijek",
    BrojZaposlenih: "120",
  },
  {
    Lokacija: "Split",
    BrojZaposlenih: "1210",
  },
  {
    Lokacija: "Split",
    BrojZaposlenih: "1210",
  },
  {
    Lokacija: "Split",
    BrojZaposlenih: "1210",
  },
  {
    Lokacija: "Split",
    BrojZaposlenih: "1210",
  },
  {
    Lokacija: "Split",
    BrojZaposlenih: "1210",
  },
];

export default {
  name: "Poduzeca",
  data: function () {
    return {
      cards: cards,
    };
  },
  components: {
    PoduzeceCard,
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
  padding: 5px;
}

.card-container {
  padding: 10px;
}
</style>
