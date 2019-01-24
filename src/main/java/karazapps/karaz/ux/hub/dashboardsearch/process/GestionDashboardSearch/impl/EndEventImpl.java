package karazapps.karaz.ux.hub.dashboardsearch.process.GestionDashboardSearch.impl; 

import ma.ribatis.karaz.activities.*;
import ma.ribatis.karaz.server.persistance.ActivityInstance;
import ma.ribatis.karaz.server.DataObjectService;
import ma.ribatis.karaz.server.DataObjectServiceLocal;
import ma.ribatis.karaz.server.ManualActivity;
import  karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch;
import  karazapps.karaz.ux.hub.dashboardsearch.model.JXFactory;
import karazapps.karaz.ux.hub.dashboardsearch.process.GestionDashboardSearch.backejbs.EndEventStub ;

public class EndEventImpl extends EndEventStub { 
	public EndEventImpl(ActivityInstance ai, DataObjectServiceLocal doService) { super(ai, doService); } 
	   
		 
 
				
	@Override
	public  void execute(DashboardSearch  jx) {
	}
		
		 
	
}
