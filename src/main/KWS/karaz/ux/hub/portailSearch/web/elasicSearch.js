var currentPage = 0;
var currentLPage =0;
var totalPage = 0;
var timerID = 0;
var msecc =0;
var startTime = 0
var start = 0;
var end = 0;
var diff = 0;
var p=0;

//var AUTH = "Basic cm9raGFzX3VzZXI6YWRtaW4x";
var URL_SEARCH = "https://cmdbserver.karaz.org:9200";
//var URL_SEARCH = "https://localhost:9200";
var AUTH = "Basic cmVhZGFsbDpyZWFkYWxs";


function restAutoComplete(inp,prefix,type){
    var result = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            closeAllLists();
            var res = JSON.parse(this.responseText);
            for(var i=0;i<res.hits.hits.length;i++){
                var elm = res.hits.hits[i]._source.value;
                if(check(result,elm)){
                    result.push(elm);
                }
            }
            autocompleteF(inp,result,prefix,type);
        }
    };
   // xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    xhttp.open("POST",URL_SEARCH+"/completion_index/completionTerm/_search");
    xhttp.setRequestHeader("Authorization",AUTH);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
            "size": 5,
            "query": {
                "bool":{
                    "must":[{
                        "query_string": {
                            "fields":["value"],
                            "query": "*"+prefix+"*",
                            //"analyzer": "rebuilt_french",
                            "fuzziness": "AUTO",
                            "minimum_should_match": "100%"
                        }
                    }],
                    "should":[{
                        "match_phrase_prefix":{
                            "value":prefix
                        }
                    }]
                }
            }
        }
    ));
    return result;
}


//Check if result has already token
function check(res,elm){
    for(var i=0;i<res.length;i++){
        console.log(res[i]+"***"+elm);
        if(res[i]==elm){
            return false;
        }
    }
    return true;
}

var typePage = 0;
var articles = [{
    "_source":{
         "title":"DECRET N° 2-13-424 APPROUVANT LE REGLEMENT GENERAL DE CONSTRUCTION",
         "type":"URBANISME",
         "text":"Décret n° 2-13-424 du 13 rejeb 1434 (24 mai 2013) approuvant le règlement général de construction fixant la forme et les conditions de délivrance des autorisations et des pièces exigibles en application de la législation relative à l'urbanisme et aux lotissements, groupes d'habitations et morcellements ainsi que des textes pris pour leur application."
    }         
    },{
    "_source":{
         "title":"ARRETE N° 3214.13 FIXANT LES PIECES CONSTITUTIVES DES DOSSIERS D'AUTORISATIONS D’URBANISME",
         "type":"URBANISME",
         "text":"Arrêté conjoint du Ministre de l’Urbanisme et de l’Aménagement du Territoire et du Ministre de l’Intérieur n° 3214.13 du 10 moharram 1435 (14 novembre 2013) fixant les pièces constitutives des dossiers exigibles aux demandes d’autorisation en application de la législation relative à l’urbanisme et aux lotissements, groupes d’habitations et morcellements ainsi que des textes pris pour leur application."
    }         
    },{
    "_source":{
         "title":"DAHIR DU 25 AOUT 1914 PORTANT REGLEMENTATION DES ETABLISSEMENTS CLASSES",
         "type":"ÉCONOMIQUE",
         "text":"Dahir du 25 août 1914 (3 chaoual 1332) portant réglementation des établissements insalubres, incommodes ou dangereux, tel qu’il a été modifié et complété par les dahirs des 13 octobre 1933, 11 août 1937, 9 juin 1938, 9 novembre 1942 et 18 janvier 1950..."
    }         
    },{
    "_source":{
         "title":"LOI 47-18 PORTANT REFORME DES CENTRES REGIONAUX D’INVESTISSEMENT",
         "type":"INVESTISSEMENT",
         "text":"Loi 47-18 portant réforme des Centres Régionaux d’Investissement et création des commissions régionales unifiées d’investissement."
    }         
    },{
    "_source":{
         "title":"REGLEMENT DE SECURITE CONTRE LES RISQUES D'INCENDIE ET DE PANIQUE DANS LES CONSTRUCTIONS",
         "type":"URBANISME",
         "text":"Décret 2.14.499_Fr d'application du règlement fixant les règles de sécurité contre les risques d'incendie et de panique dans les constructions."
    }         
    }];

var faqs = [
    {
        "type":"PIECES REQUISES",
        "content":[
            {
                "question":"Quels sont les pièces requises pour l'obtention d'un permis de construire ?",
                "response":"Le réglement général de construction publié sous forme de décret (N° 2-13-424), a fixé la liste des pièces requises pour le dépôt d'un permis de construire. Certains documents sont obligatoires au dépôt, d'autre peuvent être déposées après obtention de l'avis favorable de la commission. Les documents demandé ..."
            },
            {
                "question":"Est ce que la feuille d'alignement est un document obligatoire pour le dépôt d'une demande ?",
                "response":"Non, la feuille d'alignement n'est pas un document requis par la réglementation et ne doit aucunement bloquer ni la réception de la demande ni son instruction. Néanmoins, l'architecte et l'administration a souvent besoin de ce document afin de vérifier la conformité du plan à la réalité du terrain et à la ..."
            }
        ],
    },{
        "type":"ACCES A LA PLATEFORME",
        "content":[
            {
                "question":"Je suis fonctionnaire et j'ai été muté d'une administration à une autre. Est ce que je garde mon compte ?",
                "response":"Entant que fonctionnaire, votre droits d'accès rokhas sont intimement liés à l'administration dont vous faire partie. Vous pouvez néanmoins garder - si vous le souhaitez - votre nom utilisateur précédent en le demandant à l'équipe Support au même temps que vous indiquez vos nouvelles attributions au sein de ..."
            },
            {
                "question":"Je ne me souviens plus de mon nom d'utilisateur, ni de mon mot de passe. Que faire ?",
                "response":"Vous pouvez récupérez votre nom d'utilisateur et réinitialiser votre mot de passe, si vous avec accès à l'e-mail communiqué lors de la création de votre compte d'accès. Dans ce cas, il faut cliquez sur le lien \"J'ai oublié mon mot de passe\", puis saisir votre adresse e-mail. En accédant à votre boite e-mail, vous pou ..."
            }
        ]
    }
];


function removeFullListSearch(){
    $(".full-search-list").html("");
}

function testWidth(width,nbr){
    return width > nbr;
}

