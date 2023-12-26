<template>
  <aside class="flex-shrink-0">
    <header class="p-3">
      <button class="icon-menu-hide toggleNavBtn d-none" @click="hideSideBar" type="button"></button>
      <div class="logoSection">
        <img class="image-sidebar-logo" src="./../../assets/images/logo-icon.svg" alt="" />
        <span> {{ user && user.username ? user.username : "------" }} </span>
        <!-- Profile image button -->
        <div class="btn-group">
          <button type="button" class="profileBtn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img v-if="user && user.avatar && isImage" class="w-100 rounded-circle" :src="user.avatar" />
            <span :id="user.avatar" v-if="user && user.avatar && isColor" :style="{
              backgroundColor: user.avatar,
            }" class="d-block rounded-circle w-100 h-100"></span>
            <span v-if="user && !user.avatar" class="name-initials">
              {{
                user && user.first_name && user.last_name
                ? user.first_name[0] + user.last_name[0]
                : user && user.username
                  ? user.username[0] + user.username[1]
                  : user && user.email
                    ? user.email[0] + user.email[1]
                    : ""
              }}
            </span>
          </button>
          <ul class="dropdown-menu profile-menu p-0">
            <li>
              <router-link to="/user-profile" class="px-2">
                <!-- <span class="icon-view-profile"></span> -->
                <ViewProfile />
                <span class="ms-2">View Profile</span>
              </router-link>
            </li>
            <li>
              <!-- <a href="#" class="px-2"> -->
              <router-link to="/user-preferences" class="px-2">
                <!-- <span class="icon-preferences"></span> -->
                <Preferences />
                <span class="ms-2">Preferences</span>
                <!-- </a> -->
              </router-link>
            </li>
            <li>
              <a href="#" class="px-2">
                <!-- <span class="icon-linked-accounts"></span> -->
                <LinkedAccounts />
                <span class="ms-2">Linked Accounts</span>
              </a>
            </li>
            <li>
              <a href="#" class="px-2">
                <!-- <span class="icon-notification"></span> -->
                <Settings />
                <span class="ms-2">Notifications</span>
              </a>
            </li>
            <!--
            <li>
              <a @click="logout">
                <span class="icon-logout"></span>
                <span>Log Out</span>
              </a>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="searchBar pt-3">
        <InputField placeholder="Search" type="text" :svgIcon="true"></InputField>
      </div>
    </header>
    <nav class="px-3 flex-column d-flex">
      <ul class="list-unstyled ps-0">
        <li class="">
          <router-link to="/issues" v-slot="{ isActive }">
            <span v-if="isActive">
              <MyIssuesActive />
            </span>
            <span v-if="!isActive">
              <MyIssues />
            </span>
            <span class="ms-2">My Issues</span>
          </router-link>
        </li>
        <li>
          <router-link to="/abc" v-slot="{ isActive }">
            <!-- <span class="icon-new-issues"></span> -->
            <span v-if="isActive">
              <NewIssuesActive />
            </span>
            <span v-if="!isActive">
              <NewIssues />
            </span>
            <span class="ms-2">New Issue</span>
          </router-link>
        </li>
        <li>
          <router-link to="/abc" v-slot="{ isActive }">
            <!-- <span class="icon-inbox"></span> -->
            <span v-if="isActive">
              <InboxActive />
            </span>
            <span v-if="!isActive">
              <Inbox />
            </span>
            <span class="ms-2">Inbox</span>
          </router-link>
        </li>
        <li>
          <router-link to="/abc" v-slot="{ isActive }">
            <!-- <span class="icon-view"></span> -->
            <span v-if="isActive">
              <ViewsActive />
            </span>
            <span v-if="!isActive">
              <Views />
            </span>
            <span class="ms-2">Views</span>
          </router-link>
        </li>
        <li>
          <router-link to="/abc" v-slot="{ isActive }">
            <!-- <span class="icon-sprints"></span> -->
            <span v-if="isActive">
              <SprintsActive />
            </span>
            <span v-if="!isActive">
              <Sprints />
            </span>
            <span class="ms-2">Sprints</span>
          </router-link>
        </li>
        <li>
          <router-link to="/abc" v-slot="{ isActive }">
            <!-- <span class="icon-backlog"></span> -->
            <span v-if="isActive">
              <BacklogActive />
            </span>
            <span v-if="!isActive">
              <Backlog />
            </span>
            <span class="ms-2">Backlog</span>
          </router-link>
        </li>
        <li>
          <router-link to="/abc" v-slot="{ isActive }">
            <!-- <span class="icon-roadmap"></span> -->
            <span v-if="isActive">
              <RoadmapActive />
            </span>
            <span v-if="!isActive">
              <Roadmap />
            </span>
            <span class="ms-2">Roadmap</span>
          </router-link>
        </li>
        <li>
          <router-link to="/teams" v-slot="{ isActive }">
            <!-- <span class="icon-teams"></span> -->
            <span v-if="isActive">
              <TeamsActive />
            </span>
            <span v-if="!isActive">
              <Teams />
            </span>
            <span class="ms-2">Teams</span>
          </router-link>
        </li>
        <li>
          <div class="position-relative">
            <button class="collapsed collapsable favoritesMenu" data-bs-toggle="collapse"
              data-bs-target="#favorites-collapse" aria-expanded="false">
              <span v-if="isActive">
                <FavouritesActive />
              </span>
              <span v-if="!isActive">
                <Favourites />
              </span>
              <span class="ms-2">Favorites</span>
            </button>
            <img class="addFolder" src="./../../assets/images/add-folder-icon.svg" alt="" />
          </div>
          <!-- I think when user click on new folder icon  -->
          <!-- then we have to open that input field so user can type folder name  -->
          <!-- <input type="text" class="form-control folderField" /> -->
          <div class="collapse" id="favorites-collapse">
            <ul class="list-unstyled ps-4">
              <li>
                <div class="dropdown">
                  <a href="#">
                    <span class="icon-folder"></span>
                    <span>Folder 1</span>
                  </a>
                  <button class="moreOptions dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <span class="icon-more"></span>
                  </button>
                  <ul class="dropdown-menu p-0">
                    <li>
                      <a href="#">
                        <span class="icon-folder"></span>
                        <span>Rename Folder</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span class="icon-remove"></span>
                        <span>Remove Folder</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <button class="collapsed collapsable" data-bs-toggle="collapse" data-bs-target="#flags-collapse"
            aria-expanded="false">
            <!-- <span class="icon-flags"></span> -->
            <span v-if="isActive">
              <FlagsActive />
            </span>
            <span v-if="!isActive">
              <Flags />
            </span>
            <span class="ms-2">Flags</span>
          </button>
          <div class="collapse" id="flags-collapse">
            <ul class="list-unstyled ps-4">
              <li>
                <a href="#">
                  <!-- <span class="icon-flag-info"></span> -->
                  <span>Flag info 1</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <!-- <span class="icon-flag-info"></span> -->
                  <span>Flag info 2</span>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <button class="collapsed collapsable" data-bs-toggle="collapse" data-bs-target="#yourteams-collapse"
            aria-expanded="false">
            <!-- <span class="icon-teams"></span> -->
            <span v-if="isActive">
              <YourTeamsActive />
            </span>
            <span v-if="!isActive">
              <YourTeams />
            </span>
            <span class="ms-2">Your Teams</span>
          </button>
          <div class="collapse" id="yourteams-collapse">
            <ul class="list-unstyled ps-4" v-for="(teams, index) in yourTeams" :key="index">
              <li>
                <button class="collapsed collapsable" data-bs-toggle="collapse" :data-bs-target="'#team-' + teams.id"
                  aria-expanded="false">
                  <!-- <span class="icon-team"></span> -->
                  <span>{{ teams.name }}</span>
                </button>
                <div class="collapse" :id="'team-' + teams.id">
                  <ul class="list-unstyled ps-4">
                    <li>
                      <a href="#">
                        <!-- <span class="icon-active"></span> -->
                        <span>Active</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <!-- <span class="icon-backlog"></span> -->
                        <span>Backlog</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <!-- <span class="icon-sprints"></span> -->
                        <span>Sprints</span>
                      </a>
                    </li>
                    <li>
                      <RouterLink :to="'teams/' + teams.id + '/projects'">
                      <!-- <a href="#"> -->
                        <!-- <span class="icon-projects"></span> -->
                        <span>Projects</span>
                      <!-- </a> -->
                    </RouterLink>
                    </li>
                    <li>
                      <a href="#">
                        <!-- <span class="icon-view"></span> -->
                        <span>Views</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <!-- <span class="icon-settings"></span> -->
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <!-- <span class="icon-members"></span> -->
                        <span>Members</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <router-link to="/workspace" v-slot="{ isActive }">
            <!-- <span class="icon-workspace"></span> -->
            <span v-if="isActive">
              <WorkSpaceActive />
            </span>
            <span v-if="!isActive">
              <WorkSpace />
            </span>
            <span class="ms-2">Workspace</span>
          </router-link>
        </li>
        <li>
          <a @click="logout">
            <!-- <span class="icon-logout"></span> -->
            <!-- <span v-if="isActive"> <LogoutActive /></span> -->
            <span>
              <Logout />
            </span>
            <span class="ms-2">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import MyIssues from "../NavIcons/MyIssuesIcon";
