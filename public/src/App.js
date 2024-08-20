import React from "react";
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from "./Pages/Register";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import SetAvatar from "./Pages/SetAvatar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ="/register" element={<Register/>}></Route>
        <Route path ="/" element={<Chat/>}></Route>
        <Route path ="/login" element={<Login/>}></Route>
        <Route path ="/setAvatar" element={<SetAvatar/>}></Route>

        

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
