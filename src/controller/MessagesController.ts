import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

import {Messages} from "../entity/Messages";

export class MessagesController {

    private messagesRepository = getRepository(Messages);

    // edit message
    async update(request: Request, response: Response, next: NextFunction) {
        return this.messagesRepository.update(request.body.id, {
            delivered: request.params.delivered,
            seen: request.params.seen,
            message: request.params.message
        });
    }

    // delete message
    async remove(request: Request, response: Response, next: NextFunction) {
        let messageToRemove = await this.messagesRepository.findOne(request.params.id);
        await this.messagesRepository.remove(messageToRemove);
    }

}