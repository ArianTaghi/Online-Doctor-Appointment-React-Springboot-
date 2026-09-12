import RouterBtn from '../Site/RouterBtn';
import { useState } from 'react';
import {Stethoscope}from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
      const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  return (
    <nav className="navbar1">
     <button 
            className="admin-btn"
                onClick={() => navigate("/")}>
                <Stethoscope size={28} strokeWidth={2.2} />
                <span>Doctor</span>
            </button>

        <div className="nav-items">
        <RouterBtn
          name="Appointment"
          path="/appointment"
        />
    {!token && (
        <RouterBtn
          name="SignIn"
          path="/register"
        />
    )}
    {token && (
      <RouterBtn
          name="Profile"
          path="/profile"
      />
    )}
    {token && (
      <button type="button" className='btn btn-primary' onClick={signout}>
          Signout
      </button>
    )}
  </div>
    </nav>
  );
}

export default Navbar;