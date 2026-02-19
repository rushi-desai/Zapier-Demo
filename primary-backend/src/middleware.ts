import {NextFunction , Request , Response} from "express";



export function authMiddleware(req:Request, res:Response, next:Function) {
    // Implement your authentication logic here
    // For example, you can check for a token in the request headers
    const token = req.headers['authorization']; 


}
