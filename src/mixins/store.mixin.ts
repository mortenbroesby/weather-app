import Vue from "vue";
import { Component } from "vue-property-decorator";

import { RootState } from "../store";

/**
* VUEX STORE MIXIN
* - Facilitates easy use of store functionality.
**/

@Component
export default class StoreMixin extends Vue {
  get rootState(): RootState {
    return this.$store.state;
  }
}
