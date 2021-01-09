import React from "react";
import "./App.scss";
import AppRoutes from "./components/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";
function App() {

  return (
    <MessageProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MessageProvider>
  );
}

export default App;
