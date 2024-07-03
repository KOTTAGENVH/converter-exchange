"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
];
// app.use(cors({ credentials: true, origin: allowedOrigins }));
// app.use(bodyParser.json());
(0, db_1.default)();
app.listen(process.env.PORT || 5030, () => {
    console.log(`Server is running on port ${process.env.PORT || 5030}`);
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
exports.default = app;
//# sourceMappingURL=index.js.map