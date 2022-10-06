const mongoose = require('mongoose')
//requiring redis
const redis = require("redis");

const { promisify } = require("util");
//requiring model------------
const urlModel = require('../Model/urlModel')

//url validation-------------
const validUrl = require('valid-url')

//requiring shortid ----------
const shortId = require('shortid')





//Connect to redis
const redisClient = redis.createClient(
    16342,
    "redis-16342.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("BTl1IZZtqHQOSzR8aULCc8gKSUsc4TT1", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});


const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);




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



const redirecttoOriginal = async function (req, res) {
    try {
let urlCode = req.params.urlCode;
    
        const cachedUrlData = JSON.parse(await GET_ASYNC(`${req.params.urlCode}`))
        if (cachedUrlData) {
            return res.status(302).redirect(cachedUrlData.longUrl);
        }

const url = await urlModel.findOne({urlCode:urlCode})
if(!url)  return res.status(404).send({ status: false, msg: 'No url found' });
    
await SET_ASYNC(`${urlCode}`, JSON.stringify(url))
    res.send({ data: url });

    return res.status(302).redirect(url.longUrl)

        }
    
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { urlShort, redirecttoOriginal }