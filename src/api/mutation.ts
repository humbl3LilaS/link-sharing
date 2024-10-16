import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink, logout, updateLink } from "./api";
import { LinkUpdateProps } from "./api.types";

export const useUpdateLink = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: LinkUpdateProps[]) => updateLink(payload),
		onMutate: async (data) => {
			console.log("onMutation of updateLinks", data);
		},
		onSuccess: async (data) => {
			console.log("onsuccess", data);
			await queryClient.invalidateQueries({
				queryKey: ["links"],
			});
		},
	});
};

export const useDeleteLink = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: number) => deleteLink(payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["links"],
			});
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.removeQueries({
				queryKey: ["user"],
			});
			queryClient.removeQueries({
				queryKey: ["links"],
			});
			queryClient.removeQueries({
				queryKey: ["user-details"],
			});
		},
	});
};
