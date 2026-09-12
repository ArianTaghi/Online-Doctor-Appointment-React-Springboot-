package com.example.test3;

import com.example.test3.model.Admin;
import com.example.test3.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class Configg {

    @Bean
    public CommandLineRunner v(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (adminRepository.findByUsername("1") == null) {
                Admin admin = new Admin("1", passwordEncoder.encode("1"));
                adminRepository.save(admin);
            }
        };
    }
}