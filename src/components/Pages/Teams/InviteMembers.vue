<!-- <script setup>
import Multiselect from 'vue-multiselect'
import AppHeader from "@/components/AppHeader.vue";
import InputField from "@/components/Fields/InputField";
import SelectDropdown from "@/components/Fields/SelectDropdown";
import { useRouter } from "vue-router";
import DeletIcon from "../../Icons/DeleteIcon.vue";
import { useToast } from "vue-toastification";
import SuccessIcon from "../../ToastIcons/SuccessIcon";

import { onMounted, ref } from "vue";
import api from "../../../api";
var router = useRouter();
var toast = useToast();
let memberRoles = ref(['Administrator','Collaborator','Guest']);
let selectedRole = ref("Administrator");
let selectedTeam = ref({});
let teams = ref([{
  'name':'Please Select a Team',
  'id':'0'
}]);
let members = ref([]);
let selectedMembers = ref([]);
let components = ref({ Multiselect });
let currentSentIndex = ref(0);

function onRoleSelection(value) {
  console.log(selectedMembers.value);
}
function TeamDropdownChange(team) {
  console.log(selectedMembers.value);
}
function fetchTeams() {
  api
    .get("teams?dropdown=true")
    .then((response) => {
      if (response.status === 200) {
        if(response.data.length > 0) {
          for(var x=0;x<response.data.length;x++) {
            teams.value.push({
              'name':response.data[x]['name'],
              'id':response.data[x]['id'],
            });
          }
        }
      }
    })
    .catch((error) => {
      if (error) {
        return false;
      }
    });
}
function searchMembers(email) {
  api
    .post("teams/members/search",{emails:[email]})
    .then((response) => {
      if(response.data.length > 0) {
        let searchedMember = response.data[0];
        let name = searchedMember['name'];
        if(searchedMember['first_name'] != null || searchedMember['last_name'] != null) {
          name = searchedMember['first_name']+" "+searchedMember['last_name'];
        }
        members.value.push({
          'name':name,
          'email':searchedMember['email'],
          'id': searchedMember['id'],
        });
        selectedMembers.value.push({
          'name':name,
          'email':searchedMember['email'],
          'id': searchedMember['id'],
          'team_id':'0',
          'role':selectedRole.value
        });
      }
      else {
        members.value.push({
          'name':email,
          'email':email,
          'id': '',
        });
        selectedMembers.value.push({
          'name':email,
          'email':email,
          'id': '',
          'team_id':'0',
          'role':selectedRole.value
        });
      }
    })
    .catch((error) => {
      if(error) {
        return false;
      }
    })
}
onMounted(() => {
  fetchTeams();
});
function goBack() {
  router.go(-1);
}
function removeMember(index) {
  selectedMembers.value.splice(index,1);
}
function sendInvites() {
  if(selectedMembers.value.length > 0){
    for(var index=0;index<selectedMembers.value.length;index++) {
      let currentMember = selectedMembers.value[index];
      if(currentMember['team_id'] == '0') {
        continue;
      }
      if(currentMember['id'] == '') {
        //Create User First
        api
        .post("user/create",{email:currentMember['email']})
        .then((response) => {
          if(response.status == 200) {
            sendFinalInvites([{
                team_id: currentMember['team_id'],
                role: currentMember['role'].toLowerCase(),
                email: currentMember['email'],
                user_id: response.data['id'],
                team_ids:[currentMember['team_id']]
            }]);
          }
        })
        .catch((error) => {
          if(error) {
            return false;
          }
        })
      }
      else {
        sendFinalInvites([{
            team_id: currentMember['team_id'],
            role: currentMember['role'].toLowerCase(),
            email: currentMember['email'],
            user_id: currentMember['id'],
            team_ids:[currentMember['team_id']]
        }])
      }
    }
    
  }
}
function sendFinalInvites(finalInviteArrayToSend) {
  if(finalInviteArrayToSend.length > 0) {
      api
        .post("teams/members/invites",finalInviteArrayToSend)
        .then((response) => {
          if(response.status == 200) {
            api
            .post("teams/members/attach",finalInviteArrayToSend)
            .then((response) => {
              if(response.status == 200) {
                if(currentSentIndex.value == selectedMembers.value.length-1) {
                  toast("Invite sent to users", {
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
                    router.go(-1);
                }
                else {
                  currentSentIndex.value = currentSentIndex.value + 1;
                }
              }
            })
            .catch((error) => {
              if(error) {
                return false;
              }
            })
          }
        })
        .catch((error) => {
          if(error) {
            return false;
          }
        })
    }
}
</script>
<template>
  <AppHeader
    heading="Teams"
    breadCrumbs="Issues Task Team Members / Invite Members"
  ></AppHeader>
  <div class="px-3">
    <div class="py-4">
      <div class="d-flex justify-content-between">
        <div class="w-50">
          <Multiselect 
          v-model="selectedMembers" 
          tag-placeholder="Add this member to this team" 
          placeholder="Search or add a member" 
          label="name" 
          track-by="email" 
          :options="members"
          :multiple="true" 
          :taggable="true" 
          @tag="searchMembers">
          </Multiselect>
        </div>
      </div>
    </div>

    <div class="tab-wrapper p-3">
      <div class="table-responsive">
        <table class="table table-borderless align-middle text-center">
          <thead class="thead-view">
            <tr class="head-row-view text-center align-middle">
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Team</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="tab-body">
            <tr
              class="row-view"
              v-for="(member, index) in selectedMembers"
              :key="index"
            >
              <td>{{ member.name }}</td>
              <td>{{ member.email }}</td>
              <td>
                <select
                  v-model="member.team_id"
                  @change="TeamDropdownChange($event.target.value)"
                  :placeholder="placeholder"
                  class="form-select"
                >
                  <option v-for="item in teams" :key="item" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </td>
              <td>
                <select
                  v-model="member.role"
                  @change="onRoleSelection($event.target.value)"
                  :placeholder="placeholder"
                  class="form-select"
                >
                  <option v-for="item in memberRoles" :key="item" :value="item">
                    {{ item }}
                  </option>
                </select>
              </td>
              <td>
                <DeletIcon style="cursor: pointer" @click="removeMember(index)" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
                <div class="d-flex mt-5 mb-4">
                    <button
                  type="button"
                  class="custom-secondary-btn me-4 "
                  @click="goBack"
                >
                  Cancel
                </button>
                <button 
                    class="custom-primary-btn" 
                    type="button"
                    @click="sendInvites"
                    >
                  Send Invite
                </button>
                </div>
            </div>
      </div>
    </div>
  </div>

 
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Alert</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure you want to delete this team?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="custom-secondary-btn"
            data-bs-dismiss="modal"
            id="teamsModalCancelBtn"
          >
            Cancel
          </button>
          <button
            type="button"
            class="custom-primary-btn"
            @click="onDeleteClickFromModal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template> -->
<script></script>
<template>hjkk</template>
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
.modal-dialog {
  top: 30%
}
</style>
