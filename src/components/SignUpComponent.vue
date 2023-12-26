<template>
  <div class="container" style="height: 100vh">
    <div class="row">
      <div class="col-md-6">
        <div class="card form-alignment">
          <div class="card-body d-flex justify-content-center">
            <LogoEmailMobile></LogoEmailMobile>
          </div>
          <div class="card-body px-3">
            <div class="text-center">
              <h3 class="fw-bold text-white">Sign Up</h3>
            </div>
            <form @submit.prevent="submitForm" class="pt-3">
              <InputField
                :error="error"
                :icon="'fas fa-user favicon'"
                placeholder="Email"
                type="email"
                id="email"
                ref="inputField"
                v-model="data.email"
              ></InputField>
              <InputField
                :icon="'fas fa-lock favicon'"
                placeholder="Password"
                type="password"
                id="password"
                v-model="data.password"
              ></InputField>
              <InputField
                :icon="'fas fa-lock favicon'"
                placeholder="Confirm Password"
                type="password"
                id="confirm_password"
                v-model="data.confirm_password"
              ></InputField>
              <div class="form-group icons" v-if="showError">
                <p class="text-center" style="font-size: 14px; color: #f96332; font-weight:bold; text-align:center !important; margin:auto">
                  {{ errorMessage }}
                </p>
              </div>
              <div class="d-flex justify-content-center align-center">
                <button class="custom-primary-btn" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6 d-flex justify-content-center">
        <AboutCard />
      </div>
    </div>
  </div>
</template>

<script>
import AboutCard from "@/components/AboutCard";
import LogoEmailMobile from "@/components/Fields/LogoEmailMobile";
import InputField from "@/components/Fields/InputField";
import api from "../api";
export default {
  components: { InputField, LogoEmailMobile, AboutCard },
  data() {
    return {
      error: false,
      errorMessage: "",
      showError: false,
      data: {
        email: "",
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    InputData(value) {
      for (const attribute in value) {
        this.data[attribute] = value[attribute];
      }
    },
    submitForm() {
      const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*+/-])(?=.{8,})/;
      if (this.data.password !== this.data.confirm_password) {
        this.showError = true;
        this.errorMessage = "Passwords Do Not Match";
        return;
      } 
      else if (!regex.test(this.data.password)) {
        this.showError = true;
        this.errorMessage =
          "Password must have minimum 8 characters, 1 capital letter, and 1 symbol.";
        return;
      } 
      else {
        this.showError = false;
        this.errorMessage = "";
      }

      const atIndex = this.data.email.indexOf("@");
      if (atIndex !== -1) {
        this.data.name = this.data.email.substring(0, atIndex);
      }
      // Make the API request
      api
        .post("auth/signup", this.data)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push("/auth/login");
          }
        })
        .catch((error) => {
          // Handle any errors
          if (error) {
            this.error = true;
            this.data.email = "";
            this.errorMessage = "User already exists";
            this.password = null;
          }
        });
    },
  },

  // Login component logic goes here
};
</script>

<style>
.card {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
}

.card-header {
  margin-bottom: 8px;
}
.form-alignment {
  left: 100px;
  top: 150px;
}
/* .fw-bold {
  font-size: 26px;
} */

h3 {
  font-size: 29px;
  font-family: Roboto, sans-serif;
}

p {
  font-size: 14px;
  color: #666;
  font-family: Roboto-Regular, sans-serif;
}

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
  font-family: Roboto, sans-serif;
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
  font-family: Roboto;
  font-size: 16px !important;
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
input[disabled] {
  background-color: #f4f4f4 !important;
}
@media screen and (max-width: 767px) {
  .form-alignment {
    left: auto;
    top: 30%;
  }
}
</style>
