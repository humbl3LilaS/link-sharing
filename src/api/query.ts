import { useQuery } from "@tanstack/react-query";
import { getTest } from "./api";

export const useTestQuery = () => {
	return useQuery({
		queryKey: ["test"],
		queryFn: getTest,
		staleTime: 24 * 60 * 1000,
	});
};