import MyIssuesActive from "../NavIcons/MyIssuesActiveIcon";
import NewIssues from "../NavIcons/NewIssuesIcon";
import NewIssuesActive from "../NavIcons/NewIssuesActiveIcon";
import Inbox from "../NavIcons/InboxIcon";
import InboxActive from "../NavIcons/InboxActiveIcon";
import Views from "../NavIcons/ViewsIcon";
import ViewsActive from "../NavIcons/ViewsActiveIcon";
import Sprints from "../NavIcons/SprintsIcon";
import SprintsActive from "../NavIcons/SprintsActiveIcon";
import Backlog from "../NavIcons/BacklogIcon";
import BacklogActive from "../NavIcons/BacklogActiveIcon";
import Roadmap from "../NavIcons/RoadmapIcon";
import RoadmapActive from "../NavIcons/RoadmapActiveIcon";
import Teams from "../NavIcons/TeamsIcon";
import TeamsActive from "../NavIcons/TeamsActiveIcon";
import Favourites from "../NavIcons/FavouritesIcon";
import FavouritesActive from "../NavIcons/FavouritesActiveIcon";
import Flags from "../NavIcons/FlagsIcon";
import FlagsActive from "../NavIcons/FlagsActiveIcon";
import YourTeams from "../NavIcons/YourTeamsIcon";
import YourTeamsActive from "../NavIcons/YourTeamsActiveIcon";
import WorkSpace from "../NavIcons/WorkSpaceIcon";
import WorkSpaceActive from "../NavIcons/WorkSpaceActiveIcon";
import Logout from "../NavIcons/LogoutIcon";
// import LogoutActive from "../NavIcons/LogoutActiveIcon";
import Preferences from "../ProfileMenuIcons/PreferencesIcon";
import ViewProfile from "../ProfileMenuIcons/ViewProfileIcon";
import LinkedAccounts from "../ProfileMenuIcons/LinkedAccountsIcon";
import Settings from "../ProfileMenuIcons/SettingsIcon";
import InputField from "@/components/Fields/InputField";
import api from "../../api";

