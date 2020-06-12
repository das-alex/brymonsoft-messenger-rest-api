import { DialogsController } from "../controller/DialogsController";

export const getDialogs = {
    method: "get",
    route: "/dialogs/byUser/:id",
    controller: DialogsController,
    action: "allForUser"
};

export const getDialogMessages = {
    method: "get",
    route: "/dialogs/:id",
    controller: DialogsController,
    action: "one"
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