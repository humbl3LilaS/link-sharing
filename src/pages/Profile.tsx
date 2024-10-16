import { useGetUserInfo, useUserQuery } from "../api/query";
import ProfileForm from "../form/ProfileForm";

const Profile = () => {
	const { data: user } = useUserQuery();
	const { data: userDetail } = useGetUserInfo(user?.id ?? "");
	return (
		<div className="w-full p-4">
			<div className="p-6  bg-white rounded-lg shadow-md">
				<h2 className="mb-2 text-2xl font-bold">Profile Details</h2>
				<p className="text-paleGray">
					Add your details to create a personal touch to your profile
				</p>
				<ProfileForm defaultValues={userDetail} />
			</div>
		</div>
	);
};
export default Profile;
