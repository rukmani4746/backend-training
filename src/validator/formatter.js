// Module 3: src/validator/formatter.js
// - trim() : calls the trim function on a hardcoded string for example ‘ functionUp  ’
// - changetoLowerCase() : changes the case of the string to lower. [Call toLowerCase() on a hardcoded string]
// - changeToUpperCase() : changes the case of the string to upper case [Call toUpperCase() on a hardcoded string]

// Call all these functions in route.js inside the test-me route handler



function trim(){
    console.log("     I KNOW HOW TO LEARN CODE  ".trim())
}

function changetoLowerCase(){
    console.log("HEY THERE USER".toLowerCase())
}

function changeToUpperCase(){
    console.log("my name is baby".toUpperCase())
}

module.exports.tirm =trim
module.exports.tolower = changetoLowerCase
module.exports.upper = changeToUpperCase