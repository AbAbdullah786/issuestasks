<template>
  <div :class="loading ? 'pe-none px-0 mx-0' : 'px-0 mx-0'">
    <UserHead userPreference="text-bold"></UserHead>
    <div class="row py-3 px-3">
      <div class="col-6 col-md-3">
        <div class="heading">
          <h4>Theme</h4>
        </div>
        <div>
          <span>
            <SelectDropdown
              :items="themesArray"
              :initialSelectedValue="data.theme"
              @onSelectValue="ThemeDropdownChange"
            >
            </SelectDropdown>
          </span>
          <label class="small">Select your theme</label>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="heading">
          <h4>Home Page</h4>
        </div>
        <div>
          <span>
            <SelectDropdown
              :items="HomePageArray"
              :initialSelectedValue="data.default_view"
              @onSelectValue="HomePageDropdownChange"
            ></SelectDropdown>
          </span>
          <label class="small">Default This as your homepage</label>
        </div>
      </div>
    </div>

    <div class="py-3 px-3">
      <div class="setting-pref">
        <div class="heading">
          <h4>Auto Assigning Issues</h4>
        </div>
        <div class="">
          <span style="padding-right: 15px">
            <label for="auto_assign">
              <UnCheckedBox v-if="!data.auto_assign" />
              <CheckedBox v-if="data.auto_assign" />
            </label>
            <input
              id="auto_assign"
              type="checkbox"
              class="transparent-checkbox d-none"
              v-model="data.auto_assign"
              @change="handleAutoAssignChange"
            />
          </span>
          <span class="small">Auto Assigns Issues I've created</span>
        </div>
      </div>
    </div>

    <div class="py-3 px-3">
      <div class="setting-pref">
        <div class="heading">
          <h4>Main menu Configuration</h4>
        </div>
        <div class="">
          <div class="small">Include these Menu Items</div>
          <div class="pt-3">
            <span style="padding-right: 15px">
              <label for="sprint">
                <UnCheckedBox v-if="!data.sprint" />
                <CheckedBox v-if="data.sprint" />
              </label>
              <input
                id="sprint"
                type="checkbox"
                class="transparent-checkbox d-none"
                v-model="data.sprint"
                @change="handleConfigChange"
              />
            </span>
            <span>Sprints</span>
          </div>
          <div class="pt-3">
            <span style="padding-right: 15px">
              <label for="backlog">
                <UnCheckedBox v-if="!data.backlog" />
                <CheckedBox v-if="data.backlog" />
              </label>
              <input
                id="backlog"
                type="checkbox"
                class="transparent-checkbox d-none"
                v-model="data.backlog"
                @change="handleConfigChange"
              />
            </span>
            <span>Backlog</span>
          </div>
          <div class="pt-3">
            <span style="padding-right: 15px">
              <label for="roadmap">
                <UnCheckedBox v-if="!data.roadmap" />
                <CheckedBox v-if="data.roadmap" />
              </label>
              <input
                id="roadmap"
                type="checkbox"
                class="transparent-checkbox d-none"
                v-model="data.roadmap"
                @change="handleConfigChange"
              />
            </span>
            <span>Roadmaps</span>
          </div>
          <div class="pt-3">
            <span style="padding-right: 15px">
              <label for="teams">
                <UnCheckedBox v-if="!data.teams" />
                <CheckedBox v-if="data.teams" />
              </label>
              <input
                id="teams"
                type="checkbox"
                class="transparent-checkbox d-none"
                v-model="data.teams"
                @change="handleConfigChange"
              />
            </span>
            <span>Teams</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <scale-loader
    :loading="loading"
    :color="'#f96332'"
    :height="'35px'"
    :width="'7px'"
  ></scale-loader> -->
</template>

