import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreatePost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setLoading] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      toast.error('Please fill both title and body fieldsss.');
      return;
    }

    setLoading(true); 

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(newPost => {
        console.log('New post created:', newPost);
        addPost(newPost);
        toast.success('New Post created successfully');
        setTitle('');
        setBody('');
      })
      .catch(error => {
        console.error('Error creating post:', error);
        toast.error('Error creating post. Please try again later.');
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Post</h2>
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Create Post'}
      </button>
    </form>
  </div>
  );
};

export default CreatePost;
