"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
];
app.use((0, cors_1.default)({ credentials: true, origin: allowedOrigins }));
app.use(body_parser_1.default.json());
(0, db_1.default)();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
exports.default = app;
//# sourceMappingURL=server.js.map