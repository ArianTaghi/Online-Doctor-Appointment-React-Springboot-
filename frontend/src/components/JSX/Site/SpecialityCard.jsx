import { useNavigate } from "react-router-dom";

function SpecialityCard({ name, path, photo }) {
    const navigate = useNavigate();
    console.log(photo)
    console.log(name)
    return (
        <div className='speciality-card' onClick={() => navigate(path)}>
            
            <img
                src={photo}
                alt={name}
                className="speciality-img"
            />
            <div className="exe">Best Docs for:</div>
            <div>{name}</div>
        </div>
    );
}
export default SpecialityCard;