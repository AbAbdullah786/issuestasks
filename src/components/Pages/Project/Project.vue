<script setup>
  import AppHeader from '@/components/AppHeader.vue';
  import ClockIcon from '@/components/Icons/ClockIcon.vue';
  import CampbellIcon from '@/components/Icons/CampbellIcon.vue';
  import CheckBoxInput from '@/components/CheckBoxInput.vue';
  import NewProject from '@/components/Pages/Project/NewProject.vue';
  import { ref, onMounted } from "vue";
  import { useRoute } from 'vue-router';
  import api from '@/api';
  
  var route = useRoute()
  const data = ref([])
  const showPopup = ref(false);
  const showOverlay = ref(false);

  onMounted(() => {
    const teamId = route.params.id;
    fetchData(teamId); 
  });

  function fetchData(teamId) {
    api
    .get(`teams/${teamId}/projects`)
    .then((response) => {
      if (response.status === 200) {
        data.value = response.data;
        console.log(data.value)
      }
    })
    .catch((error) => {
      if (error) {
        console.log(error)
        return false
      }
    });

  }
  // const name = ref('')
  //   const slug = ref('')
  //   const description = ref('')
  //   const addMilestones = ref(false);
  // function createProject(teamId) {
  //     api
  //     .post(`/teams/${teamId}/projects`, {
  //       name: name.value,
  //       slug: slug.value,
  //       description: description.value,
  //     })
  //     .then((response) => {
  //         if (response.status === 200) {
  //           console.log('created'); // Log the response data
  //           showPopup.value = false;
            
  //         }
  //       })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   }
</script>

