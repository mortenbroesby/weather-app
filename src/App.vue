<template>
  <div id="application" class="application">
    <spinner v-show="spinnerVisible"></spinner>

    <notify
      container="notification"
      status="notify-success"
      :width="`300`"
      close="bulma"
      :event-bus="eventbus"
      :timeout="3000">
      <template slot="content" scope="{data}">
        <div style="width: 100%; word-break: break-all; text-align: left">
          <h4><b>{{data.title}}</b></h4>
          <p style="margin: 0">{{data.text}}</p>
        </div>
      </template>
    </notify>

    <transition name="fade" mode="out-in">
      <router-view
        v-if="applicationHasLoaded"
        class="main-view">
      </router-view>
    </transition>
  </div>
</template>
