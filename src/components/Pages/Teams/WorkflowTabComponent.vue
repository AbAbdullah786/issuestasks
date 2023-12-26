<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AddCircleIcon from "@/components/Icons/AddCircleIcon.vue";
import MenuIcon from "@/components/Icons/MenuIcon.vue";
import EllipseIcon from "@/components/Icons/EllipseIcon.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import EditIcon from "@/components/Icons/EditIcon.vue";
import ShareIcon from "@/components/Icons/ShareIcon.vue";
import InputField from "@/components/Fields/InputField";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import CheckBoxInput from '@/components/CheckBoxInput.vue';
import SuccessIcon from "../../ToastIcons/SuccessIcon";

import { onMounted, ref } from "vue";
import api from "../../../api";
var router = useRouter();
const selectedMember = ref(null);
let teams_id = ref(null);
let workFlowArray = ref(null);
let backlog = ref([{
      "label": "backlog", 
      "name": "Backlog", 
      "description": "Item is in backlog", 
      "is_default": true,
      "include":true,
      "id":"backlog-0",
      "serverId":""
  }]);
let notstarted = ref([{
      "label": "notstarted", 
      "name": "To Do", 
      "description": "Item is in ToDo", 
      "is_default": true,
      "include":true,
      "id":"notstarted-0",
      "serverId":""
    }]);
let started = ref([{
      "label": "started", 
      "name": "In Progress", 
      "description": "Item is in progress", 
      "is_default": true,
      "include":true,
      "id":"started-0",
      "serverId":""
    }]);
let completed = ref([{
      "label": "completed", 
      "name": "Completed", 
      "description": "Item is completed", 
      "is_default": true,
      "include":true,
      "id":"completed-0",
      "serverId":""
    }]);
let cancelled = ref([{
      "label": "cancelled", 
      "name": "Cancelled", 
      "description": "Item is cancelled", 
      "is_default": true,
      "include":true,
      "id":"cancelled-0",
      "serverId":""
    }]);


let name = ref("");
const toast = useToast();
const showPopup = ref(false);
let selectedWorkFlow = ref(null);

onMounted(() => {
  const user_id = localStorage.getItem("workspace")
  teams_id.value = router.currentRoute.value.params.id;
  fetchData();
});

function fetchData() {
  api.get(`teams/${teams_id.value}/workflows`).then((response) => {
    workFlowArray.value = response.data;
  });
}

function closePopUp() {
  showPopup.value = false;
}

function onClickSaveWorkFlow() {
  if(selectedWorkFlow.value != null) {
    editWorkFlow();
  }
  else {
    saveWorkFlow();
  }
}

function saveWorkFlow() {
    let workspace_id = localStorage.getItem("workSpaceID");
    const team_id = router.currentRoute.value.params.id;
    api
    .post("teams/"+team_id+"/workflows",{
      workspace_id,
      name: name.value,
    })
    .then((response) => {
      if (response.status === 201) {
        var x = 0;
        for(x=0;x<backlog.value.length;x++) {
          if(backlog.value[x].include) {
            api
            .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,backlog.value[x])
            .then((response) => {
              console.log(response.status);
            })
          }
        }
        for(x=0;x<notstarted.value.length;x++) {
          if(notstarted.value[x].include) {
            api
            .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,notstarted.value[x])
            .then((response) => {
              console.log(response.status);
            })
          }
        }
        for(x=0;x<started.value.length;x++) {
          if(started.value[x].include) {
            api
            .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,started.value[x])
            .then((response) => {
              console.log(response.status);
            })
          }
        }
        for(x=0;x<completed.value.length;x++) {
          if(completed.value[x].include) {
            api
            .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,completed.value[x])
            .then((response) => {
              console.log(response.status);
            })
          }
        }
        for(x=0;x<cancelled.value.length;x++) {
          if(cancelled.value[x].include) {
            api
            .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,cancelled.value[x])
            .then((response) => {
              console.log(response.status);
            })
          }
        }
        fetchData();
        closePopUp();
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
      if (error) {
        return false;
      }
    });
}

