package karazapps.karaz.ux.hub.portailsearch.reporting.reportranking;

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
 * Session Bean implementation class ReportrankingReport
 */
@Stateless(name = "karaz/ux/hub/portailsearch/reporting/reportranking/ReportrankingReport", mappedName = "karaz/ux/hub/portailsearch/reporting/reportranking/ReportrankingReport")
@Remote
public class ReportrankingReport implements PrintAction {
	@EJB 
	DataObjectServiceLocal dos;
	
	@EJB 
	PrintReportHandler printReportHandler;

	private String reportName="karaz/ux/hub/portailsearch/reporting/reportranking/ReportrankingReport";

	private CharSequence skin="karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/reportranking-skin.css";

	private CharSequence template="karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/reportranking-template.xhtml";
	String qrcodesPath="karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/qrcodes.xml";
	private TreeMap<String, CharSequence> resourcePathMap=new TreeMap<String, CharSequence>() ;
	

	private String qrcodes;
	ReportInterceptor interceptor =new ReportrankingReportInterceptor();
    /**
     * Default constructor. 
     */
    public ReportrankingReport () {
					try {	resourcePathMap.put("resource-entete-page_PNG",
							 PortailSearch
							.class.getClassLoader().getResource("karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/resource-entete-page.PNG").getFile() ); 
				} catch(Exception e) {e.printStackTrace() ; };  
					try {	resourcePathMap.put("resource-pied-page_PNG",
							 PortailSearch
							.class.getClassLoader().getResource("karazapps/karaz/ux/hub/portailsearch/reporting/reportranking/resource-pied-page.PNG").getFile() ); 
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
		DataObject doi = dos.findDataObjectById(doid);
		if(doi==null)
			return null;
		if(xml!=null) {
			DataObject xdoi=doi;
			doi = new DataObject();
			doi.setId(doid);
			doi.setBI(xdoi.getBI());
			doi.setOwningSeq(xdoi.getOwningSeq());
			doi.setSequence(xdoi.getSequence());
			doi.setChangeTime(xdoi.getChangeTime());
			doi.setCreationTime(xdoi.getCreationTime());
			doi.setModelName(xdoi.getModelName());
			doi.setEntity(xdoi.getEntity()); 
			doi.setXmlData(xml);
		}
		PortailSearch jx= JXFactory.getJXObject(doi);
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
