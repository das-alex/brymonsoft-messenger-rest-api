import { DialogsController } from "../controller/DialogsController";

export const getDialogMessages = {
    method: "get",
    route: "/dialogs/:id",
    controller: DialogsController,
    action: "one"
};

export const lastMessageByDialogId = {
    method: "get",
    route: "/dialogs/:id/lastMessage",
    controller: DialogsController,
    action: "lastByDialogId"
};

export const pushMessage = {
    method: "post",
    route: "/dialogs/:id",
    controller: DialogsController,
    action: "pushMessage"
};

export const createDialog = {
    method: "post",
    route: "/dialogs",
    controller: DialogsController,
    action: "save"
};

export const deleteDialog = {
    method: "delete",
    route: "/dialogs/:id",
    controller: DialogsController,
    action: "remove"
};