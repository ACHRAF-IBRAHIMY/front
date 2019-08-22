package karazapps.karaz.ux.hub.portailsearch.reporting.reportsimulateur;

import java.util.List;
import java.util.TreeMap;
 
import java.io.Serializable;
import java.io.Serializable;
import ma.ribatis.karaz.reporting.ReportInterceptor;
import ma.ribatis.karaz.server.persistance.IDataObject;
import ma.ribatis.karaz.util.XmlHelper;

 
 
public class ReportsimulateurReportInterceptor implements ReportInterceptor   {
   
	@Override
	public void intercept(IDataObject doi, String xml,  String reportName, TreeMap<String, String> ctx,  TreeMap<String, Serializable> vctx ) {
		try {
	        System.out.println(" send dataXhelper........"+xml);
	          XmlHelper xhData = new XmlHelper(xml);
	          TreeMap<String, Object> data=new TreeMap<String, Object>();
	          data.put("data", xhData);
	          vctx.put("dt", data);
	          System.out.println("data==="+data);
	        } catch (Exception e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	}

	@Override
	public void interceptList(List<IDataObject> doids, String xml, String reportName,  TreeMap<String, String> ctx  ,  TreeMap<String, Serializable> vctx) {
		 
	}

}
