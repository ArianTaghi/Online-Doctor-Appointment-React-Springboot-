import { useState } from "react"
import defaultUser from "../../../assets/user-defualt.png";
import {
  CalendarDays,
  Mars,
  Venus,
  Contact,Building2, Hospital
} from "lucide-react";

function DoctorProfileSideBar({ doctor ,loadDoctor}) {
  const token = localStorage.getItem("token");
  const [openMenu, setOpenMenu] = useState("")
  const [username, setUsername] = useState("")
  const [pass2, setPass2] = useState("")
  const [pass1, setPass1] = useState("")
  const [phone, setPhone] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [error, setError] = useState("")
  
  const handleChangePass = () => {
    fetch(`http://localhost:8080/doctor/editdoctorpass/${pass1}-${pass2}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }}).then(response => {
      return response.json();
      })
    .then(data => {
    if (data)  {setOpenMenu(""); setError("");} else { setOpenMenu("pass"); setError("pass")}});}
  
  const handleChangeUsername = () => {
    fetch("http://localhost:8080/doctor/editdoctor", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      username: username,
      phone: 0,
      start: 0,
      end: 0
    })}).then(response => {
            return response.json();
          })
        .then(data => {
        if (data) {
            localStorage.removeItem("token");
            window.location.href = "/register";
        } else { setOpenMenu("username"); setError("username")}});}
  
  const handleChangePhone = () => {
    fetch(`http://localhost:8080/doctor/editdoctor`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      username: "",
      phone: Number(phone),
      start: 0,
      end: 0
    })}).then(response => {
            return response.json();
          })
        .then(data => {
          console.log(phone)
          console.log(Number(phone))
        if (data)  {setOpenMenu(""); loadDoctor();} else setOpenMenu("phone")});}
  const handleChangeHour = () => {
    fetch(`http://localhost:8080/doctor/editdoctor`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      username: "",
      phone: 0,
      start: Number(start),
      end: Number(end)
    })}).then(response => {
            return response.json();
          })
        .then(data => {
          console.log(start)
          console.log(end)
        if (data)  {setOpenMenu(""); loadDoctor();} else setOpenMenu("hour")});}
  
  return (
    <div className="doctor-sidebar-panel">
      <img
        className="profile-avatar"
        src={defaultUser}
        alt="User profile"
      />
    <div>
      <div className="box-header other-box username-box">
          <h5>username :{doctor?.username}</h5>
        <button
          className={`profile-section-button ${openMenu === "username" ? "closed" : ""}`}
          onClick = {() => setOpenMenu("username")}
        >
          change
        </button>
      </div> 
        {(error == "username") && <div>User name already exist!</div>}
        <div className={`box-hide ${openMenu === "username" ? "open" : ""}`}>
        <input 
        placeholder="Enter new username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}      
        />
        <div className="edit-actions">
          <button
          className="profile-section-button"
          onClick = {() => setOpenMenu("")}
          >
            cancel
          </button>
          <button
            className="profile-section-button"
            onClick = {handleChangeUsername}
          >
            confirm
          </button>
        </div>
      </div> 
    </div>
      <div className="profile-edit-block">
        <div className="profile-edit-header">
          <h5 className="profile-edit-title">
            password
          </h5>
          <button
            className={`profile-edit-toggle ${openMenu === "pass" ? "active" : ""}`}
            onClick = {() => setOpenMenu(openMenu === "pass" ? "" : "pass")}
          >
            {openMenu === "pass" ? "close" : "edit"}
          </button>
        </div>
        <div className={`profile-edit-panel ${openMenu === "pass" ? "open" : ""}`}>
          <input
            className="profile-edit-input"
            type="password"
            placeholder="Enter previous password"
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
          />
          <input
            className="profile-edit-input"
            type="password"
            placeholder="Enter new password"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
          />
          <div className="profile-edit-actions">
            <button
              className="profile-btn-cancel"
              onClick = {() => setOpenMenu("")}
            >
              cancel
            </button>
            <button
              className="profile-btn-confirm"
              onClick = {handleChangePass}
            >
              confirm
            </button>
          </div>
        </div>
      </div>

      <div className="profile-edit-block">
        <div className="profile-edit-header">
          <h5 className="profile-edit-title">
            Phone : {doctor?.phone}
          </h5>
          <button
            className={`profile-edit-toggle ${openMenu === "phone" ? "active" : ""}`}
            onClick = {() => setOpenMenu(openMenu === "phone" ? "" : "phone")}
          >
            {openMenu === "phone" ? "close" : "edit"}
          </button>
        </div>
        <div className={`profile-edit-panel ${openMenu === "phone" ? "open" : ""}`}>
          <input
            className="profile-edit-input"
            placeholder="Enter new phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="profile-edit-actions">
            <button
              className="profile-btn-cancel"
              onClick = {() => setOpenMenu("")}
            >
              cancel
            </button>
            <button
              className="profile-btn-confirm"
              onClick = {handleChangePhone}
            >
              confirm
            </button>
          </div>
        </div>
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

      
      <div className="profile-static-info">
        <div className="profile-static-row">
          <span className="profile-static-icon">
            {doctor?.gender ?
              (<Mars size={16}/>) : (<Venus size={16}/>)}
          </span>
          <span className="profile-static-label">Full name</span>
          <span className="profile-static-value">{doctor?.name}</span>
        </div>
        <div className="profile-static-row">
          <span className="profile-static-icon"><CalendarDays size={16}/></span>
          <span className="profile-static-label">Birthday</span>
          <span className="profile-static-value">{doctor?.birthday}</span>
        </div>
        <div className="profile-static-row">
          <span className="profile-static-icon"><Contact size={16}/></span>
          <span className="profile-static-label">Code</span>
          <span className="profile-static-value">{doctor?.code}</span>
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

      </div>

      <div className="profile-description">
        {doctor?.description}
      </div>
    </div>
    );
}
export default DoctorProfileSideBar;