package com.example.test3.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class DoctorEdit {

    private String username;
    private long phone;
    private int start;
    private int end;

}
