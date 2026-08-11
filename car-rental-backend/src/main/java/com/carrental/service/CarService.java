package com.carrental.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.carrental.bean.Cars_Rental;
import com.carrental.repository.CarRepository;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepo;

    // ---------------------- ADD CAR --------------------------
    public Cars_Rental addCar(Cars_Rental car, MultipartFile imageFile) throws Exception {

        if (imageFile != null && !imageFile.isEmpty()) {
            car.setImage(imageFile.getBytes());
        }

        return carRepo.save(car);
    }

    // ---------------------- GET ALL CARS ----------------------
    public List<Cars_Rental> getAllCars() {
        return carRepo.findAll();
    }

    // ---------------------- GET CAR BY ID ----------------------
    public Cars_Rental getCarById(Long id) throws Exception {
        Optional<Cars_Rental> opt = carRepo.findById(id);

        if (opt.isPresent()) return opt.get();
        else throw new Exception("Car not found with ID: " + id);
    }

    // ---------------------- UPDATE CAR ----------------------
    public Cars_Rental updateCar(Long id, Cars_Rental updatedCar, MultipartFile imageFile) throws Exception {

        Cars_Rental existing = carRepo.findById(id)
                .orElseThrow(() -> new Exception("Car not found with ID: " + id));

        existing.setVariantName(updatedCar.getVariantName());
        existing.setCompany(updatedCar.getCompany());
        existing.setYear(updatedCar.getYear());
        existing.setFuelType(updatedCar.getFuelType());
        existing.setSeatCapacity(updatedCar.getSeatCapacity());
        existing.setRentPerDay(updatedCar.getRentPerDay());
        existing.setAc(updatedCar.getAc());

        // If a new image is uploaded → update
        if (imageFile != null && !imageFile.isEmpty()) {
            existing.setImage(imageFile.getBytes());
        }

        return carRepo.save(existing);
    }

    // ---------------------- DELETE CAR ----------------------
    public boolean deleteCar(Long id) throws Exception {
        if (!carRepo.existsById(id)) {
            throw new Exception("Car not found with ID: " + id);
        }

        carRepo.deleteById(id);
        return true;
    }
}
