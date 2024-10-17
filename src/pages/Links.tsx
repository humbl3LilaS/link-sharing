import { useGetSavedLink, useUserQuery } from "../api/query";
import LinksForm from "../form/LinksForm";
import { useGenerateLinkFormValue } from "../hook/useGenerateLinkFormValue";

const Links = () => {
	const { data: user } = useUserQuery();
	const { data: links } = useGetSavedLink(user?.auth_id);
	const defaultValues = useGenerateLinkFormValue(links ?? []);

	return (
		<div className="w-full  p-4 md:p-0 lg:flex">
			<div className="p-6 bg-white rounded-xl flex-1">
				<div className="mb-10">
					<h2 className="mb-2 text-xl font-bold text-black">
						Customize your links
					</h2>
					<p className="text-paleGray">
						Add/edit/remove links below and then share all your profiles with
						the world!
					</p>
				</div>
				<LinksForm defaultValues={defaultValues} />
			</div>
		</div>
	);
};

export default Links;
