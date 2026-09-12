package com.example.test3.service;

import com.example.test3.model.User;
import com.example.test3.Response.LoginResponse;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
     LoginResponse login(String username, String password);
     User loadUserByUsername(String username) throws UsernameNotFoundException;
     byte[] getPhoto(int id);
    void ban(int id);
    }
