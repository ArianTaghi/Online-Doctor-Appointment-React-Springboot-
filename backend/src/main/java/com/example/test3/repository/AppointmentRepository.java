package com.example.test3.repository;

import com.example.test3.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    boolean existsByDoctorAndDate(String doctor, LocalDateTime date);
    void removeAppointmentsById(int id);
    List<Appointment> findAllByOrderByDateDesc();
    List<Appointment> findByDateBeforeOrderByDateDesc(LocalDateTime date);
    List<Appointment> findByDoctorOrderByDateDesc(String doctor);
    List<Appointment> findByDoctorAndDateBetween(
            String doctor,
            LocalDateTime start,
            LocalDateTime end
    );

    List<Appointment> findByDateBetween(LocalDateTime dateAfter, LocalDateTime dateBefore);

    List<Appointment> findByDoctorAndIllAndDateBetween(
            String doctor,
            String ill,
            LocalDateTime start,
            LocalDateTime end
    );
    List<Appointment> findByIllOrderByDateDesc(String ill);
    List<Appointment> findByDoctorAndIll(String doctor, String ill);
    List<Appointment> findByIllAndDateBefore(String ill, LocalDateTime date);
    List<Appointment> findByIllAndDateAfter(String ill, LocalDateTime date);
}
