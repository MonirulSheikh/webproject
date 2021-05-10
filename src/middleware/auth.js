const jwt1=require('jsonwebtoken');
const table=require('../model/coll');


const auth=async (req,res,next)=>{

    try {
        const token=req.cookies.jwtm;
        const verify_user=await jwt1.verify(token,process.env.SECRET);
        //console.log(verify_user);
        const user= await table.findOne({_id:verify_user._id});
        //console.log(user)
    req.token=token;
        req.user=user;


next()

    } catch (error) {
        res.status(401).send(error)
        console.log(`auth:${error}`)
    }
}
module.exports=auth;