import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema, SingupSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const SignupForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SingupSchemaType>({ resolver: zodResolver(SignupSchema) });

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
					className="mb-1 text-xs">
					Username
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg">
					<img
						src="/assets/images/user.svg"
						alt="username"
						className="aspect-square w-4"
					/>
					<input
						className="flex-1 focus:outline-none"
						placeholder="e.g SuperEdelweiss"
						id="username"
						type="text"
						{...register("username")}
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="email"
					className="mb-1 text-xs">
					Email address
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg">
					<img
						src="/assets/images/icon-email.svg"
						alt="email"
						className="aspect-square w-4"
					/>
					<input
						className="flex-1 focus:outline-none"
						placeholder="e.g alex@email.com"
						id="email"
						type="text"
						{...register("email")}
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="password"
					className="mb-1 text-xs">
					Password
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg">
					<img
						src="/assets/images/icon-password.svg"
						alt="password"
						className="aspect-square w-4"
					/>
					<input
						className="flex-1 focus:outline-none"
						placeholder="e.g sup@asd2we3"
						id="password"
						type="password"
						{...register("password")}
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="confirm-password"
					className="mb-1 text-xs">
					Confirm Password
				</label>
				<div className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg">
					<img
						src="/assets/images/icon-password.svg"
						alt="confirm password"
						className="aspect-square w-4"
					/>
					<input
						className="flex-1 focus:outline-none"
						placeholder="e.g sup@asd2we3"
						id="confirm-password"
						type="password"
						{...register("confirmPassword")}
					/>
				</div>
			</div>

			<button className="py-3 px-7 rounded-lg bg-[#633cff] font-semibold text-white">
				Create new account
			</button>

			<div>
				<p className="text-[#737373] text-center">Already have an account</p>
				<p className="text-center">
					<Link
						to={"/auth/login"}
						className="text-[#633cff]">
						Login
					</Link>
				</p>
			</div>
		</form>
	);
};

export default SignupForm;
