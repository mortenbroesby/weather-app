import Logger from "js-logger";
import Vue from "vue";
import * as Vuex from "vuex";

import { geolocationService } from "../services/geolocation.service";
import { getWeather } from "../services/api.service";

import { Location, LocationError, Weather } from "../interfaces";
import { GeolocationModel } from "../models/geolocation.model";
import { WeatherModel } from "../models/weather.model";

/*************************************************/
/* SETUP */
/*************************************************/
Vue.use(Vuex);

type Mutations = typeof mutations;
type Actions = typeof actions;

interface Dispatch {
  (action: keyof Actions, payload?: any, options?: Vuex.DispatchOptions): Promise<any>;
}

interface Commit {
  (type: keyof Mutations, payload?: any, options?: Vuex.CommitOptions): void;
}

type Context = {
  dispatch: Dispatch;
  commit: Commit;
  state: RootState;
};

class TypedStore extends Vuex.Store<RootState> {
  commit: Commit;
  dispatch: Dispatch;
}

/*************************************************/
/* STATE */
/*************************************************/
export interface RootState {
  // Application
  applicationHasLoaded: boolean;
  spinnerVisible: boolean;

  // User data
  userLocation: GeolocationModel;

  // Weather
  currentWeather: WeatherModel;
}

export const state: RootState = {
  // Application
  applicationHasLoaded: false,
  spinnerVisible: false,

  // User data
  userLocation: new GeolocationModel(),

  // Weather
  currentWeather: new WeatherModel(),
};

/*************************************************/
/* MUTATIONS */
/*************************************************/
const mutations = {
  SET_APPLICATION_INITIALISED(prevState: RootState, hasInitialised: boolean): void {
    prevState.applicationHasLoaded = hasInitialised;
  },

  SET_SPINNER_VISIBILITY(prevState: RootState, isVisible: boolean): void {
    prevState.spinnerVisible = isVisible;
  },

  SET_LOCATION(prevState: RootState, userLocation: GeolocationModel): void {
    prevState.userLocation = userLocation;
  },

  SET_WEATHER(prevState: RootState, currentWeather: WeatherModel): void {
    prevState.currentWeather = currentWeather;
  },
};

/*************************************************/
/* ACTIONS */
/*************************************************/
const actions = {
  async initialise({ dispatch, commit }: Context): Promise<void> {
    dispatch("setSpinner", true);

    await dispatch("getLocation");
    await dispatch("getCurrentWeather");

    return new Promise((resolve) => {
      // Ensure the application loads for a minimum of ~0.5 seconds
      // - Better experience for the end user.
      setTimeout(() => {
        dispatch("setApplicationInitialised", true);
        dispatch("setSpinner", false);
        resolve();
      }, 660);
    });
  },

  setApplicationInitialised({ commit }: Context, hasInitialised: boolean) {
    commit("SET_APPLICATION_INITIALISED", hasInitialised);
  },

  setSpinner({ commit }: Context, isVisible: boolean): void {
    commit("SET_SPINNER_VISIBILITY", isVisible);
  },

  getLocation({ commit }: Context) {
    return geolocationService.requestLocation().then((location: GeolocationModel) => {
      commit("SET_LOCATION", location);
    }).catch((fallback: LocationError) => {
      Logger.warn("geoLocationService error: ", fallback.error);
      commit("SET_LOCATION", fallback.fallbackLocation);
    });
  },

  getCurrentWeather({ commit }: Context) {
    return getWeather(state.userLocation.location).then((weatherData) => {
      const currentWeather = new WeatherModel(weatherData);
      commit("SET_WEATHER", currentWeather);
    }).catch((error) => {
      Logger.warn("getWeather error: ", error);
    });
  },
};

/*************************************************/
/* EXPORT */
/*************************************************/
export const $store = new TypedStore({
  state: state,
  mutations: mutations,
  actions: actions,
});
