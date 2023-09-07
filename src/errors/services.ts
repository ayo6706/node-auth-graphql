export const serverError = new Error("Server Error");
export const dbError = new Error("DB Error");
export class ServiceError extends Error {
    constructor(readonly err: Error | string) {
        super(function narrow(): string {
            if (err instanceof Error) {
                return err.message;
            }
            return err;
        }());
        this.name = "ServiceError";
    }
}
export const ErrExistingUserEmail = new ServiceError("user with this email already exists");
export const ErrIncorrectCredentials = new ServiceError("one or both of your login credentials is invalid");
export const ErrIncorrectPassword = new ServiceError("password is incorrect");
export const ErrUserDoesNotExist = new ServiceError("User does not exist");
export const ErrExistingUsername = new ServiceError("user with this username already exists");

export const ErrExistingBook = new ServiceError("book already exists");
export const ErrBookDoesNotExist = new ServiceError("book not found");
