<template>
  <div class="card">
    <SignUpWith  title="Sign Up" />

  </div>
</template>

<script>
import SignUpWith from "@/components/SignUpWith";
export default {
  name: 'SigUpCard',
  components: {SignUpWith},
  props: {
    title: String,
    description: String
  },
  methods: {
  },

}
</script>

<style scoped>
.card {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
}

.card-header {
  margin-bottom: 8px;
}

h3 {
  font-size: 18px;
}

p {
  font-size: 14px;
  color: #666;
}
</style>
