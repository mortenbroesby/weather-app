<template>
  <nav class="navigation-menu">
    <a class="navigation-menu__item navigation-menu__item--left" @click="updateLocation()">
      <i class="navigation-menu__icon navigation-menu__icon--update wi wi-refresh"></i>
      {{ $t("main-menu.updateLocation") }}
    </a>

    <a class="navigation-menu__item navigation-menu__item--right" @click="refreshWeather()">
      {{ $t("main-menu.refreshWeather") }}
      <i class="navigation-menu__icon navigation-menu__icon--refresh wi wi-cloud-refresh"></i>
    </a>
  </nav>
</template>
