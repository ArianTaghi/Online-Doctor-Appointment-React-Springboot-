package com.example.test3.service;

import com.example.test3.model.Ill;
import com.example.test3.repository.IllRepository;
import com.example.test3.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class IllServiceImpl implements IllService{

    private final IllRepository illRepository;
    private final UserRepository userRepository;

    public IllServiceImpl(IllRepository illRepository, UserRepository userRepository) {
        this.illRepository = illRepository;
        this.userRepository = userRepository;
    }
    public int getIllsCount() {return (int)illRepository.count();}
    public void addIll(Ill ill) {illRepository.save(ill);}
    public boolean removeIll(int id) {
        if(illRepository.existsById(id)) {
            illRepository.deleteById(id);
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Ill getIllById(int id) {
        Ill ill = illRepository.findById(id);
        if (ill == null)
            System.out.println("Ill not found in IllServiceImpl.java" + id);
        return ill;
    }

    public boolean editIll(Ill ill) {
        illRepository.save(ill);
        return true;
    }

    public List<Ill> getAllIlls() {return illRepository.findAll();}

    public List<Ill> searchByUsername(String username) {
        return illRepository.findIllByUsernameContainingIgnoreCase(username);
    }

}
