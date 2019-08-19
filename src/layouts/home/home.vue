<template>
  <div id="home" class="home">
    <navigation-menu
      @updateLocation="updateLocation"
      @refreshWeather="refreshWeather">
    </navigation-menu>

    <transition-group name="weatherFade" mode="in-out">
      <weather-widget
        v-if="isVisible"
        key="weather"
        @refreshWeather="refreshWeather">
      </weather-widget>

      <forecast-widget
        v-if="isVisible"
        key="forecast">
      </forecast-widget>
    </transition-group>
  </div>
</template>
