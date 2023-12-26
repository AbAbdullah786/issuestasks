<script setup>
import AppHeader from "@/components/AppHeader.vue";
import InputField from "@/components/Fields/InputField.vue";
import SelectDropdown from "@/components/Fields/SelectDropdown";
import { useToast } from "vue-toastification";
import SuccessIcon from "../../ToastIcons/SuccessIcon";

import CheckBoxInput from "@/components/CheckBoxInput.vue";
import BacklogActive from "@/components/NavIcons/BacklogActiveIcon.vue";
// import BacklogActive from "@/components/SelectBoxIcon/icon1.vue";
// import Icon1 from "../../SelectBoxIcon/Icon1.vue";
// import Icon2 from "../../SelectBoxIcon/Icon2.vue";
// import Icon3 from "../../SelectBoxIcon/Icon3.vue";
// import Icon4 from "../../SelectBoxIcon/Icon4.vue";
// import Icon5 from "../../SelectBoxIcon/Icon5.vue";
// import Icon6 from "../../SelectBoxIcon/Icon6.vue";
// import Icon7 from "../../SelectBoxIcon/Icon7.vue";
// import Icon8 from "../../SelectBoxIcon/Icon8.vue";
// import Icon9 from "../../SelectBoxIcon/Icon9.vue";
// import Icon10 from "../../SelectBoxIcon/Icon10.vue";
// import Icon11 from "../../SelectBoxIcon/Icon11.vue";
// import Icon12 from "../../SelectBoxIcon/Icon12.vue";
// import Icon13 from "../../SelectBoxIcon/Icon13.vue";
// import Icon14 from "../../SelectBoxIcon/Icon14.vue";
// import Icon15 from "../../SelectBoxIcon/Icon15.vue";
// import Icon16 from "../../SelectBoxIcon/Icon16.vue";
// import Icon17 from "../../SelectBoxIcon/Icon17.vue";
// import Icon18 from "../../SelectBoxIcon/Icon18.vue";
// import Icon19 from "../../SelectBoxIcon/Icon19.vue";
// import Icon20 from "../../SelectBoxIcon/Icon20.vue";
// import Icon21 from "../../SelectBoxIcon/Icon21.vue";
// import Icon22 from "../../SelectBoxIcon/Icon22.vue";
import api from "../../../api";

import { onMounted, ref } from "vue";
import { Switch } from "@headlessui/vue";
import { useRouter } from "vue-router";
const toast = useToast();

var router = useRouter();
const name = ref("");
const slug = ref("");
const teamsList = ref([]);
const enabled = ref(false);
const checkSelectBox = ref(false);
const selectedTeam = ref(null);
const includeExistingMembers = ref(false);
const includeLabels = ref(false);
const includeWorkflows = ref(false);
const includeIssueTypes = ref(false);
const includeTemplates = ref(false);
const includeEstimates = ref(false);

onMounted(() => {
  api.get("teams?dropdown=true").then((response) => {
    console.log(response);
    teamsList.value = response.data;
  });
});

