// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from "express";

export default interface AuthRequest extends Request {
    user?: any;
}
