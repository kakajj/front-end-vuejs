<template>
  <nav-bar></nav-bar>
  <div class="loader" v-if="loading"></div>
  <div class="px-4 py-1" v-if="!isLoading">
    <h1 class="text-left font-bold pt-2 text-2xl">
      ชื่อสินค้า : {{ product.brands.brandName }} {{ product.productName }}
    </h1>
    <div class="product">
      <div class="prod-img">
        <img @click="toggleView" :src="img" :alt="pic" />
      </div>
      <div class="description">
        <p>Brand : {{ product.brands.brandName }}</p>
        <p>Release Date : {{ product.date }}</p>
        <p>Warranty : {{ product.productWarranty.warrantyDescription }}</p>
        <p>Description : {{ product.productDescription }}</p>
        <div class="color">
          <p class="pt-1">Color Available :</p>
          <div v-for="color in product.colors" :key="color.colorId">
            <div
              class="box"
              :style="{ backgroundColor: color.colorHex }"
            ></div>
          </div>
        </div>
      </div>
      <div class="text-right text-xl pt-52 flex flex-col justify-end m-2 flex-auto ">
        <h2> Price : {{ product.productPrice }} บาท</h2>
      </div>
      
    </div>
    <div class="btn-all">
      <router-link 
             :to="{ name: 'EditProduct', params: { slug: product.productCode, product: product } }"
             class="btn-edit">
             Edit
             </router-link>
      <button class="btn-delete" @click="toggleModal">Delete</button>
      <go-back></go-back>
    </div>
    <decision-modal
      v-show="isModal"
      @close="toggleModal"
      @submit="removeProduct"
    >
      <template v-slot:header> Warning </template>
      <template v-slot:body>Delete from products?</template>
    </decision-modal>
    <view-pic
      v-show="isView"
      @switchModal="toggleView"
      :pic="product"
      :img="img"
    ></view-pic>
  </div>
</template>

<script>
const axios = require("axios");
import DecisionModal from "../components/DecisionModal.vue";
import ViewPic from "../components/ViewPic.vue";
export default {
  created() {
    this.fetchProduct();
  },
  components: { DecisionModal, ViewPic },
  props: {
    slug: {
      require: true,
      type: String,
    },
  },
  data() {
    return {
      isLoading: true,
      product: null,
      img: null,
      isModal: false,
      isView: false,
      loading:false,
    };
  },
  methods: {
    toggleView() {
      this.isView = !this.isView;
    },
    toggleModal() {
      this.isModal = !this.isModal;
    },
    removeImage(curentProduct) {
      this.loading = true;
      axios
        .delete(this.urlImage + "/delete/" + curentProduct + ".jpg")
        .then((response) => {
          this.loading = false;
          return response.data;
        })
        .then(() => {
          axios
            .delete(`${this.url}/delete/${curentProduct}`)
            .then((response) => {
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
      this.removeImage(this.slug);
    },
    fetchProduct() {
      this.loading = true;
      axios
        .get(process.env.VUE_APP_PRODUCT_API+"/get/"+this.slug)
        .then((response) => {
          this.product = response.data;
          this.img = process.env.VUE_APP_IMAGE_API+"/get/" + this.slug + ".jpg";
          this.isLoading = false;
          this.loading = false;
          return response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scope>
.description {
  @apply flex-grow flex-shrink block  max-w-3xl break-normal;
}
.prod-img {
  @apply relative  max-w-lg  overflow-visible cursor-pointer;
}
.product {
  @apply flex flex-row justify-start flex-nowrap items-stretch bg-gray-300 p-4;
}
p {
  @apply text-left px-4 text-lg;
}
.color {
  @apply flex flex-row space-x-4 pt-2;
}
.box {
  @apply w-8 h-8 font-extralight text-xs border-2 border-opacity-70 hover:border-black;
}
.btn-all {
  @apply flex flex-row space-x-4 justify-end;
}
.btn-delete {
  @apply w-14 h-8 mt-3 focus:outline-none text-red-600 text-sm   rounded-full border border-red-600 hover:bg-red-50;
}
.btn-edit {
  @apply w-14 h-8 mt-3 focus:outline-none text-green-600 text-sm  rounded-full border border-green-600 hover:bg-green-50;
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