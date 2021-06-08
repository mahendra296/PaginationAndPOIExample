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

import com.example.myapp.model.Human;
import com.example.myapp.repository.HumanRepo;
import com.example.myapp.service.HumanService;

@Service
public class HumanServiceImpl implements HumanService
{

	@Autowired
	private HumanRepo		humanRepo;
	@Autowired
	private EntityManager	entityManager;

	@Override
	public void saveHuman(Human human)
	{
		humanRepo.save(human);
	}

	@Override
	public List<Human> getAllHuman()
	{
		List<Human> list = new ArrayList<>();
		list = humanRepo.findAll();
		return list.isEmpty() ? null : list;
	}

	@Override
	public List<Human> getAllHumanByDescOrder()
	{
		List<Human> list = new ArrayList<>();
		try
		{
			Session session = entityManager.unwrap(Session.class);
			CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
			CriteriaQuery<Human> criteriaQuery = criteriaBuilder.createQuery(Human.class);
			Root<Human> root = criteriaQuery.from(Human.class);
			criteriaBuilder.selectCase(root);
			criteriaQuery.orderBy(criteriaBuilder.desc(root.get("humanId")));
			list = session.createQuery(criteriaQuery).list();
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		return list.isEmpty() ? null : list;
	}

	@Override
	public List<Human> getPaginationHumanData(int pageNo, int pageSize, String sortBy)
	{
		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Direction.DESC, sortBy));
		Page<Human> allHumanEntity = humanRepo.findAll(pageable);
		return allHumanEntity.hasContent() ? allHumanEntity.getContent() : null;
	}

	@Override
	public Human getHumanById(long humanId)
	{
		return humanRepo.findById(humanId).get();
	}

	@Override
	public void deleteHuman(Human human)
	{
		humanRepo.delete(human);

	}

	@Override
	public Page<Human> getPaginateHumanData(int pageNo, int pageSize)
	{
		Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(Direction.DESC, "humanId"));
		return humanRepo.findAll(pageable);
	}

	@Override
	public Page<Human> getPaginateSortedHumanData(int pageNo, int pageSize, String sorted)
	{
		Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(Direction.DESC, sorted));
		return humanRepo.findAll(pageable);
	}

	@Override
	public long countHuman()
	{
		return humanRepo.count();
	}
}
