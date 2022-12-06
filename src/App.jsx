import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {BrowserRouter, Route, Routes , Navigate} from "react-router-dom";


const App = () => {
  const user = true;
   return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ?<Home /> :<Navigate to="/register"/>} ></Route>
        <Route path="/register" element={!user ?<Register /> :<Navigate to="/"/>} ></Route>
        <Route path="/login" element={!user ?<Login /> :<Navigate to="/"/>} exact></Route>
        {user &&(
          <>
        <Route path="/movies" element={<Home type="movie" />} exact></Route>
        <Route path="/series" element={<Home type="series" />} exact></Route>
        <Route path="/watch" element={<Watch />} exact></Route>
        </>
        )}

        
      </Routes>
    </BrowserRouter>
   )
  // (
  //   <div>
     
  //   <Routes>
  //     <Route path="/" element={<Home/>} exact/>
  //   </Routes>
    
  //   </div>
  // );
};

export default App;