import DoctorTable from "../Doctor/DoctorTable";
import "../../Css/Admin.css"
import AdminNavbar from "./AdminNavbar";
import AdminDoctorPageSide from "./AdminDoctorPageSide";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AdminDoctorPage() {
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
    
    useEffect(() => {
        fetch(`http://localhost:8080/doctor/admin/get/${id}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        )
            .then((response) => response.json())
            .then((data) => {
                setDoctor(data);
            });
    }, [id]);

    return (
        <div className="doc-page">
            <AdminNavbar />
            <div className="profile-body">
                <DoctorTable
                    doctor={doctor}
                    token={token}
                />
                <AdminDoctorPageSide
                    doctor={doctor}
                    loadDoctor={loadDoctor}
                />
            </div>
        </div>
    );
}

export default AdminDoctorPage;