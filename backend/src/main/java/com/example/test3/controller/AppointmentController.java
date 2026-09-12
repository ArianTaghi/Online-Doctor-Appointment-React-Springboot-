package com.example.test3.controller;

import com.example.test3.model.Appointment;
import com.example.test3.model.User;
import com.example.test3.repository.AppointmentRepository;
import com.example.test3.service.AppointmentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {
    @Autowired
    private AppointmentServiceImpl appointmentService;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @PreAuthorize("hasAnyRole('ILL','ADMIN')")
    @PostMapping("/add")
    public boolean add(@RequestBody Appointment appointment, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        appointment.setIll(currentUser.getUsername());
        if (appointmentRepository.findByDoctorAndIll(appointment.getDoctor(), appointment.getIll()).isEmpty())
            return appointmentService.createAppointment(appointment);
        return false;
    }
    @PreAuthorize("hasAnyRole('ILL','ADMIN')")
    @DeleteMapping("/delete") public void delete(@RequestBody int id) {
        appointmentService.deleteAppointment(id);
    }

    @PreAuthorize("hasAnyRole('ILL','ADMIN')")
    @PostMapping("/change/{id}")
    public boolean change(@RequestBody Appointment appointment, @PathVariable int id, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        appointment.setIll(currentUser.getUsername());
        return appointmentService.changeAppointment(id, appointment);
    }
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/latest") public List<Appointment> latest() {
        return appointmentService.latestAppointments();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/oncoming") public List<Appointment> oncoming() {
        return appointmentService.oncomingAppointments();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/user/incoming/{username}") public List<Appointment> adminIncoming(@PathVariable String username) {
        return appointmentService.myOncomingAppointments(username);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/user/latest/{username}") public List<Appointment> adminLatest(@PathVariable String username) {
        return appointmentService.myLatestAppointments(username);
    }

    @PreAuthorize("hasAnyRole('ILL', 'ADMIN')")
    @GetMapping("/mylatest") public List<Appointment> myLatest(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return appointmentService.myLatestAppointments(currentUser.getUsername());
    }
    @PreAuthorize("hasAnyRole('ILL','ADMIN')")
    @GetMapping("/myoncoming") public List<Appointment> myOncoming(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        System.out.println(currentUser.getUsername());
        return appointmentService.myOncomingAppointments(currentUser.getUsername());
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/getlist") public List<Appointment> getlist() {
        return appointmentService.getList();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/filter/{start}_{end}") public List<Appointment> filterlist
            (@PathVariable LocalDateTime start,@PathVariable LocalDateTime end) {
        return appointmentService.filterList(start, end);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/byDoctorAll/{doctor}") public List<Appointment> byDoctor(@PathVariable String doctor) {
        return appointmentService.getByDoctor(doctor);
    }

    @PreAuthorize("hasAnyRole('ILL','ADMIN', 'DOCTOR')")
    @PostMapping("/byDoctor/{doctor}_{date}")
    public List<Appointment> byDoctor(@PathVariable String doctor, @PathVariable String date) {
        int y = Integer.parseInt(date.substring(0, 4));
        int m = Integer.parseInt(date.substring(5, 7));
        int d = Integer.parseInt(date.substring(8, 10));
        return appointmentService.getByDoctorDate(doctor, LocalDate.of(y, m, d));
    }
    @PreAuthorize("hasAnyRole('ILL', 'ADMIN')")
    @PostMapping("/mine/{doctor}_{date}")
    public List<Appointment> mine(@PathVariable String doctor, @PathVariable String date , Authentication authentication) {
        int y = Integer.parseInt(date.substring(0, 4));
        int m = Integer.parseInt(date.substring(5, 7));
        int d = Integer.parseInt(date.substring(8, 10));
        User currentUser = (User) authentication.getPrincipal();
        return appointmentService.getByDoctorDateIll(doctor,currentUser.getUsername(), LocalDate.of(y, m, d));
    }

    @PreAuthorize("hasAnyRole('ILL','ADMIN')")
    @PostMapping("/byill") public List<Appointment> byIll(@RequestBody String ill) {
        return appointmentService.getByIll(ill);
    }
}
