import { useNavigate } from "react-router-dom";
import defaultUser from "../../../assets/user-defualt.png";
import { Stethoscope, Hospital, ChevronRight } from "lucide-react";


function DoctorCard2({ name, speciality, path, hospital }) {
    const navigate = useNavigate();

    return (
        <div className='doctor-card'>
            <img
                    className="profile-image"
                    src={defaultUser}
                    alt="User profile"
            />
            <h4>
                {name}
            </h4>
            <div>
                <Stethoscope size={18} />{speciality}
            </div>
            <div>
                <Hospital size={18} />{hospital}
            </div>
            <button  className="doctor-card2-btn" onClick={() => navigate(path)}> navigate to doc page
              <ChevronRight size={18} />
        </button>
        </div>
    );
}
export default DoctorCard2;