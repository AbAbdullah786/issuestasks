<template>
  <div class="cardnone card placement">
    <LogoEmail></LogoEmail>
    <div class="text-setting">
      <p class="font-style" >
        Lorem ipsum dolor sit amet consectetur.
        Non viverra neque sagittis in scelerisque.
        Aenean integer rhoncus facilisi massa.
        Turpis faucibus habitant malesuada nibh ultrices nec et proin scelerisque.
        Posuere cras ultrices condimentum vitae egestas. Vel ipsum leo erat sit sed ullamcorper ut.
        Eget mattis faucibus id lorem. Hac in vel neque leo id sodales nec et. Tortor amet vitae mattis at sed.
        Sed justo morbi morbi dolor vel eu quis utLorem ipsum dolor sit amet consectetur. Non viverra neque sagittis in scelerisque.
        Aenean integer rhoncus facilisi massa. Turpis faucibus habitant malesuada nibh ultrices nec et proin scelerisque.
        Posuere cras ultrices condimentum vitae egestas. Vel ipsum leo erat sit sed ullamcorper ut.
        Eget mattis faucibus id lorem. Hac in vel neque leo id sodales nec et. Tortor amet vitae mattis at sed.
        Sed justo morbi morbi dolor vel eu quis ut
      </p>
      <button class="custom-primary-btn" style="font-family: Roboto;" >Contact Us</button>
    </div>
  </div>
</template>

<script>
import LogoEmail from "@/components/Fields/LogoEmail";
export default {
  name: 'AboutCard',
  components: {LogoEmail},
  props: {
    title1: String,
    title2: String,
  }
}
</script>

<style scoped>
.placement{
  padding-top: 70px;
  padding-left: 120px;
  left: 90px;
}
.text-setting {
  padding-top: 100px;
}
.card {
  background-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  border: none;
}
.fw-bold{
  font-size: 32px;
}
.card i {
  font-style: normal;
}
.card-header {
  margin-bottom: 8px;
}

h3 {
  font-size: 18px;
}

.font-style{
  color: #F4F4F4;
  padding-top: 10px;
  text-align: left;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  width: auto;
  line-height: 25px;
  letter-spacing: 0em;

}
@media screen and (max-width: 767px) {
  .cardnone{
    display: none;
  }
}
</style>
