<template>
  <div class="weather-widget">
    <div class="weather-widget__metadata">
      <h1 class="weather-widget__title">
        {{ translate.mainTitle }}
      </h1>

      <p class="weather-widget__subtitle weather-widget__subtitle--bold">
        {{ translate.firstSubtitle }}
      </p>

      <p class="weather-widget__subtitle">
        {{ translate.secondSubtitle }}
      </p>

      <i class="weather-widget__icon wi"
        :class="weatherIcon"
        @click="refreshWeather()"></i>

      <p class="weather-widget__text">
        <i class="weather-widget__icon__small is-left wi wi-umbrella"></i>
        {{ translate.precipitationTitle }}
      </p>

      <p class="weather-widget__text">
        <i class="weather-widget__icon__small is-left wi wi-strong-wind"></i>
        {{ translate.windspeedTitle }}
      </p>

      <p class="weather-widget__text">
        <i class="weather-widget__icon__small is-left wi wi-thermometer"></i>
        {{ translate.temperatureTitle }}
        <i class="weather-widget__icon__small weather-widget__icon__small--celsius wi wi-celsius"></i>
      </p>

      <p class="weather-widget__text">
        <i class="weather-widget__icon__small is-left wi wi-humidity"></i>
        {{ translate.humidityTitle }}
      </p>
    </div>
  </div>
</template>
