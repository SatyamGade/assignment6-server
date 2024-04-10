const { z } = require("zod");

const loginSchema = z.object({
    username: z.string({ required_error: "Username is required" }).min(3, { message: "Username must have atleast 3 charachters" }).max(255, { message: "Username is not more than 255 charachters" }),
    password: z.string({ required_error: "Password required" })
})

const signupSchema = loginSchema.extend({
    name: z.string({ required_error: "Name is required" }).min(3, { message: "Name must have atleast 3 charachters" }).max(255, { message: "Name is not more than 255 charachters" }),

    email: z.string({ required_error: "Email required" }).email({ message: "Email must be valid email" }),

    password: z.string({ required_error: "Password required" }).min(8, "Password must be minimum of 8 characters"),

    isPolicy: z.boolean().refine((val) => val === true, { message: "Privacy Checked Required"})
})

module.exports = { loginSchema, signupSchema };