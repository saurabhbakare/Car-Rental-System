package com.carrental.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.carrental.bean.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    // Custom query compatible with Oracle
    @Query("SELECT COUNT(a) > 0 FROM Admin a WHERE a.adminemail = :email")
    boolean existsByAdminemail(@Param("email") String adminemail);

    // Optional: Fetch admin for login verification
    @Query("SELECT a FROM Admin a WHERE a.adminemail = :email AND a.password = :password")
    Admin findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
}
