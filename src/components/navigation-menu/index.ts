import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./navigation-menu.vue";
import "./navigation-menu.scss";

@Component({
  mixins: [template],
})
export default class NavigationMenu extends Vue {
  /*************************************************/
  /* METHODS */
  /*************************************************/
  updateLocation() {
    this.$emit("updateLocation");
  }

  refreshWeather() {
    this.$emit("refreshWeather");
  }
}
