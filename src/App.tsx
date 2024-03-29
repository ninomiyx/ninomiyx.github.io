import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Navbar from './app/Navbar';
import Home from './app/Home';
import PostsList from './features/posts/PostList';
import './App.css';
import SinglePostPage from './features/posts/SinglePostPage';
import AddPostForm from './features/posts/AddPostForm';
import EditPostForm from './features/posts/editPostForm';
import LogInForm from './features/users/Login';
// import SignUp from './features/users/SignUp';
import SingleAuthorPostList from './features/posts/SingleAuthorPostList';
import EditProfile from './features/users/editProfile';

const App = (): JSX.Element => (
  <Router>
    <Navbar />
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:page" element={<PostsList />} />
        <Route path="/author/:authorId/:page" element={<SingleAuthorPostList />} />
        <Route path="/post/:postId" element={<SinglePostPage />} />
        <Route path="/editPost/:postId" element={<EditPostForm />} />
        <Route path="/login" element={<LogInForm />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/addnewpost" element={<AddPostForm />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </div>
  </Router>
);

export default App;
