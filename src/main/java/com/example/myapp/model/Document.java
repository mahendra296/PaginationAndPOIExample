package com.example.myapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

@Entity
public class Document
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long	documentID;
	private String	folderOrDocName;
	private long	parentDocumentID;
	private byte	isFolderOrDocument;
	private byte	deleted;
	private String	folderPath;
	private String	idPath;
	private long	mainDocumentID;
	
	public long getDocumentID()
	{
		return documentID;
	}
	public void setDocumentID(long documentID)
	{
		this.documentID = documentID;
	}
	public String getFolderOrDocName()
	{
		return folderOrDocName;
	}
	public void setFolderOrDocName(String folderOrDocName)
	{
		this.folderOrDocName = folderOrDocName;
	}
	public long getParentDocumentID()
	{
		return parentDocumentID;
	}
	public void setParentDocumentID(long parentDocumentID)
	{
		this.parentDocumentID = parentDocumentID;
	}
	public byte getIsFolderOrDocument()
	{
		return isFolderOrDocument;
	}
	public void setIsFolderOrDocument(byte isFolderOrDocument)
	{
		this.isFolderOrDocument = isFolderOrDocument;
	}
	public byte getDeleted()
	{
		return deleted;
	}
	public void setDeleted(byte deleted)
	{
		this.deleted = deleted;
	}
	public String getFolderPath()
	{
		return folderPath;
	}
	public void setFolderPath(String folderPath)
	{
		this.folderPath = folderPath;
	}
	public String getIdPath()
	{
		return idPath;
	}
	public void setIdPath(String idPath)
	{
		this.idPath = idPath;
	}
	public long getMainDocumentID()
	{
		return mainDocumentID;
	}
	public void setMainDocumentID(long mainDocumentID)
	{
		this.mainDocumentID = mainDocumentID;
	}
	
	
}
