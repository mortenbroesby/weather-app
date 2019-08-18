<template>
  <div id="home" class="home">
    <navigation-menu
      @updateLocation="updateLocation"
      @refreshWeather="refreshWeather">
    </navigation-menu>

    <transition name="weatherFade" mode="in-out">
      <weather-widget
        v-if="isVisible"
        @refreshWeather="refreshWeather">
      </weather-widget>
    </transition>
  </div>
</template>
