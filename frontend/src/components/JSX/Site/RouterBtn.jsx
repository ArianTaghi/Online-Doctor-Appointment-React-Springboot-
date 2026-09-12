import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function RouterBtn({ name, path }) {
    const navigate = useNavigate();

    return (
        <button type="button" className='btn btn-primary' onClick={() => navigate(path)}>
            {name}
            {name === "Profile" &&
                <User size={25} />
            }
        </button>
    );
}

export default RouterBtn;