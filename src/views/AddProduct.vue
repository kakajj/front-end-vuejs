<template>
  <nav-bar></nav-bar>
  <div class="loader" v-if="loading"></div>
  <div class="flex flex-row">
    <div class="bg-gray-200 w-2/6 pt-10">
      <h1 class="title">{{ slug }}</h1>
      <h1 class="title">{{ welcomeMsg }}</h1>
    </div>
    <div class="w-full p-6">
      <form name="form" id="form" enctype="multipart/form-data">
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
          <div class="validate">{{ errors.brandName }}</div>
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
          <div class="validate">{{ errors.productName }}</div>
          <div class="validate">{{ errors.productNameDuplicate }}</div>
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
          <div class="validate">{{ errors.productPrice }}</div>
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
          <div class="validate">{{ errors.date }}</div>
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
          </select>
          <div class="validate">{{ errors.waranty }}</div>
        </div>
        <div class="mb-4">
          <label class="input-name" for="Color"> Color Available </label>
          <div class="flex flex-row">
            <div
              class="flex flex-row"
              v-for="color in colorArray"
              :key="color.colorId"
            >
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
          <div class="validate">{{ errors.color }}</div>
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
          <div class="validate">{{ errors.desc }}</div>
        </div>
        <div class="mb-4">
          <label class="input-name" for="upload"> Upload Picture </label>
          <input
            type="file"
            id="file"
            ref="file"
            name="file"
            required
            v-on:change="handleFileUpload"
          />
          <div class="validate">{{ errors.upload }}</div>
        </div>

        <div class="flex items-center justify-end">
          <button
            id="submit"
            class="btn-submit"
            type="submit"
            @click.prevent="checkForm"
          >
            <em class="fab fa-whatsapp"></em> ส่งข้อมูล
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import validate from "../myValidate.js";
const axios = require("axios");
export default {
  created() {
    this.fetchMultipleData();
  },
  props: ["slug"],
  computed: {
    welcomeMsg() {
      this.watchProp();
      return this.isEdit ? "Edit Product" : "Add Product";
    },
  },
  data() {
    return {
      ColorUrl: process.env.VUE_APP_COLOR_API + "/getall",
      productUrl: process.env.VUE_APP_PRODUCT_API + "/getall",
      brandUrl: process.env.VUE_APP_BRAND_API + "/getall",
      warrantyUrl: process.env.VUE_APP_WARRANTY_API + "/getall",
      file: "",
      isEdit: false,
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
      valid: true,
      success: false,
      errors: {},
      message: null,
      loading: false,
    };
  },
  methods: {
    watchProp() {
      this.slug == undefined ? (this.isEdit = false) : (this.isEdit = true);
      console.log(this.slug);
    },
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
      let url = "";
      if (this.slug == undefined) {
        const requestBrand = axios.get(this.brandUrl);
        const requestWarranty = axios.get(this.warrantyUrl);
        const requestColor = axios.get(this.ColorUrl);
        const requestLastProduct = axios.get(this.productUrl);
        this.loading = true;
        axios
          .all([
            requestBrand,
            requestWarranty,
            requestColor,
            requestLastProduct,
          ])
          .then(
            axios.spread((...responses) => {
              this.loading = false;
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
      } else {
        url = process.env.VUE_APP_PRODUCT_API + "/get/" + this.slug;
        this.loading = true;
        axios
          .get(url)
          .then((response) => {
            this.loading = false;
            return response.data;
          }).then((data)=>{
            this.newProduct = data;
            console.log(data);
            console.log(this.newProduct);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    uploadPic() {
      let formData = new FormData();
      formData.append("File", this.file);
      this.loading = true;
      axios
        .post(
          process.env.VUE_APP_IMAGE_API + "/add/" + this.newProductCode,
          formData,
          {
            "Content-Type": "multipart/form-data",
          }
        )
        .then((response) => {
          this.loading = false;
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
      this.loading = true;
      axios
        .post(process.env.VUE_APP_PRODUCT_API + "/create", this.newProduct)
        .then((response) => {
          this.loading = false;
          console.log(response);
        })
        .then(() => {
          this.uploadPic();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    checkForm() {
      this.errors = {};
      this.valid = true;
      var filtered = this.newProduct.colors.filter((el) => {
        return el.colorId != null;
      });
      this.newProduct.colors = filtered;
      console.log(this.newProduct);
      console.log(this.valid);
      const validDuplicateName = validate.checkDuplicate(
        this.newProduct.productName
      );
      this.errors.productNameDuplicate = validDuplicateName.error;
      if (this.valid) {
        this.valid = validDuplicateName.valid;
      }
      console.log(this.valid);
      const validBrand = validate.validateLength(
        this.newProduct.brands.brandName
      );
      this.errors.brandName = validBrand.error;
      if (this.valid) {
        this.valid = validBrand.valid;
      }
      console.log(this.valid);
      const validDesc = validate.validateLength(
        this.newProduct.productDescription
      );
      this.errors.desc = validDesc.error;
      if (this.valid) {
        this.valid = validDesc.valid;
      }
      console.log(this.valid);
      const validPrice = validate.validatePrice(this.newProduct.productPrice);
      this.errors.productPrice = validPrice.error;
      if (this.valid) {
        this.valid = validPrice.valid;
      }
      console.log(this.valid);
      const validDate = validate.validateLength(this.newProduct.date);
      this.errors.date = validDate.error;
      if (this.valid) {
        this.valid = validDate.valid;
      }
      console.log(this.valid);
      const validWarran = validate.validateLength(
        this.newProduct.productWarranty.warrantyDescription
      );
      this.errors.waranty = validWarran.error;
      if (this.valid) {
        this.valid = validWarran.valid;
      }
      console.log(this.valid);
      const validColor = validate.validateLength(this.newProduct.colors);
      this.errors.color = validColor.error;
      if (this.valid) {
        this.valid = validColor.valid;
      }
      console.log(this.valid);
      const validInput = validate.required();
      this.errors.upload = validInput.error;
      if (this.valid) {
        this.valid = validInput.valid;
      }
      console.log(this.valid);
      if (this.valid) {
        this.sendProduct();
      }
    },
  },
};
</script>

<style scope>
.title {
  @apply text-right font-bold text-2xl px-2;
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
.validate {
  @apply text-red-400 font-bold underline;
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