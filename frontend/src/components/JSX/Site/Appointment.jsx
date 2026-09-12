import '../../Css/Site.css'
import SearchSection from './SearchSection';
import Navber from '../User/Navbar';
import SortSideBar from './SortSideBar';
import { useParams } from 'react-router-dom';
function Appointment() {
  const params = useParams();
  const speciality = params.speciality || "";    
  return (
    <>
        <Navber/>
        <div className='doctor-list-body'>
          <SearchSection/>
          <SortSideBar
          role={"user"}
          currentSpeciality={speciality}
          />
        </div>
    </>
);}

export default Appointment;