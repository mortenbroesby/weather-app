<template>
  <nav class="navigation-menu">
    <a class="navigation-menu__item" @click="refreshWeather()">
      {{ $t("main-menu.refresh") }}
      <i class="navigation-menu__icon navigation-menu__icon--refresh wi wi-cloud-refresh"></i>
    </a>
  </nav>
</template>
