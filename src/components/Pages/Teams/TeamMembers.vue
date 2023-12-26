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
  console.log("YYYYYYYYYYYYEEEEEEEEEE")
  api
    .post(`teams/members/remove`, { team_id: e.id, user_id: data.value })
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
  <AppHeader heading="Teams" breadCrumbs="Issues Task Team Members"></AppHeader>
  <div class="px-3">
    <div class="py-4">
      <div class="d-flex justify-content-between">
        <div class="w-25">
          <InputField placeholder="Search" type="text" :svgIcon="true"></InputField>
        </div>
        <router-link to="/invite-members" class="text-decoration-none">
          <button class="custom-primary-btn d-flex align-items-center" type="button">
            <strong>Invite Member</strong>
          </button>
        </router-link>
      </div>
    </div>

    <div class="tab-wrapper p-3">
      <div class="table-responsive">
        <table class="table table-borderless align-middle text-center">
          <thead class="thead-view">
            <tr class="head-row-view text-center align-middle">
              <th scope="col">Team</th>
              <th scope="col">Name</th>
              <th scope="col">User ID</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="tab-body">
            <tr class="row-view" v-for="(member, index) in currentTeam?.members" :key="index">
              <td>{{ currentTeam?.name }}</td>
              <td>{{ member.first_name + " " + member.last_name }}</td>
              <td>{{ member.name }}</td>
              <td>{{ member.team_role.role }}</td>
              <td>
                <span v-if="!member.status" class="badge rounded-pill text-danger">N/A</span>
                <span v-if="member.status == 'declined'" class="badge rounded-pill text-danger">Declined</span>
                <span v-if="member.status == 'resend_invite'" class="badge rounded-pill text-warning">Resend Invite</span>
                <span v-if="member.status == 'accepted'" class="badge rounded-pill text-success">Accepted</span>
              </td>
              <td>
                <div class="cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="../../../assets/images/actions-icon.svg" />
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" data-bs-toggle="modal" data-bs-target="#teamMemberDetailsModal"
                        @click="onDetailsClicked(member)">Details</a>
                    </li>
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" @click="onRemoveMember(member)">Remove from team</a>
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
