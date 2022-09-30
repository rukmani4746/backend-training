const mongoose = require('mongoose')

//requiring model------------
const urlModel = require('../Model/urlModel')

//url validation-------------
const validUrl = require('valid-url')

//requiring shortid ----------
const shortId = require('shortid')


const urlShort = async function (req, res) {
    try {
        let longUrl = req.body.longUrl

        if (!longUrl) {
            return res.status(400).send({ status: false, message: "LongUrl is mandatory" })
        }

        if (!validUrl.isUri(longUrl)) {
            return res.status(400).send({ status: false, message: "Url is not valid" })
        }


        //if long url is already exist------------------
        let existUrl = await urlModel.findOne({ longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
        if (existUrl) {
            return res.status(200).send({ status: true, data: existUrl })
        }


        //generating url------------------------------
        
        let baseUrl = "http://localhost:3000"
        const urlCode = shortId.generate().toLowerCase()

        const shortUrl = baseUrl + '/' + urlCode

        let all = {
            longUrl: longUrl,
            shortUrl: shortUrl,
            urlCode: urlCode
        };
        let urlData = await urlModel.create(all)
        return res.status(201).send({ status: true, data: urlData })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


const redirecttoOriginal = async function(req,res){
    try{
        const urlcode = req.params.urlCode
        if(!urlcode) return res.status(400).send({status:false,msg:"urlcode is required"})
        let data = await urlModel.findOne({urlcode:urlcode}).select({longUrl: 1})
        if(!data) return res.status(404).send({status:false,msg:"url not found"})

        let getUrl = data.longUrl
        return res.status(302).send({data:getUrl})
        
    
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports = { urlShort ,redirecttoOriginal}