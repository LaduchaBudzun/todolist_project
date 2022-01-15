import VueRouter from "vue-router";
import Todolist from "./components/Todolist.vue";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Todolist,
    },
  ],
});
