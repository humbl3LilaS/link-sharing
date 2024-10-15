import { TSignupUser } from "./api.types";
import { supabase } from "./supabaseClient";

export const singUpNewUser = async ({
	email,
	password,
	username,
}: TSignupUser) => {
	const { data: signInData, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				username,
			},
		},
	});
	if (error) {
		console.log(error);
		throw new Error(error.message);
	}
	return signInData;
};
