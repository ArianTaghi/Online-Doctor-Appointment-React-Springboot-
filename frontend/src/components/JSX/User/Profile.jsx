import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import AppointmentCard from "../Site/AppointmentCard"
import ProfileSide from "./ProfileSide";
import '../../Css/User.css'

function Profile() {
    const [latest, setLatest] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [ill, setIll] = useState(null)
    const token = localStorage.getItem("token");

    function getPayload(token) {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    }
    function loadIll() {
        const token = localStorage.getItem("token");
        const payload = getPayload(token);

        fetch(`http://localhost:8080/ill/get/${payload.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setIll(data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    useEffect(() => {
        loadIll();
    }, []);
    useEffect(() => {
        if (!ill) return;

        fetch(
            `http://localhost:8080/appointment/myoncoming`,
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
            `http://localhost:8080/appointment/mylatest`,
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
        <Navbar/>
        <div className="profile-body">
            <div className="appointment-selector">
                <div className="section-label">Your upcoming appointments:</div>
                <div>
                {upcoming.length === 0 && (
                        <div className="section-label">
                            you have no upcoming appointment
                        </div>
                )}
                {upcoming.map((appointment) => (
                <AppointmentCard
                    key={appointment.id}
                    Appointment={appointment}
                />
                ))}
                </div>
                <div className="edit-actions">Your latest appointments:</div>
                {latest.length === 0 && (
                        <div className="edit-actions">
                            you have no appointment at past
                        </div>
                )}
                {latest.map((appointment) => (
                <AppointmentCard
                    key={appointment.id}
                    Appointment={appointment}
                />
                ))}      
                <div></div>
            </div>
            <ProfileSide ill={ill} loadIll={loadIll} />
        </div>
    </div>
  );
}

export default Profile;