//Search results and redirect to activity model
function restFullSearchList(prefix,from,prev,parent) {
    var result = [];
    var xhttp = new XMLHttpRequest();
    removeFullListSearch();
    $(".searchGif").show();
    

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            removeFullListSearch();
            var res = JSON.parse(this.responseText);
            for(var i=0;i<res.hits.hits.length;i++){
                result.push(res.hits.hits[i]);
            }
            
            console.log("typePage :"+typePage);

            if(typePage!=1 && typePage !=2){
                document.getElementsByClassName("div-full-search-bar")[0].getElementsByClassName("hp-sbox-text")[0].getElementsByTagName("span")[0].innerHTML = res.hits.total;
                document.getElementsByClassName("div-full-search-bar")[0].getElementsByClassName("hp-sbox-text")[0].getElementsByTagName("span")[1].innerHTML = prefix;
            }

            $(".searchGif").hide();
     
            if(currentPage==0){
                totalPage = Math.ceil(res.hits.total/4);
                createPaginationBar(Math.min(totalPage,10),0,prefix,1,false);
                if(totalPage!=0){
                    currentPage=1;
                    currentLPage=1;
                }
            }else if(currentPage%10==0){
                currentLPage = (currentPage/10)+1;
                console.log("begin: "+currentPage+"lpage: "+currentLPage);
                createPaginationBar(Number(Math.min(10,totalPage-currentPage))+Number(currentPage),currentPage-1,prefix,1,false);
            }else if(prev==true){
                createPaginationBar(currentPage+1,Math.max(0,(Number(currentPage))-10),prefix,1,true);
            }
            
            
            if (totalPage == 0 && typePage ==0) {
                noResults();
            }else if( typePage==1){
                fullSearchList(result);
            }else if( typePage==2){
                fullSearchList(faqs);
            }else{
                fullSearchList(result);
            }            
        }
    };
 //   xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    var index = "";   
    if(typePage==0){
        xhttp.open("POST",URL_SEARCH+"/activite_economique/activite/_search");
        xhttp.setRequestHeader("Authorization",AUTH);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
    }else if(typePage==1){
        xhttp.open("POST",URL_SEARCH+"/reglementation_index/reglementation/_search");
        xhttp.setRequestHeader("Authorization",AUTH);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
    }

    
    var testLanguage = RegExp('[أ-ي]');
    if(typePage==0){
        if(testLanguage.test(prefix)){
        xhttp.send(JSON.stringify(
            {
                "from":from,"size":4,
                "query": {
                    "bool": {
                        "must": [
                            { "multi_match": {
                                "query": prefix,
                                "fields": ["tags.keywordsString"],
                                "analyzer": "rebuilt_arabic",
                                "fuzziness": "AUTO",
                                "minimum_should_match": "70%"
                            }},{
                                "match_phrase": {
                                    "content.categorie": {
                                        "query": "Intitulé activité"
                                    }
                                }}
                        ],
                        "should": [
                            {
                                "match": {
                                    "content.intituleAr": prefix
                                }
                            }
                        ]
                    }
                }
            }
        ));
            }else{
        var objectJson = {
                    "from":from,"size":4,
                    "query": {
                        "bool": {
                            "must": [
                                { "multi_match": {
                                    "query": prefix,
                                    "fields": ["tags.keywordsString"],
                                    "analyzer": "rebuilt_french",
                                    "minimum_should_match": "100%"
                                }},{
                                    "match_phrase": {
                                        "content.categorie": {
                                            "query": "Intitulé activité"
                                        }
                                    }}]
                        }
                    }
                };
        p=parent;
        console.log(p);
        if(parent==2){
            objectJson.query.bool.must[0].multi_match.fields=["parents.TypeActivite"];  
            delete objectJson.query.bool.must[0].multi_match.analyzer;
            console.log(JSON.stringify(objectJson));
            xhttp.send(JSON.stringify(objectJson));  
        }else if(parent==3){
            objectJson.query.bool.must[0].multi_match.fields=["parents.NatureActivite"]; 
            delete objectJson.query.bool.must[0].multi_match.analyzer;
            console.log(objectJson);
            xhttp.send(JSON.stringify(objectJson));  
        }else if(parent==4 || parent==1){
            objectJson.query.bool.must[0].multi_match.fields=["parents.TypeAutorisation"];  
            delete objectJson.query.bool.must[0].multi_match.analyzer;
            console.log(objectJson);
            xhttp.send(JSON.stringify(objectJson));
        }else{
            xhttp.send(JSON.stringify(
                {
                "from":from,"size":4,
                  "min_score":3,
                  "query": {
                    "bool":{
                      "must": [{
                        "multi_match": {
                          "query": prefix,
                          "fields": ["tags.keywordsString"],
                          "analyzer": "rebuilt_french",
                          "fuzziness": "auto",
                          "minimum_should_match": "70%",
                          "boost": 0.5
                        }
                      },{
                        "match_phrase": {
                          "content.categorie": "intitulé activité"
                        }
                      }],"should": [
                        {"multi_match": {
                          "query": prefix,
                          "fields": ["tags.keywordSyn"],
                          "analyzer": "rebuilt_french",
                          "fuzziness": "auto",
                          "minimum_should_match": "70%",
                          "boost": 2
                          }},{
                        "multi_match":{
                            "query": prefix, 
                            "fields": ["content.intituleFr"],
                            "boost":4
                        }}
                      ]
                    }
                  }
                }
            ));
        }
        }
    }else if(typePage==1){
        if(prefix.trim()==""){
            xhttp.send(JSON.stringify(
                {
                    "from":from,"size":4,
                    "query": {
                             "match_all": {}
                            }
                }));
        }else{
       
        if(testLanguage.test(prefix)){
            xhttp.send(JSON.stringify(
                {
                    "from":from,"size":4,
                    "query": {
                        "bool": {
                            "must": [
                                { "multi_match": {
                                    "query": prefix,
                                    "fields": ["title","desc"],
                                    "analyzer": "rebuilt_arabic",
                                    "fuzziness": "AUTO",
                                    "minimum_should_match": "70%"
                                }}
                            ],
                            "should": [
                                {
                                    "match": {
                                        "title": prefix
                                    }
                                }
                            ]
                        }
                    }
                }
            ));
        }else{
            xhttp.send(JSON.stringify(
                {
                    "from":from,"size":4,
                    "query": {
                        "bool": {
                            "must": [
                                { "multi_match": {
                                    "query": prefix,
                                    "fields": ["title","desc"],
                                    "analyzer": "rebuilt_french",
                                    "fuzziness": "AUTO",
                                    "minimum_should_match": "70%"
                                }}
                            ],
                            "should": [
                                {
                                    "match": {
                                        "title": prefix
                                    }
                                }
                            ]
                        }
                    }
                }
            ));
        }
    }
    }else if(typePage==2){
        RestSearchFaq(prefix,0,2,0);
    }

    return result;
}

