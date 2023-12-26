<template>
  <div class="container" style="height: 100vh;">
    <div class="row">
      <div class="col-md-6">
        <div class="card auth-form-alignment">
          <div class="card-body d-flex justify-content-center">
            <LogoEmailMobile></LogoEmailMobile>
          </div>
          <SignUpWith  title="Sign Up" />
        </div>
      </div>
      <div class="col-md-6 d-flex justify-content-center">
        <AboutCard />
      </div>
    </div>
  </div>
</template>

<script>
import AboutCard from "@/components/AboutCard";
import SignUpWith from "@/components/SignUpWith";
import LogoEmailMobile from "@/components/Fields/LogoEmailMobile";
export default {
  components: {LogoEmailMobile, SignUpWith, AboutCard}

  // Login component logic goes here
}
</script>

<style>
  .about {
    padding-left: 100px;
  }

  .card {
    background-color: rgba(0, 0, 0, 0);
    color: #ffffff;
    border: none;
  }
  .auth-form-alignment{
    left: 100px;
    top: 70px;
  }
  .card-header {
    margin-bottom: 8px;
  }

  h3 {
    font-size: 28px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
  @media screen and (max-width: 767px) {
    .auth-form-alignment{
      left: auto;
      top: 20%;
    }
  }

</style>