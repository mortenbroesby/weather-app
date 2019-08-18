<template>
  <div id="home" class="home">
    <navigation-menu @refreshWeather="refreshWeather"></navigation-menu>
    <weather-widget @refreshWeather="refreshWeather"></weather-widget>
  </div>
</template>
