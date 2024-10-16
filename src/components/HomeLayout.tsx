import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { cn } from "../util";
import ImagePreview from "./ImagePreview";

const HomeLayout = () => {
	const [isLargeDevice, setIsLargeDevice] = useState(window.innerWidth >= 768);

	useEffect(() => {
		const mediaQuery: MediaQueryList = window.matchMedia("(min-width: 768px)");

		const handleMediaChange = (e: MediaQueryListEvent) => {
			setIsLargeDevice(e.matches);
		};

		setIsLargeDevice(mediaQuery.matches);

		mediaQuery.addEventListener("change", handleMediaChange);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaChange);
		};
	}, []);

	return (
		<section className="w-screen h-screen bg-milk md:p-6 ">
			<header className="p-4 mb-6 flex items-center justify-between bg-white rounded-xl shadow-">
				<h1 className="px-4 py-3">
					<img
						src={
							isLargeDevice
								? "/assets/images/logo-devlinks-large.svg"
								: "/assets/images/logo-devlinks-small.svg"
						}
						alt=""
						className="max-w-32"
					/>
				</h1>
				<div className="flex justify-center items-center">
					<NavLink
						to={"/"}
						className={({ isActive }) =>
							cn(
								"px-7 py-3 flex items-center gap-x-2 group",
								isActive &&
									"bg-tertiary rounded-lg *:*:fill-primary *:text-primary",
							)
						}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="21"
							height="20"
							fill="none"
							viewBox="0 0 21 20"
							className="group-hover:*:fill-primary">
							<path
								fill="#737373"
								className="transition-colors duration-500"
								d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z"
							/>
						</svg>
						<span className="hidden text-black group-hover:text-primary transition-colors duration-500 md:block">
							Links
						</span>
					</NavLink>
					<NavLink
						to={"/profile"}
						className={({ isActive }) =>
							cn(
								"px-7 py-3 flex items-center gap-x-2 group",
								isActive &&
									"bg-tertiary rounded-lg *:*:fill-primary *:text-primary",
							)
						}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="21"
							height="20"
							fill="none"
							viewBox="0 0 21 20"
							className="group-hover:*:fill-primary">
							<path
								fill="#737373"
								className="transition-colors duration-500"
								d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"
							/>
						</svg>
						<span className="hidden text-black group-hover:text-primary transition-colors duration-500 md:block">
							Profile
						</span>
					</NavLink>
				</div>
				<Link
					to="preview"
					className="px-4 py-3 border border-primary rounded-lg transition-colors duration-500 hover:bg-tertiary">
					<img
						src="/assets/images/icon-preview-header.svg"
						alt=""
						className="md:hidden"
					/>
					<span className="hidden px-6 text-primary font-semibold md:block">
						Preview
					</span>
				</Link>
			</header>
			<div className="flex">
				<ImagePreview />
				<Outlet />
			</div>
		</section>
	);
};

export default HomeLayout;
