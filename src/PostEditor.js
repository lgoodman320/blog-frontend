import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import APIUrl from "./APIUrl";

const PostEditor = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		const getPost = async () => {
			if (params.id !== "new") {
				const response = await fetch(`${APIUrl}/post/${params.id}`);
				const data = await response.json();
				setTitle(data.post.title);
				setContent(data.post.content);
			}
		};
		getPost();
	}, [params.id]);

	const post = async (evt) => {
		evt.preventDefault();

		if (params.id === "new") {
			await fetch(`${APIUrl}/post`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, content }),
				credentials: "include",
			});
		} else {
			await fetch(`${APIUrl}/post/${params.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, content }),
				credentials: "include",
			});
		}

		navigate("/admin");
	};

	return (
		<div>
			<h1>{params.id === "new" ? "New" : "Edit"} Post</h1>
			<Link to="/admin">Back to Admin Home</Link>
			<form onSubmit={post}>
				<label>Post Title:</label>
				<input
					type="text"
					className="form-control"
					value={title}
					onChange={(evt) => {
						setTitle(evt.target.value);
					}}
				/>
				<br />
				<label>Post Content:</label>
				<textarea
					className="form-control"
					value={content}
					onChange={(evt) => {
						setContent(evt.target.value);
					}}
				></textarea>
				<br />
				<button type="submit" className="btn btn-primary">
					Post
				</button>
			</form>
		</div>
	);
};

export default PostEditor;
