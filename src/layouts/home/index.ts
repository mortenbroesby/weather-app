import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import template from "./home.vue";
import "./home.scss";

import { Events } from "../../eventbus";
import { $store } from "../../store";
import { formatMessage } from "../../services/localisation.service";

import { NotificationData } from "../../interfaces";
import { MessageDialogType, MessageDialogDomain } from "../../enums";

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
    this.showSpinner();

    $store.dispatch("updateLocation").then((result) => {
      Logger.info("Update location - success: ", result);

      this.sendNotification({
        domain: MessageDialogDomain.LOCATION,
        type: MessageDialogType.SUCCESS,
      });

      this.hideSpinnerDelayed();
    }).catch((error) => {
      Logger.warn("Update location - error: ", error);

      this.sendNotification({
        domain: MessageDialogDomain.LOCATION,
        type: MessageDialogType.WARNING,
      });

      this.hideSpinnerDelayed();
    });
  }

  refreshWeather() {
    this.showSpinner();

    $store.dispatch("getCurrentWeather").then((result) => {
      Logger.info("Refresh Weather - success: ", result);

      this.sendNotification({
        domain: MessageDialogDomain.WEATHER,
        type: MessageDialogType.SUCCESS,
      });

      this.hideSpinnerDelayed();
    }).catch((error) => {
      Logger.warn("Refresh Weather - error: ", error);

      this.sendNotification({
        domain: MessageDialogDomain.WEATHER,
        type: MessageDialogType.WARNING,
      });

      this.hideSpinnerDelayed();
    });
  }

  /*************************************************/
  /* UTILITY METHODS */
  /*************************************************/
  showSpinner() {
    $store.dispatch("setSpinner", true);
  }

  hideSpinnerDelayed() {
    setTimeout(() => {
      $store.dispatch("setSpinner", false);
    }, 660);
  }

  sendNotification({
    domain = MessageDialogDomain.WEATHER,
    type: messageType = MessageDialogType.SUCCESS,
  }: { domain?: string; type?: MessageDialogType } = {}) {
    const message = {
      status: `is-${messageType}`,
      data: {
        title: formatMessage(`notifications.${domain}.${messageType}.title`),
        text: formatMessage(`notifications.${domain}.${messageType}.description`),
      }
    };

    Events.$emit("notify-me", message);
  }
}