function TeamDropdownChange(team) {
  console.log(team);
  if (team && team.id) {
    selectedTeam.value = team;
  }
}
function onSelectToggle() {
  checkSelectBox.value = !checkSelectBox.value;
  // Make the API request
}
function onAddTeam() {
  // Make the API request
  let workspace_id = localStorage.getItem("workSpaceID");
  api
    .post("teams", {
      workspace_id,
      name: name.value,
      slug: slug.value,
      copy_existing_settings: selectedTeam.value ? true : false,
      team_id: selectedTeam.value ? selectedTeam.value.id : null,
      include_existing_members: includeExistingMembers.value
    })
    .then((response) => {
      // Handle the API response
      if (response.status === 200) {
        router.push("/teams");
        toast("Your changes are saved successfully", {
          position: "top-right",
          timeout: 4025,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: false,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: false,
          icon: SuccessIcon,
          rtl: false,
        });
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
    <AppHeader heading="Teams" breadCrumbs="Add New Team"></AppHeader>
    <div style="padding: 32px 0px">
      <div>
        <div class="row">
          <div class="col">
            <div class="select-box-container">
              <label>Icon</label>
              <div class="select-box" @click="onSelectToggle">
                <div class="selected-div">Select</div>
                <div class="chevron-down">
                  <img src="assets/images/arrow-down.svg" />
                </div>
                <div v-if="checkSelectBox" style="
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                    margin-top: 5px;
                    border-radius: 2%;
                    width: 508px;
                    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
                      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
                    position: absolute;
                    left: 0;
                    top: 100%;
                    z-index: 2;
                    background-color: white;
                  ">
                  <div style="display: flex; gap: 30px">
                    <div style="
                        margin-left: 10px;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #c4c4ca;
                        cursor: pointer;
                      "></div>
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #7b8497;
                        cursor: pointer;
                      "></div>
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #10f1ae;
                        cursor: pointer;
                      "></div>
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #e9c509;
                        cursor: pointer;
                      "></div>
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: red;
                        cursor: pointer;
                      "></div>
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #9b10f1;
                        cursor: pointer;
                      "></div>
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #00e0ff;
                        cursor: pointer;
                      "></div>
                  </div>
                  <hr />
                  <!-- <div style="display: flex; gap: 30px; margin-bottom: 20px">
                    <div>
                      <Icon1 />
                    </div>
                    <div>
                      <Icon2 />
                    </div>
                    <div>
                      <Icon3 />
                    </div>
                    <div>
                      <Icon4 />
                    </div>
                    <div>
                      <Icon5 />
                    </div>
                    <div>
                      <Icon6 />
                    </div>
                    <div>
                      <Icon7 />
                    </div>
                    <div>
                      <Icon8 />
                    </div>
                    <div>
                      <Icon9 />
                    </div>
                    <div>
                      <Icon10 />
                    </div>
                    <div>
                      <Icon11 />
                    </div>
                  </div>
                  <div style="display: flex; gap: 30px; margin-bottom: 15px">
                    <div>
                      <Icon12 />
                    </div>
                    <div>
                      <Icon13 />
                    </div>
                    <div>
                      <Icon14 />
                    </div>
                    <div>
                      <Icon15 />
                    </div>
                    <div>
                      <Icon16 />
                    </div>
                    <div>
                      <Icon17 />
                    </div>
                    <div>
                      <Icon18 />
                    </div>
                    <div>
                      <Icon19 />
                    </div>
                    <div>
                      <Icon20 />
                    </div>
                    <div>
                      <Icon21 />
                    </div>
                    <div>
                      <Icon22 />
                    </div>
                  </div>
                  <div style="display: flex; gap: 30px; margin-bottom: 15px">
                    <div>
                      <Icon12 />
                    </div>
                    <div>
                      <Icon13 />
                    </div>
                    <div>
                      <Icon14 />
                    </div>
                    <div>
                      <Icon15 />
                    </div>
                    <div>
                      <Icon16 />
                    </div>
                    <div>
                      <Icon17 />
                    </div>
                    <div>
                      <Icon18 />
                    </div>
                    <div>
                      <Icon19 />
                    </div>
                    <div>
                      <Icon20 />
                    </div>
                    <div>
                      <Icon21 />
                    </div>
                    <div>
                      <Icon22 />
                    </div>
                  </div>
                  <div style="display: flex; gap: 30px; margin-bottom: 15px">
                    <div>
                      <Icon12 />
                    </div>
                    <div>
                      <Icon13 />
                    </div>
                    <div>
                      <Icon14 />
                    </div>
                    <div>
                      <Icon15 />
                    </div>
                    <div>
                      <Icon16 />
                    </div>
                    <div>
                      <Icon17 />
                    </div>
                    <div>
                      <Icon18 />
                    </div>
                    <div>
                      <Icon19 />
                    </div>
                    <div>
                      <Icon20 />
                    </div>
                    <div>
                      <Icon21 />
                    </div>
                    <div>
                      <Icon22 />
                    </div>
                  </div>
                  <div style="display: flex; gap: 30px; margin-bottom: 15px">
                    <div>
                      <Icon12 />
                    </div>
                    <div>
                      <Icon13 />
                    </div>
                    <div>
                      <Icon14 />
                    </div>
                    <div>
                      <Icon15 />
                    </div>
                    <div>
                      <Icon16 />
                    </div>
                    <div>
                      <Icon17 />
                    </div>
                    <div>
                      <Icon18 />
                    </div>
                    <div>
                      <Icon19 />
                    </div>
                    <div>
                      <Icon20 />
                    </div>
                    <div>
                      <Icon21 />
                    </div>
                    <div>
                      <Icon22 />
                    </div>
                  </div>
                  <div style="display: flex; gap: 30px; margin-bottom: 15px">
                    <div>
                      <Icon12 />
                    </div>
                    <div>
                      <Icon13 />
                    </div>
                    <div>
                      <Icon14 />
                    </div>
                    <div>
                      <Icon15 />
                    </div>
                    <div>
                      <Icon16 />
                    </div>
                    <div>
                      <Icon17 />
                    </div>
                    <div>
                      <Icon18 />
                    </div>
                    <div>
                      <Icon19 />
                    </div>
                    <div>
                      <Icon20 />
                    </div>
                    <div>
                      <Icon21 />
                    </div>
                    <div>
                      <Icon22 />
                    </div>
                  </div>
                  <div style="display: flex; gap: 30px; margin-bottom: 15px">
                    <div>
                      <Icon12 />
                    </div>
                    <div>
                      <Icon13 />
                    </div>
                    <div>
                      <Icon14 />
                    </div>
                    <div>
                      <Icon15 />
                    </div>
                    <div>
                      <Icon16 />
                    </div>
                    <div>
                      <Icon17 />
                    </div>
                    <div>
                      <Icon18 />
                    </div>
                    <div>
                      <Icon19 />
                    </div>
                    <div>
                      <Icon20 />
                    </div>
                    <div>
                      <Icon21 />
                    </div>
                    <div>
                      <Icon22 />
                    </div>
                  </div>
                  <div style="display: flex; gap: 30px; margin-bottom: 15px">
                    <div>
                      <Icon12 />
                    </div>
                    <div>
                      <Icon13 />
                    </div>
                    <div>
                      <Icon14 />
                    </div>
                    <div>
                      <Icon15 />
                    </div>
                    <div>
                      <Icon16 />
                    </div>
                    <div>
                      <Icon17 />
                    </div>
                    <div>
                      <Icon18 />
                    </div>
                    <div>
                      <Icon19 />
                    </div>
                    <div>
                      <Icon20 />
                    </div>
                    <div>
                      <Icon21 />
                    </div>
                    <div>
                      <Icon22 />
                    </div>
                  </div>
                  <div style="display: flex; gap: 30px">
                    <div>
                      <Icon12 />
                    </div>
                    <div>
                      <Icon13 />
                    </div>
                    <div>
                      <Icon14 />
                    </div>
                    <div>
                      <Icon15 />
                    </div>
                    <div>
                      <Icon16 />
                    </div>
                    <div>
                      <Icon17 />
                    </div>
                    <div>
                      <Icon18 />
                    </div>
                    <div>
                      <Icon19 />
                    </div>
                    <div>
                      <Icon20 />
                    </div>
                    <div>
                      <Icon21 />
                    </div>
                    <div>
                      <Icon22 />
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col"></div>
          <div class="col"></div>
        </div>

        <div class="row" style="margin-top: 32px !important">
          <div class="col">
            <div>
              <label>Name</label>
              <div>
                <InputField placeholder="Name" v-model="name"></InputField>
              </div>
            </div>
          </div>
          <div class="col">
            <div>
              <label>Identifier</label>
              <div>
                <InputField v-model="slug" placeholder="Identifier should be 2-3 letters"></InputField>
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
              <Switch v-model="enabled" :style="enabled ? 'background: #F96332;' : 'background: #EAEAEA;'
                " style="" class="custom-switch transition-colors duration-200 ease-in-out">
                <span class="sr-only">Use setting</span>
                <span aria-hidden="true" :class="enabled ? 'translate-x-9' : 'translate-x-0'"
                  class="custom-transform custom-transition duration-200 ease-in-out"></span>
              </Switch>
            </div>
          </div>
          <div class="col"></div>
          <div class="col"></div>
        </div>
        <div v-if="enabled">
          <div class="row" style="margin-top: 32px !important">
            <div class="col">
              <div class="select-box-container">
                <label>Team</label>
                <!-- <div class="select-box"> -->
                <!-- <div class="selected-div">Select</div>
                  <div class="chevron-down">
                    <img src="assets/images/arrow-down.svg" />
                  </div> -->
                <SelectDropdown :items="teamsList" placeholder="Select Teams" :displayKey="'name'"
                  @onSelectValue="TeamDropdownChange($event)">
                </SelectDropdown>
                <!-- </div> -->
              </div>
            </div>
            <div class="col"></div>
            <div class="col"></div>
          </div>
          <div class="row" style="margin-top: 32px !important">
            <div class="d-flex col" style="gap: 8px">
              <CheckBoxInput id="first-box" v-model="includeExistingMembers"></CheckBoxInput>
              <label>Include existing members</label>
            </div>
          </div>
          <div class="row" style="margin-top: 5px !important">
            <div class="d-flex col" style="gap: 8px">
              <CheckBoxInput id="second-box" v-model="includeLabels"></CheckBoxInput>
              <label>Include labels</label>
            </div>
          </div>
          <div class="row" style="margin-top: 5px !important">
            <div class="d-flex col" style="gap: 8px">
              <CheckBoxInput id="third-box" v-model="includeWorkflows"></CheckBoxInput>
              <label>Include Workflows</label>
            </div>
          </div>
          <div class="row" style="margin-top: 5px !important">
            <div class="d-flex col" style="gap: 8px">
              <CheckBoxInput id="fourth-box" v-model="includeIssueTypes"></CheckBoxInput>
              <label>Include Issue Types</label>
            </div>
          </div>
          <div class="row" style="margin-top: 5px !important">
            <div class="d-flex col" style="gap: 8px">
              <CheckBoxInput id="fifth-box" v-model="includeTemplates"></CheckBoxInput>
              <label>Include Templates</label>
            </div>
          </div>
          <div class="row" style="margin-top: 5px !important">
            <div class="d-flex col" style="gap: 8px">
              <CheckBoxInput id="sixth-box" v-model="includeEstimates"></CheckBoxInput>
              <label>Include Estimates</label>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="margin-top: 32px !important">
        <div class="col-12">
          <button class="custom-primary-btn d-flex" @click="onAddTeam">
            <strong>Save</strong>
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
  transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);
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
