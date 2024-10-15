import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Selector from "../components/Selector";
import { SelectItem } from "../constants";

interface LinkFormInput {
	fields: {
		platform: SelectItem | null;
		link: string;
	}[];
}

const LinksForm = () => {
	const { register, control, handleSubmit } = useForm<LinkFormInput>({
		defaultValues: {
			fields: [],
		},
	});

	const onSubmit: SubmitHandler<LinkFormInput> = async (value) => {
		console.log(value.fields[0].platform?.logo);
	};

	const { fields, append, remove } = useFieldArray({ control, name: "fields" });

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{fields.map((field, idx) => (
					<div
						key={field.id}
						className="p-5 mb-4 rounded-lg bg-milk">
						<div className="mb-3 flex items-center justify-between">
							<p className="flex items-center gap-x-2">
								<img
									src="/assets/images/menu.svg"
									alt="menu"
									className="aspect-square w-4"
								/>
								<span className="font-bold text-paleGray">Link#{idx + 1}</span>
							</p>
							<button
								className="text-danger"
								onClick={() => remove(idx)}
								type="button">
								Remove
							</button>
						</div>
						<div className="mb-3">
							<label
								htmlFor={`platform-${idx}`}
								className="block mb-2 text-xs text-black">
								Platform
							</label>
							<Selector
								control={control}
								name={`fields.${idx}.platform`}
							/>
						</div>
						<div>
							<label
								htmlFor={`link-${idx}`}
								className="block mb-2 text-xs text-black">
								Platform
							</label>
							<input
								id={`link-${idx}`}
								{...register(`fields.${idx}.link` as const)}
								placeholder="value"
								className="w-full px-4 py-3 focus:outline-none  border border-black rounded-lg"
							/>
						</div>
					</div>
				))}
				<button
					type="button"
					onClick={() => append({ platform: null, link: "" })}
					className="w-full py-3 rounded-lg border border-primary text-primary transition-colors duration-500 hover:bg-tertiary font-semibold">
					+ Add new link
				</button>
				{fields.length === 0 && (
					<div className="p-5 mt-6 bg-milk rounded-xl">
						<img
							src="/assets/images/illustration-empty.svg"
							alt="illustratin"
							className="block mx-auto md:w-60 md:my-10"
							width={124}
							height={80}
						/>
						<h3 className="my-6 text-2xl text-center font-bold">
							Let's get you started
						</h3>
						<p className="mb-6 mx-auto text-base text-center text-paleGray md:max-w-[480px]">
							Use the "Add new link" button to get started. Once you have more
							than one link you can reorder and edit them. We're here the help
							you share your profiles with everyone!
						</p>
					</div>
				)}
				<button
					type="submit"
					className="block w-full mt-6 py-3 rounded-lg bg-primary font-bold text-white transition-colors duration-500 hover:bg-secondary md:w-fit md:ml-auto md:px-6">
					Save
				</button>
			</form>
		</div>
	);
};

export default LinksForm;
