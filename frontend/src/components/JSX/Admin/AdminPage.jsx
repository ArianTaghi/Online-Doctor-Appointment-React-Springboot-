import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "../../Css/Admin.css"

import {
    Users,
    Stethoscope,
    CalendarDays
} from "lucide-react";

function AdminPage() {
    const navigate = useNavigate();
    return (
        <div className="admin-page">
            <AdminNavbar/>
            <main className="admin-body">

                <div className="admin-title">
                    <h1>Admin Dashboard</h1>
                    <p>Manage your appointment system</p>
                </div>


                <div className="admin-cards">

                    <div
                        className="admin-card"
                        onClick={() => navigate("/admin/user")}
                    >
                        <div className="admin-icon">
                            <Users size={42} strokeWidth={1.8} />
                        </div>

                        <div className="admin-card-content">
                            <h2>User View</h2>
                            <p>
                                Manage and view registered users
                            </p>
                        </div>
                    </div>


                    <div
                        className="admin-card"
                        onClick={() => navigate("/admin/doctor")}
                    >
                        <div className="admin-icon">
                            <Stethoscope size={42} strokeWidth={1.8} />
                        </div>

                        <div className="admin-card-content">
                            <h2>Doctor View</h2>
                            <p>
                                Manage doctors and their information
                            </p>
                        </div>
                    </div>


                    <div
                        className="admin-card"
                        onClick={() => navigate("/admin/appointment")}
                    >
                        <div className="admin-icon">
                            <CalendarDays size={42} strokeWidth={1.8} />
                        </div>

                        <div className="admin-card-content">
                            <h2>Appointment View</h2>
                            <p>
                                Manage and monitor appointments
                            </p>
                        </div>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminPage;