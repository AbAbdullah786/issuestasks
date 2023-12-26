<script setup>
import CupIcon from '@/components/Icons/CupIcon.vue';
import AddCircleIconVue from '@/components/Icons/AddCircleIcon.vue';
import CalendarIcon from '@/components/Icons/CalendarIcon.vue';
import ClockIcon from '@/components/Icons/ClockIcon.vue';
import EditIcon from '@/components/Icons/EditIcon.vue';
import InputField from '@/components/Fields/InputField.vue';
import CheckBoxInput from '@/components/CheckBoxInput.vue';
import { onMounted } from 'vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import api from '@/api';
// import DatePicker from "vue-datepicker";
// import "vue-datepicker";
// import 'bootstrap-datepicker';
//import DatePicker from '@/components/Pages/Project/DatePicker.vue';
// const props = defineProps(['showPopup']);
const props = defineProps(['fetchData'])
const route = useRoute()
const emits = defineEmits(['update:showPopup']);

const teamData = ref([]);
const project_id = ref(null);
const name = ref('')
const slug = ref('')
const description = ref('')
const leader = ref(null);
let selectedMembers = ref([]);
const milestones = ref([]);
const addMilestones = ref(false);
const newMilestone = ref({
  description: '',
  date: '',
})
const editIndex = ref(-1);

onMounted(() => {
  const teamId = route.params.id;
  getTeamData(teamId);
})

