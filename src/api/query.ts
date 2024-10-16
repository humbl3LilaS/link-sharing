import { useQuery } from "@tanstack/react-query";
import { getAllLink, getUser } from "./api";

export const useUserQuery = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: getUser,
		staleTime: 24 * 60 * 1000,
	});
};

export const useGetSavedLink = (userId: string | undefined) => {
	return useQuery({
		queryKey: ["links"],
		queryFn: () => getAllLink(userId),
		staleTime: 24 * 60 * 1000,
	});
};
