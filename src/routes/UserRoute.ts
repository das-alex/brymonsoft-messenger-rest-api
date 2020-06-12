import { UserController } from "../controller/UserController";

export const getAllUsers = {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
};

export const getAllUsersByName = {
    method: "get",
    route: "/users/byName/:name",
    controller: UserController,
    action: "allByName"
};

export const getAllUsersByPhone = {
    method: "get",
    route: "/users/byPhone/:phone",
    controller: UserController,
    action: "allByPhone"
};

export const getUserByName = {
    method: "get",
    route: "/users/oneByName/:name",
    controller: UserController,
    action: "oneByName"
};

export const getUser = {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
};

export const authUser = {
    method: "post",
    route: "/users/auth",
    controller: UserController,
    action: "auth"
};

export const addUser = {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
};

export const deleteUser = {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
};