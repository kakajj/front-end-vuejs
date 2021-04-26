<template>
  <nav-bar nav-bar></nav-bar>
  <div class="container my-5">
    <slide-show class="w-11/12 mx-auto"></slide-show>
    <div class="text-center bg-black w-11/12 h-10 mx-auto my-2 rounded-full">
      <span
        v-if="isSearch"
        class="material-icons py-2 w-full hover:text-white transition duration-500"
        @click="startSearch"
        >search</span
      >
      <div v-else class="w-full flex flex-row justify-center py-1">
        <input
          class="border-2 w-11/12 m-1 h-6 focus:outline-none focus:ring focus:border-black text-sm"
          v-model="searchField"
          type="text"
          placeholder="Enter keyword..."
        />
        <button
          @click="startSearch"
          class="material-icons text-gray-700 hover:text-white transition duration-500"
        >
          cancel
        </button>
      </div>
    </div>
    <h1>มีสินค้าทั้งหมด {{ productList.length }} ชิ้น</h1>
    <pagination-footer :listData="productList"></pagination-footer>
    <div class="flexbox">
      <div class="item" v-for="(p, index) in productList" :key="index">
        <div class="content">
          <p>{{ p.brands.brandName }} {{ p.productName }}</p>
          <img
            class="blank-img cursor-pointer"
            @click="go(p.productCode)"
            :src= "require('../../../back-end-springboot-dev/pictures/' + p.productCode +'.jpg')"/>
          <p class="truncate">{{ p.productDescription }}</p>
          <div class="product-p">
            <p>Release: {{ p.date }}</p>
            <p>Price : {{p.productPrice}} บาท</p>
            <p>Warranty : {{p.productWarranty.warrantyDescription}}</p>
            <p>{{p.colors.length}} colors available</p>
          </div>
          <div class="btn">
            <router-link
              :to="{ name: 'ViewProduct', params: { slug: p.productCode } }"
              class="btn-view"
            >
              View
            </router-link>
            <button class="btn-edit">Edit</button>
            <button class="btn-delete" @click="showModal(p.productCode)">
              Delete
            </button>
          </div>
        </div>
      </div>
      <decision-modal
        v-show="isModal"
        @close="closeModal"
        @submit="removeProduct"
      >
        <template v-slot:header> Warning </template>
        <template v-slot:body>Delete from products?</template>
      </decision-modal>
    </div>
  </div>
</template>

<script>
import SlideShow from "../components/SlideShow.vue";
import DecisionModal from "../components/DecisionModal";
import PaginationFooter from "../components/PaginationFooter.vue";

const axios = require("axios");
// import PaginationFooter from "../components/PaginationFooter.vue";
export default {
  components: { SlideShow, DecisionModal, PaginationFooter },
  // components: { PaginationFooter },
  created() {
    this.fetchProduct();
    // this.fetchImage();
  },
  data() {
    return {
      isSearch: true,
      isModal: false,
      url: "http://localhost/products",
      urlImage: "http://localhost/picture/get/",
      productList: [],
      currentProduct: null,
      imageArray: [],
      imageLocation: "../../../back-end-springboot-dev/pictures/",
    };
  },
  methods: {
    go(id) {
      this.$router.push({ name: "ViewProduct", params: { slug: id } });
    },
    fetchProduct() {
      axios
        .get(`${this.url}/getall`)
        .then((response) => {
          this.productList = response.data;
          return response.data;
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    showModal(id) {
      this.currentProduct = id;
      this.isModal = true;
    },
    closeModal() {
      this.currentProduct = null;
      this.isModal = false;
    },
    // imageEncode(arrayBuffer) {
    // let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
    // let mimetype="image/jpeg"
    // return "data:"+mimetype+";base64,"+b64encoded
    // },
    // fetchImage(){
    //   axios
    //     .get(`${this.urlImage}1001.jpg`,{
    //      responseType: 'arraybuffer'
    //     })
    //     .then((response) => {
    //       let this.mypic =  this.imageEncode(response.data);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },
    removeProduct(id) {
      id = this.currentProduct;
      axios
        .delete(`${this.url}/delete/${this.currentProduct}`)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.productList = this.productList.filter(
            (product) => product.id !== id
          );
          this.closeModal();
        });
    },
    startSearch() {
      this.isSearch = !this.isSearch;
    },
  },
};
</script>

<style scoped>
.product-p{
  @apply font-light text-sm
}
.flexbox {
  @apply flex flex-row flex-wrap justify-start items-stretch box-border mt-2;
}
.item {
  width: 33.33%;
  @apply box-border mb-4 px-4;
}
.blank-img {
  @apply bg-gray-600 max-w-lg max-h-40 mx-auto;
}
.content {
  @apply text-gray-900 bg-gray-200 font-semibold text-center box-border h-full p-2 rounded-md;
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