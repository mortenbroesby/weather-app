import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import template from "./home.vue";
import "./home.scss";

import { Events } from "../../eventbus";
import { $store } from "../../store";

import NavigationMenu from "../../components/navigation-menu";
import WeatherWidget from "../../components/weather-widget";

@Component({
  mixins: [template],
  components: {
    NavigationMenu,
    WeatherWidget,
  }
})
export default class Home extends mixins(StoreMixin) {
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
