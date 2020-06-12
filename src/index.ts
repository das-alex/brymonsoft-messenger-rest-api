import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";

import {Routes} from "./routes";

// import { Messages } from "./entity/Messages";
// import { User } from "./entity/User";
// import { Dialogs } from "./entity/Dialogs";
// import { Partof } from "./entity/Partof";

createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());

    // register routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
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

    // add for user01 (id 1) few dialogs for test
    // await connection.manager.save(connection.manager.create(Partof, {
    //     dialog_id: 4,
    //     user_id: 1
    // }));
    // await connection.manager.save(connection.manager.create(Partof, {
    //     dialog_id: 4,
    //     user_id: 6
    // }));
    // await connection.manager.save(connection.manager.create(Messages, {
    //     dialog_id: 4,
    //     timestamp: new Date(),
    //     user_id: 1,
    //     message: "приветики катлетики",
    //     delivered: true,
    //     seen: true
    // }));
    // await connection.manager.save(connection.manager.create(Messages, {
    //     dialog_id: 4,
    //     timestamp: new Date(),
    //     user_id: 6,
    //     message: "взаииииимноо",
    //     delivered: true,
    //     seen: true
    // }));

    console.log("http://localhost:3000");

}).catch(error => console.log(error));
