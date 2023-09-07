import { ERROR_RESPONSE } from "./response";

export class HttpError extends Error {
    constructor(readonly err: Error | string, public statusCode?: number) {
        super(function narrow(): string {
            if (err instanceof Error) {
                return err.message;
            }
            return err;
        }());
        this.name = "HttpError";
    }
}

export const ErrMissingParameter = new HttpError("One or more parameters are missing", ERROR_RESPONSE.BAD_REQUEST);
export const ErrUnauthorizedUser = new HttpError("Unauthorized user", ERROR_RESPONSE.UNAUTHORIZED);
