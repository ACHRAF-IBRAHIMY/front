package karazapps.karaz.ux.hub.dashboardsearch.process.GestionDashboardSearch.backejbs;
 
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import javax.ejb.Singleton;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext; 

import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.DataObjectServiceLocal;
import ma.ribatis.karaz.server.ManualActivitiesQNMap;
import ma.ribatis.karaz.server.process.parameters.ProcessConfigMap;

/**
 * Session Bean implementation class DemandeCongeLoader
 */
@Singleton
@Startup
@LocalBean

public class GestionDashboardSearchProcessBeanLoader  {  
	public DataObjectServiceLocal doService = (DataObjectServiceLocal) BackEndEJBContext.getDoService();
	@PersistenceContext(unitName="PESA")
	EntityManager em;
    
    
    @PostConstruct
    public void load() {
        	        	        	        
    ProcessConfigMap.getProcessus("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch", "karaz/ux/hub/dashboardsearch/process/GestionDashboardSearchProcess", "/", em);
	}
 
}
