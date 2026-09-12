package com.example.test3.service;

import com.example.test3.model.Appointment;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public interface AppointmentService {

     boolean createAppointment (Appointment  appointment);
    @Transactional  void deleteAppointment(int id);
     boolean isFree (LocalDateTime date, String doctor);
    @Transactional  boolean changeAppointment (int id, Appointment appointment);
     List<Appointment> getList();
     List<Appointment> filterList(LocalDateTime start, LocalDateTime end);
     List<Appointment> oncomingAppointments ();
     List<Appointment> latestAppointments();
     List<Appointment> getByDoctor(String doctor);
     List<Appointment> getByDoctorDate(String doctor, LocalDate date);
     List<Appointment> getByIll(String ill);
     List<Appointment> getByDoctorDateIll(String doctor,String ill, LocalDate date);
     List<Appointment> myLatestAppointments(String ill);
     List<Appointment> myOncomingAppointments(String ill);
}
