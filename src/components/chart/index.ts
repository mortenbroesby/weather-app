import { mixins } from "vue-class-component";
import { Component, Prop, Watch } from "vue-property-decorator";

import { Line, mixins as chartMixins } from "vue-chartjs";

@Component({
  mixins: [chartMixins.reactiveProp],
})
export default class Chart extends mixins(Line) {
  /*************************************************/
  /* EXTERNAL PROPERTIES */
  /*************************************************/
  @Prop({ default: {} })
  chartData: Object;

  @Prop({ default: {} })
  chartOptions: Object;

  /*************************************************/
  /* WATCHERS */
  /*************************************************/
  @Watch("chartdata", { immediate: true })
  onChartUpdate() {
    this.renderChart(this.chartData, this.chartOptions);
  }

  @Watch("options", { immediate: true })
  onOptionsUpdate() {
    this.renderChart(this.chartData, this.chartOptions);
  }
}
