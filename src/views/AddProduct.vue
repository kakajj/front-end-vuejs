<template>
  <nav-bar></nav-bar>
  <div class="container flex flex-row">
    <div class="bg-gray-200 w-2/6 h-screen">
      <h1 class="title">Add New Product</h1>
      <h1 class="title">เพิ่มสินค้า</h1>
    </div>
    <div class="w-full p-6">
      <form id="form" enctype="multipart/form-data">
        <div class="mb-4">
          <label class="input-name" for="Date"> Brand Name </label>
          <select
            class="input"
            name="brand"
            id="brand"
            type="radio"
            placeholder="Select Brand"
            v-model="newProduct.brands"
            required
          >
            <option
              v-for="brand in brandArray"
              :key="brand.brandId"
              :value="brand"
            >
              {{ brand.brandName }}
            </option>
          </select>
          <!-- <div class="validate">{{errors.brandName}}</div> -->
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
          <!-- <div class="validate">{{errors.productName}}</div> -->
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
          <!-- <div class="validate">{{errors.productPrice}}</div> -->
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
          <!-- <div class="validate">{{errors.date}}</div> -->
        </div>
        <div class="mb-4">
          <label class="input-name" for="warranty"> Waranty </label>
          <select
            class="input"
            name="warranty"
            id="warranty"
            type="warranty"
            placeholder="Select Warranty"
            v-model="newProduct.productWarranty"
            required
          >
            <option
              v-for="waranty in warrantyArray"
              :key="waranty.warrantyId"
              :value="waranty"
            >
              {{ waranty.warrantyDescription }}
            </option>
            <!-- <div class="validate">{{errors.waranty}}</div> -->
          </select>
        </div>
        <div class="mb-4">
          <label class="input-name" for="Color"> Color Available </label>
          <div class="flex flex-row">
            <div class="flex flex-row" v-for="color in colorArray" :key="color.colorId">
              <input
                class="mt-2 mx-auto"
                type="checkbox"
                :value="color"
                v-model="newProduct.colors"
              />
              <div
                class="box"
                :style="{ backgroundColor: color.colorHex }"
              ></div>
            </div>
          </div>
          <!-- <div class="validate">{{errors.color}}</div> -->
        </div>
        <div class="mb-4">
          <label class="input-name" for="desc"> Description </label>
          <textarea
            class="input h-44"
            name="message2"
            id="message2"
            type="text"
            placeholder="product description"
            v-model="newProduct.productDescription"
            required
          ></textarea>
          <!-- <div class="validate">{{errors.desc}}</div> -->
        </div>
        <div class="mb-4">
          <label class="input-name" for="upload"> Upload Picture </label>
          <input
            type="file"
            id="file"
            ref="file"
            required
            v-on:change="handleFileUpload"
          />
        </div>
        <!-- <div class="validate">{{errors.upload}}</div> -->
        <div class="flex items-center justify-end">
          <button
            id="submit"
            class="btn-submit"
            type="submit"
            @click.prevent="sendProduct"
          >
            <em class="fab fa-whatsapp"></em> ส่งข้อมูล
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
      ColorUrl: "http://localhost:8082/colors/getall",
      productUrl: "http://localhost:8082/products/getall",
      brandUrl: "http://localhost:8082/brands/getall",
      warrantyUrl: "http://localhost:8082/warranty/getall",
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
      newProductCode: null,
      brandArray: [],
      colorArray: {},
      warrantyArray: [],
    };
  },
  methods: {
    clearData() {
      this.newProduct.productCode = null;
      this.newProduct.productName = "";
      this.newProduct.productDescription = "";
      this.newProduct.productPrice = 0;
      this.newProduct.date = "";
      this.newProduct.brands.brandId = "";
      this.newProduct.brandName = "";
      this.newProduct.productWarranty.warrantyId = null;
      this.newProduct.productWarranty.warrantyDescription = "";
      this.newProduct.colors.colorId = null;
      this.newProduct.colors.colorName = "";
      this.newProduct.colors.colorName = "";
      this.newProduct.colors.colorHex = "";
      return this.$router.go(-1);
    },
    fetchMultipleData() {
      const requestBrand = axios.get(this.brandUrl);
      const requestWarranty = axios.get(this.warrantyUrl);
      const requestColor = axios.get(this.ColorUrl);
      const requestLastProduct = axios.get(this.productUrl);
      axios
        .all([requestBrand, requestWarranty, requestColor, requestLastProduct])
        .then(
          axios.spread((...responses) => {
            return responses;
          })
        )
        .then((data) => {
          this.brandArray = data[0].data;
          this.warrantyArray = data[1].data;
          this.colorArray = data[2].data;
          var maxProductCode =
            data[3].data[data[3].data.length - 1].productCode;
          this.newProductCode = parseInt(maxProductCode);
          this.newProductCode++;
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    uploadPic() {
      let formData = new FormData();
      formData.append("File", this.file);
      axios
        .post(
          "http://localhost:8082/picture/add/" + this.newProductCode,
          formData,
          {
            "Content-Type": "multipart/form-data",
          }
        )
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          this.clearData();
        })
        .catch((errr) => {
          console.log(errr);
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    sendProduct() {
      this.newProduct.productCode = this.newProductCode;
      var filtered = this.newProduct.colors.filter((el) => {
        return el.colorId != null;
      });
      this.newProduct.colors = filtered;
      axios
        .post("http://localhost:8082/products/create", this.newProduct)
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          this.uploadPic();
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
.box {
  @apply mx-1 w-8 h-8 font-extralight text-xs border-2 border-opacity-70 hover:border-black;
}
.btn-submit {
  @apply bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none;
}
</style>