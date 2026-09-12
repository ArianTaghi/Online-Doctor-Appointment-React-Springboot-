package com.example.test3.Response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserEdit {

    private String username;
    private long phone;
    public UserEdit(String username, long phone) {
        this.phone = phone;
        this.username = username;
    }
}
