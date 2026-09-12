  import { useState, useEffect } from "react";
  import { Navigate, useNavigate } from "react-router-dom";
  import { useSearchParams } from "react-router-dom";

  function SortSideBar({role}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [speciality, setSpeciality] = useState("");
    const [city, setCity] = useState("");
    const [specialities, setSpecialities] = useState([]);
    const [cities, setCities] = useState([]);
      
  useEffect(() => {
    const specialityParam = searchParams.get("speciality") || "";
    const cityParam = searchParams.get("city") || "";
    
    setSpeciality(specialityParam);
    setCity(cityParam);
  }, [searchParams]);

    useEffect(() => {
      fetch("http://localhost:8080/req/specialities")
          .then(response => {
              return response.json();
          })
          .then(data => {
              setSpecialities(data);
          });
    }, []);
    
    useEffect(() => {
      }, []);

    useEffect(() => {
      fetch("http://localhost:8080/req/cities")
          .then(response => {
              return response.json();
          })
          .then(data => {
              setCities(data);
          });
    }, []);
    useEffect(() => {
      }, []);

    return (
      <>
      <div/>
        <div className='sort-side-bar'>
          <h6>Select a speciality from below:</h6>
          <select 
            name='speciality' 
            id='speciality'
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            <option key='none' value=''>none</option>
            {specialities.map((speciality) => (
                <option key={speciality.name} value={speciality.name}>{speciality.name}</option>
            ))}
          </select>
          <h6>Select a city from below:</h6>
            <select
              name='city'
              id='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option key='none' value='none'>none</option>
              {cities.map((city) => (
                  <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
      <div/>
      <div className="submit-section">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (role === "user")
                navigate(
                  `/appointment?speciality=${speciality}&city=${city}`
                );
              else
                navigate(
                  `/admin/doctor?speciality=${speciality}&city=${city}`
                );
                
            }}
          >
            Submit
          </button>
      </div>
      </div>
    </>
  );}

  export default SortSideBar;