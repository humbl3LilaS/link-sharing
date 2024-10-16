import { TLink } from "./query.types";

export interface TSignupUser {
	username: string;
	email: string;
	password: string;
}

export interface LinkUpdateProps {
	data: Partial<TLink>;
	isInsert: boolean;
}
