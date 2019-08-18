import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./navigation-menu.vue";
import "./navigation-menu.scss";

import { $store } from "../../store";

@Component({
  mixins: [template],
})
export default class NavigationMenu extends Vue {
  /*************************************************/
  /* METHODS */
  /*************************************************/
  refreshWeather() {
    $store.dispatch("getCurrentWeather").then((result) => {
      Logger.info("refreshWeather success: ", result);
      // @TODO: Show notification success.
    }).catch((error) => {
      Logger.warn("refreshWeather error: ", error);
      // @TODO: Show notification error.
    });
  }
}
