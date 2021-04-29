<template>
    <nav class="menu-bar">
    <div class="group">
       <router-link  to="/" class="item-home" >Home</router-link>
    </div>
    <div class="group">
        <div @mouseover='toggleShow' class="item">Product</div>
        <router-link to="/form/add" v-show="showMenu" @mouseleave="toggleShow" class="item" >Add Product</router-link>
        <router-link to="/about" class="item" >About</router-link>
    </div>
  </nav>
  
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      Hover: false
    }
  },
  methods: {
		toggleShow() {
        this.showMenu = !this.showMenu;
      }
		},
  }
</script>

<style scoped>
.menu-bar {
    @apply bg-black text-white  flex justify-between box-border 
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