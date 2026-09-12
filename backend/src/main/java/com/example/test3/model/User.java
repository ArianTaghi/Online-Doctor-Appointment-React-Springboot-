package com.example.test3.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Setter
@Getter
@Entity

@Inheritance(strategy = InheritanceType.JOINED)

public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private LocalDateTime date;
    private String password;
    private boolean gender;
    private String name;
    private long code;
    private LocalDate birthday;
    private long phone;
    private boolean ban;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] photo;

    public User() {}

    public User(String username, String password, Role role,
                boolean gender, String name, long code, LocalDate birthday, long phone) {
        this.username = username;
        this.date = LocalDateTime.now();
        this.password = password;
        this.role = role;
        this.gender = gender;
        this.name = name;
        this.code = code;
        this.birthday = birthday;
        this.phone = phone;
        this.ban = false;
    }

    public User(String username, String password, Role role) {
        this.username = username;
        this.date = LocalDateTime.now();
        this.password = password;
        this.role = role;
        this.ban = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority("ROLE_" + role.name())
        );
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    public Object getGender() {
        return this.gender;
    }
}
