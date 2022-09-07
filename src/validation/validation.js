const AuthorModel=require("../models/authorModel")

const authorVlidation=async function(req,res,next){
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data
    
        if (!fname) { return res.status(400).send({ status: false, msg: "please provide the fname" }) }
        if (typeof data.fname !== "string")return res.status(400).send({ status: false, msg: " Please enter first name as a String" });
        if (!lname) { return res.status(400).send({ status: false, msg: "please provide the lname" }) }
        if (typeof data.lname !== "string")return res.status(400).send({ status: false, msg: " Please enter first name as a String" });
        if (!title) { return res.status(400).send({ status: false, msg: "please provide the title" }) }
         if (typeof data.title !== "string")return res.status(400).send({ status: false, msg: " Please enter first name as a String" });
        
     if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(email)) { return res.status(400).send({ status: false, msg: "please provide valid email" }) }
    
        let author = await AuthorModel.findOne({ email: email })
        if (author) { return res.status(400).send({ status: false, msg: "this email already exists please provide another email" }) }
        if (!password) { return res.status(400).send({ status: false, msg: "please provide the password" }) } 
        next()
        
    }
    catch (error) {
    
        res.status(500).send({ status: false, msg: error.message })
    }
    
    }
    module.exports.authorVlidation=authorVlidation
    


