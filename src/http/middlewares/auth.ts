import { StrategyOptions, ExtractJwt, Strategy } from "passport-jwt";
import { NextFunction, Response } from "express";
import config from "config";
import UserModel from "../../repository/user/model.mongo";
import User from "../../repository/user/model";
import AuthRequest from "../../@types/authRequest";

const JWT_SECRET = config.get<string>("JWT_SECRET");
/**
 * StrategyOptions interface
 * Using passport-jwt
 */
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    passReqToCallback: true,
};

export default new Strategy(
    opts,
    ((req: AuthRequest, jwtToken: any, done: any) => {
        UserModel.findById(jwtToken.id, (err: any, user: User) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                req.user = user;
                return done(undefined, user, jwtToken);
            }
            return done(undefined, false);
        });
    }),
);
