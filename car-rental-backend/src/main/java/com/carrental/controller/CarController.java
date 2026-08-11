package com.carrental.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.carrental.bean.Cars_Rental;
import com.carrental.service.CarService;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin("*")
public class CarController {

    @Autowired
    private CarService carService;

    //ADD CAR VARIANT 
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Response addCar(
            @RequestParam("variantName") String variantName,
            @RequestParam("company") String company,
            @RequestParam("year") Integer year,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("seatCapacity") Integer seatCapacity,
            @RequestParam("rentPerDay") Double rentPerDay,
            @RequestParam("ac") String ac,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            Cars_Rental car = new Cars_Rental();
            car.setVariantName(variantName);
            car.setCompany(company);
            car.setYear(year);
            car.setFuelType(fuelType);
            car.setSeatCapacity(seatCapacity);
            car.setRentPerDay(rentPerDay);
            car.setAc(ac);

            Cars_Rental savedCar = carService.addCar(car, image);

            return new Response(true, "Variant added successfully!", mapToDTO(savedCar));

        } catch (Exception e) {
            e.printStackTrace();
            return new Response(false, "Failed to add variant: " + e.getMessage(), null);
        }
    }

    // ---------------------- GET ALL VARIANTS --------------------------
    @GetMapping("/all")
    public Response getAllCars() {
        try {
            List<Cars_Rental> list = carService.getAllCars();
            List<CarDTO> dtoList = list.stream()
                    .map(this::mapToDTO)
                    .collect(Collectors.toList());
            return new Response(true, "Records fetched successfully!", dtoList);
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(false, e.getMessage(), null);
        }
    }

    // ---------------------- GET BY ID --------------------------
    @GetMapping("/{id}")
    public Response getCarById(@PathVariable Long id) {
        try {
            Cars_Rental car = carService.getCarById(id);
            return new Response(true, "Record fetched successfully!", mapToDTO(car));
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(false, e.getMessage(), null);
        }
    }

    // ---------------------- DELETE CAR --------------------------
    @DeleteMapping("/delete/{id}")
    public Response deleteCar(@PathVariable Long id) {
        try {
            boolean deleted = carService.deleteCar(id);
            if (deleted) {
                return new Response(true, "Variant deleted successfully!", null);
            } else {
                return new Response(false, "Variant not found!", null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(false, "Delete failed: " + e.getMessage(), null);
        }
    }

    // ---------------------- UPDATE CAR --------------------------
    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Response updateCar(
            @PathVariable Long id,
            @RequestParam("variantName") String variantName,
            @RequestParam("company") String company,
            @RequestParam("year") Integer year,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("seatCapacity") Integer seatCapacity,
            @RequestParam("rentPerDay") Double rentPerDay,
            @RequestParam("ac") String ac,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {
            Cars_Rental updated = new Cars_Rental();
            updated.setVariantName(variantName);
            updated.setCompany(company);
            updated.setYear(year);
            updated.setFuelType(fuelType);
            updated.setSeatCapacity(seatCapacity);
            updated.setRentPerDay(rentPerDay);
            updated.setAc(ac);

            Cars_Rental result = carService.updateCar(id, updated, image);

            return new Response(true, "Variant updated successfully!", mapToDTO(result));

        } catch (Exception e) {
            e.printStackTrace();
            return new Response(false, "Update failed: " + e.getMessage(), null);
        }
    }

    // ---------------------- HELPER: Convert Cars_Rental to DTO --------------------------
    private CarDTO mapToDTO(Cars_Rental car) {

        String base64Image = null;

        if (car.getImage() != null) {
            base64Image = "data:image/jpeg;base64," +
                    java.util.Base64.getEncoder().encodeToString(car.getImage());
        }

        return new CarDTO(
                car.getId(),
                car.getVariantName(),
                car.getCompany(),
                car.getYear(),
                car.getFuelType(),
                car.getSeatCapacity(),
                car.getRentPerDay(),
                car.getAc(),
                base64Image
        );
    }

    // ---------------------- RESPONSE CLASS --------------------------
    public static class Response {
        private boolean success;
        private String message;
        private Object data;

        public Response(boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public Object getData() { return data; }
    }

    // ---------------------- DTO CLASS --------------------------
    public static class CarDTO {
        private Long id;
        private String variantName;
        private String company;
        private Integer year;
        private String fuelType;
        private Integer seatCapacity;
        private Double rentPerDay;
        private String ac;
        private String image; // Base64

        public CarDTO(Long id, String variantName, String company, Integer year,
                      String fuelType, Integer seatCapacity, Double rentPerDay,
                      String ac, String image) {
            this.id = id;
            this.variantName = variantName;
            this.company = company;
            this.year = year;
            this.fuelType = fuelType;
            this.seatCapacity = seatCapacity;
            this.rentPerDay = rentPerDay;
            this.ac = ac;
            this.image = image;
        }

        // Getters only (DTO is read-only)
        public Long getId() { return id; }
        public String getVariantName() { return variantName; }
        public String getCompany() { return company; }
        public Integer getYear() { return year; }
        public String getFuelType() { return fuelType; }
        public Integer getSeatCapacity() { return seatCapacity; }
        public Double getRentPerDay() { return rentPerDay; }
        public String getAc() { return ac; }
        public String getImage() { return image; }
    }
}
