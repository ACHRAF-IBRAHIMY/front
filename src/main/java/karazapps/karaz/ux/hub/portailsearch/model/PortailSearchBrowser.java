package karazapps.karaz.ux.hub.portailsearch.model;

import java.io.Serializable;
import java.util.ArrayList; 
import java.util.Date;
import java.util.List; 

import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.persistance.DataObject;
import ma.ribatis.karaz.search.GenericBrowser; 
import karazapps.karaz.ux.hub.portailsearch.model.PortailSearch;

public class PortailSearchBrowser extends GenericBrowser<PortailSearchBrowser,  PortailSearch> { 
	public PortailSearchBrowser(String entity, boolean deleted) {
		super();
		this.entity=entity;
		this.deleted=deleted;
	}
	public PortailSearchBrowser(String entity) {
		this(entity, false);
	}
	public PortailSearchJxDoi first() {
		isCount=false;
		String querySQL = buildQuery();
		Serializable[] paramArray = params.toArray(new  Serializable[] {});
		List<Object> ret = BackEndEJBContext.getDoService().getQueryResultAsList(querySQL , paramArray);
		 if(ret==null || ret.isEmpty())
			return null;
		if( ret.get(0) instanceof DataObject ) {
		DataObject doi= (DataObject) ret.get(0);
		PortailSearch jx = JXFactory.getJXObject(doi);  
		return new PortailSearchJxDoi(doi, jx);
		} else {
		Long doid= (Long) ret.get(0);
		if(doid!=null) {
			DataObject doi= BackEndEJBContext.getDoService().findDataObjectById(doid);
			PortailSearch  jx = JXFactory.getJXObject(doi);  
			return new PortailSearchJxDoi(doi, jx);
			
		} 
		return null;	
		} 	
		
			
	}
	public ArrayList<PortailSearchJxDoi> list() {
		ArrayList<PortailSearchJxDoi> ls = new ArrayList<PortailSearchJxDoi>();
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
				PortailSearch jx = JXFactory.getJXObject(doi);  
				ls.add( new PortailSearchJxDoi(doi, jx));
			} else {
				Long doid= (Long) o;
				if(doid!=null) {
					DataObject doi =  BackEndEJBContext.getDoService().findDataObjectById(doid);
					PortailSearch jx = JXFactory.getJXObject(doi);  
					ls.add( new PortailSearchJxDoi(doi, jx));	
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
		return "karazapps.karaz.ux.hub.portailsearch.model.PortailSearch";
	}
	
	
		
		public PortailSearchBrowser  statusLike(  String operand) {    addCriteria(JXFactory.__status, Like, operand);return this;	}
		public PortailSearchBrowser  statusNotLike(  String operand) {    addCriteria(JXFactory.__status, NotLike, operand);return this;	}
		public PortailSearchBrowser  statusEqual(  String operand) {    addCriteria(JXFactory.__status, Equal, operand);return this;	}
		public PortailSearchBrowser  statusNotEqual(  String operand) {    addCriteria(JXFactory.__status, NotEqual, operand);return this;	}
		public PortailSearchBrowser  statusGt(  String operand) {    addCriteria(JXFactory.__status, Gt, operand);return this;	}
		public PortailSearchBrowser  statusGe(  String operand) {    addCriteria(JXFactory.__status, Ge, operand);return this;	}
		public PortailSearchBrowser  statusLt(  String operand) {    addCriteria(JXFactory.__status, Lt, operand);return this;	}
		public PortailSearchBrowser  statusLe(  String operand) {    addCriteria(JXFactory.__status, Le, operand);return this;	}
		public PortailSearchBrowser  statusIn(  ArrayList<String> operand) {    addCriteria(JXFactory.__status, In, operand);return this;	}
		
		public PortailSearchBrowser statusAsc( ) { 	orderBys.put(JXFactory.__status, "ASC") ; 	return this; 	}
	    public PortailSearchBrowser statusDec( ) { 	orderBys.put(JXFactory.__status, "DESC"); return this; 	}
	
			public PortailSearchBrowser  referenceLike(  String operand) {    addCriteria(JXFactory.__reference, Like, operand);return this;	}
		public PortailSearchBrowser  referenceNotLike(  String operand) {    addCriteria(JXFactory.__reference, NotLike, operand);return this;	}
		public PortailSearchBrowser  referenceEqual(  String operand) {    addCriteria(JXFactory.__reference, Equal, operand);return this;	}
		public PortailSearchBrowser  referenceNotEqual(  String operand) {    addCriteria(JXFactory.__reference, NotEqual, operand);return this;	}
		public PortailSearchBrowser  referenceGt(  String operand) {    addCriteria(JXFactory.__reference, Gt, operand);return this;	}
		public PortailSearchBrowser  referenceGe(  String operand) {    addCriteria(JXFactory.__reference, Ge, operand);return this;	}
		public PortailSearchBrowser  referenceLt(  String operand) {    addCriteria(JXFactory.__reference, Lt, operand);return this;	}
		public PortailSearchBrowser  referenceLe(  String operand) {    addCriteria(JXFactory.__reference, Le, operand);return this;	}
		public PortailSearchBrowser  referenceIn(  ArrayList<String> operand) {    addCriteria(JXFactory.__reference, In, operand);return this;	}
		
		public PortailSearchBrowser referenceAsc( ) { 	orderBys.put(JXFactory.__reference, "ASC") ; 	return this; 	}
	    public PortailSearchBrowser referenceDec( ) { 	orderBys.put(JXFactory.__reference, "DESC"); return this; 	}
	
	 
	




}
