const axios = require("axios")
let product = []

let fetchProduct = () => {
  axios
    .get(process.env.VUE_APP_PRODUCT_API+'/getall')
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      product = data;
    })
    .catch((err) => {
      console.error(err);
    });
};

function checkDuplicate(name) {
  fetchProduct();
  let checkdupli = product.filter(p => p.productName == name);
  console.log(checkdupli)
  if (checkdupli.length > 0) {
    return {
      valid: false,
      error: "This field was duplicated in database"
    };
  }
  if (!name.length) {
    return {
      valid: false,
      error: "This field is required"
    };
  }
  return {
    valid: true,
    error: null
  }
}


const validateLength = name => {
  if (!name.length) {
    return {
      valid: false,
      error: "This field is required"
    };
  }
  return {
    valid: true,
    error: null
  };
};

const validatePrice = price => {
  if (price <= 0) {
    return {
      valid: false,
      error: 'Please, enter a positive number more than 0.'
    };
  }
  return {
    valid: true,
    error: null
  };
}

function required() {
  var empt = document.forms["form"]["file"].value;
  if (empt == "") {
    return {
      valid: false,
      error: 'Please, dont let this input empthy.'
    };
  } else {
    return {
      valid: true,
      error: null
    };
  }
}

module.exports = {
  checkDuplicate: checkDuplicate,
  validateLength: validateLength,
  validatePrice: validatePrice,
  required: required,
}