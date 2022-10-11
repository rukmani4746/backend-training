const mongoose = require('mongoose')
const redis = require("redis");
const { promisify } = require("util");
const urlModel = require('../Model/urlModel')
const validUrl = require('valid-url')
const shortId = require('shortid');
const { get } = require('http');


const isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};


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
        if (!Object.keys(req.body).length > 0) {
            return res
                .status(400)
                .send({ status: false, message: "Request body can't be empty" });
        }

        if (!isValid(longUrl))
            return res
                .status(400)
                .send({ status: false, message: "long URL is mandatory" });


        if (!validUrl.isUri(longUrl)) {
            return res.status(400).send({ status: false, message: "Url is not valid" })
        }
        let geturl = await GET_ASYNC(`${longUrl}`)
        if (geturl) {
            return res.send({ message: "successfully shortend", data: geturl })
        }

        let existUrl = await urlModel.findOne({ longUrl }).select({ _id: 0, longUrl: 1, shortUrl: 1, urlCode: 1 })
        if (existUrl) {
            await SET_ASYNC(`${longUrl}`, (existUrl.shortUrl));
            return res.status(200).send({ status: true, data: existUrl })
        }

        let baseUrl = "http://localhost:3000"
        const urlCode = shortId.generate().toLowerCase()

        const shortUrl = baseUrl + '/' + urlCode

        let all = {
            longUrl: longUrl,
            shortUrl: shortUrl,
            urlCode: urlCode
        };
        let urlData = await urlModel.create(all)
        res.status(201).send({ status: true, data: urlData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


const redirecttoOriginal = async function (req, res) {
    try {
        let urlCode = req.params.urlCode;

        const cachedUrlData = JSON.parse(await GET_ASYNC(`${req.params.urlCode}`))
        if (cachedUrlData) {
            return res.status(302).redirect(cachedUrlData.longUrl);
        }

        const url = await urlModel.findOne({ urlCode: urlCode })
        if (!url) return res.status(404).send({ status: false, msg: 'No url found' });

        await SET_ASYNC(`${urlCode}`, JSON.stringify(url))
        res.send({ data: url });

        return res.status(302).redirect(url.longUrl)

    }

    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { urlShort, redirecttoOriginal }