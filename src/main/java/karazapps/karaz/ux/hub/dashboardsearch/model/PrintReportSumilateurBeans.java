package karazapps.karaz.ux.hub.dashboardsearch.model;

import java.io.File;
import java.util.TreeMap;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import org.apache.log4j.Logger;

import karazapps.karaz.ux.hub.portailsearch.model.PortailSearchBrowser;
import karazapps.karaz.ux.hub.portailsearch.model.PortailSearchJxDoi;
import ma.ribatis.karaz.repository.RepositoryConfig;
import ma.ribatis.karaz.repository.RepositoryServiceRemote;
import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.actions.KarazRemoteAction;
import ma.ribatis.karaz.server.persistance.Attachment;
import ma.ribatis.karaz.util.cache.XmlHelper;

@Stateless(name = "karaz/ux/hub/dashboardsearch/PrintReportSumilateurBeans", mappedName = "karaz/ux/hub/dashboardsearch/PrintReportSumilateurBeans")
@Remote
public class PrintReportSumilateurBeans implements KarazRemoteAction {

	Logger logger = Logger.getLogger(PrintReportSumilateurBeans.class);

	@Override
	public String execute(String xml, Long doid, TreeMap<String, String> ctx) {
		try {
		String attName = "RAPPORT SUMILATEUR";
	     ctx.put("attachmentName", attName);
		 Long ret = BackEndEJBContext.getPrintAction( "karaz/ux/hub/portailsearch/reporting/reportsimulateur/PersoReportsimulateurReport").print(doid, xml, ctx);
		    if(doid<=0){
				PortailSearchBrowser br=new PortailSearchBrowser(null);
				PortailSearchJxDoi res = br.first();
				if(res==null){
					res=PortailSearchJxDoi.newInstance("/");
					res.save();
				}
				
				doid=res.doi.getId();
			}
		 RepositoryServiceRemote rs = BackEndEJBContext.getRepositoryService();
		 Attachment att = rs.createAttachment(new File(rs.getAttachmentPath(ret)), doid, attName, true);
		 try {
			    XmlHelper xh  =new XmlHelper(xml);
			    log("repport attach=="+att.getDocument().getGedId());
			    xh.setValue("krn", ""+RepositoryConfig.getLocalRepositoryRemoteName());
			    xh.setValue("repport.gedId", ""+att.getDocument().getGedId());
			    try {
					
					xh.setValue("data.krn", ""+RepositoryConfig.getLocalRepositoryRemoteName());
					xh.setValue("data.repport.gedId", ""+att.getDocument().getGedId());
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				
			     return xh.getXmlText();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return xml;
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return xml;
		}}
	
	private void log(String s) {
		logger.info(s);
	}

	
	
}
