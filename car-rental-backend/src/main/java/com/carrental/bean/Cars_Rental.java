package com.carrental.bean;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "CARS_RENTAL")
public class Cars_Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "VARIANT_NAME")
    private String variantName;

    private String company;

    private Integer year;

    @Column(name = "FUEL_TYPE")
    private String fuelType;

    @Column(name = "SEAT_CAPACITY")
    private Integer seatCapacity;

    @Column(name = "RENT_PER_DAY")
    private Double rentPerDay;

    private String ac;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;   // Store image as byte[]
    
    // ---------------- RELATIONSHIPS ----------------

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    // ---------------- Constructors ----------------

    public Cars_Rental() {}

    public Cars_Rental(Long id, String variantName, String company, Integer year,
                       String fuelType, Integer seatCapacity, Double rentPerDay,
                       String ac, byte[] image) {
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

    // ---------------- Getters & Setters ----------------

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getVariantName() { return variantName; }
    public void setVariantName(String variantName) { this.variantName = variantName; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public Integer getSeatCapacity() { return seatCapacity; }
    public void setSeatCapacity(Integer seatCapacity) { this.seatCapacity = seatCapacity; }

    public Double getRentPerDay() { return rentPerDay; }
    public void setRentPerDay(Double rentPerDay) { this.rentPerDay = rentPerDay; }

    public String getAc() { return ac; }
    public void setAc(String ac) { this.ac = ac; }

    public byte[] getImage() { return image; }
    public void setImage(byte[] image) { this.image = image; }
}
