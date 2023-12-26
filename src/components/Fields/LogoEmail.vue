<template>
  <div class="header">
    <div class="header-content">
      <img class="image-icon" src="../../assets/asset-6-8.png" alt="">
      <!-- <span style="font-size: 40px;">IssuesTasks</span>
      <span class="extension">.com</span> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'LogoEmail',
  props: {
    logo: Boolean,
  },
}
</script>
<style>
.header {
  /* Add styles to position the component outside the container */
  position: absolute;
  top: 90px;
  z-index: 100;
}

.header-content {
  display: flex; /* Use flexbox to display elements in a row */
  align-items: center; /* Align items vertically in the center */
}

.image-icon {
  /* Adjust image size as needed */
  height: 30px;
  /* width: 50px; */
  width: 250px !important;
  padding-right: 5px;
  vertical-align: middle;
}

.extension {
  padding-top: 10px;
  color: #F96332;
  font-size: 40px;
}

@media screen and (max-width: 576px) {
  .header {
    top: 5px;
    left: 5px;
  }
}
</style>
