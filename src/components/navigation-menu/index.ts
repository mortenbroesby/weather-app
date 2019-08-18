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
    $store.dispatch("getCurrentWeather").then((result) => {
      Logger.info("refreshWeather success: ", result);
      Events.$emit("notify-me", {
        status: "notify-success",
        data: {
          title: "Success",
          text: "Content refreshed successfully"
        }
      });
    }).catch((error) => {
      Logger.warn("refreshWeather error: ", error);
      Events.$emit("notify-me", {
        status: "notify-error",
        data: {
          title: "Error",
          text: error
        }
      });
    });
  }
}
