package com.carrental.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="Admin_Carrental")
public class Admin {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long adminid;
	
	@Column
	private String adminname;
	
	@Column
	private String adminemail;
	 
	@Column
	private String password;
	

}
