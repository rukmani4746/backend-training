const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})
router.post("/name-query-1", function (req, res) {
    let arr = [23, 45, 67, 58458, 22145, 11544]
    let inp = req.query.input;
    let f = []
    for (let i = 0; i < arr.length; i++) {
        if (inp < arr[i]) {
            f.push(arr[i])
        }
    } res.send({ data: f, status: true })
})

let person = [
    {
        name: "pk",
        age: 10,
        votingStartus: false
    },
    {
        name: "sk",
        age: 20,
        votingStartus: false
    },
    {
        name: "AA",
        age: 70,
        votingStartus: false
    },
    {
        name: "SC",
        age: 5,
        votingStartus: false
    },
    {
        name: "HO",
        age: 40,
        votingStartus: false
    },
]

router.post("/getvotingstatus", function (req, res) {
    let VotingAge = req.query.age
    let ElegiblePerson = []
    for (let i = 0; i < person.length; i++) {
        if (person[i].age > VotingAge) {
            person[i].votingStartus = true;
            ElegiblePerson.push(person[i])
        }
    }

    res.send({ Persons: ElegiblePerson, status: true })
})

module.exports = router;