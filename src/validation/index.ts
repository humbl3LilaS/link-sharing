import { z } from "zod";

export const LoginSchema = z.object({
	email: z
		.string({ message: "email is required" })
		.email({ message: "Invallid emaill address" }),
	password: z.string({ message: "password is required" }),
});

export type LoginSchemaType = Zod.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
	username: z
		.string({ message: "username can't be empty" })
		.min(4, { message: "username must be at least 4 character long" })
		.max(20, { message: "username can only have upto 20 characters only" })
		.regex(/^[a-zA-Z]+$/, {
			message:
				"Username can only contain letters (a-z, A-Z), no special characters or spaces.",
		}),
	email: z
		.string({ message: "email is required" })
		.email({ message: "Invallid emaill address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter.",
		})
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter.",
		})
		.regex(/\d/, { message: "Password must contain at least one number." })
		.regex(/[@$!%*?&]/, {
			message:
				"Password must contain at least one special character (@$!%*?&).",
		}),
	confirmPassword: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter.",
		})
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter.",
		})
		.regex(/\d/, { message: "Password must contain at least one number." })
		.regex(/[@$!%*?&]/, {
			message:
				"Password must contain at least one special character (@$!%*?&).",
		}),
});

export type SingupSchemaType = Zod.infer<typeof SignupSchema>;
