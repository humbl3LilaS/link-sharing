import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema, SingupSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "../util";

const SignupForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
		getValues,
	} = useForm<SingupSchemaType>({ resolver: zodResolver(SignupSchema) });

	const [showPassword, setShowPassword] = useState({
		password: false,
		confirmPassword: false,
	});

	// const isPasswordValid =
	// 	getValues("password") === getValues("confirmPassword");

	const togglePasswordField = (payload: {
		password?: boolean;
		confirmPassword?: boolean;
	}) => {
		setShowPassword((prev) => ({ ...prev, ...payload }));
	};

	const onSubmit: SubmitHandler<SingupSchemaType> = (value) => {
		console.log(value);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-y-6">
			<div>
				<label
					htmlFor="username"
					className="mb-1 block text-xs lg:text-lg lg:mb-4">
					Username
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg focus-within:border-primary">
					<img
						src="/assets/images/user.svg"
						alt="username"
						className="aspect-square w-4 md:w-8"
					/>
					<input
						className="flex-1 focus:outline-none md:placeholder:text-lg lg:p-4"
						placeholder="e.g SuperEdelweiss"
						id="username"
						type="text"
						{...register("username")}
					/>
					{errors.username && (
						<span className="absolute right-[15%] text-sm text-danger">
							{errors.username.message}
						</span>
					)}
				</div>
			</div>

			<div>
				<label
					htmlFor="email"
					className="mb-1 block text-xs lg:text-lg lg:mb-4">
					Email address
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg focus-within:border-primary">
					<img
						src="/assets/images/icon-email.svg"
						alt="email"
						className="aspect-square w-4 md:w-8"
					/>
					<input
						className="flex-1 focus:outline-none md:placeholder:text-lg lg:p-4"
						placeholder="e.g alex@email.com"
						id="email"
						type="text"
						{...register("email")}
					/>
					{errors.email && (
						<span className="absolute right-[15%] text-sm text-danger">
							{errors.email.message}
						</span>
					)}
				</div>
			</div>

			<div>
				<label
					htmlFor="password"
					className="mb-1 block text-xs lg:text-lg lg:mb-4">
					Password
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg focus-within:border-primary">
					<img
						src="/assets/images/icon-password.svg"
						alt="password"
						className="aspect-square w-4 md:w-8"
					/>
					<input
						className="flex-1 focus:outline-none md:placeholder:text-lg lg:p-4"
						placeholder="e.g sup@asd2we3"
						id="password"
						type={showPassword.password ? "text" : "password"}
						{...register("password")}
					/>
					<img
						src={
							!showPassword.password
								? "/assets/images/icon-preview-header.svg"
								: "/assets/images/eye-off.svg"
						}
						className={cn(
							"aspect-square",
							showPassword.password ? "w-4" : "w-5",
						)}
						onClick={() =>
							togglePasswordField({ password: !showPassword.password })
						}
					/>
				</div>
				{errors.password && (
					<p className="mt-2 text-sm text-danger">{errors.password.message}</p>
				)}
			</div>

			<div>
				<label
					htmlFor="confirm-password"
					className="mb-1 block text-xs lg:text-lg lg:mb-4">
					Confirm Password
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg focus-within:border-primary">
					<img
						src="/assets/images/icon-password.svg"
						alt="confirm password"
						className="aspect-square w-4 md:w-8"
					/>
					<input
						className="flex-1 focus:outline-none md:placeholder:text-lg lg:p-4"
						placeholder="e.g sup@asd2we3"
						id="confirm-password"
						type={showPassword.confirmPassword ? "text" : "password"}
						{...register("confirmPassword")}
					/>
					<img
						src={
							!showPassword.confirmPassword
								? "/assets/images/icon-preview-header.svg"
								: "/assets/images/eye-off.svg"
						}
						className={cn(
							"aspect-square",
							showPassword.confirmPassword ? "w-4" : "w-5",
						)}
						onClick={() =>
							togglePasswordField({
								confirmPassword: !showPassword.confirmPassword,
							})
						}
					/>
				</div>
				{errors.confirmPassword && (
					<p className="mt-2 text-sm text-danger">
						{errors.confirmPassword.message}
					</p>
				)}
			</div>

			<button
				className="py-3 px-7 rounded-lg bg-primary font-semibold  text-white lg:text-lg lg:py-5
					disabled:bg-tertiary active:bg-secondary"
				disabled={isSubmitting || !isValid}>
				{isSubmitting ? "Submiting" : "Create new account"}
			</button>

			<div>
				<p className="text-[#737373] text-center lg:text-lg">
					Already have an account
				</p>
				<p className="text-center lg:text-lg">
					<Link
						to={"/auth/login"}
						className="text-primary">
						Login
					</Link>
				</p>
			</div>
		</form>
	);
};

export default SignupForm;
