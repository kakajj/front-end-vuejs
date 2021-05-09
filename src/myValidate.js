const axios = require("axios");
let product = []
let currentProduct = []

let fetchProduct = () => {
  axios
    .get(config.VUE_APP_API + '/products/getall')
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      product = data;
    })
    .catch((err) => {
      console.log(err);
    });
};
let fetchCurrentProduct = (slug) => {
  axios
    .get(config.VUE_APP_API + '/products/get/' + slug)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      currentProduct = data;
    })
    .catch((err) => {
      console.log(err);
    });
};


function checkDuplicate(name, edit, slug) {
  if (edit === false) {
    fetchProduct();
    let checkdupli = product.filter(p => p.productName == name);
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
  } else {
    fetchProduct();
    fetchCurrentProduct(slug);

    for(let i = 0;i < product.length;i++){
      if(product[i].productName===currentProduct.productName){
        console.log("HOORAY")
        product.splice(i,1)
      }
    }

    let checkdupli = product.filter(p => p.productName === name);
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