<template>
  <div class="Profile">
    <preloader />
    <button class="backBtn" onclick="history.back()">&#8249;</button>
    <div v-for="user in userData" :key="user.id" :userData="userData">
      {{ user.Ime }} {{ user.Prezime }}
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { firebase } from "@/firebase";
import localuser from "@/localuser";
import Preloader from "../components/Preloader.vue";

export default {
  name: "Home",
  data() {
    return {
      localuser,
      userData: [],
    };
  },
  mounted() {
    this.userGetData();
  },
  methods: {
    userGetData() {
      db.collection("user")
        .get()
        .then(() => {
          db.collection("user")
            .where("Email", "==", firebase.auth().currentUser.email)
            .get()
            .then((query) => {
              this.userData = [];
              query.forEach((user) => {
                const data = user.data();

                this.userData.push({
                  Ime: data.Ime,
                  Prezime: data.Prezime,
                });
                console.log(this.userData);
              });
            });
        });
    },
  },
  components: { Preloader },
};
</script>

<style>
.backBtn {
  text-decoration: none;
  display: inline-block;
  background-color: #f84545;
  width: 35px;
  height: 35px;
  margin-top: 20px;
  border-radius: 50px;
  color: white;
  transition: 0.3s;
}

.backBtn:hover {
  background-color: #d71818;
  transition: 0.3s;
}

@media screen and (min-width: 1080px) {
  .backBtn {
    display: none;
  }
}
</style>
