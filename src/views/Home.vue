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
  @apply w-screen h-screen bg-black
}
.greeting{
  @apply pt-52 text-white
}
img {
  @apply max-w-sm mx-auto 
}
.btn{
  @apply m-2 focus:outline-none text-sm py-2.5 px-5 rounded-md hover:bg-gray-600
}
</style>
