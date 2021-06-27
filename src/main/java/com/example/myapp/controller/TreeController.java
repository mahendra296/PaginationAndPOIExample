package com.example.myapp.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
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
import com.example.myapp.common.Path;
import com.example.myapp.model.Document;
import com.example.myapp.model.Human;
import com.example.myapp.serviceImpl.DocumentServiceImpl;
import com.example.myapp.serviceImpl.HumanServiceImpl;

@Controller
public class TreeController
{
	@Autowired
	private DocumentServiceImpl		documentService;
	
	@GetMapping(value = { "/tree" })
	public ModelAndView studentList(Model model)
	{
		Document document = null;
		StringBuffer jScript = new StringBuffer();
		ModelAndView mv = new ModelAndView();
		List<Document> documentList = documentService.getAllDocument();
		if (documentList != null && documentList.size() > 0)
		{
			jScript.append("<script type=\"text/javascript\">");
			for (int i = 0; i < documentList.size(); i++)
			{
				document = new Document();
				document = documentList.get(i);
				jScript.append("document_Tree.add('" + document.getDocumentID() + "','" + document.getParentDocumentID() + "'," + General.chkJScriptAssignment(document.getFolderOrDocName()) + "," + General.chkJScriptAssignment("#" + document.getIsFolderOrDocument()) +","+ General.chkJScriptAssignment(document.getFolderOrDocName()) + ");\n");
			}
			jScript.append("</script>");
		}
		mv.addObject("jScript", jScript.toString());
		mv.setViewName("documentTree");
		return mv;
	}
	
	@PostMapping(value = { "/saveDocument" })
	public void addDocument(@ModelAttribute Document document, HttpServletRequest request, HttpServletResponse response)
	{
		int errorCount = 0;
		PrintWriter out = null;
		StringBuffer jScript = new StringBuffer();
		try
		{
			File documnetFolderFile = new File(Path.PHYSICAL_DOCUMENT_PATH + "\\" + document.getFolderOrDocName());
			//document.setFolderPath(document.getFolderOrDocName());
			document.setIsFolderOrDocument((byte)0);
			if (!documnetFolderFile.exists())
			{
				if (documnetFolderFile.mkdir())
				{
					System.out.println("Directory is created!");
				}
				else
				{
					System.out.println("error:   Failed to create document folder directory!");
					errorCount = 1;
					//generate error
				}
			}
			else
			{
				System.out.println("error:  document folder already exist!");
				errorCount = 2;
				//generate error
			}
			if (errorCount == 0)
			{
				Document documentRes = documentService.saveDocument(document);
				//documentRes.setIdPath(documentRes.getDocumentID()+"");
				//documentRes = documentService.saveDocument(documentRes);
				jScript.append("document_Tree.add('" + documentRes.getDocumentID() + "','0'," + General.chkJScriptAssignment(documentRes.getFolderOrDocName()) + ",null,'title','" + "img/openFolder.png');");
			}
			response.setContentType("text/html");
			response.setCharacterEncoding("utf-8");
			try
			{
				out = response.getWriter();
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
			out.print(errorCount+"<sep>"+jScript.toString());
		}
		catch (Exception ex)
		{
			
			ex.printStackTrace();
		}
	}
	@PostMapping(value = { "/saveSubDocument" })
	public void addSubDocument(@ModelAttribute Document document, HttpServletRequest request, HttpServletResponse response)
	{
		int errorCount = 0;
		PrintWriter out = null;
		StringBuffer jScript = new StringBuffer();
		Document document_temp = null;
		File documnetFolder = null;
		String folderPath = "";
		String idPath = "";
		try
		{
			document_temp = documentService.getDocumentById(document.getDocumentID());

			if (document_temp.getFolderPath() != null && !document_temp.getFolderPath().trim().equals(""))
			{
				documnetFolder = new File(Path.PHYSICAL_DOCUMENT_PATH + "\\" +  document_temp.getFolderPath() + "\\" + document.getFolderOrDocName());
				folderPath = document_temp.getFolderPath() + "\\" + document.getFolderOrDocName();
				idPath = document_temp.getIdPath();
			}
			else
			{
				documnetFolder = new File(Path.PHYSICAL_DOCUMENT_PATH + "\\" + document_temp.getFolderOrDocName() + "\\" + document.getFolderOrDocName());
				folderPath = document_temp.getFolderOrDocName() + "\\" + document.getFolderOrDocName();
				idPath = "";
			}
			document.setFolderPath(folderPath);
			document.setDocumentID(0);
			document.setParentDocumentID(document_temp.getDocumentID());
			document.setIsFolderOrDocument((byte)0);
			if(document_temp.getMainDocumentID() == 0)
			{	
				document.setMainDocumentID(document_temp.getDocumentID());
			}
			else
			{
				document.setMainDocumentID(document_temp.getMainDocumentID());
			}
			if (!documnetFolder.exists())
			{
				if (documnetFolder.mkdir())
				{
					System.out.println("Directory is created!");
				}
				else
				{
					System.out.println("error:   Failed to create document folder directory!");
					errorCount = 1;
					//generate error
				}
			}
			else
			{
				System.out.println("error:  document folder already exist!");
				errorCount = 2;
				//generate error
			}
			if (errorCount == 0)
			{
				Document documentRes = documentService.saveDocument(document);
				jScript.append("document_Tree.add('" + documentRes.getDocumentID() + "','"+documentRes.getParentDocumentID()+"'," + General.chkJScriptAssignment(documentRes.getFolderOrDocName()) + ",null,'title','" + "img/openFolder.png');");
			}
			response.setContentType("text/html");
			response.setCharacterEncoding("utf-8");
			try
			{
				out = response.getWriter();
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
			out.print(errorCount+"<sep>"+jScript.toString());
		}
		catch (Exception ex)
		{
			
			ex.printStackTrace();
		}
	}
}
