import SpecialityCard from './SpecialityCard'
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function SpecialitySection() {

  const [currentPage, setCurrentPage] = useState(0)
  const cardsPerPage = 6
  const [specialities, setSpecialities] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/req/specialities")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setSpecialities(data);
        });
  }, []);

  const nextPage = () => {
      setCurrentPage((currentPage + 1) % Math.ceil(specialities.length / cardsPerPage))
  }

  const previousPage = () => {
    setCurrentPage(
        currentPage === 0
            ? Math.ceil(specialities.length / cardsPerPage) - 1
            : currentPage - 1
    )
  }

  return (
    <div className='speciality-parent'>
      <p className='speciality-header'>
        Select a speciality from below:
      </p>
      <div className='speciality-section'>
          <div className='speciality-track'
            style={{
              transform: `translateX(-${currentPage * 76}%)`
            }}
          >
          {specialities.map((speciality) => (
            <SpecialityCard
              key={speciality.name}
              name={speciality.name}
              photo={speciality.photo}
              path= {`/appointment/${speciality.name}`}
            />
          ))}
        </div>
      </div>
    </div>
    );
}

export default SpecialitySection;