package com.example.test3.repository;

import com.example.test3.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.print.Doc;
import java.util.List;

@Repository

public interface DoctorRepository extends JpaRepository<Doctor,Integer> {
    Doctor findById(int id);

    List<Doctor> findByUsername(String username);
    List<Doctor> findAllByOrderByUsernameAsc();
    List<Doctor> findAllByOrderByUsernameDesc();
    List<Doctor> findByUsernameContainingIgnoreCase(String username);
    List<Doctor> findBySpecialty(String specialty);
    List<Doctor> findByCity(String city);
    List<Doctor> findDoctorByUsernameContainingIgnoreCaseAndSpecialty (String name, String speciality);
    List<Doctor> findDoctorByUsernameContainingIgnoreCaseAndCity (String name, String city);
    List<Doctor> findDoctorBySpecialtyAndCity (String speciality, String city);
    List<Doctor> findDoctorByUsernameContainingIgnoreCaseAndSpecialtyAndCity (String name, String speciality, String city);
    List<Doctor> findByStartBetween(int start1, int start2);
    List<Doctor> findByStartLessThanEqual(int start);
    List<Doctor> findByStartGreaterThanEqual(int start);
    List<Doctor> findByEndBetween(int end1, int end2);
    List<Doctor> findByEndLessThanEqual(int end);
    List<Doctor> findAllByOrderByStartAsc();
    List<Doctor> findByEndGreaterThanEqual(int end);
    List<Doctor> findByStartBetweenAndEndBetween(int start1, int start2, int end1, int end2);
}