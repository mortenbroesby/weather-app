<template>
  <div class="forecast-widget">
    <div style="display: none;" v-for="(item, key) in forecastItems" :key="key">
      {{ item }}
    </div>
  </div>
</template>
