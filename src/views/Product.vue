<template>
  <div>
    <h1>This is Product Page</h1>
    <div class="flexbox">
      <div class="item" v-for="p in productList" :key="p">
        <div class="content">
          <p>{{ p }}</p>
          <div class="blank-img">IMG</div>
          <div class="btn">
            <button class="btn-view">View</button>
            <button class="btn-edit">Edit</button>
            <button class="btn-delete">Delete</button>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
         productList: [1,2,3,4,5,6,7,8,9]   
      }
  },
};
</script>

<style scoped>
.flexbox{
    @apply flex flex-row flex-wrap justify-start items-stretch box-border mt-2
}
.item{
    width: 33.33%;
    @apply box-border mb-4 px-4
}
.blank-img{
    @apply bg-gray-600 w-full h-32
}
.content{
    @apply text-gray-900 bg-blue-100 font-semibold text-center box-border h-full p-2
}
.btn{
    @apply flex justify-center text-sm inline-block
}
.btn-view{
    @apply mr-2 mt-2 focus:outline-none text-green-600 text-sm py-1 px-5 rounded-full border border-green-600 hover:bg-green-50
}
.btn-edit{
    @apply mr-2 mt-2 focus:outline-none text-blue-600 text-sm py-1 px-5 rounded-full border border-blue-600 hover:bg-blue-50
}
.btn-delete{
    @apply mr-2 mt-2 focus:outline-none text-red-600 text-sm py-1 px-5 rounded-full border border-red-600 hover:bg-red-50
}
</style>