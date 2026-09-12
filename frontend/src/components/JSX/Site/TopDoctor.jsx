import React, { useEffect, useState } from "react";
import DoctorCard2 from "./DoctorCard2";

function TopDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const res = await fetch("http://localhost:8080/doctor/sort/mostrated", {
          headers: {},
        });

        if (!res.ok) {
          throw new Error("خطا در دریافت اطلاعات دکترها");
        }

        const data = await res.json();
        setDoctors(data.slice(0, 5)); // <-- تغییر اصلی: از 3 به 5
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopDoctors();
  }, []);

  // محاسبه موقعیت هر کارت نسبت به کارت فعال (جلو)
  // 0 = جلو | 1..4 = بقیه موقعیت‌ها به ترتیب دور کارت فعال
  const getPosition = (index) => {
    const total = doctors.length;
    return (index - activeIndex + total) % total;
  };

  const handleCardClick = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  if (loading) {
    return <div className="top-doctor-status">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="top-doctor-status top-doctor-error">{error}</div>;
  }

  if (doctors.length === 0) {
    return <div className="top-doctor-status">دکتری یافت نشد</div>;
  }

  return (
    <div className="top-doctor-wrapper">
      <h2 className="top-doctor-title">TopDoctors:</h2>

      <div className="top-doctor-stage">
        {doctors.map((doctor, index) => {
          const position = getPosition(index);
          return (
            <div
              key={doctor.username}
              className={`top-doctor-slot position-${position}`}
              onClick={() => handleCardClick(index)}
            >
              <DoctorCard2
                name={doctor.username}
                speciality={doctor.speciality}
                path={`/doctor/${doctor.id}`}
                hospital={doctor.hospital}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopDoctor;