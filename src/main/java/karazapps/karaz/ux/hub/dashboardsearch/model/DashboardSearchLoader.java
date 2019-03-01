package karazapps.karaz.ux.hub.dashboardsearch.model;
 
import javax.annotation.PostConstruct;
import javax.ejb.DependsOn;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import javax.ejb.Singleton;


import java.io.File;
import ma.ribatis.karaz.organization.AbstractKarazUser;
import ma.ribatis.karaz.organization.AbstractKarazUser.SystemKarazUser;
import ma.ribatis.karaz.organization.menu.RootMenu;
import ma.ribatis.karaz.organization.menu.RootTranslate;
import ma.ribatis.karaz.repository.RepositoryServiceRemote; 


import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.ModelCache;
import ma.ribatis.karaz.server.ModelNameProcessSOMap; 
import ma.ribatis.karaz.util.cache.WebResourcer; 


/**
 * Session Bean implementation class DemandeCongeLoader
 */
@Singleton
@Startup
@LocalBean

public class DashboardSearchLoader {
 
    public DashboardSearchLoader() {   }
    
    @PostConstruct
    public void load() {
//automatique importation statement
				try { RootMenu.addMenusBE("karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-importation-menu.xml"); } catch (Exception e) { System.out.println("Erreur lors de chargement de menu  importation pour DashboardSearch"  ); }	 
			ModelCache.addUsePath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:view-importation", "karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-importation-view.xml");
		//automatique importation statement

    
       	ModelCache.addXsdPath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch", "karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-model.xsd");
		ModelCache.addXml0Path("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch", "karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-ini.xml");
		ModelCache.addXml0Path("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:e-service", "$xml0ESFileAsPath");
		ModelCache.addAttachmentPath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch", "$attachFileAsPath");
		
		ModelCache.addDashBoard("karaz/ux/hub/dashboardSearch/mypage-dashboard", "karazapps/karaz/ux/hub/dashboardsearch/model/mypage-dashboard.xml");
        	
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:view-dashboardsearch", "karazapps/karaz/ux/hub/dashboardsearch/model/view-dashboardsearch.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:view-dashboardsearch-LargeScreen-cr", "karazapps/karaz/ux/hub/dashboardsearch/model/view-dashboardsearch/view-dashboardsearch-LargeScreen-cr.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:view-dashboardsearch-LargeScreen-val", "karazapps/karaz/ux/hub/dashboardsearch/model/view-dashboardsearch/view-dashboardsearch-LargeScreen-val.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:view-dashboardsearch-SmallScreen-cr", "karazapps/karaz/ux/hub/dashboardsearch/model/view-dashboardsearch/view-dashboardsearch-SmallScreen-cr.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:view-dashboardsearch-SmallScreen-val", "karazapps/karaz/ux/hub/dashboardsearch/model/view-dashboardsearch/view-dashboardsearch-SmallScreen-val.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:view-default", "karazapps/karaz/ux/hub/dashboardsearch/model/view-dashboardsearch.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:view-parametrages", "karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-parametrages-view.xml");
		
		
		ModelCache.addTaskListPath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:taskList-TLDashboardSearch", "karazapps/karaz/ux/hub/dashboardsearch/model/taskList-TLDashboardSearch.xml");
		
		ModelCache.addTaskListPath("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch:taskList-default", "karazapps/karaz/ux/hub/dashboardsearch/model/taskList-TLDashboardSearch.xml");
		

		ModelCache.addDocumentListPath("karaz/ux/hub/dashboardsearch/search/AllKarazuxresults", "karazapps/karaz/ux/hub/dashboardsearch/model/search-AllKarazuxresults.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/dashboardsearch/search/DetailsActivitySearch", "karazapps/karaz/ux/hub/dashboardsearch/model/search-DetailsActivitySearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/dashboardsearch/search/PublicCentralSearch", "karazapps/karaz/ux/hub/dashboardsearch/model/search-PublicCentralSearch.xml");
		
		try {
			RootMenu.addMenus("karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-menu.xml");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de menu   karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-menu.xml");
		}	
		
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/dashboardsearch/model/translation/DashboardSearch-i18n-fr.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/dashboardsearch/model/translation/DashboardSearch-i18n-fr.properties");
		}	

    	
    	try {  
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/dashboardsearch/model/dashboardsearch/web/DashboardSearch.css");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/dashboardsearch/model/dashboardsearch/web/elasicSearch.js");
    	 
    	} catch (Exception e) {
    		e.printStackTrace();
    	}

	if(installing()) {
	

	try { BackEndEJBContext.getAPLookUp().addAP(  getFile("karazapps/karaz/ux/hub/dashboardsearch/model/affectationProfiles/GestionDashboardSearch-assignation.properties")  ); } catch (Exception e) { e.printStackTrace(); }
    	BackEndEJBContext.getSequenceService().createSeqGenIfNotExist("karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch", "DashboardSearch-{BI}/{Year}");
    	

		
    	try { 
			BackEndEJBContext.getMPLookUp().addMPFromFile("karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-parametrages-ini.xml", "karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch"); 
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargment mpLookUp.addMPFromFile(karazapps/karaz/ux/hub/dashboardsearch/model/DashboardSearch-parametrages-ini.xml, karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch ");
			e.printStackTrace();
		}
		
		try {
			SystemKarazUser user = new AbstractKarazUser.SystemKarazUser();
			RepositoryServiceRemote repService = BackEndEJBContext.getRepositoryService(); 
			
			repService.createFolder(user, 
					RepositoryServiceRemote.LocalRepository, 
					"karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch",
					"DashboardSearch",
					"Folder for 'DashboardSearch' attachments",
					null); 
			
		} catch (Exception e) { 
			System.out.println("Error in REPORTSERVICE..."+e);
			e.printStackTrace();
		}
		}
	}


private boolean installing() {
		try {
			String installingModules = System.getProperty("karaz.installing.modules.path", "*").replace(".", "\\.").replace("*", ".*"); 
			return "karazapps.karaz.ux.hub.dashboardsearch.model".matches(installingModules);
		} catch (Exception e) {
			System.out.println("Error in detecting install mode "+e);
			return true;
		}
	}
	
private File getFile(String res ) {
	return new File( getClass().getClassLoader().getResource(res).getFile() ); 
	}
}
