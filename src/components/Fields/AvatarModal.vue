<template>
  <div
    v-if="visible"
    class="modal fade show"
    id="modalCenter"
    tabindex="-1"
    style="display: block; padding-left: 0px"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      role="document"
      style="margin-bottom: 0px; margin-top: 0px"
    >
      <div class="modal-content p-5">
        <div
          class="box text-center py-4"
          @drop="handleImageDrop"
          @dragover.prevent
        >
          <div v-if="!isUploaded && !file">
            <input
              type="file"
              id="inputFile"
              @change="SelectImage"
              style="display: none"
            />
            <label for="inputFile">Upload</label>
            <br />
            Or
            <br />
            Drop your Files Here
            <div>
              <svg
                width="37"
                height="39"
                viewBox="0 0 37 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.625 3.125H11.7C8.12966 3.125 6.34449 3.125 4.98081 3.81983C3.78127 4.43103 2.80603 5.40627 2.19483 6.60581C1.5 7.96949 1.5 9.75466 1.5 13.325V26.925C1.5 30.4954 1.5 32.2804 2.19483 33.6442C2.80603 34.8438 3.78127 35.819 4.98081 36.4301C6.34449 37.125 8.12966 37.125 11.7 37.125H25.3C28.8704 37.125 30.6554 37.125 32.0192 36.4301C33.2188 35.819 34.194 34.8438 34.8051 33.6442C35.5 32.2804 35.5 30.4954 35.5 26.925V18"
                  stroke="#BAB8B8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.5 28.664L10.6224 19.6757C11.4523 18.8581 12.7977 18.8581 13.6276 19.6757L20.625 26.5703M20.625 26.5703L26.5599 20.7226C27.3897 19.905 28.7353 19.905 29.5651 20.7226L35.5 26.5703M20.625 26.5703L25.4062 31.2812"
                  stroke="#BAB8B8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M31.25 11.625V1M31.25 1L27 5.25M31.25 1L35.5 5.25"
                  stroke="#BAB8B8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div v-if="isUploaded && file">
            <div class="card d-flex justify-content-center align-items-center">
              <img
                id="profPicModalPreview"
                class="card-img-top w-50"
                :src="fileSrc"
              />
              <div class="card-body py-2">
                <a class="btn btn-primary" @click="removeImage">Remove</a>
              </div>
            </div>
          </div>
        </div>
        <div class="color">
          <div
            style="
              text-align: left;
              margin-bottom: 4px;
              font-weight: 400;
              font-size: small;
            "
          >
            Choose Colour
          </div>
          <span
            v-for="color in colors"
            :key="color"
            :id="color"
            :style="{ backgroundColor: getColorValue(color) }"
            @click="placeColor(color)"
            class="circle"
          >
          </span>
        </div>
      </div>
    </div>
    <div class="text-center" style="margin-top: 0px">
      <button
        type="button"
        class="custom-secondary-btn me-4"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        class="custom-primary-btn"
        type="button"
        :disabled="!isUploaded"
        @click="onSaveClick"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AvatarModal",
  props: {
    message: String,
    visible: Boolean,
  },
  data() {
    return {
      colors: [
        "bg1",
        "bg2",
        "bg3",
        "bg4",
        "bg5",
        "bg6",
        "bg7",
        "bg8",
        "bg9",
        "bg10",
        "bg11",
        "bg12",
        "bg13",
        "bg14",
        "bg15",
        "bg16",
        "bg17",
        "bg18",
        "bg19",
        "bg20",
        "bg21",
        "bg22",
        "bg23",
        "bg24",
        "bg25",
        "bg26",
        "bg27",
      ],
      isUploaded: false,
      file: null,
      fileName: "",
      fileSrc: "",
    };
  },
  methods: {
    getColorValue(color) {
      const colorMap = {
        bg1: "#F96332",
        bg2: "#D08383",
        bg3: "#892626",
        bg4: "#DBDBDB",
        bg5: "#E7B657",
        bg6: "#8467BC",
        bg7: "#2F83E4",
        bg8: "#67BC7F",
        bg9: "#F39D90",
        bg10: "#D29E8D",
        bg11: "#D08383",
        bg12: "#892626",
        bg13: "#FFCCA9",
        bg14: "#E7B657",
        bg15: "#21123F",
        bg16: "#2F83E4",
        bg17: "#0A6824",
        bg18: "#C73D28",
        bg19: "#FFDD6A",
        bg20: "#D08383",
        bg21: "#892626",
        bg22: "#DBDBDB",
        bg23: "#F96332",
        bg24: "#19AEBB",
        bg25: "#34F069",
        bg26: "#67BC7F",
        bg27: "#F39D90",
      };
      return colorMap[color] || "";
    },
    removeImage() {
      this.isUploaded = false;
      this.file = null;
      this.fileName = "";
      this.fileSrc = "";
      // this.$emit("convertImage", null);
    },
    SelectImage(ev) {
      const inputFile = ev.target?.files && ev.target.files[0];
      if (inputFile) {
        this.file = inputFile;
        this.fileName = inputFile.name;
        const reader = new FileReader();
        reader.onload = () => {
          this.fileSrc = reader.result;
          this.isUploaded = true;
        };
        reader.readAsDataURL(inputFile);
      }
    },
    placeColor(color) {
      // Get the color value based on the clicked id
      const colorValue = this.getColorValue(color);
      if (colorValue) {
        this.$emit("setColor", colorValue);
        this.$emit("close");
        // Do something with the selected color
      }
    },
    handleImageDrop(event) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      this.uploadImage(file);
    },
    uploadImage(file) {
      this.$emit("convertImage", file);
    },
    closeModal() {
      this.$emit("close"); // Emit an event to notify the parent component to close the modal
    },
    onSaveClick() {
      this.uploadImage(this.file);
      this.closeModal();
    },
  },
};
</script>
<style>
.modal {
  /* Add styles to display the modal as an overlay */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* Semi-transparent background to create the overlay effect */
}
</style>
