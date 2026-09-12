package com.example.test3.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Doctor extends User {

    private int start;
    private String specialty;
    private int end;
    private int docCode;
    private String hospital;
    private String city;

    public Doctor() {
    }

    public Doctor(String username, String password, boolean gender, String name,
                  long code, LocalDate birthday,
              String specialty, int start, int end, long phone, int docCode, String hospital, String city) {
        super(username, password, Role.DOCTOR, gender, name, code, birthday, phone);
        this.specialty = specialty;
        this.start = start;
        this.end = end;
        this.docCode = docCode;
        this.hospital = hospital;
        this.city = city;
    }

}