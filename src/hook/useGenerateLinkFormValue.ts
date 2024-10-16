import { TLink } from "../api/query.types";
import { selectItems } from "../constants";
import { LinkFormInput } from "../form/LinksForm";

export const useGenerateLinkFormValue = (payload: TLink[]) => {
	const links = payload.map((item) => item.link);
	const origin = payload.map((item) => item.origin);
	const ids = payload.map((item) => item.id);
	const platform = selectItems.filter((item) => origin.includes(item.name));
	const defaultValue = platform.reduce((arr, value, idx) => {
		const val = {
			platform: { ...value, id: ids[idx] },
			link: links[idx],
		};
		return [...arr, val];
	}, [] as LinkFormInput["fields"]);
	return defaultValue;
};
