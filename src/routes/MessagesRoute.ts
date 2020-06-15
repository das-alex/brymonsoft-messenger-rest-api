import { MessagesController } from "../controller/MessagesController";

export const update = {
    method: "post",
    route: "/messages/:id",
    controller: MessagesController,
    action: "update"
};

export const remove = {
    method: "delete",
    route: "/messages/:id",
    controller: MessagesController,
    action: "remove"
};