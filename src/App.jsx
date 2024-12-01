import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Import the external CSS file

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ hobby: [] });
  const [id, setId] = useState(null);

  // Fetch posts from JSON Server
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error));
  }, [posts]);

  // Add or Update a post
  const handleAddPost = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`http://localhost:3000/posts/${id}`, newPost)
        .then((response) => {
          setPosts(posts.map((post) => (post.id === id ? response.data : post)));
          setNewPost({ hobby: [] });
          setId(null);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("http://localhost:3000/posts", newPost)
        .then((response) => {
          setPosts([...posts, response.data]);
          setNewPost({ hobby: [] });
        })
        .catch((error) => console.log(error));
    }
  };

  // Delete a post
  const handleDeletePost = (id) => {
    axios
      .delete(`http://localhost:3000/posts/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => console.log(error));
  };

  // Edit a post
  const handleEditPost = (post) => {
    setNewPost(post);
    setId(post.id);
  };

  // Handle input changes for new post and editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Handle checkbox change for hobbies
  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setNewPost({ ...newPost, hobby: [...newPost.hobby, value] });
    } else {
      setNewPost({ ...newPost, hobby: newPost.hobby.filter((hobby) => hobby !== value) });
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-5">CRUD Operations with React and JSON Server</h1>

        <form method="post" onSubmit={handleAddPost} className="border p-4 rounded shadow-sm">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <h2 className="my-3 text-center">{id ? "Edit Post" : "Add New Post"}</h2>

              {/* Name input */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  value={newPost.name || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={newPost.email || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Phone input */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone"
                  value={newPost.phone || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Hobby Title Row */}
              <div className="row-hobby mb-3">
                <label className="form-label">Hobbies</label>
              </div>

              {/* Hobby checkboxes in second row */}
              <div className="row-hobby hobby-checkbox mb-3">
                <div className="col">
                  <input
                    type="checkbox"
                    id="hobby1"
                    name="hobby"
                    value="Reading"
                    checked={newPost.hobby.includes("Reading")}
                    onChange={handleHobbyChange}
                  /> Reading
                </div>
                <div className="col">
                  <input
                    type="checkbox"
                    id="hobby2"
                    name="hobby"
                    value="Traveling"
                    checked={newPost.hobby.includes("Traveling")}
                    onChange={handleHobbyChange}
                  /> Traveling
                </div>
                <div className="col">
                  <input
                    type="checkbox"
                    id="hobby3"
                    name="hobby"
                    value="Sports"
                    checked={newPost.hobby.includes("Sports")}
                    onChange={handleHobbyChange}
                  /> Sports
                </div>
              </div>

              {/* Gender radio buttons */}
              <div className="row-gender mb-3">
                <label className="form-label">Gender</label><br />
                <div className="col">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={newPost.gender === "Male"}
                    onChange={handleInputChange}
                  /> Male
                </div>
                <div className="col">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={newPost.gender === "Female"}
                    onChange={handleInputChange}
                  /> Female
                </div>
                <div className="col">
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="Other"
                    checked={newPost.gender === "Other"}
                    onChange={handleInputChange}
                  /> Other
                </div>
              </div>

              {/* City input */}
              <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  placeholder="Enter city"
                  value={newPost.city || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="text-center">
                <button className="btn btn-primary">
                  {id ? "Update Post" : "Add Post"}
                </button>
              </div>
            </div>
          </div>
        </form>

        <h2 className="my-5 text-center">Posts List</h2>
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{post.name}</h5>
                  <p className="card-text"><strong>Email:</strong> {post.email}</p>
                  <p className="card-text"><strong>Phone:</strong> {post.phone}</p>
                  <p className="card-text"><strong>Hobbies:</strong> {post.hobby.join(", ")}</p>
                  <p className="card-text"><strong>Gender:</strong> {post.gender}</p>
                  <p className="card-text"><strong>City:</strong> {post.city}</p>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
