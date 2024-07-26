import { Schema,model } from "mongoose";

const adminSchema = new Schema({
    name:String,
    email:String,
    password:{ type:String , required:true}
})
//first we have created schema 
//schema is nothing but a obeject which has 
//keys and data types
//this schema will create object for each
//user whenver user data is come it will create
//object its a type of method
//
const Admin = model("Admin",adminSchema);
//model is method
//which create a function in mangoodb by this name 
// the name that you have passed in ""

export default Admin;