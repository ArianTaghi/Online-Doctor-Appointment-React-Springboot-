import { useNavigate } from "react-router-dom";
import defaultUser from "../../../assets/user-defualt.png";
import { Stethoscope, Hospital, Building2 } from "lucide-react";

function DoctorCard({doctor, path}) {
    const navigate = useNavigate();

    return (
        <div className='doctor-card-user' onClick={() => navigate(path)}>
            <img
                    className="profile-image"
                    src={defaultUser}
                    alt="User profile"
            />
            <div className="doctor-name">
                {doctor.username}
            </div>
            <div>
                <Stethoscope size={18} />{doctor.speciality}
            </div>
            <div>
                <Hospital size={18} />{doctor.hospital}
            </div>
            <div>
                <Building2 size={18} />{doctor.city}
            </div>
            
        </div>
    );
}
export default DoctorCard;