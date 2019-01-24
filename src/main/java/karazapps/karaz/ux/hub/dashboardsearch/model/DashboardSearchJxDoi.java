package karazapps.karaz.ux.hub.dashboardsearch.model;

import java.util.TreeMap;
import ma.ribatis.karaz.organization.AbstractKarazUser;
import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.persistance.DataObject;
import karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch;

public class DashboardSearchJxDoi {
	public DataObject doi; 
	public  DashboardSearch jx;
	public  DashboardSearchJxDoi(DataObject doi,  DashboardSearch jx) { 
		this.jx=jx;
		this.doi=doi;
	}
	public boolean save() {
		try {
			JXFactory.saveJXObject(jx, doi);
			BackEndEJBContext.getDoService().save(doi);
			return true;
		} catch ( Exception e) { 
			e.printStackTrace();
			return false;
		} 
	}
	
  public static  DashboardSearchJxDoi newInstance(   ) {  
		return  newInstance(new AbstractKarazUser.SystemKarazUser( ), true, null);  
	}
	public static  DashboardSearchJxDoi newInstance(String entity  ) {  
		return  newInstance(new AbstractKarazUser.SystemKarazUser(entity), true, null);  
	}
	public static  DashboardSearchJxDoi newInstance(AbstractKarazUser user  ) {  
		return  newInstance(user, true, null);  
	}
	public static  DashboardSearchJxDoi newInstance(AbstractKarazUser user, boolean saveIt ) {  
		return  newInstance(user, saveIt, null);  
	}
	public static  DashboardSearchJxDoi newInstance(AbstractKarazUser user, boolean saveIt, TreeMap<String, String> ctx) { 
		DataObject sdoi = BackEndEJBContext.getDoService().newInstance("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch", user, saveIt, ctx) ;
		DashboardSearch sjx = JXFactory.getJXObject(sdoi);
		return new  DashboardSearchJxDoi(sdoi, sjx);
	}
}
