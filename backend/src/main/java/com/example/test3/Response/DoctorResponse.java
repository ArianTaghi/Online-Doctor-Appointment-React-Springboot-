package com.example.test3.Response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DoctorResponse {

    private String username;
    private String speciality;
    private String hospital;
    private String city;
    private int id;
    public DoctorResponse(int id, String username, String speciality, String hospital, String city) {
        this.username = username;
        this.speciality = speciality;
        this.id = id;
        this.hospital = hospital;
        this.city = city;
    }
}
