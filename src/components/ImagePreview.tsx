import { useGetSavedLink, useUserQuery } from "../api/query";
import { useGenerateLinkFormValue } from "../hook/useGenerateLinkFormValue";
import { cn } from "../util";

const ImagePreview = () => {
	const { data: user } = useUserQuery();
	const { data: links } = useGetSavedLink(user?.id);

	const styledLinks = useGenerateLinkFormValue(links ?? []).map(
		(item) => item.platform,
	);

	return (
		<div className="hidden min-w-[560px]  items-center justify-center relative lg:flex bg-milk">
			<div className="absolute w-full h-full inset-0 flex items-center justify-center z-10">
				<img
					src="assets/images/illustration-phone-mockup.svg"
					alt=""
					width={307}
					height={630}
				/>
			</div>
			<div className="relative h-[611px] w-[258px] flex flex-col items-center z-20">
				{/* profile rect */}
				<div className="w-[237px] h-[158px] mt-14 my-12 flex flex-col items-center">
					{user?.image_url ? (
						<img
							src={`${
								import.meta.env.VITE_SUPABASE_URL
							}/storage/v1/object/public/${user?.image_url}`}
							className="aspect-square w-24 rounded-full mb-5"
						/>
					) : (
						<span className="aspect-square w-24 rounded-full mb-5" />
					)}
					<div className="bg-white">
						<h2 className="mb-2 text-center text-xl text-black font-bold ">
							{user?.username}
						</h2>
						<p className="text-center text-paleGray">{user?.email}</p>
					</div>
				</div>
				<ul className="relative flex flex-col z-20 gap-y-4">
					{styledLinks &&
						styledLinks.length < 6 &&
						styledLinks.map((item, idx) => (
							<li key={idx}>
								<span
									className={cn(
										"min-w-60 px-4 py-3 flex items-center gap-x-4 rounded-lg text-white font-bold",
										item?.border && "border border-primary text-primary",
									)}
									style={{ backgroundColor: item?.color }}>
									<img
										src={item?.logo}
										alt={item?.name}
									/>
									<span>{item?.name}</span>
									<img
										src={
											item?.border
												? "/assets/images/icon-arrow-right-black.svg"
												: "/assets/images/icon-arrow-right.svg"
										}
										alt="arrow"
										className="ml-auto"
									/>
								</span>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default ImagePreview;
