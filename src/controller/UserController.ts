import {getRepository, Like, getConnection, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { User } from "../entity/User";
import { Partof } from "../entity/Partof";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    // mysql "like" pattern
    async allByName(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find({
            name: Like(`${request.params.name}`)
        });
    }

    async allByPhone(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find({
            phone: Like(`${request.params.phone}`)
        });
    }

    async oneByName(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne({
            name: request.params.name
        });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async auth(request: Request, response: Response, next: NextFunction) {
        const error = {message: "We do not have that user, man"};
        const user = await this.userRepository.findOne({
            name: request.body.name,
        });
        if (user === undefined) {
            return error;
        }
        const isMatch = await bcrypt.compare(request.body.password, user.password);
        if (isMatch === false) {
            return error;
        }
        return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            picture: user.picture,
            token: jwt.sign({
                id: user.id,
                name: user.name,
                phone: user.phone,
            }, "secretkey", {expiresIn: "1h"})
        }

    }

    async save(request: Request, response: Response, next: NextFunction) {
        const {name, phone, picture, password} = request.body;

        const isExistUser = await this.userRepository.findOne({name});
        if (isExistUser !== undefined) {
            return {
                message: "That user is already exist"
            };
        }
        const self = this;
        const check = {
            isAllParams: Object.keys(request.body).length === 4,
            get isNotEmpty() {
                return this.name && this.phone && this.picture && this.password;
            },
            name: name !== "",
            phone: phone !== "",
            picture: picture !== "",
            password: password !== "" 
        };
        if (check.isAllParams === false || check.isNotEmpty === false) {
            return {
                message: "Please, specify all required params"
            };
        }
        await bcrypt.hash(request.body.password, 10).then(function(hash) {
            self.userRepository.save({
                name: request.body.name,
                phone: request.body.phone,
                picture: request.body.picture,
                password: hash
            });
        });
        return {
            name: request.body.name,
            phone: request.body.phone,
            picture: request.body.picture,
        };
    }

    // get user's dialogs
    async allForUser(request: Request, response: Response, next: NextFunction) {
        const user_id = request.params.id;
        const usersDialogs = await getConnection().createQueryBuilder()
            .select("partof.dialog_id, usr.name as companion_name, usr.picture as picture, message, timestamp")
            .from(Partof, "partof")
            .innerJoin("partof", "prt", "prt.dialog_id = partof.dialog_id and prt.user_id <> partof.user_id")
            .innerJoin("user", "usr", "usr.id = prt.user_id")
            .innerJoin("messages", "msg", "msg.id = (select id from messages where dialog_id=partof.dialog_id order by id desc limit 1)")
            .where("partof.user_id = :userId", {userId: user_id})
            .groupBy("partof.dialog_id, companion_name, picture, message, timestamp")
            .execute();
        return usersDialogs;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}