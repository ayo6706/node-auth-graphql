/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    forceExit: true,
    testTimeout: 60000,
    testMatch: ["**/**/*.test.ts"],
    verbose: true,
    setupFilesAfterEnv: ['./jest.setup.redis-mock.js'],
    moduleNameMapper: {
        "axios": "axios/dist/node/axios.cjs"
    }
};
