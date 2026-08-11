package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carrental.bean.Booking;
import com.carrental.bean.Users_Carrental;
import com.carrental.service.UsersService;


@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UsersService service;
    
 // USER LOGIN
    @PostMapping("/login")
    public Users_Carrental loginUser(@RequestBody Users_Carrental user) {
        return service.loginUser(user.getEmail(), user.getPassword());
    }


    // CREATE USER
    @PostMapping("/add")
    public Users_Carrental addUser(@RequestBody Users_Carrental user) {
        return service.saveUser(user);
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public Users_Carrental getUser(@PathVariable Long id) {
        return service.getUserById(id);
    }

    // GET ALL USERS
    @GetMapping("/all")
    public List<Users_Carrental> getAll() {
        return service.getAllUsers();
    }

    // UPDATE USER
    @PutMapping("/update/{id}")
    public Users_Carrental updateUser(@PathVariable Long id, 
                                      @RequestBody Users_Carrental user) {
        return service.updateUser(id, user);
    }

    // DELETE USER
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {
        return service.deleteUser(id);
    }
    
    //-----------------
 // GET USER BY EMAIL
    @GetMapping("/email/{email}")
    public Users_Carrental getUserByEmail(@PathVariable String email) {
        return service.getUserByEmail(email);
    }
    
//    @GetMapping("/user/{userId}")
//    public List<Booking> getByUser(@PathVariable int userId) {
//        return service.getBookingByUser(userId);
//    }

}
