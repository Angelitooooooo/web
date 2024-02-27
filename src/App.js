import React from 'react';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login'
import ApplicationBar from './components/ApplicationBar';

const isAuthenticated = !!localStorage.getItem('token');


const router = createBrowserRouter([
  {
    path: '/',
    element: isAuthenticated ? <ApplicationBar /> : <Login />,
    children: [
      { path: '/', element: isAuthenticated ? <ApplicationBar /> : <Login /> }
    ]
  },
  {
    path : '/login',
    element : <Login/>
  },

])
function App() {
  console.log(localStorage.getItem('myKey'))
  return <RouterProvider router={router}/>
}

export default App;
