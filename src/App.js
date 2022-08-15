import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Admin from "./Admin";
import PostEditor from "./PostEditor";
import Author from "./Author";

function App() {
	return (
		<div className="App container">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/admin" element={<Admin />} />
					<Route
						path="/admin/postEditor/:id"
						element={<PostEditor />}
					/>
					<Route path="/author/:id" element={<Author />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
