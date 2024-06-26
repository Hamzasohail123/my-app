import React, { Component } from 'react';
import GetPost from './components/GetPost';
import CreatePost from './components/CreatePost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    posts: [],
   
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        const nextId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
        this.setState({ posts, nextId });
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  addPost = (newPost) => {
    newPost.id = this.state.nextId;
    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts],
      // increamt the id for next postt
      nextId: prevState.nextId + 1
    }));
  };

  updatePost = (updatedPost) => {
    this.setState(prevState => ({
      posts: prevState.posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      )
    }));
  };

  deletePost = (id) => {
    this.setState(prevState => ({
      posts: prevState.posts.filter(post => post.id !== id)
    }));
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
  
        <CreatePost addPost={this.addPost} />
        <GetPost posts={posts} updatePost={this.updatePost} deletePost={this.deletePost} />
        <ToastContainer />

      </div>
    );
  }
}

export default App;
