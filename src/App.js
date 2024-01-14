import './App.css';
import { BrowserRouter as Router, Routes,Route, useParams }
    from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navabr from './components/Navabr';
import PostState from './context/posts/PostState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Account from './components/Account';
import NavFooter from './components/NavFooter';
function App() {
  const {userName}=useParams();
  return (
    <>
    <PostState>
      <Router>
        {/* <Navabr/> */}
        <Routes>
        <Route path='/' element={<NavFooter />} >
     <Route index element={<Home />} />
       <Route path="/:userName" element={<Account/>}/> 
      </Route>
          <Route exact path='/about' element={<About/>}/>    
          <Route exact path='/login' element={<Login/>}/>    
          <Route exact path='/signup' element={<SignUp/>}/>   
        </Routes>
      </Router>
      </PostState>
    </>
  );
}

export default App;
