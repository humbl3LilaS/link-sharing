import {SubmitHandler, useForm} from "react-hook-form";
import {SignupSchema, SingupSchemaType} from "../validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {cn} from "../util";
import {singUpNewUser} from "../api/api";

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting, isValid},
    } = useForm<SingupSchemaType>({
        resolver: zodResolver(SignupSchema),
        mode: "onTouched",
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const togglePasswordField = (payload: {
        password?: boolean;
        confirmPassword?: boolean;
    }) => {
        setShowPassword((prev) => ({...prev, ...payload}));
    };

    const onSubmit: SubmitHandler<SingupSchemaType> = async (value) => {
        await singUpNewUser({
            email: value.email,
            password: value.password,
            username: value.username,
        });
        navigate("/");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6">
            <div>
                <label
                    htmlFor="username"
                    className="mb-1 block text-xs">
                    Username
                </label>
                <div
                    className="py-3 px-4 flex items-center gap-x-3 border relative border-[#d9d9d9] rounded-lg focus-within:border-primary">
                    <img
                        src="/assets/images/user.svg"
                        alt="username"
                        className="aspect-square w-4"
                    />
                    <input
                        className="flex-1 focus:outline-none "
                        placeholder="e.g SuperEdelweiss"
                        id="username"
                        type="text"
                        {...register("username")}
                    />
                    {errors.username && (
                        <span className="absolute right-[10%] text-sm text-danger md:right-[5%]">
							{errors.username.message}
						</span>
                    )}
                </div>
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="mb-1 block text-xs ">
                    Email address
                </label>
                <div
                    className="py-3 px-4 flex items-center gap-x-3 relative border border-[#d9d9d9] rounded-lg focus-within:border-primary">
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
                <div
                    className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg focus-within:border-primary">
                    <img
                        src="/assets/images/icon-password.svg"
                        alt="password"
                        className="aspect-square w-4 "
                    />
                    <input
                        className="flex-1 focus:outline-none "
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
                            togglePasswordField({password: !showPassword.password})
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
                    className="mb-1 block text-xs ">
                    Confirm Password
                </label>
                <div
                    className="py-3 px-4 flex items-center gap-x-3 border border-[#d9d9d9] rounded-lg focus-within:border-primary">
                    <img
                        src="/assets/images/icon-password.svg"
                        alt="confirm password"
                        className="aspect-square w-4 "
                    />
                    <input
                        className="flex-1 focus:outline-none "
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
                className="py-3 px-7 rounded-lg bg-primary font-semibold  text-white
					disabled:bg-tertiary active:bg-secondary"
                disabled={isSubmitting || !isValid}>
                {isSubmitting ? "Submiting" : "Create new account"}
            </button>

            <div>
                <p className="text-[#737373] text-center ">Already have an account</p>
                <p className="text-center ">
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
