const mongoose = require("mongoose");


const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && value.trim().length > 0) { return true }
    if (typeof (value) === "number" && value.toString().trim().length > 0) { return true }
    if (typeof (value) === "object" && value.length > 0) { return true }
    if (typeof (value) === null ) { return false}
    
}

const isRightFormatemail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const isRightFormatmobile = function (phone) {
    return /^[6-9]\d{9}$/.test(phone);
}

const isValidObjectId = function (objectId) {
    
        return mongoose.Types.ObjectId.isValid(objectId)
    }
    

const isNumber =function (pincode) {
    if ( /^\+?([1-9]{1})\)?([0-9]{5})$/.test(pincode)) return true
}


module.exports.isValid = isValid;
module.exports.isRightFormatemail = isRightFormatemail;
module.exports.isRightFormatmobile = isRightFormatmobile;
module.exports.isValidObjectId = isValidObjectId;
module.exports.isNumber = isNumber;