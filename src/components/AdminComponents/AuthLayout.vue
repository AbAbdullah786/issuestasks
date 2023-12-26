<template>
  <div v-if="!isAuthenticated" class="main-container">
    <div class="img-container">
      <router-view/>
    </div>
  </div>
  <div v-else>{{ this.dashboard() }}</div>
</template>

<script>

export default {
  name: 'AuthLayout',
  computed: {
    isAuthenticated() {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const expiryTimestamp = tokenPayload.exp;
        return Date.now() >= expiryTimestamp * 1000;
      } else {
        return false;
      }
    },
  },
  methods: {
    dashboard() {
      return this.$router.push('/dashboard');
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: local("Roboto"),
  url('/src/assets/font/Roboto-Regular.ttf') format("truetype");
}

.main-container {
  border-radius: 30px;
  overflow: hidden;
  left: 65px;
  top: 40px;
  width: 92%;
  height: 90%;
  background-size: cover;
  background-position: center;
  position: absolute;
  background: linear-gradient(to left, #141414 0%, rgba(0, 0, 0, 0.35) 100%);
  border: 1px solid black;
}

.img-container {
  width: 85%;
  background-image: linear-gradient(to left, #141414 0%, rgba(0, 0, 0, 0.35) 100%),
  url('/src/assets/page1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
}

@media screen and (max-width: 767px) {
  .main-container {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: 0;
  }

  button {
    background-color: #ffffff; /* Change to desired hover color */
    color: #070707; /* Change to desired hover color */
  }

  .forgot {
    color: #ffffff;
    text-decoration: none;
  }

  .img-container {
    height: 100%;
    width: 100%;
    padding-top: 20%;
    left: 10%;
    background-size: initial;
    background-image: linear-gradient(to bottom, #141414 0%, rgba(0, 0, 0, 0.35) 100%), url('/src/assets/page1.png');
  }
}


</style>
