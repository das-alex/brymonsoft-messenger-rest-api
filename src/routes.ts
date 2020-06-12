import {
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    getUserByName,
    getAllUsersByName,
    getAllUsersByPhone
} from "./routes/UserRoute";
import {
    getDialogs,
    getDialogMessages,
    createDialog,
    deleteDialog
} from "./routes/DialogsRoute";

export const Routes = [
    // Users
    getAllUsers,
    getAllUsersByName,
    getAllUsersByPhone,
    getUser,
    getUserByName,
    addUser,
    deleteUser,
    // Dialogs
    getDialogs,
    getDialogMessages,
    createDialog,
    deleteDialog
    // Messages
];