<template>
  <div class="headerMobile">
    <div class="header-content">
      <img class="image-icon" src="../../assets/asset-6-8.png" alt="">
      <!-- <span style="font-size: 30px;">IssuesTasks</span>
      <span class="extension">.com</span> -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'LogoEmailMobile',
  props: {
    logo: Boolean,
  },
}
</script>
<style>
.headerMobile {
  display: none;
  /* Add styles to position the component outside the container */
  position: center;
  z-index: 100;
}

.header-content {
  display: flex; /* Use flexbox to display elements in a row */
  align-items: center; /* Align items vertically in the center */
}

.image-icon {
  /* Adjust image size as needed */
  height: 25px;
  /* width: 40px; */
  width: 250px !important;
  padding-right: 5px;
  vertical-align: middle;
}

.extension {
  color: #F96332;
  font-size: 30px;
}

@media screen and (max-width: 767px) {
  .headerMobile {
    display: block;
  }

  .extension {
    padding-top: 0px;
    color: #F96332;
    font-size: 30px;
  }
}
</style>
