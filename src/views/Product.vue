
<template>
  <nav-bar nav-bar></nav-bar>
  <div class="mt-5 mb-24">
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
    <h1 class="py-4 text-center">
      มีสินค้าทั้งหมด {{ productList.length }} ชิ้น
    </h1>
    <!-- <pagination-footer :listData="productList"></pagination-footer> -->
    <div v-if="loading" class="loader"></div>
    <div class="flexbox">
      <div class="item" v-for="p in filteredList" :key="p">
        <div class="content" v-if="filteredList">
          <h1 class="text-2xl">{{ p.brands.brandName }} {{ p.productName }}</h1>
          <img
            class="blank-img cursor-pointer"
            @click="go(p.productCode)"
            :src="urlImage + '/get/' + p.productCode + '.jpg'"
            alt="picofproducts"
          />
          <p class="truncate mx-3">{{ p.productDescription }}</p>
          <div class="product-p">
            <p>Release: {{ p.date }}</p>
            <p>Price : {{ p.productPrice }} บาท</p>
            <p>Warranty : {{ p.productWarranty.warrantyDescription }}</p>
            <p>{{ p.colors.length }} colors available</p>
          </div>
          <div class="btn">
            <router-link
              :to="{ name: 'ViewProduct', params: { slug: p.productCode } }"
              class="btn-view"
            >
              View
            </router-link>
            <router-link
              :to="{
                name: 'EditProduct',
                params: { slug: p.productCode, product: p },
              }"
              class="btn-edit"
            >
              Edit
            </router-link>
            <button class="btn-delete" @click="showModal(p.productCode)">
              Delete
            </button>
          </div>
        </div>
        <div v-else> 
            <h1>No Product Found</h1>
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
    <pagination-footer :meta="meta"></pagination-footer>
  </div>
</template>

<script>
import SlideShow from "../components/SlideShow.vue";
import DecisionModal from "../components/DecisionModal";
import PaginationFooter from "../components/PaginationFooter.vue";

const axios = require("axios");

export default {
  components: { SlideShow, DecisionModal, PaginationFooter },
  created() {
    this.fetchProduct();
  },
  computed: {
    filteredList() {
      let Arr = this.productList.filter((item) => {
        return item.productName.toLowerCase().includes(this.searchField.toLowerCase());
      });
      return Arr;
    },
  },
  data() {
    return {
      meta: [],
      searchField: "",
      componentKey: 0,
      loading: false,
      message: "",
      isSearch: true,
      isModal: false,
      url: process.env.VUE_APP_PRODUCT_API,
      urlImage: process.env.VUE_APP_IMAGE_API,
      productList: [],
      currentProduct: null,
      imageArray: [],
    };
  },
  methods: {
    go(id) {
      this.$router.push({ name: "ViewProduct", params: { slug: id } });
    },
    fetchProduct() {
      this.loading = true;
      axios
        .get(`${this.url}/getall`)
        .then((response) => {
          this.productList = response.data;
          this.meta = response.data.meta;
          this.loading = false;
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
    removeImage(curentProduct) {
      this.loading = true;
      axios
        .delete(this.urlImage + "/delete/" + curentProduct + ".jpg")
        .then((response) => {
          return response.data;
        })
        .then(() => {
          axios
            .delete(`${this.url}/delete/${curentProduct}`)
            .then((response) => {
              this.loading = false;
              this.productList = this.productList.filter(
                (product) => product.productCode !== curentProduct
              );
              return response.data;
            })
            .then(() => {
              console.log("Remove Success");
              this.closeModal();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    removeProduct() {
      this.removeImage(this.currentProduct);
    },
    startSearch() {
      this.isSearch = !this.isSearch;
      this.searchField = '';
    },
  },
};
</script>

<style scoped>
.product-p {
  @apply font-light;
}
.flexbox {
  @apply flex flex-row flex-wrap justify-start items-stretch box-border mt-2;
}
.item {
  width: 33.33%;
  @apply box-border mb-4 px-4;
}
.blank-img {
  @apply bg-gray-600 max-w-lg max-h-64 mx-auto shadow-lg;
}
.content {
  @apply text-gray-900 bg-gray-200 font-semibold text-center box-border h-full py-4 space-y-2 rounded-md;
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
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  @apply w-72 h-72 mx-auto my-auto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-95;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>