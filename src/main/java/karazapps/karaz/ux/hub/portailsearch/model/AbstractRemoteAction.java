package karazapps.karaz.ux.hub.portailsearch.model;

import java.io.StringWriter; 
import java.util.TreeMap;
import javax.xml.bind.JAXBException;
 
import ma.ribatis.karaz.server.actions.KarazRemoteAction;

 
public abstract class AbstractRemoteAction  implements KarazRemoteAction {

	@Override
	public String execute(String xml , Long doid,   TreeMap<String, String> ctx ) { 
		PortailSearch jx = JXFactory.getJXObject(xml);
		run(jx, doid, ctx);
		StringWriter sw = new StringWriter();
		try {
			JXFactory.getMarshaller().marshal(jx, sw);
		} catch (JAXBException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		String ret = sw.toString(); 
		try { sw.close(); } catch (Exception e) {  	e.printStackTrace(); }

		return ret;
	}

	public abstract void run(PortailSearch jx, Long doid,   TreeMap<String, String> ctx ) ;

}
