const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")


const createInternData = async function (req, res) {

    try {
        let { name, email, mobile, collegeId,collegeName ,isDeleted} = req.body

        let collegeNames = await collegeModel.findOne({ FullName: collegeName })
        collegeId = collegeNames._id
        let data = { name, email, mobile, collegeId, collegeName, isDeleted }

        const internData = await internModel.create(data);
        res.status(201).send({status:true,msg:"intern data successfully created",data:internData})

    }catch(error)
    {
        return res.status(500).send({status:false,message:error.message})

    }

}


const getCollegeDetails = async function(req,res){
    try{
      let{name} = req.query
      let findNminClgdb = await collegeModel.findOne({name:name})
      if(!findNminClgdb)
      return res.status(400).send({status:true,msg:"data not found"})

      let findIntern = await internModel.find({collegeId:findNminClgdb._id})
    //   findNminClgdb.getCollegeDetails = findIntern

      return res.status(200).send({status:true,data:findIntern})
    }


       catch(error){
        res.status(500).send({status:false,message:error.message})
       }
       }

    

module.exports.intern = createInternData
module.exports.getCollegeDetails = getCollegeDetails