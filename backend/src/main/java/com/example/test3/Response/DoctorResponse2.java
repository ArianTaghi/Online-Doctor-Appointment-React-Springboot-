package com.example.test3.Response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DoctorResponse2 {

    private String username;
    private int start;
    private String speciality;
    private int end;
    private String hospital;
    private String city;
    private int code;
    private int id;
    public DoctorResponse2(String username, int id,
                           String speciality, int start, int end, String hospital, int code, String city) {
        this.username = username;
        this.speciality = speciality;
        this.id = id;
        this.start = start;
        this.hospital = hospital;
        this.code = code;
        this.end = end;
        this.city = city;
    }
}