export default {
  components: {
    MyIssues,
    MyIssuesActive,
    NewIssues,
    NewIssuesActive,
    Inbox,
    InboxActive,
    Views,
    ViewsActive,
    Sprints,
    SprintsActive,
    Backlog,
    BacklogActive,
    Roadmap,
    RoadmapActive,
    Teams,
    TeamsActive,
    Favourites,
    FavouritesActive,
    Flags,
    FlagsActive,
    YourTeams,
    YourTeamsActive,
    WorkSpace,
    WorkSpaceActive,
    Logout,
    // LogoutActive,
    Preferences,
    ViewProfile,
    LinkedAccounts,
    Settings,
    InputField,
  },
  props: ["SideBar", "isShowSideBar"],
  mounted() {
    if (this.isShowSideBar) {
      this.showSideBar();
    }
    this.getProfile();
    this.teamsList();
  },
  data() {
    return {
      user: null,
      isColor: false,
      isImage: null,
      yourTeams: null,
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property

  },
  methods: {
    hideSideBar() {
      const appDiv = document.getElementById("app");
      appDiv.classList.toggle("showMenu");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/auth/login");
    },
    showSideBar() {
      alert("asdasd");
      this.$store.commit("setMainDivClass", "your-custom-class");
    },

    teamsList() {
      api
      .get("teams")
      .then((response) => {
        if (response.status === 200) {
          this.yourTeams = response.data;
          console.log(this.yourTeams)
        }
      })
      .catch((error) => {
        if (error) {
          return false;
        }
      });
},
    isButtonDisabled() {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      api
          .get("workspace")
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem("workSpaceID", response.data.id);
              return false;
            }
          })
          .catch((error) => {
            if (error) {
              return true;
            }
          });
    },

    getProfile() {
      api
        .get("user/profile")
        .then((response) => {
          if (response.status === 200) {
            this.user = response.data.user;
            if (this.user && this.user.avatar) {
              if (this.user.avatar.startsWith("#")) {
                this.isColor = true;
                this.isImage = false;
              } else {
                this.isColor = false;
                this.isImage = true;
              }
            }
          }
        })
        .catch((error) => {
          console.log(error, "asdasdas");
        });
    },
  },
};
</script>

<style>
.profile-menu {
  border-radius: 8px;
  border: 1px solid #c4c4ca;
  box-shadow: 0px 4px 6px -2px rgba(16, 24, 40, 0.03),
    0px 12px 16px -4px rgba(16, 24, 40, 0.08);
}

.searchBar input {
  border: 1px solid #acacac;
  padding-left: 2.5rem;
}

.name-initials {
  width: 100%;
  height: 100%;
  background: #f96332;
  border-radius: 50%;
  font-size: 18px;
  line-height: 36px;
  color: #fff;
  text-transform: uppercase;
}
</style>

<!--<script src="./../../assets/js/main.js"></script>-->
