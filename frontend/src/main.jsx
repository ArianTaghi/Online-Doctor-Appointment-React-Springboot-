import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";

import App from './App.jsx';
import Appointment from './components/JSX/Site/Appointment.jsx';
import DoctorPage from './components/JSX/Site/DoctorPage.jsx';
import Profile from './components/JSX/User/Profile.jsx';
import DoctorProfile from './components/JSX/Doctor/DoctorProfile.jsx';
import AdminPage from './components/JSX/Admin/AdminPage.jsx';
import AdminDoctor from './components/JSX/Admin/AdminDoctor.jsx';
import AdminDoctorPage from './components/JSX/Admin/AdminDoctorPage.jsx';
import AdminUser from './components/JSX/Admin/AdminUser.jsx';
import AdminUserPage from './components/JSX/Admin/AdminUserPage.jsx';
import AdminAppointment from './components/JSX/Admin/AdminAppointment.jsx';
import AuthPage from './components/JSX/Login/AuthPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/appointment" element={<Appointment />}/>
        <Route path="/appointment/:speciality" element={<Appointment />} />
        <Route path="/doctor/:id" element={<DoctorPage />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/admin/user" element={<AdminUser />}/>
        <Route path="/admin/user/:id" element={<AdminUserPage />}/>
        <Route path="/admin/doctor" element={<AdminDoctor />}/>
        <Route path="/admin/doctor/:id" element={<AdminDoctorPage />}/>
        <Route path="/admin/appointment" element={<AdminAppointment />}/>
        <Route path="/doc/:id" element={<DoctorProfile />}/>
        <Route path="/register" element={<AuthPage />}/>
      </Routes>
    </BrowserRouter>
   </StrictMode>
)
