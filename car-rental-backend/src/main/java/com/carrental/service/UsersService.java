package com.carrental.service;

import java.util.List;

import com.carrental.bean.Users_Carrental;

public interface UsersService {
    
    Users_Carrental saveUser(Users_Carrental user);

    Users_Carrental getUserById(Long id);

    List<Users_Carrental> getAllUsers();

    Users_Carrental updateUser(Long id, Users_Carrental user);

    String deleteUser(Long id);

	Users_Carrental loginUser(String email, String password);

	Users_Carrental getUserByEmail(String email);
}
