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
import ma.ribatis.karaz.server.XAutomaticActivity;
import ma.ribatis.karaz.server.ManualActivity;
import ma.ribatis.karaz.server.ActivityMoment; 
import ma.ribatis.karaz.server.persistance.ActivityInstance;
import ma.ribatis.karaz.server.persistance.ProcessInstance; 
import ma.ribatis.karaz.server.ModelCache;


import ma.ribatis.karaz.activities.*;
import ma.ribatis.karaz.server.WebFacadeRemote.ViewDataDTO;
import karazapps.karaz.ux.hub.dashboardsearch.process.GestionDashboardSearch.impl.ScriptTaskImpl;

/**
 * Session Bean implementation class ScriptTask
 */
 
public class ScriptTask extends XAutomaticActivity   {
	public static final String activityAsInterface="ScriptTask";
	 
	public DataObjectServiceLocal doService;
	 
	
	 
    /**
     * Default constructor. 
     */
    public ScriptTask(DataObjectServiceLocal doService) {
    	super();  
    	this.doService=doService;
    	
    	
    }
    public static  ScriptTask getInstance(DataObjectServiceLocal doService ) { 
			return new  ScriptTask(doService); 
	}
	
	public static  ScriptTask getInstance(DataObjectServiceLocal doService, Map<String, Activity> map) {
		 if(map.containsKey(activityAsInterface))
		 		return (ScriptTask) map.get(activityAsInterface);
		 	else{
			ScriptTask instance=new  ScriptTask(doService);
			map.put(activityAsInterface, instance);
	   		instance.outputTransition.put("EndEvent", EndEvent.getInstance(doService, map)); 
			 
		return instance;
		}
	}
	
	@Override
	public String getActivityName() { 
		return "ScriptTask";
	}
	
		
	
		
	
	
	
	@Override
	public void closeActivity(ActivityInstance ai, boolean force)
			throws Exception {
		closeActivity(new ScriptTaskImpl(ai, doService), force);
		
	}

	@Override
	public void startActivity(ActivityInstance ai, boolean enabled) throws Exception {
		startActivity(new ScriptTaskImpl(ai, doService),   enabled );
		
	}

	@Override
	public StartResult start(ProcessInstance pi, ActivityInstance ai, boolean enabled) throws Exception { 
		if (ai==null)
			return start(new ScriptTaskImpl(addActivityInstance(pi), doService),   enabled);
		else
			return start(new ScriptTaskImpl(ai, doService),   enabled);
		
	}

	
}
