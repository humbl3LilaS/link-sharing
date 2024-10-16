import { LinkUpdateProps, TSignupUser } from "./api.types";
import { TLink } from "./query.types";
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
	await payload.forEach(async (link) => {
		if (link.isInsert) {
			const { error } = await supabase.from("links").insert({
				origin: link.data.origin,
				link: link.data.link,
				user_id: link.data.user_id,
			});
			if (error) {
				throw new Error(error.message);
			}
		} else {
			const { error } = await supabase
				.from("links")
				.update({ origin: link.data.origin, link: link.data.link })
				.eq("user_id", link.data.user_id);
			if (error) {
				throw new Error(error.message);
			}
		}
	});
	return true;
};

export const deleteLink = async (id: number) => {
	const { data, error } = await supabase.from("links").delete().eq("id", id);
	if (error) {
		console.log("error");
	}
	return data;
};
