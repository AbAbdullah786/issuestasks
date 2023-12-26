<script setup>
import UnCheckedBox from './Icons/UnCheckedBox.vue';
import CheckedBox from './Icons/CheckedBox.vue';

const props = defineProps({
    id: String,
    modelValue: Boolean,
});
defineEmits(['update:modelValue'])

</script>

<template>
    <div>
        <label :for="id">
          <UnCheckedBox v-if="!modelValue" />
          <CheckedBox v-if="modelValue" />
        </label>
        <input
          :id="id"
          type="checkbox"
          class="transparent-checkbox d-none"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.checked);"
        />
    </div>
</template>

<style lang="scss">
.transparent-checkbox {
  accent-color: #f96332;
  width: 16px;
  height: 16px;
}
</style>