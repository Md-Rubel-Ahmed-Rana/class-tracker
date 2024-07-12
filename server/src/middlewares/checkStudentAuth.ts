import { NextFunction, Request, Response } from "express";

export const checkStudentAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.studentId) {
    return next();
  } else {
    return res
      .status(401)
      .json({ success: false, message: "You need to login first" });
  }
};
