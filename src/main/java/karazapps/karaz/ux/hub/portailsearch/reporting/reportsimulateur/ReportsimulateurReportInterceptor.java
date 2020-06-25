package karazapps.karaz.ux.hub.portailsearch.reporting.reportsimulateur;

import java.util.List;
import java.util.TreeMap;
 
import java.io.Serializable;
import java.io.Serializable;
import ma.ribatis.karaz.reporting.ReportInterceptor;
import ma.ribatis.karaz.server.persistance.IDataObject;

 
 
public class ReportsimulateurReportInterceptor implements ReportInterceptor   {
   
	@Override
	public void intercept(IDataObject doi, String xml,  String reportName, TreeMap<String, String> ctx,  TreeMap<String, Serializable> vctx ) {
		 
	}

	@Override
	public void interceptList(List<IDataObject> doids, String xml, String reportName,  TreeMap<String, String> ctx  ,  TreeMap<String, Serializable> vctx) {
		 
	}

}
