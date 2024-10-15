/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import { selectItems } from "../constants";
import { useState } from "react";
import { cn } from "../util";

type SelectorProp = {
	name: string;
	control: Control<any>;
};

const Selector = ({ name, control }: SelectorProp) => {
	const [popupVisible, setPopupVisible] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="relative">
					<div
						className="w-full px-4 py-3 border border-black rounded-lg flex justify-between items-center cursor-pointer"
						onClick={() => {
							setPopupVisible(true);
							field.onChange(field.value);
						}}>
						{field.value ? (
							<div className="flex items-center gap-2">
								<img
									src={field.value.logo}
									alt={field.value.name}
									className="w-4 h-4"
								/>
								<span>{field.value.name}</span>
							</div>
						) : (
							<span>Select an item</span>
						)}
					</div>

					<ul
						className={cn(
							"absolute w-full max-h-[300px] rounded-lg mt-2 bg-white z-20 overflow-y-scroll",
							popupVisible && " border border-black",
						)}>
						{popupVisible &&
							selectItems.map((item) => (
								<li
									key={item.name}
									onClick={() => {
										field.onChange(item);
										setPopupVisible(false);
									}} // Pass the selected item to react-hook-form
									className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-200">
									<img
										src={item.logo}
										alt={item.name}
										className="w-4 h-4"
									/>
									<span>{item.name}</span>
								</li>
							))}
					</ul>

					{popupVisible && (
						<div
							className="fixed w-screen h-screen z-10 bg-transparent inset-0"
							onClick={() => setPopupVisible(false)}
						/>
					)}
				</div>
			)}
		/>
	);
};

export default Selector;
