package karazapps.karaz.ux.hub.portailsearch.search.allGlobalModelSearch.backejbs; 

import java.io.StringReader;
import java.util.*; 
import java.text.*; 
import javax.ejb.Remote;
import javax.ejb.Stateless;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;



import ma.ribatis.karaz.organization.AbstractKarazUser;
import ma.ribatis.karaz.server.DynamicQueryBuilder;
import ma.ribatis.karaz.server.KarazQuery;
import ma.ribatis.karaz.server.ModelCache;
import ma.ribatis.karaz.util.BaseType;
import ma.ribatis.karaz.util.cache.EntityHelper;


import org.apache.log4j.Logger;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.filter.Filters;
import org.jdom2.input.SAXBuilder;
import org.jdom2.xpath.XPathExpression;
import org.jdom2.xpath.XPathFactory;

import karazapps.karaz.ux.hub.portailsearch.model.PortailTools;

@Stateless(name="karaz/ux/hub/portailsearch/search/AllGlobalModelSearch", mappedName="karaz/ux/hub/portailsearch/search/AllGlobalModelSearch") 
@TransactionManagement(TransactionManagementType.BEAN)
@Remote
public class AllGlobalModelSearchBean implements KarazQuery {

	private static final int DefaultMaxResults = 10;
	private static final int DefaultFirstResult = 0;
	private static Logger logger = Logger.getLogger(AllGlobalModelSearchBean.class); 
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	XPathExpression<Element> xpath_data_entity = XPathFactory.instance().compile("entity", Filters.element());

	private String searchPath = "karaz/ux/hub/portailsearch/search/AllGlobalModelSearch";
	private Map<String, String> indexationMap=new TreeMap<String, String>(); 
	EntityManager em; 
	@PersistenceContext(unitName = "PESA")
	void setEntityManager(EntityManager entityManager) {
		em = entityManager;
	}
	public AllGlobalModelSearchBean () {
			indexationMap.put("reference", "indexString.s2") ;
					indexationMap.put("sequence", "di.sequence") ;
					indexationMap.put("status", "indexString.s1") ;
				
	}
	public TreeMap<String, Object> runQuery(String xml, Integer firstResult, Integer maxResult, AbstractKarazUser user, TreeMap<String, String> context) throws Exception {

		StringReader sr = new StringReader(xml);
		Document xmlDoc = new SAXBuilder().build(sr);
		Element queryData = xmlDoc.getRootElement();
		sr.close();
		ArrayList<String> listeSerach=new ArrayList<String>();
		if(queryData.getChild("searchModel")!=null){
			for(Element e:queryData.getChild("searchModel").getChildren()){
				if(BaseType.isNotEmty(e.getTextTrim())){
				listeSerach.add(e.getTextTrim());
				}
			}
		}
		PortailTools pt=new PortailTools();
		logger.debug("listeSerach=="+listeSerach);
		int ofsset = DefaultFirstResult;
		if (firstResult != null){
			ofsset=firstResult;
		}
		
		int limit = DefaultMaxResults;
		if (maxResult != null){
			limit=maxResult;
		}
		int maxSize=limit;
		if(listeSerach.size()<=0) {
			return new TreeMap<String, Object>();
		}
		limit= (limit/listeSerach.size());
		if(limit<1){
			limit=1;	
		}
		Integer totalRowCount = 100;
		TreeMap<String, Object> ret = new TreeMap<String, Object>();
		ArrayList<TreeMap<String, String>> aliste = new ArrayList<TreeMap<String, String>>();
		x:while (true) {
		try {
			for(String s:listeSerach){
				try {
					TreeMap<String, Object> res = pt.executeSearch(s, xml,user, ofsset, 1);
					totalRowCount+=(Integer)res.get(KarazQuery.TotalCout);
					ArrayList<TreeMap<String, String>>  alister =(ArrayList<TreeMap<String, String>>) res.get(KarazQuery.Result);
					aliste.addAll(alister);
					if(aliste.size()==maxSize){
						break x;
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		} catch (Exception e) {
			
			e.printStackTrace();
			
		}
		if(aliste.size()==0){
			break x;
		}
		}
		
		ret.put(KarazQuery.Result, aliste);
		ret.put(KarazQuery.TotalCout, totalRowCount);
		logger.debug("aliste==="+aliste);
		// preRunTraitement(query, data);
		

		return ret;

	}
}
