import './App.css';
import { BrowserRouter as Router, Routes,Route }
    from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navabr from './components/Navabr';
import PostState from './context/posts/PostState';
import Login from './components/Login';
import SignUp from './components/SignUp';
function App() {
  return (
    <>
    <PostState>
      <Router>
        <Navabr/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
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
