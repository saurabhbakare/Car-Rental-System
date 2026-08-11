package com.carrental.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrental.bean.Users_Carrental;
import com.carrental.repository.UserRepository;

@Service
public class UserService implements UsersService {

    @Autowired
    private UserRepository repo;

    @Override
    public Users_Carrental saveUser(Users_Carrental user) {
        return repo.save(user);
    }

    @Override
    public Users_Carrental getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Users_Carrental> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public Users_Carrental updateUser(Long id, Users_Carrental newUser) {
        Users_Carrental existing = repo.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(newUser.getName());
            existing.setEmail(newUser.getEmail());
            existing.setPhoneno(newUser.getPhoneno());
            existing.setPassword(newUser.getPassword());
            existing.setAddress(newUser.getAddress());

            return repo.save(existing);
        }
        return null;
    }

    public Users_Carrental loginUser(String email, String password) {
        Users_Carrental user = repo.findByEmailAndPassword(email, password);
        if (user != null) {
            return user; 
        }
        return null; 
    }

    @Override
    public String deleteUser(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "User deleted successfully.";
        } 
        return "User not found.";
    }
    
    //----------------------
    public Users_Carrental getUserByEmail(String email) {
        return repo.findByEmail(email); // assuming repo method exists
    }
    
}
