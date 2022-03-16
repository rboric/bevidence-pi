<template>
  <li>
    <a class="dropdown-item" @click="func1()"
      >{{ listaPoduzece.Naziv }} - {{ listaPoduzece.Lokacija }}</a
    >
  </li>
</template>

<script>
import { firebase, db } from "@/firebase";

export default {
  props: ["listaPoduzece"],
  name: "ListaPoduzece",
  data() {
    return {};
  },
  methods: {
    func1() {
      db.collection("user/" + firebase.auth().currentUser.uid + "/companies")
        .get()
        .then(() => {
          var varijabla = this.listaPoduzece.Naziv;
          db.collection(
            "user/" + firebase.auth().currentUser.uid + "/companies"
          )
            .where("name", "==", varijabla)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                company_id = doc.id;
              });
            });
        });
    },
  },
};
export var company_id;
</script>
