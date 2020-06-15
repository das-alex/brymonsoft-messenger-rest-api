import * as jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

export class AuthMiddleware {
    async check(request: Request, response: Response, next: NextFunction) {
        try {
            const {methods, path} = request.route;
            if (path === "/users/auth" && methods.get) {
                next();
            } else if (path === "/users" && methods.post) {
                next();
            } else {
                const getToken = request.headers.authorization;
                const verify = jwt.verify(getToken, "secretkey");
                request.userData = verify;
                next();
            }
        } catch(middlewareError) {
            console.log(middlewareError);
            response.status(401).json({
                message: "Auth is failed"
            });
        }
    }
}