<template>
    <AppHeader heading="Projects" breadCrumbs="Active" />
    <div class="px-3">
      <div class="py-4">

        <div class="mb-5">
          <div class="row">
            <div class="d-flex justify-content-between">

            <div class="col-md-5 p-0">
              <div style="width:251px">
                <div class="d-flex align-items-center component2">
                  <div class="noActive"><strong>All</strong></div>
                  <div class="noActive"><strong>Backlog</strong></div>
                  <div class="active"><strong>Active</strong></div>
                  <div class="noActive"><strong>Closed</strong></div>
                </div>
              </div>
            </div>

            <div class="col-md-7 p-0">
              <div class="d-flex justify-content-end"
              style="gap: 10px;">

                <div class="component6">
                  <div class="d-flex align-items-center"
                  style="gap: 5px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#3D4046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8 12H16" stroke="#3D4046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 16V8" stroke="#3D4046" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      
                    <strong 
                      style="font-size: 14px !important; color:#3D4046;">
                      Filter
                    </strong>
                  </div>
                </div>

                <div class="component6">
                  <div class="d-flex align-items-center"
                  style="gap: 5px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 7.25H16C15.59 7.25 15.25 6.91 15.25 6.5C15.25 6.09 15.59 5.75 16 5.75H22C22.41 5.75 22.75 6.09 22.75 6.5C22.75 6.91 22.41 7.25 22 7.25Z" fill="#3D4046"/>
                      <path d="M6 7.25H2C1.59 7.25 1.25 6.91 1.25 6.5C1.25 6.09 1.59 5.75 2 5.75H6C6.41 5.75 6.75 6.09 6.75 6.5C6.75 6.91 6.41 7.25 6 7.25Z" fill="#3D4046"/>
                      <path d="M10 10.75C7.66 10.75 5.75 8.84 5.75 6.5C5.75 4.16 7.66 2.25 10 2.25C12.34 2.25 14.25 4.16 14.25 6.5C14.25 8.84 12.34 10.75 10 10.75ZM10 3.75C8.48 3.75 7.25 4.98 7.25 6.5C7.25 8.02 8.48 9.25 10 9.25C11.52 9.25 12.75 8.02 12.75 6.5C12.75 4.98 11.52 3.75 10 3.75Z" fill="#3D4046"/>
                      <path d="M22 18.25H18C17.59 18.25 17.25 17.91 17.25 17.5C17.25 17.09 17.59 16.75 18 16.75H22C22.41 16.75 22.75 17.09 22.75 17.5C22.75 17.91 22.41 18.25 22 18.25Z" fill="#3D4046"/>
                      <path d="M8 18.25H2C1.59 18.25 1.25 17.91 1.25 17.5C1.25 17.09 1.59 16.75 2 16.75H8C8.41 16.75 8.75 17.09 8.75 17.5C8.75 17.91 8.41 18.25 8 18.25Z" fill="#3D4046"/>
                      <path d="M14 21.75C11.66 21.75 9.75 19.84 9.75 17.5C9.75 15.16 11.66 13.25 14 13.25C16.34 13.25 18.25 15.16 18.25 17.5C18.25 19.84 16.34 21.75 14 21.75ZM14 14.75C12.48 14.75 11.25 15.98 11.25 17.5C11.25 19.02 12.48 20.25 14 20.25C15.52 20.25 16.75 19.02 16.75 17.5C16.75 15.98 15.52 14.75 14 14.75Z" fill="#3D4046"/>
                      </svg>                      
                    <strong style="font-size: 14px !important; color:#3D4046;">Display</strong>
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.50001 11.0004C7.06251 11.0004 6.62501 10.8316 6.29376 10.5004L2.21876 6.42539C2.03751 6.24414 2.03751 5.94414 2.21876 5.76289C2.40001 5.58164 2.70001 5.58164 2.88126 5.76289L6.95626 9.83789C7.25626 10.1379 7.74376 10.1379 8.04376 9.83789L12.1188 5.76289C12.3 5.58164 12.6 5.58164 12.7813 5.76289C12.9625 5.94414 12.9625 6.24414 12.7813 6.42539L8.70626 10.5004C8.37501 10.8316 7.93751 11.0004 7.50001 11.0004Z" fill="#3D4046"/>
                      </svg>
                      
                  </div>
                </div>

                <div>
                  <button 
                    class="custom-primary-btn d-flex align-items-center" 
                    type="button"
                    @click="showPopup =true">
                    <strong>New Project</strong>
                  </button>    
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>

        <!-- <router-link to="edit-project" class="text-decoration-none">
          <button class="custom-primary-btn d-flex align-items-center" type="button">
            <strong>edit project</strong>
          </button>
        </router-link> -->

        <!-- popup -->
        <div v-if="showPopup">
          <NewProject :fetchData="fetchData" @update:showPopup="showPopup = $event" />
        </div>
        <!-- end popup -->

        <div class="row">

          <div class="col-md-4" style="padding: 0px 10px 0px 0px">
            <div class="rectangle">
              <strong>Projects List</strong>
            </div>
            <div style="height: 100vh; border-left:1px solid #EAEAEA; border-right:1px solid #EAEAEA">
                <div style="height: 25px;"></div>

                <div class="project d-flex justify-content-between align-items-center text-center cursor-pointer" v-for="(project, index) in data" :key="index">
                  <div>
                    <div class="iconBackground position-relitive text-center">
                      <CampbellIcon/>
                    </div>
                    <strong style="color: #2A2C32; font-size:14px; margin-left:5px">{{ project.name }}</strong>
                      
                    </div>

                  <!-- <div class=""> -->
                    <div class="d-flex justify-content-end"
                    style="gap: 12px;">
                      
                    <div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1 11.2747C10.0833 11.2747 10.0583 11.2747 10.0417 11.2747C10.0167 11.2747 9.98333 11.2747 9.95833 11.2747C8.06666 11.2164 6.64999 9.74141 6.64999 7.92474C6.64999 6.07474 8.15833 4.56641 10.0083 4.56641C11.8583 4.56641 13.3667 6.07474 13.3667 7.92474C13.3583 9.74974 11.9333 11.2164 10.125 11.2747C10.1083 11.2747 10.1083 11.2747 10.1 11.2747ZM9.99999 5.80807C8.83333 5.80807 7.89166 6.75807 7.89166 7.91641C7.89166 9.05807 8.78333 9.98307 9.91666 10.0247C9.94166 10.0164 10.025 10.0164 10.1083 10.0247C11.225 9.96641 12.1 9.04974 12.1083 7.91641C12.1083 6.75807 11.1667 5.80807 9.99999 5.80807Z" fill="#7B8497"/>
                        <path d="M10 18.9586C7.75833 18.9586 5.61666 18.1253 3.95833 16.6086C3.80833 16.4753 3.74166 16.2753 3.75833 16.0836C3.86666 15.0919 4.48333 14.1669 5.50833 13.4836C7.99166 11.8336 12.0167 11.8336 14.4917 13.4836C15.5167 14.1753 16.1333 15.0919 16.2417 16.0836C16.2667 16.2836 16.1917 16.4753 16.0417 16.6086C14.3833 18.1253 12.2417 18.9586 10 18.9586ZM5.06666 15.9169C6.45 17.0753 8.19166 17.7086 10 17.7086C11.8083 17.7086 13.55 17.0753 14.9333 15.9169C14.7833 15.4086 14.3833 14.9169 13.7917 14.5169C11.7417 13.1503 8.26666 13.1503 6.2 14.5169C5.60833 14.9169 5.21666 15.4086 5.06666 15.9169Z" fill="#7B8497"/>
                        <path d="M9.99999 18.9577C5.05832 18.9577 1.04166 14.941 1.04166 9.99935C1.04166 5.05768 5.05832 1.04102 9.99999 1.04102C14.9417 1.04102 18.9583 5.05768 18.9583 9.99935C18.9583 14.941 14.9417 18.9577 9.99999 18.9577ZM9.99999 2.29102C5.74999 2.29102 2.29166 5.74935 2.29166 9.99935C2.29166 14.2493 5.74999 17.7077 9.99999 17.7077C14.25 17.7077 17.7083 14.2493 17.7083 9.99935C17.7083 5.74935 14.25 2.29102 9.99999 2.29102Z" fill="#7B8497"/>
                        </svg>
                      </div>
                      <div>
                        <ClockIcon></ClockIcon> 
                      </div>

                    </div>
                <!-- </div> -->

                </div>
                
            </div>
          </div>
          
          <div class="col-md-8 p-0">
            <div class="rectangle d-flex text-center">
              <div class="col-md-3">
                <strong>May</strong>
              </div>
              <div class="col-md-3">
                <strong>June</strong>
              </div>
              <div class="col-md-3">
                <strong>July</strong>
              </div>
              <div class="col-md-3">
                <strong>Augest</strong>
              </div>
            </div>

            <div style="height: 100vh; border-left:1px solid #EAEAEA; border-right:1px solid #EAEAEA">
              <div class="d-flex">
                <div class="col-md-3" style="height: 100vh; border-right:1px solid #EAEAEA"></div>
                <div class="col-md-3" style="height: 100vh; border-right:1px solid #EAEAEA"></div>
                <div class="col-md-3" style="height: 100vh; border-right:1px solid #EAEAEA"> </div>
                <div class="col-md-3" style="height: 100vh; border-right:1px solid #EAEAEA"></div>
                </div>
            </div>
          </div>


        </div>

      </div>
  </div>
