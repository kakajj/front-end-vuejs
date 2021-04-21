<template>
  <nav class="menu-bar">
    <div class="group">
       <router-link  to="/" class="item-home">Home</router-link>
    </div>
    <div class="group">
        <router-link to="/product" class="item">Product</router-link>
        <router-link to="/about" class="item">About</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
.menu-bar {
    @apply bg-black  flex justify-between box-border mb-2 
}
.item, .item-home{
    @apply text-gray-300 bg-transparent text-sm inline-block box-border py-3 px-4
}
.item:hover,item-home:hover{
    @apply bg-gray-900
}

nav a.router-link-exact-active {
  color: white;
}
</style>