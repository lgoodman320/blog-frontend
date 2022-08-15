import { useEffect, useState } from "react";
import APIUrl from "./APIUrl";
import { useNavigate, Link } from "react-router-dom";

const Admin = () => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const checkLoginStatus = async () => {
			const response = await fetch(`${APIUrl}/loginStatus`, {
				credentials: "include",
			});
			const data = await response.json();
			console.log(data);
			if (data.isLoggedIn) {
				getPosts();
			} else {
				navigate("/login");
			}
		};
		checkLoginStatus();
	}, [navigate]);

	const getPosts = async () => {
		const response = await fetch(`${APIUrl}/posts`);
		const data = await response.json();
		setPosts(data.posts);
	};

	const deletePost = async (id) => {
		if (window.confirm("You sure ya wanna delete this?")) {
			await fetch(`${APIUrl}/post/${id}`, {
				method: "DELETE",
				credentials: "include",
			});
			getPosts();
		}
	};

	return (
		<div>
			<h1>Admin</h1>
			<span
				onClick={async () => {
					await fetch(`${APIUrl}/logout`, { credentials: "include" });
					navigate("/login");
				}}
				style={{ color: "blue", textDecoration: "underline" }}
			>
				Logout
			</span>
			{" | "}
			<Link to="/admin/postEditor/new">New Post</Link>
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post) => {
						return (
							<tr key={post.id}>
								<td>{post.title}</td>
								<td>
									<Link to={`/admin/postEditor/${post.id}`}>
										Edit
									</Link>
								</td>
								<td>
									<span
										onClick={() => {
											deletePost(post.id);
										}}
									>
										Delete
									</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Admin;
