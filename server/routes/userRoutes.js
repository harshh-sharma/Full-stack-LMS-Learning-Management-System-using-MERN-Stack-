import { Router } from "express";
import { getUser, login, logout, register } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/logout",logout);
userRouter.get("/me",getUser);

export default userRouter;