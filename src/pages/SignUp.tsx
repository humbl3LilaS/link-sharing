import SignupForm from "../form/SignupForm";

const SignUp = () => {
	return (
		<section className="p-8">
			<header className="mb-16">
				<h1>
					<img
						src="/assets/images/logo-devlinks-large.svg"
						alt="Dev Links"
					/>
				</h1>
			</header>
			<div className="mb-10">
				<h2 className="mb-2 text-2xl font-bold">Create account</h2>
				<p className="text-base font-normal">
					Let's get you started sharing your links!
				</p>
			</div>
			<SignupForm />
		</section>
	);
};

export default SignUp;
