import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomeLayout from "./components/HomeLayout";
import Links from "./pages/Links";
import Preview from "./pages/Preview";
import { authRouteGuard, routeGuard } from "./loader/routeGuard";
import Profile from "./pages/Profile";

const routers = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		children: [
			{ index: true, element: <Links />, loader: routeGuard },
			{ path: "profile", element: <Profile />, loader: routeGuard },
		],
	},
	{ path: "/preview", element: <Preview />, loader: routeGuard },
	{
		path: "/auth",
		loader: authRouteGuard,
		children: [
			{ path: "login", element: <Login />, loader: authRouteGuard },
			{ path: "sign-up", element: <SignUp />, loader: authRouteGuard },
		],
	},
]);

function App() {
	return <RouterProvider router={routers} />;
}

export default App;
