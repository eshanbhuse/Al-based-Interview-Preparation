import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Login from './pages/Auth/Login';
// import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Home/Dashboard';
import LandingPage from './pages/LandingPage';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import { Toaster } from 'react-hot-toast';
import UserProvider from './context/userContext';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path ="/" element ={<LandingPage />} />
          {/* <Route path ="/login" exact element ={<Login />} />
          <Route path ="/signUp" exact element ={<SignUp />} /> */}
          <Route path ="/dashboard" exact element ={<Dashboard />} />
          <Route path ="/interview-prep/:sessionId" exact element ={<InterviewPrep />} />
        </Routes>
      </Router>
      <Toaster
      toastOptions={{
        className: '',
        style: {
          fontSize: '13px'
        },
      }}
        />
    </div>
    </UserProvider>
  )
}



export default App