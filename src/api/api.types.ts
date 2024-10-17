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

export interface TUserData {
	id: string;
	image_id?: string;
	image_url?: string;
	auth_id: string;
	first_name?: string;
	last_name?: string;
	username: string;
	email: string;
}

export interface TUploadPhoto {
	path: string;
	file: File;
	userId: string;
}
