import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import APIUrl from "./APIUrl";
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch(`${APIUrl}/posts`);
            const data = await response.json();
            setPosts(data.posts);
        };
        getPosts();

        const getAuthors = async () => {
            const response = await fetch(`${APIUrl}/authors`);
            const data = await response.json();
            setAuthors(data.authors);
        };

        getAuthors();
    }, []);

    return (
        <div>
            <h1>Larry's Awesome Blog</h1>
            {authors.map((author) => {
                return (
                    <span key={author.id}>
                        <Link to={`/author/${author.id}`}>
                            {author.username}
                        </Link>{" "}
                    </span>
                );
            })}

            {posts.map((post) => {
                return (
                    <div
                        key={post.id}
                        className="card"
                        style={{ marginTop: 10, marginBottom: 10 }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
							<h6>Post by: {post.user.username}</h6>
                            <p className="card-text">{post.content}</p>
                        </div>
                    </div>
                );
            })}
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Home;
