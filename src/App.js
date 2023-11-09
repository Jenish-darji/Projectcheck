import './App.css';
import Login from './pages/login/login';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/signup/signup';
import MainPage from './pages/main-page';
import Addtask from './pages/addtask/addtask';
import AddNewProject from './pages/addproject/addproject';
import AdminMainPage from './pages/admin-mainpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/SignUp' element={<SignUp />}/>
          <Route path='/Login' element={<Login />}/>
          <Route path='/AddTask' element={<Addtask />}/>
          <Route path='/Admin' element={<AdminMainPage />}/>
          <Route path='/addproject' element={<AddNewProject />}/>
          
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
