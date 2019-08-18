import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Events } from "../../eventbus";

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
    $store.dispatch("setSpinner", true);
    $store.dispatch("getCurrentWeather").then((result) => {
      $store.dispatch("setSpinner", false);

      Logger.info("Refresh Weather success: ", result);

      Events.$emit("notify-me", {
        status: "is-success",
        data: {
          title: "Success",
          text: "Content refreshed successfully"
        }
      });
    }).catch((error) => {
      $store.dispatch("setSpinner", false);

      Logger.warn("Refresh Weather error: ", error);

      Events.$emit("notify-me", {
        status: "is-warning",
        data: {
          title: "Error",
          text: error
        }
      });
    });
  }
}
