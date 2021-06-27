package com.example.myapp.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.example.myapp.model.Document;

public interface DocumentService
{

	public Document saveDocument(Document document);

	public List<Document> getAllDocument();

	public List<Document> getAllDocumentByDescOrder();

	public Document getDocumentById(long documentID);

	public void deleteDocument(Document document);
	
	public void deleteDocumentById(long documentID);

	public long countDocument();
}
