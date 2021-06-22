package com.example.myapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.myapp.model.Document;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Long> 
{
	
}