function generateRequestFaqSearch(prefix,type,from,size){
    
    if(prefix.trim()!=""){
        var str = "{ \"index\": \"faq_index\", \"type\": \"qr\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \""+prefix+"\",\"fields\": [\"QUESTIONS\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"70%\"}},{\"match_phrase\": {\"type\": \""+type+"\"}}]}}}\n";
    }else{
        var str ="{ \"index\": \"faq_index\", \"type\": \"qr\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\":{ \"match\":{ \"type\":\""+type+"\" }}}\n";
    }

    return str;
}

var faqPages = [1,1,1,1,1,1];
var faqGlobalPages = [1,1,1,1,1,1];
var totalFaqPages = [0,0,0,0,0,0];

function intializeFaqPages(){
    faqPages = [1,1,1,1,1,1];
    totalFaqPages = [0,0,0,0,0,0];
    faqGlobalPages = [1,1,1,1,1,1];
}

function generatePaginationFaqPage(index,prefix){
   $(".faq-fieldset .pagination-new-style").eq(index).html("");
    var p1 = document.createElement("div");
    p1.setAttribute("class","pagination-1");
    var icon1 = document.createElement("i");
    icon1.setAttribute("class","fas fa-angle-double-left");
    icon1.addEventListener("click",function(){
        if(faqGlobalPages[index]>1){
            faqGlobalPages[index]--;
            faqPages[index]=(faqGlobalPages[index]-1)*3+1;
            RestSearchFaq(prefix,(faqPages[index]-1)*2,2,(index+1));
        }
    });
    var icon2 = document.createElement("i");
    icon2.setAttribute("class","fas fa-angle-left");
    icon2.addEventListener("click",function(){
        if(faqPages[index]>1){
            faqPages[index]--;
            if(faqPages[index]%3==0){
                faqGlobalPages[index]--;    
            }
            RestSearchFaq(prefix,(faqPages[index]-1)*2,2,(index+1));
        }
    });
    var icon3 = document.createElement("i");
    icon3.setAttribute("class","fas fa-angle-right");
    icon3.addEventListener("click",function(){
        if(faqPages[index]<Math.ceil(totalFaqPages[index]/2)){
            faqPages[index]++;
            if(faqPages[index]%3==1){
                faqGlobalPages[index]++    
            }
            RestSearchFaq(prefix,(faqPages[index]-1)*2,2,(index+1));
        }
    });
    var icon4 = document.createElement("i");
    icon4.setAttribute("class","fas fa-angle-double-right");
    icon4.addEventListener("click",function(){
        if(faqGlobalPages[index]<Math.ceil(Math.ceil(totalFaqPages[index]/2)/3)){
            faqGlobalPages[index]++;
            faqPages[index]=(faqGlobalPages[index]-1)*3+1;
            RestSearchFaq(prefix,(faqPages[index]-1)*2,2,(index+1));
        }
    });

    var spanG = document.createElement("span");
    var span1 = document.createElement("span");
    span1.setAttribute("class","num-span");
    span1.innerHTML = faqPages[index];
    var span2 = document.createElement("span");
    span2.innerHTML = Math.ceil(totalFaqPages[index]/2);

    spanG.innerHTML+="Page ";
    spanG.appendChild(span1);
    spanG.innerHTML+=" Sur ";
    spanG.appendChild(span2);

    p1.appendChild(icon1);
    p1.appendChild(icon2);
    p1.appendChild(spanG);
    p1.appendChild(icon3);
    p1.appendChild(icon4);
 
    var p2 = document.createElement("div");
    p2.setAttribute("class","pagination-2");
    spanG = document.createElement("span");
    span1 = document.createElement("span");
    span1.setAttribute("class","num-span");
    span1.innerHTML = faqPages[index];
    span2 = document.createElement("span");
    span2.innerHTML = Math.min(2*faqPages[index],totalFaqPages[index]);
    var span3 = document.createElement("span");
    span3.innerHTML = totalFaqPages[index];
    spanG.innerHTML= "Page ";
    spanG.appendChild(span1);
    spanG.innerHTML += " - ";
    spanG.appendChild(span2);
    spanG.innerHTML +=" / ";
    spanG.appendChild(span3);
    p2.appendChild(spanG);

    $(".faq-fieldset .pagination-new-style").eq(index).append(p1);
    $(".faq-fieldset .pagination-new-style").eq(index).append(p2);

}


