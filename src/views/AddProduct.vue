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
            v-model="newProduct.brands.brandName"
            required
          >
            <option
              v-for="brand in brandArray"
              :key="brand.brandId"
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
            v-model="newProduct.productName"
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
            v-model="newProduct.productPrice"
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
            v-model="newProduct.date"
            required
          />
        </div>
        <div class="mb-4">
          <label class="input-name" for="Date"> Waranty </label>
          <select
            class="input"
            name="warranty"
            id="warranty"
            type="warranty"
            placeholder="Select Warranty"
            v-model="newProduct.productWarranty.warrantyDescription"
            required
          >
            <option
              v-for="waranty in warrantyArray"
              :key="waranty.warrantyId"
              :value="waranty.warrantyId"
            >
              {{ waranty.warrantyDescription }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="input-name" for="Date"> Color Available </label>
          <div
            class="flex flex-row"
            v-for="color in colorArray"
            :key="color.colorId"
          >
            <input
              class="mt-2"
              type="checkbox"
              :value="color.colorHex"
              v-model="newProduct.colors.colorHex"
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
            v-model="newProduct.productDescription"
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
            @click="sendProduct"
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
export default {
  created() {
    this.fetchMultipleData();
  },
  data() {
    return {
      ColorUrl: "http://localhost/colors/getall",
      productUrl: "http://localhost/products/getall",
      brandUrl: "http://localhost/brands/getall",
      warrantyUrl: "http://localhost/warranty/getall",
      file: "",
      newProduct: {
        productCode: null,
        productName: "",
        productDescription: "",
        productPrice: null,
        date: "",
        brands: {
          brandId: "",
          brandName: "",
        },
        productWarranty: {
          warrantyId: null,
          warrantyDescription: "",
        },
        colors: [
          {
            colorId: null,
            colorName: "",
            colorHex: "",
          },
        ],
      },
      productList: null,
      lastProductCode: null,
      brandArray: [],
      colorArray: [],
      warrantyArray: [],
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
    fetchMultipleData() {
      const requestBrand = axios.get(this.brandUrl);
      const requestWarranty = axios.get(this.warrantyUrl);
      const requestColor = axios.get(this.ColorUrl);
      const requestLastProduct = axios.get(this.productUrl)
      axios
        .all([requestBrand, requestWarranty, requestColor, requestLastProduct])
        .then(
          axios.spread((...responses) => {
            return responses
          })
        ).then((data)=>{
          this.brandArray = data[0].data;
          this.warrantyArray = data[1].data
          this.colorArray = data[2].data
          this.lastProductCode =  data[3].data[data[3].data.length-1].productCode
          console.log(this.colorArray);
        })
        .catch((errors) => {
          console.log(errors)
        });
    },
    uploadPic() {
      var bodyFormData = new FormData();
      bodyFormData.append("File", this.file);
      axios
        .post("http://localhost/picture/add/1006", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    sendProduct() {
      console.log(this.newProduct);
      // axios
      //   .post("http://localhost:3000/Product")
      //   .then((response) => {
      //     alert(response.data);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   })
      //   .then(() => {
      //     this.clear();
      //     return this.$router.go(-1);
      //   });
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