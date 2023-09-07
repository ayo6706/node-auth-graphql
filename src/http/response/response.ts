import { Response as Res } from "express";
import * as messages from "./messages";

export const SUCCESS_RESPONSE = {
    OK: 200,
    CREATED: 201,
};

export const ERROR_RESPONSE = {
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
    SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
};

type ResponseBody = {
    success: boolean,
    message: string,
    data: any,
};

class Response {
    constructor(private readonly statusCode: number, private readonly body: ResponseBody) {
    }

    send(res: Res): void {
        res.status(this.statusCode).json(this.body);
    }
}

function messageToStatusCode(msg: string): number {
    switch (msg) {
    case messages.MsgUserCreate:
        return SUCCESS_RESPONSE.CREATED;
    default:
        return SUCCESS_RESPONSE.OK;
    }
}

export function ok(message: string, data: any): Response {
    return new Response(messageToStatusCode(message), {
        success: true,
        message,
        data,
    });
}

export function fail(message: string, statusCode: number): Response {
    return new Response(statusCode, {
        success: false,
        message,
        data: null,
    });
}