function RestSearchFaq(prefix,page,size,type){
    var str =""
    $(".faq-vbox .no-response-find").hide();
    
    if(type==0){
        $(".faq-fieldset").hide();
        str+=generateRequestFaqSearch(prefix,"DOCUMENT",page,size); 
        str+=generateRequestFaqSearch(prefix,"PLATEFORME",page,size); 
        str+=generateRequestFaqSearch(prefix,"GENERAL",page,size); 
        str+=generateRequestFaqSearch(prefix,"E-SIGN",page,size); 
        str+=generateRequestFaqSearch(prefix,"ARCHITECTE",page,size); 
        str+=generateRequestFaqSearch(prefix,"ADMINISTRATION",page,size);     
    }else if(type==1){
        str+=generateRequestFaqSearch(prefix,"DOCUMENT",page,size);
    }else if(type==2){
        str+=generateRequestFaqSearch(prefix,"PLATEFORME",page,size);               
    }else if(type==3){
        str+=generateRequestFaqSearch(prefix,"GENERAL",page,size); 
    }else if(type==4){
        str+=generateRequestFaqSearch(prefix,"E-SIGN",page,size); 
    }else if(type==5){
        str+=generateRequestFaqSearch(prefix,"ARCHITECTE",page,size); 
    }else if(type==6){
        str+=generateRequestFaqSearch(prefix,"ADMINISTRATION",page,size); 
    }

    if(type!=0){
        $(".faq-fieldset .full-search-list").eq(type-1).html("");
        $(".faq-fieldset .searchGif2").eq(type-1).show();
    }

    $.ajax({
        type: "post",
        //url: "http://localhost:9200/_msearch",
        url: URL_SEARCH+"/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data:str,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {    
            console.log(result);
            $(".searchGif").hide();
            $(".faq-fieldset .searchGif2").hide();        
            if(type!=0){
                fullCreateFaqByType(result.responses[0].hits.hits,type);
                generatePaginationFaqPage((type-1),prefix);
            }else if(type==0){
                var k = 0;
                
                for(var i=0;i<result.responses.length;i++){
                    if(result.responses[i].hits.hits.length!=0){
                        fullCreateFaqByType(result.responses[i].hits.hits,(i+1));
                        k++;
                    }
                    totalFaqPages[i]=result.responses[i].hits.total;
                    generatePaginationFaqPage(i,prefix);
                }

                if(k==0){
                    $(".faq-vbox .no-response-find").show();
                }
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })

}


function fullCreateFaqByType(results,type){
    $(".faq-fieldset").eq((Number(type)-1)).show();
    var a1 = document.querySelectorAll(".faq-fieldset .full-search-list")[(Number(type)-1)];
    a1.innerHTML="";
    for(i=0;i<results.length;i++){
        var id = results[i]._id;
        var titleTx = results[i]._source.QUESTIONS;
        var text = results[i]._source.REPONSES;
        var b = document.createElement("div");
        b.setAttribute("class","hp-box full-search-list-item");
        b.setAttribute("style","grid-template-columns: 100%;box-shadow: none;border: none;padding:0;height:145px;margin-bottom:25px;");
        var d = document.createElement("div");
        d.setAttribute("class","item-body");
        d.setAttribute("style","padding:0 18px");
        var e = document.createElement("div");
        e.setAttribute("class","item-body-title");
        e.setAttribute("style","font-size:16px");
        e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,100)+"</span>";
        var f = document.createElement("p");
        f.innerHTML = text;
        f.setAttribute("style","font-size: 14px;text-align:left");
        d.appendChild(e);
        d.appendChild(f);
        var g = document.createElement("a");
        g.addEventListener("click",function(){
        var id=$(this).children("input").val();
        //ApplicationManager.run("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
        });
        g.setAttribute("class","item-body-button");
        g.setAttribute("style","color:#38a;border: none;text-decoration: underline;font-size:13px;");
        g.innerHTML="Lire la suite ...<input type=\"hidden\" value=\""+id+"\" > ";
        d.appendChild(g);
        b.appendChild(d);
        a1.appendChild(b);
    }
}

//Create list of results
function searchList(results) {
    var x = document.getElementsByClassName("searchList")[0].getElementsByClassName("searchListD");
    var y = document.getElementsByClassName("result-item");
    console.log(y.length);
    var size = y.length;

    for (var i = 0; i < size; i++) {
        y[0].parentNode.removeChild(y[0]);
    }


    for (var j = 0; j < results.length; j++) {
        var b = document.createElement("div");
        var intituleFr = results[j]._source.content.intituleFr;
        var typeAc = checkUndefined(results[j]._source.parents["TypeActivité"]);
        var nature = checkUndefined(results[j]._source.parents["NatureActivité"]);
        var typeAt = checkUndefined(results[j]._source.parents["TypeAutorisation"]);
        
        b.setAttribute("class","list-group-item result-item");
        b.innerHTML="<span class=\"titleS\">"+intituleFr+" </span><span class=\"grid-item\" style=\"{color:red;display:none}\"> Score:"+results[j]._score+"</span>";
        //b.innerHTML+="<div class=\"titleS grid-item\" style=\"{float:right}\">"+results[j]._source.content.intituleAr+" </div>";
        /*
        b.innerHTML+="<div class=\"grid-item\"> <b>Nature d'activité :</b> "+results[j]._source.parents[0].content.intituleFr+"</div>";
        b.innerHTML+="<div class=\"grid-item\"> <b>Type d'activité :</b> "+results[j]._source.parents[1].content.intituleFr+"</div>";
        b.innerHTML+="<div class=\"grid-item\"> <b>Type d'autorisation :</b> "+results[j]._source.parents[2].content.intituleFr+"</div>";
        */
        b.innerHTML+="<p class=\"searchP\"><b>Nature d'activité :</b> "+nature+"<b> Type d'activité :</b> "+typeAc+"<b> Type d'autorisation :</b> "+typeAt+"</p>"
        b.addEventListener("click", function(e) {
            console.log("go to model");
        });
        
        x[0].appendChild(b);
    }
}


function autocompleteF(inp,arr,val,type){
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
   if(type){
    console.log(type);   
    inp.parentNode.parentNode.appendChild(a);   
   }else{
    console.log(type);   
    inp.parentNode.appendChild(a);
   }
    
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        var b = document.createElement("DIV");
        /*make the matching letters bold:*/
        var str = arr[i];
        
        console.log(val+"  "+str+" "+addSpansHL(val,str));
        b.innerHTML=addSpansHL(val,str);
        
        /*insert a input field that will hold the current array item's value:*/
        var input = document.createElement("input");
        input.setAttribute("type","hidden");
        input.setAttribute("value",str);
        b.appendChild(input);
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
    }
}


