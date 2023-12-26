<script setup>
import AppHeader from "@/components/AppHeader.vue";
import InputField from "@/components/Fields/InputField";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import SuccessIcon from "../../ToastIcons/SuccessIcon";

import { onMounted, ref } from "vue";
import api from "../../../api";
var router = useRouter();
const selectedMember = ref(null);
let teams_id = ref(null);
let currentTeam = ref(null);
let data = ref(null);
const toast = useToast();

onMounted(() => {
  const user_id = localStorage.getItem("workspace")
  data.value = JSON.parse(user_id).user_id;
  teams_id.value = router.currentRoute.value.params.id;
  fetchData();
});

function fetchData() {
  api.get(`teams/${teams_id.value}`).then((response) => {
    currentTeam.value = response.data;
  });
}

function onDetailsClicked(item) {
  selectedMember.value = item;
}
function onRemoveMember(e) {
  api
    .post(`teams/members/remove`, { teams_id: e.id, user_id: data.value })
    .then((response) => {
      if (response.status === 200) {
        fetchData();
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
      console.log(error, "Error");
    });
}
</script>
<template>
  <div class="px-3">
    <div class="py-4">
      <div class="d-flex justify-content-between">
        <div class="w-25">
          <InputField placeholder="Search" type="text" :svgIcon="true"></InputField>
        </div>
        <router-link to="/invite-members" class="text-decoration-none">
          <button class="custom-primary-btn d-flex align-items-center" type="button">
            <strong>Add New Field</strong>
          </button>
        </router-link>
      </div>
    </div>

    <div class="tab-wrapper p-3">
      <div class="table-responsive">
        <table class="table table-borderless align-middle text-center">
          <thead class="thead-view">
            <tr class="head-row-view text-center align-middle">
              <th scope="col">Field Name</th>
              <th scope="col">Type</th>
              <th scope="col">Used on Issue Type</th>
              <th scope="col">Location</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="tab-body">
            <tr class="row-view">
              <td>{{ "Time Tracking" }}</td>
              <td>{{ "User Story" }}</td>
              <td>{{ "Campbell" }}</td>
              <td>{{ "Campbell" }}</td>
              <td>
                <div class="cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="../../../assets/images/actions-icon.svg" />
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" data-bs-toggle="modal"
                        data-bs-target="#teamMemberDetailsModal">Details</a>
                    </li>
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px">Remove from
                        team</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="row-view">
              <td>{{ "Epic Link" }}</td>
              <td>{{ "Bug" }}</td>
              <td>{{ "Workspace" }}</td>
              <td>{{ "Campbell" }}</td>

              <td>
                <div class="cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="../../../assets/images/actions-icon.svg" />
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" data-bs-toggle="modal"
                        data-bs-target="#teamMemberDetailsModal">Details</a>
                    </li>
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px">Remove from
                        team</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr class="row-view">
              <td>{{ "Routine" }}</td>
              <td>{{ "User Story" }}</td>
              <td>{{ "Campbell" }}</td>
              <td>{{ "Campbell" }}</td>
              <td>
                <div class="cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="../../../assets/images/actions-icon.svg" />
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" data-bs-toggle="modal"
                        data-bs-target="#teamMemberDetailsModal">Details</a>
                    </li>
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px">Remove from
                        team</a>
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

  <!-- TeamMember Details Modal -->
  <div class="modal fade" id="teamMemberDetailsModal" tabindex="-1" aria-labelledby="teamMemberDetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="teamMemberDetailsModalLabel">Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            Invited By:
            {{
              selectedMember?.inviter.first_name +
              " " +
              selectedMember?.inviter.last_name
            }}
            {{ "Invitee image not available in API" }}
          </p>
          <p>Member since: {{ "Not Available in API" }}</p>
          <p>Last Logged: {{ selectedMember?.last_login }}</p>
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

  .thead-view {
    .head-row-view {
      height: 60px;

      th {
        background-color: #eaeaea;
        font-weight: 500;
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
</style>
