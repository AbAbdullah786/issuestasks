<script setup>
import AppHeader from "@/components/AppHeader.vue";
import InputField from "@/components/Fields/InputField";
import SprintIcon from "@/components/Icons/SprintIcon.vue";
import draggable from "vuedraggable";
import CupIcon from "@/components/Icons/CupIcon.vue";
import NewIssueType from "./NewIssueType.vue";
import EditIssueType from "./EditIssueType.vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import DeleteIcon from "../../ToastIcons/DeleteIcon";
import { onMounted, ref, } from "vue";
import api from "../../../api";
var router = useRouter();
const data = ref([]);
const selectedIssueType = ref(null);
const selectedIssueTypeForEdit = ref(null);
const toast = useToast();

const isNewIssueTypeVisible = ref(false);
const toggleNewIssueType = () => {
  isNewIssueTypeVisible.value = true;
  selectedIssueTypeForEdit.value = null;
}

onMounted(() => {
  fetchData();
});

function fetchData() {
  var team_id = router.currentRoute.value.params.id;
  api
    .get("teams/"+team_id+"/issuetypes")
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

function onEditClick(item) {
  isNewIssueTypeVisible.value = false;
  selectedIssueTypeForEdit.value = item;

}

function onDeleteClick(item) {
  selectedIssueType.value = item;
}

function onDeleteClickFromModal() {
  const team_id = router.currentRoute.value.params.id;
  api.delete(`teams/${team_id}/issuetypes/${selectedIssueType.value.id}`).then((response) => {
    let btn = document.getElementById("teamsModalCancelBtn");
    btn.click();
    fetchData();
    toast("Your issue type has been deleted.", {
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
  
    <div v-if="isNewIssueTypeVisible">
      <NewIssueType :v-model="isNewIssueTypeVisible"/>
    </div>
    <div v-if="selectedIssueTypeForEdit != null">
      <EditIssueType :selectedIssueType="selectedIssueTypeForEdit"/>
    </div>

  <div v-if="!isNewIssueTypeVisible && selectedIssueTypeForEdit == null">
    <div class="py-4">
      <div class="d-flex justify-content-between">
        <div class="w-25">
          <InputField
            placeholder="Search"
            type="text"
            :svgIcon="true"
          ></InputField>
        </div>
        <!-- <router-link to="/new-issue-type" class="text-decoration-none"> -->
          <button
            class="custom-primary-btn d-flex align-items-center"
            type="button"
            @click="toggleNewIssueType"
          >
            <strong>New Issue Type</strong>
        </button>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="tab-wrapper p-3">
      <div class="table-responsive">
        <table class="table table-borderless align-middle text-center">
          <thead class="thead-view">
            <tr class="head-row-view text-center align-middle">
              <th scope="col"></th>
              <th scope="col">Issue Type Name</th>
              <th scope="col">Owner</th>
              <th scope="col">Location</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <draggable
            v-model="data"
            group="people"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
            tag="tbody"
            class="tab-body"
          >
            <template #item="{ element }">
              <tr class="row-view">
                <td>
                  <img src="../../../assets/images/drag-menu.svg" />
                </td>
                <td>
                  <div class="iconcontainer">
                      <CupIcon></CupIcon>
                    </div>
                  <span>{{ element.name }}</span>
                </td>
                <td>{{ element.creator.name }}</td>
                <td>Test Location</td>
                <td>
                  <div
                    class="cursor-pointer"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="../../../assets/images/actions-icon.svg" />
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li class="text-darkgray">
                        <a class="dropdown-item fs-14px" @click="onEditClick(element)"
                          >Edit</a
                        >
                      </li>
                      <li class="text-darkgray">
                        <a class="dropdown-item fs-14px" @click="onEditClick(element)">Details</a>
                      </li>
                      <li class="text-darkgray">
                        <a class="dropdown-item fs-14px" data-bs-toggle="modal" @click="onDeleteClick(element)" data-bs-target="#exampleModal">Delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </template>
          </draggable>
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
        <div class="modal-body">Are you sure you want to delete this issue type?</div>
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

.iconcontainer {
  width: 32px;
  background: linear-gradient(to bottom, #FFFFFF, #D0D5DD);
  border-radius: 8px;
  display: inline-block;
  /*vertical-align: middle;*/
  margin-right: 8px;
  padding: 5px 0px;
  text-align: center;
}

.row-view span {
  text-align: center;
  vertical-align: middle;
}
</style>
