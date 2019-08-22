package karazapps.karaz.ux.hub.portailsearch.reporting.reportsimulateur;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.io.Serializable;
import java.util.List;
import java.util.TreeMap;

import javax.ejb.EJB; 
import javax.ejb.Remote;
import javax.ejb.Stateless;

import org.apache.commons.io.IOUtils;
 
import karazapps.karaz.ux.hub.portailsearch.model.*;

import ma.ribatis.karaz.reporting.PrintAction;
import ma.ribatis.karaz.reporting.PrintReportHandler;
import ma.ribatis.karaz.reporting.ReportInterceptor;
import ma.ribatis.karaz.server.DataObjectServiceLocal;
import ma.ribatis.karaz.server.persistance.DataObject;

/**
 * Session Bean implementation class ReportsimulateurReport 
 */
@Stateless(name = "karaz/ux/hub/portailsearch/reporting/reportsimulateur/PersoReportsimulateurReport", mappedName = "karaz/ux/hub/portailsearch/reporting/reportsimulateur/PersoReportsimulateurReport")
@Remote
public class PersoReportsimulateurReport implements PrintAction {
	@EJB 
	DataObjectServiceLocal dos;
	
	@EJB 
	PrintReportHandler printReportHandler;

	private String reportName="karaz/ux/hub/portailsearch/reporting/reportsimulateur/ReportsimulateurReport";

	private CharSequence skin="karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/reportsimulateur-skin.css";

	private CharSequence template="karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/reportsimulateur-template.xhtml";
	String qrcodesPath="karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/qrcodes.xml";
	private TreeMap<String, CharSequence> resourcePathMap=new TreeMap<String, CharSequence>() ;
	

	private String qrcodes;
	ReportInterceptor interceptor =new ReportsimulateurReportInterceptor();
    /**
     * Default constructor. 
     */
    public PersoReportsimulateurReport () {
					try {	resourcePathMap.put("resource-entete-page_PNG",
							 PortailSearch
							.class.getClassLoader().getResource("karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/resource-entete-page.PNG").getFile() ); 
				} catch(Exception e) {e.printStackTrace() ; };  
					try {	resourcePathMap.put("resource-pied-page_PNG",
							 PortailSearch
							.class.getClassLoader().getResource("karazapps/karaz/ux/hub/portailsearch/reporting/reportsimulateur/resource-pied-page.PNG").getFile() ); 
				} catch(Exception e) {e.printStackTrace() ; };  
		    	
		try {
			InputStream qrcodeIS = JXFactory.class.getClassLoader()
					.getResourceAsStream(qrcodesPath);
			StringWriter os = new StringWriter();
			IOUtils.copy(qrcodeIS, os);
			qrcodeIS.close();
			qrcodes = os.toString();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

    }

	@Override
	public Long print(Long doid, String xml, TreeMap<String, String> ctx) {
		DataObject doi = new DataObject();
		DataObject xdoi = new DataObject();
		if(doid<=0){
			PortailSearchBrowser br=new PortailSearchBrowser(null);
			PortailSearchJxDoi res = br.first();
			if(res==null){
				res=PortailSearchJxDoi.newInstance("/");
				res.save();
			}
			
			xdoi=res.doi;
		}
		if(xml!=null) {
			
			doi.setId(xdoi.getId());
            doi.setBI(xdoi.getBI());
			doi.setOwningSeq(xdoi.getOwningSeq());
			doi.setSequence(xdoi.getSequence());
			doi.setChangeTime(xdoi.getChangeTime());
			doi.setCreationTime(xdoi.getCreationTime());
            doi.setModelName(xdoi.getModelName());
            doi.setEntity(xdoi.getEntity()); 
			doi.setXmlData(xml);
		}
		PortailSearch jx= null;
		TreeMap<String, Serializable> vctx = new TreeMap<String, Serializable>();
		try {
			interceptor.intercept(doi, doi.getXmlData(), reportName, ctx , vctx );
			
		} catch(Exception e) {
			
		}
		try {
			return	printReportHandler.print(doi, jx, null, reportName , skin , template , resourcePathMap, qrcodes, ctx, vctx);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Long printList(List<Long> doids, String xml,
			TreeMap<String, String> ctx) {
		// TODO Auto-generated method stub
		return null;
	}

}
