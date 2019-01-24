
package karazapps.karaz.ux.hub.dashboardsearch.model;

import java.util.Date;
import javax.xml.bind.annotation.adapters.XmlAdapter;

public class Adapter2
    extends XmlAdapter<String, Date>
{


    public Date unmarshal(String value) {
        return (ma.ribatis.jxbadapter.DateAdapter.parseDateTime(value));
    }

    public String marshal(Date value) {
        return (ma.ribatis.jxbadapter.DateAdapter.printDateTime(value));
    }

}
