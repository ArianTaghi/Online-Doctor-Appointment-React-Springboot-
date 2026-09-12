package com.example.test3.model;
import jakarta.persistence.Entity;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Getter
public class Ill extends User {

    private String description;

    public Ill() {}

    public Ill(String username, String password, boolean gender, String name,
               long code, LocalDate birthday, String description, long phone) {
        super(username, password, Role.ILL, gender, name, code, birthday, phone);
        this.description = description;
    }
}