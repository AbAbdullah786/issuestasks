<template>
  <div style="height: 100vh; width: 100vw;">
    <router-view />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/assets/css/style.css";
import "@/assets/css/custom-styles.scss";
export default {
  name: "App",

  data() {
    return {
      isTokenExpired: false,
    };
  },
};
</script>
