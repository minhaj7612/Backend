import { Router } from "express";
import {GetAllCartProducts} from "../Controllers/user.controllers.js";
import { checkIsUsevalid } from "../middleware/all.middlewares.js";

const router = Router();

router.get("/get-allCart-product",checkIsUsevalid,GetAllCartProducts);


export default router;