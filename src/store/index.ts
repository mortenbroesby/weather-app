import Logger from "js-logger";
import Vue from "vue";
import * as Vuex from "vuex";
import config from "../config";

import { geolocationService } from "../services/geolocation.service";
import { formatMessage } from "../services/localisation.service";
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
  lastLocationCheck: number | undefined;

  // Weather
  currentWeather: WeatherModel;
  lastWeatherCheck: number | undefined;
}

export const state: RootState = {
  // Application
  applicationHasLoaded: false,
  spinnerVisible: false,

  // User data
  userLocation: new GeolocationModel(),
  lastLocationCheck: undefined,

  // Weather
  currentWeather: new WeatherModel(),
  lastWeatherCheck: undefined,
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

  SET_LOCATION_LAST_CHECKED(prevState: RootState, timestamp: number): void {
    prevState.lastLocationCheck = timestamp;
  },

  SET_WEATHER_LAST_CHECKED(prevState: RootState, timestamp: number): void {
    prevState.lastWeatherCheck = timestamp;
  },
};

/*************************************************/
/* ACTIONS */
/*************************************************/
const actions = {
  async initialise({ dispatch, commit }: Context): Promise<void> {
    dispatch("setSpinner", true);

    await dispatch("getLocation");
    await dispatch("getCurrentWeather", true);

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
      commit("SET_LOCATION_LAST_CHECKED", Date.now());
      return location;
    }).catch((fallback: LocationError) => {
      Logger.warn("geoLocationService error: ", fallback.error);
      commit("SET_LOCATION", fallback.fallbackLocation);
      return fallback.error;
    });
  },

  updateLocation({ commit }: Context) {
    const lastChecked = state.lastLocationCheck || Date.now();
    const lastCheckedSeconds = Math.floor(lastChecked / 1000);
    const currentTimeSeconds = Math.floor(Date.now() / 1000);
    const timeDifference = currentTimeSeconds - lastCheckedSeconds;

    const shouldBlockRefresh = timeDifference < config.locationRefreshBlockInSeconds;
    if (shouldBlockRefresh) {
      return Promise.reject(formatMessage("errors.refreshLimitReached"));
    }

    return geolocationService.updateLocation().then((location: GeolocationModel) => {
      commit("SET_LOCATION", location);
      return location;
    }).catch((fallback: LocationError) => {
      Logger.warn("geoLocationService error: ", fallback.error);
      commit("SET_LOCATION", fallback.fallbackLocation);
      return fallback.error;
    });
  },

  getCurrentWeather({ commit, state }: Context, isFirstLoad: boolean) {
    const currentTime = Date.now();
    if (isFirstLoad) {
      commit("SET_WEATHER_LAST_CHECKED", currentTime);
    } else {
      const lastChecked = state.lastWeatherCheck || currentTime;
      const lastCheckedSeconds = Math.floor(lastChecked / 1000);
      const currentTimeSeconds = Math.floor(Date.now() / 1000);
      const timeDifference = currentTimeSeconds - lastCheckedSeconds;

      const shouldBlockRefresh = timeDifference < config.weatherRefreshBlockInSeconds;
      if (shouldBlockRefresh) {
        return Promise.reject(formatMessage("errors.refreshLimitReached"));
      }
    }

    return getWeather(state.userLocation.location).then((weatherData) => {
      const currentWeather = new WeatherModel(weatherData);
      commit("SET_WEATHER", currentWeather);
      commit("SET_WEATHER_LAST_CHECKED", Date.now());
      return currentWeather;
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
