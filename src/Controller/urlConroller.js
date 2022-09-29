const UrlModel = require('../Model/urlModel')
const shortid = require('shortid')
const urlRegex = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/

const urlShort =  function (req,res){
    try{
        const longUrl = req.body.longUrl
        if(longUrl.length <1 )
        {
            return res.status().send('Please Enter URL')
        }
        if (longUrl.test(urlRegex)== false){
            return res.status().send("Please Enter Valid URL")

        }
        const shorturl =  shortid.generate(longUrl)
        console.log(shorturl)


    }catch(err){
        return res.status().send({status:false,msg:err.message})
    }
}

module.exports.urlShort = urlShort
