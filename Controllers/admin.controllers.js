import Admin from "../Model/admin.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const LoginAdmin = async (req, res) => {
   
  try{
  
    const {email,password} = req.body?.adminData;
   
     if(!email||!password){
       return res.json({success:false, error:"all fields are required"})
     }
   
     const isUserExist = await Admin.findOne({email:email})
         console.log(isUserExist,"isUserExist")
      if(!isUserExist){
   
       return res.json({success:false,error:"email not found"})
     }
     
     const isPasswordExist= await bcrypt.compare(password,isUserExist.password)
     if(!isPasswordExist){

      return res.json({success:false,error:"password is wrong"})
     }
     const adminData = {name:isUserExist.name, email:isUserExist.email,role:"admin"};
     const token= jwt.sign({adminId:isUserExist.id},process.env.JWT_key)
     console.log(token,"token")
     res.cookie("token",token)
     return res.json({ success:true, message:"login succesfull",adminData})
   }
   catch(error){
    return res.json({success: false, error:"An error occurred during login" });
  }
};





export const RegisterAdmin = async (req, res) => {
   
  try{
    const{name,email,password}=req.body?.adminData;
    if(!name||!email||!password){
    return res.json({success:false,error:"all fields are mandatory"})
    }
  

    const isEmailexist= await Admin.findOne({email:email})
    if(isEmailexist){
      return res.json({success:false, error:"email is already taken"})
    }

    const encryptPassword = await bcrypt.hash(password,10)
    const newAdmin= new Admin({
      name:name,
      email:email,
      password:encryptPassword
    })

    
    const responsMango = await newAdmin.save();

    return res.json({success:true,responsMango,message:"Registration complete"});
  }catch(error){
    console.log(error,"error")
    return res.json({success:false,error:"error from catch"})
  }
};

export const  AdminLogOut = (req,res)=>{
  try{
    const token= req.cookies.token;
    if(token){
      res.clearCookie("token");
      return res.json({success:true,message:"LogOut Succesfully as admin"})
    }
    return res.json({success:false,message:"No token Found"})
  }catch(error){
     return res.json({success:false,error:"Something Gone Wrong"})
  }
}