import jwt from "jsonwebtoken"
import User from "../Model/user.model.js";

export async function checkIsUsevalid(req,res,next){

    try{ 
      const token = req.cookies.token;
      console.log(token,"tokenmidlleware")
      const data = await jwt.verify(token,process.env.JWT_key);
      console.log(data,"data")
      const user = await User.findById(data?.userId);
    
     if(!user){
        return res.json({success:false, error:"user not valid"})
     }
     req.userId = data.userId;
     next();
    }
    catch(error){

        console.log(error, "error jere");
        return res.json({ success: false, error });
    }
}