<template>
  <div v-if="visible" class="modal fade show" id="modalCenter" tabindex="-1" style="display: block; padding-left: 0px;" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
         <p1>{{ message }}</p1>
        </div>
        <div class="modal-footer">
          <button type="button" class="custom-secondary-btn" @click="closeModal" style="font-family: Roboto; background-color: #8C8989E6; border-radius: 5px; --bs-btn-hover-bg: #ffffff;">
            Close
          </button>
          <button class="custom-secondary-btn" type="submit" style="font-family: Roboto;" ><strong>Delete</strong></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  props: {
    message: String,
    visible: Boolean
  },
  data: () => ({
    'signup' : true,
    'email' : false,
    'login' : false
  }),
    methods: {
      closeModal() {
        this.$emit('close'); // Emit an event to notify the parent component to close the modal
      },
  },

}
</script>
<style>
.modal {
  /* Add styles to display the modal as an overlay */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background to create the overlay effect */
}

/* .modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
} */
</style>

