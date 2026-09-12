package com.example.test3.controller;

import com.example.test3.model.City;
import com.example.test3.model.Hospital;
import com.example.test3.model.Speciality;
import com.example.test3.repository.CityRepository;
import com.example.test3.repository.HospitalRepository;
import com.example.test3.service.SpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/req")
@RestController
public class RequirementsController {

    @Autowired
    private SpecialityService specialityService;
    @Autowired
    private HospitalRepository hospitalRepository;
    @Autowired
    private CityRepository cityRepository;

    @GetMapping("/specialities") public List<Speciality> getSpecialities() {
        return specialityService.getList();
    }
    @GetMapping("/cities") public List<City> getCities() {return cityRepository.findAll();}
    @GetMapping("/hospitals") public List<Hospital> getHospitals() {
        System.out.println(hospitalRepository.findAll().size());
        return hospitalRepository.findAll();}
    @GetMapping("/hospitals/bycity/{city}") public List<Hospital> getHospitals(@PathVariable String city) {
        return hospitalRepository.findAll();
    }

}
