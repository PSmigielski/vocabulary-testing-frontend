import React, { useEffect } from "react";
import "./App.scss";
import AppRoutes from "./components/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";
import axios from 'axios';
function App() {
  useEffect(()=>{
    const getCsrfToken = async () =>{
      const {data} = await axios.get('/user/csrf-token');
      axios.defaults.headers['X-CSRF-TOKEN'] = data.csrfToken
    }
    getCsrfToken()
  },[])
  return (
    <MessageProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MessageProvider>
  );
}

export default App;
