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
		

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/ArticlesListe", "karazapps/karaz/ux/hub/portailsearch/model/search-ArticlesListe.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/CommentsMng", "karazapps/karaz/ux/hub/portailsearch/model/search-CommentsMng.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/HomePage", "karazapps/karaz/ux/hub/portailsearch/model/search-HomePage.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/NewArticle", "karazapps/karaz/ux/hub/portailsearch/model/search-NewArticle.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/Organisation", "karazapps/karaz/ux/hub/portailsearch/model/search-Organisation.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/UrbanismeSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-UrbanismeSearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/commentsGb", "karazapps/karaz/ux/hub/portailsearch/model/search-commentsGb.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/contactUs", "karazapps/karaz/ux/hub/portailsearch/model/search-contactUs.xml");
		
		try {
			RootMenu.addMenus("karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-menu.xml");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de menu   karazapps/karaz/ux/hub/portailsearch/model/PortailSearch-menu.xml");
		}	
		
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/portailsearch/model/translation/DashboardSearch-i18n-fr.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/portailsearch/model/translation/DashboardSearch-i18n-fr.properties");
		}	
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/portailsearch/model/translation/DashboardSearch-i18n-ar.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/portailsearch/model/translation/DashboardSearch-i18n-ar.properties");
		}	
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/portailsearch/model/translation/DashboardSearch-i18n-en.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/portailsearch/model/translation/DashboardSearch-i18n-en.properties");
		}	
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/portailsearch/model/translation/PortailSearch-i18n-ar.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/portailsearch/model/translation/PortailSearch-i18n-ar.properties");
		}	
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/portailsearch/model/translation/PortailSearch-i18n-en.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/portailsearch/model/translation/PortailSearch-i18n-en.properties");
		}	
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/portailsearch/model/translation/PortailSearch-i18n-fr.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/portailsearch/model/translation/PortailSearch-i18n-fr.properties");
		}	
		try {
			RootTranslate.addTranslate("karazapps/karaz/ux/hub/portailsearch/model/translation/PortailSearch-i18n-l0.properties");
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargement de translation   karazapps/karaz/ux/hub/portailsearch/model/translation/PortailSearch-i18n-l0.properties");
		}	

    	
    	try {  
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/articles.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/DashboardSearch.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/globalSearch.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/mainDefault.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/ProceduresCSS.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/vueLarge.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/vuemobile.css");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/articles.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/comments.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/elasicSearch.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/globalSearch.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/proceduresJS.js");
    	 
    	} catch (Exception e) {
    		e.printStackTrace();
    	}

	if(installing()) {
	
		try {	BackEndEJBContext.getLVLookUp().addLV( getFile("karazapps/karaz/ux/hub/portailsearch/model/resources/playList.xml") );} catch (Exception e) {  e.printStackTrace(); }
		try {	BackEndEJBContext.getLVLookUp().addLV( getFile("karazapps/karaz/ux/hub/portailsearch/model/resources/playListAttachement.xml") );} catch (Exception e) {  e.printStackTrace(); }
		try {	BackEndEJBContext.getLVLookUp().addLV( getFile("karazapps/karaz/ux/hub/portailsearch/model/resources/tag.xml") );} catch (Exception e) {  e.printStackTrace(); }
		try {	BackEndEJBContext.getLVLookUp().addLV( getFile("karazapps/karaz/ux/hub/portailsearch/model/resources/visibility.xml") );} catch (Exception e) {  e.printStackTrace(); }

	try { BackEndEJBContext.getAPLookUp().addAP(  getFile("karazapps/karaz/ux/hub/portailsearch/model/affectationProfiles/GestionDashboardSearch-assignation.properties")  ); } catch (Exception e) { e.printStackTrace(); }
	try { BackEndEJBContext.getAPLookUp().addAP(  getFile("karazapps/karaz/ux/hub/portailsearch/model/affectationProfiles/GestionDashboardSearchFaq-assignation.properties")  ); } catch (Exception e) { e.printStackTrace(); }
    	BackEndEJBContext.getSequenceService().createSeqGenIfNotExist("karazapps.karaz.ux.hub.portailsearch.model.PortailSearch", "DashboardSearch-{BI}/{Year}");
    	

    	try { 
			BackEndEJBContext.getPRLookUp().addPRFromList( "karaz/ux/hub/portailsearch/reporting/reportranking/ReportrankingReport", "karazapps.karaz.ux.hub.portailsearch.model.PortailSearch" 
			, getFile("karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/qrcodes.xml") , getFile("karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/reportranking-template.xhtml") , getFile("karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/resource-entete-page.PNG") , getFile("karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/resource-pied-page.PNG")  );
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargment prLookUp.addPRFromFolder(karazapps/karaz/ux/hub/portailsearch/reporting/reportranking , karaz/ux/hub/portailsearch/reporting/reportranking/ReportrankingReport, karazapps.karaz.ux.hub.portailsearch.model.PortailSearch ");
			e.printStackTrace();
		}
    	try { 
			BackEndEJBContext.getPRLookUp().addPRFromList( "karaz/ux/hub/portailsearch/reporting/reportsimulateur/ReportsimulateurReport", "karazapps.karaz.ux.hub.portailsearch.model.PortailSearch" 
			, getFile("karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/qrcodes.xml") , getFile("karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/reportsimulateur-template.xhtml") , getFile("karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/resource-entete-page.PNG") , getFile("karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/resource-pied-page.PNG")  );
		} catch (Exception e) { 
			System.out.println("Erreur lors de chargment prLookUp.addPRFromFolder(karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur , karaz/ux/hub/portailsearch/reporting/reportsimulateur/ReportsimulateurReport, karazapps.karaz.ux.hub.portailsearch.model.PortailSearch ");
			e.printStackTrace();
		}
		
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
