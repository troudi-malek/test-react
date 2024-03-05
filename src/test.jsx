import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    body: '',
    author: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/blogs', newBlog);
      console.log(response.data);
      
      // Optionally, you can fetch the updated list of blogs after adding a new one
      const updatedResponse = await axios.get('http://localhost:8000/blogs');
      setBlogs(updatedResponse.data);

      // Clear the form fields after successful submission
      setNewBlog({
        title: '',
        body: '',
        author: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/blogs/${id}`);
      // Fetch the updated list of blogs after deletion
      const updatedResponse = await axios.get('http://localhost:8000/blogs');
      setBlogs(updatedResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Body:
          <textarea
            name="body"
            value={newBlog.body}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add Blog</button>
      </form>

      {/* Display existing blogs with delete buttons */}
      <div>
        <h2>Existing Blogs:</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <button onClick={() => handleDelete(blog.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Test;