function autocomplete(inp,arr) {
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        if (!val) {
            closeAllLists();
            return false;
        }
        currentFocus = -1;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        restAutoComplete(inp,val);

    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        console.log(x.length);

        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    
    
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        console.log(currentFocus);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        console.log(currentFocus);
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
            for(var k=0;k<x[i].getElementsByTagName("span").length;k++)
            x[i].getElementsByTagName("span")[k].classList.remove("span-active");
        }
    }
}
    function addActive(x) {
        console.log(currentFocus);
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
        for(var k=0;k<x[currentFocus].getElementsByTagName("span").length;k++)
        x[currentFocus].getElementsByTagName("span")[k].classList.add("span-active");

    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
            for(var k=0;k<x[i].getElementsByTagName("span").length;k++)
            x[i].getElementsByTagName("span")[k].classList.remove("span-active");
        }
    }

    function moveKey(e,x,type){
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }else{
                console.log(currentFocus);
                if(type==0){
                    $(".divSearchBar .search_button").click();    
                }else{
                    $(".div-full-search-bar .search_button").click();                        
                }
                
            }
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i]) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
        currentFocus=-1;
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });

    $(".searchListD .fa-bars").click(function(){
                   var valu = $(this).parent().children(".details").html();
                    $(".acticiteModel .modal-content").html(valu);
                    modal.style.display = "block";
    });

    function createPaginationBar(nbrPage,begin,prefix,type,prev){
        var p = $(".pagination");
        p.html(" ");
        var a = document.createElement("a");
                a.innerHTML="<i class=\"fas fa-angle-double-left\"></i>";
                a.addEventListener("click",function(){
                    console.log("!next");
                    previousPage(prefix,type);
                    event.preventDefault();
                });
                p.append(a);

        for(var i=begin;i<nbrPage;i++){
            if(i==begin){
                a = document.createElement("a");
                a.innerHTML=begin+1;
                if(prev==false){
                    a.setAttribute("class","active");                
                }
                a.addEventListener("click",function(){
                    event.preventDefault();
                    console.log("1");
                    getPage(begin+1,prefix,type,false);
                });
        
                p.append(a);
            }else{
                a = document.createElement("a");
                if(prev==true && i==nbrPage-2){
                  a.setAttribute("class","active");
                }
                var j=i+1;
                a.innerHTML=(j);
                a.addEventListener("click",function(event){
                    event.preventDefault();
                    console.log(this.innerHTML+" "+prefix+" "+type);
                    getPage(this.innerHTML,prefix,type,false);
                });
                p.append(a);        
            }
        }
        a = document.createElement("a");
        a.innerHTML="<i class=\"fas fa-angle-double-right\"></i>";
       a.addEventListener("click",function(){
           event.preventDefault();
            console.log("next");
            nextPage(prefix,type);
       });        
        p.append(a);
    }


    function nextPage(prefix,type){
        if(currentPage<totalPage){
            currentPage++;
            getPage(currentPage,prefix,type,false);
        }
    }

    function previousPage(prefix,type){
        if(1<currentPage){
            currentPage--;
            if(currentPage<((currentLPage-1)*10)){
                getPage(currentPage,prefix,type,true);
            }else{
                getPage(currentPage,prefix,type,false); 
            }
        }
        
    }

    function getPage(page,prefix,type,prev){
        currentPage=page;
        closeSearchList();
        if(type==0){
            restSearchList(prefix,(page-1)*4,prev); 
            var elm = $(".searchList .pagination a");
        }else{
            restFullSearchList(prefix,(page-1)*4,prev,p);
            var elm = $(".pagination-second a");
        }
        if(prev==true){
            currentLPage--;
        }
        activePageBar(elm);
    }

    function activePageBar(elm){
        elm.removeClass("active");
        var cpage = 0;
        if(currentLPage==1){
            cpage=currentPage;
        }else{
            cpage=currentPage-(10*(currentLPage-1))+1;
            console.log(cpage+" "+currentLPage+" "+currentPage);
        }
        elm.get(cpage).setAttribute("class","active");;
    }

    function closeSearchList(){
        $(".searchList .searchListD").html("<div class=\"searchGif\"><img src=\"img/search-move.gif\" /></div>");
    }

    function getTimeCounter(){
        var start = new Date();
        chrono();
    }

    function stopChrono(){
        var second = msecc/1000;
        document.getElementsByClassName("searchList")[0].getElementsByClassName("nbrRes")[0].getElementsByTagName("span")[1].innerHTML=second;
    }

    function chrono(){
	       end = new Date()
	       diff = end - start
	       diff = new Date(diff)
	       var msec = diff.getMilliseconds()
	       var sec = diff.getSeconds()
	       var min = diff.getMinutes()
	       var hr = diff.getHours()-1
            if (min < 10){
                min = "0" + min
            }
            if (sec < 10){
                sec = "0" + sec
            }
            if(msec < 10){
                msec = "00" +msec
            }
            else if(msec < 100){
                msec = "0" +msec
            }
            msecc = msec;
            console.log(msecc+"*******"+msec);
	        timerID = setTimeout("chrono()", 10)
        }

    function checkUndefined(text){
        if(text == undefined){
            return "";
        }
        return text;
    }

   function loadPageBytype(type){
       typePage = type;
   } 

   function fullSearchList(results){
       var a = document.querySelector(".full-search-list");
       if(typePage== 1){
        for(i=0;i<results.length;i++){
            var id = results[i]._id;
            var titleTx = results[i]._source.title;
            var text = results[i]._source.desc;
            var type = results[i]._source.type;
            if(type=="1"){
                type="ÉCONOMIQUE";
            }else{
                type="URBANISME";
            }
            var b = document.createElement("div");
            b.setAttribute("class","hp-box full-search-list-item");
            b.setAttribute("style","grid-template-columns: 0% 100%;height: 173px;")
            var d = document.createElement("div");
            d.setAttribute("class","item-body");
            d.setAttribute("style","padding:0 40px");
            var e = document.createElement("div");
            e.setAttribute("class","item-body-title");
            e.setAttribute("style","font-size:16px");
            e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,100).toUpperCase()+"</span>";
            var f = document.createElement("p");
            f.innerHTML = subLong(text,200);
            f.setAttribute("style","font-size: 0.955vw;text-align: left;width: 100%;color: #777;")
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("a");
            g.addEventListener("click",function(){
                var id=$(this).children("input").val();
                //ApplicationManager.run("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
            });
            g.setAttribute("class","item-body-button");
            g.setAttribute("style","color:#38a;border: none;text-decoration: underline;");
            g.innerHTML="Texte intégral<input type=\"hidden\" value=\""+id+"\" > ";
            d.appendChild(g);
            var title = document.createElement("div");
            title.setAttribute("class","item-title");
            title.setAttribute("title",type);
            var style = "line-height:30px;top: 51px;height: 30px;right: 92px;";

            if(type=="URBANISME"){
                style+="background:#38a";
            }else if(type=="INVESTISSEMENT"){
                style+="background:#f90";
            }else if(type=="ÉCONOMIQUE"){
                style+="background:#363";
            }

            title.setAttribute("style",style);
            title.innerHTML=subLong(type);
            b.appendChild(title);
            b.appendChild(d);
            a.appendChild(b);
        }
       }else if(typePage == 2){
           var a1 = document.querySelectorAll(".faq-fieldset .full-search-list")[0];
           var a2 = document.querySelectorAll(".faq-fieldset .full-search-list")[1];
            for(i=0;i<results[0].content.length;i++){
                var id = results[0].content[i]._id;
                var titleTx = results[0].content[i].question;
                var text = results[0].content[i].response;
                var b = document.createElement("div");
                b.setAttribute("class","hp-box full-search-list-item");
                b.setAttribute("style","grid-template-columns: 100%;box-shadow: none;border: none;padding:0;height:145px;margin-bottom:25px;");
                var d = document.createElement("div");
                d.setAttribute("class","item-body");
                d.setAttribute("style","padding:0 18px");
                var e = document.createElement("div");
                e.setAttribute("class","item-body-title");
                e.setAttribute("style","font-size:16px");
                e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,100)+"</span>";
                var f = document.createElement("p");
                f.innerHTML = text;
                f.setAttribute("style","font-size: 14px;text-align:left");
                d.appendChild(e);
                d.appendChild(f);
                var g = document.createElement("a");
                g.addEventListener("click",function(){
                var id=$(this).children("input").val();
                //ApplicationManager.run("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
                });
                g.setAttribute("class","item-body-button");
                g.setAttribute("style","color:#38a;border: none;text-decoration: underline;font-size:13px;");
                g.innerHTML="Lire la suite ...<input type=\"hidden\" value=\""+id+"\" > ";
                d.appendChild(g);
                b.appendChild(d);
                a1.appendChild(b);
            }

            for(i=0;i<results[1].content.length;i++){
                var id = results[1].content[i]._id;
                var titleTx = results[1].content[i].question;
                var text = results[1].content[i].response;
                var b = document.createElement("div");
                b.setAttribute("class","hp-box full-search-list-item");
                b.setAttribute("style","grid-template-columns: 100%;box-shadow: none;border: none;padding:0;height:145px;margin-bottom:25px;");
                var d = document.createElement("div");
                d.setAttribute("class","item-body");
                d.setAttribute("style","padding:0 18px");
                var e = document.createElement("div");
                e.setAttribute("class","item-body-title");
                e.setAttribute("style","font-size:16px");
                e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,100)+"</span>";
                var f = document.createElement("p");
                f.innerHTML = text;
                f.setAttribute("style","font-size: 14px;text-align:left;");
                d.appendChild(e);
                d.appendChild(f);
                var g = document.createElement("a");
                g.addEventListener("click",function(){
                var id=$(this).children("input").val();
                //ApplicationManager.run("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
                });
                g.setAttribute("class","item-body-button");
                g.setAttribute("style","color:#38a;border: none;text-decoration: underline;font-size:13px;");
                g.innerHTML="Lire la suite ...<input type=\"hidden\" value=\""+id+"\" > ";
                d.appendChild(g);
                b.appendChild(d);
                a2.appendChild(b);
            }

       }else{
       for(i=0;i<results.length;i++){
           console.log(results[i]);
           var id = results[i]._id;
           var intituleFr = results[i]._source.content.intituleFr;
           var intituleAr = results[i]._source.content.intituleAr;
           var typeAc = checkUndefined(results[i]._source.parents["TypeActivite"]);
           var nature = checkUndefined(results[i]._source.parents["NatureActivite"]);
           var typeAt = checkUndefined(results[i]._source.parents["TypeAutorisation"]);
           var typeAG="Activités économiques";
           var setting = getColIcon(typeAt);
           var b = document.createElement("div");
           b.setAttribute("class","hp-box full-search-list-item");
           b.setAttribute("style","height: 173px;");
           var c = document.createElement("div");
           c.setAttribute("class","c-path");
          // c.innerHTML="<span class=\"p p1\">"+typeAG+"</span>"+"<span class=\"cl-orange\"> > </span> <span class=\"p p2\">"+typeAc+"</span><span class=\"cl-orange\"> > </span> <span class=\"p p3\">"+nature+"</span>";
           var s = document.createElement("span");
           s.setAttribute("class","cl-orange");
           s.innerHTML=" > ";
           c.appendChild(addEventSpan("p1",typeAt));
           c.appendChild(s);
           // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
           c.appendChild(addEventSpan("p2",typeAc));
           s = document.createElement("span");
           s.setAttribute("class","cl-orange");
           s.innerHTML=" > ";
           c.appendChild(s);
           // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
           c.appendChild(addEventSpan("p3",nature));
           var d = document.createElement("div");
           d.setAttribute("class","item-body");
           var e = document.createElement("div");
           e.setAttribute("class","item-body-title");
           e.innerHTML="<span title=\""+intituleFr+"\">"+subLong(intituleFr,60)+"</span>";
           e.innerHTML+="<span class=\"complete-text\">"+intituleFr+"</span>";
           var f = document.createElement("p");
           //f.innerHTML= "Etablissement dispensant des cours de stylisme et modélisme de vêtements modernes ou traditionnels. Etablissement dispensant des cours de stylisme et modélisme de ...";
           f.innerHTML = intituleAr;
           d.appendChild(c);
           d.appendChild(e);
           d.appendChild(f);
           var g = document.createElement("button");
           g.setAttribute("style","display:none;")
           g.addEventListener("click",function(){
               var id=$(this).children("input").val();
               ApplicationManager.run("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
           });
           g.setAttribute("class","item-body-button hp-sbox-btn");
           g.innerHTML="Détails<input type=\"hidden\" value=\""+id+"\" > ";
           d.appendChild(g);
           var title = document.createElement("div");
           title.setAttribute("class","item-title");
           title.setAttribute("style","background:"+setting.color);
           title.setAttribute("title",typeAt);
           title.innerHTML=subLong(typeAt);
           title.addEventListener("click",function(){
               currentPage=0;
               $(".div-full-search-bar .hp-search_field input").val($(this).attr("title").toLowerCase());
               restFullSearchList($(this).html(),0,false,4);
           });
           b.appendChild(title);
           var icons = document.createElement("div");
           icons.setAttribute("class","item-icon");
           icons.innerHTML="<i class=\"far fa-file-image\" /><i class=\""+setting.icon+"\" />";
           b.appendChild(icons);
           b.appendChild(d);
           a.appendChild(b);
       }
    }
   }


    function subLong(text,max){
        if(text.length>max){
            return text.substring(0,max-6)+"<span class=\"dot-3\">...</span>";
        }
        return text;
    }

    function addEventSpan(spanClass,text){
        var span = document.createElement("span");
        span.setAttribute("class","p "+spanClass);
        span.addEventListener("click",function(){
            currentPage=0;
           $(".div-full-search-bar .hp-search_field input").val($(this).html().toLowerCase());
                if($(this).attr("class").split(' ')[1]==="p1"){
                    restFullSearchList($(this).html(),0,false,1);
                }else if($(this).attr("class").split(' ')[1]==="p2"){
                    restFullSearchList($(this).html(),0,false,2);
                }else if($(this).attr("class").split(' ')[1]==="p3"){
                    restFullSearchList($(this).html(),0,false,3);
                }else{
                   restFullSearchList($(this).html(),0,false,1);
                } 
        });
        span.innerHTML=text;
        return span;
    }
    

    function highlights(request,result){
        var hl ="";
        var resultUp = result;
        var positionsBegin=[];
        var positionsEnd=[];
        var positions = [new Array(),new Array()];  
  
        var j=0;
        var reqsplit = removeLastSpace(request).split(" ").sort(function(a, b){return b.length - a.length;});
        var existreq = [];
  
        for(var i=0;i<reqsplit.length;i++){
          var word = reqsplit[i];
          var pos = hasNext(word,result,-1);
          while(pos!=-1){
            if(checkPrefix(positions,pos,pos+word.length).pos===-1){
              positions[0].push(pos);
              positions[1].push(pos+word.length);
              
            }else if(checkPrefix(positions,pos,pos+word.length).type==true){
                  var posEx = checkPrefix(positions,pos,pos+word.length).pos;
                  positions[0][posEx]= Math.min(pos,positions[0][posEx]);
                  positions[1][posEx]= Math.max(positions[1][posEx],pos+word.length);
            }
             pos = hasNext(word,result,pos);
          }
        }
     return [positions[0].sort(function(a, b) {return a - b;}),positions[1].sort(function(a, b) {return a - b;})];
    } 
    



      function hasNext(word,result,posNext){
        var pos = posNext;
        pos = result.indexOf(word,posNext+1);
        return pos;
      }

    function checkPrefix(positions,posB,posE){
        var pos = -1;
        var type = null;
        for(var i=0;i<positions[0].length;i++){
          
          if((posB>=positions[0][i] & posE<=positions[1][i])){
            pos = i;
            type=false;
            return {"pos":pos,"type":type};
          }else if((posB<=positions[0][i] & posE<=positions[0][i])||(posB>=positions[1][i] & posE>=positions[1][i])){
            pos = -1;
            type=false;
          }else{
            pos = i;
            type=true;
            return {"pos":pos,"type":type};
          }
        }
        return {"pos":pos,"type":type};
    }

    function addSpansHL(request,result){
        var hl="";
        var posArray = highlights(request,result);
        var nbrPos = posArray[0].length;
        
      
            hl+=result.substring(0,posArray[0][0]);
      for(var i=0;i<nbrPos-1;i++){
        	hl+="<span>";
            hl+=result.substring(posArray[0][i],posArray[1][i]);
            hl+="</span>";
            hl+=result.substring(posArray[1][i],posArray[0][i+1]);
        }

        hl+="<span>";
        hl+=result.substring(posArray[0][nbrPos-1],posArray[1][nbrPos-1]);
        hl+="</span>";
        hl+=result.substring(posArray[1][nbrPos-1]);
        return hl;
    }
    
    function removeLastSpace(request){
    	if(request.lastIndexOf(" ")==request.length-1){
        	 return removeLastSpace(request.substring(0,request.length-1));	
        }
    	return request;
    }


     function checkExistReq(word,tab){
        var exist =0;
        for(var i=0;i<tab.length;i++){    
            if(word===tab[i]){
                exist++;
            }
        }
        return exist;
    }

    function checkIsPrefix(word,tab){
      var exist =0;
      for(var i=0;i<tab.length;i++){
        if(tab[i].indexOf(word)!=-1){
                exist++;
            }
      }
      return exist;
    }

    function getObject(id){
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(id);    
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response);
            rempl(JSON.parse(xhttp.response));
            $(".div-fsb-details .search-details-icon").hide();
            $(".div-fsb-details .fsb-container").show();
            
        }
    };
   // xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    xhttp.open("GET",URL_SEARCH+"/activite_economique/activite/"+id);
    xhttp.setRequestHeader("Authorization",AUTH);
    xhttp.send();

        return ; 
     }

