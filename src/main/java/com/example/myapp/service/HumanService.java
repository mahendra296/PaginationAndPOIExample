package com.example.myapp.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.example.myapp.model.Human;

public interface HumanService {

	public void saveHuman(Human human);
	
	public List<Human> getAllHuman();
	
	public List<Human> getAllHumanByDescOrder();
	
	public List<Human> getPaginationHumanData(int pageNo, int pageSize, String sortBy);
	
	public Human getHumanById(long humanId);
	
	public void deleteHuman(Human human);
	
	public Page<Human> getPaginateHumanData(int pageNo, int pageSize);
	
	public Page<Human> getPaginateSortedHumanData(int pageNo, int pageSize, String sorted);
	
	public long countHuman();
}
