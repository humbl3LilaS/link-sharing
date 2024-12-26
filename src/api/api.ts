import {
    LinkUpdateProps,
    TSignupUser,
    TUploadPhoto,
    TUserData,
} from "./api.types";
import {TLink} from "./query.types";
import {supabase} from "./supabaseClient";

export const singUpNewUser = async ({
                                        email,
                                        password,
                                        username,
                                    }: TSignupUser) => {
    const {data: signUpData, error: signUpError} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    });

    if (signUpError) {
        throw new Error(signUpError.message);
    }

    const {error: tableInsertError} = await supabase.from("_user").insert({
        auth_id: signUpData?.user?.id,
        email,
        username,
    });

    if (tableInsertError) {
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
    const {data, error} = await supabase.auth.signInWithPassword({
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
        data: {user},
    } = await supabase.auth.getUser();
    const {data: userData, error} = await supabase
        .from("_user")
        .select()
        .eq("auth_id", user?.id)
        .single();
    if (error) {
        throw new Error(error.message);
    }
    return userData;
};

export const getAllLink = async (
    userId: string | undefined,
): Promise<TLink[]> => {
    if (!userId) {
        throw new Error("empty");
    }

    const {data, error} = await supabase
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
                const {data, error} = await supabase
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
                return data;
            } else {
                const {data, error} = await supabase
                    .from("links")
                    .update({origin: link.data.origin, link: link.data.link})
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
    const {data} = await supabase.from("links").delete().eq("id", id);
    return data;
};

export const getUserById = async (id: string): Promise<TUserData> => {
    if (id === "") {
        throw new Error("empty");
    }

    const {data, error} = await supabase
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
    await supabase.auth.signOut();
    return true;
};

export const uploadPhoto = async ({path, file, userId}: TUploadPhoto) => {
    const {data: isExist} = await supabase.storage.from("avatars").exists(path);
    let imageData: { id?: string; url?: string } = {
        id: "",
        url: "",
    };

    if (isExist) {
        const {data, error: updateError} = await supabase.storage
            .from("avatars")
            .update(path, file);
        if (updateError) {
            throw new Error(updateError.message);
        }
        imageData = {
            id: data.id,
            url: data.fullPath,
        };
    } else {
        const {data, error: uploadError} = await supabase.storage
            .from("avatars")
            .upload(path, file);
        if (uploadError) {
            throw new Error(uploadError?.message);
        }
        imageData = {
            id: data.id,
            url: data.fullPath,
        };
    }

    const {data} = await supabase
        .from("_user")
        .update({
            image_id: imageData.id,
            image_url: imageData.url,
        })
        .eq("auth_id", userId)
        .select()
        .single();


    return data;
};
