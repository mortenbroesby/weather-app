<template>
  <div class="forecast-widget" v-if="isVisible">
    <div class="forecast-widget__chartContainer">
      <line-chart />
    </div>
  </div>
</template>
