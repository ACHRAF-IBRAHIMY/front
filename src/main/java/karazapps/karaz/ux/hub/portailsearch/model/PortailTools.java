package karazapps.karaz.ux.hub.portailsearch.model;

import java.util.ArrayList;
import java.util.TreeMap;

import org.apache.log4j.Logger;

import ma.ribatis.karaz.organization.AbstractKarazUser;
import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.KarazQuery;
import ma.ribatis.karaz.util.BaseType;

public class PortailTools {
	 Logger logger = Logger.getLogger(PortailTools.class);
	public ArrayList<TreeMap<String, String>> getGeniricIndexFromSearch(String resourceQN, String xmlQuery, int ofsset, int limit,String entity) {
		
		ArrayList<TreeMap<String, String>> ret=new ArrayList<TreeMap<String, String>> ();
		try {
			if(BaseType.isEmty(entity)){
				entity="/";
			}
			
			AbstractKarazUser user = new AbstractKarazUser.SystemKarazUser(entity);
			   
			TreeMap<String, String> ctxp=new TreeMap<String, String>();
			TreeMap<String, Object> rs = BackEndEJBContext.getKarazQuery(resourceQN).runQuery(xmlQuery, ofsset, limit, user, ctxp);
			logger.debug("Strat getIdsFromSearch !"+rs.keySet()+" resvalue.."+rs.values());

			ArrayList<TreeMap<String, String>>  aliste =(ArrayList<TreeMap<String, String>>) rs.get(KarazQuery.Result);
			if(aliste ==null || aliste.size()==0){
				return ret; 
			}
			
//			for(TreeMap<String, String> art:aliste){
//				ret.put(BaseType.parseLong(art.get("id")),art);
//			}
			System.out.println("getArticleTaxe size ==> "+aliste.size());
			return aliste;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ret;
	}
	public TreeMap<String, Object>  executeSearch(String resourceQN,String xmlQuery, AbstractKarazUser user, int ofsset, int limit) {
		
		TreeMap<String, Object>  ret=new TreeMap<String, Object> ();
		try {
			
			   
			TreeMap<String, String> ctxp=new TreeMap<String, String>();
			TreeMap<String, Object> rs = BackEndEJBContext.getKarazQuery(resourceQN).runQuery(xmlQuery, ofsset, limit, user, ctxp);
			logger.debug("Strat getIdsFromSearch !"+rs.keySet()+" resvalue.."+rs.values());
			return rs;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ret;
	}
public ArrayList<TreeMap<String, String>> executeSearch(String resourceQN, String xmlQuery, int ofsset, int limit) {
		
		ArrayList<TreeMap<String, String>> ret=new ArrayList<TreeMap<String, String>> ();
		try {
			AbstractKarazUser user = new AbstractKarazUser.SystemKarazUser("/");
//			user.getProfiles().add("ADMINISTRATEUR")  ; 
//			user.getProfiles().add("admin@karaz")  ;
//			user.setUserQN("admin@karaz");
			TreeMap<String, String> ctxp=new TreeMap<String, String>();
			TreeMap<String, Object> rs = BackEndEJBContext.getKarazQuery(resourceQN).runQuery(xmlQuery, ofsset, limit, user, ctxp);
			logger.debug("Strat getIdsFromSearch !"+rs.keySet()+" resvalue.."+rs.values());

			ArrayList<TreeMap<String, String>>  aliste =(ArrayList<TreeMap<String, String>>) rs.get(KarazQuery.Result);
			if(aliste ==null || aliste.size()==0){
				return ret; 
			}
			
//			for(TreeMap<String, String> art:aliste){
//				ret.put(BaseType.parseLong(art.get("id")),art);
//			}
			System.out.println("getArticleTaxe size ==> "+aliste.size());
			return aliste;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ret;
	}

}
