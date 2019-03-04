package karazapps.karaz.ux.hub.portailsearch.process.GestionDashboardSearch.backejbs;
 
import javax.ejb.EJB;
import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ma.ribatis.karaz.server.Activity;
import ma.ribatis.karaz.server.DataObjectServiceLocal;
import ma.ribatis.karaz.server.Process;
import ma.ribatis.karaz.server.XProcess; 

/**
 * Session Bean implementation class 
 */
 
@Stateless(name="karaz/ux/hub/portailsearch/process/GestionDashboardSearchProcess",  mappedName="karaz/ux/hub/portailsearch/process/GestionDashboardSearchProcess")
@Remote
@TransactionManagement(TransactionManagementType.BEAN)
public class GestionDashboardSearchProcessBean extends XProcess implements Process {  
	  
	
	 
	public GestionDashboardSearchProcessBean () { 
	super();
			getDOService(); 
	//	getActivities().put("StartEvent" , StartEvent.getInstance(doService) );  
		 StartEvent.getInstance(doService, getActivities()) 	 ;   	 
	//	getActivities().put("EndEvent" , EndEvent.getInstance(doService) );  
		 EndEvent.getInstance(doService, getActivities()) 	 ;   	 
	//	getActivities().put("ScriptTask" , ScriptTask.getInstance(doService) );  
		 ScriptTask.getInstance(doService, getActivities()) 	 ;   	 
	}
	  
	
	@PersistenceContext(unitName="PESA")
	void setEntityManager (EntityManager entityManager) {  
		em=entityManager;
	}
    
    
	@Override
	public String getName() { 
		return "GestionDashboardSearchProcess";
	}  

	@Override
	public String getProcessQN() { 
		return "karaz/ux/hub/portailsearch/process/GestionDashboardSearchProcess";
	}

	@Override
	public String getModelName() { 
		return "PortailSearch";
	}

	@Override
	public String getModelQN() { 
		return "karazapps.karaz.ux.hub.portailsearch.model.PortailSearch";
	}

	  
 
}
