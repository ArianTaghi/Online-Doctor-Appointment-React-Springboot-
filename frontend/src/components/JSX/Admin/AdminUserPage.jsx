import AdminNavbar from "./AdminNavbar";
import { useEffect, useState } from "react";
import AppointmentCard from "../Site/AppointmentCard"
import "../../Css/Admin.css"
import { useParams } from "react-router-dom";
import AdminUserPageSide from "./AdminUserPageSide";

function AdminUserPage() {
    const { id } = useParams();
    const [latest, setLatest] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [ill, setIll] = useState(null)
    const token = localStorage.getItem("token");

    useEffect(() => {  
    console.log("TOKEN:", token);
        fetch(
            `http://localhost:8080/ill/admin/get/${id}`,
        {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
        }
        )
        .then(response => {
            if (!response.ok)
                throw new Error("Failed to fetch ill info");
            return response.json();
        })
        .then(data => {
            setIll(data);
        })
        .catch(error => {
            console.error("Error loading ill info:", error);
        });
    }, []);
  
    useEffect(() => {
        if (!ill) return;

        fetch(
            `http://localhost:8080/appointment/user/incoming/${ill.username}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(response => {
            if (!response.ok)
                throw new Error("Failed to fetch appointments");
            return response.json();
        })
        .then(data => {
            setUpcoming(data);
        })
        .catch(error => {
            console.error("Error loading appointments:", error);
        });

        console.log(token);
        fetch(
            `http://localhost:8080/appointment/user/latest/${ill.username}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(response => {
            if (!response.ok)
                throw new Error("Failed to fetch appointments");
            return response.json();
        })
        .then(data => {
            console.log(data)
            setLatest(data);
        })
        .catch(error => {
            console.error("Error loading appointments:", error);
        });
    }, [ill]);

  return (
    <div>
        <AdminNavbar/>
        <div className="profile-body">
            <div className="appointment-selector">
                <div>User upcoming appointments:</div>
                <div>
                {upcoming.length === 0 && (
                        <div>
                            User have no upcoming appointment
                        </div>
                )}
                {upcoming.map((appointment) => (
                <AppointmentCard
                    key={appointment.id}
                    Appointment={appointment}
                />
                ))}
                </div>
                <div>User latest appointments:</div>
                {latest.length === 0 && (
                        <div>
                            User have no appointment at past
                        </div>
                )}
                {latest.map((appointment) => (
                <AppointmentCard
                    key={appointment.id}
                    Appointment={appointment}
                />
                ))}      
            </div>
                  <AdminUserPageSide
                  ill={ill}/>
          
        </div>
            
    </div>
  );
}

export default AdminUserPage;