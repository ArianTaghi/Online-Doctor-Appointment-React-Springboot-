import { useState, useEffect } from "react";
import AppointmentCard from "../Site/AppointmentCard";

function SearchSectionAppointment ({ currentSpeciality, role}) {
    const [currentList, setCurrentList] = useState([])
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const token = localStorage.getItem("token");

  useEffect(() => {
    loadList()
  }, [currentSpeciality]);
  
  const handleDeleted = () => {
  loadList();
  };


  const loadList = () => {
    dateStart.trim() === "" && dateEnd.trim() === ""
      ?
        fetch("http://localhost:8080/appointment/getlist", {
          headers: {
              "Authorization": `Bearer ${token}`
          }
        })
        .then(response => {
            if (!response.ok) {
              throw new Error("Failed to fetch appointments");
            }
              return response.json();
          })
          .then(data => {
            setCurrentList(data);
          })
      :
        fetch(`http://localhost:8080/appointment/filter/${dateStart}_${dateEnd}`, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch appointments");
          }
            return response.json();
        })
        .then(data => {
          setCurrentList(data);
        });
  }
  return (
    <div className="search-section search-section-appointment">
      <div className="search-box search-box-appointment">
        <div>Start date:</div>
          <input
            type="datetime-local"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
          <div>End date:</div>
          <input
            type="datetime-local"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
          />
          <button className="search-button" onClick={loadList}>Search</button>
        </div>
        <div className="result-box">
          {currentList.map((appointment) =>(
            <AppointmentCard
              key={appointment.id}
              onDeleted={handleDeleted}
              Appointment={appointment}
            />
          ))}
        </div>
      </div>
      );
}
export default SearchSectionAppointment ;