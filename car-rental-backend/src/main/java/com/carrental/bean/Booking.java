package com.carrental.bean;

import jakarta.persistence.*;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private Long userId;
    private Long carId;
    @ManyToOne(fetch = FetchType.LAZY)  // Booking me User ko map karenge
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private Users_Carrental user;
    private String carVariant;
    private String pickupDate;
    private String returnDate;
    private int totalDays;
    private double totalAmount;
    private String rejectReason;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carId", insertable = false, updatable = false)
    private Cars_Rental car;


    private String status;   // PENDING, APPROVED, REJECTED

    public Booking() {}

    // Getters & Setters
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCarId() { return carId; }
    public void setCarId(Long carId) { this.carId = carId; }
    
    public String getCarVariant() {
		return carVariant;
	}

	public void setCarVariant(String carVariant) {
		this.carVariant = carVariant;
	}
	
	

	public String getRejectReason() {
		return rejectReason;
	}

	public void setRejectReason(String rejectReason) {
		this.rejectReason = rejectReason;
	}

	public String getPickupDate() { return pickupDate; }
    public void setPickupDate(String pickupDate) { this.pickupDate = pickupDate; }

    public String getReturnDate() { return returnDate; }
    public void setReturnDate(String returnDate) { this.returnDate = returnDate; }

    public int getTotalDays() { return totalDays; }
    public void setTotalDays(int totalDays) { this.totalDays = totalDays; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Users_Carrental getUser() {
        return user;
    }

    public void setUser(Users_Carrental user) {
        this.user = user;
    }
    public Cars_Rental getCar() {
        return car;
    }

    public void setCar(Cars_Rental car) {
        this.car = car;
    }

}

