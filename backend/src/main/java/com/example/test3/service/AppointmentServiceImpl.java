package com.example.test3.service;

import com.example.test3.model.Appointment;
import com.example.test3.repository.AppointmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {


    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl (AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }
    public boolean createAppointment (Appointment  appointment) {
        if (!isFree(appointment.getDate(), appointment.getDoctor()))
            return false;
        appointmentRepository.save(appointment);
        return true;
    }
    @Transactional
    public void deleteAppointment(int id) {
        appointmentRepository.removeAppointmentsById(id);
    }
    public boolean isFree (LocalDateTime date, String doctor) {
        return !appointmentRepository.existsByDoctorAndDate(doctor, date.withSecond(0).withNano(0));
    }
    @Transactional
    public boolean changeAppointment (int id, Appointment appointment) {
        if (!createAppointment(appointment))
            return false;
        deleteAppointment(id);
        return true;
    }
    public List<Appointment> getList(){
        return appointmentRepository.findAllByOrderByDateDesc();
    }

    public List<Appointment> filterList(LocalDateTime start, LocalDateTime end){
        return appointmentRepository.findByDateBetween(start, end);
    }

    public List<Appointment> oncomingAppointments () {
        List<Appointment> list = new ArrayList<>();
        for (Appointment appointment : appointmentRepository.findAllByOrderByDateDesc())
            if (appointment.getDate().isAfter(LocalDateTime.now()))
                list.add(appointment);
            else break;
        return list;
    }
    public List<Appointment> latestAppointments() {
        return appointmentRepository.findByDateBeforeOrderByDateDesc(LocalDateTime.now().withNano(0).withSecond(0));
    }
    public List<Appointment> getByDoctor(String doctor) {
        return appointmentRepository.findByDoctorOrderByDateDesc(doctor);
    }
    public List<Appointment> getByDoctorDate(String doctor, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(23, 59, 59);
        return appointmentRepository.findByDoctorAndDateBetween(doctor, start, end);
    }
    public List<Appointment> getByIll(String ill) {
        return appointmentRepository.findByIllOrderByDateDesc(ill);
    }
    public List<Appointment> getByDoctorDateIll(String doctor,String ill, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(23, 59, 59);
        return appointmentRepository.findByDoctorAndIllAndDateBetween(doctor, ill, start, end);
    }

    public List<Appointment> myLatestAppointments(String ill){
        return appointmentRepository.findByIllAndDateBefore(ill, LocalDateTime.now());
    }
    public List<Appointment> myOncomingAppointments(String ill){
        return appointmentRepository.findByIllAndDateAfter(ill, LocalDateTime.now());
    }


}
