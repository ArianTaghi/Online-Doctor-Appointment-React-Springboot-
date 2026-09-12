import { useState, useEffect } from "react";
import DoctorCard from "../Site/DoctorCard";

function SearchSectionDoctor ({ currentSpeciality, role}) {
    const [currentList, setCurrentList] = useState([])
    const [searchText, setSearchText] = useState("");
  useEffect(() => {
    loadList()  
  }, [currentSpeciality]);
  const token = localStorage.getItem("token")
  const loadList = () => {
  console.log("currentSpeciality:", currentSpeciality);
  console.log("searchText:", searchText);
    searchText.trim() === "" && currentSpeciality === ""
      ? 
        fetch("http://localhost:8080/doctor/admin/get/list", {
        headers: {
          Authorization: `Bearer ${token}`
          }})

          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to fetch doctors");
            }
              return response.json();
          })
          .then(data => {
            setCurrentList(data);
          })
      : 
        fetch(`http://localhost:8080/doctor/search/${searchText}_${currentSpeciality}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch doctors");
          }
            return response.json();
        })
        .then(data => {
          setCurrentList(data);
        });
  }
  return (
    <div className="search-section">
        <div className="search-box">
          <input
            className="search-bar" placeholder="Search for a doctor" value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                loadList();
          }}
          />
                    
          <button className="search-button" onClick={loadList}>Search</button>
        </div>
        <div className="result-box">
          {currentList.map((doctor) =>(
            <DoctorCard
              key={doctor.username}
              name={doctor.username}
              speciality={doctor.speciality}
              path={role=="admin" ? `/admin/doctor/${doctor.id}` : `/doctor/${doctor.id}`}
              hospital={doctor.hospital}
            />
          ))}            
        </div>
      </div>
      );
}
export default SearchSectionDoctor ;