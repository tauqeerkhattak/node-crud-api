import express from "express";
import {login, signUp} from "./auth_controller";

const router = express.Router();

router.post("/signUp", signUp);

router.post("/login", login);

export default router;