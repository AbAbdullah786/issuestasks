<template>
  <div class="userHead">
    <div style="padding-left: 12px">
      <h1>WorkSpace</h1>
      <div class="row">
        <div class="navbar navbarWork col-12">
          <div class="py-2 px-2">
            <div :class="userProfile ? 'border-line' : ''">
              <router-link
                to="/workspace"
                :class="
                  userProfile
                    ? userProfile + ' ' + 'text-primary fs-4'
                    : 'default-css fs-4'
                "
                style="font-size: 20px !important"
              >
                General
              </router-link>
            </div>
          </div>
          <div class="py-2 px-2">
            <div :class="userPreference ? 'border-line' : ''">
              <router-link
                to="/members"
                :class="
                  userPreference
                    ? userPreference + ' ' + 'text-primary fs-4'
                    : 'default-css fs-4'
                "
                style="font-size: 20px !important"
              >
                Members</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserHead",
  props: {
    userPreference: String,
    userProfile: String,
    userQuickRelie: String,
    userNotify: String,
  },
  data() {
    return {
      data: {},
    };
  },
};
</script>

<style>
.navbarWork {
  width: auto !important;
}

.default-css {
  color: #7b8497 !important;
}

.border-line {
  position: relative;
  padding-bottom: 45px;
  /* Adjust the spacing here as needed */
}

.border-line::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  /* Adjust the border width here as needed */
  height: 3px;
  /* Adjust the border height here as needed */
  background-color: #f96332;
  /* Adjust the border color here as needed */
}
</style>
