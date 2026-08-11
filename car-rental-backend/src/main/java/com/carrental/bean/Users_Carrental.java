package com.carrental.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;


@Entity
@Data
public class Users_Carrental {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long userid;
	
	@Column
	private String name;
	
	@Column
	private String email;
	
	@Column
	private long phoneno;
	
	@Column
	private String password;
	
	@Column
	private String address;
	
	
}
