import React from 'react';
import {
  BrowserRouter, Routes, Route, useLocation
} from "react-router-dom";

import LoginComponent from './user/LoginComponent';
import Register from './user/Register';
import Post_list from './post/Post_list';
import UserList from './user/UserList';
import PostCreate from './post/PostCreate';
import NotFound from './user/NotFound';

function App() {
  return (
    <>

      {!localStorage.getItem("token") ? (
        <>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<LoginComponent />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </>

      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/posts" element={<Post_list />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/post/create" element={<PostCreate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
     </>
  );
}

export default App;
