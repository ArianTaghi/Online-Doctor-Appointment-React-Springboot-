import {Stethoscope, LogOut} from "lucide-react";
import { useNavigate } from "react-router-dom";

function DocNavbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token")
    navigate("/register")
  }
  return (
    <nav className="navbar1">
      <p className="doctor-brand"><Stethoscope size={35}/>Doctor</p>
      <div className="nav-items">
        <button type="button" className='btn btn-primary' onClick={handleSignOut}>
            Signout
                <LogOut size={25} />
        </button>
      </div>
    </nav>
  );
}

export default DocNavbar;
