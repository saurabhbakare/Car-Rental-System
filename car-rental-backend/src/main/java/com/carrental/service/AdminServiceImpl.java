package com.carrental.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrental.bean.Admin;
import com.carrental.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepo;

    @Override
    public Admin saveAdmin(Admin admin) {
        if (adminRepo.existsByAdminemail(admin.getAdminemail())) {
            throw new RuntimeException("Admin email already exists!");
        }
        return adminRepo.save(admin);
    }

    @Override
    public Admin loginAdmin(String email, String password) {
        Admin admin = adminRepo.findByEmailAndPassword(email, password); // must match repository
        if (admin == null) {
            throw new RuntimeException("Invalid email or password!");
        }
        return admin;
    }

}
