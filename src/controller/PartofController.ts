import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

import { Partof } from "../entity/Partof";

export class PartofController {

    private PartofRepository = getRepository(Partof);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.PartofRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.PartofRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.PartofRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.PartofRepository.findOne(request.params.id);
        await this.PartofRepository.remove(userToRemove);
    }

}