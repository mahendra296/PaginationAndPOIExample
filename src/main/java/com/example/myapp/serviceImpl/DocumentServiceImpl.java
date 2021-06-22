package com.example.myapp.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.example.myapp.model.Document;
import com.example.myapp.repository.DocumentRepo;
import com.example.myapp.service.DocumentService;

@Service
public class DocumentServiceImpl implements DocumentService
{

	@Autowired
	private DocumentRepo		documentRepo;
	@Autowired
	private EntityManager	entityManager;

	@Override
	public void saveDocument(Document document)
	{
		documentRepo.save(document);
	}

	@Override
	public List<Document> getAllDocument()
	{
		List<Document> list = new ArrayList<>();
		list = documentRepo.findAll();
		return list.isEmpty() ? null : list;
	}

	@Override
	public List<Document> getAllDocumentByDescOrder()
	{
		List<Document> list = new ArrayList<>();
		try
		{
			Session session = entityManager.unwrap(Session.class);
			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
			CriteriaQuery<Document> criteriaQuery = criteriaBuilder.createQuery(Document.class);
			Root<Document> root = criteriaQuery.from(Document.class);
			criteriaBuilder.selectCase(root);
			criteriaQuery.orderBy(criteriaBuilder.desc(root.get("documentID")));
			list = session.createQuery(criteriaQuery).list();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		return list.isEmpty() ? null : list;
	}

	

	@Override
	public Document getDocumentById(long documentID)
	{
		return documentRepo.findById(documentID).get();
	}

	@Override
	public void deleteDocument(Document document)
	{
		documentRepo.delete(document);

	}

	@Override
	public long countDocument()
	{
		return documentRepo.count();
	}

	@Override
	public void deleteDocumentById(long documentID)
	{
		documentRepo.deleteById(documentID);
	}
}
