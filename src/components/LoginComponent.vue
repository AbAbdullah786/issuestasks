<template>
  <div class="px-0 mx-0" style="height: 100vh">
    <div class="row">
      <div class="col-md-6">
        <div class="card form-alignment">
          <div class="card-body d-flex justify-content-center">
            <LogoEmailMobile></LogoEmailMobile>
          </div>
          <div class="card-body px-3">
            <div class="text-center">
              <h3 class="fw-bold text-white">Log In</h3>
            </div>
            <form @submit.prevent="submitForm">
              <InputField
                :error="error"
                :errorvalue="errorMessage"
                :icon="'fas fa-user favicon'"
                :placeholder="message"
                type="email"
                id="email"
                ref="inputField"
                v-model="data.email"
              ></InputField>
              <InputField
                :icon="'fas fa-lock favicon'"
                placeholder="password"
                type="password"
                id="password"
                :isdisabled="false"
                v-model="data.password"
              ></InputField>
              <RememberForgot ref="rememberForgot"/>
              <div class="form-group icons" v-if="errorMessage">
                <p class="text-center" style="font-size: 14px; color: #f96332; font-weight:bold; text-align:center !important; margin:auto">
                  {{ errorMessage }}
                </p>
              </div>
              <div class="d-flex justify-content-center align-center">
                <button
                  class="custom-primary-btn"
                  style="font-family: Roboto"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              <div class="text-center mt-2">
                <p class="ml-0 mb-0" style="font-size: small; color: #f4f4f4">
                  <span> Don't have an Account?</span>
                  <router-link
                    style="
                      color: #f96332;
                      padding: 5px;
                      font-size: 20px;
                      cursor: pointer;
                      text-decoration: none;
                    "
                    to="/auth/signup"
                    >Sign Up</router-link
                  >
                </p>
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
import api from "../api";
import InputField from "@/components/Fields/InputField";
import RememberForgot from "@/components/Fields/RemeberForgot";
import LogoEmailMobile from "@/components/Fields/LogoEmailMobile";
export default {
  components: { LogoEmailMobile, RememberForgot, InputField, AboutCard },
  data() {
    return {
      email: "",
      password: "",
      type: false,
      error: false,
      message: "Email",
      errorMessage: "",
      logoEmail: false,
      rememberMe: false,
      data: {},
    };
  },
  watch: {
    email() {
      this.error = false;
    },
  },
  methods: {
    submitForm() {
      this.data.remember_me = this.$refs.rememberForgot.rememberMe;
      // Make the API request
      api
        .post("auth/login", this.data)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            let IsWorkSpace = this.checkWorkSpace();
            if (!IsWorkSpace) {
              this.$router.push("/workspace");
            }
          }
        })
        .catch((error) => {
          if (error) {
            const inputField = this.$refs.inputField;
            inputField.value = "";
            inputField.$emit("update:value", "");
            this.errorMessage = "User Name/ Password Incorrect!";
            this.error = true;
          }
        });
    },
    checkWorkSpace() {
      api
        .get("workspace")
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("workSpaceID", response.data.id);
            this.$router.push("/workspace");
            return true;
          }
        })
        .catch((error) => {
          if (error) {
            return false;
          }
        });
    },
  },
  // Login component logic goes here
};
</script>

<style>
.about {
  padding-left: 100px;
  font-family: Roboto, sans-serif;
}

.form-alignment {
  left: 100px;
  top: 150px;
}
.card {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
  /*font-family: Roboto,sans-serif;*/
}

.card-header {
  margin-bottom: 8px;
}

h3 {
  font-size: 18px;
  /*font-family: Roboto,sans-serif;*/
}

p {
  font-size: 14px;
  color: #666;
}

.icons i {
  position: absolute;
  color: #0000006b;
}
.icons {
  width: 100%;
  margin-bottom: 10px;
}
.favicon {
  padding: 13px 0 0 10px;
  min-width: 40px;
}
.inputform {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: #f4f4f4;
  padding-left: 40px;
  padding-top: 0px;
  height: 45px;
  width: 100%;
  color: #070707;
}

.error {
  color: #f96332 !important;
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
  font-family: Roboto, serif;
  font-size: 22px;
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

@media screen and (max-width: 767px) {
  .form-alignment {
    left: auto;
    top: 30%;
  }
  button:hover {
    background-color: #f96332; /* Change to desired hover color */
    color: #f4f4f4 !important; /* Change to desired hover color */
  }
}
</style>
