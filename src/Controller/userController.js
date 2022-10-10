const userModel = require('../Models/userModel')



const createUserDocument = async function (req, res) {
    try {
        let document = req.body
        let { fname, lname, email, profileImage, phone, password, address } = document


        if (Object.keys(document).length === 0) return res.status(400).send({ status: false, msg: "data require to create document" })

        if (!fname) return res.status(400).send({ status: false, msg: "first_name is required" })
        if (!lname) return res.status(400).send({ status: false, msg: "last_name is required" })
        if (!email) return res.status(400).send({ status: false, msg: "email_id is required" })
        if (!profileImage) return res.status(400).send({ status: false, msg: "profileimage is required" })
        if (!phone) return res.status(400).send({ status: false, msg: "phone number is required" })
        if (!password) return res.status(400).send({ status: false, msg: "password is required" })
        if (!address) return res.status(400).send({ status: false, msg: "address is required" })
if(!address.shipping.street) return res.status(400).send(status:false,msg:"street must be present"& address.shipping.city && address.shipping.pincode)



        let savedData = await userModel.create(document)
        return res.status(201).send({ status: true, data: savedData })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
