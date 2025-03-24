// ManageBlogs.tsx
import React, { useState } from "react";
import "./ManageBlogs.css";

export default function ManageBlogs() {
    const [posts, setPosts] = useState([
        { id: 1, content: "Chinh phục cung đường ven biển tuyệt đẹp!", image: "/assets/tech.jpg", likes: 10, comments: ["Quá đẹp!", "Ước gì được đi cùng"] },
        { id: 2, content: "Lần đầu leo đèo Bảo Lộc, quá phê!", image: "/assets/sv2.jpg", likes: 15, comments: ["Cảnh đẹp quá", "Tuyệt vời!"] },
    ]);
    const [newPost, setNewPost] = useState("");
    const [newImage, setNewImage] = useState("");

    const addPost = () => {
        if (!newPost.trim() || !newImage.trim()) return;
        setPosts([{ id: Date.now(), content: newPost, image: newImage, likes: 0, comments: [] }, ...posts]);
        setNewPost("");
        setNewImage("");
    };

    const deletePost = (id) => setPosts(posts.filter(post => post.id !== id));

    const editPost = (id, newContent, newImageUrl) => {
        setPosts(posts.map(post => post.id === id ? { ...post, content: newContent, image: newImageUrl } : post));
    };

    const likePost = (id) => {
        setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes + 1 } : post));
    };

    const addComment = (id, comment) => {
        if (!comment.trim()) return;
        setPosts(posts.map(post => post.id === id ? { ...post, comments: [...post.comments, comment] } : post));
    };

    return (
        <div className="blogs-container">
            <h1>Manage Blogs</h1>

            <div className="create-post">
                <textarea placeholder="What's on your mind?" value={newPost} onChange={(e) => setNewPost(e.target.value)} />
                <input type="text" placeholder="Image URL (required)" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
                <button className="btn-primary" onClick={addPost}>Post</button>
            </div>

            {posts.map(post => (
                <div className="post-card" key={post.id}>
                    <p className="post-content">{post.content}</p>
                    <img src={post.image} alt="Post" className="post-image" style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "10px" }} />
                    <div className="post-actions">
                        <button className="btn-like" onClick={() => likePost(post.id)}>👍 {post.likes}</button>
                        <button className="btn-delete" onClick={() => deletePost(post.id)}>🗑 Delete</button>
                        <button className="btn-edit" onClick={() => {
                            const newContent = prompt("Edit post content:", post.content);
                            const newImageUrl = prompt("Edit image URL:", post.image);
                            if (newContent !== null && newImageUrl !== null) editPost(post.id, newContent, newImageUrl);
                        }}>✏️ Edit</button>
                    </div>

                    <div className="comments-section">
                        <h4>Comments ({post.comments.length})</h4>
                        {post.comments.map((cmt, index) => (
                            <p key={index}>💬 {cmt}</p>
                        ))}
                        <input
                            placeholder="Write a comment..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') addComment(post.id, e.target.value), e.target.value = '';
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
