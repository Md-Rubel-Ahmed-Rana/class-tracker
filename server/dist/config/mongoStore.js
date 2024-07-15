"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const envConfig_1 = require("./envConfig");
const express_session_1 = __importDefault(require("express-session"));
const MongoDBStore = require("connect-mongodb-session")(
  express_session_1.default
);
class SessionDatabase {
  constructor() {
    this.store = new MongoDBStore({
      uri: envConfig_1.config.database.uri,
      collection: "sessions",
    });
  }
  connectSessionDatabase(app) {
    app.use(
      (0, express_session_1.default)({
        secret: envConfig_1.config.database.mongodKey,
        store: this.store,
        resave: false,
        saveUninitialized: false,
      })
    );
  }
}
exports.Session = new SessionDatabase();