function editWorkFlow() {
    let workspace_id = localStorage.getItem("workSpaceID");
    const team_id = router.currentRoute.value.params.id;
    api
    .put(`teams/${team_id}/workflows/${selectedWorkFlow.value.id}`,{
      workspace_id,
      name: name.value,
    })
    .then((response) => {
      if (response.status === 200) {
        var x = 0;
        for(x=0;x<backlog.value.length;x++) {
          if(backlog.value[x].include) {
            if(backlog.value[x].serverId != "") {
              api
              .put(`teams/${team_id}/workflows/${response.data.id}/statuses/${backlog.value[x].serverId}`,backlog.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
            else {
              api
              .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,backlog.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
          }
        }
        for(x=0;x<notstarted.value.length;x++) {
          if(notstarted.value[x].include) {
            if(notstarted.value[x].serverId != "") {
              api
              .put(`teams/${team_id}/workflows/${response.data.id}/statuses/${notstarted.value[x].serverId}`,notstarted.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
            else {
              api
              .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,notstarted.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
          }
        }
        for(x=0;x<started.value.length;x++) {
          if(started.value[x].include) {
            if(started.value[x].serverId != "") {
              api
              .put(`teams/${team_id}/workflows/${response.data.id}/statuses/${started.value[x].serverId}`,started.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
            else {
              api
              .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,started.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
          }
        }
        for(x=0;x<completed.value.length;x++) {
          if(completed.value[x].include) {
            if(completed.value[x].serverId != "") {
              api
              .put(`teams/${team_id}/workflows/${response.data.id}/statuses/${completed.value[x].serverId}`,completed.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
            else {
              api
              .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,completed.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
          }
        }
        for(x=0;x<cancelled.value.length;x++) {
          if(cancelled.value[x].include) {
            if(cancelled.value[x].serverId != "") {
              api
              .put(`teams/${team_id}/workflows/${response.data.id}/statuses/${cancelled.value[x].serverId}`,cancelled.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
            else {
              api
              .post(`teams/${team_id}/workflows/${response.data.id}/statuses`,cancelled.value[x])
              .then((response) => {
                console.log(response.status);
              })
            }
          }
        }
        fetchData();
        closePopUp();
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
      if (error) {
        return false;
      }
    });
}

function addworkflowitem(parent) {
  var id = "";
  if(parent == 'backlog') {
    id = "backlog-"+backlog.value.length;
    backlog.value.push({
      "label": "backlog", 
      "name": "Name", 
      "description": "Description", 
      "is_default": true,
      "include":true,
      "id":id,
      "serverId":""
    });
  }
  if(parent == 'notstarted') {
    id = "notstarted-"+notstarted.value.length;
    notstarted.value.push({
      "label": "notstarted", 
      "name": "Name", 
      "description": "Description", 
      "is_default": true,
      "include":true,
      "id":id,
      "serverId":""
    });
  }
  if(parent == 'started') {
    id = "started-"+started.value.length;
    started.value.push({
      "label": "started", 
      "name": "Name", 
      "description": "Description", 
      "is_default": true,
      "include":true,
      "id":id,
      "serverId":""
    });
  }
  if(parent == 'completed') {
    id = "completed-"+completed.value.length;
    completed.value.push({
      "label": "completed", 
      "name": "Name", 
      "description": "Description", 
      "is_default": true,
      "include":true,
      "id":id,
      "serverId":""
    });
  }
  if(parent == 'cancelled') {
    id = "cancelled-"+cancelled.value.length;
    cancelled.value.push({
      "label": "cancelled", 
      "name": "Name", 
      "description": "Description", 
      "is_default": true,
      "include":true,
      "id":id,
      "serverId":""
    });
  }
}

function removeWorkFlowItem(parent, index) {
  if(parent == 'backlog') {
    backlog.value.splice(index,1);
  }
  if(parent == 'notstarted') {
    notstarted.value.splice(index,1);
  }
  if(parent == 'started') {
    started.value.splice(index,1);
  }
  if(parent == 'completed') {
    completed.value.splice(index,1);
  }
  if(parent == 'cancelled') {
    cancelled.value.splice(index,1);
  }
}

function onDetailsClicked(item) {
  selectedWorkFlow.value = item;
  populateDataForEdit();
  showPopup.value = true;
}

function onNewWorkFlowClicked() {
  selectedWorkFlow.value = null;
  resetDataForNew();
  showPopup.value = true;
}

function onDeleteClick(item) {
  selectedWorkFlow.value = item;
}

function populateDataForEdit() {
  name.value = selectedWorkFlow.value.name;
  var index = 0;
  var id = "";
  backlog.value = [];
  started.value = [];
  notstarted.value = [];
  completed.value = [];
  cancelled.value = [];
  for(index=0;index<selectedWorkFlow.value.statuses.length;index++) {
    let tempStatusArray = selectedWorkFlow.value.statuses[index];
    if(tempStatusArray.label == "backlog") {
        id = "backlog-"+backlog.value.length;
        backlog.value.push({
        "label": "backlog", 
        "name": tempStatusArray.name,
        "description": tempStatusArray.description, 
        "is_default": tempStatusArray.is_default,
        "include":true,
        "id":id,
        "serverId":tempStatusArray.id
      });
    }
    if(tempStatusArray.label == "notstarted") {
        id = "notstarted-"+notstarted.value.length;
        notstarted.value.push({
        "label": "notstarted", 
        "name": tempStatusArray.name,
        "description": tempStatusArray.description, 
        "is_default": tempStatusArray.is_default,
        "include":true,
        "id":id,
        "serverId":tempStatusArray.id
      });
    }
    if(tempStatusArray.label == "started") {
        id = "started-"+started.value.length;
        started.value.push({
        "label": "started", 
        "name": tempStatusArray.name,
        "description": tempStatusArray.description, 
        "is_default": tempStatusArray.is_default,
        "include":true,
        "id":id,
        "serverId":tempStatusArray.id
      });
    }
    if(tempStatusArray.label == "completed") {
        id = "completed-"+completed.value.length;
        completed.value.push({
        "label": "completed", 
        "name": tempStatusArray.name,
        "description": tempStatusArray.description, 
        "is_default": tempStatusArray.is_default,
        "include":true,
        "id":id,
        "serverId":tempStatusArray.id
      });
    }
    if(tempStatusArray.label == "cancelled") {
        id = "cancelled-"+cancelled.value.length;
        cancelled.value.push({
        "label": "cancelled", 
        "name": tempStatusArray.name,
        "description": tempStatusArray.description, 
        "is_default": tempStatusArray.is_default,
        "include":true,
        "id":id,
        "serverId":tempStatusArray.id
      });
    }
  }
}
function resetDataForNew() {
  name.value = "";
  backlog.value = [];
  started.value = [];
  notstarted.value = [];
  completed.value = [];
  cancelled.value = [];
  var id = "";
  if(backlog.value.length <= 0) {
    id = "backlog-"+backlog.value.length;
    backlog.value.push({
      "label": "backlog", 
      "name": "Backlog", 
      "description": "Item is in Backlog", 
      "is_default": true,
      "include":true,
      "id":id
    });
  }
  if(notstarted.value.length <= 0) {
    id = "notstarted-"+notstarted.value.length;
    notstarted.value.push({
      "label": "notstarted", 
      "name": "To Do", 
      "description": "Item is in To Do", 
      "is_default": true,
      "include":true,
      "id":id
    });
  }
  if(started.value.length <= 0) {
    id = "started-"+started.value.length;
    started.value.push({
      "label": "started", 
      "name": "In Progress", 
      "description": "Item is in progress", 
      "is_default": true,
      "include":true,
      "id":id
    });
  }
  if(completed.value.length <= 0) {
    id = "completed-"+started.value.length;
    completed.value.push({
      "label": "completed", 
      "name": "Completed", 
      "description": "Item completed", 
      "is_default": true,
      "include":true,
      "id":id
    });
  }
  if(cancelled.value.length <= 0) {
    id = "cancelled-"+started.value.length;
    cancelled.value.push({
      "label": "cancelled", 
      "name": "Cancelled", 
      "description": "Item archived",
      "is_default": true,
      "include":true,
      "id":id
    });
  }
}

function onDeleteClickFromModal() {
  const team_id = router.currentRoute.value.params.id;
  api.delete(`teams/${team_id}/workflows/${selectedWorkFlow.value.id}`).then((response) => {
    let btn = document.getElementById("workFlowModalCancelBtn");
    btn.click();
    fetchData();
    toast("Your workflow has been deleted.", {
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
  <div class="px-3">
    <div class="py-4">
      <div class="d-flex justify-content-between">
        <div class="w-25">
          <InputField placeholder="Search" type="text" :svgIcon="true"></InputField>
        </div>
        <!-- <router-link to="/invite-members" class="text-decoration-none"> -->
          <button class="custom-primary-btn d-flex align-items-center" type="button" @click="onNewWorkFlowClicked">
            <strong>Add New Workflow</strong>
          </button>
        <!-- </router-link> -->
      </div>
    </div>

    <!-- popup -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup">
        <!-- Popup content -->
        <div class="icons position-relative d-flex align-items-center mb-3">
          <span class="mr-3">
              <ShareIcon size="32px"/>
          </span>
          <h3 class="popup-heading">New Workflow</h3>
        </div>

        <div class="icons position-relative d-flex align-items-center mb-3">
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3D4046" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.26 15.5302L9.73999 12.0002L13.26 8.47021" stroke="#3D4046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>              
        </span>
        <p class="popup-subheading">Use another teams workflow</p>
      </div>
       
      <div class="mb-1">
      <label for="workflowName">Workflow Name</label>
        <div class="row mb-2">
          <div class="col-md-6 input1">
            <input class="form-control workflow" v-model="name" type="text" placeholder="Enter">
          </div>
          <div class="input2">
          <div class="form-group icons position-relative ">
            <span class="share-icon">
              <ShareIcon />
            </span>
            <input class="form-control workflow" type="button">
          </div>
          </div>
        </div>   
      </div>

        <div class="mb-3">
          <label for="Backlog" id="backlog" class="myLabel">Backlog</label>
          <AddCircleIcon
          class="cursor"
          @click="addworkflowitem('backlog')"
          />
          
          <div class="mt-1" v-for="(item, index) in backlog" :key="index">
            <div class="inputBorder d-flex align-items-center">
                <div class="workflow-icon1">
                  <MenuIcon />
                </div>
            
                <div class="workflow-icon1">
                  <CheckBoxInput
                      :id="item.id"
                      v-model="item.include"
                  >
                  </CheckBoxInput>
                </div>
            
                <div class="col-md-3">
                  <input class="field" type="text" placeholder="Backlog" v-model="item.name">
                </div>
                <div class="col-md-6">
                  <input class="field" type="text" placeholder="| Description of the status" v-model="item.description">
                </div>
            
                <div class="workflow-icon1">
                  <DeleteIcon v-if="index != 0"
                  @click="removeWorkFlowItem('backlog',index)"
                   />
                </div>
            </div>
          </div>

        </div>

        <div class="mb-3">
          <label for="notstarted" id="notstarted" class="myLabel">Not Started</label>
          <AddCircleIcon
          class="cursor"
          @click="addworkflowitem('notstarted')"
          />
          <div class="mt-1" v-for="(item, index) in notstarted" :key="index">
            <div class="inputBorder d-flex align-items-center">
                <div class="workflow-icon1">
                  <MenuIcon />
                </div>
            
                <div class="workflow-icon1">
                  <CheckBoxInput
                      :id="item.id"
                      v-model="item.include"
                  >
                  </CheckBoxInput>
                </div>
            
                <div class="col-md-3">
                  <input class="field" type="text" placeholder="Not Started" v-model="item.name">
                </div>
                <div class="col-md-6">
                  <input class="field" type="text" placeholder="| Description of the status" v-model="item.description">
                </div>
            
                <div class="workflow-icon1">
                  <DeleteIcon v-if="index != 0"
                  @click="removeWorkFlowItem('notstarted',index)"
                   />
                </div>
            </div>
          </div>
        </div>        

        <div class="mb-3">
          <label for="started" id="started" class="myLabel">Started</label>
          <AddCircleIcon
          class="cursor"
          @click="addworkflowitem('started')"
          />
        
          <div class="mt-1" v-for="(item, index) in started" :key="index">
            <div class="inputBorder d-flex align-items-center">
                <div class="workflow-icon1">
                  <MenuIcon />
                </div>
            
                <div class="workflow-icon1">
                  <CheckBoxInput
                      :id="item.id"
                      v-model="item.include"
                  >
                  </CheckBoxInput>
                </div>
            
                <div class="col-md-3">
                  <input class="field" type="text" placeholder="Started" v-model="item.name">
                </div>
                <div class="col-md-6">
                  <input class="field" type="text" placeholder="| Description of the status" v-model="item.description">
                </div>
            
                <div class="workflow-icon1">
                  <DeleteIcon v-if="index != 0"
                  @click="removeWorkFlowItem('started',index)"
                   />
                </div>
            </div>
          </div>

        </div>
            
        <div class="mb-3">
          <label for="completed" id="completed" class="myLabel">Completed</label>
          <AddCircleIcon
          class="cursor"
          @click="addworkflowitem('completed')"
          />
          <div class="mt-1" v-for="(item, index) in completed" :key="index">
            <div class="inputBorder d-flex align-items-center">
                <div class="workflow-icon1">
                  <MenuIcon />
                </div>
            
                <div class="workflow-icon1">
                  <CheckBoxInput
                      :id="item.id"
                      v-model="item.include"
                  >
                  </CheckBoxInput>
                </div>
            
                <div class="col-md-3">
                  <input class="field" type="text" placeholder="Completed" v-model="item.name">
                </div>
                <div class="col-md-6">
                  <input class="field" type="text" placeholder="| Description of the status" v-model="item.description">
                </div>
            
                <div class="workflow-icon1">
                  <DeleteIcon v-if="index != 0"
                  @click="removeWorkFlowItem('completed',index)"
                   />
                </div>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="cancelled" id="cancelled" class="myLabel">Cancelled</label>
          <AddCircleIcon
          class="cursor"
          @click="addworkflowitem('cancelled')"
          />
        
          <div class="mt-1" v-for="(item, index) in cancelled" :key="index">
            <div class="inputBorder d-flex align-items-center">
                <div class="workflow-icon1">
                  <MenuIcon />
                </div>
            
                <div class="workflow-icon1">
                  <CheckBoxInput
                      :id="item.id"
                      v-model="item.include"
                  >
                  </CheckBoxInput>
                </div>
            
                <div class="col-md-3">
                  <input class="field" type="text" placeholder="Cancelled" v-model="item.name">
                </div>
                <div class="col-md-6">
                  <input class="field" type="text" placeholder="| Description of the status" v-model="item.description">
                </div>
            
                <div class="workflow-icon1">
                  <DeleteIcon v-if="index != 0"
                  @click="removeWorkFlowItem('cancelled',index)"
                   />
                </div>
            </div>
          </div>
        </div>
                    
        
          <div class="row">
            <div class="col-12">
              <div class="d-flex justify-content-end mt-3">
                <button
                  type="button"
                  class="custom-secondary-btn me-4 "
                  @click="closePopUp"
                >
                  Close
                </button>
                <button class="custom-primary-btn" type="button" @click="onClickSaveWorkFlow">
                  Create
                </button>
                  
              </div>
            </div>
          </div>
          
      </div>
    </div>

    <div class="tab-wrapper p-3">
      <div class="table-responsive">
        <table class="table table-borderless align-middle text-center">
          <thead class="thead-views">
            <tr class="head-row-view text-center align-middle">
              <th scope="col">Workflow Name</th>
              <th scope="col">Used on issue Type</th>
              <th scope="col">Location</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody class="tab-body">
            <tr class="row-view" v-for="(item, index) in workFlowArray" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ "User Story" }}</td>
              <td>{{ "Campbell" }}</td>
              <td>
                <div class="cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="../../../assets/images/actions-icon.svg" />
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" @click="onDetailsClicked(item)">Details</a>
                    </li>
                    <li class="text-darkgray">
                      <a class="dropdown-item fs-14px" data-bs-toggle="modal" @click="onDeleteClick(item)" data-bs-target="#workflowdeleteModal">Remove from team</a>
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
  <div class="modal fade" id="workflowdeleteModal" tabindex="-1" aria-labelledby="workflowdeleteModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Alert</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">Are you sure you want to delete this workflow?</div>
        <div class="modal-footer">
          <button type="button" class="custom-secondary-btn" data-bs-dismiss="modal" id="workFlowModalCancelBtn">
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

  .thead-views {
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

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto; 
}

.cursor {
  cursor: pointer;
}

.popup {
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 45%; 
  max-height: 100vh; 
  overflow-y: auto;
  /* Centering the popup */
  position: fixed; /* Use fixed positioning */
  top: 50%; /* Move the top edge to the vertical center */
  left: 50%; /* Move the left edge to the horizontal center */
  transform: translate(-50%, -50%); /* Center the element */
}
.popup-heading {
  font-size: 2rem; 
  //margin-bottom: 20px;
  display: inline-block;
  margin: 0px;
  line-height: 42px;
  padding-left: 6px;
}

.popup-subheading {
  font-size: 1.3rem;
  margin: 0px;
  padding-left: 6px;
  font-weight: bold;
}
.inputBorder {
  width: 100%;
  border: 1px solid #c4c4ca;
  border-radius: 8px;
}
/*[class^="col-md"] {
  padding: 0;
}*/
.field {
  padding:8px 4px;
  border:none;
  font-size: 16px;
}
.field:focus {
  border: none; /* Remove the border on focus */
  outline: none; /* Remove the outline on focus */
}
.workflow {
  border-radius: 8px;
  padding: 10px 14px;
  //margin-bottom: 10px;
}
.input1 {
  padding: 0px;
  margin-right:11rem;
}
.input2 {
  padding-right: 0px;
  width: 14%;
}
.custom-margin {
  margin-bottom: 5px;
}
.share-icon {
  padding: 11px 16px;
  min-width: 40px;
  position: absolute;
  //text-align: center;
}
.workflow-icon1 {
  padding:8px 0px 8px 8px;
  min-width: 40px;
  //position:absolute;
}
.myLabel {
  margin-right: 5px;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb{
  background-color: #888; /* Color of the scrollbar thumb */
  border-radius: 4px; /* Rounded corners of the scrollbar thumb */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Color of the scrollbar thumb on hover */
}
::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Color of the scrollbar track */
}
</style>
