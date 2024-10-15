import { useTestQuery } from "./api/query";

function App() {
	const { data } = useTestQuery();
	console.log(data);

	return <h1 className="text-3xl text-red-500">h1</h1>;
}

export default App;
