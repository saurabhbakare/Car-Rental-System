package com.carrental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carrental.bean.Admin;
import com.carrental.service.AdminService;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/add")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }

    // Admin login
    @PostMapping("/login")
    public Admin loginAdmin(@RequestBody Admin admin) {
        return adminService.loginAdmin(admin.getAdminemail(), admin.getPassword());
    }
}
