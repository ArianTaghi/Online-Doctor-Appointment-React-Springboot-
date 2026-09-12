package com.example.test3.controller;

import com.example.test3.Response.LoginObject;
import com.example.test3.Response.LoginResponse;
import com.example.test3.model.Doctor;
import com.example.test3.model.Ill;
import com.example.test3.model.Role;
import com.example.test3.model.User;
import com.example.test3.repository.UserRepository;
import com.example.test3.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager,
            UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }
    @PostMapping("/signin/ill") public LoginResponse authenticateIll(@RequestBody LoginObject o) {
        Authentication authentication = authenticationManager.authenticate(
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                        o.getUsername(),
                        o.getPassword()
                )
        );
        final User user1 = (User) authentication.getPrincipal();
        assert user1 != null;
        if (user1.isBan())
            return null;
        if (user1.getRole().equals(Role.ILL))
            return new LoginResponse(jwtUtil.generateToken(user1), Role.ILL, user1.getUsername() ,user1.getId());
        if (user1.getRole().equals(Role.DOCTOR))
            return new LoginResponse(jwtUtil.generateToken(user1), Role.DOCTOR, user1.getUsername() ,user1.getId());
        if (user1.getRole().equals(Role.ADMIN))
            return new LoginResponse(jwtUtil.generateToken(user1), Role.ADMIN, user1.getUsername() ,user1.getId());
        return null;
    }
    @PostMapping("/signup/ill") public LoginResponse registerIll(@RequestBody Ill user) {
        System.out.println(user.getUsername());

        if (userRepository.findByUsername(user.getUsername()) != null)
            return null;
        final Ill newUser = new Ill(
                user.getUsername(),
                passwordEncoder.encode(user.getPassword()),
                (boolean)user.getGender(),
                user.getName(),
                user.getCode(),
                user.getBirthday(),
                user.getDescription(),
                user.getPhone()
        );
        userRepository.save(newUser);
        return new LoginResponse(jwtUtil.generateToken(user), Role.ILL, user.getUsername(), user.getId());
    }

    @PostMapping("/signup/doctor") public LoginResponse registerDoctor(@RequestBody Doctor user) {
        if (userRepository.findByUsername(user.getUsername()) != null)
            return null;
        final Doctor newUser = new Doctor(
            user.getUsername(),
            passwordEncoder.encode(user.getPassword()),
            (boolean)user.getGender(),
            user.getName(),
            user.getCode(),
            user.getBirthday(),
            user.getSpecialty(),
            user.getStart(),
            user.getEnd(),
            user.getPhone(),
            user.getDocCode(),
            user.getHospital(),
            user.getCity()
            );
        userRepository.save(newUser);
        return new LoginResponse(jwtUtil.generateToken(user), Role.DOCTOR, user.getUsername(), user.getId());
    }
}