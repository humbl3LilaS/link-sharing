import LoginForm from "../form/LoginForm";

const Login = () => {
	return (
		<section className="p-8 w-screen h-screen justify-center items-center md:flex md:flex-col md:bg-milk">
			<header className="mb-16">
				<h1>
					<img
						src="/assets/images/logo-devlinks-large.svg"
						alt="Dev Links"
					/>
				</h1>
			</header>
			<div className="md:w-[618px] md:p-10 md:bg-white rounded-xl">
				<div className="mb-10">
					<h2 className="mb-2 text-2xl font-bold md:text-3xl">Login</h2>
					<p className="text-base font-normal text-[#737373]">
						Add your details below to get back into the app
					</p>
				</div>
				<LoginForm />
			</div>
		</section>
	);
};

export default Login;
