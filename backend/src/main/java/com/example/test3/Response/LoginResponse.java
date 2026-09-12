package com.example.test3.Response;

import com.example.test3.model.Role;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
    private String token;
    private Role role;
    private String username;
    private int id;

    public LoginResponse(String token, Role role, String username ,int id) {
        this.token = token;
        this.role = role;
        this.username = username;
        this.id = id;
    }
}
