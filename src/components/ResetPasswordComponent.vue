<template>
  <div class="px-0 mx-0" style="height: 100vh">
    <div class="row">
      <div class="col-md-6">
        <div class="card form-alignment">
          <div class="card-body d-flex justify-content-center">
            <LogoEmailMobile></LogoEmailMobile>
          </div>
          <div class="card-body">
            <div class="text-center pt-5">
              <h3 class="fw-bold text-white">Password Recovery</h3>
              <p
                v-if="!isEmailReceived"
                style="font-size: small; color: #f4f4f4"
              >
                If we found a user with this email address
                <strong>{{ this.emailAddress }}</strong
                >, you will receive an email from us momentarily. If you do not
                receive the email within a few minutes, please check your
                junk/spam email folder
              </p>
              <p
                v-if="isEmailReceived"
                style="color: #f4f4f4"
              >
              Welcome back
              <strong>{{ this.emailAddress }}</strong>.
              Please enter a new password
              </p>
              <div
                v-if="!isEmailReceived"
                class="d-flex justify-content-center align-center"
              >
                <button
                  class="custom-primary-btn"
                  type="submit"
                  @click="recoverPassword()"
                >
                  Continue
                </button>
              </div>
              <p
                v-if="!isEmailReceived"
                class="mt-5"
                style="font-size: small; color: #f4f4f4"
              >
                Remember Password?
              </p>
              <div
                v-if="!isEmailReceived"
                class="d-flex justify-content-center align-center"
              >
                <button class="custom-primary-btn" @click="signIn()">
                  Sign In
                </button>
              </div>
            </div>
            <form v-if="isEmailReceived" @submit.prevent="submitForm">
              <div class="form-group py-2">
                <input
                  :class="
                    codeMismatch
                      ? 'input inputform input-wrapper'
                      : 'inputform input-wrapper'
                  "
                  maxlength="6"
                  :placeholder="message"
                  type="text"
                  id="code"
                  v-on:keyup="checkCode($event.target.value)"
                  v-model="code"
                />
              </div>
              <InputField
                :icon="'fas fa-lock favicon'"
                placeholder="Password"
                type="password"
                id="password"
                v-model="data.password"
                :isdisabled="codeMatch"
              ></InputField>
              <InputField
                :icon="'fas fa-lock favicon'"
                placeholder="Confirm Password"
                type="password"
                id="confirm_password"
                v-model="data.confirm_password"
                :isdisabled="codeMatch"
              ></InputField>
              <div class="form-group icons" v-if="showError">
                <p class="text-center" style="font-size: 14px; color: #f96332; font-weight:bold; text-align:center !important; margin:auto">
                  {{ errorMessage }}
                </p>
              </div>
              <!-- <ErrorInputField
                v-if="passwordsMismatch"
                :icon="'fas fa-lock favicon'"
                :placeholder="errorMessage"
                @inputData="InputData"
                type="password"
                id="confirm_password"
                v-model="confirm_password"
              ></ErrorInputField> -->
              <div class="d-flex justify-content-center align-center">
                <button class="custom-primary-btn" type="submit">Reset</button>
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
import LogoEmailMobile from "@/components/Fields/LogoEmailMobile";
import InputField from "@/components/Fields/InputField";
// import ErrorInputField from "@/components/Fields/ErrorInputField";
export default {
  components: { InputField, LogoEmailMobile, AboutCard },
  mounted() {
    this.decodeCode();
  },
  data() {
    return {
      disableCode: false,
      disableReset: true,
      isEmailReceived: false,
      code: "",
      password: "",
      confirm_password: "",
      passwordsMismatch: false,
      codeMismatch: false,
      codeMatch: true,
      message: "Enter The Code",
      errorMessage: "",
      data: {
        password: '',
        confirm_password: '',
      },
      showError: false,
      emailAddress: "",
    };
  },
  methods: {
    signIn() {
      this.$router.push("/auth/login");
    },
    decodeCode() {
      this.encodedCode = this.$route.params.code;
      if (this.encodedCode.length < 80) {
        this.emailAddress =  atob(this.encodedCode) ;
        return;
      }
      api
        .post(`auth/token`, {
          token: this.encodedCode,
        })
        .then((response) => {
          if (response.status === 200) {
            this.emailAddress = response.data.email;
            this.code = response.data.code;
            this.isEmailReceived = true;
            this.disableCode = true;
            this.disableReset = false;
            this.codeMismatch = false;
            this.codeMatch = false;
          }
        })
        .catch((error) => {
          this.emailAddress = error ? atob(this.encodedCode) : "";
        });
    },
    recoverPassword() {
      this.isEmailReceived = true;
    },
    submitForm() {
      if (!this.disableCode) {
        return;
      }
      const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*+/-])(?=.{8,})/;
      console.log(regex, regex.test(this.data.password), this.data.password);
      if (this.data.password !== this.data.confirm_password) {
        this.showError = true;
        this.errorMessage = "The passwords do not match. Try again";
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

      // Make the API request
      // const token = localStorage.getItem("token");
      // api
      //   .post(`auth/${this.emailAddress}/update-password`, {
      //     token: token,
      //     email: this.emailAddress,
      //     password: this.data.password,
      //     code: this.code,
      //   })
      //   .then((response) => {
      //     // Handle the API response
      //     if (response.status === 200) {
      //       localStorage.setItem("token", response.data.token);
      //       let IsWorkSpace = this.checkWorkSpace();
      //       if (!IsWorkSpace) {
      //         this.$router.push("/workspace");
      //       }
      //     }
      //   })
      //   .catch((error) => {
      //     // Handle any errors
      //     console.error(error);
      //   });
    api
    .post(`auth/${this.emailAddress}/update-password`,{
      email: this.emailAddress,
      password: this.data.password,
      code: this.code
    })
    .then((response) => {
          if (response.status === 200) {
            api
            .post("auth/login", {
              email: this.emailAddress,
              password: this.data.password
            })
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
            this.errorMessage = "User Name/Password Incorrect!";
            this.error = true;
          }
        });
          }
        })
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
    checkCode(code) {
      if (code.length === 6) {
        api
          .post(`auth/${this.emailAddress}/verify-password-token`, {
            code: code,
          })
          .then((response) => {
            // Handle the API response
            if (response.status === 200) {
              this.disableCode = true;
              this.disableReset = false;
              this.codeMismatch = false;
              this.codeMatch = false;
            }
          })
          .catch((error) => {
            // Handle any errors
            if (error) {
              this.disableCode = false;
              this.codeMismatch = true;
              this.codeMatch = true;
              this.message = "Incorrect Code, Enter again";
              this.code = "";
            }
          });
      }
    },
    InputData(value) {
      for (const attribute in value) {
        this.data[attribute] = value[attribute];
      }
    },
  },

  // Login component logic goes here
};
</script>

<style>
.about {
  padding-left: 100px;
}

.card {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
}

.card-header {
  margin-bottom: 8px;
}

.fw-bold {
  font-size: 26px;
}
.input::placeholder {
  color: #f96332; /* Default placeholder color */
}
h3 {
  font-size: 18px;
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
.authcards12 {
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
}
button:hover {
  background-color: #f96332; /* Change to desired hover color */
  color: #f4f4f4; /* Change to desired hover color */
}
.input-wrapper {
  position: relative;
  display: inline-block;
}

.input-wrapper input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  right: 0;
}

.input-wrapper label {
  display: inline-block;
  padding: 6px 12px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.image {
  height: 20px;
  border-radius: 10px;
  background: transparent;
  width: 20px;
}
input[disabled] {
  background-color: #9a9898;
}
</style>
