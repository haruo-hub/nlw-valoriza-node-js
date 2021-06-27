import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;
    if(!authToken) {
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ");
    try {
        const { sub } = verify(token, "155ec5ba0f2a54d04ee9bfbe07f93df5") as IPayload;
        request.user_id = sub;
        return next();
    } catch(error) {
        return response.status(401).end();
    }
}