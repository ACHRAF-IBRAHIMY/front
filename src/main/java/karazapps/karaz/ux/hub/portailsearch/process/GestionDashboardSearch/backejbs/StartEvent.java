package karazapps.karaz.ux.hub.portailsearch.process.GestionDashboardSearch.backejbs;

import java.util.Map;
import java.util.TreeMap;
import javax.ejb.EJB;
import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ma.ribatis.karaz.server.Activity; 
import ma.ribatis.karaz.server.DataObjectServiceLocal;
import ma.ribatis.karaz.server.XStartActivity;
import ma.ribatis.karaz.server.ManualActivity;
import ma.ribatis.karaz.server.ActivityMoment; 
import ma.ribatis.karaz.server.persistance.ActivityInstance;
import ma.ribatis.karaz.server.persistance.ProcessInstance; 
import ma.ribatis.karaz.server.ModelCache;


import ma.ribatis.karaz.activities.*;
import ma.ribatis.karaz.server.WebFacadeRemote.ViewDataDTO;
import karazapps.karaz.ux.hub.portailsearch.process.GestionDashboardSearch.impl.StartEventImpl;

/**
 * Session Bean implementation class StartEvent
 */
 
public class StartEvent extends XStartActivity   {
	public static final String activityAsInterface="StartEvent";
	 
	public DataObjectServiceLocal doService;
	 
	
	 
    /**
     * Default constructor. 
     */
    public StartEvent(DataObjectServiceLocal doService) {
    	super();  
    	this.doService=doService;
    	
    	
    }
    public static  StartEvent getInstance(DataObjectServiceLocal doService ) { 
			return new  StartEvent(doService); 
	}
	
	public static  StartEvent getInstance(DataObjectServiceLocal doService, Map<String, Activity> map) {
		 if(map.containsKey(activityAsInterface))
		 		return (StartEvent) map.get(activityAsInterface);
		 	else{
			StartEvent instance=new  StartEvent(doService);
			map.put(activityAsInterface, instance);
	   		instance.outputTransition.put("ScriptTask", ScriptTask.getInstance(doService, map)); 
			 
		return instance;
		}
	}
	
	@Override
	public String getActivityName() { 
		return "StartEvent";
	}
	
		
	
		
	
	
	
	@Override
	public void closeActivity(ActivityInstance ai, boolean force)
			throws Exception {
		closeActivity(new StartEventImpl(ai, doService), force);
		
	}

	@Override
	public void startActivity(ActivityInstance ai, boolean enabled) throws Exception {
		startActivity(new StartEventImpl(ai, doService),   enabled );
		
	}

	@Override
	public StartResult start(ProcessInstance pi, ActivityInstance ai, boolean enabled) throws Exception { 
		if (ai==null)
			return start(new StartEventImpl(addActivityInstance(pi), doService),   enabled);
		else
			return start(new StartEventImpl(ai, doService),   enabled);
		
	}

	
}
