import {
    getAllUsers,
    getUser,
    addUser,
    authUser,
    getDialogs,
    deleteUser,
    getUserByName,
    getAllUsersByName,
    getAllUsersByPhone
} from "./routes/UserRoute";
import {
    getDialogMessages,
    createDialog,
    deleteDialog,
    pushMessage,
    lastMessageByDialogId
} from "./routes/DialogsRoute";
import { update, remove } from "./routes/MessagesRoute";

export const Routes = [
    // Users
    getAllUsers,
    getAllUsersByName,
    getAllUsersByPhone,
    getUser,
    getUserByName,
    addUser,
    authUser,
    getDialogs,
    deleteUser,
    // Dialogs
    getDialogMessages,
    createDialog,
    deleteDialog,
    pushMessage,
    lastMessageByDialogId,
    // Messages
    update,
    remove
];