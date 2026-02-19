import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

// Define routes for user-related operations 

router.post("/signup", (req, res) => {
   console.log("Signup endpoint hit");
})


router.post("/signin", (req, res) => {
   console.log("Signin endpoint hit");
})


router.get("/user",authMiddleware, (req, res) => {
   console.log("Get user endpoint hit");
})


export const userRouter = router;