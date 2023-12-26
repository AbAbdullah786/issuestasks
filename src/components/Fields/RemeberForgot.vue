<template>
  <div class="form-group">
    <label for="custom-check" class="text-white">
      <UnCheckedBox v-if="!rememberMe" />
      <CheckedBox v-if="rememberMe" />
      Remember me?
    </label>
    <input
      id="custom-check"
      type="checkbox"
      class="transparent-checkbox d-none"
      v-model="rememberMe"
      @change="handleRememberMeChange"
    />

    <span>
      <router-link to="/auth/forgot-password" class="forgot">
        Forgot Password?</router-link
      ></span
    >
  </div>
</template>
<script>
import CheckedBox from "../Icons/CheckedBox";
import UnCheckedBox from "../Icons/UnCheckedBox";

export default {
  name: "RememberForgot",
  components: { CheckedBox, UnCheckedBox },
  data() {
    return {
      rememberMe: localStorage.getItem("rememberMe") === "true",
    };
  },
  methods: {
    handleRememberMeChange() {
      localStorage.setItem("rememberMe", this.rememberMe);
    },
  },
};
</script>
<style>
.form-group {
  display: flex;
  justify-content: space-between;
}

.left-content {
  flex: 2;
}

.right-content {
  flex: 2;
  text-align: right;
}

.forgot {
  padding-left: inherit;
  color: #f4f4f4;
  text-decoration: none;
}

.checkbox-container {
  display: inline-block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 8px;
}

.transparent-checkbox {
  accent-color: #f96332;
  width: 16px;
  height: 16px;
}

.transparent-checkbox:checked ~ .checkmark {
  background-color: #f96332;
  border: 2px solid #f96332;
}
@media screen and (max-width: 768px) {
  .forgot {
    padding-left: 0px;
    color: #f4f4f4;
    text-decoration: none;
  }
}
</style>
