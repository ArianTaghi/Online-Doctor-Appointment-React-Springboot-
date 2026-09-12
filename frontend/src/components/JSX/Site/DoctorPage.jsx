import '../../Css/Site.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppointmentTable from './AppointmentTable';
import Navbar from '../User/Navbar';
import defaultUser from "../../../assets/user-defualt.png";
import { Stethoscope, Clock, Hospital, HeartPulse } from "lucide-react";

function DoctorPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(`http://localhost:8080/doctor/get/response/${id}`)
            .then(response => response.json())
            .then(data => {
                setDoctor(data)
            });

    }, [id]);
    if (doctor === null) {
        return <div>Loading...</div>;
    }
  return (
    <>
    <Navbar/>
    <div className="profile-body">
        <div className="appointment-selector">
            <AppointmentTable
                doctor={doctor}
                token={token}
            />
        </div>
        <div className="doctor-profile">
            <img
                className="profile-image"
                src={defaultUser}
                alt="User profile"
            />
            <div>
                <h5 className="doctor-info-name">
                    {doctor.username}
                </h5>
                <div className="doctor-info-list">
                    <div className="doctor-info-row">
                        <span className="doctor-info-icon"><HeartPulse size={18} /></span>
                        <span className="doctor-info-label">Speciality: </span>
                        <span className="doctor-info-value">{doctor.speciality}</span>
                    </div>
                    <div className="doctor-info-row">
                        <span className="doctor-info-icon"><Clock size={18} /></span>
                        <span className="doctor-info-label">Start Hour: </span>
                        <span className="doctor-info-value">{doctor.start}</span>
                    </div>
                    <div className="doctor-info-row">
                        <span className="doctor-info-icon"><Clock size={18} /></span>
                        <span className="doctor-info-label">End Hour: </span>
                        <span className="doctor-info-value">{doctor.end}</span>
                    </div>
                    <div className="doctor-info-row">
                        <span className="doctor-info-icon"><Hospital size={18} /></span>
                        <span className="doctor-info-label">Hospital: </span>
                        <span className="doctor-info-value">{doctor.hospital}</span>
                    </div>
                    <div className="doctor-info-row">
                        <span className="doctor-info-icon"><Stethoscope size={18} /></span>
                        <span className="doctor-info-label">Doctor Code: </span>
                        <span className="doctor-info-value">{doctor.docCode}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
);
}

export default DoctorPage;