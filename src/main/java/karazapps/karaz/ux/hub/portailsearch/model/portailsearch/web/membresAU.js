//agence urbaine js
var membresAU = [
    {
        "link": "https://www.auc.ma/",
        "active": "oui",
        "logo": "AGENCE URBAINE DE CASABLANCA.png",
        "title": "Agence Urbaine de Casablanca"
    },
    {
        "link": "http://www.aujadida.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE EL JADIDA.png",
        "title": "Agence Urbaine de El Jadida"
    },
    {
        "link": "http://www.aukhemi7.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE KHMISSET.png",
        "title": "Agence Urbaine de Khmisset"
    },
    {
        "link": "http://www.autetouan.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE TÉTOUAN.png",
        "title": "Agence Urbaine de Tétouan"
    },
    {
        "link": "http://www.auah.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE AL HOCEIMA.png",
        "title": "Agence Urbaine de Al Hoceima"
    },
    {
        "link": "http://www.ausafi.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE SAFI .png",
        "title": "Agence Urbaine de Safi "
    },
    {
        "link": "https://auessaouira.ma/",
        "active": "non",
        "logo": "AGENCE URBAINE DE ESSAOUIRA.png",
        "title": "Agence Urbaine de Essaouira"
    },
    {
        "link": "http://aueks.org.ma/",
        "active": "non",
        "logo": "AGENCE URBAINE DE L KELÂA DES SRAGHN.png",
        "title": "Agence Urbaine de l Kelâa des Sraghn"
    },
    {
        "link": "http://www.aumarrakech.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE MARRAKECH.png",
        "title": "Agence Urbaine de Marrakech"
    },
    {
        "link": "http://www.aua.ma/",
        "active": "oui ",
        "logo": "AGENCE URBAINE DE AGADIR.png",
        "title": "Agence Urbaine de Agadir"
    },
    {
        "link": "http://www.autar.ma/",
        "active": "non",
        "logo": "AGENCE URBAINE DE TAROUDANNT .png",
        "title": "Agence Urbaine de Taroudannt "
    },
    {
        "link": "http://www.augs.org.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE GUELMIM ES-SMARA.png",
        "title": "Agence Urbaine de Guelmim Es-Smara"
    },
    {
        "link": "http://www.aulaayoune.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE LAÂYOUNE.png",
        "title": "Agence Urbaine de Laâyoune"
    },
    {
        "link": "http://www.dakhla-lagouira.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE OUED ED-DAHAB AOUSSERD .png",
        "title": "Agence Urbaine de Oued Ed-Dahab Aousserd "
    },
    {
        "link": "ttp://www.aunador.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE NADOR.png",
        "title": "Agence Urbaine de Nador"
    },
    {
        "link": "http://www.auo.org.ma",
        "active": "oui ",
        "logo": "AGENCE URBAINE DE OUJDA.png",
        "title": "Agence Urbaine de Oujda"
    },
    {
        "link": "http://www.autaza.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE TAZA.png",
        "title": "Agence Urbaine de Taza"
    },
    {
        "link": "http://www.aufes.org/",
        "active": "oui ",
        "logo": " AGENCE URBAINE DE FÈS .png",
        "title": " Agence Urbaine de Fès "
    },
    {
        "link": "http://www.aumk.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE MEKNÈS.png",
        "title": "Agence Urbaine de Meknès"
    },
    {
        "link": "http://www.aukh.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE KHÉNIFRA.png",
        "title": "Agence Urbaine de Khénifra"
    },
    {
        "link": "http://www.aubm.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE BENI MELLAL.png",
        "title": "Agence Urbaine de Beni Mellal"
    },
    {
        "link": "http://www.auer.gov.ma",
        "active": "oui ",
        "logo": "AGENCE URBAINE DE ERRACHIDIA.png",
        "title": "Agence Urbaine de Errachidia"
    },
    {
        "link": "http://www.auozt.ma",
        "active": "non",
        "logo": "AGENCE URBAINE DE OUARZAZATE-ZAGORA.png",
        "title": "Agence Urbaine de Ouarzazate-Zagora"
    }
];

function createDivMembresAu(divHtml){
    membresAU.forEach(function(elm){
        let logo = elm.logo;
        let title = elm.title;
        let link = elm.link;
        let active = "";
        if(elm.active=="oui"){
            active = "active";
        }
        var alm = '<div class="au-class"><div><img src="extensions/img/membre/'+logo+'"></img></div><div><h2>'+title+'</h2><div><span class="aulink1 '+active+'"><i class="fas fa-plug"></i>Intègrée à Rokhas</span><span class="aulink2"><i class="fas fa-external-link-alt" style="color:#38A" ></i><a target="_blank" href="'+link+'">Accès site web</a></span></div></div></div>';
        divHtml.html(divHtml.html()+alm);
    });
}