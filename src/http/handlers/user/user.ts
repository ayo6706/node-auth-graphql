import express, { Request, Response, NextFunction } from "express";

import { Handler } from "../handler";
import UserService from "../../../services/user";
import { ok } from "../../response/response";
import * as msg from "../../response/messages";
import * as errors from "../../response/errors";
import { fieldIsNotEmpty } from "../util";
import AuthRequest from "../../../@types/authRequest";
import routes from "./routes";

const basePath = "/user";

/**
 * @openapi
 * tags:
 *   name: User
 *   description: User authentication and management
 */
export default class UserHandler implements Handler {
    private service: UserService;

    constructor(service: UserService) {
        this.service = service;
    }

    routes(): express.Router {
        return routes(this);
    }

    path(): string {
        return basePath;
    }

    /**
     * @openapi
     * /user/register:
     *   post:
     *     tags:
     *      - User
     *     summary: register a new user
     *     requestBody:
     *      $ref: '#/components/requestBodies/UserRegistration'
     *     responses:
     *        200:
     *          description: User successfully created
     */
    async registerUser(req: AuthRequest, res: Response, next: NextFunction) {
        const {
            firstname, lastname, email, password,
        } = req.body;

        if (!fieldIsNotEmpty(firstname, lastname, email, password)) {
            return next(errors.ErrMissingParameter);
        }
        try {
            const result = await this.service.registerUser({
                firstname,
                lastname,
                email,
                password,
            });
            return ok(msg.MsgUserCreate, result).send(res);
        } catch (error: any) {
            return next(error);
        }
    }

    /**
     * @openapi
     * /user/login:
     *   post:
     *     tags:
     *      - User
     *     summary: login a user
     *     requestBody:
     *      $ref: '#/components/requestBodies/UserLogin'
     *     responses:
     *        200:
     *          description: User logged in
     */
    async loginUser(req: Request, res: Response, next: NextFunction) {
        const { email, phone, password } = req.body;
        if (!fieldIsNotEmpty(phone || email, password)) {
            return next(errors.ErrMissingParameter);
        }

        try {
            const result = await this.service.loginUser(
                password,
                email,
            );
            return ok(msg.MsgUserLoggedIn, result).send(res);
        } catch (error: any) {
            return next(error);
        }
    }
}
