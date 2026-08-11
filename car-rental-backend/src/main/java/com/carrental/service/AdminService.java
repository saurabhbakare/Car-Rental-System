package com.carrental.service;

import com.carrental.bean.Admin;

public interface AdminService {
    Admin saveAdmin(Admin admin);

    // New login method
    Admin loginAdmin(String email, String password);
}
