"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStudentAuth = void 0;
const checkStudentAuth = (req, res, next) => {
    var _a, _b;
    console.log({ sessionObject: req.session });
    console.log({ studentId: (_a = req.session) === null || _a === void 0 ? void 0 : _a.studentId });
    if ((_b = req.session) === null || _b === void 0 ? void 0 : _b.studentId) {
        return next();
    }
    else {
        return res
            .status(401)
            .json({ success: false, message: "You need to login first" });
    }
};
exports.checkStudentAuth = checkStudentAuth;
