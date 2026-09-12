package com.example.test3.repository;

import com.example.test3.model.Ill;
import com.example.test3.model.Speciality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface SpecialityRepository extends JpaRepository<Speciality,Integer> {
}