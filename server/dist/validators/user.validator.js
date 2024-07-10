"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const postUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Name must be string",
            required_error: "Name is required",
        })
            .min(3, "Name must have 3 characters or more")
            .max(25, "Name must have 25 characters or less"),
        email: zod_1.z.string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required",
        }).email("You provided an invalid email, Please enter a valid email"),
        role: zod_1.z.string({
            invalid_type_error: "Email must be string",
        }).optional(),
        password: zod_1.z.string({
            invalid_type_error: "Password must be string",
            required_error: "Password is required",
        })
            .min(6, "Password must have 6 characters or more")
            .max(15, "Password must have 15 characters or less"),
    }).strict(),
});
const updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Name must be string",
        })
            .min(3, "Name must have 3 characters or more")
            .max(25, "Name must have 25 characters or less"),
        email: zod_1.z.string({
            invalid_type_error: "Email must be string",
        }).email("You provided an invalid email, Please enter a valid email"),
        role: zod_1.z.string({
            invalid_type_error: "Role must be string",
        }).optional(),
    }).strict(),
});
const loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required",
        }).email("You provided an invalid email, Please enter a valid email"),
        password: zod_1.z.string({
            invalid_type_error: "Password must be string",
            required_error: "Password is required",
        })
            .min(6, "Password must have 6 characters or more")
            .max(15, "Password must have 15 characters or less"),
    }).strict(),
});
exports.userValidationSchema = {
    postUserSchema,
    loginUserSchema,
    updateUserSchema,
};
