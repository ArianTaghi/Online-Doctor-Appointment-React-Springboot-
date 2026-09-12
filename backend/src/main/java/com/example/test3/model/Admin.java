package com.example.test3.model;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Admin extends User {
    public Admin() {
    }

    public Admin(String username, String password) {
        super(username, password, Role.ADMIN, true, "admin", 1, LocalDate.now(), 0);
    }
}
