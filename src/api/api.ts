import { LinkUpdateProps, TSignupUser, TUserData } from "./api.types";
import { TLink } from "./query.types";
import { supabase } from "./supabaseClient";

export const singUpNewUser = async ({
	email,
	password,
	username,
}: TSignupUser) => {
	const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				username,
			},
		},
	});

	if (signUpError) {
		console.log("Sign up error ", signUpError);
		throw new Error(signUpError.message);
	}

	const { error: tableInsertError } = await supabase.from("_user").insert({
		auth_id: signUpData?.user?.id,
		email,
		username,
	});

	if (tableInsertError) {
		console.log("user info insert error", tableInsertError);
		throw new Error(tableInsertError.message);
	}

	return signUpData;
};
export const signIn = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		console.log(error);
		throw new Error(error.message);
	}
	return data;
};

export const getUser = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
};

export const getAllLink = async (
	userId: string | undefined,
): Promise<TLink[]> => {
	if (!userId) {
		throw new Error("empty");
	}

	const { data, error } = await supabase
		.from("links")
		.select("*")
		.eq("user_id", userId);
	if (error) {
		console.log(error);
		throw new Error(error.message);
	}
	return data;
};

export const updateLink = async (payload: LinkUpdateProps[]) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const promises = payload.map(async (link: LinkUpdateProps) => {
			if (link.isInsert) {
				const { data, error } = await supabase
					.from("links")
					.insert({
						origin: link.data.origin,
						link: link.data.link,
						user_id: link.data.user_id,
					})
					.select()
					.single();
				if (error) {
					throw new Error(error.message);
				}
				console.log("inside update loop", data);
				return data;
			} else {
				const { data, error } = await supabase
					.from("links")
					.update({ origin: link.data.origin, link: link.data.link })
					.eq("id", link.data?.id)
					.select()
					.single();
				if (error) {
					throw new Error(error.message);
				}

				return data;
			}
		});
		const data = await Promise.all(promises);
		return data;
	} catch (error) {
		console.log(error);
		throw new Error("heelo");
	}
};

export const deleteLink = async (id: number) => {
	const { data, error } = await supabase.from("links").delete().eq("id", id);
	if (error) {
		console.log("error");
	}
	return data;
};

export const getUserById = async (id: string): Promise<TUserData> => {
	if (id === "") {
		throw new Error("empty");
	}

	const { data, error } = await supabase
		.from("_user")
		.select("*")
		.eq("auth_id", id)
		.single();

	if (error) {
		console.log(error);
	}
	return data;
};

export const logout = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.log("signout error", error);
	}
	return true;
};
