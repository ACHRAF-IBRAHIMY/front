package karazapps.karaz.ux.hub.portailsearch.search.allTaskGlobalModelSearch.backejbs; 

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

@Stateless(name="karaz/ux/hub/portailsearch/search/AllTaskGlobalModelSearch", mappedName="karaz/ux/hub/portailsearch/search/AllTaskGlobalModelSearch") 
@TransactionManagement(TransactionManagementType.BEAN)
@Remote
public class AllTaskGlobalModelSearchBean implements KarazQuery {

	private static final int DefaultMaxResults = 10;
	private static final int DefaultFirstResult = 0;
	private static Logger logger = Logger.getLogger(AllTaskGlobalModelSearchBean.class); 
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	XPathExpression<Element> xpath_data_entity = XPathFactory.instance().compile("entity", Filters.element());
	XPathExpression<Element> xpath_data_searchModel = XPathFactory.instance().compile("query/searchModel", Filters.element());

	private String searchPath = "karaz/ux/hub/portailsearch/search/AllTaskGlobalModelSearch";
	private Map<String, String> indexationMap=new TreeMap<String, String>(); 
	EntityManager em; 
	@PersistenceContext(unitName = "PESA")
	void setEntityManager(EntityManager entityManager) {
		em = entityManager;
	}
	public AllTaskGlobalModelSearchBean () {
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
		logger.info("from AllTaskGlobalModelSearch aliste=="+listeSerach+" context"+context);
		
		int ofsset = DefaultFirstResult;
		if (firstResult != null){
			ofsset=firstResult;
		}
		int maxSize=DefaultMaxResults;
		int limit = 1;
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
		Integer totalMaxRowCount = 0;
		TreeMap<String, Object> ret = new TreeMap<String, Object>();
		ArrayList<TreeMap<String, String>> aliste = new ArrayList<TreeMap<String, String>>();
		ArrayList<TreeMap<String, String>> alisteFilter = new ArrayList<TreeMap<String, String>>();
		logger.info("from AllTaskGlobalModelSearch ofsset==="+ofsset+" maxSize=="+maxSize+" limit="+limit);
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
		for(String s:listeSerach){
			try {
				TreeMap<String, Object> res = pt.executeSearch(s, xml,user, 0, 1);
				ArrayList<TreeMap<String, String>>  alister =(ArrayList<TreeMap<String, String>>) res.get(KarazQuery.Result);
				if(res==null || res.size()==0 || alister==null || alister.size()==0 ){
					logger.info("from AllTaskGlobalModelSearch continue===looop");
					continue ;
				}
				totalRowCount+=(Integer)res.get(KarazQuery.TotalCout);
				if(totalMaxRowCount<=totalRowCount){
					totalMaxRowCount=totalRowCount;
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		int modulo=(totalRowCount%maxSize);
		int numberOfPages=0;
		int currentPage=(ofsset/maxSize);
		if(modulo>0){
		numberOfPages=(totalRowCount/maxSize)+1;
		}else{
			numberOfPages=(totalRowCount/maxSize);
		}
		ofsset=currentPage*limit;
        if(currentPage==numberOfPages){
        	ofsset=totalMaxRowCount-maxSize;
        	limit=maxSize;
        }
		x:while (true) {
		try { 
			int retSize=0;
			for(String s:listeSerach){
				try {
					
					TreeMap<String, Object> res = pt.executeSearch(s, xml,user, ofsset, limit);
					ArrayList<TreeMap<String, String>>  alister =(ArrayList<TreeMap<String, String>>) res.get(KarazQuery.Result);
					logger.info("from AllTaskGlobalModelSearch executeSearch ="+s+" res=="+res.size()+" ofsset="+ofsset+" limit"+limit+"alister ret"+alister.size());
					 
					 boolean cheek=(res==null || res.size()==0 ||  alister==null || alister.size()==0);
					 if(!cheek){
						 aliste.addAll(alister);
						 retSize+=alister.size();
						 if(aliste.size()>=maxSize){
								logger.info("from AllTaskGlobalModelSearch break===looop"+aliste.size());
								break x;
					    }
					 }
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			ofsset+=limit;
			
			//aliste.size()==0 || 
			if(retSize<=0){
				logger.info("from AllTaskGlobalModelSearch break===looop 2");
//				ofssetMap.clear();
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
		logger.info("from AllTaskGlobalModelSearch alisteFilter==="+alisteFilter.size());
		logger.info("from AllTaskGlobalModelSearch aliste==="+aliste.size());
		logger.info("from AllTaskGlobalModelSearch totalRowCount==="+totalRowCount);
		// preRunTraitement(query, data);
		

		return ret;

	}

//	public TreeMap<String, Object> runQuery(String xml, Integer firstResult, Integer maxResult, AbstractKarazUser user, TreeMap<String, String> context) throws Exception {
//
//		StringReader sr = new StringReader(xml);
//		Document xmlDoc = new SAXBuilder().build(sr);
//		Element queryData = xmlDoc.getRootElement();
//		sr.close();
//		ArrayList<String> listeSerach=new ArrayList<String>();
//		
//		if(xpath_data_searchModel!=null){
//		Element returnMode_elem = xpath_data_searchModel.evaluateFirst(queryData);
//		//System.out.println("returnMode_elem=="+returnMode_elem);
//		if(returnMode_elem!=null){
//			for(Element e:returnMode_elem.getChildren()){
//				if(BaseType.isNotEmty(e.getTextTrim())){
//				listeSerach.add(e.getTextTrim());
//				}
//			}
//		
//		}
//		}
//		PortailTools pt=new PortailTools();
//		logger.info("from AllTaskGlobalModelSearch aliste=="+listeSerach);
//		int ofsset = DefaultFirstResult;
//		if (firstResult != null){
//			ofsset=firstResult;
//		}
//		int maxSize=DefaultMaxResults;
//		int limit = DefaultMaxResults;
//		if (maxResult != null){
//			limit=maxResult;
//			maxSize=maxResult;
//		}
//		
//		if(listeSerach.size()<=0) {
//			TreeMap<String, Object> xret = new TreeMap<String, Object>();
//			ArrayList<TreeMap<String, String>> aliste = new ArrayList<TreeMap<String, String>>();
//			xret.put(KarazQuery.Result, aliste);
//			xret.put(KarazQuery.TotalCout, 0);
//			return xret;
//		}
//		limit= (limit/listeSerach.size());
//		if(limit<1){
//			limit=1;	
//		}
//		Integer totalRowCount = 0;
//		TreeMap<String, Object> ret = new TreeMap<String, Object>();
//		ArrayList<TreeMap<String, String>> aliste = new ArrayList<TreeMap<String, String>>();
//		ArrayList<TreeMap<String, String>> alisteFilter = new ArrayList<TreeMap<String, String>>();
//		logger.info("from AllTaskGlobalModelSearch ofsset==="+ofsset+" maxSize=="+maxSize+" limit="+limit);
//		try {
//			if(BaseType.isNotEmty(xml)){
//				if(xml.contains("</query>")){
//					xml=(xml.substring(0,xml.indexOf("</query>")))+"</query></data>";
//				}
//			}
//		} catch (Exception e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
//		x:while (true) {
//		try {
//			l:for(String s:listeSerach){
//				try {
//					TreeMap<String, Object> res = pt.executeSearch(s, xml,user, ofsset, limit);
//					if(res==null || res.size()==0){
//						continue l;
//					}
//					totalRowCount+=(Integer)res.get(KarazQuery.TotalCout);
//					ArrayList<TreeMap<String, String>>  alister =(ArrayList<TreeMap<String, String>>) res.get(KarazQuery.Result);
//					aliste.addAll(alister);
//					if(aliste.size()>=maxSize){
//						logger.info("from AllTaskGlobalModelSearch break===looop");
//						
//						break x;
//					}
//				} catch (Exception e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//			}
//			ofsset=ofsset+limit;
//			if(aliste.size()==0 || aliste.size()<=maxSize){
//				logger.info("from AllTaskGlobalModelSearch break===looop 2");
//				break x;
//			}
//		} catch (Exception e) {
//			
//			e.printStackTrace();
//			
//		}
//		
//		}
//		if(aliste.size()>maxSize){
//			for(int i=0;i<maxSize;i++){
//				alisteFilter.add(aliste.get(i));
//			}
//		}else{
//			alisteFilter=aliste;
//		}
//		ret.put(KarazQuery.Result, alisteFilter);
//		ret.put(KarazQuery.TotalCout, totalRowCount);
//		logger.info("from AllTaskGlobalModelSearch aliste==="+aliste.size());
//		logger.info("from AllTaskGlobalModelSearch totalRowCount==="+totalRowCount);
//		// preRunTraitement(query, data);
//		
//
//		return ret;
//
//	}

}