function rempl(results){
        var id = results._id;
        var intituleFr = results._source.content.intituleFr;
        var typeAc = checkUndefined(results._source.parents["TypeActivité"]);
        var nature = checkUndefined(results._source.parents["NatureActivité"]);
        var typeAt = checkUndefined(results._source.parents["TypeAutorisation"]);
        var typeAG="Activités économiques";
        
        $(".div-fsb-details .vpanel-title .title-2x").html(intituleFr);
        $(".div-fsb-details .details-body .title-4x").html(intituleFr);
        $(".div-fsb-details .fsb-container .c-path .p1").html(typeAG);
        $(".div-fsb-details .fsb-container .c-path .p2").html(typeAc);
        $(".div-fsb-details .fsb-container .c-path .p3").html(nature);
}

function noResults(){
    var a = document.createElement("div");
    a.setAttribute("style","text-align: left;width: 50;margin: auto;width: 60%;");
    a.innerHTML="Aucune activité ne correspond aux termes de recherche spécifiés.<br/><br/>Suggestions :<br/>- Vérifiez l’orthographe des termes de recherche.<br/>- Essayez d'autres mots.<br/>- Utilisez des mots clés plus généraux.";
    document.getElementsByClassName("full-search-list")[0].appendChild(a);
}





/*feature etat d'avancement dossier*/
var URL_WS_1 = "http://urbarokhas.karaz.org:8080";
var URL_WS_SEARCH_ALL_AUTORISATION = URL_WS_1+"/karazortal/access/rest/kdata/search/cug_cri_urbanisme_autorisation_search_AllAutorisationConstruction";
var URL_WS_KDATA_OBJECT = URL_WS_1+"/karazortal/access/rest/kdata/object/karazapps.cug.cri.urbanisme.autorisation.model.AutorisationConstruction/";


