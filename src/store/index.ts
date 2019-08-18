import Vue from "vue";
import * as Vuex from "vuex";

import { Location } from "../interfaces";
import { GeoLocationModel } from "../models/location.model";

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
  userCoordinates: Location;

  // Weather
  currentWeather: string;
}

export const state: RootState = {
  // Application
  applicationHasLoaded: false,
  spinnerVisible: false,

  // User data
  userCoordinates: new GeoLocationModel().location,

  // Weather
  currentWeather: "test",
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
};

/*************************************************/
/* ACTIONS */
/*************************************************/
const actions = {
  initialise({ dispatch }: Context): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch("setApplicationInitialised", true);
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
};

/*************************************************/
/* EXPORT */
/*************************************************/
export const $store = new TypedStore({
  state: state,
  mutations: mutations,
  actions: actions,
});
