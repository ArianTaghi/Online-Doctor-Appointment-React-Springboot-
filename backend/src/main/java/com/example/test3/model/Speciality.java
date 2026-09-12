package com.example.test3.model;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Speciality {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String photo;

    public Speciality(){}

    public Speciality(String name, String photo) {
        this.name = name;
        this.photo = photo;
    }
}
