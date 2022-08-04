import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {UserStore} from './context/store/UserStore';
import {ProjectStore} from './context/store/ProjectStore';
import {TaskStore} from './context/store/TaskStore';
import {SubtaskStore} from './context/store/SubtaskStore';
import {MemberStore} from './context/store/MemberStore';
import {CommentStore} from './context/store/CommentStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserStore>
      <ProjectStore>
        <TaskStore>
          <SubtaskStore>
            <MemberStore>
              <CommentStore>
                <App />
              </CommentStore>
            </MemberStore>
          </SubtaskStore>
        </TaskStore>
      </ProjectStore>
    </UserStore>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
