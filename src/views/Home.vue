<template>
  <div class="home">
    <div class="greeting">
      <h1>ยินดีต้อนรับ</h1>
     <button type="button" class="btn"
     @click="go">Enter Website</button>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  methods:{
    go(){
      this.$router.push('Product')
    }
  }
}
</script>

<style scoped>
.home{
  @apply w-screen h-screen bg-black text-center
}
.greeting{
  @apply text-white pt-64 text-2xl lg:text-xl
}
.btn{
  transition: 0.5s;
  @apply bg-gray-800 w-60 h-full m-2 focus:outline-none py-2.5 rounded-md hover:bg-gray-500 text-2xl lg:text-xl lg:w-48 hover:text-black
}
</style>
