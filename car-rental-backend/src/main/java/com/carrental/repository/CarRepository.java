package com.carrental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.bean.Cars_Rental;

public interface CarRepository extends JpaRepository<Cars_Rental, Long> {
}
