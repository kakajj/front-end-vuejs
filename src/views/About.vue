<template>
  <nav-bar></nav-bar>
  <div class="about">
    <h1>เจอกันอีกแล้วไอพวกเหี้ย</h1>
    <img alt="Vue logo" src="../assets/ped.png">
    <go-back></go-back>
  </div>
</template>
<script>
import GoBack from '../components/GoBack.vue'

export default {
  components: { GoBack },
  name: 'About',
}
</script>

<style scoped>
img {
  @apply max-w-sm mx-auto
}
</style>