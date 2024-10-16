import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { selectItems } from "../constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getLinkAsFormContent = (origins: string[]) => {
	const tags = selectItems.filter((item) => origins.includes(item.name));
	return tags;
};
