import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

// Define routes for user-related operations 

router.post("/", authMiddleware,(req, res) => {
   console.log("Create a zap");
})


router.get("/",authMiddleware, (req, res) => {
   console.log("zap handler");
})

router.get("/:zapId",authMiddleware, (req, res) => {
   console.log("Get zap endpoint hit");
})


export const zapRouter = router;