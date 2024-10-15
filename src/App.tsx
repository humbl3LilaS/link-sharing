import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const routers = createBrowserRouter([
	{ path: "/", element: <div>Home</div> },
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
