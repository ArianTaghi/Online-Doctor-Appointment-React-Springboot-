package com.example.test3.service;

import com.example.test3.model.Ill;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IllService {

     int getIllsCount();
     void addIll(Ill ill);
     boolean removeIll(int id);
     Ill getIllById(int id);
     boolean editIll(Ill ill);
     List<Ill> getAllIlls();
     List<Ill> searchByUsername(String username);}