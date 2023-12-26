<template>
  <div :class="loading ? 'pe-none' : ''">
    <UserHead userProfile="text-bold"></UserHead>
    <div class="row">
      <div class="col-sm-12 col-lg-6">
        <div class="row">
          <div class="col-sm-12 col-lg-6 mt-4">
            <!-- <ProfileAvatar
              id="previewImage"
              username="Ahmad Ali"
              v-if="logo"
              class="image-logo"
              :style="{
                width: '135px',
                height: '135px',
              }"
            /> -->
            <img
              id="profileImage"
              class="rounded-circle"
              :style="{
                width: '135px',
                height: '135px',
              }"
              :src="imageIcon"
              v-if="IsImage"
            />
            <span
              :id="color"
              v-if="backgroundColor"
              :style="{
                backgroundColor: this.color,
                width: '135px',
                height: '135px',
              }"
              class="d-block rounded-circle"
            ></span>
            <span
              v-if="!backgroundColor && !imageIcon"
              class="name-initials"
              :style="{
                backgroundColor: this.color,
                width: '135px',
                height: '135px',
              }"
            >
              {{
                data && data.first_name && data.last_name
                  ? data.first_name[0] + data.last_name[0]
                  : data && data.username
                  ? data.username[0] + data.username[1]
                  : data && data.email
                  ? data.email[0] + data.email[1]
                  : ""
              }}
            </span>
          </div>
          <div class="col-sm-12">
            <button
              class="w-50 custom-primary-btn mt-4"
              @click="profilePicModal"
            >
              Change Profile Picture
            </button>
          </div>
          <div class="col-sm-12">
            <div class="line my-2">
              Upload File in JPEG , PNG or SVG format upto 5MB
            </div>
          </div>
          <div class="col-sm-12 col-lg-6">
            <label>First Name</label>
            <InputField
              @change="onInputChange"
              placeholder=""
              type="text"
              :id="data.first_name"
              ref="inputField"
              v-model="data.first_name"
            ></InputField>
          </div>
          <div class="col-sm-12 col-lg-6">
            <label>Last Name</label>
            <InputField
              @change="onInputChange"
              placeholder=""
              type="text"
              id="data.last_name"
              ref="inputField"
              v-model="data.last_name"
            ></InputField>
          </div>
          <div class="col-sm-12">
            <label
              >Display Name
              <span class="line">{{
                "(used in mention and activity)"
              }}</span></label
            >
            <InputField
              @change="onInputChange"
              placeholder=""
              type="text"
              id="data.username"
              ref="inputField"
              v-model="data.username"
            ></InputField>
          </div>
          <div class="col-sm-12 col-lg-8">
            <label
              >Mention Email <span class="line">{{ "(User ID)" }}</span></label
            >
            <InputField
              placeholder="Email"
              type="email"
              id="email"
              ref="inputField"
              v-model="data.email"
              :isdisabled="IsChangeUserId"
            ></InputField>
          </div>

          <div class="col-sm-12 col-lg-4 pt-4">
            <button class="custom-secondary-btn" @click="changeUserId">
              <strong>Change User ID?</strong>
            </button>
          </div>
          <div class="col-sm-12 col-lg-6 pt-1">
            <button class="custom-secondary-btn">
              <strong>Logout from all other devices?</strong>
            </button>
          </div>
          <div class="col-sm-12 col-lg-1"></div>
          <div class="col-sm-12 col-lg-5 pt-1">
            <button class="custom-secondary-btn">
              <strong>Delete my Account?</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
    <UserProfilePictureModal
      :visible="modalVisible"
      @convertImage="convertImage"
      @setColor="setColor"
      @close="hideModal"
    />
  </div>
  <!-- <scale-loader
    :loading="loading"
    :color="'#f96332'"
    :height="'35px'"
    :width="'7px'"
  ></scale-loader> -->
</template>

