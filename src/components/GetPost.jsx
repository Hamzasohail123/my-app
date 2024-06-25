import React, { Component } from 'react';

class GetPost extends Component {
  state = {
    isEditing: null,
    editTitle: '',
    editBody: ''
  };

  handleEdit = (post) => {
    this.setState({
      isEditing: post.id,
      editTitle: post.title,
      editBody: post.body
    });
  }

  handleUpdate = (id) => {
    const { editTitle, editBody } = this.state;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: editTitle, body: editBody }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(updatedPost => {
        this.props.updatePost(updatedPost);
        this.setState({ isEditing: null, editTitle: '', editBody: '' });
      })
      .catch(error => console.error('Error updating post:', error));
  };

  handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.props.deletePost(id);
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  render() {
    const { posts } = this.props;
    const { isEditing, editTitle, editBody } = this.state;

    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Posts</h2>
        <ul className="list-disc pl-5 space-y-2">
          {posts.map(post => (
            <li key={post.id} className="text-gray-700 mb-4">
              {isEditing === post.id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={e => this.setState({ editTitle: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  />
                  <textarea
                    value={editBody}
                    onChange={e => this.setState({ editBody: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  ></textarea>
                  <button
                    onClick={() => this.handleUpdate(post.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => this.setState({ isEditing: null, editTitle: '', editBody: '' })}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p>{post.body}</p>
                  <button
                    onClick={() => this.handleEdit(post)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleDelete(post.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GetPost;
