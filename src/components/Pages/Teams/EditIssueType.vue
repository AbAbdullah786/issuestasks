<script setup>
import AppHeader from '@/components/AppHeader.vue';
import ShareIcon from "@/components/Icons/ShareIcon.vue";
import CupIcon from "@/components/Icons/CupIcon.vue";
import CheckBoxInput from '@/components/CheckBoxInput.vue';
import IssueTypeTabComponent from './IssueTypeTabComponent.vue';
import api from "../../../api";
import { useToast } from "vue-toastification";
import SuccessIcon from "../../ToastIcons/SuccessIcon";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
var route = useRouter();
var toast = useToast();


const props = defineProps({
    selectedIssueType: null,
})


const selectedItem = ref(props.selectedIssueType);
const include_sections = ref([]);
const include_fields = ref(selectedItem.value.include_fields);
//Prepare Additional Fields for our view
const final_fields_array = [];
if(selectedItem.value.fields != null) {
    const additional = selectedItem.value.fields;
    for(var x=0;x<additional.length;x++) {
        final_fields_array.push({
            counter:"",
            index:additional[x][Object.keys(additional[x])[0]],
        });
    }
}
const additional_fields = ref(selectedItem.value.fields == null ? [] : final_fields_array);
let data = ref({
    id: selectedItem.value.id,
    name: selectedItem.value.name,
    text_cases: selectedItem.value.include_sections.indexOf('text_cases') !== -1 ? true : false,
    peer_review: selectedItem.value.include_sections.indexOf('peer_review') !== -1 ? true : false,
    assignee: selectedItem.value.include_fields.indexOf('assignee') !== -1 ? true : false,
    esitmate: selectedItem.value.include_fields.indexOf('esitmate') !== -1 ? true : false,
    creator: selectedItem.value.include_fields.indexOf('creator') !== -1 ? true : false,
    labels: selectedItem.value.include_fields.indexOf('labels') !== -1 ? true : false,

})
const isNewIssueTypeVisible = ref(true)

onMounted(() => {
    addClassesToMoreFields();
});


function closeNewIssueType() {
    selectedItem.value = null;
}
function addClassesToMoreFields() {
    const moreFields = ['epic_link','milestone','git_branch','priority','git_commit','project','line_separator','time_tracking'];
    for(var field of moreFields) {
        if(include_fields.value.indexOf(field) !== -1) {
            console.log("in if");
            var element = document.getElementById(field);
            element.classList.toggle('button-seleted');
        }
    }
}
function includeMoreFields(idstring) {
    var element = document.getElementById(idstring);
    element.classList.toggle('button-seleted');
    if(include_fields.value.indexOf(idstring) !== -1) {
        include_fields.value = include_fields.value.filter(e => e !== idstring);
    }
    else {
        include_fields.value.push(idstring);
    }
}

function addNewField() {
    const counter = additional_fields.value.length;
    additional_fields.value.push({
        counter:''
    });
}

function removeAdditionalField(index) {
    additional_fields.value.splice(index,1);
}