<script>
import UserHead from "@/components/Pages/Profile/UserHead";
import InputField from "@/components/Fields/InputField";
import UserProfilePictureModal from "@/components/Fields/UserProfilePictureModal";
import api from "../../../api";
import { useToast } from "vue-toastification";
import SuccessIcon from "../../ToastIcons/SuccessIcon";
import ErrorIcon from "../../ToastIcons/ErrorIcon";
// import ProfileAvatar from "vue-profile-avatar";
// import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  name: "UserProfile",
  components: {
    InputField,
    UserHead,
    UserProfilePictureModal,
    // ProfileAvatar,
    // ScaleLoader,
  },
  beforeMount() {
    this.loading = true;
    if (localStorage.getItem("userProfile")) {
      this.data = JSON.parse(localStorage.getItem("userProfile"));
      if (this.data.avatar) {
        if (this.data.avatar.startsWith("#")) {
          this.logo = false;
          this.IsImage = false;
          this.backgroundColor = true;
          this.color = this.data.avatar;
        } else {
          this.logo = false;
          this.backgroundColor = false;
          this.color = "";
          this.imageIcon = this.data.avatar;
          this.IsImage = true;
        }
      }
      this.loading = false;
    }
    this.getProfile();
  },
  data() {
    return {
      IsChangeUserId: false,
      email: "",
      data: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        avatar: "",
      },
      modalVisible: false,
      imageIcon: "",
      loading: false,
      error: false,
      backgroundColor: false,
      IsImage: false,
      logo: true,
      color: "",
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    profilePicModal() {
      this.modalVisible = true;
    },
    hideModal() {
      this.modalVisible = false;
    },
    changeUserId() {
      this.IsChangeUserId = false;
    },
    getProfile() {
      api
        .get("user/profile")
        .then((response) => {
          if (response.status === 200) {
            this.data = response.data.user;
            localStorage.setItem("userProfile", JSON.stringify(this.data));
            if (this.data.avatar) {
              if (this.data.avatar.startsWith("#")) {
                this.logo = false;
                this.IsImage = false;
                this.backgroundColor = true;
                this.color = this.data.avatar;
              } else {
                this.logo = false;
                this.backgroundColor = false;
                this.color = "";
                this.imageIcon = this.data.avatar;
                this.IsImage = true;
              }
            }
            if (this.data.email) {
              this.IsChangeUserId = true;
            }
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error, "asdasdas");
          this.loading = false;
        });
    },
    onInputChange() {
      this.loading = true;
      if (this.backgroundColor) {
        this.data.avatar = this.color;
      }
      if (this.IsImage) {
        this.data.avatar = this.imageIcon;
      }
      api
        .post("user/profile", {
          id: this.data.id,
          first_name: this.data.first_name,
          last_name: this.data.last_name,
          username: this.data.username,
          avatar: this.data.avatar,
        })
        .then((response) => {
          if (response.status === 200) {
            this.toast("Your changes are saved successfully", {
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
            this.getProfile();
          } else {
            this.loading = false;
          }
        })
        .catch((error) => {
          console.log(error, "asdasdas");
          this.loading = false;
          this.toast("Your changes didn't saved successfully", {
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
            icon: ErrorIcon,
            rtl: false,
          });
        });
    },
    convertImage(file) {
      this.logo = false;
      this.backgroundColor = false;
      this.IsImage = true;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageIcon = reader.result;
          this.onInputChange();
        };
        reader.readAsDataURL(file);
      } else {
        this.imageIcon = ""; // Clear the preview if no image selected
      }
    },
    setColor(color) {
      this.backgroundColor = true;
      this.logo = false;
      this.IsImage = false;
      this.color = color;
      this.imageIcon = "";
      this.onInputChange();
    },
  },
};
</script>

<style scoped>
.name-initials {
  width: 240px;
  height: 240px;
  background: #f96332;
  border-radius: 50%;
  font-size: 32px;
  line-height: 36px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
