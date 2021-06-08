package com.example.myapp.common;

import java.io.FileInputStream;
import java.io.FileOutputStream;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public abstract class ReportBase
{
	protected String		fileName;
	protected String		filePath;

	/* WorkBook Object*/
	protected Workbook		workbook				= null;
	protected Sheet			sheet					= null;
	protected Row			row						= null;
	protected Cell			cell					= null;
	protected Font			valueFontBold			= null;
	protected CellStyle		captionCellStyle		= null;

	/* HSSFWorkBook Object*/
	protected HSSFWorkbook	hssfWorkbook			= null;
	protected HSSFSheet		hssfSheet				= null;
	protected HSSFRow		hssfRow					= null;
	protected HSSFCell		hssfCell				= null;
	protected HSSFFont		hssfValueFontBold		= null;
	protected HSSFCellStyle	hssfCaptionCellStyle	= null;

	/* XSSFWorkBook Object*/
	protected XSSFWorkbook	xssfWorkbook			= null;
	protected XSSFSheet		xssfSheet				= null;
	protected XSSFRow		xssfRow					= null;
	protected XSSFCell		xssfcell				= null;
	protected XSSFFont		xssfValueFontBold		= null;
	protected XSSFCellStyle	xssfCaptionCellStyle	= null;

	int						rowIndex				= 0;
	int						cur_row					= 0;

	FileOutputStream		fileOutputStream		= null;
	FileInputStream			fileInputStream			= null;
	
	public ReportBase(String filePath, String fileName)
	{
		this.fileName = fileName;
		this.filePath = filePath;
		rowIndex = 0;
	}
	
	public void writeExcelFilexlsx() throws Exception
	{
		fileOutputStream = new FileOutputStream(filePath + fileName);
		this.workbook.write(fileOutputStream);
		fileOutputStream.flush();
		fileOutputStream.close();
	}

	public void writeExcelFile() throws Exception
	{
		fileOutputStream = new FileOutputStream(filePath + fileName);
		String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
		if (ext.equals("xls"))
		{
			this.hssfWorkbook.write(fileOutputStream);
		}
		else
		{
			this.xssfWorkbook.write(fileOutputStream);
		}
		fileOutputStream.flush();
		fileOutputStream.close();
	}
	public boolean getExcelFileToRead(String sheetName) throws Exception
	{
		this.fileInputStream = new FileInputStream(filePath + fileName);
		this.workbook = new HSSFWorkbook(this.fileInputStream);
		this.sheet = this.workbook.getSheet(sheetName);
		this.row = this.sheet.getRow(this.cur_row);
		if (this.row != null)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	/*public void moveExcelFile() throws Exception
	{
	
		File file = null;
		this.fileOutputStream = null;
		file = new File(Path.TEMP_LOCAL_PATH + "\\" + fileName);
		if (file.exists())
			file.delete();
		file.createNewFile();
		fileOutputStream = new FileOutputStream(file);
		fileOutputStream.write(formFile.getFileData());
		fileOutputStream.close();
	}
	
	public String moveExcelFileToCustomPath(String Path) throws Exception
	{
		File files = new File(Path);
		if (!files.exists())
		{
			files.mkdirs();
		}
		String newFileName = General.getNewFileName() + formFile.getFileName();
	
		File file = null;
		this.fileOutputStream = null;
		file = new File(Path + newFileName);
		if (file.exists())
			file.delete();
		file.createNewFile();
		fileOutputStream = new FileOutputStream(file);
		fileOutputStream.write(formFile.getFileData());
		fileOutputStream.close();
	
		return newFileName;
	}*/

	public boolean nextRow()
	{
		boolean isNextRowExist = false;
		this.cur_row++;
		this.row = this.sheet.getRow(this.cur_row);
		if (this.row != null)
		{
			isNextRowExist = true;
		}
		return isNextRowExist;
	}

	public void clear()
	{
		if (this.fileInputStream != null)
		{
			try
			{
				this.fileInputStream.close();
			}
			catch (Exception e)
			{
				System.out.println("ReportBase :: closing File :: " + e.getMessage());
			}
			this.fileInputStream = null;
		}

		this.cell = null;
		this.row = null;
		this.sheet = null;
		this.workbook = null;
	}
}
