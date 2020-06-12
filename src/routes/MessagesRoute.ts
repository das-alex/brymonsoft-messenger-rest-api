import { MessagesController } from "../controller/MessagesController";

// need to be work on it
export const lastByDialogId = {
    method: "get",
    route: "/dialogs/:id/lastMessage",
    controller: MessagesController,
    action: "lastByDialogId"
};

// need to be work on it
export const messagesByDialog = {
    method: "get",
    route: "/dialogs/:id/messages",
    controller: MessagesController,
    action: "messagesByDialog"
};

// need to be work on it
export const pushMessage = {
    method: "post",
    route: "/dialogs/:id/message",
    controller: MessagesController,
    action: "pushMessage"
};

export const deleteDialog = {
    method: "delete",
    route: "/dialogs/:id",
    controller: MessagesController,
    action: "remove"
};