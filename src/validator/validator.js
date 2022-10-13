const mongoose = require("mongoose");


const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && value.trim().length > 0) { return true }
    if (typeof (value) === "number" && value.toString().trim().length > 0) { return true }
    if (typeof (value) === "object" && value.length > 0) { return true }
    if (typeof (value) === null ) { return false}
    
}

const isValidName = function (value){
    return /^[a-zA-Z ]{2,30}$/.test(value)
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0; 
};



const validString = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
}

const isRightFormatemail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const isRightFormatmobile = function (phone) {
    return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone);
}

const isValidObjectId = function (objectId) {
        return mongoose.Types.ObjectId.isValid(objectId)
    }
    

const isNumber =function (pincode) {
    if ( /^\+?([1-9]{1})\)?([0-9]{5})$/.test(pincode)) return true
}


const isValidImg = (img) => {
    const reg = /image\/png|image\/jpeg|image\/jpg/;
    return reg.test(img);
  };

  
  const isValidPassword = function(pass){
    if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(pass)) return true
    }

module.exports = {isValid, validString, isValidRequestBody, isRightFormatemail, isRightFormatmobile, isValidObjectId, isNumber, isValidImg, isValidName,isValidPassword};
