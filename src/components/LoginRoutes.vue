<template>
  <div class="card-body">
    <div class="text-center">
      <h3 class="fw-bold">{{ title }}</h3>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-group icons">
        <i class="fas fa-envelope icon"></i>
        <input
          class="authcards"
          placeholder="email"
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
          placeholder="password"
          type="password"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div class="d-flex justify-content-center align-center">
        <button class="custom-primary-btn" type="submit">Log In</button>
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
    };
  },
  methods: {
    submitForm() {
      const data = {
        email: this.email,
        password: this.password,
      };

      // Make the API request
      api
        .post("auth/login", data)
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
.icons {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}

.icons i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #0000006b;
}

.card-body {
  flex: 1 1 auto;
  padding: 0 0 15px 0;
  color: var(--bs-card-color);
}

.signup-button {
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  padding: 5px 15px;
}

@media screen and (min-width: 576px) {
  .authcards {
    width: 100%;
  }
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
