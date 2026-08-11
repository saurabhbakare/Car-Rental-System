package com.carrental.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carrental.bean.Users_Carrental;

public interface UserRepository extends JpaRepository<Users_Carrental, Long> {

	 Users_Carrental findByEmailAndPassword(String email, String password);
	 
	 Users_Carrental findByEmail(String email); // 👈 NEW

}
