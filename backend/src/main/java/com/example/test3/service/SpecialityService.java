package com.example.test3.service;

import com.example.test3.model.Speciality;
import com.example.test3.repository.SpecialityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialityService {
    @Autowired
    SpecialityRepository specialityRepository;

    public List<Speciality> getList() {
        return specialityRepository.findAll();
    }
}
