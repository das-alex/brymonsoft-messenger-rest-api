import {getRepository, Like, getConnection, Raw} from "typeorm";
import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { User } from "../entity/User";
import { Partof } from "../entity/Partof";
import { Messages } from "../entity/Messages";

export class UserController {

    private userRepository = getRepository(User);
    private partofRepository = getRepository(Partof);
    private messagesRepository = getRepository(Messages);

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
        // check user's password here
        return this.userRepository.findOne({
            name: request.params.name,
            password: request.params.password
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const isExistUser = await this.userRepository.findOne({
            name: request.body.name
        });
        if (isExistUser === undefined) {
            return this.userRepository.save(request.body);
        }
        return {
            message: "That user is already exist"
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