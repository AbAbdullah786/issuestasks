<template>
  <div class="card-body">
    <div class="text-center">
      <h3 class="fw-bold">{{ title }}</h3>
    </div>
    <form @submit.prevent="submitForm" style="margin-top: 30px">
      <div class="form-group icons">
        <i class="fas fa-user icon"></i>
        <input
          class="authcards"
          placeholder="Email"
          type="email"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group icons">
        <i class="fas fa-lock icon"></i>
        <input
          class="authcards"
          placeholder="Password"
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div class="form-group icons">
        <i class="fas fa-lock icon"></i>
        <input
          class="authcards"
          placeholder="Confirm Password"
          type="password"
          id="confirm_password"
          v-model="confirm_password"
          required
        />
        <span
          v-if="passwordsMismatch"
          class="error-message"
          style="color: #f96332"
          >Passwords do not match</span
        >
      </div>
      <div class="d-flex justify-content-center align-center">
        <button class="custom-primary-btn" type="submit">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../api";

export default {
  props: {
    title: String,
  },
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      passwordsMismatch: false,
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirm_password) {
        this.passwordsMismatch = true;
        return;
      }

      const atIndex = this.email.indexOf("@");
      if (atIndex !== -1) {
        this.name = this.email.substring(0, atIndex);
      }
      const data = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      // Make the API request
      api
        .post("auth/signup", data)
        .then((response) => {
          // Handle the API response
          console.log(response.data); // Log the response data
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    },
  },
  // Register component logic goes here
};
</script>
<style>
.icons i {
  position: absolute;
  color: #0000006b;
}
.icons {
  width: 100%;
  margin-bottom: 10px;
}
.icon {
  padding: 15px 0 0 10px;
  min-width: 40px;
}
.authcards {
  display: flex;
  align-items: center;
  border: none;
  margin: 15px 0;
  border-radius: 5px;
  background-color: #f4f4f4;
  padding-left: 40px;
  padding-top: 0px;
  height: 45px;
  width: 400px;
  color: #070707;
}
.card-body {
  flex: 1 1 auto;
  padding: 0px 0px 15px 0px;
  color: var(--bs-card-color);
}
.signup-button {
  border: none;
  position: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  padding: 5px 15px;
}
button:hover {
  background-color: #f96332; /* Change to desired hover color */
  color: #ffffff; /* Change to desired hover color */
}
.image {
  height: 20px;
  border-radius: 10px;
  background: transparent;
  width: 20px;
}
</style>
