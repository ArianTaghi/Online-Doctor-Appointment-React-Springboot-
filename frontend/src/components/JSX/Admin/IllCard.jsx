import { useNavigate } from "react-router-dom";
import defaultUser from "../../../assets/user-defualt.png";
import { User, Mars, Venus } from "lucide-react";

function IllCard({ ill, path }) {
    const navigate = useNavigate();
    return (
        <div className='ill-card' onClick={() => navigate(path)}>
            <img
                    className="profile-image"
                    src={defaultUser}
                    alt="User profile"
            />
            <div>
                <h6><User size={22}/> name: {ill.username}    {ill?.gender ?
                  (<Mars size={19}/>) : (<Venus size={19}/>)}
            </h6>
            </div>
        </div>
    );
}
export default IllCard;