package com.example.test3.repository;

import com.example.test3.model.Ill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface IllRepository extends JpaRepository<Ill,Integer> {
    Ill findById(int id);
    List<Ill> findByUsername(String name);
    List<Ill> findAllByOrderByUsernameAsc();
    List<Ill> findAllByOrderByUsernameDesc();
    List<Ill> findIllByUsernameContainingIgnoreCase(String username);
}