<script>
import UserHead from "@/components/Pages/Profile/UserHead";
import SelectDropdown from "@/components/Fields/SelectDropdown";
import api from "../../../api";
import { useToast } from "vue-toastification";
import SuccessIcon from "../../ToastIcons/SuccessIcon";
import CheckedBox from "../../Icons/CheckedBox";
import UnCheckedBox from "../../Icons/UnCheckedBox";
// import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  name: "UserPreference",
  components: {
    SelectDropdown,
    UserHead,
    // ScaleLoader,
    CheckedBox,
    UnCheckedBox,
  },
  beforeMount() {
    this.loading = true;
    if (localStorage.getItem("userPreference")) {
      this.data = JSON.parse(localStorage.getItem("userPreference"));
      this.data.sprint = this.data.main_menu_configuration.includes("Sprints");
      this.data.backlog = this.data.main_menu_configuration.includes("Backlog");
      this.data.roadmap = this.data.main_menu_configuration.includes("Roadmap");
      this.data.teams = this.data.main_menu_configuration.includes("Teams");
    }
    this.getPreferences();
  },
  data() {
    return {
      data: {
        theme: "",
        default_view: "",
        auto_assign: false,
        sprint: false,
        backlog: false,
        roadmap: false,
        teams: false,
        main_menu_configuration: [],
      },
      workspaceId: localStorage.getItem("workSpaceID"),
      themesArray: ["Dark", "Light", "System"],
      HomePageArray: ["All Issues", "Active Issues", "Inbox", "Current"],
      loading: false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    getPreferences() {
      api
        .get(`workspace/${this.workspaceId}/profile`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data) {
              this.data = response.data;
              localStorage.setItem("userPreference", JSON.stringify(this.data));
              this.data.sprint =
                this.data.main_menu_configuration.includes("Sprints");
              this.data.backlog =
                this.data.main_menu_configuration.includes("Backlog");
              this.data.roadmap =
                this.data.main_menu_configuration.includes("Roadmap");
              this.data.teams =
                this.data.main_menu_configuration.includes("Teams");
            } else {
              api
                .post(`workspace/${this.workspaceId}/profile`, {
                  theme: this.data.theme,
                  auto_assign: this.data.auto_assign,
                  default_view: this.data.default_view,
                  main_menu_configuration: this.data.main_menu_configuration,
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error, "asdasdas");
                });
            }
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error, "asdasdas");
          this.loading = false;
        });
    },
    updatePreferences() {
      api
        .post(`workspace/${this.workspaceId}/profile`, {
          theme: this.data.theme,
          auto_assign: this.data.auto_assign,
          default_view: this.data.default_view,
          main_menu_configuration: this.data.main_menu_configuration,
        })
        .then((response) => {
          console.log(response);
          this.getPreferences();
          this.toast("Your changes are saved successfully", {
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
        })
        .catch((error) => {
          console.log(error, "asdasdas");
        });
    },
    ThemeDropdownChange(value) {
      this.data.theme = value;
      this.updatePreferences();
    },
    HomePageDropdownChange(value) {
      this.data.default_view = value;
      this.updatePreferences();
    },
    handleAutoAssignChange() {
      console.log(this.data);
      this.updatePreferences();
    },
    handleConfigChange() {
      if (
        this.data.sprint &&
        this.data.main_menu_configuration.indexOf("Sprints") == -1
      ) {
        this.data.main_menu_configuration.push("Sprints");
      }
      if (
        !this.data.sprint &&
        this.data.main_menu_configuration.indexOf("Sprints") != -1
      ) {
        this.data.main_menu_configuration.splice(
          this.data.main_menu_configuration.indexOf("Sprints"),
          1
        );
      }
      if (
        this.data.backlog &&
        this.data.main_menu_configuration.indexOf("Backlog") == -1
      ) {
        this.data.main_menu_configuration.push("Backlog");
      }
      if (
        !this.data.backlog &&
        this.data.main_menu_configuration.indexOf("Backlog") != -1
      ) {
        this.data.main_menu_configuration.splice(
          this.data.main_menu_configuration.indexOf("Backlog"),
          1
        );
      }
      if (
        this.data.roadmap &&
        this.data.main_menu_configuration.indexOf("Roadmap") == -1
      ) {
        this.data.main_menu_configuration.push("Roadmap");
      }
      if (
        !this.data.roadmap &&
        this.data.main_menu_configuration.indexOf("Roadmap") != -1
      ) {
        this.data.main_menu_configuration.splice(
          this.data.main_menu_configuration.indexOf("Roadmap"),
          1
        );
      }
      if (
        this.data.teams &&
        this.data.main_menu_configuration.indexOf("Teams") == -1
      ) {
        this.data.main_menu_configuration.push("Teams");
      }
      if (
        !this.data.teams &&
        this.data.main_menu_configuration.indexOf("Teams") != -1
      ) {
        this.data.main_menu_configuration.splice(
          this.data.main_menu_configuration.indexOf("Teams"),
          1
        );
      }
      this.updatePreferences();
    },
  },
};
</script>

<style>
.setting-pref {
  padding-left: 20px;
}

.card {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
}

.card-header {
  margin-bottom: 8px;
}

h3 {
  font-size: 29px;
  font-family: Roboto, sans-serif;
}

.form-check-input {
  background-color: #ffffff !important;
  border: 2px solid #070707 !important;
  color: #070707 !important;
  box-shadow: none !important;
}

.form-check-input:checked {
  background-color: #070707 !important;
  box-shadow: none !important;
}

p {
  font-size: 14px;
  color: #666;
  font-family: Roboto-Regular, sans-serif;
}

.icons i {
  position: absolute;
  color: #0000006b;
}

.icons {
  width: 100%;
  margin-bottom: 10px;
}

.icon {
  padding: 15px 0 0 10px;
  min-width: 40px;
  font-family: Roboto, sans-serif;
}

.card-body {
  flex: 1 1 auto;
  padding: 0px 0px 15px 0px;
  color: var(--bs-card-color);
}

.signup-button {
  border: none;
  position: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  padding: 5px 15px;
  font-family: Roboto;
  font-size: 16px !important;
}

button:hover {
  background-color: #f96332;
  /* Change to desired hover color */
  color: #ffffff;
  /* Change to desired hover color */
}

.image {
  height: 20px;
  border-radius: 10px;
  background: transparent;
  width: 20px;
}

input[disabled] {
  background-color: #f4f4f4 !important;
}
</style>
