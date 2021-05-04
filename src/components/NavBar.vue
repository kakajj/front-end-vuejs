<template>
    <nav class="menu-bar">
    <div class="group">
       <router-link  to="/product" class="item-home" >Home</router-link>
    </div>
    <div class="group">
        <router-link to="/form/add" class="item" >Add Product</router-link>
        <router-link to="/about" class="item" >About</router-link>
    </div>
  </nav>
  
</template>

<script>
export default {}
</script>

<style scoped>
.menu-bar {
  z-index: 999;
    @apply bg-black  flex justify-between box-border sticky top-0
}
.item, .item-home{
    @apply   text-white bg-transparent text-sm inline-block box-border py-3 px-4 text-xl
}
.item:hover{
    @apply  bg-gray-900
}
.item-home:hover{
    @apply bg-gray-900
}

.router-link-active {
  @apply bg-white text-black font-bold
}
.router-link-active:hover {
  @apply bg-black text-white font-bold
}
</style>