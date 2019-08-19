<template>
  <div class="forecast-widget">
    <line-chart
      v-if="hasLoaded"
      :chartData="chartData"
      :chartOptions="chartOptions">
    </line-chart>
  </div>
</template>
