package karazapps.karaz.ux.hub.portailsearch.model;
 
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

public class PortailSearchLoader {
 
    public PortailSearchLoader() {   }
    
    @PostConstruct
    public void load() {
//automatique importation statement
				try { RootMenu.addMenusBE("karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-importation-menu.xml"); } catch (Exception e) { System.out.println("Erreur lors de chargement de menu  importation pour PortailSearch"  ); }	 
			ModelCache.addUsePath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:view-importation", "karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-importation-view.xml");
		//automatique importation statement

    
       	ModelCache.addXsdPath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch", "karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-model.xsd");
		ModelCache.addXml0Path("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch", "karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-ini.xml");
		ModelCache.addXml0Path("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:e-service", "$xml0ESFileAsPath");
		ModelCache.addAttachmentPath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch", "$attachFileAsPath");
		
		ModelCache.addDashBoard("karaz/ux/hub/dashboardSearch/mypage-dashboard", "karazapps/karaz/ux/hub/portailsearch/model/mypage-dashboard.xml");
        	
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:view-dashboardsearch", "karazapps/karaz/ux/hub/portailsearch/model/view-dashboardsearch.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:view-dashboardsearch-LargeScreen-cr", "karazapps/karaz/ux/hub/portailsearch/model/view-dashboardsearch/view-dashboardsearch-LargeScreen-cr.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:view-dashboardsearch-LargeScreen-val", "karazapps/karaz/ux/hub/portailsearch/model/view-dashboardsearch/view-dashboardsearch-LargeScreen-val.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:view-dashboardsearch-SmallScreen-cr", "karazapps/karaz/ux/hub/portailsearch/model/view-dashboardsearch/view-dashboardsearch-SmallScreen-cr.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:view-dashboardsearch-SmallScreen-val", "karazapps/karaz/ux/hub/portailsearch/model/view-dashboardsearch/view-dashboardsearch-SmallScreen-val.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:view-default", "karazapps/karaz/ux/hub/portailsearch/model/view-dashboardsearch.xml");
		
		ModelCache.addUsePath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:view-parametrages", "karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-parametrages-view.xml");
		
		
		ModelCache.addTaskListPath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:taskList-TLDashboardSearch", "karazapps/karaz/ux/hub/portailsearch/model/taskList-TLDashboardSearch.xml");
		
		ModelCache.addTaskListPath("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch:taskList-default", "karazapps/karaz/ux/hub/portailsearch/model/taskList-TLDashboardSearch.xml");
		

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AcceptabiliteProjets", "karazapps/karaz/ux/hub/portailsearch/model/search-AcceptabiliteProjets.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AccesAuFoncier", "karazapps/karaz/ux/hub/portailsearch/model/search-AccesAuFoncier.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AllGlobalTAskSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-AllGlobalTAskSearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AllKarazuxresults", "karazapps/karaz/ux/hub/portailsearch/model/search-AllKarazuxresults.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/DashletsArchitectSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-DashletsArchitectSearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/DetailsActivitySearch", "karazapps/karaz/ux/hub/portailsearch/model/search-DetailsActivitySearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/EtudeImpactEnvironemmental", "karazapps/karaz/ux/hub/portailsearch/model/search-EtudeImpactEnvironemmental.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/OpinionTextMining", "karazapps/karaz/ux/hub/portailsearch/model/search-OpinionTextMining.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/PublicCentralSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-PublicCentralSearch.xml");
		
		try {
			RootMenu.addMenus("karazapps/karaz/ux/hub/portailsearch/model/DashboardSearch-menu.xml");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de menu   karazapps/karaz/ux/hub/portailsearch/model/DashboardSearch-menu.xml");
		}	
		
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/portailsearch/model/translation/DashboardSearch-i18n-fr.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/portailsearch/model/translation/DashboardSearch-i18n-fr.properties");
		}	

    	
    	try {  
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/DashboardSearch.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/globalSearch.css");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/elasicSearch.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/globalSearch.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/otm.js");
    	 
    	} catch (Exception e) {
    		e.printStackTrace();
    	}

	if(installing()) {
	

	try { BackEndEJBContext.getAPLookUp().addAP(  getFile("karazapps/karaz/ux/hub/portailsearch/model/affectationProfiles/GestionDashboardSearch-assignation.properties")  ); } catch (Exception e) { e.printStackTrace(); }
    	BackEndEJBContext.getSequenceService().createSeqGenIfNotExist("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch", "DashboardSearch-{BI}/{Year}");
    	

		
    	try { 
			BackEndEJBContext.getMPLookUp().addMPFromFile("karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-parametrages-ini.xml", "karazapps.karaz.ux.hub.portailsearch.model.PortailSearch"); 
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargment mpLookUp.addMPFromFile(karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-parametrages-ini.xml, karazapps.karaz.ux.hub.portailsearch.model.PortailSearch ");
			e.printStackTrace();
		}
		
		try {
			SystemKarazUser user = new AbstractKarazUser.SystemKarazUser();
			RepositoryServiceRemote repService = BackEndEJBContext.getRepositoryService(); 
			
			repService.createFolder(user, 
					RepositoryServiceRemote.LocalRepository, 
					"karazapps.karaz.ux.hub.portailsearch.model.PortailSearch",
					"PortailSearch",
					"Folder for 'PortailSearch' attachments",
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
			return "karazapps.karaz.ux.hub.portailsearch.model".matches(installingModules);
		} catch (Exception e) {
			System.out.println("Error in detecting install mode "+e);
			return true;
		}
	}
	
private File getFile(String res ) {
	return new File( getClass().getClassLoader().getResource(res).getFile() ); 
	}
}
