<template>
  <div class="d-flex flex-nowrap" style="height: 100vh; width: 100vw;">
    <div style="height: 100vh;">
      <SideBar></SideBar>
    </div>
    <main class="col overflow-auto">
      <div class="p-3">
        <button class="icon-menu-show toggleNavBtn d-none" @click="showSideBar" type="button">
          &nbsp;
        </button>
        <slot>
          <router-view/>
        </slot>
      </div>
    </main>
  </div>
</template>

<script>
import SideBar from './SideBar.vue';

export default {
  name: 'AdminLayout',
  components: { SideBar},
  data() {
    return {
    }
  },
  methods: {
    showSideBar() {
      const appDiv = document.getElementById('app');
      appDiv.classList.toggle('showMenu');    }
  },
}
</script>

<style>
/* Add styles for the layout */
.layout {
  display: flex;
}

SideBar {
  width: 200px;
  background-color: #f1f1f1;
  /* Add any other styling properties as needed */
}

.content {
  flex-grow: 1;
  /* Add any other styling properties as needed */
}
</style>
