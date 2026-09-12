import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/Login.css";
import {
  FaIdCard,
  FaPhoneAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaStethoscope,
  FaHospital,
  FaUserCircle,
} from "react-icons/fa";

const DoctorRegister = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [nationalCode, setNationalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [medicalCode, setMedicalCode] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [specialty, setSpecialty] = useState("");
  const [hospital, setHospital] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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


  const navigate = useNavigate();

  const validateStepOne = () => {
    const newErrors = {};
    if (!phone) newErrors.phone = "شماره تلفن الزامی است";
    if (!nationalCode) newErrors.nationalCode = "کد ملی الزامی است";
    if (!medicalCode) newErrors.medicalCode = "کد نظام پزشکی الزامی است";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    if (!birthDate) newErrors.birthDate = "تاریخ تولد الزامی است";
    if (!gender) newErrors.gender = "جنسیت رو انتخاب کنید";
    if (!firstName) newErrors.firstName = "نام الزامی است";
    if (!lastName) newErrors.lastName = "نام خانوادگی الزامی است";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepThree = () => {
    const newErrors = {};
    if (!specialty) newErrors.specialty = "وارد کردن تخصص الزامی است";
    if (!hospital)
      newErrors.hospital = "نام بیمارستان یا محل فعالیت الزامی است";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepFour = () => {
    const newErrors = {};
    if (!username) newErrors.username = "نام کاربری الزامی است";
    if (!password) newErrors.password = "رمز عبور الزامی است";
    if (!confirmPassword)
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیست";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStepOne()) setStep(2);
    else if (step === 2 && validateStepTwo()) setStep(3);
    else if (step === 3 && validateStepThree()) setStep(4);
  };

  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStepFour()) return;
    try {
      const response = await fetch(
        "http://localhost:8080/auth/signup/doctor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password,
            gender: gender === "male",
            name: `${firstName} ${lastName}`.trim(),
            code: parseInt(nationalCode, 10),
            birthday: birthDate,
            specialty,
            start: 0,
            end: 0,
            phone: parseInt(phone, 10),
            docCode: parseInt(medicalCode, 10),
            hospital,
          }),
        }
      );
      if (!response.ok) {
        setErrors({ username: "این نام کاربری قبلاً ثبت شده است" });
        return;
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
      navigate("/");
    } catch (error) {
      setErrors({ username: "خطا در برقراری ارتباط با سرور" });
    }
  };

  return (
    <div className="doctor-register-box">
      <h2>ثبت‌نام پزشک</h2>

      <div className="steps">
        <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
        <div className={`step ${step >= 4 ? "active" : ""}`}>4</div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && (
          <div className="step-content">
            <div className="form-group">
              <label className="input-label">
                <FaPhoneAlt /> <span>تلفن همراه</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.phone ? "input-error" : ""}
                  type="text"
                  placeholder="09*********"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {errors.phone && <p className="error-masage">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaIdCard /> <span>کد ملی</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.nationalCode ? "input-error" : ""}
                  type="text"
                  placeholder="کد ملی خود را وارد کنید"
                  value={nationalCode}
                  onChange={(e) => setNationalCode(e.target.value)}
                />
              </div>
              {errors.nationalCode && (
                <p className="error-masage">{errors.nationalCode}</p>
              )}
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaIdCard /> <span>کد نظام پزشکی</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.medicalCode ? "input-error" : ""}
                  type="text"
                  placeholder="کد نظام پزشکی"
                  value={medicalCode}
                  onChange={(e) => setMedicalCode(e.target.value)}
                />
              </div>
              {errors.medicalCode && (
                <p className="error-masage">{errors.medicalCode}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <div className="form-group">
              <label className="input-label">
                <FaCalendarAlt /> <span>تاریخ تولد</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.birthDate ? "input-error" : ""}
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              {errors.birthDate && (
                <p className="error-masage">{errors.birthDate}</p>
              )}
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaVenusMars /> <span>جنسیت</span>
              </label>
              <div className="gender-group">
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={() => setGender("male")}
                  />{" "}
                  مرد
                </label>
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={() => setGender("female")}
                  />{" "}
                  زن
                </label>
              </div>
              {errors.gender && <p className="error-masage">{errors.gender}</p>}
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaUser /> <span>نام</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.firstName ? "input-error" : ""}
                  type="text"
                  placeholder="نام"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              {errors.firstName && (
                <p className="error-masage">{errors.firstName}</p>
              )}
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaUser /> <span>نام خانوادگی</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.lastName ? "input-error" : ""}
                  type="text"
                  placeholder="نام خانوادگی"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              {errors.lastName && (
                <p className="error-masage">{errors.lastName}</p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <div className="form-group">
              <label className="input-label">
                <FaStethoscope /> <span>تخصص</span>
              </label>
              <div className="input-group">
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  {specialities.map((specialty) => (
                    <option>{specialty.name}</option>
                  ))}
                </select>
              </div>
              {errors.specialty && (
                <p className="error-masage">{errors.specialty}</p>
              )}
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaHospital /> <span>بیمارستان / محل کار</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.hospital ? "input-error" : ""}
                  type="text"
                  placeholder="نام بیمارستان یا مطب"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                />
              </div>
              {errors.hospital && (
                <p className="error-masage">{errors.hospital}</p>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <div className="form-group">
              <label className="input-label">
                <FaUserCircle /> <span>نام کاربری</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.username ? "input-error" : ""}
                  type="text"
                  placeholder="نام کاربری"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errors.username && (
                <p className="error-masage">{errors.username}</p>
              )}
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaLock /> <span>رمز عبور</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.password ? "input-error" : ""}
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="error-masage">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaLock /> <span>تکرار رمز عبور</span>
              </label>
              <div className="input-group">
                <input
                  className={errors.confirmPassword ? "input-error" : ""}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="تکرار رمز عبور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="error-masage">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        )}

        <div className="button-group">
          {step > 1 && (
            <button type="button" className="back-btn" onClick={handleBack}>
              مرحله قبل
            </button>
          )}
          {step < 4 ? (
            <button type="button" className="next-btn" onClick={handleNext}>
              بعدی
            </button>
          ) : (
            <button type="button" className="sumbit-btn" onClick={handleSubmit}>
              ثبت درخواست
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DoctorRegister;
