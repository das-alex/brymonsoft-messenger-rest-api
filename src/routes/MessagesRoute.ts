import { MessagesController } from "../controller/MessagesController";

export const getDialogs = {
    method: "get",
    route: "/dialogs/byUser/:id",
    controller: MessagesController,
    action: "allForUser"
};

export const getDialogMessages = {
    method: "get",
    route: "/dialogs/:id",
    controller: MessagesController,
    action: "one"
};

export const createDialog = {
    method: "post",
    route: "/dialogs",
    controller: MessagesController,
    action: "save"
};

export const deleteDialog = {
    method: "delete",
    route: "/dialogs/:id",
    controller: MessagesController,
    action: "remove"
};