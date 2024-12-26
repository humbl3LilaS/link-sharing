import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink, logout, updateLink, uploadPhoto } from "./api";
import { LinkUpdateProps, TUploadPhoto } from "./api.types";

export const useUpdateLink = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: LinkUpdateProps[]) => updateLink(payload),
		onSuccess: async () => {
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

export const useUploadPhoto = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: TUploadPhoto) => uploadPhoto(payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["user"],
			});
			await queryClient.invalidateQueries({
				queryKey: ["user-details"],
			});
		},
	});
};
