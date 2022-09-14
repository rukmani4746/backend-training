const collegeModel = require("../models/collegeModel")

//validation
// const validated = function(field){
//     if(typeof field ==="undefined" || typeof field === null || typeof field === "string")return true
// }



   const createCollegeData = async function(req,res){

   try{

        let data = req.body

        if(Object.keys(data).length == 0){
            return res.status(400).send({ status:false, Alert:" field should not be empty"})
        }
        
        let college = await collegeModel.create(data)
        res.status(201).send({ status:true, data:college})
    }

    catch(err){
        return res.status(500).send({ status:false, msg:err.message})
    }

}

module.exports.colleges = createCollegeData