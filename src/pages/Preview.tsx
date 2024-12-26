import { Link } from "react-router-dom";
import { useGetSavedLink, useUserQuery } from "../api/query";
import { useGenerateLinkFormValue } from "../hook/useGenerateLinkFormValue";
import { cn } from "../util";
import toast, { Toaster } from "react-hot-toast";

const Preview = () => {
	const { data: user } = useUserQuery();
	const { data: links } = useGetSavedLink(user?.auth_id ?? "");
	const styleLinks = useGenerateLinkFormValue(links ?? []);
	const sharedLink =
		user && `${import.meta.env.VITE_HOST}account/preview/${user.auth_id}`;
	const clipBtnHandler = async () => {
		try {
			if (sharedLink) {
				await navigator.clipboard.writeText(sharedLink);
			}
			toast("Link Copied", { duration: 750 });
		} catch (error) {
		}
	};

	return (
		<div className="w-screen h-screen relative md:p-6 md:bg-milk">
			<div className="hidden absolute w-full h-[350px] top-0 left-0 bg-primary rounded-b-2xl z-10 md:block" />
			<div className="px-6 py-4 flex justify-between items-center md:bg-white md:rounded-xl md:relative md:z-20">
				<Link
					to={"/"}
					className="px-6 py-3 border border-primary rounded-xl font-semibold text-primary">
					Back to Editor
				</Link>
				<button
					className="px-6 py-3 font-semibold rounded-xl bg-primary text-white"
					onClick={clipBtnHandler}>
					Share Link
				</button>
			</div>
			<div className="py-10 flex flex-col items-center md:mt-20 md:max-w-fit md:h-fit md:mx-auto md:bg-white md:p-10 md:rounded-xl md:relative md:z-20 md:shadow-md">
				{user && (
					<div className="mb-14">
						<img
							src={
								user?.image_url
									? `${
											import.meta.env.VITE_SUPABASE_URL
									  }/storage/v1/object/public/${user?.image_url}`
									: "/assets/images/icon-profile-details-header.svg"
							}
							alt="profile"
							className={cn(
								"aspect-square w-24  mb-6 mx-auto outline-primary outline-2",
								user?.image_url && "rounded-full",
							)}
						/>
						<h2 className="mb-2 text-center text-3xl text-black font-bold ">
							{user?.username}
						</h2>
						<p className="text-center text-paleGray">{user?.email}</p>
					</div>
				)}

				{links && (
					<ul className="w-full flex flex-col justify-center items-center gap-y-5">
						{styleLinks.map((item, idx) => (
							<li key={idx}>
								<Link
									to={item.link}
									target="_blank"
									className={cn(
										"min-w-60 p-4 flex items-center gap-x-4 rounded-lg text-white font-bold",
										item.platform?.border &&
											"border border-primary text-primary",
									)}
									style={{ backgroundColor: item.platform?.color }}>
									<img
										src={item.platform?.logo}
										alt={item.platform?.name}
									/>
									<span>{item.platform?.name}</span>
									<img
										src={
											item.platform?.border
												? "/assets/images/icon-arrow-right-black.svg"
												: "/assets/images/icon-arrow-right.svg"
										}
										alt="arrow"
										className="ml-auto"
									/>
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
			<Toaster />
		</div>
	);
};

export default Preview;
