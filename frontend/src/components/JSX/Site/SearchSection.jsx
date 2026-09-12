import { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import { useSearchParams  } from "react-router-dom";

function SearchSection ({role}) {
  const [params] = useSearchParams();

  const currentSpeciality = params.get("speciality") || "";
  const currentCity = params.get("city") || "";
  const [currentList, setCurrentList] = useState([])
  const [searchText, setSearchText] = useState("");
  
  useEffect(() => {
    loadList()  
  }, [currentSpeciality, currentCity, searchText]);
    
  const loadList = () => {
  console.log("currentSpeciality:", currentSpeciality);
  console.log("searchText:", searchText);
    searchText.trim() === "" && currentSpeciality === "" && currentCity === ""
      ?
        fetch("http://localhost:8080/doctor/get/example")
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
        fetch(`http://localhost:8080/doctor/search/${searchText}_${currentSpeciality}_${currentCity}`)
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
        <h6>
          your search bring up {currentList.length} results
        </h6>
        <div className="result-box-user">
          {currentList.map((doctor) =>(
            <DoctorCard
              key={doctor.username}
              doctor={doctor}
              path={role=="admin" ? `/admin/doctor/${doctor.id}` : `/doctor/${doctor.id}`}
            />
          ))}            
        </div>
      </div>
      );
}
export default SearchSection;