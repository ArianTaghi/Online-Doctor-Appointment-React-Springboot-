package com.example.test3.repository;

import com.example.test3.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, Integer> {

    Optional<Hospital> findByName(String name);

    List<Hospital> findByCity(String city);
}