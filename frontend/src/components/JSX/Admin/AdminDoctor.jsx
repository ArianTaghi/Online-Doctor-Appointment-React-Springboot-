import SearchSection from "../Site/SearchSection";
import SortSideBar from "../Site/SortSideBar";
import AdminNavbar from "./AdminNavbar";
import "../../Css/Admin.css"

function AdminDoctor() {
return (
    <div>
        <AdminNavbar/>
    <div className="admin-doctor">
        <SearchSection
        role="admin"
        />
        <SortSideBar/>
    </div>
    </div>
    );
}

export default AdminDoctor;