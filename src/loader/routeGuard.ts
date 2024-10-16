import { LoaderFunction, redirect } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export const routeGuard: LoaderFunction = async () => {
	const { data, error } = await supabase.auth.getSession();
	console.log("data", !data.session);
	console.log("error", error);
	if (!data.session) {
		return redirect("/auth/login");
	} else {
		return true;
	}
};

export const authRouteGuard: LoaderFunction = async () => {
	const { data, error } = await supabase.auth.getSession();
	console.log("data", data);
	console.log("error", error);
	if (data.session) {
		return redirect("/");
	}
	return error;
};
