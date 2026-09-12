package com.example.test3.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    LocalDateTime date;
    String ill;
    String doctor;
    int time;
    public Appointment(LocalDateTime date, String ill, int time, String doctor) {
        this.date = date.withSecond(0).withNano(0);
        this.ill = ill;
        this.time = time;
        this.doctor = doctor;
    }
    public Appointment() {}

    public LocalDateTime getDate() {
        return date;
    }

    public int getId() {
        return id;
    }

    public String getIll() {
        return ill;
    }

    public String getDoctor() {
        return doctor;
    }

    public int getTime() {
        return time;
    }
}
