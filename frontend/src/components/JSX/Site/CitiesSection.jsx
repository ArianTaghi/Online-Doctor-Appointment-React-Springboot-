import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

function CitiesSection() {
    const navigate = useNavigate();

    const [cities, setCities] = useState([]);
    useEffect (() => {
        fetch("http://localhost:8080/req/cities")
        .then(response => {response.json()
        .then(data => {
            setCities(data)});
             });
    }, []);

  return (
    <div className="cities-parent">
        <div className="thing-header">Select Cities from below:</div>
        <div className="cities-section">
            {cities.map((city) => (    
                <div className="city-card" onClick={() => navigate(`appointment?speciality=&city=${city.name}&hospital=`)}>
                    <Building2/>{city.name}
                </div>
            ))}
        </div>
    </div>
  )
}

export default CitiesSection
