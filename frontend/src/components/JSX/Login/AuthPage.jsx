import "../../Css/Login.css";
import Login from "./Login";
import Register from "./Register";
import DoctorRegister from "./DoctorRegister";
import { useState } from "react";

function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className={`container ${mode !== "login" ? "register-mode" : ""}`}>
      <div className="left">
        {mode === "login" && (
          <div className="login-panel active">
            <Login />
          </div>
        )}

        {mode === "patient" && (
          <div className="patient-panel active">
            <Register />
          </div>
        )}

        {mode === "doctor" && (
          <div className="doctor-panel active">
            <DoctorRegister />
          </div>
        )}
      </div>

      <div className="right">
        {mode === "login" && (
          <>
            <h2>حساب کاربری ندارید؟</h2>
            <button onClick={() => setMode("patient")}>ثبت نام بیمار</button>
            <button onClick={() => setMode("doctor")}>ثبت نام پزشک</button>
          </>
        )}

        {(mode === "patient" || mode === "doctor") && (
          <>
            <h2>حساب کاربری دارید؟</h2>
            <button onClick={() => setMode("login")}>ورود</button>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
