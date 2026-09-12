package com.example.test3.controller;

import com.example.test3.Response.DoctorEdit;
import com.example.test3.Response.DoctorResponse;
import com.example.test3.Response.DoctorResponse2;
import com.example.test3.model.Doctor;
import com.example.test3.model.User;
import com.example.test3.security.JwtUtil;
import com.example.test3.service.DoctorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    private DoctorServiceImpl doctorService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/admin/getcount") public int getCount() {
        return doctorService.getDoctorsCount();
    }

    @PreAuthorize("hasAnyRole('DOCTOR','ADMIN')")
    @DeleteMapping("/remove/{id}") public boolean remove(@PathVariable int id) {
        return doctorService.removeDoctor(id);
    }
    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @GetMapping("/admin/get/{id}") public Doctor getById(@PathVariable int id) {
        return doctorService.getDoctorById(id);
    }
    @GetMapping("/get/response/{id}") public DoctorResponse2 getResponseById(@PathVariable int id) {
        return doctorService.getDoctorResponseById(id);
    }

    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @PutMapping("/editdoctor") public boolean editDoctor(@RequestBody DoctorEdit doctor, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Doctor doctor2 = getById(user.getId());
        String username = doctor.getUsername();
        int start = doctor.getStart();
        int end = doctor.getEnd();
        long phone = doctor.getPhone();
        System.out.println("hello");
        if (username.isEmpty() && phone == 0 && start == 0 && end == 0)
            return false;
        if (!username.isEmpty())
            doctor2.setUsername(doctor.getUsername());
        else if (end != 0 && start != 0) {
            doctor2.setStart(start);
            doctor2.setEnd(end);
        } else
            doctor2.setPhone(doctor.getPhone());
        System.out.println(doctor.getPhone());
        System.out.println(doctor2.getPhone());
        return doctorService.editDoctor(doctor2);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/admin/editdoctor/{id}_{start}_{end}")
    public boolean editDoctor(@PathVariable int id,@PathVariable int start,@PathVariable int end) {
        Doctor doctor = getById(id);
        doctor.setStart(start);
        doctor.setEnd(end);
        return doctorService.editDoctor(doctor);
    }

    @PreAuthorize("hasAnyRole('DOCTOR', 'ADMIN')")
    @PutMapping("/editdoctorpass/{pass1}-{pass2}")
    public boolean editDoctorPass(@PathVariable String pass1,@PathVariable String pass2, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Doctor doctor2 = getById(user.getId());
        String originalPass = doctor2.getPassword();
        if (pass1.isEmpty() || pass2.isEmpty())
            return false;
        if (passwordEncoder.matches(pass1, originalPass)) {
            String encoded2 = passwordEncoder.encode(pass2);
            doctor2.setPassword(encoded2);
            System.out.println("Password change successful");
            return doctorService.editDoctor(doctor2);
        }
        System.out.println("Password change unsuccessful cuz pass1 wasnt correct");
        return false;
    }


    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/admin/get/list") public List<Doctor> getList() {
        return doctorService.getAllDoctors();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/admin/sort/byname/{acs}") public List<Doctor> sortDoctorsByName(@PathVariable boolean acs) {
        return doctorService.sortDoctorByUsername(acs);
    }
    @GetMapping("/search/{username}_{speciality}_{city}")
    public List<DoctorResponse> searchDoctorsByNameAndSpeciality(@PathVariable String username, @PathVariable String speciality, @PathVariable String city) {
        boolean u = username.isEmpty();
        boolean s = speciality.isEmpty();
        boolean c = city.isEmpty();
        String us = username.toLowerCase();
        String sp = speciality.toLowerCase();
        String ci = city.toLowerCase();

        if (u & c)
            return doctorService.searchDoctorBySpeciality(sp);
        if (u & s)
            return doctorService.searchDoctorByCity(ci);
        if (s & c)
            return doctorService.searchDoctorByUsername(us);
        if (u)
            return doctorService.searchDoctorBySpecialityAndCity(sp, ci);
        if (s)
            return doctorService.searchDoctorByUsernameAndCity(us, ci);
        if (c)
            return doctorService.searchDoctorByUsernameAndSpecialty(us ,sp);
        return doctorService.searchDoctorByUsernameAndSpecialtyAndCity(us, sp, ci);
    }
    @GetMapping("/get/example") public List<DoctorResponse> getExampleDoctors() {
        return doctorService.example(10);
    }
    @GetMapping("/sort/mostrated") public List<DoctorResponse> getTopDoctors() {
        return doctorService.example(5);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/filter/bytime/{start1}_{start2}_{end1}_{end2}")
    public List<Doctor> getDoctorsByTime(@PathVariable int start1,int start2 ,int end1 ,int end2) {
        return doctorService.filterByTime(start1, start2, end1, end2);
    }
}
