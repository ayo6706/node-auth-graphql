import { NextFunction, Request, Response } from "express";
import { HttpError } from "../response/errors";
import { ERROR_RESPONSE, fail } from "../response/response";
import { ServiceError } from "../../errors/services";
import DatabaseError from "../../errors/database";
import { log } from "../../log";

function errorToStatusCode(err: Error): number {
    switch (err.constructor.name) {
    case ServiceError.name:
        return ERROR_RESPONSE.UNPROCESSABLE_ENTITY;
    default:
        return ERROR_RESPONSE.SERVER_ERROR;
    }
}

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    let status: number = 500;
     // TODO: log server error to console using a logger
    let message = error.message || "Something went wrong";
    switch (error.constructor.name) {
    case ServiceError.name:
        status = errorToStatusCode(error);
        break;
    case HttpError.name:
        if (error instanceof HttpError && typeof error.statusCode === "number") {
            status = error.statusCode;
        }
        break;
    case DatabaseError.name:
        status = errorToStatusCode(error);
        message = "Something went wrong";
        break;
    default:
        status = 500;
        log.error(error);
        message = "Something went wrong";
    }
    fail(message, status).send(res);
}

export default errorMiddleware;
