import { Schema,model } from "mongoose";


const ProductSchema = new Schema({
   name: String,
   price: Number,
   category: String,
   quantity: Number,
   image: String,

});

const Product = model("products",ProductSchema);

export default Product;