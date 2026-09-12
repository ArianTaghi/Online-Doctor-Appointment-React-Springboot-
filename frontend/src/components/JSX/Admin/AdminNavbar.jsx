import {Stethoscope,LogOut}from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminNavbar () {
    const navigate = useNavigate();
    
    const handleSignout = () => {
        localStorage.removeItem("token");
        navigate("/register");
    };


    return (
        <nav className="admin-navbar">

            <button 
            className="admin-btn"
            onClick={() => {navigate("/admin");}}
            >
                <Stethoscope size={28} strokeWidth={2.2} />
                <span>Doctor</span>
            </button>

            <button
                className="signout-btn"
                onClick={handleSignout}
            >
                <LogOut size={18} />
                <span>Sign out</span>
            </button>

        </nav>

    );
}

export default AdminNavbar;