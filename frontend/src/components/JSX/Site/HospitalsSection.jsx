import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Hospital, Building2  } from "lucide-react";

function HospitalSection() {
    const navigate = useNavigate();

    const [hospitals, sethospitals] = useState([]);
    useEffect (() => {
        fetch("http://localhost:8080/req/hospitals")
        .then(response => {response.json()
        .then(data => {
            sethospitals(data)});
             });    
    }, []);

  return (
    <div className="hospital-parent">
    <div className="thing-header">Our supported hospitals:</div>
            
        <div className="hospitals-section">
            {hospitals.map((hospital) => (    
                <div className="hospital-card">
                    <h6 onClick={() => navigate(`appointment?speciality=&city=&hospital=${hospital.name}`)}
                        key={hospital.name}
                    >
                        <Hospital/>{hospital.name}
                    </h6>      
                    <Building2 size={17}/>    
                    {hospital.city}
                </div>            
            ))}
        </div>  
    </div>
  )
}

export default HospitalSection
