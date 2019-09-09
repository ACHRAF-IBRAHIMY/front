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

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AffichagePub", "karazapps/karaz/ux/hub/portailsearch/model/search-AffichagePub.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AllGlobalTAskSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-AllGlobalTAskSearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AllKarazuxresults", "karazapps/karaz/ux/hub/portailsearch/model/search-AllKarazuxresults.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AllObjectGlobalModelSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-AllObjectGlobalModelSearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AllTaskGlobalModelSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-AllTaskGlobalModelSearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/ArticleConsultation", "karazapps/karaz/ux/hub/portailsearch/model/search-ArticleConsultation.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/Articles", "karazapps/karaz/ux/hub/portailsearch/model/search-Articles.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/ArticlesListe", "karazapps/karaz/ux/hub/portailsearch/model/search-ArticlesListe.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AutorisationDemolition", "karazapps/karaz/ux/hub/portailsearch/model/search-AutorisationDemolition.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AutorisationRefection", "karazapps/karaz/ux/hub/portailsearch/model/search-AutorisationRefection.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AutorisationRegularisation", "karazapps/karaz/ux/hub/portailsearch/model/search-AutorisationRegularisation.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AutorisationsConstructionGrandsProjets", "karazapps/karaz/ux/hub/portailsearch/model/search-AutorisationsConstructionGrandsProjets.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/AutorisationsConstructionPetitsProjets", "karazapps/karaz/ux/hub/portailsearch/model/search-AutorisationsConstructionPetitsProjets.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/BackEndPage", "karazapps/karaz/ux/hub/portailsearch/model/search-BackEndPage.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/CalculIndex", "karazapps/karaz/ux/hub/portailsearch/model/search-CalculIndex.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/CertificatReceptionProjets", "karazapps/karaz/ux/hub/portailsearch/model/search-CertificatReceptionProjets.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/DashletsArchitectSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-DashletsArchitectSearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/DetailsActivitySearch", "karazapps/karaz/ux/hub/portailsearch/model/search-DetailsActivitySearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/DownloadConsultation", "karazapps/karaz/ux/hub/portailsearch/model/search-DownloadConsultation.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/DownloadEdit", "karazapps/karaz/ux/hub/portailsearch/model/search-DownloadEdit.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/EtablissementClasse", "karazapps/karaz/ux/hub/portailsearch/model/search-EtablissementClasse.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/EtablissementClasse2", "karazapps/karaz/ux/hub/portailsearch/model/search-EtablissementClasse2.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/EtudeImpactEnvironemmental", "karazapps/karaz/ux/hub/portailsearch/model/search-EtudeImpactEnvironemmental.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/FaqDetail", "karazapps/karaz/ux/hub/portailsearch/model/search-FaqDetail.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/FaqPage", "karazapps/karaz/ux/hub/portailsearch/model/search-FaqPage.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/GuideVideoConsultation", "karazapps/karaz/ux/hub/portailsearch/model/search-GuideVideoConsultation.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/GuideVideoEdit", "karazapps/karaz/ux/hub/portailsearch/model/search-GuideVideoEdit.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/NewRefJuridique", "karazapps/karaz/ux/hub/portailsearch/model/search-NewRefJuridique.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/NewfreqQuestion", "karazapps/karaz/ux/hub/portailsearch/model/search-NewfreqQuestion.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/OccupationDomainPubRp", "karazapps/karaz/ux/hub/portailsearch/model/search-OccupationDomainPubRp.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/OccupationDomainPubUC", "karazapps/karaz/ux/hub/portailsearch/model/search-OccupationDomainPubUC.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/OpendataFrame", "karazapps/karaz/ux/hub/portailsearch/model/search-OpendataFrame.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/OpinionTextClassification", "karazapps/karaz/ux/hub/portailsearch/model/search-OpinionTextClassification.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/OpinionTextMining", "karazapps/karaz/ux/hub/portailsearch/model/search-OpinionTextMining.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/PermisHabiterEtCertificatConformite", "karazapps/karaz/ux/hub/portailsearch/model/search-PermisHabiterEtCertificatConformite.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/PublicCentralSearch", "karazapps/karaz/ux/hub/portailsearch/model/search-PublicCentralSearch.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/RankingDigitalRemp", "karazapps/karaz/ux/hub/portailsearch/model/search-RankingDigitalRemp.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/RefDetail", "karazapps/karaz/ux/hub/portailsearch/model/search-RefDetail.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/RefrentielJuridique", "karazapps/karaz/ux/hub/portailsearch/model/search-RefrentielJuridique.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/ReportRanking", "karazapps/karaz/ux/hub/portailsearch/model/search-ReportRanking.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/RetageProdHomePage", "karazapps/karaz/ux/hub/portailsearch/model/search-RetageProdHomePage.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/SimpleDeclaration", "karazapps/karaz/ux/hub/portailsearch/model/search-SimpleDeclaration.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/SimulatorRokhas", "karazapps/karaz/ux/hub/portailsearch/model/search-SimulatorRokhas.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/SimulatorRokhasCMS", "karazapps/karaz/ux/hub/portailsearch/model/search-SimulatorRokhasCMS.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/UserSearchOLAP", "karazapps/karaz/ux/hub/portailsearch/model/search-UserSearchOLAP.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/VisioConferenceFrame", "karazapps/karaz/ux/hub/portailsearch/model/search-VisioConferenceFrame.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/autorisationMorcellement", "karazapps/karaz/ux/hub/portailsearch/model/search-autorisationMorcellement.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/autorusationConstructionGroupesHabitations", "karazapps/karaz/ux/hub/portailsearch/model/search-autorusationConstructionGroupesHabitations.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/autorusationLotissement", "karazapps/karaz/ux/hub/portailsearch/model/search-autorusationLotissement.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/proceduresEconomique", "karazapps/karaz/ux/hub/portailsearch/model/search-proceduresEconomique.xml");

		ModelCache.addDocumentListPath("karaz/ux/hub/portailsearch/search/proceduresUrbanisme", "karazapps/karaz/ux/hub/portailsearch/model/search-proceduresUrbanisme.xml");
		
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
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/articles.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/DashboardSearch.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/globalSearch.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/mainDefault.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/otc.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/ProceduresCSS.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/simulator.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/simulatorCms.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/Treant.css");
    			WebResourcer.addCssResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/virtualKeyboard.css");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/articles.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/elasicSearch.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/globalSearch.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/otc.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/otm.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/proceduresJS.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/reportRanking.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/simulator.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/simulatorCms.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/Treant.js");
    			WebResourcer.addJSResource("karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/virtualKeyboard.js");
    	 
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
