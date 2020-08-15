import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Body from './components/Body';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    // Creating store at top level div
    <Provider store={store}>
      <div>
        
        <Navbar />
        <Body />
        
        <div className="mt-3 p-3 card-footer text-muted text-center">
          <a href="">&#169; Onto {new Date().getFullYear()}</a>
          <a href=""> API documentation</a>
          <a href=""> Help</a>
          <a href=""> Status</a>
          <a href=""> Blog</a>
          <a href=""> <i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </Provider>
  );
}

export default App;
