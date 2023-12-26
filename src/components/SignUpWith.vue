<template>
  <div class="card card-switcher">
    <transition-group name="slide">
    <div class="text-center" v-if="signup">
      <h3 class="fw-bold">{{ title }}</h3>
      <p class="ml-0 mb-0" style="font-family: Roboto; font-size: small; color: #F4F4F4">Choose from any of these vendors or use an</p>
      <p style="font-family: Roboto; font-size: small; color: #F4F4F4">Email Address to Sign Up</p>
    </div>
    <div v-if="signup">
<!--    <AuthCard route="/register" color="#db4a39" icons="google" description="Continue with Google" />-->
<!--    <AuthCard route="/register" color="#3b5998" icons="facebook" description="Continue with Facebook" />-->
<!--    <AuthCard route="/register" color="#000" icons="apple" description="Continue with Apple" />-->
    <AuthCard @click="signIn('email')"  route="/register" color="#3b5998" icons="envelop" description="Continue with Email" />
    </div>
    <div class="text-center" v-if="signup">
      <p class="ml-0 mb-0" style="font-family: Roboto; font-size: small; color: #F4F4F4">
        <span> Already have an Account?</span>
        <router-link style="color: #F96332; padding-left: 5px;font-family: Roboto, sans-serif; font-size: 20px; cursor: pointer; text-decoration: none;"  to="/" >   Sign In</router-link>
      </p>
    </div>

<!--    <div v-if="email" style="margin-top: 20%">-->
<!--      <RegisterRoutes title="Sign Up" description="Continue with Facebook" />-->
<!--    </div>-->
<!--    <div v-if="login" style="margin-top: 20%">-->
<!--&lt;!&ndash;      <LoginRoutes title="Log In" description="Continue with Facebook" />&ndash;&gt;-->
<!--      <LoginComponent title="Log In" description="Continue with Facebook" />-->
<!--    </div>-->
    </transition-group>
  </div>
</template>

<script>
import AuthCard from "@/components/AuthCard";
import axios from "axios";
export default {
  name: 'SigUpCard',
  components: { AuthCard},
  props: {
    title: String,
    description: String
  },
  data: () => ({
    'signup' : true,
    'email' : false,
    'login' : false
  }),
    methods: {
    signIn(obj){
      if (obj !== 'email'){
        axios.get('https://issuestasks.com/api/auth/' + obj )
            .then( response => {
              console.log(response.data.url)
              window.location.href = response.data.url;
            })
      } else {
        this.$router.push('/auth/signup')
      }
    }
  },

}
</script>

<style scoped>
.card {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
}

.card-header {
  margin-bottom: 8px;
}

h3 {
  font-size: 28px !important;
}

p {
  font-size: 14px;
  color: #666;
}
.card-switcher {
  max-width: 100%;
}

.card {
  position: relative;
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  transition: transform 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
}

.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
