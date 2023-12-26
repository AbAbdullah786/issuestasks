<template>
  <div class="card-body">
    <div :class="icons === 'envelop'? 'authcard' : 'authcard1'">
      <i :class="computedIconClass" :style="computedIconStyle"></i>
      <i v-if="icons === 'envelop'" class="fas fa-envelope"></i>
      <img v-if="icons === 'google'" class="image" :src="getImgUrl(icons)">
      <i class="card-text px-2">{{ description }}</i>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AuthCard',
  props: {
    icons: String,
    route: String,
    color: String,
    description: String
  },
  computed: {
    computedIconClass() {
      if (this.icons !== 'google' && this.icons !== 'envelope') {
        return 'fab fa-' + this.icons;
      } else {
        return '';
      }
    },
    computedIconStyle() {
      return 'color: ' + this.color+';' + 'font-size: 20px';
    }
  },
  methods: {
    getImgUrl(icon) {
      return require('../assets/' + icon + '.png')
    }
  }

}
</script>
<style>
.authcard {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: #F4F4F4;
  height: 45px;
  width: 100%;
  padding-left: 10px;
  color: #070707;
  transition: background-color 0.3s ease;
}

.authcard1 {
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: #8c8989;
  height: 45px;
  width: 100%;
  padding-left: 10px;
  color: #070707;
  transition: background-color 0.3s ease;
}

.card-body {
  flex: 1 1 auto;
  color: var(--bs-card-color);
}

.authcard i {
  font-style: normal;
}

.image {
  height: 20px;
  border-radius: 10px;
  background: transparent;
  width: 20px;
}

.authcard:hover {
  background-color: #8c8989; /* Change to desired hover color */
  color: #F4F4F4; /* Change to desired hover color */
}

.card-text {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0em;
  text-align: left;
}
</style>