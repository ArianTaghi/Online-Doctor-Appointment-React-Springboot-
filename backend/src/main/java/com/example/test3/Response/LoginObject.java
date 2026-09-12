package com.example.test3.Response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginObject {
    private String password;
    private String username;

    public LoginObject(String password, String username) {
        this.password = password;
        this.username = username;
    }
}
