import User from "../Model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import Admin from "../Model/admin.model.js";

export const Login = async (req,res) => {

try{

 const {email,password}= req.body?.userData;

  if(!email||!password){
    return res.json({success:false, error:"all fields are required"})
  }

  const isUserExist = await User.findOne({email:email})

   if(!isUserExist){

    return res.json({success:false,error:"email not found"})
  }
  
  const isPasswordExist= await bcrypt.compare(password,isUserExist.password)
  if(!isPasswordExist){
    return  res.json({success:false,error:"password is wrong"})
  }
  const userData = {name:isUserExist.name, email:isUserExist.email,role:"user"};
  const token= jwt.sign({userId:isUserExist.id},process.env.JWT_key)
  console.log(token,"token")
  res.cookie("token",token)
  return res.json({ success:true, message:"login succesfull",userData})
}
catch(error){
  return res.json({success:false,error:error});
}
}

export const Register = async (req,res)=> {
 try{
    const {name,email,password}=req.body?.userData;
    if(!name|| !email|| !password){
      return res.json({success:false, error:"all fields are mandatory"})
    }
    const IsemailExist = await User.findOne({email:email});
    console.log(IsemailExist)
    if(IsemailExist){
      return res.json({
        success:false,
        error:"email is already exist"
      })
    }
    const hiddenPass= await bcrypt.hash(password,10)

    const userData = new User({
       name:name,
       email:email,
       password:hiddenPass
       
    })
    const Database = await userData.save();
    return res.json({
      success:true,
      Database,
      message:"Registration complete"
    })
    
   }
   catch(error){
   return res.json({success:false, error:"Something went wrong"})
 }
 }


export const getCurrentUser = async (req,res)=>{
      try{
      const token = req.cookies.token;
      // console.log(token,"tokengetcurrentuser")
      const data= await jwt.verify(token,process.env.JWT_key);
    
      if(data?.adminId){
        const admin= await Admin.findById(data?.adminId);
        if(!admin){
          return res.json({success:false})
        }
        const adminData={name:admin.name,email:admin.email,role:"admin"};

        return res.json({success:true,userData:adminData})

      }
      const user = await User.findById(data?.userId);
      if(!user){
        return res.json({success:true})
      }
      const userData = {name:user.name, email:user.email,role:"user"}
    
      return res.json({success:true,userData})
     }
    catch(error){
    return res.json({success:false,error})
    }

   }


   export const Logout = async(req,res)=>{
    try{
      const token = req.cookies.token;
      if(token){
        console.log(token,"token")
        res.clearCookie("token");
        return res.json({success:true, message:"log out Succesfull"})
      }else{
        return res.json({ success: false, error: 'No token found' });
      }
    }catch(error){
      return res.json({success:false,error:"logout is not working properly"})
    }
   }