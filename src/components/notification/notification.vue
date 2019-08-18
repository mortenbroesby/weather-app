<template>
  <div class="notification">
    <notify
      container="notification__item"
      status="notify-success"
      close="close"
      :width="`300`"
      :event-bus="eventbus"
      :timeout="3000">
      <template slot="content" scope="{data}">
        <div class="notification__item__metadata">
          <h4 class="notification__item__title">{{ data.title }}</h4>
          <p class="notification__item__text">{{ data.text }}</p>
        </div>
      </template>
    </notify>
  </div>
</template>
