<script setup>
// defineProps(["heading", "breadCrumbs", "notShowBorder"]);
defineProps({
  heading: {
    type: String,
    default: ''
  },
  breadCrumbs: {
    type: String,
    default: ''
  },
  showBorder: {
    type: Boolean,
    default: true,
  }
})
</script>

<template>
  <div class="w-100 px-3">
    <div
      :class="{ 'border-bottom': showBorder }"
      class="d-flex align-items-center pt-3"
      style="padding-bottom: 32px; border-color: #eaeaea"
    >
      <h2 class="m-0">{{ heading }}</h2>
      <div
        v-if="breadCrumbs"
        style="
          width: 1px;
          height: 32px;
          background-color: #2a2c32;
          margin: 0px 10px;
        "
      ></div>
      <p
        v-if="breadCrumbs"
        style="margin: 0; color: #7b8497; font-size: 20px; font-weight: 500"
      >
        {{ breadCrumbs }}
      </p>
    </div>
  </div>
</template>

<style lang="scss"></style>
