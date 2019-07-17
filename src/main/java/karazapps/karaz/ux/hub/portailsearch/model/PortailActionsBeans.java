package karazapps.karaz.ux.hub.portailsearch.model;

import java.util.TreeMap;

import javax.ejb.Remote;
import javax.ejb.Stateless;

import org.apache.log4j.Logger;

import ma.ribatis.karaz.repository.RepositoryConfig;
import ma.ribatis.karaz.server.actions.KarazRemoteAction;
import ma.ribatis.karaz.util.XmlHelper;

@Stateless
(name ="karaz/ux/hub/action/PortailActions",mappedName = "karaz/ux/hub/action/PortailActions")
@Remote

public class PortailActionsBeans implements KarazRemoteAction {

	Logger logger = Logger.getLogger(PortailActionsBeans.class);
	@Override
	public String execute(String xml, Long doid, TreeMap<String, String> ctx) {
		log("xml="+xml+" \n doid=="+doid+" \n ctx=="+ctx);
		String operation = ctx.get("operation");
		//karaz/signup/gestioncompte/action/GenericActionSignup?operation=cheekLogin&amp;login={donnees.login}&amp;email={donnees.typeEmail}
		if("getKrn".equals(operation)){
			String krn = RepositoryConfig.getLocalRepositoryRemoteName();
			 try {
				XmlHelper xh = new XmlHelper(xml);
				xh.setValue("data.krn", krn);
				xh.setValue("krn", krn);
				log("ret========"+xh.getXmlText());
				return xh.getXmlText();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return xml;
			} 
			 
			 
		}
		
		
		return xml;
	}
	private void log(String s) {
		logger.info(s);
		
	}


	



}
