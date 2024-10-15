import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomeLayout from "./components/HomeLayout";
import Links from "./pages/Links";

const routers = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		children: [
			{ index: true, element: <Links /> },
			{ path: "profile", element: <div>profile</div> },
			{ path: "preview", element: <div>preview</div> },
		],
	},
	{
		path: "/auth",
		children: [
			{ path: "login", element: <Login /> },
			{ path: "sign-up", element: <SignUp /> },
		],
	},
]);

function App() {
	return <RouterProvider router={routers} />;
}

export default App;