function getTeamData(teamId) {
  api
    .get(`teams/${teamId}`)
    .then((response) => {
      if (response.status === 200) {
        teamData.value = response.data;
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
}

function storeMilestone() {
  if (newMilestone.value.description) {
    if (editIndex.value != -1) {
      milestones.value[editIndex.value] = { ...newMilestone.value }
      editIndex.value = -1;
    }
    else {
      // date require milestones api testing
      newMilestone.value.date = '06-May-2024';
      milestones.value.push({ ...newMilestone.value });
    }

    newMilestone.value.description = '';
    newMilestone.value.date = '';
    addMilestones.value = true;
  }
}
function cancelMilestone() {
  newMilestone.value.description = '';
  newMilestone.value.date = '';
  addMilestones.value = false;
}
function editMilestone(index) {
  editIndex.value = index;
  newMilestone.value.description = milestones.value[index].description;
  newMilestone.value.date = milestones.value[index].date;
  // milestones.value.splice(index,1);
  addMilestones.value = false;
}

function closePopup() {
  emits('update:showPopup', false);
}
function createProject(teamId) {
  if (!name.value || !slug.value) {
    console.log(name.value)
    return;
  }

  api
    .post(`teams/${teamId}/projects`, {
      name: name.value,
      slug: slug.value,
      lead_by: leader.value,
      description: description.value,
    })
    .then((response) => {
      if (response.status === 201) {
        project_id.value = response.data.id;
        console.log(response.data);

        if (selectedMembers.value && selectedMembers.value.length > 0) {
          const addmember = selectedMembers.value;
          api
            .put(`teams/${teamId}/projects/${project_id.value}/members`, {
              members: addmember,
            })
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data)
              }
              else {
                console.log('else part')
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }

        if (milestones.value && milestones.value.length > 0) {
          for (const milestone of milestones.value) {
            api
              .post(`teams/${teamId}/projects/${project_id.value}/milestones`, {
                description: milestone.description,
                date: milestone.date,
              })
              .then((response) => {
                if (response.status === 200) {
                  console.log(response.data)
                }
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }

        closePopup();
        props.fetchData(teamId);
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const isDropdownOpenLead = ref(false);
const isDropdownOpenMember = ref(false);

const toggleDropdownLead = () => {
  isDropdownOpenLead.value = !isDropdownOpenLead.value;
  isDropdownOpenMember.value = false;
};
const toggleDropdownMember = () => {
  isDropdownOpenMember.value = !isDropdownOpenMember.value;
  isDropdownOpenLead.value = false;
};

function selectLeader(leaderId) {
  leader.value = leader.value === leaderId ? null : leaderId;
}
function toggleMember(index) {
  if (selectedMembers.value.includes(index)) {
    selectedMembers.value = selectedMembers.value.filter((i) => i !== index);
  } else {
    selectedMembers.value.push(index);
  }
}
</script>

<template>
  <div class="popup-overlay">
    <div class="popup">
      <div class="d-flex align-items-center pt-3 mb-4">
        <h2 class="m-0">{{ teamData.name }}</h2>
        <div style="width: 1px; height: 32px; background-color: #2a2c32; margin: 0px 10px;">
        </div>
        <p style="margin: 0; color: #7b8497; font-size: 20px; font-weight: 500">
          New Project
        </p>

      </div>

      <div class="mb-3">
        <div class="row align-item-center">
          <div class="d-flex justify-content-between p-0" style="gap: 10px;">

            <div class="w-10 p-0">
              <label for="">Icon</label>
              <div class="form-group text-center">
                <div class="iconBorder">
                  <div class="cupicon">
                    <CupIcon></CupIcon>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-75 p-0">
              <label for="">Project Name</label>
              <input v-model="name" type="text" class="input-field" placeholder="Name" style="height: 46px; width: 100%">
            </div>
            <div class="w-15 p-0">
              <label for="">Issue Identifier</label>
              <div class="d-flex align-items-center position-relative">
                <input v-model="slug" class="input-field" type="text" placeholder="AB-123"
                  style="height: 46px; padding-right:25px">
                <div class="iconContainer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1052_30462)">
                      <path
                        d="M7.99966 0C3.58197 0 0 3.58197 0 7.99966C0 12.4174 3.58197 16 7.99966 16C12.4174 16 16 12.4174 16 7.99966C16 3.58197 12.4174 0 7.99966 0ZM9.66502 12.3984C9.25325 12.5609 8.92546 12.6842 8.67962 12.7695C8.43445 12.8549 8.14933 12.8975 7.82493 12.8975C7.32648 12.8975 6.93841 12.7756 6.6621 12.5325C6.38578 12.2894 6.2483 11.9812 6.2483 11.6067C6.2483 11.4611 6.25845 11.3121 6.27877 11.1604C6.29977 11.0087 6.33295 10.838 6.37833 10.6463L6.89371 8.8259C6.93909 8.65117 6.97837 8.48525 7.00952 8.33084C7.04068 8.17507 7.05558 8.03217 7.05558 7.90214C7.05558 7.67052 7.00749 7.50798 6.912 7.41655C6.81515 7.32512 6.63297 7.28042 6.3614 7.28042C6.22866 7.28042 6.09185 7.30006 5.95166 7.34138C5.81283 7.38404 5.69228 7.42265 5.5934 7.46057L5.72952 6.89981C6.06679 6.76233 6.38984 6.64449 6.69799 6.54696C7.00614 6.44808 7.29735 6.39932 7.57164 6.39932C8.06671 6.39932 8.44868 6.51987 8.71754 6.75826C8.98506 6.99733 9.11983 7.30819 9.11983 7.69016C9.11983 7.7694 9.11035 7.90891 9.09206 8.10802C9.07378 8.30781 9.03924 8.48999 8.98912 8.65727L8.47644 10.4723C8.43445 10.6179 8.39721 10.7845 8.36334 10.9708C8.33016 11.157 8.3139 11.2992 8.3139 11.3947C8.3139 11.6358 8.36741 11.8004 8.47577 11.8877C8.58277 11.9751 8.77037 12.0191 9.03585 12.0191C9.16114 12.0191 9.30133 11.9968 9.45981 11.9534C9.61693 11.9101 9.73071 11.8715 9.8025 11.8383L9.66502 12.3984ZM9.57426 5.03128C9.3352 5.25342 9.04737 5.36449 8.71077 5.36449C8.37486 5.36449 8.08499 5.25342 7.84389 5.03128C7.60415 4.80914 7.48292 4.53892 7.48292 4.22332C7.48292 3.9084 7.60483 3.6375 7.84389 3.41333C8.08499 3.18849 8.37486 3.07674 8.71077 3.07674C9.04737 3.07674 9.33587 3.18849 9.57426 3.41333C9.81333 3.6375 9.93321 3.9084 9.93321 4.22332C9.93321 4.5396 9.81333 4.80914 9.57426 5.03128Z"
                        fill="#4783FF" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1052_30462">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="w-20 mb-3">
        <label for="">Project Description</label>
        <textarea v-model="description" class="input-field" style="height: 180px; resize: vertical;" placeholder="Enter"
          wrap="soft"></textarea>
      </div>

      <div class="row align-item-center">
        <div class="col-md-12 p-0 mb-4">
          <div class="d-flex justify-content-between p-0" style="gap: 7px;">

            <!-- <div class="" id="dropdownStatus" data-bs-toggle="dropdown" aria-expanded="false"> -->

            <div class="input-field d-flex align-items-center cursor-pointer" style="gap: 8px;">
              <ClockIcon />
              Status
            </div>

            <!-- </div> -->
            <div class="input-field d-flex align-items-center" style="gap: 7px;">
              <CalendarIcon size="20" />
              Start
            </div>
            <div class="input-field d-flex align-items-center" style="gap:7px;">
              <CalendarIcon size="20px"></CalendarIcon>
              End
            </div>
            <div class="position-relative">
              <div class="input-field d-flex align-items-center cursor-pointer" @click="toggleDropdownLead"
                style="gap: 7px;">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.99998 10.6243C7.35831 10.6243 5.20831 8.47435 5.20831 5.83268C5.20831 3.19102 7.35831 1.04102 9.99998 1.04102C12.6416 1.04102 14.7916 3.19102 14.7916 5.83268C14.7916 8.47435 12.6416 10.6243 9.99998 10.6243ZM9.99998 2.29102C8.04998 2.29102 6.45831 3.88268 6.45831 5.83268C6.45831 7.78268 8.04998 9.37435 9.99998 9.37435C11.95 9.37435 13.5416 7.78268 13.5416 5.83268C13.5416 3.88268 11.95 2.29102 9.99998 2.29102Z"
                    fill="#3D4046" />
                  <path
                    d="M2.8418 18.9583C2.50013 18.9583 2.2168 18.675 2.2168 18.3333C2.2168 14.775 5.70846 11.875 10.0001 11.875C10.8418 11.875 11.6668 11.9834 12.4668 12.2084C12.8001 12.3 12.9918 12.6417 12.9001 12.975C12.8085 13.3083 12.4668 13.5 12.1335 13.4084C11.4501 13.2167 10.7335 13.125 10.0001 13.125C6.40013 13.125 3.4668 15.4583 3.4668 18.3333C3.4668 18.675 3.18346 18.9583 2.8418 18.9583Z"
                    fill="#3D4046" />
                  <path
                    d="M15 18.9577C13.6167 18.9577 12.3167 18.2244 11.6167 17.0327C11.2417 16.4327 11.0417 15.7243 11.0417 14.9993C11.0417 13.7827 11.5834 12.6577 12.525 11.9077C13.225 11.3493 14.1084 11.041 15 11.041C17.1834 11.041 18.9584 12.816 18.9584 14.9993C18.9584 15.7243 18.7584 16.4327 18.3834 17.041C18.175 17.391 17.9083 17.7077 17.5917 17.9744C16.9 18.6077 15.975 18.9577 15 18.9577ZM15 12.291C14.3834 12.291 13.8 12.4993 13.3084 12.891C12.6667 13.3993 12.2917 14.1743 12.2917 14.9993C12.2917 15.491 12.425 15.9743 12.6834 16.391C13.1667 17.2077 14.0584 17.7077 15 17.7077C15.6584 17.7077 16.2917 17.466 16.775 17.0327C16.9917 16.8494 17.175 16.6327 17.3083 16.3993C17.575 15.9743 17.7084 15.491 17.7084 14.9993C17.7084 13.5077 16.4917 12.291 15 12.291Z"
                    fill="#3D4046" />
                  <path
                    d="M14.5249 16.4506C14.3665 16.4506 14.2082 16.3923 14.0832 16.2673L13.2582 15.4423C13.0165 15.2006 13.0165 14.8006 13.2582 14.5589C13.4999 14.3173 13.8999 14.3173 14.1415 14.5589L14.5416 14.959L15.8749 13.7256C16.1249 13.4923 16.5249 13.509 16.7582 13.759C16.9915 14.009 16.9749 14.409 16.7249 14.6423L14.9499 16.2839C14.8249 16.3923 14.6749 16.4506 14.5249 16.4506Z"
                    fill="#3D4046" />
                </svg>
                Lead
              </div>
              <div class="dropdown-menu position-bottom" :class="{ 'show': isDropdownOpenLead }">
                <!-- Input field for searching members -->
                <InputField placeholder="Search" type="text" :svgIconDropDown="true"></InputField>

                <!-- List of members with checkboxes -->
                <ul class="mb-0">
                  <li v-for="member in teamData.members" :key="member.id">
                    <label @click="selectLeader(member.id)" :class="{ 'selected-leader': leader === member.id }">
                      <div class="row">
                        <div class="d-flex col align-items-center p-0" style="gap: 8px;">
                          <img src="../../../assets/images/profile.png" />
                          {{ member.name }}
                        </div>
                        <div v-if="leader === member.id" class="d-flex col justify-content-end align-items-center">
                          <svg width="51" height="24" viewBox="0 0 51 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="51" height="24" rx="12" fill="#2CD874" fill-opacity="0.16" />
                            <path
                              d="M17.4951 15.6396V17H12.498V15.6396H17.4951ZM12.9766 7.04688V17H11.2607V7.04688H12.9766ZM21.918 17.1367C21.3711 17.1367 20.8766 17.0479 20.4346 16.8701C19.9971 16.6878 19.6234 16.4349 19.3135 16.1113C19.0081 15.7878 18.7734 15.4072 18.6094 14.9697C18.4453 14.5322 18.3633 14.0605 18.3633 13.5547V13.2812C18.3633 12.7025 18.4476 12.1784 18.6162 11.709C18.7848 11.2396 19.0195 10.8385 19.3203 10.5059C19.6211 10.1686 19.9766 9.91113 20.3867 9.7334C20.7969 9.55566 21.2412 9.4668 21.7197 9.4668C22.2484 9.4668 22.7109 9.55566 23.1074 9.7334C23.5039 9.91113 23.832 10.1618 24.0918 10.4854C24.3561 10.8044 24.5521 11.1849 24.6797 11.627C24.8118 12.069 24.8779 12.5566 24.8779 13.0898V13.7939H19.1631V12.6113H23.251V12.4814C23.2419 12.1852 23.1826 11.9072 23.0732 11.6475C22.9684 11.3877 22.8066 11.1781 22.5879 11.0186C22.3691 10.859 22.0775 10.7793 21.7129 10.7793C21.4395 10.7793 21.1956 10.8385 20.9814 10.957C20.7718 11.071 20.5964 11.2373 20.4551 11.4561C20.3138 11.6748 20.2044 11.9391 20.127 12.249C20.054 12.5544 20.0176 12.8984 20.0176 13.2812V13.5547C20.0176 13.8783 20.0609 14.179 20.1475 14.457C20.2386 14.7305 20.3708 14.9697 20.5439 15.1748C20.7171 15.3799 20.9268 15.5417 21.1729 15.6602C21.4189 15.7741 21.6992 15.8311 22.0137 15.8311C22.4102 15.8311 22.7633 15.7513 23.0732 15.5918C23.3831 15.4323 23.652 15.2067 23.8799 14.915L24.748 15.7559C24.5885 15.9883 24.3812 16.2116 24.126 16.4258C23.8708 16.6354 23.5586 16.8063 23.1895 16.9385C22.8249 17.0706 22.401 17.1367 21.918 17.1367ZM30.333 15.5166V11.9893C30.333 11.7249 30.2852 11.4971 30.1895 11.3057C30.0938 11.1143 29.9479 10.9661 29.752 10.8613C29.5605 10.7565 29.319 10.7041 29.0273 10.7041C28.7585 10.7041 28.526 10.7497 28.3301 10.8408C28.1341 10.932 27.9814 11.055 27.8721 11.21C27.7627 11.3649 27.708 11.5404 27.708 11.7363H26.0674C26.0674 11.4447 26.138 11.1621 26.2793 10.8887C26.4206 10.6152 26.6257 10.3714 26.8945 10.1572C27.1634 9.94303 27.4847 9.77441 27.8584 9.65137C28.2321 9.52832 28.6514 9.4668 29.1162 9.4668C29.6722 9.4668 30.1644 9.56022 30.5928 9.74707C31.0257 9.93392 31.3652 10.2165 31.6113 10.5947C31.862 10.9684 31.9873 11.4378 31.9873 12.0029V15.291C31.9873 15.6283 32.0101 15.9313 32.0557 16.2002C32.1058 16.4645 32.1764 16.6947 32.2676 16.8906V17H30.5791C30.5016 16.8223 30.4401 16.5967 30.3945 16.3232C30.3535 16.0452 30.333 15.7764 30.333 15.5166ZM30.5723 12.502L30.5859 13.5205H29.4033C29.098 13.5205 28.8291 13.5501 28.5967 13.6094C28.3643 13.6641 28.1706 13.7461 28.0156 13.8555C27.8607 13.9648 27.7445 14.097 27.667 14.252C27.5895 14.4069 27.5508 14.5824 27.5508 14.7783C27.5508 14.9743 27.5964 15.1543 27.6875 15.3184C27.7786 15.4779 27.9108 15.6032 28.084 15.6943C28.2617 15.7855 28.4759 15.8311 28.7266 15.8311C29.0638 15.8311 29.3577 15.7627 29.6084 15.626C29.8636 15.4847 30.0641 15.3138 30.21 15.1133C30.3558 14.9082 30.4333 14.7145 30.4424 14.5322L30.9756 15.2637C30.9209 15.4505 30.8275 15.651 30.6953 15.8652C30.5632 16.0794 30.39 16.2845 30.1758 16.4805C29.9661 16.6719 29.7132 16.8291 29.417 16.9521C29.1253 17.0752 28.7881 17.1367 28.4053 17.1367C27.9222 17.1367 27.4915 17.041 27.1133 16.8496C26.735 16.6536 26.4388 16.3916 26.2246 16.0635C26.0104 15.7308 25.9033 15.3548 25.9033 14.9355C25.9033 14.5436 25.9762 14.1973 26.1221 13.8965C26.2725 13.5911 26.4912 13.3359 26.7783 13.1309C27.07 12.9258 27.4255 12.7708 27.8447 12.666C28.264 12.5566 28.7425 12.502 29.2803 12.502H30.5723ZM38.2217 15.4688V6.5H39.876V17H38.3789L38.2217 15.4688ZM33.4092 13.3838V13.2402C33.4092 12.6797 33.4753 12.1693 33.6074 11.709C33.7396 11.2441 33.931 10.8454 34.1816 10.5127C34.4323 10.1755 34.7376 9.91797 35.0977 9.74023C35.4577 9.55794 35.8633 9.4668 36.3145 9.4668C36.7611 9.4668 37.153 9.55339 37.4902 9.72656C37.8275 9.89974 38.1146 10.1481 38.3516 10.4717C38.5885 10.7907 38.7777 11.1735 38.9189 11.6201C39.0602 12.0622 39.1605 12.5544 39.2197 13.0967V13.5547C39.1605 14.0833 39.0602 14.5664 38.9189 15.0039C38.7777 15.4414 38.5885 15.8197 38.3516 16.1387C38.1146 16.4577 37.8252 16.7038 37.4834 16.877C37.1462 17.0501 36.752 17.1367 36.3008 17.1367C35.8542 17.1367 35.4508 17.0433 35.0908 16.8564C34.7354 16.6696 34.4323 16.4076 34.1816 16.0703C33.931 15.7331 33.7396 15.3366 33.6074 14.8809C33.4753 14.4206 33.4092 13.9215 33.4092 13.3838ZM35.0566 13.2402V13.3838C35.0566 13.721 35.0863 14.0355 35.1455 14.3271C35.2093 14.6188 35.3073 14.8763 35.4395 15.0996C35.5716 15.3184 35.7425 15.4915 35.9521 15.6191C36.1663 15.7422 36.4215 15.8037 36.7178 15.8037C37.0915 15.8037 37.3991 15.7217 37.6406 15.5576C37.8822 15.3936 38.0713 15.1725 38.208 14.8945C38.3493 14.612 38.445 14.2975 38.4951 13.9512V12.7139C38.4678 12.445 38.4108 12.1943 38.3242 11.9619C38.2422 11.7295 38.1305 11.5267 37.9893 11.3535C37.848 11.1758 37.6725 11.0391 37.4629 10.9434C37.2578 10.8431 37.014 10.793 36.7314 10.793C36.4307 10.793 36.1755 10.8568 35.9658 10.9844C35.7562 11.112 35.583 11.2874 35.4463 11.5107C35.3141 11.734 35.2161 11.9938 35.1523 12.29C35.0885 12.5863 35.0566 12.903 35.0566 13.2402Z"
                              fill="#00B84D" />
                          </svg>
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>

              </div>
            </div>


            <!-- dropdown-menu -->
            <div>

              <div class="dropdown">
                <div class="input-field d-flex align-items-center cursor-pointer" style="gap: 7px;"
                  @click="toggleDropdownMember">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.9999 6.59246C14.9749 6.59246 14.9582 6.59246 14.9332 6.59246H14.8915C13.3165 6.54246 12.1415 5.32578 12.1415 3.82578C12.1415 2.29245 13.3915 1.05078 14.9165 1.05078C16.4415 1.05078 17.6915 2.30078 17.6915 3.82578C17.6832 5.33412 16.5082 6.55078 15.0082 6.60078C15.0082 6.59245 15.0082 6.59246 14.9999 6.59246ZM14.9165 2.29245C14.0749 2.29245 13.3915 2.97579 13.3915 3.81745C13.3915 4.64245 14.0332 5.30912 14.8582 5.34246C14.8665 5.33412 14.9332 5.33412 15.0082 5.34246C15.8165 5.30079 16.4415 4.63412 16.4499 3.81745C16.4499 2.97579 15.7665 2.29245 14.9165 2.29245Z"
                      fill="#292D32" />
                    <path
                      d="M15.0083 12.7339C14.6833 12.7339 14.3583 12.7089 14.0333 12.6505C13.6916 12.5922 13.4666 12.2672 13.525 11.9255C13.5833 11.5839 13.9083 11.3589 14.25 11.4172C15.275 11.5922 16.3583 11.4005 17.0833 10.9172C17.475 10.6589 17.6833 10.3339 17.6833 10.0089C17.6833 9.68386 17.4666 9.36719 17.0833 9.10886C16.3583 8.62553 15.2583 8.43386 14.225 8.6172C13.8833 8.68386 13.5583 8.45053 13.5 8.10886C13.4416 7.7672 13.6666 7.4422 14.0083 7.38387C15.3666 7.1422 16.775 7.40053 17.775 8.06719C18.5083 8.55886 18.9333 9.25886 18.9333 10.0089C18.9333 10.7505 18.5166 11.4589 17.775 11.9589C17.0166 12.4589 16.0333 12.7339 15.0083 12.7339Z"
                      fill="#292D32" />
                    <path
                      d="M4.97496 6.59102C4.96663 6.59102 4.9583 6.59102 4.9583 6.59102C3.4583 6.54102 2.2833 5.32435 2.27496 3.82435C2.27496 2.29101 3.52496 1.04102 5.04996 1.04102C6.57496 1.04102 7.82496 2.29102 7.82496 3.81602C7.82496 5.32435 6.64996 6.54102 5.14996 6.59102L4.97496 5.96602L5.0333 6.59102C5.01663 6.59102 4.99163 6.59102 4.97496 6.59102ZM5.0583 5.34102C5.1083 5.34102 5.14996 5.34101 5.19996 5.34935C5.94163 5.31601 6.59163 4.64935 6.59163 3.82435C6.59163 2.98268 5.9083 2.29934 5.06663 2.29934C4.22497 2.29934 3.54163 2.98268 3.54163 3.82435C3.54163 4.64101 4.17496 5.29935 4.9833 5.34935C4.99163 5.34101 5.02496 5.34102 5.0583 5.34102Z"
                      fill="#292D32" />
                    <path
                      d="M4.96669 12.7339C3.94169 12.7339 2.95835 12.4589 2.20002 11.9589C1.46669 11.4672 1.04169 10.7589 1.04169 10.0089C1.04169 9.26719 1.46669 8.55886 2.20002 8.06719C3.20002 7.40053 4.60835 7.1422 5.96669 7.38387C6.30835 7.4422 6.53335 7.7672 6.47502 8.10886C6.41669 8.45053 6.09169 8.68386 5.75002 8.6172C4.71669 8.43386 3.62502 8.62553 2.89169 9.10886C2.50002 9.36719 2.29169 9.68386 2.29169 10.0089C2.29169 10.3339 2.50835 10.6589 2.89169 10.9172C3.61669 11.4005 4.70002 11.5922 5.72502 11.4172C6.06669 11.3589 6.39169 11.5922 6.45002 11.9255C6.50836 12.2672 6.28336 12.5922 5.94169 12.6505C5.61669 12.7089 5.29169 12.7339 4.96669 12.7339Z"
                      fill="#292D32" />
                    <path
                      d="M9.99987 12.8171C9.97487 12.8171 9.95821 12.8171 9.93321 12.8171H9.89154C8.31654 12.7671 7.14154 11.5504 7.14154 10.0504C7.14154 8.51706 8.39154 7.27539 9.91654 7.27539C11.4415 7.27539 12.6915 8.52539 12.6915 10.0504C12.6832 11.5587 11.5082 12.7754 10.0082 12.8254C10.0082 12.8171 10.0082 12.8171 9.99987 12.8171ZM9.91654 8.51706C9.07488 8.51706 8.39154 9.2004 8.39154 10.0421C8.39154 10.8671 9.03321 11.5337 9.85821 11.5671C9.86654 11.5587 9.93321 11.5587 10.0082 11.5671C10.8165 11.5254 11.4415 10.8587 11.4499 10.0421C11.4499 9.20873 10.7665 8.51706 9.91654 8.51706Z"
                      fill="#292D32" />
                    <path
                      d="M9.9998 18.9676C8.9998 18.9676 7.9998 18.7093 7.2248 18.1843C6.49147 17.6926 6.06647 16.9926 6.06647 16.2426C6.06647 15.5009 6.48313 14.7842 7.2248 14.2926C8.78313 13.2592 11.2248 13.2592 12.7748 14.2926C13.5081 14.7842 13.9331 15.4842 13.9331 16.2342C13.9331 16.9759 13.5165 17.6926 12.7748 18.1843C11.9998 18.7009 10.9998 18.9676 9.9998 18.9676ZM7.91647 15.3426C7.5248 15.6009 7.31647 15.9259 7.31647 16.2509C7.31647 16.5759 7.53313 16.8926 7.91647 17.1509C9.04147 17.9092 10.9498 17.9092 12.0748 17.1509C12.4665 16.8926 12.6748 16.5676 12.6748 16.2426C12.6748 15.9176 12.4581 15.6009 12.0748 15.3426C10.9581 14.5843 9.0498 14.5926 7.91647 15.3426Z"
                      fill="#292D32" />
                  </svg>
                  Members
                </div>
                <div class="dropdown-menu position-top" :class="{ 'show': isDropdownOpenMember }">

                  <InputField placeholder="Search" type="text" :svgIconDropDown="true"></InputField>

                  <ul class="mb-0">
                    <li v-for="member in teamData.members" :key="member.id">

                      <label>
                        <div class="row">
                          <div class="d-flex col align-items-center" style="gap: 8px;">
                            <CheckBoxInput :id="member.id" :modelValue="selectedMembers.includes(member.id)"
                              @update:modelValue="toggleMember(member.id)" />

                            <img src="../../../assets/images/profile.png" />
                            {{ member.name }}
                          </div>
                        </div>
                      </label>
                    </li>
                  </ul>

                </div>
              </div>


            </div>

          </div>
        </div>
      </div>


      <div class="mb-2 align-items-center">
        <label for="" style="margin-right: 5px;">Milestones</label>
        <span class="cursor-pointer" @click="addMilestones = true">
          <AddCircleIconVue />
        </span>
      </div>

      <div v-for="(milestone, index) in milestones" :key="index" class="col-md-12 mb-2">

        <div v-if="editIndex !== index" class="row" style="background-color: #EAEAEA; border-radius: 8px; height:40px; padding:10px 14px">
          <div class="col-md-5 p-0">{{ milestone.description }}</div>
          <div class="col-md-4 p-0">{{ "06-May-2024" }}</div>
          <div class="col-md-3 p-0 d-flex justify-content-end">
            <span @click="editMilestone(index)" class="cursor-pointer">
              <EditIcon />
            </span>
          </div>
        </div>

        <div v-if="editIndex===index" class="mb-2 col-md-12">
          <div class="d-flex align-items-center" style="gap: 8px;">

            <div>
              <input type="text" v-model="newMilestone.description" class="input-field" placeholder="Milestone Description"
                style="width: 350px;">
            </div>
            <div class="input-field align-items-center">
              <CalendarIcon></CalendarIcon>
            </div>
            <div class="input-field d-flex align-items-center">
              <div>
                <span class="cursor-pointer" @click="storeMilestone">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 18.3327C14.5833 18.3327 18.3333 14.5827 18.3333 9.99935C18.3333 5.41602 14.5833 1.66602 10 1.66602C5.41666 1.66602 1.66666 5.41602 1.66666 9.99935C1.66666 14.5827 5.41666 18.3327 10 18.3327Z"
                      stroke="#00B84D" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M6.45833 10.0009L8.81666 12.3592L13.5417 7.64258" stroke="#00B84D" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div>
              <span class="cursor-pointer" @click="cancelMilestone">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.10766 20.8925C12.3486 24.1334 17.6519 24.1334 20.8928 20.8925C24.1337 17.6516 24.1337 12.3483 20.8928 9.1074C17.6519 5.86649 12.3486 5.86649 9.10766 9.1074C5.86675 12.3483 5.86675 17.6516 9.10766 20.8925Z"
                    stroke="#E9203F" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.6433 12.6426L17.3574 17.3566" stroke="#E9203F" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M12.643 17.3566L17.3571 12.6426" stroke="#E9203F" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
  
            </div>
          </div>
  
        </div>                          
        </div>

      </div>

      <div v-if="addMilestones && editIndex === -1" class="mb-3 row align-item-center">
        <div class="d-flex justify-content-between p-0" style="gap: 8px;">

          <div class="w-75 p-0">
            <input type="text" v-model="newMilestone.description" class="input-field" placeholder="Milestone Description"
              >
          </div>
          <div class="w-10 p-0">
            <div class="input-field align-items-center">
              <CalendarIcon></CalendarIcon>
            </div>
          </div>
          <div class="w-15 p-0">
            <div class="input-field d-flex align-items-center">
              <div>
                <span class="cursor-pointer" @click="storeMilestone">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10 18.3327C14.5833 18.3327 18.3333 14.5827 18.3333 9.99935C18.3333 5.41602 14.5833 1.66602 10 1.66602C5.41666 1.66602 1.66666 5.41602 1.66666 9.99935C1.66666 14.5827 5.41666 18.3327 10 18.3327Z"
                      stroke="#00B84D" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.45833 10.0009L8.81666 12.3592L13.5417 7.64258" stroke="#00B84D" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
              <div>
                <span class="cursor-pointer" @click="cancelMilestone">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.10766 20.8925C12.3486 24.1334 17.6519 24.1334 20.8928 20.8925C24.1337 17.6516 24.1337 12.3483 20.8928 9.1074C17.6519 5.86649 12.3486 5.86649 9.10766 9.1074C5.86675 12.3483 5.86675 17.6516 9.10766 20.8925Z"
                      stroke="#E9203F" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.6433 12.6426L17.3574 17.3566" stroke="#E9203F" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M12.643 17.3566L17.3571 12.6426" stroke="#E9203F" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </span>

              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="col-12 p-0">
          <div class="d-flex justify-content-end mt-3">
            <button type="button" class="custom-secondary-btn me-4 " @click="closePopup">
              Cancel
            </button>
            <button class="custom-primary-btn" type="button" @click="createProject(route.params.id)">
              Create
            </button>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-menu {
  /*display: none;*/
  position: absolute;
  /*top: 110%;*/
  /*left: 0;*/
  right: 0;
  width: 268px;
  /*height: 351px;*/
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #C4C4CA;
  /*background-color: #fff;*/
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  transform: translateZ(0);
  scrollbar-width: none;
}

/* Add the 'show' class when isDropdownOpen is true */
.dropdown-menu.show {
  display: block;
}

.position-top {
  top: 110%;
  max-height: 351px;
}

.position-bottom {
  bottom: 110%;
  max-height: 392px;
}

.dropdown-menu input[type="text"] {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: none;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
}

.dropdown-menu ul li label {
  display: block;
  margin-bottom: 5px;
}

/* Style the checkbox however you like */
.dropdown-menu ul li input[type="checkbox"] {
  margin-right: 5px;
}

.selected-leader {
  background: #EAEAEA;
}</style>