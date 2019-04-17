package karazapps.karaz.ux.hub.portailsearch.search.allObjectGlobalModelSearch.backejbs; 

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

@Stateless(name="karaz/ux/hub/portailsearch/search/AllObjectGlobalModelSearch", mappedName="karaz/ux/hub/portailsearch/search/AllObjectGlobalModelSearch") 
@TransactionManagement(TransactionManagementType.BEAN)
@Remote
public class AllObjectGlobalModelSearchBean implements KarazQuery {

	private static final int DefaultMaxResults = 10;
	private static final int DefaultFirstResult = 0;
	private static Logger logger = Logger.getLogger(AllObjectGlobalModelSearchBean.class); 
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	XPathExpression<Element> xpath_data_entity = XPathFactory.instance().compile("entity", Filters.element());
	XPathExpression<Element> xpath_data_searchModel = XPathFactory.instance().compile("query/searchModel", Filters.element());

	private String searchPath = "karaz/ux/hub/portailsearch/search/AllObjectGlobalModelSearch";
	private Map<String, String> indexationMap=new TreeMap<String, String>(); 
	EntityManager em; 
	@PersistenceContext(unitName = "PESA")
	void setEntityManager(EntityManager entityManager) {
		em = entityManager;
	}
	public AllObjectGlobalModelSearchBean () {
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
		
		if(xpath_data_searchModel!=null){
		Element returnMode_elem = xpath_data_searchModel.evaluateFirst(queryData);
		//System.out.println("returnMode_elem=="+returnMode_elem);
		if(returnMode_elem!=null){
			for(Element e:returnMode_elem.getChildren()){
				if(BaseType.isNotEmty(e.getTextTrim())){
				listeSerach.add(e.getTextTrim());
				}
			}
		
		}
		}
		PortailTools pt=new PortailTools();
		logger.info("from AllGlobalModelSearchBean aliste=="+listeSerach);
		int ofsset = DefaultFirstResult;
		if (firstResult != null){
			ofsset=firstResult;
		}
		int maxSize=DefaultMaxResults;
		int limit = DefaultMaxResults;
		if (maxResult != null){
			limit=maxResult;
			maxSize=maxResult;
		}
		
		if(listeSerach.size()<=0) {
			TreeMap<String, Object> xret = new TreeMap<String, Object>();
			ArrayList<TreeMap<String, String>> aliste = new ArrayList<TreeMap<String, String>>();
			xret.put(KarazQuery.Result, aliste);
			xret.put(KarazQuery.TotalCout, 0);
			return xret;
		}
		limit= (limit/listeSerach.size());
		if(limit<1){
			limit=1;	
		}
		Integer totalRowCount = 0;
		TreeMap<String, Object> ret = new TreeMap<String, Object>();
		ArrayList<TreeMap<String, String>> aliste = new ArrayList<TreeMap<String, String>>();
		ArrayList<TreeMap<String, String>> alisteFilter = new ArrayList<TreeMap<String, String>>();
		logger.info("from AllGlobalModelSearchBean ofsset==="+ofsset+" maxSize=="+maxSize+" limit="+limit);
		try {
			if(BaseType.isNotEmty(xml)){
				if(xml.contains("</query>")){
					xml=(xml.substring(0,xml.indexOf("</query>")))+"</query></data>";
				}
			}
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		x:while (true) {
		try {
			for(String s:listeSerach){
				try {
					TreeMap<String, Object> res = pt.executeSearch(s, xml,user, ofsset, limit);
					totalRowCount+=(Integer)res.get(KarazQuery.TotalCout);
					ArrayList<TreeMap<String, String>>  alister =(ArrayList<TreeMap<String, String>>) res.get(KarazQuery.Result);
					aliste.addAll(alister);
					if(aliste.size()>=maxSize){
						logger.info("from AllGlobalModelSearchBean break===looop");
						
						break x;
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			ofsset=ofsset+limit;
			if(aliste.size()==0 || aliste.size()<=maxSize){
				logger.info("from AllGlobalModelSearchBean break===looop 2");
				break x;
			}
		} catch (Exception e) {
			
			e.printStackTrace();
			
		}
		
		}
		if(aliste.size()>maxSize){
			for(int i=0;i<maxSize;i++){
				alisteFilter.add(aliste.get(i));
			}
		}else{
			alisteFilter=aliste;
		}
		ret.put(KarazQuery.Result, alisteFilter);
		ret.put(KarazQuery.TotalCout, totalRowCount);
		logger.info("from AllGlobalModelSearchBean aliste==="+aliste.size());
		logger.info("from AllGlobalModelSearchBean totalRowCount==="+totalRowCount);
		// preRunTraitement(query, data);
		

		return ret;

	}
}
