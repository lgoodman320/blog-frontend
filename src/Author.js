import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIUrl from "./APIUrl";
const Author = () => {
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");
    console.log(params.id);

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`${APIUrl}/author/${params.id}`);
            const data = await response.json();
            setPosts(data.posts);
            setUsername(data.user.username);
        };
        getPost();
    }, [params.id]);

    return (
        <div>
            <h1>Author: {username}</h1>
            {posts.length === 0 ? (
                <p>User has not created any posts yet</p>
            ) : (
                posts.map((post) => {
                    return (
                        <div
                            key={post.id}
                            className="card"
                            style={{ marginTop: 10, marginBottom: 10 }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Author;
