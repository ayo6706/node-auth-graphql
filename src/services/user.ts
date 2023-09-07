import bcrypt from "bcrypt";

import UserRepository from "../repository/user/user.repository";
import * as errors from "../errors/services";
import {
    UserDto, UserRegistrationDto, UserRegistrationObjDto,
} from "../dto/user/user.dto";
import UserMapper from "../dto/user/user.mapper";
import {
    failedPromise,
} from "./util";

export default class UserService {
    constructor(private readonly repo: UserRepository) {}

    async registerUser(regDto: UserRegistrationDto): Promise<UserRegistrationObjDto> {
        try {
            const dto: UserRegistrationDto = regDto;

            const user = await this.repo.findUserByEmail(dto.email);
            if (user) {
                return failedPromise(errors.ErrExistingUserEmail);
            }

            const newUser = await this.repo.createUser(UserMapper.toPersistence(dto));
            return UserMapper.toAuthRegisterDto(newUser);
        } catch (error: any) {
            return failedPromise(error);
        }
    }

    async loginUser(
        password: string,
        email: string,
    ): Promise<UserDto> {
        try {
            const user = await this.repo.findUserByEmail(email);

            if (!user) {
                return failedPromise(errors.ErrIncorrectCredentials);
            }

            const isMatch = await bcrypt.compare(password, user.password!);
            if (!isMatch) {
                return failedPromise(errors.ErrIncorrectCredentials);
            }

            return UserMapper.toAuthDto(user);
        } catch (error: any) {
            // reject with error which may be Database or Service error
            return failedPromise(error);
        }
    }
}