function getFolderId(ref,cin){
    $(".relative-position .last-log .loadGif").show();
    $.ajax({
        type: "get",
        url: URL_WS_SEARCH_ALL_AUTORISATION+"?query.reference="+ref.trim().toUpperCase()+"&query.mocinrc="+cin+"&apiKey=AB90G-BH903-W4EE1-Z66Q9-7822K&offset=0&limit=10&sortInfo=id=ASC",
        datatype: "application/json",
        success: function (result) { 
            console.log(result);
            var newArray = transformFolder2Array(result.data);
            var index = newArray[1].indexOf(ref.trim().toUpperCase());
            if(index!=-1 && ref.trim()!=""){
                $(".folder-feature-body .folder-steps .no-response").hide();
                getFolder(newArray[0][index],ref.trim().toUpperCase());
            }else{
                $(".relative-position .last-log .loadGif").hide();
                $(".folder-feature-body .folder-steps .no-response").show();
                $(".folder-feature .folder-feature-body .progressbar").html("");
                if(testWidth($(window).width(),640)){
                    $(".folder-feature").find("div:not(.no-response)").show("fast");
                    $(".folder-feature").animate({'width':'show'},function(){});
                }else{
                    $(".folder-feature").find("div:not(.no-response)").show("fast");
                    $(".folder-feature").slideDown();
                }
            }
        },
        error: function(error){

        }
    });
}

