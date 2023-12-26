<!-- <script setup>
import CalendarIcon from '@/components/Icons/CalendarIcon.vue';
const emits = defineEmits(['storeMileston', 'cancelMilestone'])
// const storeMileston = () => {
//     emits('storeMilestone', storeMileston);
// }
</script>
<template>
    <div class="d-flex align-items-center" style="gap: 8px;">

        <div>
          <input type="text" v-model="newMilestone.description" class="input-field" placeholder="Milestone Description"
            style="width: 350px;">
        </div>
        <div class="input-field align-items-center">
          <CalendarIcon></CalendarIcon>
        </div>
        <div class="input-field d-flex align-items-center">
          <div>
            <span class="cursor-pointer" @click="storeMilestone">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 18.3327C14.5833 18.3327 18.3333 14.5827 18.3333 9.99935C18.3333 5.41602 14.5833 1.66602 10 1.66602C5.41666 1.66602 1.66666 5.41602 1.66666 9.99935C1.66666 14.5827 5.41666 18.3327 10 18.3327Z"
                  stroke="#00B84D" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6.45833 10.0009L8.81666 12.3592L13.5417 7.64258" stroke="#00B84D" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>
          </div>
          <div>
            <span class="cursor-pointer" @click="cancelMilestone">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.10766 20.8925C12.3486 24.1334 17.6519 24.1334 20.8928 20.8925C24.1337 17.6516 24.1337 12.3483 20.8928 9.1074C17.6519 5.86649 12.3486 5.86649 9.10766 9.1074C5.86675 12.3483 5.86675 17.6516 9.10766 20.8925Z"
                  stroke="#E9203F" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12.6433 12.6426L17.3574 17.3566" stroke="#E9203F" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M12.643 17.3566L17.3571 12.6426" stroke="#E9203F" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>

          </div>
        </div>

      </div>
</template> -->