<template>
  <div class="weather-widget">
    <div class="weather-widget__metadata">
      <h1 class="weather-widget__title">
        {{ $t("weatherWidget.mainTitle") }}
      </h1>

      <p class="weather-widget__subtitle weather-widget__subtitle--bold">
        {{ $t("weatherWidget.firstSubtitle") }}
      </p>
      <p class="weather-widget__subtitle">
        {{ $t("weatherWidget.secondSubtitle", { value: weatherType }) }}
      </p>

      <i class="weather-widget__icon wi" :class="weatherIcon" @click="refreshWeather()"></i>

      <p class="weather-widget__text">
        <i class="weather-widget__icon__small is-left wi wi-umbrella"></i>
        {{ $t("weatherWidget.precipitationTitle", { value: precipitation }) }}
      </p>

      <p class="weather-widget__text">
        <i class="weather-widget__icon__small is-left wi wi-strong-wind"></i>
        {{ $t("weatherWidget.windspeedTitle", { value: windSpeed }) }}
      </p>

      <p class="weather-widget__text">
        <i class="weather-widget__icon__small is-left wi wi-thermometer"></i>
        {{ $t("weatherWidget.temperatureTitle", { value: temperature }) }}
        <i class="weather-widget__icon__small weather-widget__icon__small--celsius wi wi-celsius"></i>
      </p>

      <p class="weather-widget__text">
        <i class="weather-widget__icon__small is-left wi wi-humidity"></i>
        {{ $t("weatherWidget.humidityTitle", { value: humidity }) }}
      </p>
    </div>
  </div>
</template>
