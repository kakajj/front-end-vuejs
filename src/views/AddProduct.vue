<template>
  <nav-bar></nav-bar>
  <div class="loader" v-if="loading"></div>
  <div class="flex flex-col sm:flex-row">
    <div class="title-box">
      <h1 class="title">{{ welcomeMsg }}</h1>
      <h1 v-if="isEdit" class="title">Product ID: {{ slug }}</h1>
    </div>
    <div class="w-full py-6 px-10 hover:bg-gray-100">
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
            placeholder="Date"
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
          <div class="flex flex-col md:flex-row">
            <div
              class="flex flex-row"
              v-for="color in colorArray"
              :key="color.colorId"
            >
              <input
                class="my-auto w-4 h-4 md:mx-auto"
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
            maxlength="300"
            v-model="newProduct.productDescription"
            required
          ></textarea>
          <div class="validate">{{ errors.desc }}</div>
        </div>
        <div class="mb-4">
          <label class="input-name" for="upload"> Upload Picture </label>
          <div id="preview">
            <img v-if="url" :src="url" />
          </div>
          <input
            type="file"
            id="file"
            ref="file"
            name="file"
            required
            accept=".jpg"
            v-on:change="handleFileUpload"
          />
          <p v-if="isEdit">
            (หากไม่ต้องการแก้ไขรูปภาพ ให้เว้น Field นี้ให้ว่างไว้)
          </p>
          <div class="validate">{{ errors.upload }}</div>
        </div>

        <div class="flex items-center justify-center space-x-6 md:justify-end">
          <button
            id="submit"
            class="btn-submit"
            type="submit"
            @click.prevent="checkForm"
          >
            <em class="fab fa-whatsapp"></em> ส่งข้อมูล
            <li class="text-2xl material-icons">cloud_upload</li>
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
    if (this.slug == undefined) {
      this.fetchMultipleData();
    } else {
      this.fetchEditData();
    }
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
      ColorUrl: config.VUE_APP_API + "/colors/getall",
      productUrl: config.VUE_APP_API + "/products/getall",
      brandUrl: config.VUE_APP_API + "/brands/getall",
      warrantyUrl: config.VUE_APP_API + "/warranty/getall",
      file: "",
      isEdit: false,
      url: config.VUE_APP_API + "/picture/get/" + this.slug + '.jpg',
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
      return this.$router.push("/product/");
    },
    fetchMultipleData() {
      const requestBrand = axios.get(this.brandUrl);
      const requestWarranty = axios.get(this.warrantyUrl);
      const requestColor = axios.get(this.ColorUrl);
      const requestLastProduct = axios.get(this.productUrl);
      this.loading = true;
      axios
        .all([requestBrand, requestWarranty, requestColor, requestLastProduct])
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
          this.loading = false;
          console.log(errors);
        });
    },
    fetchEditData() {
      let url = config.VUE_APP_API + "/products/get/" + this.slug;
      const requestBrand = axios.get(this.brandUrl);
      const requestWarranty = axios.get(this.warrantyUrl);
      const requestColor = axios.get(this.ColorUrl);
      const requestEditProduct = axios.get(url)
      this.loading = true;
      axios
        .all([requestBrand, requestWarranty, requestColor,requestEditProduct])
        .then(
          axios.spread((...responses) => {
            return responses;
          })
        )
        .then((data) => {
          this.loading = false;
          this.brandArray = data[0].data;
          this.warrantyArray = data[1].data;
          this.colorArray = data[2].data;
          this.newProduct = data[3].data;
        })
        .catch((errors) => {
          this.loading = false;
          console.log(errors);
        });
    },
    uploadPic() {
      let formData = new FormData();
      formData.append("File", this.file);
      this.loading = true;
      if (!this.isEdit) {
        axios
          .post(
            config.VUE_APP_API + "/picture/add/" + this.newProductCode,
            formData,
            {
              "Content-Type": "multipart/form-data",
            }
          )
          .then((response) => {
            this.loading = false;
            return response.data
          })
          .then(() => {
            this.clearData();
          })
          .catch((errr) => {
            this.loading = false;
            console.log(errr);
          });
      } else {
        if (this.file.length<1) {
          this.clearData();
        } else {
          axios
            .put(
              config.VUE_APP_API + "/picture/edit/" + this.slug + ".jpg",
              formData,
              {
                "Content-Type": "multipart/form-data",
              }
            )
            .then((response) => {
              this.loading = false;
              return response.data
            })
            .then(() => {
              this.clearData();
            })
            .catch((errr) => {
              this.loading = false;
              console.log(errr);
            });
        }
      }
    },
    handleFileUpload() {
    this.file = this.$refs.file.files[0];
      if(this.file){
        this.url = URL.createObjectURL(this.file);
      }else{
        this.url = '';
        return ''
      }
    },
    sendProduct() {
      this.newProduct.productCode = this.newProductCode;
      this.loading = true;
      axios
        .post(config.VUE_APP_API + "/products/create", this.newProduct)
        .then((response) => {
          this.loading = false;
          return response.data
        })
        .then(() => {
          this.uploadPic();
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    },
    updateProduct() {
      this.loading = true;
      axios
        .put(
          config.VUE_APP_API + "/products/edit/" + this.slug,
          this.newProduct
        )
        .then((responses) => {
          this.loading = false;
          return responses.data;
        })
        .then(() => {
          this.uploadPic();
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    checkForm() {
      this.errors = {};
      this.valid = true;

      var filtered = this.newProduct.colors.filter((el) => {
        return el.colorId != null;
      });
      this.newProduct.colors = filtered;

      if (!this.isEdit) {
        const validDuplicateName = validate.checkDuplicate(
          this.newProduct.productName,
          false,
          null
        );
        this.errors.productNameDuplicate = validDuplicateName.error;
        if (this.valid) {
          this.valid = validDuplicateName.valid;
        }
      } else {
        const validDuplicateName = validate.checkDuplicate(
          this.newProduct.productName,
          true,
          this.slug
        );
        this.errors.productNameDuplicate = validDuplicateName.error;
        if (this.valid) {
          this.valid = validDuplicateName.valid;
        }
      }

      const validBrand = validate.validateLength(
        this.newProduct.brands.brandName
      );
      this.errors.brandName = validBrand.error;
      if (this.valid) {
        this.valid = validBrand.valid;
      }
      const validDesc = validate.validateLength(
        this.newProduct.productDescription
      );
      this.errors.desc = validDesc.error;
      if (this.valid) {
        this.valid = validDesc.valid;
      }
      const validPrice = validate.validatePrice(this.newProduct.productPrice);
      this.errors.productPrice = validPrice.error;
      if (this.valid) {
        this.valid = validPrice.valid;
      }
      const validDate = validate.validateLength(this.newProduct.date);
      this.errors.date = validDate.error;
      if (this.valid) {
        this.valid = validDate.valid;
      }
      const validWarran = validate.validateLength(
        this.newProduct.productWarranty.warrantyDescription
      );
      this.errors.waranty = validWarran.error;
      if (this.valid) {
        this.valid = validWarran.valid;
      }
      const validColor = validate.validateLength(this.newProduct.colors);
      this.errors.color = validColor.error;
      if (this.valid) {
        this.valid = validColor.valid;
      }
      if (!this.isEdit) {
        const validInput = validate.required();
        this.errors.upload = validInput.error;
        if (this.valid) {
          this.valid = validInput.valid;
        }
      }
      if (this.valid) {
        if (this.isEdit) {
          this.updateProduct();
        } else {
          this.sendProduct();
        }
      }
    },
  },
};
</script>

<style scope>
.title-box{
  transition: 1s;
  @apply bg-gray-200 sm:w-3/6 md:w-2/6 lg:w-1/6 pt-10 hover:bg-gray-300
}
.title {
  @apply  text-center text-3xl font-bold md:text-2xl px-2 md:text-right;
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
  @apply mx-1 w-8 h-8 md:w-12 md:h-12 border-2 border-opacity-70 hover:border-black;
}
.btn-submit {
  @apply bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none;
}
.btn-pic {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none;
}
.validate {
  @apply text-red-400 font-bold underline;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
  @apply py-4
}

#preview img {
  max-width: 50%;
  max-height: 200px;
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