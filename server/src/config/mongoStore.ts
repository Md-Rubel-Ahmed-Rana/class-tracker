import { config } from "./envConfig";
import { Application } from "express";
import session from "express-session";
const MongoDBStore = require("connect-mongodb-session")(session);

class SessionDatabase {
  private store: any;

  constructor() {
    this.store = new MongoDBStore({
      uri: config.database.uri,
      collection: "sessions",
    });
  }

  public connectSessionDatabase(app: Application) {
    app.use(
      session({
        secret: config.database.mongodKey,
        store: this.store,
        resave: false,
        saveUninitialized: false,
        name: "adc-class-tracker",
        cookie: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        },
      })
    );
  }
}

export const Session = new SessionDatabase();
