package com.example.test3.service;

import com.example.test3.model.User;
import com.example.test3.repository.UserRepository;
import com.example.test3.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserDetailsService {

    @Autowired
    public UserRepository userRepository;
    @Autowired
    JwtUtil jwtUtil;


    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }

    public User loadUserById(int id) throws UsernameNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with id: " + id)
                );
    }
    public byte[] getPhoto(int id) {
        return loadUserById(id).getPhoto();
    }
    public void ban(int id) {
        User user = loadUserById(id);
        user.setBan(!user.isBan());
        userRepository.save(user);
        System.out.println(user.isBan());
    }
}
