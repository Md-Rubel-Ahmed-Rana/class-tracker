import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/envConfig";

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["adc-class-tracker"];
    if (!token) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "Token not provided",
        data: null,
      });
    }

    const user: any = jwt.verify(token, config.jwt.accessTokenSecret);

    if (!user) {
      res.clearCookie("adc-class-tracker");
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Invalid token provided",
        data: null,
      });
    }

    req.id = user.id;
    req.role = user.role;
    next();
  } catch (error: any) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      res.clearCookie("adc-class-tracker");
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Token expired or invalid",
        error: error.message,
      });
    }
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: "There was an error verifying the token",
      error: error.message,
    });
  }
};

export default verifyJwt;
