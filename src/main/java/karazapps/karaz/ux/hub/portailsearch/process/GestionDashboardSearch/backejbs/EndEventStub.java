package karazapps.karaz.ux.hub.portailsearch.process.GestionDashboardSearch.backejbs;
import java.util.*;

import ma.ribatis.karaz.activities.*; 
import ma.ribatis.karaz.activities.EndActivityStub;
import ma.ribatis.karaz.server.persistance.ActivityInstance;
import ma.ribatis.karaz.server.*; 
import ma.ribatis.karaz.server.process.parameters.ProcessConfigMap;
import ma.ribatis.karaz.server.process.parameters.Processus;
import ma.ribatis.karaz.server.process.parameters.Processus.ConfigParams.ConfigParam;
import ma.ribatis.karaz.util.BaseType;
import ma.ribatis.karaz.util.KbizTool;
import  karazapps.karaz.ux.hub.portailsearch.model.PortailSearch;
import  karazapps.karaz.ux.hub.portailsearch.model.JXFactory; 
/**  activityAsType = EndActivity **/
/**nn parentActivityAsStub = EndActivityStub **/
public abstract class EndEventStub extends EndActivityStub {
	protected boolean overriding=true; 
	public EndEventStub(ActivityInstance ai, DataObjectServiceLocal doService){ super(ai, doService); jx = JXFactory.getJXObject(di); }



	@Override
	public boolean checkTransisition(String transitionName) {
		return true;
	}
		
				@Override
	public   void execute() throws Exception {
	final  PortailSearch jx =(PortailSearch) this.jx;
					overriding=true;
		execute((PortailSearch) jx);
		if(overriding)
			JXFactory.saveJXObject((PortailSearch) jx, di); 
			} 
	
		public abstract void execute(PortailSearch  jx); 
					
		@Override
	public final void create() throws Exception {
	final  PortailSearch jx =(PortailSearch) this.jx;
							overriding=true;
		create((PortailSearch) jx); 
		if(overriding)
			JXFactory.saveJXObject((PortailSearch) jx, di); 
				}
	 
	@Override
	public void initialize() throws Exception { 
	final  PortailSearch jx =(PortailSearch) this.jx;
		overriding=true;
		initialize((PortailSearch) jx); 
		if(overriding)
			JXFactory.saveJXObject((PortailSearch) jx, di); 
	}
	
	@Override
	public void close() throws Exception { 
	final  PortailSearch jx =(PortailSearch) this.jx;
						overriding=true;
		close((PortailSearch) jx); 
		if(overriding)
			JXFactory.saveJXObject((PortailSearch) jx, di); 
			 
				}
	
	 
			
	public void create( PortailSearch jx) throws Exception {};
	public void initialize(PortailSearch jx ) throws Exception {}; 
	public void close(PortailSearch jx) throws Exception {}; 
		
			
		
	
	private String getConfigParamValue(ActivityInstance ai, String pname,
			String type) {
		try {
			System.out.println("getConfigParamValue DecisionmontantStub ...");
			String modelQN=ai.getProcessInstance().getModelQN();
			String processQN=ai.getProcessInstance().getProcessQN();
			String entity=ai
					.getProcessInstance().getDataObject().getEntity();
			System.out.println("getConfigParamValue DecisionmontantStub modelQN="+modelQN+" processQN="+processQN+" entity="+entity);
			Processus pc = ProcessConfigMap.getProcessus(modelQN, processQN, entity);
			System.out.println("getConfigParamValue pc="+pc);
			if (pname == null || pname.trim().isEmpty() || pc == null
					|| pc.getConfigParams() == null
					|| pc.getConfigParams().getConfigParam() == null
					|| pc.getConfigParams().getConfigParam().isEmpty()) {

				System.out.println("getConfigParamValue ... null no processConfig found");
				return null;
			}
			for (ConfigParam cp : pc.getConfigParams().getConfigParam()) {
				try {
					System.out.println("getConfigParamValue ... loop cp="+cp);

					System.out.println("getConfigParamValue ... loop cp="+cp.getName());
					System.out.println("getConfigParamValue ... loop cp="+cp.isEnabled());
					if (pname.trim().equals(cp.getName()) && cp.isEnabled()) {
						return cp.getValue();
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}

			System.out.println("getConfigParamValue ... null ");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
