import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatRooms from "./pages/ChatRooms";
import AuthLayer from "./layer";
import EmailVerification from "./pages/EmailVerification";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<EmailVerification />} />

        <Route
          path="/chat-rooms"
          element={
            <AuthLayer>
              <ChatRooms />
            </AuthLayer>
          }
        />
      </Routes>
    </>
  );
}

export default App;
