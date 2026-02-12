import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { App } from './ui/App'
import Login from "./ui/pages/Login";
import Register from './ui/pages/Register';
import { RequireAuth } from "./components/RequireAuth";
import './ui/styles.css'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

        {/* ✅ App.tsx becomes the authenticated area */}
        <Route
          path="/*"
          element={
            <RequireAuth>
              <App />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);