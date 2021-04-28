const axios = require("axios");
let product = [];
let fetchProduct = ()=>{
    axios
      .get(`http://localhost:8082/products/getall`)
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
    let result = false;
    result = product.some((element, index) => {return product.productName !== index});
    if(result) {
       console.log('Array contains duplicate elements');
    } else {
       console.log('Array does not contain duplicate elements');
    }
 };


const validateLength = name => {
    if (!name.length) {
      return { valid: false, error: "This field is required" };
    }
    return { valid: true, error: null };
  };
  
  const validatePrice = price => {
    if (!price.length) {
      return { valid: false, error: 'This field is required.' };
    }
  
    if (price <= 0) {
      return { valid: false, error: 'Please, enter a positive number more than 0.' };
    }
    return { valid: true, error: null };
  }
  
  const validateProductName = name => {
    if (!email.length) {
      return { valid: false, error: "This field is required" };
    }
    if (!email.match(/^\w+([.-]?\w+)_@\w+(_[_.-]?\w+)_(.\w{2,3})+$/)) {
      return { valid: false, error: "Please, enter a valid email." };
    }
    return { valid: true, error: null };
  };
  
  const validatePassword = password => {
    if (!password.length) {
      return { valid: false, error: "This field is required" };
    }
    if (password.length < 7) {
      return { valid: false, error: "Password is too short" };
    }
    return { valid: true, error: null };
  };