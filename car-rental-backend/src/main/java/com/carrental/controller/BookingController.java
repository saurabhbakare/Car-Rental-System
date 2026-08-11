package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.carrental.bean.Booking;
import com.carrental.repository.BookingRepository;
import com.carrental.service.BookingService;

@RestController
@CrossOrigin
@RequestMapping("/booking")
public class BookingController {

    private final BookingRepository bookingRepository;

    @Autowired
    private BookingService service;

    BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // CREATE booking
    @PostMapping("/create")
    public Booking create(@RequestBody Booking booking) {
        return service.createBooking(booking);
    }

    // GET all bookings
    @GetMapping("/all")
    public List<Booking> getAll() {
        return service.getAllBookings();
    } 

    // UPDATE booking status
    @PutMapping("/status/{id}")
    public Booking updateStatus(
            @PathVariable int id,
            @RequestParam String status) {
        return service.updateStatus(id, status);
    }

    // GET bookings by user
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable int userId) {
        return service.getBookingByUser(userId);
    }
    @PutMapping("/cancel/{id}")
    public Booking cancelBooking(@PathVariable int id) {
        return service.updateStatus(id, "CANCELLED");
    }

 // DELETE a booking permanently
    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable int id) {
        boolean deleted = service.deleteBooking(id);
        if (deleted) {
            return "Booking deleted successfully";
        } else {
            return "Booking not found";
        }
    }
    @GetMapping("/bookings")
    public List<Booking> getBookings() {
        return service.getAllBookingsWithUser();
    }
    @GetMapping("/admin/bookings")
    public List<Booking> getAllBookingsWithUser() {
        return bookingRepository.findAllWithUserAndCar();
    }
    @PutMapping("/reject/{id}")
    public Booking rejectBooking(
            @PathVariable int id,
            @RequestParam String reason) {

        return service.rejectBooking(id, reason);
    }




    
}
