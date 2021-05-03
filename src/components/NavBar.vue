<template>
    <nav class="menu-bar">
    <div class="group">
       <router-link  to="/product" class="item-home" >Home</router-link>
    </div>
    <div class="group">
        <router-link to="/form/add" class="item" >Add Product</router-link>
        <router-link to="/about" class="item" >About</router-link>
    </div>
    <!-- <div class="flex justify-end sm:hidden">
      <button id="hamburger" @click="toggleHam">
        <img class="toggle block fill-current text-white" :src="require('@/assets/hamberger.svg')" alt="hamber" width="60" height="60" />
        <img class="toggle hidden fill-current text-white" :src="require('@/assets/close.svg')" alt="close" width="60" height="60" />
      </button>
    </div>
    <div class="toggle hidden sm:flex w-full sm:w-auto text-right text-bold mt-5 sm:mt-0 border-t-2 border-white sm:border-none">        
        <a href="#" class="block sm:inline-block text-white  px-3 py-3 border-b-2 border-white sm:border-none">Home</a>
        <a href="#" class="block sm:inline-block text-white  px-3 py-3 border-b-2 border-white sm:border-none">Products</a>
        <a href="#" class="block sm:inline-block text-white  px-3 py-3 border-b-2 border-white sm:border-none">Pricing</a>
    </div> -->
    
    
  </nav>
  
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      Hover: false,
      toggle: 'toggle',
      hidden: 'hidden'
    }
  },
  methods:{
    toggleHam(){
      const navToggle = document.getElementsByClassName("toggle");
      for (let i = 0; i < navToggle.length; i++) {
      navToggle.item(i).classList.toggle("hidden");
  }
    },
  }
  }
</script>

<style scoped>
.menu-bar {
  z-index: 999;
    @apply bg-black  flex justify-between box-border sticky top-0
}
.item, .item-home{
    @apply  bg-transparent text-sm inline-block box-border py-3 px-4 text-xl
}
.item:hover{
    @apply bg-gray-900
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