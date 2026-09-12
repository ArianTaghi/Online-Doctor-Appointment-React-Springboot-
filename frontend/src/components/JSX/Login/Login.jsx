import { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!username.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    }
    if (!password.trim()) {
      newErrors.password = "رمز عبور الزامی است";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/signin/ill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setErrors({ password: "نام کاربری یا رمز عبور اشتباه است" });
        return;
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);
    
      if (data.role === "ILL")
        navigate("/");
      else if (data.role === "DOCTOR")
        navigate(`/doc/${data.id}`);
      else if (data.role === "ADMIN")
        navigate("/admin/");    
    } catch (error) {
      setErrors({ password: "خطا در برقراری ارتباط با سرور" });
    }
  };

  return (
    <div className="login-box">
      <h2>ورود به سیستم</h2>
      <div className="login-form-group">
        <label htmlFor="username" className="login-input-label">
          <FaUser />
          <span>نام کاربری</span>
        </label>

        <div className="login-input-group">
          <input
            className={errors.username ? "login-input-error" : ""}
            id="username"
            type="text"
            placeholder="نام کاربری خود را وارد کنید"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {errors.username && <p className="login-error-masage">{errors.username}</p>}
      </div>
      <div className="login-form-group">
        <label htmlFor="password" className="login-input-label">
          <FaLock />
          <span>رمز عبور</span>
        </label>

        <div className="login-input-group">
          <input
            className={errors.password ? "login-input-error" : ""}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور خود را وارد کنید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="login-eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errors.password && <p className="login-error-masage">{errors.password}</p>}
      </div>
      <div className="forget-password">
        <Link to="/forgot-password">فراموشی رمز عبور؟</Link>
      </div>

      <button className="login-btn" onClick={handleLogin}>
        ورود به سیستم
      </button>
    </div>
  );
}
export default Login;
