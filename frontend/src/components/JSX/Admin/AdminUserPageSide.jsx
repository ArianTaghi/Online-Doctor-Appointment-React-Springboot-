import defaultUser from "../../../assets/user-defualt.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  CalendarDays,
  Mars,
  Venus,
  Contact,
  Phone
} from "lucide-react";

function AdminUserPageSide({ ill }) {
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const [ban, setBan] = useState(ill?.ban);
    const handleBan = () => {
    fetch(`http://localhost:8080/user/ban/${ill.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(() => {
        setBan(!ban);
    });
  };
    const handleDelete = () => {
    fetch(`http://localhost:8080/ill/remove/${ill.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            navigate("/admin/user");
        }
    });
  };
    return (
    <div className="doctor-profile2">

      <img
        className="profile-avatar"
        src={defaultUser}
        alt="User profile"
      />

      <div className="profile-static-info">

        <div className="profile-static-row">
          <span className="profile-static-icon">
            {ill?.gender
              ? <Mars size={16} />
              : <Venus size={16} />
            }
          </span>

          <span className="profile-static-label">
            Full name
          </span>

          <span className="profile-static-value">
            {ill?.name}
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
            {ill?.birthday}
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
            {ill?.code}
          </span>
        </div>

        <div className="profile-static-row">
          <span className="profile-static-icon">
            <Phone size={16} />
          </span>

          <span className="profile-static-label">
            Phone
          </span>

          <span className="profile-static-value">
            {ill?.phone}
          </span>
        </div>

      </div>

      <div className="profile-manage">
        <button className="btn btn-danger" onClick={handleDelete}>
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

export default AdminUserPageSide;