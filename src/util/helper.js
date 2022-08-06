// Module 2 : src/util/helper.js

const { get } = require("../routes/route");

// - printDate() : prints the current date
// - printMonth() : prints the current month
// - getBatchInfo() : prints batch name, week#, Day#, the topic being taught today is ….. For example - Radon, W3D3, the topic for today is Nodejs module system’
	
// 	Call all these functions in route.js inside the test-me route handler

function printDate(){
    var dday1 = (new Date()).getDate();
    console.log('Current Date is :',dday1);
}

function printMonth(){
    var month = (new Date()).getMonth()+1;
    console.log('konsa month hai ye :',month);
}

function getBatchInfo(){
    var btchNm = "plutonium"
    var wkDay = "W2D3"
    var topic = "Nodejs"
    console.log(btchNm,"-",wkDay,"-","the topic taught by today is ",topic )
}
module.exports.todayDay = printDate
module.exports.currentMonth = printMonth
module.exports.batchDetails = getBatchInfo