/* eslint-disable import/no-mutable-exports */
import winston from "winston";

export let log: winston.Logger;

export default class ServicesLogger {
    static useLogger(logger: winston.Logger) {
        log = logger;
    }
}
