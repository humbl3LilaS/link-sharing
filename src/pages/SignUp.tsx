import SignupForm from "../form/SignupForm";

const SignUp = () => {
	return (
		<section className="p-8 w-screen h-screen justify-center items-center md:flex md:flex-col md:bg-[#fafafa]">
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
					<h2 className="mb-2 text-2xl font-bold md:text-3xl">
						Create account
					</h2>
					<p className="text-base font-normal text-[#737373]">
						Let's get you started sharing your links!
					</p>
				</div>
				<SignupForm />
			</div>
		</section>
	);
};

export default SignUp;
