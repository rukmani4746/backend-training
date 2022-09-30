const express = require('express')
const router = express.Router()
const urlcontroller = require('../Controller/urlConroller')

router.post('/shortern',urlcontroller.urlShort)
router.get('/:urlCode',urlcontroller.redirecttoOriginal)











module.exports = router








