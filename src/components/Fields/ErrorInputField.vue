<template>
  <div class="form-group pb-3">
    <input class="errorinputform" style="color: #F96332; !important;" :placeholder="placeholder" type="text" v-model="value" disabled>
  </div>
</template>
<script>
export default {
  name: 'ErrorInputField',
  props: {
    placeholder: String,
  },
  mounted() {
  },
  data() {
    return {
      placeholders: '',
      value: '',
      data:[]
    };
  },
}
</script>
<style>

.errorinputform{
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  padding-left: 40px;
  padding-top: 0px;
  height: 45px;
  width: 100%;
  text-align: center;
  color: #F96332 !important;
}
</style>