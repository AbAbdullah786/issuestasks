<template>
  <div class="px-0 mx-0">
    <UserHead userPreference=" "></UserHead>
  </div>
  <!-- <div class="px-0 mx-0">
    <UserHead userPreference=" "></UserHead>
    <div style="padding-left: 20px">
      <div>
        <div class="card">
          <div>
            <div class="row">
              <div class="col-4">
                <h5
                  class="pt-3 pl-3"
                  style="
                    font-family: Roboto;
                    color: #070707;
                    padding-left: 10px;
                  "
                >
                  Member (1)
                </h5>
              </div>
              <div class="col-8">
                <span class="searchBar searchMob">
                  <input
                    type="text"
                    placeholder="Search"
                    class="form-control"
                    value=""
                  />
                </span>
              </div>
            </div>
          </div>
          <div class="row py-3" style="width: 100%">
            <div class="col-lg-2 col-md-2 col-sm-6">
              <button
                class="custom-primary-btn"
                type="submit"
                style="font-family: Roboto"
              >
                <strong>Add Member</strong>
              </button>
            </div>
            <div
              class="searchBar searchWeb col-lg-7 col-md-7 col-sm-0 flex-item"
            >
              <input
                type="text"
                placeholder="Search"
                class="form-control"
                value=""
              />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-6">
              <SelectDropdown :items="dropdownItems"></SelectDropdown>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead style="border-bottom: 1px solid">
                <tr>
                  <th>Name</th>
                  <th class="px-0 mx-0">Role</th>
                  <th>Status</th>
                  <th>More</th>
                </tr>
              </thead>
              <tbody class="table-border-bottom-0">
                <tr>
                  <td class="py-4">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <img src="./../../../assets/images/profile.png" />
                      </div>
                      <div class="col">
                        <div>
                          <strong>{{ data.name ?? "Khurram" }}</strong>
                        </div>
                        <div class="emailWeb">
                          {{ data.email ?? "khurramazhar7344@gmail.com" }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="pt-3">
                    <SelectDropdown :items="rolesArray"></SelectDropdown>
                  </td>
                  <td class="pt-4">
                    <span class="badge bg-label-primary me-1">Active</span>
                  </td>
                  <td class="pt-4">
                    <div class="dropdown">
                      <i
                        class="fas fa-ellipsis-h"
                        data-bs-toggle="dropdown"
                      ></i>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:void(0);"
                          ><i class="bx bx-edit-alt me-1"></i> Edit</a
                        >
                        <a
                          class="dropdown-item"
                          href="javascript:void(0);"
                          @click="deleteUserModal()"
                          ><i class="bx bx-trash me-1"></i> Delete</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <DeleteModal
      :message="message"
      :visible="modalVisible"
      @close="hideModal"
    />
  </div> -->
</template>

<script>
import UserHead from "@/components/Pages/WorkSpace/UserHead";
// import DeleteModal from "@/components/DeleteModal";
// import SelectDropdown from "@/components/Fields/SelectDropdown";
// import api from "../../../api";
export default {
  name: "WorkSpaceMembers",
  components: { UserHead },
  // beforeMount() {
  //   this.getProfile();
  // },
  // data() {
  //   return {
  //     dropdownItems: ["Active", "Disable", "Pending Invites"],
  //     rolesArray: ["Administrator", "Collaborator", "Guest"],
  //     data: {},
  //     message: "",
  //     deleteUser: false,
  //     modalVisible: false,
  //   };
  // },
  // methods: {
  //   deleteUserModal() {
  //     this.message = "Are you sure you want to delete this User?";

  //     this.modalVisible = true;
  //   },
  //   hideModal() {
  //     this.modalVisible = false;
  //   },
  //   getProfile() {
  //     api
  //       .post("user/profile", this.data)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           console.log(response, "response");
  //           this.data = response.data;
  //           console.log(this.data, "data");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error, "asdasdas");
  //       });
  //   },
  // },
};
</script>

<style>
.searchWeb {
  display: block;
}

.searchMob {
  padding-top: 10px;
  display: none;
}
.card {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
}

.card-header {
  margin-bottom: 8px;
}

.badge {
  text-transform: uppercase;
  line-height: 0.75;
}
.bg-label-primary {
  background-color: #e7e7ff !important;
  color: #696cff !important;
}
.badge {
  --bs-badge-padding-x: 0.593em;
  --bs-badge-padding-y: 0.52em;
  --bs-badge-font-size: 0.8125em;
  --bs-badge-font-weight: 500;
  --bs-badge-color: #fff;
  --bs-badge-border-radius: 0.25rem;
  display: inline-block;
  padding: var(--bs-badge-padding-y) var(--bs-badge-padding-x);
  font-size: var(--bs-badge-font-size);
  font-weight: var(--bs-badge-font-weight);
  line-height: 1;
  color: #f96332;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--bs-badge-border-radius);
}
h3 {
  font-size: 29px;
  font-family: Roboto, sans-serif;
}

p {
  font-size: 14px;
  color: #666;
  font-family: Roboto-Regular, sans-serif;
}

.icons i {
  position: absolute;
  color: #0000006b;
}
.icons {
  width: 100%;
  margin-bottom: 10px;
}
.icon {
  padding: 15px 0 0 10px;
  min-width: 40px;
  font-family: Roboto, sans-serif;
}
.card-body {
  flex: 1 1 auto;
  padding: 0px 0px 15px 0px;
  color: var(--bs-card-color);
}
.signup-button {
  border: none;
  position: center;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  padding: 5px 15px;
  font-family: Roboto;
  font-size: 16px !important;
}
button:hover {
  background-color: #f96332; /* Change to desired hover color */
  color: #ffffff; /* Change to desired hover color */
}
.image {
  height: 20px;
  border-radius: 10px;
  background: transparent;
  width: 20px;
}
input[disabled] {
  background-color: #f4f4f4 !important;
}
@media screen and (max-width: 767px) {
  .status-class {
    display: none;
  }
  .searchMob {
    display: block;
  }
  .searchWeb {
    display: none;
  }
  .emailWeb {
    display: none;
  }
}
</style>
