import { useQuery } from "@tanstack/react-query";
import { getAllLink, getUser, getUserById } from "./api";

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

export const useGetUserInfo = (userid: string) => {
	return useQuery({
		queryKey: ["user-details"],
		queryFn: () => getUserById(userid),
		staleTime: 24 * 60 * 1000,
	});
};
