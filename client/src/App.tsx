import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Complete } from "./pages/Complete";
import { Toaster } from "./components/ui/toaster";
//import { useStore } from "./hooks/useStrore";

function App() {
  //const setAuthData = useStore((state: any) => state.setAuthData);
  return (
    <GoogleOAuthProvider clientId="1016920774662-93hbr50o5ocvu2k09fodt0m8pum26k0a.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/complete" element={<Complete />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
