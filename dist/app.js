"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ip_1 = __importDefault(require("ip"));
const code_enum_1 = require("./enum/code.enum");
const response_1 = require("./domain/response");
const status_enum_1 = require("./enum/status.enum");
const patient_routes_1 = require("./routes/patient.routes");
const user_routes_1 = require("./routes/user.routes");
class App {
    /**
     *
     */
    constructor(port = process.env.SERVER_PORT || 3000) {
        this.port = port;
        this.APPLICATION_RUNNING = 'application is running on:';
        this.app = (0, express_1.default)();
        this.middleWare();
        this.routes();
    }
    listen() {
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${ip_1.default.address()}: ${this.port}`);
    }
    middleWare() {
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/patients', patient_routes_1.patientRoutes);
        this.app.use('/users', user_routes_1.userRoutes);
        this.app.get('/', (req, res) => res
            .status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Welcome to the patients API v1.0')));
        this.app.all('*', (req, res) => res
            .status(code_enum_1.Code.NOT_FOUND)
            .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'NOT FOUND')));
    }
}
exports.App = App;
