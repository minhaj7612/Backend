import {Router} from "express";
import { LoginAdmin,RegisterAdmin,AdminLogOut } from "../Controllers/admin.controllers.js"

const router = Router();

router.post("/login-admin",LoginAdmin);
router.post("/register-admin",RegisterAdmin)
router.get("/admin-logout",AdminLogOut)

export default router;