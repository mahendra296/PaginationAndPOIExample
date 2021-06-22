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
	
}
