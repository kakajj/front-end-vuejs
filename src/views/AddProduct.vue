<template>
  <nav-bar></nav-bar>
  <div class="container flex flex-row">
    <div class="bg-gray-200 w-2/6 h-screen">
      <head>
        <h1 class="title">Add New Product เพิ่มสินค้า</h1>
      </head>
    </div>
    <div class="w-full p-6">
      <form id="form">
        <div class="mb-4">
          <label class="input-name" for="Date"> Brand Name </label>
          <select
            class="input"
            name="brand"
            id="brand"
            type="radio"
            placeholder="Select Brand"
            required
          >
            <option
              v-for="(brand, index) in brandArray"
              :key="index"
              :value="brand.brandId"
            >
              {{ brand.brandName }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="input-name" for="Date"> Product Name </label>
          <input
            class="input"
            name="name"
            id="name"
            placeholder="Product Name"
            required
          />
        </div>
        <div class="mb-4">
          <label class="input-name" for="Date"> Product Price </label>
          <input
            class="input"
            name="price"
            id="price"
            type="number"
            placeholder="Product Price"
            required
          />
        </div>
        <div class="mb-4">
          <label class="input-name" for="Date"> Manufactory Date </label>
          <input
            class="input"
            name="date"
            id="date"
            type="date"
            placeholder="Ingresa tu Fecha de Nacimiento"
            required
          />
        </div>
        <div class="mb-4">
          <label class="input-name" for="Date"> Color </label>
          <select
             :style="{ backgroundColor: selectColor }"
            v-model="selectColor"
            class="input"
            name="color"
            id="color"
            type="checkbox"
            placeholder="Select color"
            required
          >
            <option
              v-for="(color, index) in colorArray"
              :key="index"
              :value="color.colorHex"
            >
              {{ color.colorName }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="input-name" for="name"> Description </label>

          <textarea
            class="input"
            name="message2"
            id="message2"
            type="text"
            placeholder="product description"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="input-name" for="name"> Upload Picture </label>

          <input
            class="input"
            name="file"
            id="file"
            type="file"
            placeholder="product image"
            required
          >
        </div>
        <!-- <div class="flex items-center justify-end">
                <button id="submit"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    <i class="fab fa-whatsapp"></i> Enviar a WhatsApp
                </button>
            </div> -->
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import NavBar from "../components/NavBar.vue";
export default {
  components: { NavBar },
  created() {
    this.fetchBrand();
    this.fetchColor();
  },
  data() {
    return {
      brandArray: [],
      colorArray: [],
      selectColor: '', 
    };
  },
  methods: {
    fetchBrand() {
      axios
        .get("http://localhost:3000/Brand")
        .then((response) => {
          this.brandArray = response.data;
          return response.data;
        })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
    fetchColor() {
      axios
        .get("http://localhost:3000/Color")
        .then((response) => {
          this.colorArray = response.data;
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
.title {
  @apply text-left font-extrabold text-2xl pl-4 pt-9;
}
form {
  @apply bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4;
}
.input-name {
  @apply text-left block text-gray-700 text-sm font-bold mb-2;
}
.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md;
}
</style>