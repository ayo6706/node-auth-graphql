import jwt from "jsonwebtoken";
import config from "config";
import User from "../../repository/user/graphql/model";
import {
    UserDto, UserRegistrationDto, UserRegistrationObjDto
} from "./user.dto";

const JWT_SECRET = config.get<string>("JWT_SECRET");

function generateUserToken(user: User): string {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        JWT_SECRET,
    );
}

export default class UserMapper {
    static toPersistence(dto: User): User {
        if ("password" in dto) {
            return {
                firstname: dto.firstname,
                lastname: dto.lastname,
                email: dto.email,
                password: dto.password,
            };
        }
        return {
            id: dto.id,
            firstname: dto.firstname,
            lastname: dto.lastname,
            email: dto.email,
        };
    }

    static toAuthDto(user: User): UserDto {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: generateUserToken(user),
        };
    }

    static toAuthRegisterDto(user: User): UserRegistrationObjDto {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: generateUserToken(user),
        };
    }

    static toDto(user: User): UserDto {
        return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        };
    }

    static toDtoArray(n: User[]): UserDto[] {
        const users: UserDto[] = [];
        for (let i = 0; i < n.length; i++) {
            users.push(this.toDto(n[i]));
        }

        return users;
    }
}
