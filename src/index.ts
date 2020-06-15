import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";

import {Routes} from "./routes";

import {AuthMiddleware} from "./middleware/AuthMiddleware";

process.title = "messangerApi";

createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());
    const checkUser = new AuthMiddleware();

    // register routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, checkUser.check, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => {
                    result !== null && result !== undefined
                        ? res.send(result)
                        : res.status(404).json({
                            message: "Content isn't available"
                        });
                });
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.send();
        }
        next();
    });

    app.listen(3000);    

    console.log("http://localhost:3000");

}).catch(error => console.log(error));
