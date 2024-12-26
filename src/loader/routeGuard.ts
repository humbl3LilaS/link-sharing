import { LoaderFunction, redirect } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export const routeGuard: LoaderFunction = async () => {
	const { data} = await supabase.auth.getSession();
	if (!data.session) {
		return redirect("/auth/login");
	} else {
		return true;
	}
};

export const authRouteGuard: LoaderFunction = async () => {
	const { data, error } = await supabase.auth.getSession();
	if (data.session) {
		return redirect("/");
	}
	return error;
};
