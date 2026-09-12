package com.example.test3.controller;

import com.example.test3.Response.UserEdit;
import com.example.test3.model.Ill;
import com.example.test3.model.User;
import com.example.test3.repository.IllRepository;
import com.example.test3.security.JwtUtil;
import com.example.test3.service.IllServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ill")
public class IllController {
    @Autowired
    private IllServiceImpl illService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/admin/getCount") public int getCount() {
        return illService.getIllsCount();
    }

    @PreAuthorize("hasAnyRole('ILL','ADMIN')")

    @DeleteMapping("/remove/{id}") public boolean remove(@PathVariable int id) {
        return illService.removeIll(id);
    }

    @GetMapping("/get/{id}") public Ill get(@PathVariable int id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return getById(user.getId());
    }

    @PreAuthorize("hasAnyRole('ILL', 'ADMIN')")
    @PutMapping("/editill") public boolean editIll(@RequestBody UserEdit ill, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Ill ill2 = getById(user.getId());
        String username = ill.getUsername();
        long phone = ill.getPhone();
        System.out.println("hello");
        if (username.isEmpty() && phone == 0)
            return false;
        if (!username.isEmpty())
            ill2.setUsername(ill.getUsername());
        else if (phone != 0)
            ill2.setPhone(ill.getPhone());
        System.out.println(ill.getPhone());
        System.out.println(ill2.getPhone());
        return illService.editIll(ill2);
    }

    @PreAuthorize("hasAnyRole('ILL', 'ADMIN')")
    @PutMapping("/editillpass/{pass1}-{pass2}")
    public boolean editIllPass(@PathVariable String pass1,@PathVariable String pass2, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Ill ill2 = getById(user.getId());
        String originalPass = ill2.getPassword();
        if (pass1.isEmpty() || pass2.isEmpty())
            return false;
        if (passwordEncoder.matches(pass1, originalPass)) {
            String encoded2 = passwordEncoder.encode(pass2);
            ill2.setPassword(encoded2);
            return illService.editIll(ill2);
        }
        System.out.println("Password change unsuccessful cuz pass1 wasnt correct");
        return false;
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/admin/get/{id}") public Ill getById(@PathVariable int id) {
        return illService.getIllById(id);
    }


    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/admin/getList") public List<Ill> getList() {
        return illService.getAllIlls();
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/admin/search/byusername/{username}") public List<Ill> search(@PathVariable String username) {
        return illService.searchByUsername(username);
    }

}
