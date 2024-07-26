export const GetAllCartProducts = (req, res) => {

    try{
        console.log(req.userId,"req.userId")
        return res.json({success:true, message:"user valid"})
    }
    catch(error){
      return res.json({success:false,error})
    }
  };

