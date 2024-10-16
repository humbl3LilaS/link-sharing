import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Selector from "../components/Selector";
import { SelectItem } from "../constants";
import { useUserQuery } from "../api/query";
import { useEffect } from "react";
import { LinkUpdateProps } from "../api/api.types";
import { useDeleteLink, useUpdateLink } from "../api/mutation";

export interface LinkFormInput {
	fields: {
		platform: SelectItem | null;
		link: string;
	}[];
}

type LinkFormProps = {
	defaultValues: LinkFormInput["fields"];
};

const LinksForm = ({ defaultValues }: LinkFormProps) => {
	const { data: user } = useUserQuery();
	const { mutateAsync: updateLink } = useUpdateLink();
	const { mutateAsync: deleteLink } = useDeleteLink();

	const { register, control, handleSubmit, reset } = useForm<LinkFormInput>({
		defaultValues: {
			fields: defaultValues,
		},
	});

	useEffect(() => {
		reset({ fields: defaultValues });
	}, [defaultValues]);

	const onSubmit: SubmitHandler<LinkFormInput> = async (value) => {
		const payload = value.fields.reduce((arr, val, idx) => {
			if (idx < defaultValues.length) {
				if (
					val.platform?.name !== defaultValues[idx].platform?.name ||
					val.link !== defaultValues[idx].link
				) {
					const processedValue = {
						data: {
							id: defaultValues[idx].platform?.id,
							origin: val.platform?.name,
							link: val.link,
						},
						isInsert: false,
					};
					return [...arr, processedValue];
				} else {
					return [...arr];
				}
			} else {
				const processedValue = {
					data: {
						user_id: user?.id,
						origin: val.platform?.name,
						link: val.link,
					},
					isInsert: true,
				};
				return [...arr, processedValue];
			}
		}, [] as LinkUpdateProps[]);
		console.log(payload);
		if (payload.length > 0) {
			await updateLink(payload);
		} else {
			return;
		}
		console.log("update finished");
	};

	const { fields, append, remove } = useFieldArray({ control, name: "fields" });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const removeHandler = async (idx: number, field: any) => {
		remove(idx);
		const deletedLink = await deleteLink(field?.platform?.id);
		if (deletedLink) {
			console.log("error");
		}
		console.log(deletedLink);
	};

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
								onClick={() => removeHandler(idx, field)}
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
