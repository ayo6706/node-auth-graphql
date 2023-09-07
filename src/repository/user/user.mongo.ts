import UserModel from "./model.mongo";
import User from "./model";
import UserRepository from "./user.repository";
import { log } from "../log";
import DatabaseError from "../../errors/database";

export default class UserRepositoryMongo implements UserRepository {
    async createUser(user: User): Promise<User> {
        try {
            const createdUser = new UserModel(user);
            await createdUser.save();
            return Promise.resolve(createdUser);
        } catch (error: any) {
            log.error(error);
            throw new DatabaseError(error);
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            const user = await UserModel.findOne({ email });
            return Promise.resolve(<User>user);
        } catch (err: any) {
            log.error(err);
            throw new DatabaseError(err);
        }
    }

    async findUserById(id: string): Promise<User> {
        try {
            const user = await UserModel.findById(id);
            return Promise.resolve(<User>user);
        } catch (err: any) {
            log.error(err);
            throw new DatabaseError(err);
        }
    }
}