function getFolder(id,ref){
    $.ajax({
        type: "get",
        url: URL_WS_KDATA_OBJECT+id+"?processStates=true&apiKey=AB90G-BH903-W4EE1-Z66Q9-7822K",
        datatype: "application/json",
        success: function (result) {
            console.log(result); 
            var array1 = arrayHistoricGenrated(result.historic);
            var array2 = refrechArrayHistoriques(array1);
            console.log(array2[0][0].length);
            if(array2[0][0].length>10){
                array2[0][0] = array2[0][0].splice(array2[0][0].length-10,array2[0][0].length);
                array2[0][1] = array2[0][1].splice(array2[0][1].length-10,array2[0][1].length);
                array2[0][2] = array2[0][2].splice(array2[0][2].length-10,array2[0][2].length);
            }

            arrayHistoricGenratedDiv(array2[0],ref);
            if(testWidth($(window).width(),640)){
                $(".folder-feature").find("div:not(.no-response)").show("fast");
                $(".folder-feature").animate({'width':'show'},function(){});
            }else{
                $(".folder-feature").find("div:not(.no-response)").show("fast");
                $(".folder-feature").slideDown();
            }
            $(".relative-position .last-log .loadGif").hide();

        },
        error: function(error){
            console.log(error);
        }
    });
}

function testExactFolder(ref,newRef){
    if(ref==newRef){
        return true;
    }else{
        return false;
    }
}

function createFolderStatus(array){
    for(var i=0;i<array.length;i++){
        console.log(array[i]);
    }
}

function transformFolder2Array(result){
    var newArray = [[],[]];
    
    for(var i=0;i<result.length;i++){
        newArray[0].push(result[i].id);
        newArray[1].push(result[i].stringIndex1);
    }

    return newArray;
}


function arrayHistoricGenratedDiv(historiques,ref){

    var divGlo = $(".folder-feature .folder-feature-body .progressbar");
    divGlo.html("");
    $(".folder-feature .folder-feature-header div span").html(ref);

    var proc = 100/historiques[0].length;

    for(var i=0;i<historiques[0].length;i++){
        var label = historiques[0][i];
        var date = historiques[1][i];
        var status = historiques[2][i];
        var li = document.createElement("li");
        li.setAttribute("style","width:"+(proc-1)+"%");
        if(status =="done"){
            li.setAttribute("class","bf-active");
            li.innerHTML= "<span class=\"step-title\">"+label+"</span><span class=\"step-date\">"+date.split(" ")[0]+"</span>";
        }else if(status =="active"){
            li.setAttribute("class","active");
            li.innerHTML= "<span class=\"step-title\">"+label+"</span><span class=\"step-date\"></span>";
        }else{
            li.setAttribute("class","");
            li.innerHTML= "<span class=\"step-title\">"+label+"</span><span class=\"step-date\"></span>";
        }
        divGlo.append(li);        
    }
}

function arrayHistoricGenrated(historiques){
    var generatedArray = [[],[],[],[]];
    var object = 1;

    for(var i=0;i<historiques.length;i++){
      var index = generatedArray[0].indexOf(historiques[i].LABEL.replace(/V[0-9]+/g,"").trim().toLowerCase())
      
      if(index!=-1){
        
        
        if(stringToDate( historiques[i].START_TIME) >= stringToDate(generatedArray[1][index])){
          if(index==0){
            object++;
          } 
           generatedArray[1][index]=historiques[i].START_TIME;
           generatedArray[2][index]=historiques[i].STATUS;
           generatedArray[3][index]=object;          
        }
        
      }else{
        generatedArray[0].push(historiques[i].LABEL.replace(/V[0-9]+/g,"").trim().toLowerCase());
        generatedArray[1].push(historiques[i].START_TIME);
        generatedArray[2].push(historiques[i].STATUS);
        generatedArray[3].push(object);
      }
    }

    return generatedArray;
}


function stringToDate(str){
  if(str==""){
    return new Date();
  }
  var timeSplit = str.split(" ");
  var date = timeSplit[0];
  var dateSplit = date.split("/");
  var hourSplit = timeSplit[1].split(":");

  return new Date(dateSplit[2],dateSplit[1],dateSplit[0],hourSplit[0],hourSplit[1],hourSplit[2],0);
}

function refrechArrayHistoriques(hist){
  var objects = [];
  var indexs= [];
  var index =0;
  for(var i=0;i<hist[3].length;i++){
    if(indexs.indexOf(hist[3][i])==-1){
      indexs.push(hist[3][i]);
      var obj = [[],[],[]];
      obj[0].push(hist[0][i]);
      obj[1].push(hist[1][i]);
      obj[2].push(hist[2][i]);
      objects.push(obj);
    }else{
      objects[indexs.indexOf(hist[3][i])][0].push(hist[0][i]);
      objects[indexs.indexOf(hist[3][i])][1].push(hist[1][i]);
      objects[indexs.indexOf(hist[3][i])][2].push(hist[2][i]);
      
    }
  }
  return objects;
}

function getColIcon(typeAut){
    var tabAct = ["simple déclaration","établissement classé","occupation domaine public","activité courante"];
    var tabActc = ["autorisations urbanisme","permis de construire","permis d'habiter","réceptions","démolition","régularisation","réfection","dérogation aux documents d’urbanisme"];
    var tabColor1 = ["#38a","#36a048","#712ea4","#cd4141"];
    var tabColor2 = ["#c5bb48","#c5bb48","#c5bb48","#c5bb48","#c5bb48","#c5bb48","#c5bb48","#c5bb48"];
    var tabIcon = ["fas fa-cogs","fas fa-building"];
    if(typeAut==undefined){
        typeAut = "";
    }

    console.log(typeAut);
    
    if(tabAct.indexOf(typeAut.toLowerCase())!= -1){
        var color = tabColor1[tabAct.indexOf(typeAut.toLowerCase())];
        var icon = tabIcon[0];
        var inde = 1;
    }else if(tabActc.indexOf(typeAut.toLowerCase())!= -1){
        var color = tabColor2[tabActc.indexOf(typeAut.toLowerCase())];
        var icon = tabIcon[1];
        var inde = 2;

    }else{
        var color="#38a";
        var icon ="fas fa-cogs";
        var inde = 3;
    }   
    
    return {
        color:color,
        icon:icon,
        type:inde
    }
}