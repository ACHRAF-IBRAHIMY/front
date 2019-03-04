package karazapps.karaz.ux.hub.portailsearch.model;

import java.util.TreeMap;
import ma.ribatis.karaz.organization.AbstractKarazUser;
import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.persistance.DataObject;
import karazapps.karaz.ux.hub.portailsearch.model.PortailSearch;

public class PortailSearchJxDoi {
	public DataObject doi; 
	public  PortailSearch jx;
	public  PortailSearchJxDoi(DataObject doi,  PortailSearch jx) { 
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
	
  public static  PortailSearchJxDoi newInstance(   ) {  
		return  newInstance(new AbstractKarazUser.SystemKarazUser( ), true, null);  
	}
	public static  PortailSearchJxDoi newInstance(String entity  ) {  
		return  newInstance(new AbstractKarazUser.SystemKarazUser(entity), true, null);  
	}
	public static  PortailSearchJxDoi newInstance(AbstractKarazUser user  ) {  
		return  newInstance(user, true, null);  
	}
	public static  PortailSearchJxDoi newInstance(AbstractKarazUser user, boolean saveIt ) {  
		return  newInstance(user, saveIt, null);  
	}
	public static  PortailSearchJxDoi newInstance(AbstractKarazUser user, boolean saveIt, TreeMap<String, String> ctx) { 
		DataObject sdoi = BackEndEJBContext.getDoService().newInstance("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch", user, saveIt, ctx) ;
		PortailSearch sjx = JXFactory.getJXObject(sdoi);
		return new  PortailSearchJxDoi(sdoi, sjx);
	}
}
