import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Viz from "@/components/Viz";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },

    {
      path: "/viz/",
      name: "VizHome",
      component: Viz
    }
  ]
});
