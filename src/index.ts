/*************************************************/
/* IMPORTS & SETUP  */
/*************************************************/
import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import config from "./config";

import { router } from "./router";
import { $store, RootState } from "./store";

import {
  i18n,
  localisationService,
} from "./services/localisation.service";

import { getUserLocale } from "get-user-locale";

// Setup logger
const logLevel = Logger.DEBUG;
Logger.useDefaults();
Logger.setLevel(logLevel);

// Configure Vue
Vue.config.productionTip = false;
Vue.config.devtools = true;

// Import components
import App from "./App.vue";

import Spinner from "./components/spinner";
import Notification from "./components/notification";
import Home from "./layouts/home";

// Import styles
import "./App.scss";

// Ensure watchers are all used
import "./mixins/watcher.mixin";

// Call localisation service init before Vue is loaded
localisationService.initBeforeApplicationLoad();

/*************************************************/
/* APPLICATION SETUP  */
/*************************************************/
function initialiseApplication() {
  @Component({
    mixins: [App],
    store: $store,
    router: router,
    components: {
      Spinner,
      Notification,
      Home,
    }
  })
  class Application extends Vue {
    /*************************************************/
    /* LIFE CYCLE */
    /*************************************************/
    mounted() {
      this.initialiseApplication();
    }

    /*************************************************/
    /* COMPUTED'S */
    /*************************************************/
    get store(): RootState {
      return $store.state;
    }

    get spinnerVisible(): boolean {
      return this.store.spinnerVisible;
    }

    get applicationHasLoaded(): boolean {
      return this.store.applicationHasLoaded;
    }

    /*************************************************/
    /* METHODS */
    /*************************************************/
    initialiseApplication() {
      this.setUserLocale();

      // Simulate load to API.
      $store.dispatch("initialise").then(() => {
        Logger.info("Application initialised.");
      });
    }

    setUserLocale() {
      let locale = config.languages[config.defaultLanguage].culture;

      try {
        locale = getUserLocale();
      } catch (error) {
        Logger.error("Error getting user locale");
      }

      localisationService.initAfterApplicationLoad(locale);
    }

    /**
     * Rooted translate function.
     * @param key - The key in the locale file
     * @param payload - pass through data which should be compiled at runtime
     */
    public translate(key: any, payload?: any) {
      return i18n.t(key, payload);
    }
  }

  new Application({ i18n }).$mount("#app");
}

/*************************************************/
/* APPLICATION INITIALIZATION  */
/*************************************************/
initialiseApplication();
