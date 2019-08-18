import Vue from "vue";
import Notify from "vue-notify-me";
import { Component, Prop } from "vue-property-decorator";
import { Events } from "../../eventbus";

import template from "./notification.vue";
import "./notification.scss";

@Component({
  mixins: [template],
  components: {
    Notify,
  }
})
export default class Notification extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  eventbus = Events;

  closeNotification() {
    this.$emit("hide");
  }
}
