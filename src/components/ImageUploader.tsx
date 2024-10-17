import { useState } from "react";
import { Control, Controller } from "react-hook-form";

type ImageUploaderProps = {
	name: string;
	mediaUrl?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>;
};

const ImageUploader = ({ name, control, mediaUrl }: ImageUploaderProps) => {
	const [url, setUrl] = useState(() =>
		mediaUrl
			? `${
					import.meta.env.VITE_SUPABASE_URL
			  }/storage/v1/object/public/${mediaUrl}`
			: "",
	);
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div>
					<label
						htmlFor="profile"
						className="aspect-square w-48 mb-6 flex flex-col items-center justify-center gap-y-2 relative z-20 rounded-lg bg-tertiary">
						<img
							src="/assets/images/icon-upload-image.svg"
							className="relative z-20"
						/>
						<span className="font-semibold text-primary relative z-20">
							+ Upload Image
						</span>
						{url !== "" && (
							<img
								src={url}
								alt="profile"
								className="w-full h-full absolute inset-0 z-10 rounded-lg opacity-50"
							/>
						)}
					</label>

					<input
						type="file"
						id="profile"
						className="hidden"
						onChange={(evt) => {
							if (evt.target.files) {
								setUrl(URL.createObjectURL(evt.target.files[0]));
								field.onChange(evt.target.files ? evt.target.files[0] : []);
							}
						}}
					/>
				</div>
			)}
		/>
	);
};

export default ImageUploader;
