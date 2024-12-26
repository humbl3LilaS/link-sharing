import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormSchema } from "../validation/index";
import { TUserData } from "../api/api.types";
import { useEffect } from "react";
import { useLogout, useUploadPhoto } from "../api/mutation";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import { useUserQuery } from "../api/query";

const ProfileForm = ({ defaultValues }: { defaultValues?: TUserData }) => {
	const {
		register,
		control,
		formState: { errors, isSubmitting, isValid, dirtyFields },
		handleSubmit,
		reset,
	} = useForm<ProfileSchemaType>({
		resolver: zodResolver(ProfileFormSchema),
		mode: "onBlur",
		defaultValues: defaultValues,
	});

	const { data: user } = useUserQuery();
	const { mutateAsync: logout } = useLogout();
	const { mutateAsync: uploadPhoto } = useUploadPhoto();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<ProfileSchemaType> = async (value) => {
		if (dirtyFields?.profile && value.profile && user) {
			const type = value.profile.type.split("/")[1];
			await uploadPhoto({
				path: `${user?.id}/assets/profile.${type}`,
				file: value.profile,
				userId: user?.id,
			});
		}
	};

	const logoutHandler = async () => {
		const data = await logout();
		if (data) {
			navigate("/auth/login");
		}
	};

	useEffect(() => {
		reset({ ...defaultValues });
	}, [defaultValues]);

	return (
		<div className="w-full mt-10">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="p-5 mb-6 bg-milk rounded-lg md:flex md:justify-between	 md:items-center md:gap-x-6">
					<p className="mb-4 text-paleGray md:mr-auto">Profile picture</p>
					{defaultValues && (
						<ImageUploader
							mediaUrl={defaultValues?.image_url}
							control={control}
							name={"profile"}
						/>
					)}
					<p className="text-sm text-paleGray">
						Image must be below 1024x1025px.
						<br className="hidden md:block" /> Use PNG or JGP format.
					</p>
				</div>
				<div className="p-5 rounded-lg bg-milk">
					<div className="mb-3">
						<label
							className="text-sm text-paleGray"
							htmlFor="firstName">
							FirstName*
						</label>
						<input
							type="text"
							className="w-full py-3 px-4 mt-2  border border-paleGray rounded-lg focus:outline-none"
							id="firstName"
							{...register("firstName")}
						/>
						{errors.firstName && <div>{errors.firstName.message}</div>}
					</div>
					<div className="mb-3">
						<label
							className="text-sm text-paleGray"
							htmlFor="lastName">
							LastName*
						</label>
						<input
							type="text"
							className="w-full py-3 px-4 mt-2  border border-paleGray rounded-lg focus:outline-none"
							id="lastName"
							{...register("lastName")}
						/>
						{errors.lastName && <div>{errors.lastName.message}</div>}
					</div>
					<div className="mb-3">
						<label
							className="text-sm text-paleGray"
							htmlFor="username">
							Username
						</label>
						<input
							type="text"
							className="w-full py-3 px-4 mt-2  border border-paleGray rounded-lg focus:outline-none"
							id="username"
							{...register("username")}
						/>
						{errors.username && <div>{errors.username.message}</div>}
					</div>

					<div>
						<label
							className="text-sm text-paleGray"
							htmlFor="email">
							Email
						</label>
						<input
							type="text"
							className="w-full py-3 px-4 mt-2  border border-paleGray rounded-lg focus:outline-none"
							id="email"
							{...register("email")}
						/>
						{errors.email && <div>{errors.email.message}</div>}
					</div>
				</div>
				<hr className="my-6" />
				<div className="flex items-center justify-between md:justify-end md:gap-x-4">
					<button
						className="w-1/3 py-3 px-6 rounded-lg bg-danger text-white font-bold md:max-w-[220px]"
						onClick={logoutHandler}>
						Log out
					</button>
					<button
						className="w-1/3 py-3 px-6 rounded-lg bg-primary text-white font-bold md:max-w-[220px]"
						type="submit"
						disabled={isSubmitting || !isValid}>
						{isSubmitting ? "Submiting" : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileForm;
