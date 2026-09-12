import { useNavigate } from "react-router-dom";
import { useState } from "react";
import defaultUser from "../../../assets/user-defualt.png";
import {
  CalendarDays,
  Mars,
  Venus,
  Contact,
  Building2 ,Hospital 
} from "lucide-react";

function AdminDoctorPageSide({ doctor, loadDoctor }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [ban, setBan] = useState(doctor?.ban);
    
  const handleBan = () => {
    fetch(`http://localhost:8080/user/ban/${doctor.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(() => {
        setBan(!ban);
    });
  };
  const handleDelete = () => {
    fetch(`http://localhost:8080/doctor/remove/${doctor.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            navigate("/admin/doctor");
        }
    });
  };
  const handleChangeHour = () => {
    fetch(`http://localhost:8080/doctor/admin/editdoctor/${doctor.id}_${start}_${end}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }}).then(response => {
            return response.json();
          })
        .then(data => {
          console.log(start)
          console.log(end)
        if (data)  {setOpenMenu(""); loadDoctor();} else setOpenMenu("hour")});}
  
  const [openMenu, setOpenMenu] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  
    
  return (
    <div className="doctor-page-side">

      <img
        className="profile-avatar"
        src={defaultUser}
        alt="Doctor profile"
      />

      <div className="profile-static-info">

        <div className="profile-static-row">
          <span className="profile-static-icon">
            {doctor?.gender
              ? <Mars size={16} />
              : <Venus size={16} />
            }
          </span>

          <span className="profile-static-label">
            Full name
          </span>

          <span className="profile-static-value">
            {doctor?.name}
          </span>
        </div>

        <div className="profile-static-row">
          <span className="profile-static-icon">
            <CalendarDays size={16} />
          </span>

          <span className="profile-static-label">
            Birthday
          </span>
          <span className="profile-static-value">
            {doctor?.birthday}
          </span>
        </div>

        <div className="profile-static-row">
          <span className="profile-static-icon">
            <Building2  size={16} />
          </span>

          <span className="profile-static-label">
            City
          </span>
          <span className="profile-static-value">
            {doctor?.city}
          </span>
        </div>

        <div className="profile-static-row">
          <span className="profile-static-icon">
            <Hospital   size={16} />
          </span>

          <span className="profile-static-label">
            Hospital
          </span>
          <span className="profile-static-value">
            {doctor?.hospital}
          </span>
        </div>

        <div className="profile-static-row">
          <span className="profile-static-icon">
            <Contact size={16} />
          </span>

          <span className="profile-static-label">
            Code
          </span>

          <span className="profile-static-value">
            {doctor?.code}
          </span>
        </div>
<div className="profile-edit-block">
      <div className="profile-edit-header">
        <h5 className="profile-edit-title">
          Start : {doctor?.start} & End : {doctor?.end}
        </h5>
        <button
          className={`profile-edit-toggle ${openMenu === "hour" ? "active" : ""}`}
          onClick = {() => setOpenMenu(openMenu === "hour" ? "" : "hour")}
        >
          {openMenu === "hour" ? "close" : "edit"}
        </button>
      </div>
      <div className={`profile-edit-panel ${openMenu === "hour" ? "open" : ""}`}>
        <div className='hour-mode'>
          <input
            className="profile-edit-input hour-input"
            placeholder="Enter start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            className="profile-edit-input hour-input"
            placeholder="Enter end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <div div className="profile-edit-actions">
          <button
            className="profile-btn-cancel"
            onClick = {() => setOpenMenu("")}
          >
            cancel
          </button>
          <button
            className="profile-btn-confirm"
            onClick = {handleChangeHour}
          >
            confirm
          </button>
        </div>
      </div>
    </div>
    
      </div>

      <div className="profile-manage">
        <button
          className="btn btn-danger"
          onClick={handleDelete}
        >
          delete
        </button>
        
      

      <button
        className={`btn ${ban ? "btn-primary" : "btn-warning"}`}
        onClick={handleBan}
      >
        {ban ? "unban" : "ban"}
      </button>
      
      </div>

    </div>
  );
}

export default AdminDoctorPageSide;