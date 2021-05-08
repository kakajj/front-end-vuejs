
<template>
  <nav-bar nav-bar></nav-bar>
  <div class="mt-5">
    <slide-show></slide-show>
    <div
      id="search"
      class="text-center bg-black w-3/4 h-10 mx-auto my-2 rounded-lg sm:w-2/4"
    >
      <span
        v-if="!isSearch"
        class="material-icons py-2 w-full text-gray-600 hover:text-white transition duration-500"
        @click="startSearch"
        >search</span
      >
      <div v-else class="w-full flex flex-row justify-center py-1">
        <input
          class="border-2 w-11/12 m-1 h-6 focus:outline-none focus:ring focus:border-black text-sm rounded-lg"
          v-model="searchField"
          type="text"
          placeholder="Enter keyword..."
          @keyup.enter="searchItem"
        />
        <button
          @click.prevent="cancelSearch"
          class="material-icons text-gray-700 hover:text-white transition duration-500"
        >
          cancel
        </button>
      </div>
    </div>
    <h1 class="p-4 text-xl text-center">
      พบสินค้าทั้งหมด {{ totalProduct }} ชิ้น
    </h1>
    <div v-show="loading" class="loader"></div>
    <decision-modal
      v-show="isModal"
      @close="closeModal"
      @submit="removeProduct"
    >
      <template v-slot:header> Warning </template>
      <template v-slot:body>Delete from products?</template>
    </decision-modal>
    <div class="p-item-area">
      <div class="item" v-for="p in productList" :key="p">
        <div class="p-item">
          <h1 class="text-lg md:text-xl lg:text-2xl">
            {{ p.brands.brandName }} {{ p.productName }}
          </h1>
          <img
            class="blank-img cursor-pointer"
            @click="go(p.productCode)"
            :src="urlImage + '/get/' + p.productCode + '.jpg'"
            alt="picofproducts"
          />
          <p class="truncate mx-3">{{ p.productDescription }}</p>
          <div class="font-light">
            <p>Release: {{ p.date }}</p>
            <p>Price : {{ p.productPrice }} บาท</p>
            <p>Warranty : {{ p.productWarranty.warrantyDescription }}</p>
            <p>{{ p.colors.length }} colors available</p>
          </div>
          <div class="flex justify-center inline-block">
            <div class="btn-view">
              <router-link
                :to="{
                  name: 'ViewProductDetail',
                  params: { id: p.productCode },
                }"
              >
                <li class="text-3xl md:text-xl lg:text-3xl material-icons">
                  open_in_new
                </li>
              </router-link>
            </div>
            <div class="btn-edit">
              <router-link
                :to="{
                  name: 'EditProduct',
                  params: { slug: p.productCode },
                }"
              >
                <li class="text-3xl md:text-xl lg:text-3xl material-icons">
                  edit
                </li>
              </router-link>
            </div>
            <div class="btn-delete">
              <button @click="showModal(p.productCode)">
                <li class="text-3xl md:text-xl lg:text-3xl material-icons">
                  delete_forever
                </li>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination-footer
      :current-page="pageNo"
      :lastpage="totalPage"
      @pagination="pagination"
    ></pagination-footer>
  </div>
  <div class="spacer">.</div>
</template>

<script>
import SlideShow from "../components/SlideShow.vue";
import DecisionModal from "../components/DecisionModal";
import PaginationFooter from "../components/PaginationFooter.vue";

const axios = require("axios");

export default {
  components: {
    SlideShow,
    DecisionModal,
    PaginationFooter,
  },
  created() {
    this.fetchProduct();
    this.fetchPaginationInfo();
  },
  data() {
    return {
      totalProduct: 0,
      pageSize: 6,
      totalPage: 0,
      pageNo: 0,
      searchField: "",
      loading: false,
      isSearch: false,
      isModal: false,
      url: config.VUE_APP_API + "/products",
      urlImage: config.VUE_APP_API + "/picture",
      productList: [],
      currentProduct: null,
      imageArray: [],
    };
  },
  methods: {
    searchItem() {
      this.pageNo = 0;
      this.fetchProduct();
      this.fetchPaginationInfo();
    },
    go(id) {
      this.$router.push({ name: "ViewProductDetail", params: { id: id } });
    },
    pagination(page) {
      this.pageNo = page;
      this.fetchProduct();
      location.href = "#";
      location.href = "#search";
    },
    fetchPaginationInfo() {
      axios
        .get(
          `${this.url}/pageSearchInfo?title=${this.searchField}&pageSize=${this.pageSize}`
        )
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.totalProduct = data.totalElements;
          this.totalPage = data.totalPage;
          return data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fetchProduct() {
      this.loading = true;
      axios
        .get(
          `${this.url}/searchProductWithPage?title=${this.searchField}&pageSize=${this.pageSize}&pageNo=${this.pageNo}`
        )
        .then((response) => {
          this.productList = response.data;
          this.loading = false;
          return response.data;
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
              this.productList = this.productList.filter(
                (product) => product.productCode !== curentProduct
              );
              return response.data;
            })
            .then(() => {
              this.pageNo = 0;
              this.fetchProduct();
              this.fetchPaginationInfo();
              this.loading = false;
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
      this.searchField = "";
    },
    cancelSearch() {
      this.isSearch = !this.isSearch;
      this.searchField = "";
      this.fetchProduct();
      this.fetchPaginationInfo();
    },
  },
};
</script>

<style scoped>
.p-item {
  @apply bg-gray-50 text-gray-900 font-semibold box-border h-full py-4 space-y-2 rounded-md hover:bg-gray-200 transition duration-300;
}
.p-item-area {
  @apply flex flex-col md:flex-row flex-wrap justify-start  box-border mt-2 text-center;
}
.spacer {
  margin-bottom: 80px;
  visibility: hidden;
}
.item {
  @apply items-stretch mx-auto md:-mx-0 w-80 md:w-1/3 box-border mb-4 px-4;
}
.blank-img {
  @apply relative  h-64 md:h-32 lg:h-64 mx-auto shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110;
}
.btn-view {
  @apply mr-2 mt-2 focus:outline-none text-green-600 text-sm  px-5 rounded-full border border-green-600 hover:bg-green-50;
}
.btn-edit {
  @apply mr-2 mt-2 focus:outline-none text-blue-600 text-sm  px-5 rounded-full border border-blue-600 hover:bg-blue-50;
}
.btn-delete {
  @apply mr-2 mt-2 focus:outline-none text-red-600 text-sm  px-5 rounded-full border border-red-600 hover:bg-red-50;
}
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  @apply w-20 h-20 mx-auto my-auto overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-transparent bg-opacity-95;
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