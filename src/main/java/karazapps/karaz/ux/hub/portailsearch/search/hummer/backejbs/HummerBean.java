package karazapps.karaz.ux.hub.portailsearch.search.hummer.backejbs; 

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
import ma.ribatis.karaz.util.cache.EntityHelper;


import org.apache.log4j.Logger;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.filter.Filters;
import org.jdom2.input.SAXBuilder;
import org.jdom2.xpath.XPathExpression;
import org.jdom2.xpath.XPathFactory;

@Stateless(name="karaz/ux/hub/portailsearch/search/Hummer", mappedName="karaz/ux/hub/portailsearch/search/Hummer") 
@TransactionManagement(TransactionManagementType.BEAN)
@Remote
public class HummerBean implements KarazQuery {

	private static final int DefaultMaxResults = 10;
	private static final int DefaultFirstResult = 0;
	private static Logger logger = Logger.getLogger(HummerBean.class); 
	private SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	XPathExpression<Element> xpath_data_entity = XPathFactory.instance().compile("entity", Filters.element());

	private String searchPath = "karaz/ux/hub/portailsearch/search/Hummer";
	private Map<String, String> indexationMap=new TreeMap<String, String>(); 
	EntityManager em; 
	@PersistenceContext(unitName = "PESA")
	void setEntityManager(EntityManager entityManager) {
		em = entityManager;
	}
	public HummerBean () {
			indexationMap.put("reference", "indexString.s2") ;
					indexationMap.put("sequence", "di.sequence") ;
					indexationMap.put("status", "indexString.s1") ;
				
	}
	public TreeMap<String, Object> runQuery(String xml, Integer firstResult, Integer maxResult, AbstractKarazUser user, TreeMap<String, String> context) throws Exception {

		StringReader sr = new StringReader(xml);
		Document xmlDoc = new SAXBuilder().build(sr);
		Element queryData = xmlDoc.getRootElement();
		sr.close();
		Element queryClause = null;
		if (context != null && context.containsKey(KarazQuery.QueryClause)) {
			StringReader sq = new StringReader(context.get("queryClause"));
			Document xmlDocSq = new SAXBuilder().build(sq);
			queryClause = xmlDocSq.getRootElement();
		} else {
			StringReader sq = new StringReader(ModelCache.getDocumentList(searchPath));
			Document xmlDocSq = new SAXBuilder().build(sq);
			queryClause = xmlDocSq.getRootElement().getChild("query");;
		}
		String ordering = null;
		if (context.containsKey(ORDER_SEQ) && context.get(ORDER_SEQ) != null && !context.get(ORDER_SEQ).contains("null")) {
			ordering = context.get(ORDER_SEQ);
		}
		DynamicQueryBuilder dqb = new DynamicQueryBuilder(queryClause, queryData, "karazapps.karaz.ux.hub.portailsearch.model.PortailSearch", ordering, indexationMap);
		dqb.buildQuery();
		Map<String, Object> paramMap = dqb.getParamMap();
		String queryJPQL = dqb.getQueryJPQL().toString();
		logger.info("runQuery start "+ queryJPQL);
		String selectJQPL = " SELECT di.id, di.bi, di.sequence, di.owningSeq, di.modelName, di.creationTime, di.changeTime "
				+ queryJPQL;
		String countJPQL = " SELECT count(di.id) " + queryJPQL;
		TypedQuery<Object[]> query = em.createQuery(selectJQPL, Object[].class);
		TypedQuery<Integer> queryCount = em.createQuery(countJPQL, Integer.class);

		// preRunTraitement(query, data);
		if (maxResult != null)
			query.setMaxResults(maxResult);
		else
			query.setMaxResults(DefaultMaxResults);
		if (firstResult != null)
			query.setFirstResult(firstResult);
		else
			query.setFirstResult(DefaultFirstResult);

		Element entity_elem = xpath_data_entity.evaluateFirst(queryData);
		String userEntity = entity_elem == null ? user.getUserCard().getEntity() : entity_elem.getValue();
		List<String> entities = EntityHelper.getSearchEntitiesParent(userEntity, context == null ? null : context.get(KarazQuery.ResourceURL));
		String subEntityLike = EntityHelper.getSearchEntitieschildren(userEntity, context == null ? null : context.get(KarazQuery.ResourceURL));

		query.setParameter("entityParents", entities);
		query.setParameter("entityChildren", subEntityLike);
		queryCount.setParameter("entityParents", entities);
		queryCount.setParameter("entityChildren", subEntityLike);

		for (String k : paramMap.keySet()) {
			query.setParameter(k, paramMap.get(k));
			queryCount.setParameter(k, paramMap.get(k));
		}

		List<Object[]> resulte = query.getResultList();
		Integer totalRowCount = 100;
		try {
			if ((context == null || !"true".equals(context.get(KarazQuery.NoTotalCount)) )&& resulte.size()==query.getMaxResults() )
				totalRowCount = Integer.parseInt("" + queryCount.getSingleResult());
			else
				totalRowCount = resulte.size()+query.getFirstResult();;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		TreeMap<String, Object> ret = new TreeMap<String, Object>();
		ret.put(KarazQuery.TotalCout, totalRowCount);
		ArrayList<TreeMap<String, String>> aliste = new ArrayList<TreeMap<String, String>>();
		if (resulte != null) {
			for (Object[] r : resulte) { 
				TreeMap<String, String> dto = new TreeMap<String, String>();
				dto.put("id", ""+ r[0]);
				dto.put("bi", "" + r[1]); 
				dto.put("sequence", "" + r[2]);  
				dto.put("owningSeq", ""+ r[3]);
				dto.put("modelName", ""+ r[4]); 
				dto.put("creationTime", r[5]!=null? sdf.format(r[5]): null) ; 
				dto.put("changeTime",  r[6]!=null? sdf.format(r[6]): null); 
				aliste.add(dto);
			}
		}
		ret.put(KarazQuery.Result, aliste);

		return ret;

	}
}
