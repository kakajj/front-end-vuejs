<template>
  <nav-bar></nav-bar>
  <div class="loader" v-if="loading"></div>
  <div v-if="!isLoading">
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
  <div class="shop-container" v-if="!isLoading">
    <div class="product-container" >
      <div class="product-main">
        <div class="flex flex-col md:flex-row justify-center space-x-4">
          <div class="product-pic">
            <img class="prod-img" @click="toggleView" :src="img" :alt="pic" />
          </div>
          <div class="product-summary">
            <div>
              <h1>{{ product.brands.brandName }} {{ product.productName }}</h1>
              <h2>฿{{ product.productPrice }}</h2>
              <div class="color">
                <p class="pt-1">Color Available</p>
                <div class="flex flex-row flex-wrap justify-start space-x-2 space-x-2">
                  <div v-for="color in product.colors" :key="color.colorId">
                    <div
                      class="box"
                      :style="{ backgroundColor: color.colorHex }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-btn">
              <router-link
                :to="{
                  name: 'EditProduct',
                  params: { slug: product.productCode, product: product },
                }"
                class="product-edit"
              >
                <li class="text-5xl material-icons">edit</li>
              </router-link>
              <button class="product-delete" @click="toggleModal">
                <li class="text-5xl material-icons">delete_forever</li>
              </button>
              <button>
                <go-back></go-back>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-footer">
      <ul class="flex justify-center">
        <li class="-mb-px mr-1" v-for="desc in desc" :key="desc.id">
          <a
            class="footer"
            href="#"
            :class="{ 'footer-active': activeli == desc.id }"
            @click.prevent="activeNav(desc.id)"
            >{{desc.text}}</a
          >
        </li>
      </ul>
      <div class="footer-content">
          <div class="footer-desc" v-show="activeli==1">
            <h3>{{ product.brands.brandName }} {{ product.productName }}</h3>
            <p>รายละเอียดโดยรวม</p>
            <p>Brand        : {{ product.brands.brandName }}</p>
            <p>Release Date : {{ product.date }}</p>
            <p>Price        : ฿{{ product.productPrice }}</p>
            <p>Description</p>
            <p>{{ product.productDescription }}</p>
          </div>
          <div class="footer-warranty" v-show="activeli==2">
            <p>Warranty : {{ product.productWarranty.warrantyDescription }}</p>
          </div>
      </div>
    </div>
  </div>
  <div  class="spacer"> . </div>
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
  props: ["id"],
  data() {
    return {
      activeli: 1,
      product: null,
      img: null,
      isModal: false,
      isView: false,
      loading: false,
      isLoading: true,
      desc: [{id:1,text:"รายละเอียด"},{id:2,text:"การรับประกัน"}]
    };
  },
  methods: {
    activeNav(id){
        this.activeli = id;
    },
    toggleView() {
      this.isView = !this.isView;
    },
    toggleModal() {
      this.isModal = !this.isModal;
    },
    removeImage(curentProduct) {
      this.loading = true;
      axios
        .delete(process.env.VUE_APP_IMAGE_API + "/delete/" + curentProduct + ".jpg")
        .then((response) => {
          return response.data;
        })
        .then(() => {
          axios
            .delete(process.env.VUE_APP_PRODUCT_API+`/delete/${curentProduct}`)
            .then((response) => {
              return response.data;
            })
            .then(() => {
              this.loading = false;
              this.toggleModal();
              this.$router.push('/product')
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
      this.removeImage(this.id);
    },
    fetchProduct() {
      this.loading = true;
      axios
        .get(process.env.VUE_APP_PRODUCT_API + "/get/" + this.id)
        .then((response) => {
          this.img = process.env.VUE_APP_IMAGE_API + "/get/" + this.id + ".jpg";
          this.loading = false;
          return response.data;
        })
        .then((data) => {
          this.product = data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.spacer{
  margin-bottom: 40px; /* how high is your footer */
  visibility: hidden; 
}
.footer-desc h3{
    @apply text-xl text-gray-500 font-bold py-2
}
.footer-desc ,.footer-warranty p{
    @apply text-lg  font-normal
}
.footer-desc ,.footer-warranty{
    @apply py-4 px-4
}
.footer{
    @apply  bg-white inline-block py-2 px-4 text-black hover:text-gray-500 font-semibold
}
.footer-active{
    transition: 0.5s;
    @apply bg-white inline-block border-b-4 border-gray-500 rounded-t py-2 px-4 text-black font-semibold
}
.product-footer{
  transition: 0.5s;
    @apply mx-4 border-t-4  hover:border-gray-500 hover:bg-gray-50  xl:mx-52 ;
}
.product-main {
  @apply  mt-5 border-b-4 mx-4 p-4 hover:border-gray-500 md:p-8 xl:mx-52 lg:p-14 hover:bg-gray-100;
}
.product-edit {
  transition: 0.3s;
  @apply text-green-500 hover:text-green-200;
}
.product-delete {
  transition: 0.3s;
  @apply text-red-600 hover:text-red-300;
}

.product-pic {
  height: 500px;
  display: block;
  object-fit: contain;
  @apply max-w-full md:w-2/5 my-auto flex overflow-hidden
}
.prod-img {
  @apply  cursor-pointer mx-auto my-auto lg:max-w-full lg:max-h-full;
}
.product-btn {
  @apply space-x-8 mx-auto md:mx-1 ;
}
.product-summary {
  @apply max-w-full pt-4 md:w-2/5 flex flex-col justify-center lg:w-2/5 ;
}
.product-summary h1 {
  @apply text-2xl font-bold py-1 text-gray-600 xl:text-4xl;
}
.product-summary h2 {
  @apply text-xl font-bold py-1 xl:text-3xl;
}
.product-summary p {
  @apply text-sm font-normal py-1;
}
.color {
  @apply flex flex-col pt-2;
}
.box {
  transition: 0.2s;
  @apply w-8 h-8 lg:w-12 lg:h-12 border-2 border-opacity-80 hover:border-gray-400;
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