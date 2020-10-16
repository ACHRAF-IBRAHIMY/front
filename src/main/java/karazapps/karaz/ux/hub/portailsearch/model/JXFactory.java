package karazapps.karaz.ux.hub.portailsearch.model;

import java.io.StringReader;
import java.io.StringWriter;
import java.util.Date;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.transform.sax.SAXSource;

import org.xml.sax.InputSource;
import org.xml.sax.XMLReader;


import ma.ribatis.karaz.model.IJXFactory;
import ma.ribatis.karaz.server.BackEndEJBContext; 
import ma.ribatis.karaz.server.persistance.DataObject;
import ma.ribatis.karaz.server.persistance.IDataObject;

import karazapps.karaz.ux.hub.portailsearch.model.PortailSearch;

public class JXFactory  implements IJXFactory {
	
		   public static final String __status="indexString.s1"; 
		   public static final String __reference="indexString.s2"; 
		
	/**
	 * @return the jaxbContext
	 * @throws JAXBException 
	 */
	public static JAXBContext getJaxbContext() throws JAXBException {
		if(jaxbContext==null)
			jaxbContext = JAXBContext.newInstance("karazapps.karaz.ux.hub.portailsearch.model"); 
		return jaxbContext;
	}

	/**
	 * @return the unmarshaller
	 * @throws JAXBException 
	 */
	public static  Unmarshaller getUnmarshaller() throws JAXBException { 
		return getJaxbContext().createUnmarshaller(); 
	}

	/**
	 * @return the marshaller
	 * @throws JAXBException 
	 */
	public static  Marshaller getMarshaller() throws JAXBException {
		
		return  getJaxbContext().createMarshaller(); 
	}

	static JAXBContext jaxbContext ; 
	static Unmarshaller unmarshaller ; 
	static Marshaller marshaller ;  
	
	public static PortailSearch getJXObjectById(Long id)  { 
		 
		DataObject doi=BackEndEJBContext.getDoService().findDataObjectById(id);
		if(doi!=null && PortailSearch.class.getName().equals(doi.getModelName()))
			return getJXObject(doi);
		return null;		
	}
	public static PortailSearch getJXObjectById(String id)  { 
	 
		DataObject doi=BackEndEJBContext.getDoService().findDataObjectById(id);
		if(doi!=null && PortailSearch.class.getName().equals(doi.getModelName()))
			return getJXObject(doi);
		return null;		
	}
	public static PortailSearch getJXObject(DataObject di)  {
		return getJXObject(di.getXmlData());
	}

	public static PortailSearch getJXObject(String xmlData)  {
		StringReader sr = new StringReader(xmlData);
 
		try {
			SAXParserFactory spf = SAXParserFactory.newInstance();
			spf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
	        spf.setFeature("http://xml.org/sax/features/validation", false);
	        spf.setFeature( "http://apache.org/xml/features/disallow-doctype-decl",true); 
	        spf.setFeature(  "http://xml.org/sax/features/external-general-entities" , false); 
	        spf.setFeature( "http://xml.org/sax/features/external-parameter-entities", false); 
	        spf.setXIncludeAware(false);  
	        spf.setValidating(false);
	        spf.setNamespaceAware(true);
	        XMLReader xmlReader = spf.newSAXParser().getXMLReader();
	        InputSource inputSource = new InputSource(sr);
	        SAXSource source = new SAXSource(xmlReader, inputSource); 
			return (PortailSearch) getUnmarshaller().unmarshal(source);
		} catch (Exception e) { 
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			sr.close();
		}
	}

public static String getXml(PortailSearch  jx ) throws JAXBException {
		StringWriter sw=null; 
			sw = new StringWriter(); 
			getMarshaller().marshal(jx, sw); 
			return sw.toString() ;  
		 
	}
	public static void saveJXObject(PortailSearch jx, DataObject di) throws JAXBException {
	 
	
	try { Util.preIndexation(jx, di); } catch (Exception e) {  	e.printStackTrace(); }
		StringWriter sw = new StringWriter();
		getMarshaller().marshal(jx, sw);
		di.setXmlData(sw.toString());
		indexJXObject(jx, di);
		try { sw.close(); } catch (Exception e) {  	e.printStackTrace(); }
	}
	
	public static void indexJXObject(PortailSearch jx, DataObject di) throws JAXBException {
		    try{ di.getIndexString().setS1(  jx.status); } catch (Exception e) {  e.printStackTrace(); }
		    try{ di.getIndexString().setS2(  jx.reference); } catch (Exception e) {  e.printStackTrace(); }
		try { Util.postIndexation(jx, di); } catch (Exception e) {  	e.printStackTrace(); }
	
	di.setChangeTime(new Date());
	}
	
	
	 @Override
	public void indexJXObjectGeneric(Object jx, IDataObject di)
			throws JAXBException {
	    if(jx==null )
			 jx = getJXObject((DataObject) di);
		saveJXObject((PortailSearch) jx, (DataObject) di);
		
		
		
		String xmlCc=((DataObject) di).getXmlDataCc();
		if(xmlCc!=null && !xmlCc.trim().isEmpty()) {
			try {
				 System.out.println("from indexation Generic Cc");
				PortailSearch jxCc = getJXObject(xmlCc);
				Util.preIndexation(jxCc, (DataObject) di);
				StringWriter sw = new StringWriter();
				getMarshaller().marshal(jxCc, sw);
				di.setXmlDataCc(sw.toString());
			} catch (Exception e) { 
				e.printStackTrace();
			}
		}
		
		
		
	}
	
}
