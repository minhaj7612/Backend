import { Router } from "express";
import { Login, Register,getCurrentUser,Logout} from "../Controllers/auth.controllers.js";

const router = Router();

router.post("/register",Register);
router.post("/login",Login);
router.get("/get-current-user",getCurrentUser)
router.get("/user-logout",Logout)

export default router;