package com.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.carrental.bean.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(int userId);

    @Query("SELECT b FROM Booking b JOIN FETCH b.user")
    List<Booking> findAllWithUser();
    @Query("SELECT b FROM Booking b JOIN FETCH b.user JOIN FETCH b.car")
    List<Booking> findAllWithUserAndCar();

}
