import {getRepository, MaxKey} from "typeorm";
import {NextFunction, Request, Response} from "express";

import {Messages} from "../entity/Messages";

export class MessagesController {

    private messageRepository = getRepository(Messages);

    // get last message for dialog
    async lastByDialogId(request: Request, response: Response, next: NextFunction) {
        return this.messageRepository.findOne({
            dialog_id: request.params.dialogId
        }, {
            order: {
                id: "DESC"
            }
        });
    }

    // get all messages for dialog
    async messagesByDialog(request: Request, response: Response, next: NextFunction) {
        return this.messageRepository.find({
            dialog_id: request.params.dialogId
        });
    }

    // add new message
    async pushMessage(request: Request, response: Response, next: NextFunction) {
        return this.messageRepository.save(request.body);
    }

    // edit message
    async update(request: Request, response: Response, next: NextFunction) {
        return this.messageRepository.update(request.body.id, {
            delivered: request.params.delivered,
            seen: request.params.seen,
            message: request.params.message
        });
    }

    // delete message
    async remove(request: Request, response: Response, next: NextFunction) {
        let messageToRemove = await this.messageRepository.findOne(request.params.id);
        await this.messageRepository.remove(messageToRemove);
    }

}