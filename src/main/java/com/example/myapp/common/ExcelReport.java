package com.example.myapp.common;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelReport extends ReportBase
{

	public ExcelReport(String filePath, String fileName)
	{
		super(filePath, fileName);
	}

	public String generate()
	{
		rowIndex = 0;
		try
		{
			xssfWorkbook = new XSSFWorkbook();
			xssfSheet = xssfWorkbook.createSheet("TCCO Report");
			if (xssfSheet != null)
			{
				xssfRow = xssfSheet.createRow(rowIndex);
				if (xssfRow != null)
				{
					xssfcell = xssfRow.createCell(0);
					xssfcell.setCellValue("0");
					xssfcell = xssfRow.createCell(1);
					xssfcell.setCellValue("0.1");
				}
				rowIndex++;
				xssfRow = xssfSheet.createRow(rowIndex);
				if (xssfRow != null)
				{
					xssfcell = xssfRow.createCell(0);
					xssfcell.setCellValue("1");
				}
				rowIndex++;
				xssfRow = xssfSheet.createRow(rowIndex);
				if (xssfRow != null)
				{
					xssfcell = xssfRow.createCell(0);
					xssfcell.setCellValue("2");
				}
				rowIndex++;
			}
			writeExcelFile();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return filePath + fileName;
	}
}
