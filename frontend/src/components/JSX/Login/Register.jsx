import { useState } from "react";
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
} from "react-icons/fa";

function Register() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [acceptRules, setAcceptRules] = useState(false);
  const [errors, setErrors] = useState({});
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateStepOne = () => {
    let newErrors = {};

    if (!phone.trim()) {
      newErrors.phone = "شماره تلفن الزامی است";
    }

    if (!nationalCode.trim()) {
      newErrors.nationalCode = "کد ملی الزامی است";
    }

    if (!acceptRules) {
      newErrors.rules = "تایید قوانین الزامی است";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    let newErrors = {};
    if (!birthDate) {
      newErrors.birthDate = "تاریخ تولد الزامی است";
    }
    if (!gender) {
      newErrors.gender = "جنسیت رو انتخاب کنید";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStepThree = () => {
    let newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "نام الزامی است";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "نام خانوادگی الزامی است";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const validateStepFour = () => {
    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    }

    if (!password.trim()) {
      newErrors.password = "رمز عبور الزامی است";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
    }

    if (
      password.trim() &&
      confirmPassword.trim() &&
      password !== confirmPassword
    ) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیست";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (step === 1) {
      if (!validateStepOne()) return;
      setStep(2);
    } else if (step === 2) {
      if (!validateStepTwo()) return;
      setStep(3);
    } else if (step === 3) {
      if (!validateStepThree()) return;
      setStep(4);
    }
  };
  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };
  const handleSubmit = async () => {
    if (!validateStepFour()) return;
    try {
      const response = await fetch("http://localhost:8080/auth/signup/ill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          gender: gender === "male",
          name: `${firstName} ${lastName}`.trim(),
          code: parseInt(nationalCode, 10),
          birthday: birthDate,
          description: "",
          phone: parseInt(phone, 10),
        }),
      });
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
    <div className="register-box">
      <h2>درخواست عضویت در سیستم</h2>
      <div className="steps">
        <div className={`step ${step >= 1 ? "active" : ""} `}>
          <span>1</span>
        </div>
        <div className={`step ${step >= 2 ? "active" : ""} `}>
          <span>2</span>
        </div>
        <div className={`step ${step >= 3 ? "active" : ""} `}>
          <span>3</span>
        </div>
        <div className={`step ${step >= 4 ? "active" : ""} `}>
          <span>4</span>
        </div>
      </div>
      {step === 1 && (
        <div className="step-one">
          <div className="form-group">
            <label htmlFor="phone" className="input-label">
              <FaPhoneAlt />
              <span>تلفن همراه</span>
            </label>
            <div className="input-group">
              <input
                className={errors.phone ? "input-error" : ""}
                id="phone"
                type="text"
                placeholder="09*********"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {errors.phone && <p className="error-masage">{errors.phone}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="nationalCode" className="input-label">
              <FaIdCard />
              <span>کد ملی</span>
            </label>
            <div className="input-group">
              <input
                className={errors.nationalCode ? "input-error" : ""}
                id="nationalCode"
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
          <dir className="rules">
            <input
              id="rules"
              type="checkbox"
              checked={acceptRules}
              onChange={(e) => setAcceptRules(e.target.checked)}
            />
            <label htmlFor="rules">قوانین و مقررات را مطالعه کرده ام</label>
          </dir>
          {errors.rules && <p className="error-masage">{errors.rules}</p>}
        </div>
      )}
      {step === 2 && (
        <div className="step-two">
          <div className="form-group">
            <label htmlFor="birthDate" className="input-label">
              <FaCalendarAlt />
              <span>تاریخ تولد</span>
            </label>
            <div className="input-group">
              <input
                className={errors.birthDate ? "input-error" : ""}
                id="birthDate"
                type="date"
                placeholder="1405/05/05"
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
              <FaVenusMars />
              <span>جنسیت</span>
            </label>
            <div className="gender-group">
              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>مرد</span>
              </label>

              <label className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  value="famale"
                  checked={gender === "famale"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>زن</span>
              </label>
            </div>
            {errors.gender && <p className="error-masage">{errors.gender}</p>}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="step-three">
          <div className="form-group">
            <label htmlFor="firstName" className="input-label">
              <FaUser />
              <span>نام</span>
            </label>

            <div className="input-group">
              <input
                className={errors.firstName ? "input-error" : ""}
                id="firstName"
                type="text"
                placeholder="نام خود را وارد کنید"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {errors.firstName && (
              <p className="error-masage">{errors.firstName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="input-label">
              <FaUser />
              <span>نام خانوادگی</span>
            </label>

            <div className="input-group">
              <input
                className={errors.lastName ? "input-error" : ""}
                id="lastName"
                type="text"
                placeholder="نام خانوادگی خود را وارد کنید"
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
      {step === 4 && (
        <div className="step-four">
          <div className="form-group">
            <label htmlFor="username" className="input-label">
              <FaUser />
              <span>نام کاربری</span>
            </label>

            <div className="input-group">
              <input
                className={errors.username ? "input-error" : ""}
                id="username"
                type="text"
                placeholder="نام کاربری خود را وارد کنید"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {errors.username && (
              <p className="error-masage">{errors.username}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="input-label">
              <FaLock />
              <span>رمز عبور</span>
            </label>

            <div className="input-group">
              <input
                className={errors.password ? "input-error" : ""}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="رمز عبور خود را وارد کنید"
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
            <label htmlFor="confirmPassword" className="input-label">
              <FaLock />
              <span>تکرار رمز عبور</span>
            </label>

            <div className="input-group">
              <input
                className={errors.confirmPassword ? "input-error" : ""}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="رمز عبور را دوباره وارد کنید"
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
        {step === 1 && (
          <button className="next-btn" onClick={handleNext}>
            بعدی
          </button>
        )}
        {(step === 2 || step === 3) && (
          <>
            <button className="back-btn" onClick={handleBack}>
              مرحله قبل
            </button>

            <button className="next-btn" onClick={handleNext}>
              بعدی
            </button>
          </>
        )}
        {step === 4 && (
          <>
            <button className="back-btn" onClick={handleBack}>
              مرحله قبل
            </button>
            <button className="sumbit-btn" onClick={handleSubmit}>
              درخواست عضویت
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default Register;
