import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink, updateLink } from "./api";
import { LinkUpdateProps } from "./api.types";

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
