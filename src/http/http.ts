/* eslint-disable no-console */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import config from "config";
import http from "http";

import { log } from "./log";
import errorMiddleware from "./middlewares/error";
import authMiddleware from "./middlewares/auth";

import { Services } from "../services/services";

import UserHandler from "./handlers/user/user";
import SwaggerHandler from "./handlers/swagger/swagger";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import Schema from "../repository/user/model.graphql";
import resolvers from "../repository/user/user.resolvers";

const apiPath = "/api";
const NODE_ENV = config.get<string>("NODE_ENV");
// Http provides a port to interact with the app using http implementations such as a REST API
export default class Http {
    private userHandler: UserHandler;

    private apiVersion: string = "";

    constructor(services: Services) {
        this.userHandler = new UserHandler(services.userService);
    }

    basePath(handlerPath: string): string {
        return `${apiPath}/${this.apiVersion}${handlerPath}`;
    }

    // serve takes a port as an argument and starts an express server on the specified port
    async serve(port: string, version: string) {
        this.apiVersion = version;

        const app = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            typeDefs: Schema,
            resolvers,
            //tell Express to attach GraphQL functionality to the server
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
          }) as any;
        await server.start(); //start the GraphQL server.
        server.applyMiddleware({ app });
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // passport
        app.use(passport.initialize());
        passport.use(authMiddleware);

        // register handler routes
        app.get("/", (req, res) => {
            res.send("user auth backend service");
        });
        app.use(this.basePath(this.userHandler.path()), this.userHandler.routes());

        const swagger = new SwaggerHandler();
        app.use(this.basePath(swagger.path()), swagger.routes());

        app.use(errorMiddleware);

        if (NODE_ENV !== "test") {
            app.listen(port, () => { log.info("starting express server"); });
        }
        return app;
    }
}
