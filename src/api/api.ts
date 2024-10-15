import { supabase } from "./supabaseClient";

export const getTest = async () => {
	try {
		console.log("before fetchig");
		const data = await supabase.from("test").select();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};
