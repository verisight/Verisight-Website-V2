import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
//import { useStore } from "./hooks/useStrore";

function App() {
  //const setAuthData = useStore((state: any) => state.setAuthData);
  return (
    <GoogleOAuthProvider clientId="1016920774662-93hbr50o5ocvu2k09fodt0m8pum26k0a.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
