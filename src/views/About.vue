<template>
  <nav-bar></nav-bar>
  <div class="about">
    <h1>เจอกันอีกแล้วไอพวกเหี้ย</h1>
    <img alt="Vue logo" src="../assets/ped.png">
    <go-back></go-back>
  </div>
</template>
<script>

export default {
  components: { },
  name: 'About',
}
</script>

<style scoped>
img {
  @apply max-w-sm mx-auto
}
</style>
