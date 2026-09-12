import './components/Css/Site.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/JSX/User/Navbar";
import Stats from "./components/JSX/Site/Stats";
import SpecialitySection from "./components/JSX/Site/SpecialitySection";
import TopDoctor from "./components/JSX/Site/TopDoctor";
import CitiesSection from "./components/JSX/Site/CitiesSection";
import HospitalsSection from "./components/JSX/Site/HospitalsSection";


function App() {
  return (
    <div className='app-div'>
      <Navbar/>
      <Stats/>
      <SpecialitySection/>
      <CitiesSection></CitiesSection>
      <HospitalsSection></HospitalsSection>
      <TopDoctor></TopDoctor>
      <footer className='footer'>
        footer
      </footer>
    </div>
  )
}

export default App
