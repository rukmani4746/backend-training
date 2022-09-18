const express = require('express');
// const abc = require('../introduction/intro')
const router = express.Router();

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]

   router.post('/players', function (req, res) {

       let ele = req.body
       for(i=0;i<players.length;i++){
        let object=players[i]
        if(object.name==ele.name){
            return res.send("this player is exist")

        }
       }
       players.push(ele)
       res.send(players)
   })
  
module.exports = router;

