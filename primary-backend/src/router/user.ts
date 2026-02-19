import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import "dotenv/config"; 

const router = Router();

// Define routes for user-related operations 

router.post("/signup", async(req, res) => {
   const body = req.body;
   const parseData = SignupSchema.safeParse(body);

   if(!parseData.success){
    
    return res.status(400).json({error: "Incorrect input"});
   }


   const userExists = await prismaClient.user.findFirst({
    where:{
        email: parseData.data.username
    } 
})

    if(userExists){
        return res.status(400).json({error: "User already exists"});
    }

    await prismaClient.user.create({
        data: {
            email: parseData.data.username,
            password: parseData.data.password,//hash passward before store
            name: parseData.data.name
        }
    })

    //await send Email()

    return res.json({
        message:"Please Verify your account by checking your email"
    })

})



router.post("/signin", async(req, res) => {
    const body = req.body;
   const parseData = SigninSchema.safeParse(body);

   if(!parseData.success){
    return res.status(400).json({error: "Incorrect input"});
   }


   const user = await prismaClient.user.findFirst({
    where:{
        email: parseData.data.username,
        password: parseData.data.password
    }
   })

   if(!user){
    return res.status(403).json({error: "Sorry credentials are incorrect"});
   }

    //sighn the jwt
  const token = jwt.sign({
    id: user.id,
  },JWT_PASSWORD);

  res.json({
    token:token,
  })

    


  
})


router.get("/",authMiddleware, async(req, res) => {
   //fix the type

   ///@ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where:{
            id:id
        },
        select:{
           name:true,
           email:true,
        
        }
    })
   return res.json({
        user:user
    });

})


export const userRouter = router;