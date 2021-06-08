package com.example.myapp.controller;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

import javax.persistence.EntityManagerFactory;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.myapp.common.ExcelReport;
import com.example.myapp.common.General;
import com.example.myapp.common.ListNavigation;
import com.example.myapp.model.Human;
import com.example.myapp.serviceImpl.HumanServiceImpl;

@Controller
public class HomeController
{

	@Autowired
	private HumanServiceImpl		humanService;

	@Autowired
	public SessionFactory			sessionFactory;

	@Autowired
	private EntityManagerFactory	entityManagerFactory;

	@Autowired
	private MessageSource			messageSource;
	@Value("${default.page.size}")
	private int						pageSize;


	@GetMapping(value = { "/" })
	public String getHomePage(Model model)
	{
		return findPaginated(1, model);
	}

	@GetMapping(value = { "/showaddhuman" })
	public ModelAndView showAddStudentPage(Model model)
	{
		ModelAndView mv = new ModelAndView();
		mv.addObject("human", new Human());
		mv.addObject("operation", "add");
		mv.setViewName("AddHuman");
		return mv;
	}
	@GetMapping(value = { "/studentList" })
	public ModelAndView studentList(Model model)
	{
		ModelAndView mv = new ModelAndView();
		mv.addObject("pageNo", "1");
		mv.addObject("recordsPerPage", "10");
		mv.addObject("orderBy", "0");
		mv.addObject("orderDirection", "1");
		mv.setViewName("studentList");
		return mv;
	}
	@RequestMapping("/ajaxStudentList")
	public ModelAndView ajaxStudentList(HttpServletRequest request, HttpServletResponse response, Model model)
	{
		System.out.println("ajax Call");
		List<Human> list = null;
		//sessionFactory = entityManagerFactory.unwrap(SessionFactory.class);
		Criteria criteria = sessionFactory.openSession().createCriteria(Human.class);
		/*
		System.out.println("===> " + request.getParameter("pageNo"));
		System.out.println("===> " + request.getParameter("recordsPerPage"));
		System.out.println("===> " + request.getParameter("orderBy"));
		System.out.println("===> " + request.getParameter("orderDirection"));
		*/
		ListNavigation listNavigation = new ListNavigation(Integer.parseInt(request.getParameter("pageNo")));
		listNavigation.setRecordsPerPage(Integer.parseInt(request.getParameter("recordsPerPage")));
		
		
		listNavigation.addNavigationCriteria(criteria);

		list = criteria.list();

		ModelAndView mv = new ModelAndView();
		mv.addObject("listHuman", list);
		mv.addObject("total_Req", humanService.countHuman());
		mv.setViewName("studentList_inner");
		return mv;
	}
	@RequestMapping(value = { "/downloadExcel" })
	public String downloadExcel(HttpServletRequest request, HttpServletResponse response)
	{
		String fileName = "Test";
		String filePath = "D:\\image\\";
		fileName = General.getNewFileName() + ".xlsx";
		try
		{
			ExcelReport excelReport = new ExcelReport(filePath, fileName);
			String path = excelReport.generate();
			General.getSavedUploadedFile(path, response, "AAA.xlsx");
		}
		catch (Exception e)
		{
			e.getStackTrace();
		}
		return "redirect:/";
	}

	@PostMapping(value = { "/addhuman" })
	public String addHuman(@ModelAttribute
	@Valid
	Human human, BindingResult bindingResult, RedirectAttributes redirectAttributes, HttpServletRequest req)
	{
		boolean success = false;
		String errMsg = "";
		String opeartion = req.getParameter("operation") == null ? "" : req.getParameter("operation");
		try
		{
			if (bindingResult.hasErrors())
			{
				return "AddHuman";
			}
			humanService.saveHuman(human);
			success = true;
		}
		catch (Exception ex)
		{
			errMsg = ex.getMessage();
			ex.printStackTrace();
		}
		if (success)
		{
			redirectAttributes.addFlashAttribute("successMsg", !opeartion.isEmpty() && opeartion.equalsIgnoreCase("add") ? messageSource.getMessage("msg_successfully_added", null, Locale.ENGLISH) : messageSource.getMessage("msg_successfully_update", null, Locale.ENGLISH));

		}
		else
		{
			redirectAttributes.addFlashAttribute("errMsg", errMsg.isEmpty() ? messageSource.getMessage("msg_error_occur", null, Locale.ENGLISH) : errMsg);
		}
		return "redirect:/";
	}

	@GetMapping(value = { "/deletehuman/{humanid}" })
	public String deleteHuman(@PathVariable(value = "humanid")
	long humanId, RedirectAttributes redirectAttributes)
	{
		boolean success = false;
		String errMsg = "";
		try
		{
			if (humanId != 0)
			{
				Human humanObj = humanService.getHumanById(humanId);
				if (humanObj != null)
				{
					humanService.deleteHuman(humanObj);
					success = true;
				}
				else
				{
					errMsg = messageSource.getMessage("msg_user_not_avaliable", null, Locale.ENGLISH);
				}
			}
			else
			{
				errMsg = messageSource.getMessage("msg_user_not_valid", null, Locale.ENGLISH);
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		if (success)
		{
			redirectAttributes.addFlashAttribute("successMsg", messageSource.getMessage("msg_successfully_deleted", null, Locale.ENGLISH));
		}
		else
		{
			redirectAttributes.addFlashAttribute("errMsg", errMsg.isEmpty() ? messageSource.getMessage("msg_error_occur", null, Locale.ENGLISH) : errMsg);
		}
		return "redirect:/";
	}

	@GetMapping(value = { "/updatehuman/{humanid}" })
	public ModelAndView updateHuman(@PathVariable(value = "humanid")
	long humanId, Model model)
	{
		boolean success = false;
		String errMsg = "";
		Human human = null;
		ModelAndView mv = new ModelAndView();

		try
		{
			if (humanId != 0)
			{
				human = humanService.getHumanById(humanId);
				if (human != null)
				{
					mv.addObject("human", human);
					success = true;
				}
				else
				{
					errMsg = messageSource.getMessage("msg_user_not_avaliable", null, Locale.ENGLISH);
				}
			}
			else
			{
				errMsg = messageSource.getMessage("msg_user_not_valid", null, Locale.ENGLISH);
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		if (!success)
		{
			model.addAttribute("errMsg", errMsg.isEmpty() ? messageSource.getMessage("msg_error_occur", null, Locale.ENGLISH) : errMsg);
		}
		mv.addObject("operation", "update");
		mv.setViewName("AddHuman");
		return mv;
	}

	@GetMapping(value = { "/page/{pageNo}" })
	public String findPaginated(@PathVariable(value = "pageNo")
	int pageNo, Model model)
	{
		try
		{
			Page<Human> page = humanService.getPaginateHumanData(pageNo, pageSize);
			List<Human> listHuman = page.hasContent() ? page.getContent() : null;
			model.addAttribute("currentPage", pageNo);
			model.addAttribute("totalPages", page.getTotalPages());
			model.addAttribute("totalItems", page.getTotalElements());
			model.addAttribute("listHuman", listHuman);
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}
		return "Home";
	}
}
