<template>
  <div class="form-group icons">
    <i :class="icon" v-if="icon"></i>
    <input :class="error? 'error inputform placeholder-color border': 'inputform border'" :maxlength="length" @input="$emit('input', inputValue)" @change="removeField(id)" :placeholder="placeholder" :type="type" :id="id" v-model="value" :style="!icon?'padding-left:10px': ''" required :disabled="isdisabled">
  </div>
</template>
<script>
export default {
  name: 'DisableInputField',
  props: {
    error: Boolean,
    placeholder: String,
    isdisabled: Boolean,
    length: String,
    icon: String,
    type: String,
    id: String,
  },
  data() {
    return {
      inputValue: this.value,
      placeholders: '',
      value: '',
      data:[]
    };
  },
  methods: {
    removeField(field) {
      this.data[field] = this.value
      this.$emit('inputData',  this.data);
    }
  }
}
</script>
<style>

.placeholder-color::placeholder {
  color: #070707 !important; /* Default placeholder color */
}
.inputform{
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: #ffffff !important;
  padding-left: 40px;
  padding-top: 0px;
  height: 45px;
  width: 100%;
  color: #070707 !important;
}

.error{
  color: #070707 !important;
}
</style>