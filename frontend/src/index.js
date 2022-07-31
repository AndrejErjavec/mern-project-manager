import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {UserStore} from './context/store/UserStore';
import {ProjectStore} from './context/store/ProjectStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserStore>
      <ProjectStore>
        <App />
      </ProjectStore>
    </UserStore>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
