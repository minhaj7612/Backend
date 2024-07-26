import express from 'express';
const app = express();
app.use(express.json());
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import cookieParser from 'cookie-parser';
import AllRoutes from "./Routes/index.js"
import mongoose from 'mongoose';
import morgan from 'morgan';
app.use(morgan("combined"))
app.use(cookieParser())


app.use(cors({
  credentials:true,
  origin:["http://localhost:3000"]
   
}))

app.get('/', function (req, res)  {
 res.send("working")
});

app.use("/api/v1",AllRoutes)


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected."));
  
app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server is running on port ${process.env.PORT_NUMBER}`);
});
