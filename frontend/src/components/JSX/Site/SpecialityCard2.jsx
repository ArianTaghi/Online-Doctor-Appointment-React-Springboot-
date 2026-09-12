import { useNavigate } from "react-router-dom";
function SpecialityCard2({ name, classname , photo }) {
    const navigate = useNavigate();

    return (
        <div
            className={`speciality-card ${classname}`}
            onClick={() => {
        if (classname === "clicked") {
            navigate("/appointment");
        } else {
            navigate(`/appointment/${name}`);
        }
            }}>
            <img className="img2"
                src={photo}
                alt={name}
            />
            
            <div className="speiality-card-text">{name}</div>
        </div>
    );
}

export default SpecialityCard2;