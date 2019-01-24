package karazapps.karaz.ux.hub.dashboardsearch.model;

import java.io.Serializable;
import java.util.ArrayList; 
import java.util.Date;
import java.util.List; 

import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.persistance.DataObject;
import ma.ribatis.karaz.search.GenericBrowser; 
import karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch;

public class DashboardSearchBrowser extends GenericBrowser<DashboardSearchBrowser,  DashboardSearch> { 
	public DashboardSearchBrowser(String entity, boolean deleted) {
		super();
		this.entity=entity;
		this.deleted=deleted;
	}
	public DashboardSearchBrowser(String entity) {
		this(entity, false);
	}
	public DashboardSearchJxDoi first() {
		isCount=false;
		String querySQL = buildQuery();
		Serializable[] paramArray = params.toArray(new  Serializable[] {});
		List<Object> ret = BackEndEJBContext.getDoService().getQueryResultAsList(querySQL , paramArray);
		 if(ret==null || ret.isEmpty())
			return null;
		if( ret.get(0) instanceof DataObject ) {
		DataObject doi= (DataObject) ret.get(0);
		DashboardSearch jx = JXFactory.getJXObject(doi);  
		return new DashboardSearchJxDoi(doi, jx);
		} else {
		Long doid= (Long) ret.get(0);
		if(doid!=null) {
			DataObject doi= BackEndEJBContext.getDoService().findDataObjectById(doid);
			DashboardSearch  jx = JXFactory.getJXObject(doi);  
			return new DashboardSearchJxDoi(doi, jx);
			
		} 
		return null;	
		} 	
		
			
	}
	public ArrayList<DashboardSearchJxDoi> list() {
		ArrayList<DashboardSearchJxDoi> ls = new ArrayList<DashboardSearchJxDoi>();
		isCount=false;
		String querySQL = buildQuery();
		Serializable[] paramArray = params.toArray(new  Serializable[] {});
		List<Object> ret = BackEndEJBContext.getDoService().getQueryResultAsList(querySQL , paramArray);
		if(ret==null || ret.isEmpty())
			return ls;
		for(Object o:ret) {
		try {
			if( o instanceof DataObject ) {
				DataObject doi= (DataObject) o;
				DashboardSearch jx = JXFactory.getJXObject(doi);  
				ls.add( new DashboardSearchJxDoi(doi, jx));
			} else {
				Long doid= (Long) o;
				if(doid!=null) {
					DataObject doi =  BackEndEJBContext.getDoService().findDataObjectById(doid);
					DashboardSearch jx = JXFactory.getJXObject(doi);  
					ls.add( new DashboardSearchJxDoi(doi, jx));	
				}
			}
		} catch (Exception e) {
			System.out.println("Exception in unmarslling "+e.getMessage()); 
			e.printStackTrace();
		}
		}
		return ls;
	}
	
	 
	

	public String getModelName() { 
		return "karazapps.karaz.ux.hub.dashboardsearch.model.DashboardSearch";
	}
	
	
		
		public DashboardSearchBrowser  statusLike(  String operand) {    addCriteria(JXFactory.__status, Like, operand);return this;	}
		public DashboardSearchBrowser  statusNotLike(  String operand) {    addCriteria(JXFactory.__status, NotLike, operand);return this;	}
		public DashboardSearchBrowser  statusEqual(  String operand) {    addCriteria(JXFactory.__status, Equal, operand);return this;	}
		public DashboardSearchBrowser  statusNotEqual(  String operand) {    addCriteria(JXFactory.__status, NotEqual, operand);return this;	}
		public DashboardSearchBrowser  statusGt(  String operand) {    addCriteria(JXFactory.__status, Gt, operand);return this;	}
		public DashboardSearchBrowser  statusGe(  String operand) {    addCriteria(JXFactory.__status, Ge, operand);return this;	}
		public DashboardSearchBrowser  statusLt(  String operand) {    addCriteria(JXFactory.__status, Lt, operand);return this;	}
		public DashboardSearchBrowser  statusLe(  String operand) {    addCriteria(JXFactory.__status, Le, operand);return this;	}
		public DashboardSearchBrowser  statusIn(  ArrayList<String> operand) {    addCriteria(JXFactory.__status, In, operand);return this;	}
		
		public DashboardSearchBrowser statusAsc( ) { 	orderBys.put(JXFactory.__status, "ASC") ; 	return this; 	}
	    public DashboardSearchBrowser statusDec( ) { 	orderBys.put(JXFactory.__status, "DESC"); return this; 	}
	
			public DashboardSearchBrowser  referenceLike(  String operand) {    addCriteria(JXFactory.__reference, Like, operand);return this;	}
		public DashboardSearchBrowser  referenceNotLike(  String operand) {    addCriteria(JXFactory.__reference, NotLike, operand);return this;	}
		public DashboardSearchBrowser  referenceEqual(  String operand) {    addCriteria(JXFactory.__reference, Equal, operand);return this;	}
		public DashboardSearchBrowser  referenceNotEqual(  String operand) {    addCriteria(JXFactory.__reference, NotEqual, operand);return this;	}
		public DashboardSearchBrowser  referenceGt(  String operand) {    addCriteria(JXFactory.__reference, Gt, operand);return this;	}
		public DashboardSearchBrowser  referenceGe(  String operand) {    addCriteria(JXFactory.__reference, Ge, operand);return this;	}
		public DashboardSearchBrowser  referenceLt(  String operand) {    addCriteria(JXFactory.__reference, Lt, operand);return this;	}
		public DashboardSearchBrowser  referenceLe(  String operand) {    addCriteria(JXFactory.__reference, Le, operand);return this;	}
		public DashboardSearchBrowser  referenceIn(  ArrayList<String> operand) {    addCriteria(JXFactory.__reference, In, operand);return this;	}
		
		public DashboardSearchBrowser referenceAsc( ) { 	orderBys.put(JXFactory.__reference, "ASC") ; 	return this; 	}
	    public DashboardSearchBrowser referenceDec( ) { 	orderBys.put(JXFactory.__reference, "DESC"); return this; 	}
	
	 
	




}
