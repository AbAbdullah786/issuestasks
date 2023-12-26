<script setup>
import AppHeader from "@/components/AppHeader.vue";
import InputField from "@/components/Fields/InputField";
import SprintIcon from "@/components/Icons/SprintIcon.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import DeleteIcon from "../../ToastIcons/DeleteIcon";
import { onMounted, ref } from "vue";
import api from "../../../api";
var router = useRouter();
const data = ref([]);
const selectedTeam = ref(null);
const toast = useToast();

onMounted(() => {
  fetchData();
});

function fetchData() {
  api
    .get("teams")
    .then((response) => {
      if (response.status === 200) {
        data.value = response.data;
      }
    })
    .catch((error) => {
      if (error) {
        return false;
      }
    });
}

function navigateToTeammember(item) {
  router.push(`/team-members/${item.id}`);
}

function onEditClick(item) {
  router.push(`/edit-team/${item.id}`);
}

function onDeleteClick(item) {
  selectedTeam.value = item;
}

function onDeleteClickFromModal() {
  api.delete(`teams/${selectedTeam.value.id}`).then((response) => {
    let btn = document.getElementById("teamsModalCancelBtn");
    btn.click();

    fetchData();
    toast("Your team has been deleted.", {
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
      icon: DeleteIcon,
      rtl: false,
    });
  });
}
</script>
<template>
  <AppHeader heading="Teams"></AppHeader>
  <div class="px-3">
    <div class="py-4">
      <div class="d-flex justify-content-between">
        <div class="w-25">
          <InputField placeholder="Search" type="text" :svgIcon="true"></InputField>
        </div>
        <router-link to="add-team" class="text-decoration-none">
          <button class="custom-primary-btn d-flex align-items-center" type="button">
            <strong>Add Team</strong>
          </button>
        </router-link>
      </div>
    </div>

    <div class="tab-wrapper p-3">
      <div class="table-responsive">
        <table class="table table-borderless align-middle text-center">
          <thead class="thead-view">
            <tr class="head-row-view text-center align-middle">
              <th scope="col">Name</th>
              <th scope="col">Identifier</th>
              <th scope="col">Location</th>
              <th scope="col">Lead</th>
              <th scope="col">Sprints</th>
              <th scope="col">Projects</th>
              <th scope="col">Members</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="tab-body">
            <tr class="row-view" v-for="(item, index) in data" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.slug }}</td>
              <td>{{ "N/A" }}</td>
              <td>
                <img width="35" height="35" src="../../../assets/images/lead.png" />
              </td>
              <td>
                <!--
                  <SprintIcon />
                  <span class="text-lightgray"> +1 </span>
                -->
                {{ "N/A" }}
              </td>
              <td>
                <img  width="35" height="35" src="../../../assets/images/project-1.png" v-for="(project, index) in [1, 2, 3, 4]" :key="index"
                  :style="index != 0 ? 'margin-left: -20px' : ''" />
                <span class="text-lightgray"> &nbsp; +22 </span>
              </td>
              <td @click="navigateToTeammember(item)" style="cursor: pointer">
                {{ item.members[0]?.name }}
              </td>
              <td>
                <div class="cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img width="35" height="35" src="../../../assets/images/actions-icon.svg" />
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" @click="onEditClick(item)">Edit</a>
                    </li>
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" href="#">Archive</a>
                    </li>
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" data-bs-toggle="modal" data-bs-target="#exampleModal"
                        @click="onDeleteClick(item)">Delete</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Alert</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">Are you sure you want to delete this team?</div>
        <div class="modal-footer">
          <button type="button" class="custom-secondary-btn" data-bs-dismiss="modal" id="teamsModalCancelBtn">
            Cancel
          </button>
          <button type="button" class="custom-primary-btn" @click="onDeleteClickFromModal">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.tab-wrapper {
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px rgba(249, 99, 50, 0.1);

  .table-responsive {
    overflow-y: auto;
    height: 80vh;
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .thead-view {
    .head-row-view {
      height: 60px;

      th {
        background-color: #eaeaea;
        font-weight: 500;
        position: sticky;
        top: 0px;
      }

      th:first-child {
        border-radius: 8px 0 0 0;
      }

      th:last-child {
        border-radius: 0 8px 0 0;
      }
    }
  }

  .tab-body {
    .row-view {
      height: 60px;
    }
  }
}
.modal-dialog {
  top: 30%
}
</style>
