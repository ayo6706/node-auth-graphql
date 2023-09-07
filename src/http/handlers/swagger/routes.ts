import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "user auth API",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    in: "header",
                },
            },
        },
        security: [{
            bearerAuth: [],
        }],
        servers: [{ url: "/api/v1" }],
    },
    apis: [
        "./src/dto/**/*.ts", "./src/http/handlers/**/*.ts",
    ],
};

export default function routes(): express.Router {
    const router = express.Router();
    router.use("/api-docs", swaggerUi.serve);
    router.get("/api-docs", swaggerUi.setup(swaggerJsdoc(options)));
    return router;
}