function saveIssueType() {
    let workspace_id = localStorage.getItem("workSpaceID");
    if(data.value.text_cases) {
        include_sections.value.push('text_cases');
    }
    if(data.value.peer_review) {
        include_sections.value.push('peer_review');
    }
    if(data.value.assignee) {
        if(include_fields.value.indexOf('assignee') === -1) {
            include_fields.value.push('assignee');
        }
    }
    else {
        include_fields.value = include_fields.value.filter(e => e !== 'assignee');
    }
    if(data.value.esitmate) {
        if(include_fields.value.indexOf('esitmate') === -1) {
            include_fields.value.push('esitmate');
        }
    }
    else {
        include_fields.value = include_fields.value.filter(e => e !== 'esitmate');
    }
    if(data.value.creator) {
        if(include_fields.value.indexOf('creator') === -1) {
            include_fields.value.push('creator');
        }
    }
    else {
        include_fields.value = include_fields.value.filter(e => e !== 'creator');
    }
    if(data.value.labels) {
        if(include_fields.value.indexOf('labels') === -1) {
            include_fields.value.push('labels');
        }
    }
    else {
        include_fields.value = include_fields.value.filter(e => e !== 'labels');
    }
    //Manage Additional Fields
    var additional_fields_to_send = [];
    for(var x=0; x<additional_fields.value.length;x++ ){
        const slug = additional_fields.value[x]['index'].replaceAll(' ','-').toLowerCase();
        const tempDictionary = {};
        tempDictionary[slug] = additional_fields.value[x]['index'];
        additional_fields_to_send.push(tempDictionary);
    }
    const team_id = route.currentRoute.value.params.id;
    api
    .put(`teams/${team_id}/issuetypes/${selectedItem.value.id}`,{
      workspace_id,
      icon: 'CupIcon',
      name: data.value.name,
      include_sections: include_sections.value,
      team_id: team_id,
      include_fields: include_fields.value,
      fields: additional_fields_to_send
    })
    .then((response) => {
      if (response.status === 200) {
        closeNewIssueType();
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

</script>
<template>
    <!-- <AppHeader heading="Teams" breadCrumbs="Edit Issues Task / Issue Types / New Issue Type" /> -->
    <div v-if="selectedItem == null">
        <IssueTypeTabComponent/>
    </div>
    <div class="px-3" v-if="selectedItem != null">
        <div style="margin-top: 32px !important">

            <div class="mb-4">
                <h5>Edit Issue Type</h5>
                <div class="row align-item-center">
                    
                    <div class="col-md-1 p-0">
                        <label for="">Icon</label>
                        <div class="form-group text-center">
                            <div class="iconBorder">
                                <div class="cupicon">
                                    <CupIcon></CupIcon>
                                </div>
                            </div>
                            <!-- <input type="button" class="input-field"> -->
                        </div>
                    </div>
                    <div class="col-md-10 p-0">
                        <label for="">Issue Type Name</label>
                        <input type="text" class="input-field" placeholder="Enter"
                        style="width: 320px; height: 46px" v-model="data.name"
                        >
                    </div>
                    <div class="col-md-1 pd-0">
                        <label for=""></label>
                        <div class="form-group text-center">
                            <div class="iconBorder"
                            style="padding: 10px 13px !important">
                                <ShareIcon />
                            </div>
                            <!-- <input class="input-field" type="button"> -->
                        </div>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <div class="col-md-3">
                    <h3>Include Sections</h3>

                    <div class="d-flex col mt-4" style="gap: 8px">
                        <CheckBoxInput
                        id="text_cases"
                        v-model="data.text_cases"
                        >
                        </CheckBoxInput>
                        <label for="">Text Cases</label>     
                    </div>
                    <div class="d-flex col mt-2" style="gap: 8px;">
                        <CheckBoxInput
                            id="peer_review"
                            v-model="data.peer_review"
                        >    
                        </CheckBoxInput>
                        <label for="">Peer Review</label>
                    </div>

                </div>
            </div>

            <div class="mb-2">
                <div class="d-flex justify-content-between">
                    <h3>Include Fields</h3>
                    <button
                    class="custom-primary-btn d-flex align-items-center"
                    type="button"
                    @click="addNewField"
                  >
                    <strong>New Field +</strong>
                  </button>
                </div>
            </div>

            <div class="mb-2">
                <label for="">This will be the results after you drag the items to the box.</label>
            </div>

            <div class="mb-4">
                <div class="d-flex justify-content-between">

                    <div class="tab-wrapper col-md-5 p-3">
                        <table class="table table-borderless align-middle">
                            <tr class="row-view">
                                <td><h5>Assignee</h5></td>
                                <td>
                                    <div class="d-flex justify-content-end"
                                    style="gap: 8px;">
                                        <CheckBoxInput
                                            id="assignee"
                                            v-model="data.assignee"
                                        >
                                        </CheckBoxInput>
                                        <label for="">Show on New Issue screen</label>
                                        </div>
                                </td>
                            </tr>
                            <tr class="row-view">
                                <td><h5>Estimate</h5></td>
                                <td>
                                    <div class="d-flex justify-content-end"
                                    style="gap: 8px;">
                                        <CheckBoxInput
                                            id="estimate"
                                            v-model="data.esitmate"
                                        >
                                        </CheckBoxInput>
                                        <label for="">Show on New Issue screen</label>
                                    </div>
                                </td>
                            </tr>
                            <tr class="row-view">
                                <td><h5>Creator</h5></td>
                                <td>
                                    <div class="d-flex col justify-content-end"
                                    style="gap: 8px;">
                                        <CheckBoxInput
                                            id="creator"
                                            v-model="data.creator"
                                        >
                                        </CheckBoxInput>
                                        <label for="">Show on New Issue screen</label>
                                        </div>
                                </td>
                            </tr>
                            <tr class="row-view">
                                <td><h5>Labels</h5></td>
                                <td>
                                    <div class="d-flex col justify-content-end"
                                    style="gap: 8px;">
                                        <CheckBoxInput
                                            id="labels"
                                            v-model="data.labels"
                                        >
                                        </CheckBoxInput>
                                        <label for="">Show on New Issue screen</label>
                                        </div>
                                </td>
                            </tr>
                        </table>
                        <table class="table table-borderless align-middle" id="additional_fields">
                            <thead>
                                <th>Additional Fields</th>
                            </thead>
                            <tbody>
                                <tr class="row-view" v-for="(item, index) in additional_fields" :key="index">
                                <td>
                                    <input type="text" v-model="item.index" placeholder="Field Name" />
                                    <span class="info-span" for="">* Will Show on New Issue screen</span>
                                </td>
                                <td>
                                    <button
                                    id="epic_link"
                                    type="button"
                                    class="custom-secondary-btn me-4"
                                    @click="removeAdditionalField(index)"
                                    >
                                    Remove
                                    </button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="tab-wrapper col-md-5 p-3">
                        <div class="d-flex mb-3">
                            <button
                            id="epic_link"
                            type="button"
                            class="custom-secondary-btn me-4 custom-button"
                            @click="includeMoreFields('epic_link')"
                            >
                            Epic link
                            </button>
                            <button
                            id="milestone"
                            type="button"
                            class="custom-secondary-btn me-4 custom-button"
                            @click="includeMoreFields('milestone')"
                            >
                            Milestone
                            </button>
                        </div>
                        <div class="d-flex mb-3">
                            <button
                            id="git_branch"
                            type="button"
                            class="custom-secondary-btn me-4 custom-button"
                            @click="includeMoreFields('git_branch')"
                            >
                            Git Branch
                            </button>
                            <button
                            id="priority"
                            type="button"
                            class="custom-secondary-btn me-4 custom-button"
                            @click="includeMoreFields('priority')"
                            >
                            Priority
                            </button>
                        </div>
                        <div class="d-flex mb-3">
                            <button
                            id="git_commit"
                            type="button"
                            class="custom-secondary-btn me-4 custom-button"
                            @click="includeMoreFields('git_commit')"
                            >
                            Git Commit
                            </button>
                            <button
                            id="project"
                            type="button"
                            class="custom-secondary-btn me-4 custom-button"
                            @click="includeMoreFields('project')"
                            >
                            Project
                            </button>
                        </div>
                        <div class="d-flex mb-3">
                            <button
                            id="line_separator"
                            type="button"
                            class="custom-secondary-btn me-4 custom-button"
                            @click="includeMoreFields('line_separator')"
                            >
                            Line Separator
                            </button>
                            <button
                            id="time_tracking"
                            type="button"
                            class="custom-secondary-btn me-4 custom-button"
                            @click="includeMoreFields('time_tracking')"
                            >
                            Time Tracking
                            </button>
                        </div>

                    </div>

            </div>

            </div>
            
            <div class="row">
                <div class="d-flex mt-5 mb-4">
                    <button
                  type="button"
                  class="custom-secondary-btn me-4 "
                  @click="closeNewIssueType"
                >
                  Close
                </button>
                <button 
                    class="custom-primary-btn" 
                    type="button"
                    @click="saveIssueType"
                    >
                  Save
                </button>
                </div>
            </div>
            
        </div>
    </div>    
</template>

<style scoped>

h3 {
    font-size: 24px;
}
.table h5 {
    margin: 0px;
}

.info-span {
    font-size: 11px;
    display: block;
    text-align: left;
}

.custom {
    background-color: #3D40461A;
    border-radius: 8px;
    padding: 8px 23px;
}
.iconBorder {
    border: 1px solid #c4c4ca; 
    border-radius: 8px; 
    padding:6px 13px
}
.cupicon {
    width: 32px;
    height: 32px;
    background: linear-gradient(to bottom, #FFFFFF, #D0D5DD);
    border-radius: 8px;
    display: inline-block;
    vertical-align: middle;
    margin: 0px;
    padding: 5px 0px;
  }
  .input-field {
    border: 1px solid #c4c4ca;
  }
  .custom-button {
    border: none;
    color: #000;
    font-weight: normal;
  }
  .button-seleted {
    background-color: #AAAAAA;
  }
</style>
<script>
/*export default {
 props: ['username']
}*/
</script>