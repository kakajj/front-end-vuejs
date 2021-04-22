<template>
  <nav-bar nav-bar></nav-bar>
  <div>
    <slide-show></slide-show>
    <div class="flexbox">
      <div class="item" v-for="(p, index) in productList" :key="index">
        <div class="content">
          <p>{{ p.brandName }} {{ p.name }}</p>
          <img class="blank-img" :src="require('../assets/ped.png')"/>
          <p>{{ p.description }}</p>
          <p>Release: {{ p.manufactoryDate }}</p>
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
import SlideShow from '../components/SlideShow.vue';
const axios = require("axios");
// import PaginationFooter from "../components/PaginationFooter.vue";
export default {
  components: { SlideShow },
  // components: { PaginationFooter },
  created() {
    this.fetchProduct();
  },
  data() {
    return {
      url: "http://localhost:3000/Product",
      page: [],
      productList: [],
    };
  },
  methods: {
    fetchProduct() {
      axios
        .get(this.url)
        .then((response) => {
          this.productList = response.data;
          return response.data;
        })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.flexbox {
  @apply flex flex-row flex-wrap justify-start items-stretch box-border mt-2;
}
.item {
  width: 33.33%;
  @apply box-border mb-4 px-4;
}
.blank-img {
  @apply bg-gray-600 max-w-md max-h-20 mx-auto;
}
.content {
  @apply text-gray-900 bg-blue-100 font-semibold text-center box-border h-full p-2 rounded-md;
}
.btn {
  @apply flex justify-center text-sm inline-block;
}
.btn-view {
  @apply mr-2 mt-2 focus:outline-none text-green-600 text-sm py-1 px-5 rounded-full border border-green-600 hover:bg-green-50;
}
.btn-edit {
  @apply mr-2 mt-2 focus:outline-none text-blue-600 text-sm py-1 px-5 rounded-full border border-blue-600 hover:bg-blue-50;
}
.btn-delete {
  @apply mr-2 mt-2 focus:outline-none text-red-600 text-sm py-1 px-5 rounded-full border border-red-600 hover:bg-red-50;
}
</style>