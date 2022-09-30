const { request } = require('express')
const express = require('express')
const router = express.Router()
const urlcontroller = require('../Controller/urlConroller')

router.post('/url/shorten',urlcontroller.urlShort)
router.get('/:urlCode',urlcontroller.redirecttoOriginal)
// router.all('/*',(req,res)=>{res.status(400).send({status:false,msg:"urddddlcode is required"})})











module.exports = router








