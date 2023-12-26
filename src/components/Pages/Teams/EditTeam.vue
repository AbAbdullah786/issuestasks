<script setup>
import AppHeader from "@/components/AppHeader.vue";
import GeneralTabComponent from "./GeneralTabComponent.vue";
import IssueTypeTabComponent from "./IssueTypeTabComponent.vue";
import WorkflowTabComponent from "./WorkflowTabComponent.vue";
import LabelTabComponent from "./LabelTabComponent.vue";
import EstimateTabComponent from "./EstimateTabComponent.vue";
import FieldTabComponent from "./FieldTabComponent.vue";

import { onMounted, ref } from "vue";
import api from "@/api";
import { useRouter } from "vue-router";
var route = useRouter();
let tabs = ref([
  { isActive: true, title: "General", key: 1 },
  { isActive: false, title: "Issue Types", key: 2 },
  { isActive: false, title: "Workflows", key: 3 },
  { isActive: false, title: "Labels", key: 4 },
  { isActive: false, title: "Estimates", key: 5 },
  { isActive: false, title: "Fields", key: 6 },
]);

let teams_id = ref(null);
let currentTeam = ref(null);

let breadCrumbs = "Edit Issues Task / General";

function onTabChange(key) {
  tabs.value.forEach((tab) => {
    tab.isActive = tab.key == key;
    if (tab.isActive) {
      breadCrumbs = `Edit Issues Task / ${tab.title}`;
    }
  });
}

onMounted(() => {
  teams_id.value = route.currentRoute.value.params.id;
  api.get(`teams/${teams_id.value}`).then((response) => {
    currentTeam.value = response.data;
    console.log(currentTeam.value);
  });
});
</script>

<template>
  <div>
    <AppHeader heading="Teams" :breadCrumbs="breadCrumbs"></AppHeader>

    <div class="row">
      <div class="navbar navbarWork col-12">
        <div class="py-2 px-2" v-for="item in tabs" :key="item.key">
          <div :class="item.isActive ? 'border-line' : ''">
            <a
              :class="
                item.isActive
                  ? ' text-primary fs-4 cursor-pointer'
                  : ' default-css fs-4 cursor-pointer'
              "
              style="font-size: 20px !important"
              @click="onTabChange(item.key)"
            >
              {{ item.title }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div
        class="col-12"
        :style="{
          display: tabs[0].isActive ? 'block' : 'none',
        }"
      >
        <GeneralTabComponent :team="currentTeam" />
      </div>
      <div
        class="col-12"
        :style="{
          display: tabs[1].isActive ? 'block' : 'none',
        }"
      >
        <IssueTypeTabComponent />
      </div>
      <div
        class="col-12"
        :style="{
          display: tabs[2].isActive ? 'block' : 'none',
        }"
      >
        <WorkflowTabComponent />
      </div>
      <div
        class="col-12"
        :style="{
          display: tabs[3].isActive ? 'block' : 'none',
        }"
      >
        <LabelTabComponent />
      </div>
      <div
        class="col-12"
        :style="{
          display: tabs[4].isActive ? 'block' : 'none',
        }"
      >
        <EstimateTabComponent />
      </div>
      <div
        class="col-12"
        :style="{
          display: tabs[5].isActive ? 'block' : 'none',
        }"
      >
        <FieldTabComponent />
      </div>
    </div>
  </div>
</template>

<style>
.navbarWork {
  width: auto !important;
  gap: 64px;
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