</template>

<style lang="scss">

.component2 {
  background-color: #EAEAEA;
  padding: 4px 16px;
  gap: 22px;
  border-radius: 6px;
}
.active {
  border-radius: 6px;
  background: #F96332;
  padding: 7px;
  color: #FFFFFF;
  font-size: 12px;
  /* height: 32px; */
}
.noActive {
  padding: 7px 0px;
  color:#3D4046;
  font-size:12px;
}
.component6 {
  background-color: #EAEAEA;
  border-radius: 8px;
  padding: 6px 24px;
  border: 1px solid #c4c4ca;
  box-shadow: none !important;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
}
.rectangle {
  background: #EAEAEA;
  border-radius: 8px 8px 0px 0px;
  height: 78px;
  padding: 15px;
  line-height: 16px;
  font-size: 16px;
  color: #3D4046;
}
.project {
  background-color: #F6F6F6;
  height: 56px;
  padding: 15px;
}
.iconBackground {
  width: 24px;
  height: 22px;
  border-radius: 8px;
  background: linear-gradient(to bottom, #FFFFFF, #D0D5DD);
  display: inline-block;
  vertical-align: middle;
  margin: 0px;
}
.dates {
  font-size: 12px;
  gap:7px;
  color: #7B8497;
  margin-top: 10px;
  text-align: center;
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
.iconContainer {
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  right: 10px; /* Adjust the right position as needed */
  pointer-events: none; /* Ensure the icon doesn't interfere with input interactions */
}
.milestones {
  width: 299px;
  height: 48px;
  border-radius: 12px;
  background: #F6F6F6;
  padding: 10px;
}

</style>

