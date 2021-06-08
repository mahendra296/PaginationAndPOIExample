package com.example.myapp.common;

import org.hibernate.Criteria;

public class ListNavigation
{
	public int	pageNo	       = 1;
	public int	firstRecord	   = 0;
	public int	recordsPerPage	= 10;

	public ListNavigation(int pageNo)
	{
		this.pageNo = (pageNo - 1);
		this.firstRecord = (this.pageNo * this.recordsPerPage);
	}

	public int getRecordsPerPage()
	{
		return recordsPerPage;
	}

	public void setRecordsPerPage(int recordsPerPage)
	{
		this.recordsPerPage = recordsPerPage;
		this.firstRecord = (this.pageNo * this.recordsPerPage);
	}

	public int getPageNo()
	{
		return pageNo;
	}

	public void setPageNo(int pageNo)
	{
		this.pageNo = pageNo;
		this.firstRecord = (this.pageNo * this.recordsPerPage);
	}
	public void addNavigationCriteria(Criteria criteria)
	{
		criteria.setFirstResult(this.firstRecord);
		criteria.setMaxResults(this.recordsPerPage);
	}
	public void navigationPrint()
	{
		System.out.println("**************List Navigation Parameter****************");
		System.out.println("pageNo=" + pageNo);
		System.out.println("firstRecord=" + firstRecord);
		System.out.println("recordsPerPage=" + recordsPerPage);
		System.out.println("**************List Navigation Parameter End****************");
	}
}
