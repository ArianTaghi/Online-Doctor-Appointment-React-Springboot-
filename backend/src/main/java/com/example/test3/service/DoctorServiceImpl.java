package com.example.test3.service;

import com.example.test3.Response.DoctorResponse;
import com.example.test3.Response.DoctorResponse2;
import com.example.test3.model.Doctor;
import com.example.test3.repository.DoctorRepository;
import com.example.test3.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService{

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public DoctorServiceImpl (DoctorRepository doctorRepository, UserRepository userRepository) {
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }
    public int getDoctorsCount() {return (int)doctorRepository.count();}
    public void addDoctor(Doctor doctor) {doctorRepository.save(doctor);}
    public boolean removeDoctor(int id) {
        if(doctorRepository.existsById(id)) {
            doctorRepository.deleteById(id);
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public Doctor getDoctorById(int id) {
        Doctor doctor = doctorRepository.findById(id);
        if (doctor == null)
            System.out.println("Doctor not found in DoctorServiceImpl.java" + id);
        return doctor;
    }
    public DoctorResponse2 getDoctorResponseById(int id) {
        Doctor doctor = doctorRepository.findById(id);
        return new DoctorResponse2(doctor.getUsername(), doctor.getId(),
                doctor.getSpecialty() ,doctor.getStart(), doctor.getEnd(), doctor.getHospital(), doctor.getDocCode(), doctor.getCity());
    }
    public boolean editDoctor(Doctor doctor) {
        System.out.println("File doctorservieimpl and editting doctor doctor name:" + doctor.getUsername()
        + "and phone" + doctor.getPhone());
        doctorRepository.save(doctor);
        return true;
    }
    public List<Doctor> getAllDoctors() {return doctorRepository.findAll();}
    public List<DoctorResponse> searchDoctorByUsername(String name) {
        return makeResponse(doctorRepository.findByUsernameContainingIgnoreCase(name));
    }
    public List<DoctorResponse> searchDoctorBySpeciality(String speciality) {
        return makeResponse(doctorRepository.findBySpecialty(speciality));
    }
    public List<DoctorResponse> searchDoctorByCity(String city) {
        return makeResponse(doctorRepository.findByCity(city));
    }
    @Override
    public List<DoctorResponse> searchDoctorByUsernameAndSpecialty(String name, String speciality) {
        return makeResponse(doctorRepository.findDoctorByUsernameContainingIgnoreCaseAndSpecialty(name, speciality));
    }
    @Override
    public List<DoctorResponse> searchDoctorByUsernameAndCity(String name, String city){
        return makeResponse(doctorRepository.findDoctorByUsernameContainingIgnoreCaseAndCity(name, city));

    }
    @Override
    public List<DoctorResponse> searchDoctorBySpecialityAndCity(String speciality, String city){
        return makeResponse(doctorRepository.findDoctorBySpecialtyAndCity(speciality, city));

    }
    @Override
    public List<DoctorResponse> searchDoctorByUsernameAndSpecialtyAndCity(String name, String speciality,String city) {
        return makeResponse(doctorRepository.findDoctorByUsernameContainingIgnoreCaseAndSpecialtyAndCity(name, speciality, city));

    }
    public List<Doctor> sortDoctorByUsername(boolean asc) {
        if (asc)
            return doctorRepository.findAllByOrderByUsernameAsc();
        return doctorRepository.findAllByOrderByUsernameDesc();
    }
    @Override
    public List<DoctorResponse> sortDoctorByRating() {
        return null;
    }
    public List<Doctor> filterByTime(int start1, int start2, int end1, int end2) {
        return doctorRepository.findByStartBetweenAndEndBetween(start1, start2, end1, end2);
    }
    public List<Doctor> filterByStart(int start1, int start2) {
        if (start1 == -1)
            return doctorRepository.findByStartLessThanEqual(start2);
        else if (start2 == -1)
            return doctorRepository.findByStartGreaterThanEqual(start1);
        return doctorRepository.findByStartBetween (start1, start2);
    }
    public List<Doctor> filterByEnd(int end1, int end2) {
        if (end1 == -1)
            return doctorRepository.findByEndLessThanEqual(end2);
        else if (end2 == -1)
            return doctorRepository.findByEndGreaterThanEqual(end1);
        return doctorRepository.findByEndBetween(end1, end2);
    }
    @Override
    public List<DoctorResponse> example(int count) {
        List<Doctor> doctors = doctorRepository.findAll();
        Collections.shuffle(doctors);
        return doctors.stream().limit(count)
                .map(doctor -> new DoctorResponse(
                        doctor.getId(),
                        doctor.getUsername(),
                        doctor.getSpecialty(),
                        doctor.getHospital(),
                        doctor.getCity()
                )).toList();
    }
    public List<DoctorResponse> makeResponse (List<Doctor> list) {
        return list.stream().map(
                doctor -> new DoctorResponse(
                        doctor.getId(),
                        doctor.getUsername(),
                        doctor.getSpecialty(),
                        doctor.getHospital(),
                        doctor.getCity()
                )).toList();
    }
}
