<template>
  <div>
    <h1>Calendar Component</h1>
    <div class="d-flex">
      <button class="calendar-icon-button" @click="toggleDatePicker">
        <CalendarIcon />
      </button>
      <!-- <date-picker
        v-model="selectedDate"
        format="yyyy-MM-dd"
        :visible="datePickerVisible"
        @blur="closeDatePicker"
      /> -->
    </div>
    <p>Selected Date: {{ selectedDate }}</p>
  </div>
</template>

<style scoped>
/* Hide the datepicker input field */


/* Style the calendar icon button */
.calendar-icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

/* Ensure the calendar icon is visible */
.calendar-icon-button svg {
  width: 24px; /* Adjust the size as needed */
  height: 24px; /* Adjust the size as needed */
  fill: #000; /* Adjust the fill color as needed */
}
</style>

<script setup>
import CalendarIcon from '@/components/Icons/CalendarIcon.vue';
// import DatePicker from '@/components/Pages/Project/DatePicker.vue';
import { ref } from 'vue';

const selectedDate = ref('');
const datePickerVisible = ref(false);

const toggleDatePicker = () => {
  datePickerVisible.value = !datePickerVisible.value;
};

const closeDatePicker = () => {
  datePickerVisible.value = false;
};
</script>
