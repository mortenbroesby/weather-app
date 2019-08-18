import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import template from "./home.vue";
import "./home.scss";

import { Events } from "../../eventbus";
import { $store } from "../../store";
import { formatMessage } from "../../services/localisation.service";

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
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  isVisible: boolean = true;

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get lastUpdated() {
    return this.rootState.lastWeatherCheck;
  }

  /*************************************************/
  /* WATCHERS */
  /*************************************************/
  @Watch("lastUpdated")
  onStateUpdate() {
    this.isVisible = false;
    setTimeout(() => {
      this.isVisible = true;
    }, 1500);
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  updateLocation() {
    $store.dispatch("setSpinner", true);

    $store.dispatch("updateLocation").then((result) => {
      setTimeout(() => {
        $store.dispatch("setSpinner", false);
      }, 660);

      Logger.info("Update location success: ", result);

      Events.$emit("notify-me", {
        status: "is-success",
        data: {
          title: formatMessage("notifications.location.success.title"),
          text: formatMessage("notifications.location.success.description"),
        }
      });
    }).catch((error) => {
      setTimeout(() => {
        $store.dispatch("setSpinner", false);
      }, 660);

      Logger.warn("Update location error: ", error);

      Events.$emit("notify-me", {
        status: "is-warning",
        data: {
          title: formatMessage("notifications.location.warning.title"),
          text: formatMessage("notifications.location.warning.description"),
        }
      });
    });
  }

  refreshWeather() {
    $store.dispatch("setSpinner", true);

    $store.dispatch("getCurrentWeather").then((result) => {
      setTimeout(() => {
        $store.dispatch("setSpinner", false);
      }, 660);

      Logger.info("Refresh Weather success: ", result);

      Events.$emit("notify-me", {
        status: "is-success",
        data: {
          title: formatMessage("notifications.weather.success.title"),
          text: formatMessage("notifications.weather.success.description"),
        }
      });
    }).catch((error) => {
      setTimeout(() => {
        $store.dispatch("setSpinner", false);
      }, 660);

      Logger.warn("Refresh Weather error: ", error);

      Events.$emit("notify-me", {
        status: "is-warning",
        data: {
          title: formatMessage("notifications.weather.warning.title"),
          text: formatMessage("notifications.weather.warning.description"),
        }
      });
    });
  }
}
