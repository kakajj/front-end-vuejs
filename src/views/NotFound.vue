<template>
<nav-bar></nav-bar>
  <div class="h-screen">
      <h1 class="text-center text-6xl m-auto pt-48">Sorry, Page Not Found</h1>
      <h2 class="text-center text-3xl m-auto pt-20">
        <router-link :to="{name: 'Product'}">
        Back to Product's Page
        <li class="text-2xl material-icons">arrow_upward</li>
        </router-link>
      </h2>
  </div>
</template>

<script>
export default {}
</script>

<style>

</style>