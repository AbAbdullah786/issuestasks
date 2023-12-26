<template>
  <div :class="loading ? 'pe-none' : ''">
    <UserHead userProfile="text-bold"></UserHead>
    <div style="background-color: #ffffff; padding-left: 20px">
      <form @submit.prevent="submitForm">
        <div class="col-sm-12 col-lg-6 row">
          <div style="padding-bottom: 10px">
            <div class="ico-trainer my-4">
              <ProfileAvatar
                id="previewImage"
                username="Ahmad Ali"
                v-if="logo"
                class="image-logo"
              />
              <img
                id="previewImage"
                class="image-logo"
                :src="
                  imageIcon ? imageIcon : './../../../assets/images/profile.png'
                "
                v-if="IsImage"
              />
              <span
                :id="color"
                v-if="backgroundColor"
                :style="{ backgroundColor: this.color }"
                class="circle image-logo"
              ></span>
              <!-- <div class="status-circle"></div> -->
            </div>
            <!-- <div class="online" style="padding-left: 64px">Online</div> -->
            <button
              class="custom-primary-btn"
              type="button"
              @click="avatarModal"
            >
              Choose WorkSpace Icon
            </button>
          </div>
          <div class="col-sm-12 col-lg-12">
            <label class="form-label">WorkSpace Name</label>
            <InputField
              type="text"
              id="name"
              ref="inputField"
              :length="50"
              v-model="data.name"
            ></InputField>
          </div>
          <div class="col-sm-12 col-lg-6">
            <label class="form-label">URL Shortcut</label>
            <InputField
              @change="checkSlug(data.slug)"
              placeholder="https://issuestasks.com/"
              type="text"
              id="slug"
              ref="inputField"
              v-model="data.slug"
            ></InputField>
          </div>
          <div class="col-sm-12 col-lg-6">
            <p
              v-if="error"
              class="error py-4 pt-5"
              style="font-size: small; padding-top: 35px"
            >
              {{ "Shortcut already exists. Please try another one." }}
            </p>
          </div>
          <div class="col-12">
            <label class="form-label"
              >Auto-Archive Issue After
              <span class="line">{{ "(Days)" }}</span></label
            >
          </div>
          <div class="col-sm-12 col-lg-2">
            <InputField
              type="text"
              id="issue_archived_period"
              ref="inputField"
              :length="3"
              v-model="data.issue_archived_period"
            ></InputField>
          </div>
          <div class="col-12 pt-4">
            <button class="custom-primary-btn d-flex" type="submit">
              <strong class="pe-2">Save</strong>
              <clip-loader
                :loading="loading && isPosting"
                :color="'#ffffff'"
                :size="'14px'"
              ></clip-loader>
            </button>
          </div>
        </div>
      </form>
    </div>
    <AvatarModal
      :visible="modalVisible"
      @convertImage="convertImage"
      @setColor="setColor"
      @close="hideModal"
    />
  </div>
</template>

<script>
import UserHead from "@/components/Pages/WorkSpace/UserHead";
import InputField from "@/components/Fields/InputField";
import ProfileAvatar from "vue-profile-avatar";
import AvatarModal from "@/components/Fields/AvatarModal";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import api from "../../../api";
import { useToast } from "vue-toastification";
import SuccessIcon from "../../ToastIcons/SuccessIcon";
import ErrorIcon from "../../ToastIcons/ErrorIcon";

export default {
  name: "UserProfile",
  components: { AvatarModal, ProfileAvatar, InputField, UserHead, ClipLoader },
  data() {
    return {
      data: {
        name: "",
        slug: "https://issuestasks.com/",
        issue_archived_period: "",
        createdAt: "",
        icon: "",
        id: null,
        updatedAt: "",
        user_id: null,
      },
      loading: false,
      isPosting: false,
      error: false,
      backgroundColor: false,
      modalVisible: false,
      IsImage: false,
      logo: true,
      imageIcon: "",
      color: "",
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.loading = true;
    if (localStorage.getItem("workspace")) {
      this.data = JSON.parse(localStorage.getItem("workspace"));
      this.data.slug = "https://issuestasks.com/" + this.data.slug;
      if (this.data.icon) {
        if (this.data.icon.startsWith("#")) {
          this.IsImage = false;
          this.logo = false;
          this.backgroundColor = true;
          this.color = this.data.icon;
        } else {
          this.logo = false;
          this.backgroundColor = false;
          this.color = "";
          this.imageIcon = this.data.icon;
          this.IsImage = true;
        }
      }
      this.loading = false;
    }
    this.getWorkSpaceGeneral();
  },
  methods: {
    getWorkSpaceGeneral() {
      api
        .get("workspace")
        .then((response) => {
          if (response && response.status === 200 && response.data) {
            this.data = response.data;
            localStorage.setItem("workspace", JSON.stringify(this.data));
            localStorage.setItem("workSpaceID", this.data.id);
            this.data.slug = "https://issuestasks.com/" + this.data.slug;
            if (this.data.icon) {
              if (this.data.icon.startsWith("#")) {
                this.IsImage = false;
                this.logo = false;
                this.backgroundColor = true;
                this.color = this.data.icon;
              } else {
                this.logo = false;
                this.backgroundColor = false;
                this.color = "";
                this.imageIcon = this.data.icon;
                this.IsImage = true;
              }
            }
          }
          this.loading = false;
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
          this.loading = false;
        });
    },
    avatarModal() {
      this.modalVisible = true; // Show the modal by updating the data property
    },
    hideModal() {
      this.modalVisible = false; // Hide the modal by updating the data property
    },
    InputData(value) {
      for (const attribute in value) {
        this.data[attribute] = value[attribute];
      }
    },
    checkSlug() {
      let url = this.data.id
        ? `workspace/${this.data.id}/verify-slug`
        : "workspace/verify-slug";

      api
        .post(url, { slug: this.data.slug })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.valid) {
              this.error = false;
            } else {
              this.error = true;
            }
          }
        })
        .catch((error) => {
          this.error = true;
          console.log(error, "asdasdas");
        });
    },
    submitForm() {
      this.loading = true;
      this.isPosting = true;
      const data = { ...this.data };
      if (this.backgroundColor) {
        data.icon = this.color;
      }
      if (this.IsImage) {
        data.icon = this.imageIcon;
      }
      if (data.slug) {
        let i = data.slug.indexOf("issuestasks.com/");
        data.slug = data.slug.slice(i + 16);
      }
      let url = data.id ? `workspace/${data.id}` : "workspace";
      let fn = data.id ? api.put(url, data) : api.post(url, data);

      fn.then((response) => {
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
          this.getWorkSpaceGeneral();
        } else {
          this.loading = false;
          this.isPosting = false;
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
        }
      }).catch((error) => {
        console.log(error, "asdasdas");
        this.loading = false;
        this.isPosting = false;
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
    setColor(color) {
      this.backgroundColor = true;
      this.logo = false;
      this.IsImage = false;
      this.color = color;
      this.imageIcon = "";
      this.submitForm();
    },
    convertImage(file) {
      this.logo = false;
      this.backgroundColor = false;
      this.IsImage = true;
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageIcon = reader.result;
          this.submitForm();
        };
        reader.readAsDataURL(file);
      } else {
        this.imageIcon = ""; // Clear the preview if no image selected
      }
    },
    base64ToImage(base64String) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64String;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    },
    resizeImage(img, maxWidth, maxHeight) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      return canvas.toDataURL(); // Returns the resized image as a base64 string
    },
  },
};
</script>

<style>
button {
  background-color: #ffffff;
  color: #070707;
}
</style>
