<script setup>
import { watch, ref, onMounted } from "vue";
import InputField from "@/components/Fields/InputField.vue";
import CheckBoxInput from "@/components/CheckBoxInput.vue";
import SelectDropdown from "@/components/Fields/SelectDropdown";
import { Switch } from "@headlessui/vue";
import { useRouter } from "vue-router";
import api from "@/api";

var route = useRouter();
const props = defineProps({
  team: Object,
});

let data = ref({
  id: "",
  name: "",
  slug: "",
  copy_existing_settings: false,
  include_existing_members: false,
  include_labels: false,
  include_estimates: false,
  include_workflows: false,
  include_issue_types: false,
  include_templates: false,
});
const teamsList = ref([]);
let selectedTeam = ref(null);

watch(
  () => props.team,
  (v1, v2) => {
    data.value.id = v1.id;
    data.value.name = v1.name;
    data.value.slug = v1.slug;
  }
);

onMounted(() => {
  api.get("teams?dropdown=true").then((response) => {
    console.log(response);
    teamsList.value = response.data;
  });
});

function TeamDropdownChange(team) {
  selectedTeam.value = team;
}

function closeEditTeam() {
  route.back();
}

function onSaveClick() {
  let workspace_id = localStorage.getItem("workSpaceID");
  let jsonBody = {
    name: data.value.name,
    slug: data.value.slug.toUpperCase(),
    copy_existing_settings: data.value.copy_existing_settings,
    workspace_id: workspace_id,
  };
  if (data.value.copy_existing_settings) {
    jsonBody.team_id = selectedTeam.value.id;
    jsonBody.include_existing_members = data.value.include_existing_members;
    jsonBody.include_labels = data.value.include_labels;
    jsonBody.include_estimates = data.value.include_estimates;
    jsonBody.include_workflows = data.value.include_workflows;
    jsonBody.include_issue_types = data.value.include_issue_types;
    jsonBody.include_templates = data.value.include_templates;
  }
  api
    .put(`teams/${data.value.id}`, jsonBody)
    .then((response) => {
      // Handle the API response
      if (response.status === 200) {
        console.log(response); // Log the response data
        route.back();
      }
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });
}
</script>

<template>
  <div>
    <div class="row" style="margin-top: 32px !important">
      <div class="col">
        <div>
          <label>Name</label>
          <div>
            <InputField placeholder="Name" v-model="data.name"></InputField>
          </div>
        </div>
      </div>
      <div class="col">
        <div>
          <label>Identifier</label>
          <div>
            <InputField
              v-model="data.slug"
              placeholder="Identifier should be 2-3 letters"
            ></InputField>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>

    <div class="row" style="margin-top: 32px !important">
      <div class="col">
        <div class="d-flex align-items-center justify-content-between">
          <label style="white-space: nowrap" class="m-0">
            Copy settings from existing team
          </label>
          <Switch
            v-model="data.copy_existing_settings"
            :style="
              data.copy_existing_settings
                ? 'background: #F96332;'
                : 'background: #EAEAEA;'
            "
            style=""
            class="custom-switch transition-colors duration-200 ease-in-out"
          >
            <span class="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              :class="
                data.copy_existing_settings ? 'translate-x-9' : 'translate-x-0'
              "
              class="custom-transform custom-transition duration-200 ease-in-out"
            ></span>
          </Switch>
        </div>
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
    <div v-if="data.copy_existing_settings">
      <div class="row" style="margin-top: 32px !important">
        <div class="col">
          <div class="select-box-container">
            <label>Team</label>
            <SelectDropdown
              :items="teamsList"
              placeholder="Select Teams"
              :displayKey="'name'"
              @onSelectValue="TeamDropdownChange($event)"
            >
            </SelectDropdown>
          </div>
        </div>
        <div class="col"></div>
        <div class="col"></div>
      </div>
      <div class="row" style="margin-top: 32px !important">
        <div class="d-flex col" style="gap: 8px">
          <CheckBoxInput
            id="include_existing_members"
            v-model="data.include_existing_members"
          ></CheckBoxInput>
          <label>Include existing members</label>
        </div>
      </div>
      <div class="row" style="margin-top: 5px !important">
        <div class="d-flex col" style="gap: 8px">
          <CheckBoxInput
            id="include_labels"
            v-model="data.include_labels"
          ></CheckBoxInput>
          <label>Include labels</label>
        </div>
      </div>
      <div class="row" style="margin-top: 5px !important">
        <div class="d-flex col" style="gap: 8px">
          <CheckBoxInput
            id="include_workflows"
            v-model="data.include_workflows"
          ></CheckBoxInput>
          <label>Include Workflows</label>
        </div>
      </div>
      <div class="row" style="margin-top: 5px !important">
        <div class="d-flex col" style="gap: 8px">
          <CheckBoxInput
            id="include_issue_types"
            v-model="data.include_issue_types"
          ></CheckBoxInput>
          <label>Include Issue Types</label>
        </div>
      </div>
      <div class="row" style="margin-top: 5px !important">
        <div class="d-flex col" style="gap: 8px">
          <CheckBoxInput
            id="include_templates"
            v-model="data.include_templates"
          ></CheckBoxInput>
          <label>Include Templates</label>
        </div>
      </div>
      <div class="row" style="margin-top: 5px !important">
        <div class="d-flex col" style="gap: 8px">
          <CheckBoxInput
            id="include_estimates"
            v-model="data.include_estimates"
          ></CheckBoxInput>
          <label>Include Estimates</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div style="margin-top: 0px">
          <button
            type="button"
            class="custom-secondary-btn me-4"
            @click="closeEditTeam"
          >
            Cancel
          </button>
          <button class="custom-primary-btn" type="button" @click="onSaveClick">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.custom-transform {
  pointer-events: none;
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  box-shadow: inset 0 0 0 calc(0px + 2px) white;
  transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1)
    scaleY(1);
}

label {
  margin-bottom: 6px;
  font-size: 14px;
  color: #2a2c32;
  font-weight: 500;
}

.select-box-container {
  .select-box {
    position: relative;
    height: 38px;
    cursor: pointer;
    border: 1px solid #c4c4ca;
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    display: flex;
    align-items: center;
    padding: 10px 14px;
    gap: 8px;

    .selected-div {
      flex: 1;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
    }

    .chevron-down {
      width: 24px;
      height: 24px;
    }
  }
}

.transition-colors {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-switch {
  position: relative;
  display: inline-flex;
  height: 24px;
  width: 44px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 12px;
  border-width: 2px;
  border-color: transparent;
  padding: 0px;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 calc(2px + 2px) white;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.translate-x-9 {
  transform: translateX(20px);
}

.translate-x-0 {
  transform: translateX(0px);
}

.custom-transition {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
