import { useState } from "react"
import defaultUser from "../../../assets/user-defualt.png";
import {
  User,
  LockKeyhole,
  Smartphone,
  CalendarDays,
  VenusAndMars,
  Mars,
  Venus,
  Contact
} from "lucide-react";

function ProfileSide({ ill , loadIll}) {
  const token = localStorage.getItem("token");
  const [openMenu, setOpenMenu] = useState("")
  const [username, setUsername] = useState("")
  const [pass2, setPass2] = useState("")
  const [pass1, setPass1] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  
  const handleChangePass = () => {
    fetch(`http://localhost:8080/ill/editillpass/${pass1}-${pass2}`, {
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
    fetch("http://localhost:8080/ill/editill", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      username: username,
      phone: 0
    })}).then(response => {
            return response.json();
          })
        .then(data => {
        if (data) {
            localStorage.removeItem("token");
            window.location.href = "/register";
        } else { setOpenMenu("username"); setError("username")}});}
  
  const handleChangePhone = () => {
    fetch(`http://localhost:8080/ill/editill`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      username: "",
      phone: Number(phone)
    })}).then(response => {
            return response.json();
          })
        .then(data => {
          console.log(phone)
          console.log(Number(phone))
        if (data)  {setOpenMenu(""); loadIll();} else setOpenMenu("phone")});}
  
  return (
    <div className="profile-side-panel">
      <img
        className="profile-image"
        src={defaultUser}
        alt="User profile"
      />
    <div>
      <div className="box-header other-box username-box">
          <h5>username :{ill?.username}</h5>
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
      <div className="box-header other-box">
        <h5>password</h5>
        <button
          className={`profile-section-button ${openMenu === "pass" ? "closed" : ""}`}
          onClick = {() => setOpenMenu("pass")}
        >
          change
        </button>
        {(error == "pass") && <div>User name already exist!</div>}
      </div> 
        <div className={`box-hide ${openMenu === "pass" ? "open" : ""}`}>
        <input 
        placeholder="Enter previus password"
        value={pass1}
        onChange={(e) => setPass1(e.target.value)}      
        />
        <input 
        placeholder="Enter new password"
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}      
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
            onClick = {handleChangePass}
          >
            confirm
          </button>
        </div>
      </div>
        
      <div className="box-header other-box">
        <h5>
          Phone : {ill?.phone}
          
        </h5>
        <button
          className={`profile-section-button ${openMenu === "phone" ? "closed" : ""}`}
          onClick = {() => setOpenMenu("phone")}
        >
          change
        </button>
      </div> 
        <div className={`box-hide ${openMenu === "phone" ? "open" : ""}`}>
          <input 
          placeholder="Enter new phone "
          value={phone}
          onChange={(e) => setPhone(e.target.value)}      
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
              onClick = {handleChangePhone}
            >
              confirm
            </button>
          </div>
        </div>
        <div className="other-info">
          <h5 className="info">
          {ill?.gender ?
            (<Mars size={19}/>) : (<Venus size={19}/>)}
          Full name:  {ill?.name}</h5>
          <h5 className="info"><CalendarDays size={19}/> Birthday: {ill?.birthday}</h5>
          <h5 className="info"><Contact size={19}/>Code: {ill?.code}</h5>
        </div>
      
        <div>
          <div>{ill?.description}</div>
        </div>
      </div>
    );
}
export default ProfileSide;
