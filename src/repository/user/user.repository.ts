import User from "./serviceOne/model";

export default interface UserRepository {
    createUser(user: User): Promise<User>
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}
