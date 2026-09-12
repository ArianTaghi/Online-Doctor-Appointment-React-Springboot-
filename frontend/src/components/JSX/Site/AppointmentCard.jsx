import { Stethoscope, CalendarDays, Clock, User } from "lucide-react";

function AppointmentCard({ Appointment, onDeleted }) {
  const token = localStorage.getItem("token");
  const today = new Date();
  const date = new Date(Appointment.date);
console.log(date);
  const handleDelete = () => {
    if (today < date) {
    fetch("http://localhost:8080/appointment/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(Appointment.id)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to delete appointment");
        }

        if (onDeleted) {
            onDeleted(Appointment.id);
        }
    })
    .catch(error => {
        console.error("Error deleting appointment:", error);
    });
  }};
  return (
    <div className="appointment-card">
      <div className="appointment-card-info">
        <div className="appointment-card-row">
          <span className="appointment-card-icon"><CalendarDays size={16} /></span>
          <span>{Appointment.date.slice(0, 10)}</span>
        </div>
        <div className="appointment-card-row">
          <span className="appointment-card-icon"><Clock size={16} /></span>
          <span>{Appointment.date.slice(11, 16)}</span>
        </div>
        <div className="appointment-card-row">
          <span className="appointment-card-icon"><Stethoscope size={16} /></span>
          <span>{Appointment.doctor}</span>
        </div>
        <div className="appointment-card-row">
          <span className="appointment-card-icon"><User size={16} /></span>
          <span>{Appointment.ill}</span>
        </div>
      </div>
      <button
        className={today < date
          ? "appointment-card-delete"
          : "appointment-card-off"
        }
        onClick={handleDelete}
      >
      Delete
      </button>
    </div>
  );
}

export default AppointmentCard;