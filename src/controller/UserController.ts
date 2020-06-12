import {getRepository, Like} from "typeorm";
import {NextFunction, Request, Response} from "express";

import {User} from "../entity/User";

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
        // check user's password here
        return this.userRepository.findOne({
            name: request.params.name,
            password: request.params.password
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }

}