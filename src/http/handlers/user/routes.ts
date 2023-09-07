import express from "express";

export default function routes(handler: any): express.Router {
    const router = express.Router();
    router.post("/register", handler.registerUser.bind(handler));
    router.post("/login", handler.loginUser.bind(handler));
    return router;
}
