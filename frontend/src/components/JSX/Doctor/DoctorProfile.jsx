import DoctorTable from "./DoctorTable";
import "../../Css/Doctor.css"
import DocNavbar from "./DocNavbar";
import DoctorProfileSideBar from "./DoctorProfileSideBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DoctorProfile() {
    const token = localStorage.getItem("token");
    const [doctor, setDoctor] = useState(null);
    const { id } = useParams();

    function loadDoctor() {
            fetch(`http://localhost:8080/doctor/admin/get/${id}`, {
                method: "GET",
                headers: {"Authorization": `Bearer ${token}`}
            })
                .then((response) => response.json())
                .then((data) => {
                    setDoctor(data);
                });
        }
    
    
    useEffect(() => {
        loadDoctor();
    }, []);
    
    return (
        <div className="doc-page">
            <DocNavbar />
            <div className="doctor-profile-layout">
                <DoctorTable
                    doctor={doctor}
                    loadDoctor={loadDoctor}
                    token={token}
                />
                <DoctorProfileSideBar
                    doctor={doctor}
                    loadDoctor={loadDoctor}
                />
            </div>
        </div>
    );
}

export default DoctorProfile;