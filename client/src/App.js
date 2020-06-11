import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import homepage from './routes/homepage'
import login from './routes/login'
import createMovie from './routes/createMovie'
import multiviewPage from './routes/multiviewPage'
import listviewPage from './routes/listviewPage'
import signup from './routes/signup'
import singleviewPage from './routes/singleView'
import userPage from './routes/userPage'

function App() {
  
  return (
    <Router>
    <div className="App">
      <Route path="/homepage" component={homepage}></Route>
      <Route path="/login" component={login}></Route>
      <Route path="/signup" component={signup}></Route>
      <Route path="/createMovie" component={createMovie}></Route>
      <Route path="/multiview" component={multiviewPage}></Route>
      <Route path="/listview" component={listviewPage}></Route>
      <Route path="/singleview/:movieId" component={singleviewPage}></Route>
      <Route path="/user" component={userPage}></Route>
    </div>
    </Router>
  );
}

export default App;
