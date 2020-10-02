package karazapps.karaz.ux.hub.portailsearch.tools;


import java.io.Serializable;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.TreeMap;

import org.jdom2.Element;

import com.itextpdf.text.pdf.PdfReader;


import karazapps.backend.admin.domain.user.model.UserBrowser;
import karazapps.backend.admin.domain.user.model.UserJxDoi;

import ma.ribatis.karaz.organization.AbstractKarazUser;
import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.actions.KarazRemoteAction;
import ma.ribatis.karaz.util.BaseType;
import ma.ribatis.karaz.util.XmlHelper;

public class ReportTools implements Serializable{
	
	public static boolean isValidEmailAddress(String email) {
           String ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
           java.util.regex.Pattern p = java.util.regex.Pattern.compile(ePattern);
           java.util.regex.Matcher m = p.matcher(email);
           return m.matches();
    }
		public static Date DateSys(){
			Calendar calendar =  Calendar.getInstance();
			calendar.setTimeZone(TimeZone.getTimeZone("Africa/Casablanca"));
			calendar.setTime(new Date()); 
			 return calendar.getTime();
		}
	public String getDateArab(Date dt){
  String date="";
  if(dt!=null){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
  date= sdf.format(dt);
  }
  return date;
	}
	public static Date ShowDateFin(Date datedebut, double duree){
		Calendar dateFin =  Calendar.getInstance();
		 dateFin.setTime(datedebut);
		 dateFin.add(Calendar.DATE, (int) duree);
		 return dateFin.getTime();
	 }
	public static Date calculDureeByMonth(Date datedebut, double duree){
		Calendar dateFin =  Calendar.getInstance();
		 dateFin.setTime(datedebut);
		 dateFin.add(Calendar.MONTH, (int) duree);
		 return dateFin.getTime();
	 }
	
	
	public  static String getUserName(String owningSeq) {
		UserBrowser ubr=new UserBrowser(null);
		UserJxDoi u = ubr.loginEqual(owningSeq).first();
		if(u!=null){
			return u.jx.getName();
		}
		return null;
		
	}
	public static int nbrTrimistreEntreDate(Date date1,Date date2){
		if(date1==null || date2==null) return 1;
		long UNE_HEURE = 60 * 60 * 1000L;
	    long result = (((date2.getTime() - date1.getTime() + UNE_HEURE) / (UNE_HEURE * 24))/90)+1;
		return (int)result;
	}
	
	
	public static int nbrDayEntreDate(Date date1,Date date2){
		if(date1==null || date2==null) return 0;
	    long result = ((date2.getTime() - date1.getTime()) /(1000 * 60 * 60 * 24));
		return (int)result;
	}
	
	public static String fixdouble2(double d){
		NumberFormat formatter = new DecimalFormat("#0.00");
		return formatter.format(d);
	}
	public static int nbrDayEntreDate2(String sDate1,String sDate2) throws ParseException{
		Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(sDate1); 
		Date date2=new SimpleDateFormat("dd/MM/yyyy").parse(sDate2); 
		if(date1==null || date2==null) return 0;
	    long result = ((date2.getTime() - date1.getTime()) /(1000 * 60 * 60 * 24));
		return (int)result;
	}
	
	public String getLabeleOfDynamiqList(String SearchQN, String value) {
		   System.out.println("Get label of dynamic list");
		   String ret = "";
		   try {
		    String xmlLV = BackEndEJBContext.getLVLookUp().lookFor(SearchQN, new AbstractKarazUser.SystemKarazUser("/"), "all", new TreeMap<String, String>());
		    XmlHelper xh = new XmlHelper(xmlLV);

		    for (Element elem : xh.getElements("option")) {
		     if (formtStr(elem.getAttributeValue("value")).equalsIgnoreCase(formtStr(value))){
		      ret = elem.getAttributeValue("label");
		     }
		    }

		   } catch (Exception e) {
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		    ret = "";
		   }
		   return ret;
		  }
	
	public String formtStr(String s) {
		  if(s == null || s.trim().isEmpty()){
		   return ""; 
		  }
		  else {
		   return s.replace(" ", "").trim(); 
		  }
		 }
	public static DecimalFormat getSeparteurMill(){
		DecimalFormat dfm = new DecimalFormat("#,##0.00");
		  DecimalFormatSymbols s = dfm.getDecimalFormatSymbols();
		  s.setGroupingSeparator(' ');
		  dfm.setDecimalFormatSymbols(s);
		  return dfm;
		  
	}
	public String UppertoLower(String chaine){
		String[] sousChaines = chaine.split(" ");
        String nouveau="";
        for(int i = 0; i < sousChaines.length; i++)
        {
       	 String sousChaine= sousChaines[i].substring(0,1).toUpperCase()+ sousChaines[i].substring(1).toLowerCase();
       	 nouveau+=sousChaine+" ";	 
        }
		 return nouveau;
	}
	public  boolean   isArabicMot(String s){
		if(BaseType.isEmty(s)) return false;
		boolean done = false;
		try {
			String arabe="ابتثجحخدذرزسشصضطظغعغفقكلمنهويءأإآةؤئى";
			char[] ch = arabe.toCharArray();
			for(int i=0;i<ch.length;i++){
				if(s.contains(""+ch[i])){
					done=true;
					return done;
				}
					
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return done;
	}

	
}
