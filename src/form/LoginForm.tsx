import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../util";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/api";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		mode: "onBlur",
	});

	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const onSubmit: SubmitHandler<LoginSchemaType> = async (value) => {
		console.log(value);
		const user = await signIn({ email: value.email, password: value.password });
		console.log(user.session);
		console.log(user.user);
		return navigate("/");
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-y-6">
			<div>
				<label
					htmlFor="email"
					className="mb-1 block text-xs ">
					Email address
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 relative border border-[#d9d9d9] rounded-lg focus-within:border-primary">
					<img
						src="/assets/images/icon-email.svg"
						alt="email"
						className="aspect-square w-4 "
					/>
					<input
						className="flex-1 focus:outline-none "
						placeholder="e.g alex@email.com"
						id="email"
						type="text"
						{...register("email")}
					/>
					{errors.email && (
						<span className="absolute right-[10%] text-sm text-danger md:right-[5%]">
							{errors.email.message}
						</span>
					)}
				</div>
			</div>

			<div>
				<label
					htmlFor="password"
					className="mb-1 block text-xs ">
					Password
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg focus-within:border-primary">
					<img
						src="/assets/images/icon-password.svg"
						alt="password"
						className="aspect-square w-4 "
					/>
					<input
						className="flex-1 focus:outline-none "
						placeholder="e.g sup@asd2we3"
						id="password"
						type={showPassword ? "text" : "password"}
						{...register("password")}
					/>
					<img
						src={
							!showPassword
								? "/assets/images/icon-preview-header.svg"
								: "/assets/images/eye-off.svg"
						}
						className={cn("aspect-square", showPassword ? "w-4" : "w-5")}
						onClick={() => setShowPassword((prev) => !prev)}
					/>
				</div>
				{errors.password && (
					<p className="mt-2 text-sm text-danger">{errors.password.message}</p>
				)}
			</div>

			<button
				className="py-3 px-7 rounded-lg bg-primary font-semibold  text-white 
					disabled:bg-tertiary active:bg-secondary"
				disabled={isSubmitting || !isValid}>
				{isSubmitting ? "Submiting" : "Login"}
			</button>

			<div>
				<p className="text-[#737373] text-center ">Don't have an account?</p>
				<p className="text-center ">
					<Link
						to={"/auth/sign-up"}
						className="text-primary">
						Create account
					</Link>
				</p>
			</div>
		</form>
	);
};

export default LoginForm;
