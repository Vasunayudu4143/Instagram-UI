import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

// custom components imports 
import Login from './pages/login';
import Signup from './pages/signup';
import Homepage from './pages/homepage';
import Messenger from './pages/messenger';
import Createpost from './pages/createpost';
import Profile from './pages/profile';


function App() {
  return (
    <div className="App">
          
          <BrowserRouter>
             <Routes>
               
                 <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/homepage' element={<Homepage/>}/>
                <Route path='/messenger' element={<Messenger/>}/>
                <Route path='create' element={<Createpost/>}/>
                <Route path='/profile/:username' element={<Profile/>}/>
             </Routes>
          </BrowserRouter>
     
          
     </div>
  );
}

export default App;
