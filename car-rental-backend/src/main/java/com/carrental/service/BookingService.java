package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.carrental.bean.Booking;
import com.carrental.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository repo;

    public Booking createBooking(Booking booking) {
        return repo.save(booking);
    }

    public List<Booking> getAllBookings() {
        return repo.findAll();
    }

    public List<Booking> getBookingByUser(int userId) {
        return repo.findByUserId(userId);
    }

    public Booking updateStatus(int id, String status) {
        Booking b = repo.findById((long) id).orElse(null);
        if (b != null) {
            b.setStatus(status);
            return repo.save(b);
        }
        return null;
    }
    public boolean deleteBooking(int id) {
        if (repo.existsById((long) id)) {
            repo.deleteById((long) id);
            return true;
        }
        return false;
    }
    public List<Booking> getAllBookingsWithUser() {
        return repo.findAllWithUser();
    }

    public Booking rejectBooking(int id, String reason) {
        Booking booking = repo.findById((long) id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("REJECTED");
        booking.setRejectReason(reason);

        return repo.save(booking);
    }


}
