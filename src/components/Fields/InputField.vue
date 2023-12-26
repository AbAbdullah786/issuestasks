<script setup>
import SearchIcon from "@/components/Icons/SearchIcon.vue";
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  length: {
    type: Number,
  },
  type: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  svgIcon: {
    type: Boolean,
    default: false,
  },
  svgIconDropDown: {
    type: Boolean,
    default: false,
  },
  isdisabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="form-group icons position-relative">
    <i :class="icon" v-if="icon"></i>
    <span v-if="svgIcon" class="svgicon">
      <SearchIcon />
    </span>
    <span v-if="svgIconDropDown" class="svgicon">
      <SearchIcon size="20"/>
    </span>
    <!-- :class="error ? 'error input-field placeholder-color' : 'input-field'" -->
    <input
      class="input-field"
      :class="{
        'error input-field plachholder': error,
        'dropdow-search': svgIconDropDown
      }"
      :maxlength="length"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :type="type"
      :id="id"
      :style="icon || svgIcon ? 'padding-left:40px' : ''"
      :value="modelValue"
      required
      :disabled="isdisabled"
    />
  </div>
</template>
<!-- <script>
export default {
  name: "InputField",
  props: {
    error: Boolean,
    placeholder: String,
    isdisabled: String,
    length: String,
    icon: String,
    type: String,
    id: String,
  },
  data() {
    return {
      inputValue: this.value,
      placeholders: "",
      value: "",
      data: [],
    };
  },
  methods: {
    removeField(field) {
      this.data[field] = this.value;
      this.$emit("inputData", this.data);
    },
  },
};
</script> -->
<style>
.placeholder-color::placeholder {
  color: #f96332; /* Default placeholder color */
}
.input-field {
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #c4c4ca;
  background-color: #ffffff !important;
  padding: 10px 14px;
  height: 38px;
  width: 100%;
  outline: 0;
  font-size: 14px !important;
}

.error {
  color: #f96332 !important;
}
.dropdow-search {
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: none;
  background-color: #ffffff !important;
  padding: 10px 14px 10px 35px;
  height: 40px;
  width: 100%;
  outline: 0;
  font-size: 14px !important;
  margin:0px;
}
</style>
