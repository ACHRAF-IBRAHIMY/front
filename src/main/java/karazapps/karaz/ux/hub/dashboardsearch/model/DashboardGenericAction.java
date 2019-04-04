package karazapps.karaz.ux.hub.dashboardsearch.model;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.TreeMap;

import javax.ejb.EJB;
import javax.ejb.Remote;
import javax.ejb.Stateless;

import org.apache.log4j.Logger;
import org.jdom2.Element;


import ma.ribatis.karaz.organization.AbstractKarazUser;
import ma.ribatis.karaz.repository.RepositoryServiceRemote;
import ma.ribatis.karaz.server.BackEndEJBContext;
import ma.ribatis.karaz.server.actions.KarazRemoteAction;

import ma.ribatis.karaz.util.BaseType;
import ma.ribatis.karaz.util.cache.XmlHelper;

@Stateless(name = "karaz/ux/hub/dashboardsearch/DashboardGenericAction", mappedName = "karaz/ux/hub/dashboardsearch/DashboardGenericAction")
@Remote
public class DashboardGenericAction implements KarazRemoteAction {

	Logger logger = Logger.getLogger(DashboardGenericAction.class);

	@Override
	public String execute(String xml, Long doid, TreeMap<String, String> ctx) {
		String action = ctx.get("action");
		
		log("DashboardGenericAction   params[doid=" + doid + "action=" + action + " ctx=" + ctx + "xml==="+xml+"]");
	
		 try {
				XmlHelper xh = new XmlHelper(xml);
				
				log("ret========"+xh.getXmlText());
				return xh.getXmlText();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return xml;
			} 

		 
		
	}
	
	private void log(String s) {
		logger.info(s);
	}

	
	
}
