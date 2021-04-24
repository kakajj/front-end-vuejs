<template>
  <nav-bar></nav-bar>
  <div class="container px-4 py-1">
    <h1 class="text-left font-bold">
      ชื่อสินค้า : {{ product.brandName }} {{ product.name }}
    </h1>
    <div class="product">
      <div class="prod-img">
        <img :src="img" :alt="pic" />
      </div>
      <div class="description">
        <p>Brand : {{ product.brandName }}</p>
        <p>Release Date : {{ product.manufactoryDate }}</p>
        <p>Description : {{ product.description }}</p>
        <div class="color">
          <p class="pt-1">color :</p>
          <div v-for="(color, index) in product.colorHex" :key="index">
            <button class="box" :style="{ backgroundColor: color }"></button>
          </div>
        </div>
      </div>
      <h2 class="text-right text-xl pt-52 ">
        Price : {{ product.Price }} บาท
      </h2>
    </div>
    <div class="btn-all">
      <button class="btn-edit">Edit</button>
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
  </div>
</template>

<script>
import DecisionModal from '../components/DecisionModal.vue';
import GoBack from "../components/GoBack.vue";
const axios = require("axios");
import NavBar from "../components/NavBar.vue";
export default {
  components: { NavBar, GoBack, DecisionModal },
  created() {
    this.fetchProduct();
  },
  props: {
    slug: {
      require: true,
      type: String,
    },
  },
  data() {
    return {
      product: [],
      img: null,
      isModal: false,
    };
  },
  methods: {
    toggleModal(){
      this.isModal = !this.isModal
    },
    removeProduct(){
      axios
        .delete("http://localhost:3000/Product/" + this.slug)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$router.push({name:'Product'})
          this.closeModal();
        });
    },
    fetchProduct() {
      axios
        .get("http://localhost:3000/Product/" + this.slug)
        .then((response) => {
          this.product = response.data;
          this.img = require("@/assets/" + response.data.image);
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
.prod-img {
  @apply relative w-96 h-60 overflow-hidden;
}
.product {
  @apply flex flex-row justify-between bg-gray-300 p-4;
}
p {
  @apply text-left px-4 text-sm;
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
</style>