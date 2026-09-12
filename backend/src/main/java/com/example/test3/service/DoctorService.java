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
public interface DoctorService {

     int getDoctorsCount();
     void addDoctor(Doctor doctor);
     boolean removeDoctor(int id);
     Doctor getDoctorById(int id);
     DoctorResponse2 getDoctorResponseById(int id);
     boolean editDoctor(Doctor doctor);
     List<Doctor> getAllDoctors();
     List<DoctorResponse> searchDoctorByUsername(String name);
     List<DoctorResponse> searchDoctorBySpeciality(String speciality);
     List<DoctorResponse> searchDoctorByCity(String city);
     List<DoctorResponse> searchDoctorByUsernameAndSpecialty(String name, String speciality);
     List<DoctorResponse> searchDoctorByUsernameAndCity(String name, String city);
     List<DoctorResponse> searchDoctorBySpecialityAndCity(String speciality, String city);
     List<DoctorResponse> searchDoctorByUsernameAndSpecialtyAndCity(String name, String speciality,String city);
     List<Doctor> sortDoctorByUsername(boolean asc);
     List<DoctorResponse> sortDoctorByRating();
     List<Doctor> filterByTime(int start1, int start2, int end1, int end2);
     List<Doctor> filterByStart(int start1, int start2);
     List<Doctor> filterByEnd(int end1, int end2);
     List<DoctorResponse> example(int count);
}