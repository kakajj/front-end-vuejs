<template>
  <nav-bar></nav-bar>
  <div class="container flex flex-row">
    <div class="bg-gray-200 w-2/6 h-screen">
      <h1 class="title">Add New Product</h1>
      <h1 class="title">เพิ่มสินค้า</h1>
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
            v-model="newProduct.brandName"
            required
          >
            <option
              v-for="(brand, index) in brandArray"
              :key="index"
              :value="brand.brandName"
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
            v-model="newProduct.name"
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
            v-model="newProduct.Price"
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
            v-model="newProduct.manufactoryDate"
            required
          />
        </div>
        <div class="mb-4">
          <label class="input-name" for="Date"> Color </label>
          <div
            class="flex flex-row"
            v-for="(color, index) in colorArray"
            :key="index"
          >
            <input
              class="mt-2"
              type="checkbox"
              :value="color.colorHex"
              :style="{ backgroundColor: color.colorHex }"
              v-model="newProduct.colorHex"
            />
            <button
              class="box"
              :style="{ backgroundColor: color.colorHex }"
            ></button>
          </div>
        </div>
        <div class="mb-4">
          <label class="input-name" for="name"> Description </label>
          <textarea
            class="input h-44"
            name="message2"
            id="message2"
            type="text"
            placeholder="product description"
            v-model="newProduct.description"
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
            ref="file"
            placeholder="product image"
            required
            v-on:change="handleFileUpload"
          />
        </div>
        <div class="flex items-center justify-end">
          <button
            id="submit"
            class="btn-submit"
            type="submit"
            @click="uploadPic()"
          >
            <i class="fab fa-whatsapp"></i> ส่งข้อมูล
          </button>
        </div>
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
      file: '',
      newProduct: {
        brandId: "",
        brandName: "",
        name: "",
        description: "",
        colorHex: [],
        manufactoryDate: "",
        image: "ped.png",
        Price: "",
      },
      brandArray: [],
      colorArray: [],
      selectColor: "",
    };
  },
  methods: {
    clear() {
      let clearProduct = {
        brandId: "",
        brandName: "",
        name: "",
        description: "",
        colorHex: [],
        manufactoryDate: "",
        image: "ped.png",
        Price: "",
      };
      this.newProduct = clearProduct;
    },
    fetchBrand() {
      axios
        .get("http://localhost/brands/getall")
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
        .get("http://localhost/colors/getall")
        .then((response) => {
          this.colorArray = response.data;
          return response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    uploadPic() {
      var bodyFormData = new FormData();
      bodyFormData.append("File", this.file);
      axios.post('http://localhost/picture/add/1006',
          bodyFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function () {
          console.log('SUCCESS!!');
        })
        .catch(function () {
          console.log('FAILURE!!');
        });
    },
    handleFileUpload(){
       this.file = this.$refs.file.files[0];
    },
    sendData(product) {
      axios
        .post("http://localhost:3000/Product", product)
        .then((response) => {
          alert(response.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.clear();
          return this.$router.go(-1);
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
.box {
  @apply mx-1 w-8 h-8 font-extralight text-xs border-2 border-opacity-70 hover:border-black;
}
.btn-submit {
  @apply bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none;
}
</style>