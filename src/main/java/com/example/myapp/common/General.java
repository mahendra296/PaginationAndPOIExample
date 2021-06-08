package com.example.myapp.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.nio.file.FileSystemNotFoundException;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class General
{
	public static NumberFormat		general_numberFormat									= NumberFormat.getNumberInstance();
	
	public synchronized static String getNewFileName()
	{
		String retValue = "";
		String currentTimeMillis = System.currentTimeMillis() + "";
		char[] strTemp = ("00000000000000000000").toCharArray();
		Date now = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		retValue += format.format(now);
		retValue += String.copyValueOf(strTemp, 0, strTemp.length - (currentTimeMillis.length()));
		retValue += currentTimeMillis;
		now = null;
		format = null;
		currentTimeMillis = null;
		try
		{
			Thread.sleep(2);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return retValue;
	}
	public static Method[] getSetterMethodArrayList(Class clazz, String[] setterMetodsName) throws NoSuchMethodException
	{
		int setterMetodsName_len = setterMetodsName.length;
		Method method[] = new Method[setterMetodsName_len];
		int i = 0;

		for (i = 0; i < setterMetodsName_len; i++)
		{
			method[i] = clazz.getMethod(setterMetodsName[i]);
		}

		return method;
	}

	public static Type[] getMethodType(Method method[], Type appendType)
	{
		int method_len = method.length;
		Type type[] = null;
		if (appendType != null)
		{
			type = new Type[method_len + 1];
		}
		else
		{
			type = new Type[method_len];
		}

		try
		{
			int i;
			for (i = 0; i < method_len; i++)
			{
				type[i] = method[i].getReturnType();
			}
			if (appendType != null)
			{
				type[i] = appendType;
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			type = null;
		}
		return type;
	}

	public static String firstCap(String data)
	{
		int len = data.length();
		if (len > 0)
		{
			if (len == 1)
			{
				data = data.toUpperCase();
			}
			else
			{
				data = data.substring(0, 1).toUpperCase() + data.substring(1, len);
			}
		}

		return data;
	}

	public static boolean isExistValue(int[] data, int[] value)
	{
		boolean result = false;
		if (data != null && value != null)
		{
			int data_len = data.length;
			int value_len = value.length;
			int j = 0;
			for (int i = 0; i < data_len; i++)
			{
				for (j = 0; j < value_len; j++)
				{
					if (data[i] == value[j])
					{
						result = true;
						data_len = data_len + 1;
						break;
					}
				}
			}
		}
		return result;
	}
	public static int[] parseIntArray(String st[])
	{
		if (st != null)
		{
			int outarray[] = new int[st.length];

			for (int i = 0; i < st.length; i++)
			{
				try
				{
					outarray[i] = Integer.parseInt(st[i]);
				}
				catch (Exception e)
				{
					outarray[i] = 0;
				}
			}
			return outarray;
		}
		else
		{
			return null;
		}
	}

	public static String[] stringArray(long st[])
	{
		if (st != null)
		{
			String outarray[] = new String[st.length];

			for (int i = 0; i < st.length; i++)
			{
				try
				{
					outarray[i] = st[i] + "";
				}
				catch (Exception e)
				{
					outarray[i] = "";
				}
			}
			return outarray;
		}
		else
		{
			return null;
		}
	}

	public static String getSeperatedBy(String st[], String midseperator)
	{
		String data = "";
		if (st != null)
		{
			int len = st.length;
			int i = 0;
			for (; i < len; i++)
			{
				try
				{
					if (st[i] != null)
					{
						data += st[i];
						i++;
						break;
					}
				}
				catch (Exception e)
				{}
			}
			for (; i < len; i++)
			{
				try
				{
					if (st[i] != null)
						data += midseperator + st[i];
				}
				catch (Exception e)
				{}
			}
			return data;
		}
		else
		{
			return null;
		}
	}

	public static String getSeperatedByWithDoubleQuote(String st[], String midseperator)
	{
		String data = "";
		if (st != null)
		{
			int len = st.length;
			int i = 0;
			for (; i < len; i++)
			{
				try
				{
					if (st[i] != null)
					{
						data += "\"" + (st[i]).replaceAll("\"", "\\\\\"") + "\"";
						i++;
						break;
					}
				}
				catch (Exception e)
				{}
			}
			for (; i < len; i++)
			{
				try
				{
					if (st[i] != null)
						data += midseperator + "\"" + (st[i]).replaceAll("\"", "\\\\\"") + "\"";
				}
				catch (Exception e)
				{}
			}
			return data;
		}
		else
		{
			return null;
		}
	}

	public static String getSeperatedByWithExtraSpace(String st[], String midseperator)
	{
		String data = "";
		if (st != null)
		{
			int len = st.length;
			int i = 0;
			for (; i < len; i++)
			{
				try
				{
					if (st[i] != null)
					{
						data += st[i];
						i++;
						break;
					}
				}
				catch (Exception e)
				{}
			}
			for (; i < len; i++)
			{
				try
				{
					if (st[i] != null)
						data += midseperator + " " + st[i];
				}
				catch (Exception e)
				{}
			}
			return data;
		}
		else
		{
			return null;
		}
	}

	public static void nullStringArray(String arr[])
	{
		if (arr != null)
		{
			for (int i = 0; i < arr.length; i++)
				arr[i] = null;
		}
		arr = null;
	}

	public static void nullStringArray(String arr[][])
	{
		if (arr != null)
		{
			for (int i = 0; i < arr.length; i++)
			{
				if (arr[i] != null)
				{
					nullStringArray(arr[i]);
				}
			}
		}
		arr = null;
	}
	public static String getCookie(String cookieName, HttpServletRequest request)
	{
		String cookie_value = null;
		Cookie arr[] = request.getCookies();
		if (arr != null)
		{
			for (int i = 0; i < arr.length; i++)
			{
				if (arr[i] != null && arr[i].getName().trim().equals(cookieName))
				{
					{
						cookie_value = arr[i].getValue().trim();
						break;
					}
				}
				else
				{}
			}
		}
		return cookie_value;
	}
	public static void setCookie(String cookieName, String cookieValue, HttpServletResponse response)
	{
		Cookie cookie = new Cookie(cookieName, cookieValue);
		cookie.setMaxAge(86400);
		cookie.setPath("/");
		//		cookie.setSecure(true); pl do not open this comment
		cookie.setHttpOnly(true);
		response.addCookie(cookie);
	}

	public static String chkHTMLStr(String str)
	{
		String str1 = "";
		if (str == null)
			return str1;

		for (int i = 0; i < str.length(); i++)
		{
			switch (str.charAt(i))
			{
				case '"':
					str1 += "&quot;";
					break;
				case '<':
					str1 += "&lt;";
					break;
				case '>':
					str1 += "&gt;";
					break;
				case '\t':
					str1 += "&nbsp;&nbsp;&nbsp;";
					break;
				default:
					str1 += str.charAt(i);
					break;
			}
		}
		return str1;
	}
	public static String replaceSpaceInURL(String str)
	{
		str = str.trim();

		// Replace All space (unicode is \\s) to %20 
		str = str.replaceAll("\\s", "%20");
		return str;
	}
	public static String chkHTMLStrWithRemoveNewLine(String str)
	{
		String str1 = "";
		if (str == null)
			return str1;
		else
			str = removeCarriageReturnWithBlank(str);

		for (int i = 0; i < str.length(); i++)
		{
			switch (str.charAt(i))
			{
				case '"':
					str1 += "&quot;";
					break;
				case '<':
					str1 += "&lt;";
					break;
				case '>':
					str1 += "&gt;";
					break;
				case '\t':
					str1 += "&nbsp;&nbsp;&nbsp;";
					break;
				default:
					str1 += str.charAt(i);
					break;
			}
		}
		return str1;
	}
	public static String chkHTMLStrWithReplaceBR(String str)
	{
		String str1 = "";
		if (str == null)
			return str1;
		else
			str = replaceBRWithCarriageReturn(str);

		for (int i = 0; i < str.length(); i++)
		{
			switch (str.charAt(i))
			{
				case '"':
					str1 += "&quot;";
					break;
				case '<':
					str1 += "&lt;";
					break;
				case '>':
					str1 += "&gt;";
					break;
				case '\t':
					str1 += "&nbsp;&nbsp;&nbsp;";
					break;
				default:
					str1 += str.charAt(i);
					break;
			}
		}
		return str1;
	}

	public static String chkXMLStr(String str)
	{
		String str1 = "";
		if (str == null)
			return str1;

		str1 = str.replaceAll("&", "&amp;");
		str1 = str1.replaceAll("<", "&lt;");
		str1 = str1.replaceAll(">", "&gt;");
		// str = str.replaceAll("\\", "\\\\");
		str1 = str1.replaceAll("\"", "&quot;");
		str1 = str1.replaceAll("'", "&apos;");

		return str1;
	}

	public static String chkJScriptAssignment(String str)
	{
		return chkJScriptAssignment(str, false);
	}

	public static String chkJScriptAssignment(String str, boolean needToChkHTMLStr)
	{
		if (str == null)
		{
			return "null";
		}
		else
		{
			if (needToChkHTMLStr)
				str = chkHTMLStr(str);

		}
		return "\"" + str.replaceAll("\\\\", "\\\\\\\\").replaceAll("\"", "\\\\\"").replaceAll("\r\n", "\\\\n").replaceAll("\n", "\\\\n") + "\"";
	}
	public static String chkJScript(String str, boolean needToChkHTMLStr)
	{
		if (str == null)
		{
			return "null";
		}
		else
		{
			if (needToChkHTMLStr)
				str = chkHTMLStr(str);
		}
		return "'" + str.replaceAll("\\\\", "\\\\\\\\").replaceAll("'", "\\\\'").replaceAll("\r\n", "\\\\n").replaceAll("\n", "\\\\n").replaceAll("\"", "\\\\\"") + "'";
	}

	public static String chkJScriptAssignment(int str)
	{
		return str + "";
	}

	public static String chkJScriptAssignmentSingQuotes(int str)
	{

		return str + "";
	}

	public static String removeCarriageReturn(String str)
	{// Cinni - to remove
	     // extra break and
	 // paragraph

		if (str != null)
		{
			str = str.replaceAll("<P>", "");
			str = str.replaceAll("</P>", "");
			str = str.replaceAll("\r\n", "<br>");
			str = str.replaceAll("\n", "<br>");
			str = str.trim();
		}
		return str;
	}
	public static String removeHTMLTagFromString(String str)
	{// Rushi - to remove
	     // extra HTMLTag and
	 // paragraph
		if (str != null)
		{

			str = str.replaceAll("</div>", " ");
			str = str.replaceAll("<br>", " ");
			str = str.replaceAll("<BR>", " ");
			str = str.replaceAll("\r\n", "");
			str = str.replaceAll("\n", "");
			str = str.replaceAll("\\<.*?\\>", "");

		}
		return str;
	}
	public static String removeCarriageReturnWithBlank(String str)
	{
		if (str != null)
		{
			str = str.replaceAll("<P>", "");
			str = str.replaceAll("</P>", "");
			str = str.replaceAll("\r\n", "");
			str = str.replaceAll("\n", "");
			str = str.replaceAll("<br>", " ");
			str = str.replaceAll("<BR>", " ");
			str = str.trim();
		}
		return str;
	}
	public static String replaceBRWithCarriageReturn(String str)
	{
		if (str != null)
		{
			str = str.replaceAll("<P>", "");
			str = str.replaceAll("</P>", "");
			str = str.replaceAll("<br>", "\n");
			str = str.replaceAll("<BR>", "\n");
			str = str.trim();
		}
		return str;
	}
	public static String removeSingleQuoteWithBlank(String str)
	{
		if (str != null)
		{
			str = str.replaceAll("<P>", "");
			str = str.replaceAll("</P>", "");
			str = str.replaceAll("\r\n", "");
			str = str.replaceAll("\n", "");
			str = str.replaceAll("'", "");
			str = str.trim();
		}
		return str;
	}
	public static String removeCarriageReturnBlank(String str)
	{
		if (str != null)
		{
			str = str.replaceAll("<P>", "");
			str = str.replaceAll("</P>", "");
			str = str.replaceAll("\r\n", "<br>");
			str = str.replaceAll("\n", "<br>");
			str = str.replaceAll("'", "");
			str = str.trim();
		}
		return str;
	}
	public static String chkAssignInSingleQuoteRemoveDoubleQtoHTML(String str)
	{
		String str1 = "";
		if (str == null)
			return str1;
		for (int i = 0; i < str.length(); i++)
		{
			switch (str.charAt(i))
			{
				case '"':
					str1 += "&quot;";
					break;
				case '\'':
					str1 += "\\\\\\'";
					break;
				case '\\':
					str1 += "\\\\";
					break;
				default:
					str1 += str.charAt(i);
					break;
			}
		}
		return "'" + str1 + "'";
	}

	public static String chkSingleAndDoubleQuotes(String str)
	{
		String str1 = "";
		if (str == null)
			return str1;
		for (int i = 0; i < str.length(); i++)
		{
			switch (str.charAt(i))
			{
				case '"':
					str1 += "&quot;";
					break;
				case '\'':
					str1 += "\\'";
					break;
				case '\\':
					str1 += "\\\\";
					break;
				default:
					str1 += str.charAt(i);
					break;
			}
		}
		return str1;
	}
	public static String chkSingleAndDoubleQuotesNoLineBreak(String str)
	{
		String str1 = "";
		if (str == null)
			return str1;
		for (int i = 0; i < str.length(); i++)
		{
			switch (str.charAt(i))
			{
				case '"':
					str1 += "&quot;";
					break;
				case '\'':
					str1 += "\\'";
					break;
				case '\\':
					str1 += "\\\\";
					break;
				case '\r':
					str1 += "";
					break;
				case '\n':
					str1 += "\\n";
					break;
				default:
					str1 += str.charAt(i);
					break;
			}
		}
		return str1;
	}
	public static String removeNumberFormat(String number, int format)
	{
		if (number != null)
		{
			switch (format)
			{
				case 1:
					if (number.indexOf(",") != -1)
					{
						number = number.replaceAll(",", "");
					}
					break;
				case 2:
					if (number.indexOf(".") != -1)
					{
						number = number.replaceAll("[.]", "");
					}

					if (number.indexOf(",") != -1)
					{
						number = number.replaceAll(",", ".");
					}

					break;
			}
		}
		return number;
	}
	public static boolean isNumber(String num)
	{
		boolean flag = true;
		try
		{
			Double.parseDouble(num);
		}
		catch (Exception e)
		{
			flag = false;
		}
		return flag;
	}

	public static String getUTCDATE(Date date)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern("dd MMM yyyy");
		return simpleDateFormat.format(date);
	}

	public static String getFormatedDateddMMyyyy(Date date)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern("ddMMyyyy");
		return simpleDateFormat.format(date);
	}

	public static String getFormatedDate(Date date)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern("MM/dd/yyyy");
		return simpleDateFormat.format(date);
	}

	public static String getFormatedDateMMMDDYYYY(String strDate)
	{
		Date date = new Date(strDate);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern("MMM dd, yyyy");
		return simpleDateFormat.format(date);
	}

	public static String getFormatedDateMMMDD_YYYY(String strDate)
	{
		Date date = new Date(strDate);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern("MMM dd, yyyy");
		return simpleDateFormat.format(date);
	}

	public static String getFormatedDateMMMDDYYYY(Date date)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern("MMM dd, yyyy");
		return simpleDateFormat.format(date);
	}

	public static String getFormatedDateMMMDD_YYYY(Date date)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern("MMM dd, yyyy");
		return simpleDateFormat.format(date);
	}

	public static String getFormatedTime(Date date)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat();
		simpleDateFormat.applyPattern("HH:mm:ss");
		return simpleDateFormat.format(date.getTime());
	}
	public static String getFormatUS(int maxPrecision)
	{
		String USFormat = "#,##";
		if (maxPrecision == 0)
			return USFormat;
		else
		{
			USFormat += "0.";
			for (int i = 0; i < maxPrecision; i++)
			{
				USFormat += "0";
			}
			return USFormat;
		}
	}

	public static String getFormatUSForPercentage(int maxPrecision)
	{
		String USFormat = "0,00%";
		if (maxPrecision == 0)
			return USFormat;
		else
		{
			USFormat += "0.";
			for (int i = 0; i < maxPrecision; i++)
			{
				USFormat += "0";
			}
			return USFormat;
		}
	}
	public static double trunc(double givenValue, short precision)
	{
		// /*
		String givenValueST = general_numberFormat.format(givenValue) + "0000000000000000000000000000000000000000";
		int point = givenValueST.indexOf(".");
		if (point >= 0)
		{
			givenValueST = givenValueST.substring(0, point) + givenValueST.substring(point, point + precision + 1);
			double d = Double.parseDouble(givenValueST);
			return d;
		}
		else
			return givenValue;
		// */
		/*
		 * long pre; long post; double powerValue; //if (precision ==
		 * null){precision=9 ;} powerValue = Math.pow(10, (double) precision);
		 * pre = (long) givenValue; post = (long) ((givenValue - pre +
		 * General.tolerance1) * powerValue); return pre + (post / powerValue);
		 */
	}

	public static String truncWithRemoveExponential(double givenValue, short precision)
	{
		// /*
		String givenValueST = general_numberFormat.format(givenValue) + "0000000000000000000000000000000000000000";
		int point = givenValueST.indexOf(".");
		if (point >= 0)
		{
			givenValueST = givenValueST.substring(0, point) + givenValueST.substring(point, point + precision + 1);
			double d = Double.parseDouble(givenValueST);
			givenValue = d;
		}

		return BigDecimal.valueOf(givenValue).toPlainString();
	}

	public static String removeExponential(double givenValue)
	{
		return BigDecimal.valueOf(givenValue).toPlainString();
	}
	public static void getSavedUploadedFile(String path, HttpServletResponse response, String userFileName)
	{
		try
		{
			PrintWriter printWriter;
			File file;
			printWriter = response.getWriter();
			file = new File(path);
			if (file.exists())
			{
				response.setContentType("application/x-download");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + (new String(userFileName.getBytes(), "UTF-8")) + "\"");

				FileInputStream is = new FileInputStream(file);
				int oneChar = 0;
				while ((oneChar = is.read()) != -1)
				{
					printWriter.write(oneChar);
				}
				printWriter.flush();
				printWriter.close();
				is.close();
			}
			else
			{
				//error file not found
				throw new Exception("file not found at " + path);
			}
		}
		catch (FileSystemNotFoundException fnf)
		{
			fnf.printStackTrace();
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
	}
	
}
