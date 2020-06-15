import {getRepository, getConnection, getManager} from "typeorm";
import {NextFunction, Request, Response} from "express";

import {Dialogs} from "../entity/Dialogs";
import {Partof} from "../entity/Partof";
import { Messages } from "../entity/Messages";
import { User } from "../entity/User";

export class DialogsController {

    private dialogsRepository = getRepository(Dialogs);
    private partofRepository = getRepository(Partof);
    private messagesRepository = getRepository(Messages);

    // open full dialog
    async one(request: Request, response: Response, next: NextFunction) {
        const dialog_id = request.params.id;
        return getManager().createQueryBuilder(Messages, "msg")
            .innerJoinAndSelect(User, "usr", "usr.id = msg.user_id")
            .where("msg.dialog_id = :dialogId", {dialogId: dialog_id})
            .execute();
    }

    // get last message for dialog
    async lastByDialogId(request: Request, response: Response, next: NextFunction) {
        return this.messagesRepository.findOne({
            dialog_id: request.params.id
        }, {
            order: {
                id: "DESC"
            }
        });
    }

    // add new message
    async pushMessage(request: Request, response: Response, next: NextFunction) {
        return this.messagesRepository.save({
            message: request.body.message,
            user_id: request.body.userId,
            dialog_id: request.params.id,
            timestamp: new Date()
        });
    }

    // create new dialog
    async save(request: Request, response: Response, next: NextFunction) {
        const dialogName = "" + request.body.userOne + request.body.userTwo;
        const reverseDialogName = dialogName.split("").reverse().join("");
        const isPresentedDialog = await getConnection().createQueryBuilder()
            .select("dialog_name as dn")
            .from(Dialogs, 'dlg')
            .where("dialog_name = :dlgName or dialog_name = :rvrsDlgName", {
                dlgName: dialogName,
                rvrsDlgName: reverseDialogName
            })
            .execute();
        
        if (Array.isArray(isPresentedDialog) && isPresentedDialog.length > 0) {
            return {
                message: "Dialog is already exists"
            };
        }

        const createdDialogRow = await this.dialogsRepository.save({dialog_name: dialogName});
        return this.partofRepository.save([
            {
                user_id: request.body.userOne,
                dialog_id: createdDialogRow.id
            },
            {
                user_id: request.body.userTwo,
                dialog_id: createdDialogRow.id
            }
        ]);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const dialogToRemove = await this.dialogsRepository.findOne(request.params.id);
        const partofToRemove: Partof[] = await this.partofRepository.find({
            dialog_id: request.params.id
        });
        if (dialogToRemove === undefined && Array.isArray(partofToRemove) && partofToRemove.length === 0) {
            return {
                message: "Nothing to delete"
            };
        }

        const messagesToRemove: Messages[] = await this.messagesRepository.find({dialog_id: request.params.id});

        if (Array.isArray(messagesToRemove) && messagesToRemove.length > 0) {
            await this.messagesRepository.remove(messagesToRemove);
        }
        await this.dialogsRepository.remove(dialogToRemove);
        await this.partofRepository.remove(partofToRemove);
        return {
            dialog_id: request.params.id
        };
    }

}