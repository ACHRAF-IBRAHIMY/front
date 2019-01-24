package karazapps.karaz.ux.hub.dashboardsearch.process.GestionDashboardSearch.backejbs;

import java.util.Map;
import java.util.TreeMap;
import javax.ejb.EJB;
import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ma.ribatis.karaz.server.Activity; 
import ma.ribatis.karaz.server.DataObjectServiceLocal;
import ma.ribatis.karaz.server.XEndActivity;
import ma.ribatis.karaz.server.ManualActivity;
import ma.ribatis.karaz.server.ActivityMoment; 
import ma.ribatis.karaz.server.persistance.ActivityInstance;
import ma.ribatis.karaz.server.persistance.ProcessInstance; 
import ma.ribatis.karaz.server.ModelCache;


import ma.ribatis.karaz.activities.*;
import ma.ribatis.karaz.server.WebFacadeRemote.ViewDataDTO;
import karazapps.karaz.ux.hub.dashboardsearch.process.GestionDashboardSearch.impl.EndEventImpl;

/**
 * Session Bean implementation class EndEvent
 */
 
public class EndEvent extends XEndActivity   {
	public static final String activityAsInterface="EndEvent";
	 
	public DataObjectServiceLocal doService;
	 
	
	 
    /**
     * Default constructor. 
     */
    public EndEvent(DataObjectServiceLocal doService) {
    	super();  
    	this.doService=doService;
    	
    	
    }
    public static  EndEvent getInstance(DataObjectServiceLocal doService ) { 
			return new  EndEvent(doService); 
	}
	
	public static  EndEvent getInstance(DataObjectServiceLocal doService, Map<String, Activity> map) {
		 if(map.containsKey(activityAsInterface))
		 		return (EndEvent) map.get(activityAsInterface);
		 	else{
			EndEvent instance=new  EndEvent(doService);
			map.put(activityAsInterface, instance);
			 
		return instance;
		}
	}
	
	@Override
	public String getActivityName() { 
		return "EndEvent";
	}
	
		
	
		
	
	
	
	@Override
	public void closeActivity(ActivityInstance ai, boolean force)
			throws Exception {
		closeActivity(new EndEventImpl(ai, doService), force);
		
	}

	@Override
	public void startActivity(ActivityInstance ai, boolean enabled) throws Exception {
		startActivity(new EndEventImpl(ai, doService),   enabled );
		
	}

	@Override
	public StartResult start(ProcessInstance pi, ActivityInstance ai, boolean enabled) throws Exception { 
		if (ai==null)
			return start(new EndEventImpl(addActivityInstance(pi), doService),   enabled);
		else
			return start(new EndEventImpl(ai, doService),   enabled);
		
	}

	
}
