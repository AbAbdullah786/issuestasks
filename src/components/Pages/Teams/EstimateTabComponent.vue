<script setup>
import { onMounted, ref } from "vue";
import { Switch } from "@headlessui/vue";
const enabled = ref(false);

</script>

<template>
  <div class="col">
    <div class="d-flex align-items-center justify-content-between" style="width: 200px; padding-top: 20px;">
      <label style="white-space: nowrap" class="m-0">
        Disable
      </label>
      <Switch v-model="enabled" :style="enabled ? 'background: #F96332;' : 'background: #EAEAEA;'
        " style="" class="custom-switch transition-colors duration-200 ease-in-out">
        <span class="sr-only">Use setting</span>
        <span aria-hidden="true" :class="enabled ? 'translate-x-9' : 'translate-x-0'"
          class="custom-transform custom-transition duration-200 ease-in-out"></span>
      </Switch>
    </div>
    <div style="margin-top: 10px;">
      <p>
        Estimates are used to determine level of effort to finish a User Story. These are useful for determining the
        burndown in Sprints and planning development.
      </p>
    </div>
  </div>
</template>



<style lang="scss">
.custom-transform {
  pointer-events: none;
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  box-shadow: inset 0 0 0 calc(0px + 2px) white;
  transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);
}

label {
  margin-bottom: 6px;
  font-size: 14px;
  color: #2a2c32;
  font-weight: 500;
}

.select-box-container {
  .select-box {
    position: relative;
    height: 38px;
    cursor: pointer;
    border: 1px solid #c4c4ca;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    display: flex;
    align-items: center;
    padding: 10px 14px;
    gap: 8px;

    .selected-div {
      flex: 1;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
    }

    .chevron-down {
      width: 24px;
      height: 24px;
    }
  }
}

.transition-colors {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-switch {
  position: relative;
  display: inline-flex;
  height: 24px;
  width: 44px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 12px;
  border-width: 2px;
  border-color: transparent;
  padding: 0px;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 calc(2px + 2px) white;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.translate-x-9 {
  transform: translateX(20px);
}

.translate-x-0 {
  transform: translateX(0px);
}

.custom-transition {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>

