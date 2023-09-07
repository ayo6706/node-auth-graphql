import dotenv from "dotenv";
import config from "config";
import Http from "./http/http";
import { Services } from "./services/services";
import { useLogger, log, createLogger } from "./log";
import RepositoryLogger from "./repository/log";
import ServicesLogger from "./services/log";
import HttpLogger from "./http/log";
import UserService from "./services/user";
import UserRepositoryMongo from "./repository/user/serviceTwo/user.mongo";
import mongoose from "mongoose";

const RepositoryLoggerID = "DB";
const ServiceLoggerID = "SRV";
const HTTPLoggerID = "HTTP";
const SystemLoggerID = "SYS";

const DBUri = config.get<string>("DBUri");
const PORT = config.get<string>("PORT");
const API_VERSION = config.get<string>("API_VERSION");

function initLoggers() {
    useLogger(createLogger(SystemLoggerID, DBUri));
    RepositoryLogger.useLogger(createLogger(RepositoryLoggerID, DBUri));
    ServicesLogger.useLogger(createLogger(ServiceLoggerID, DBUri));
    HttpLogger.useLogger(createLogger(HTTPLoggerID, DBUri));
}

function main(): void {
    dotenv.config();
    initLoggers();

    
    mongoose.connect(DBUri)
        .then(() => { log.info(`connected to db successfully on ${DBUri}`); })
        .catch((err) => log.error(`db connection error: ${err}`));

    const services: Services = {
        userService: new UserService(
            new UserRepositoryMongo(),
        ),
    };

    const http = new Http(services);
    // start http server on declared port
    http.serve(process.env.PORT || PORT, API_VERSION);
}

main();
