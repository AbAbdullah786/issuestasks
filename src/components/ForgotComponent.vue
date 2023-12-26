<template>
  <div class="container" style="height: 100vh">
    <div class="row">
      <div class="col-md-6 px-5">
        <div class="card form-alignment">
          <div class="card-body d-flex justify-content-center">
            <LogoEmailMobile></LogoEmailMobile>
          </div>
          <div class="card-body">
            <div class="text-center pt-5">
              <h3 class="fw-bold text-white">Forgot Password</h3>
              <p class="font-style">
                Enter the email address you used when you joined and we’ll send
                you the code to reset your password.
              </p>
            </div>
            <form @submit.prevent="submitForm">
              <InputField
                :icon="'fas fa-user favicon'"
                placeholder="email"
                type="email"
                id="email"
                v-model="email"
              ></InputField>
              <div class="d-flex justify-content-center align-center">
                <button class="custom-primary-btn" type="submit">Submit</button>
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
import LogoEmailMobile from "@/components/Fields/LogoEmailMobile";
export default {
  components: { LogoEmailMobile, InputField, AboutCard },
  data() {
    return {
      email: "",
      error: "",
    };
  },
  methods: {
    submitForm() {
      // Make the API request
      api
        .post("auth/reset-password-mail", {email: this.email})
        .then((response) => {
          // Handle the API response
          if (response.status === 200) {
            console.log(response); // Log the response data
            this.code = null;
            const encodedEmail = btoa(this.email);
            console.log(encodedEmail);
            this.$router.push(
              `/auth/password-recovery/${btoa(this.email)}`
            );
          }
        })
        .catch((error) => {
          // Handle any errors
          if (error) {
            (this.error = true), (this.email = "Invalid Email");
          }
        });
    },
    // InputData(value) {
    //   for (const attribute in value) {
    //     this.data[attribute] = value[attribute];
    //   }
    // },
  },
  // Login component logic goes here
};
</script>

<style>
.about {
  padding-left: 100px;
}

.font-style {
  color: #f4f4f4;
  padding-top: 10px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  width: auto;
  line-height: 25px;
  letter-spacing: 0em;
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
