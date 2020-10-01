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

var AUTH = "";
var ADMIN_AUTH = "" ;
var URL_SEARCH = contextPath+"/kas/DataSynchronise";
// var URL_SEARCH+"?operation=wselastic&shortUrl=" = "http://elasticformation.karaz.org:9200";
var URL_COMMUNE = "https://sr3urba.rokhas.ma/karazortal/access/rest/kdata/search/referentiel_localite_search_AllLocalite?query.decoupageDesc.description=ROKHAS&query.typeloc=commune/arrondissement&apiKey=AB90G-BH903-W4EE1-Z66Q9-7822K&offset=0&limit=1&sortInfo=id=ASC";
var URL_WS_1 = "https://sr3urba.rokhas.ma";
var URL_WS_SEARCH_ALL_AUTORISATION = URL_WS_1+"/karazortal/access/rest/kdata/search/cug_cri_urbanisme_autorisation_search_AllAutorisationConstruction";
var URL_WS_KDATA_OBJECT = URL_WS_1+"/karazortal/access/rest/kdata/object/karazapps.cug.cri.urbanisme.autorisation.model.AutorisationConstruction/";
var URL_WS_FE = "https://sr3urba.rokhas.ma";
var URL_WS_FE2 = "https://bkp.rokhas.ma";
var autListId = [
{
"url":URL_WS_FE+"/karazortal/access/rest/kdata/search/cug_cri_urbanisme_autorisation_search_AllAutorisationConstruction",
"apiKey":"AB90G-BH903-W4EE1-Z66Q9-7822K",
"url_id":URL_WS_FE + "/karazortal/access/rest/kdata/object/karazapps.cug.cri.urbanisme.autorisation.model.AutorisationConstruction",
},
{
"url":URL_WS_FE + "/karazortal/access/rest/kdata/search/urbanisme_permishabiter_search_AllPermishabiterHabitation",
"apiKey":"AB90G-BH903-W4EE1-Z66Q9-7822K",
"url_id":URL_WS_FE + "/karazortal/access/rest/kdata/object/karazapps.urbanisme.permishabiter.model.PermishabiterHabitation"
},
{
"url":URL_WS_FE2 + "/karazortal/access/rest/kdata/search/autorisations_autorisationafp_search_AllAutorisationAFP",
"apiKey":"AB90G-BH903-W4EE1-Z66Q9-7822K",
"url_id":URL_WS_FE2 + "/karazortal/access/rest/kdata/object/karazapps.autorisations.autorisationafp.model.AutorisationAFP"
},
{
"url":URL_WS_FE2 + "/karazortal/access/rest/kdata/search/autorisations_autorisationec_search_AllAutorisationEC",
"apiKey":"AB90G-BH903-W4EE1-Z66Q9-7822K",
"url_id":URL_WS_FE2 + "/karazortal/access/rest/kdata/object/karazapps.autorisations.autorisationec.model.AutorisationEC"
},
{
"url":URL_WS_FE2 + "/karazortal/access/rest/kdata/search/autorisations_autorisationoan_search_AllAutorisationOAN",
"apiKey":"AB90G-BH903-W4EE1-Z66Q9-7822K",
"url_id":URL_WS_FE2 + "/karazortal/access/rest/kdata/object/karazapps.autorisations.autorisationoan.model.AutorisationOAN"
},{
"url":URL_WS_FE2 + "/karazortal/access/rest/kdata/search/autorisations_autorisationodp_search_AllAutorisationODPTelecom",
"apiKey":"AB90G-BH903-W4EE1-Z66Q9-7822K",
"url_id":URL_WS_FE2 + "/karazortal/access/rest/kdata/object/karazapps.autorisations.autorisationodp.model.AutorisationODP"
},{
"url":URL_WS_FE2 + "/karazortal/access/rest/kdata/search/autorisations_autorisationsd_search_AllAutorisationSD",
"apiKey":"AB90G-BH903-W4EE1-Z66Q9-7822K",
"url_id":URL_WS_FE2 + "/karazortal/access/rest/kdata/object/karazapps.autorisations.autorisationsd.model.AutorisationSD"
}

];


function removeLastRootPage(userName){
var rootElms = $("#root-content-frame-manager .ow-cfm .ow-cfm-core > div.navigation-multiTab");
if(rootElms.length>1 && userName=="Guest"){
var elm = rootElms.eq(rootElms.length-2);
elm.remove();        
}else{

}

}


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
xhttp.open("POST",URL_SEARCH+"?operation=wselastic&shortUrl="+"/completion_index/completionTerm/_search");
xhttp.setRequestHeader("Authorization",AUTH);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
if(prefix.length>=3){
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
}

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
var articles = [];
var faqs = [];


function removeFullListSearch(cls,target){
target.find("."+cls+" .full-search-list").html("");
}

function testWidth(width,nbr){
return width > nbr;
}
 
function htmlEncode(str){
    return String(str).replace(/[^\w. ]/gi, function(c){
       return '&#'+c.charCodeAt(0)+';';
    }).replace("javascript:","");
}

//Search results and redirect to activity model
function restFullSearchList(prefix,from,prev,parent,cls,target) {
    prefix = htmlEncode(prefix);  

var result = [];
var xhttp = new XMLHttpRequest();
removeFullListSearch(cls,target);
target.find("."+cls+" .searchGif").show();
target.find("."+cls+" .no-result-v").hide();


typePage = Number(cls.split("-")[1]);
var sizeliste = 4;

if(typePage==0 || typePage==80 || typePage==1 ){
    sizeliste = 6;
} 


xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
removeFullListSearch(cls,target);
var res = JSON.parse(this.responseText);
for(var i=0;i<res.hits.hits.length;i++){
    result.push(res.hits.hits[i]);
}

console.log("typePage :"+typePage);

if(typePage!=1 && typePage !=2){
    target.find(".div-full-search-bar .hp-sbox-text span.total").html(res.hits.total.value);
    target.find(".div-full-search-bar .hp-sbox-text span.prefix").html(prefix);
}

target.find("."+cls+" .searchGif").hide();

if(typePage==1){
    if(currentPage==0){
        totalPage = Math.ceil(res.hits.total.value/sizeliste);
        createPaginationBar({nbrPage:Math.min(totalPage,10),begin:0,prefix:prefix,type:1,prev:false,cls:cls,target:target,parent:parent,size:sizeliste});
        if(totalPage!=0){
            currentPage=1;
            currentLPage=1;
        }
    }else if(currentPage%10==0){
        currentLPage = (currentPage/10)+1;
        console.log("begin: "+currentPage+"lpage: "+currentLPage);
        createPaginationBar({nbrPage:Number(Math.min(10,totalPage-currentPage))+Number(currentPage),begin:currentPage-1,prefix:prefix,type:1,prev:false,cls:cls,target:target,parent:parent,size:sizeliste});
    }else if(prev==true){
        createPaginationBar({nbrPage:currentPage+1,begin:Math.max(0,(Number(currentPage))-10),prefix:prefix,type:1,prev:true,cls:cls,target:target,parent:parent,size:sizeliste});
    }
}else{
    if(currentPage==0){
    totalPage = Math.ceil(res.hits.total.value/sizeliste);
    createPaginationBar({nbrPage:Math.min(totalPage,10),begin:0,prefix:prefix,type:1,prev:false,cls:cls,target:target,parent:parent,size:sizeliste});
    if(totalPage!=0){
        currentPage=1;
        currentLPage=1;
    }
}else if(currentPage%10==0){
    currentLPage = (currentPage/10)+1;
    console.log("begin: "+currentPage+"lpage: "+currentLPage);
    createPaginationBar({nbrPage:Number(Math.min(10,totalPage-currentPage))+Number(currentPage),begin:currentPage-1,prefix:prefix,type:1,prev:false,cls:cls,target:target,parent:parent,size:sizeliste});
}else if(prev==true){
    createPaginationBar({nbrPage:currentPage+1,begin:Math.max(0,(Number(currentPage))-10),prefix:prefix,type:1,prev:true,cls:cls,target:target,parent:parent,size:sizeliste});
}}


if (totalPage == 0 && typePage ==0) {
    noResults(cls);
}else if( typePage==1){
    if(result.length==0){
        target.find("."+cls+" .no-result-v").show();
    }
    fullSearchList(result,cls,typePage,target);
}else if( typePage==2){
    fullSearchList(faqs,cls,typePage,target);
}else if(typePage==80){
    if(result.length==0){
        target.find("."+cls+" .no-result-v").show();
    }
    fullSearchList(result,cls,typePage,target);
}else{
    fullSearchList(result,cls,typePage,target);
}        

var pos = $(".Header-signup").offset().top+50;
$('html,body').animate({
        scrollTop: pos
},
1000);
}
};
//   xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
var index = "";   
if(typePage==0){
xhttp.open("POST",URL_SEARCH+"?operation=wselastic&shortUrl="+"/activite_economique/activite/_search");
xhttp.setRequestHeader("Authorization",AUTH);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
}else if(typePage==1){
xhttp.open("POST",URL_SEARCH+"?operation=wselastic&shortUrl="+"/reglementation_index/reglementation/_search");
xhttp.setRequestHeader("Authorization",AUTH);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
}else if(typePage==80){
xhttp.open("POST",URL_SEARCH+"?operation=wselastic&shortUrl="+"/articles_index/article/_search");
xhttp.setRequestHeader("Authorization",AUTH);
xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
}


var testLanguage = RegExp('[أ-ي]');
if(typePage==0){

if(testLanguage.test(prefix)){
xhttp.send(JSON.stringify(
{
    "from":from,"size":sizeliste,
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
        "from":from,"size":sizeliste,
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
}else if(parent=="Simple déclaration" || parent=="Établissement classé" || parent=="Occupation domaine public" || parent=="Activité courante" || parent=="Autorisations urbanisme"){
if(prefix.trim()==""){
    xhttp.send(JSON.stringify(
        {
            "from":from,"size":sizeliste,
      "query": {
        "bool":{
          "must": [{
            "match_all": {}
          },{
            "match_phrase": {
              "content.categorie": "intitulé activité"
            }
          },{
            "match_phrase": {
              "parents.TypeAutorisation": parent
            } 
          }]
        }}}
    ));
}else{
    xhttp.send(JSON.stringify(
    {
    "from":from,"size":sizeliste,
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
        },{
            "match_phrase": {
                "parents.TypeAutorisation": parent
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

}else{
if(prefix.trim()==""){
    xhttp.send(JSON.stringify(
        {
            "from":from,"size":sizeliste,
      "query": {
        "bool":{
          "must": [{
            "match_all": {}
          },{
            "match_phrase": {
              "content.categorie": "intitulé activité"
            }
          }]
        }}}
    ));
}else{
    xhttp.send(JSON.stringify(
    {
    "from":from,"size":sizeliste,
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
}}
}
}else if(typePage==1){
if(prefix.trim()==""){


    if(parent=="TOUS"){
        xhttp.send(JSON.stringify(
            {
                "from":from,"size":sizeliste,
                "query": {
                         "match_all": {}
                        },
                        "sort":[{ "date_pub" : {"order" : "desc"}}]
            }));
    }else if(parent=="ÉCONOMIQUE"){
        numberRef = "1";
        var obj = {
            "term":{
                "type.keyword":numberRef
            }
        };
        obj = {
            "from":from,
            "size":sizeliste,
            "query":obj,
            "sort":[{ "date_pub" : {"order" : "desc"}}]

        }
        xhttp.send(JSON.stringify(obj));
       
    }else if(parent=="URBANISME"){
        numberRef = "2";
        var obj = {
            "term":{
                "type.keyword":numberRef
            }
        };
        obj = {
            "from":from,
            "size":sizeliste,
            "query":obj,
            "sort":[{ "date_pub" : {"order" : "desc"}}]

        }
        xhttp.send(JSON.stringify(obj));
    }else if(parent=="AUTRE"){
        numberRef = "3";   
        var obj = {
            "term":{
                "type.keyword":numberRef
            }
        };
        obj = {
            "from":from,
            "size":sizeliste,
            "query":obj,
            "sort":[{ "date_pub" : {"order" : "desc"}}]
        }
        xhttp.send(JSON.stringify(obj));
    }
}else{

var numberRef = "";

if(testLanguage.test(prefix)){
    var analyzerRef = "rebuilt_arabic";
    var fields = ["title.arabe","desc","decsCnt.arabe"];
}else{
    var analyzerRef = "rebuilt_french";
    var fields = ["title.keywordsString","desc","decsCnt.keywordsString"];
};

var musts = [
    { "multi_match": {
        "query": prefix,
        "fields": fields,
        "analyzer": analyzerRef,
        "fuzziness": "AUTO",
        "minimum_should_match": "70%"
    }} 
];

if(parent=="TOUS"){
  
}else if(parent=="ÉCONOMIQUE"){
    numberRef = "1";
    var obj = {
        "term":{
            "type.keyword":numberRef
        }
    };
    musts.push(obj);
   
}else if(parent=="URBANISME"){
    numberRef = "2";
    var obj = {
        "term":{
            "type.keyword":numberRef
        }
    };
    musts.push(obj);
}else if(parent=="AUTRE"){
    numberRef = "3";   
    var obj = {
        "term":{
            "type.keyword":numberRef
        }
    };
    musts.push(obj);
}

var shoulds = [
    {
        "match": {
            "title": prefix
        }}
    
];



var objRef = {
"from":from,"size":sizeliste,
"query": {
    "bool": {
        "must": musts,
        "should": shoulds
    }
}
};

xhttp.send(JSON.stringify(objRef));

}
}else if(typePage==2){
//$("."+cls+" .full-search-list").hide();
RestSearchFaq(prefix,0,2,0,null,cls,"USER",target);
}else if(typePage==7){
$("."+cls+" .full-search-list").hide();
RestSearchVideo(prefix,from,sizeliste,null,parent,null,prev,cls,target);
}else if(typePage==12){
$("."+cls+" .full-search-list").hide();
RestSearchDownload(prefix,from,sizeliste,null,parent,null,prev,cls,target);
} else if(typePage==80){
xhttp.send(JSON.stringify(getObjectToSendArticle(parent,prefix,testLanguage.test(prefix),from,sizeliste)));

};

return result;
}

function getObjectToSendArticle(parent,prefix,lang,from,size){
    if(lang==true){
        var ll = "rebuilt_arabic";
        }else{
        var ll = "rebuilt_french";
        }
if(parent==0){
if(prefix.trim()!=""){
return {
    "from":from,"size":size,
    "query": {
        "bool": {
            "must": [
                { "multi_match": {
                    "query": prefix,
                    "fields": ["title.keywordsString","descreption","content"],
                    "analyzer": ll,
                    "fuzziness": "AUTO",
                    "minimum_should_match": "70%"
                }}
            ],
            "should": [
                {
                    "match": {
                        "title.keywordsString": prefix
                    }
                }
            ]
        }
    }
};
}else{
return {
        "from":from,
        "size":size,
        "query": {
                 "match_all": {}
                },
                "sort":[{ "datePr" : {"order" : "desc"}}]
    };
}
}else if(parent!=0 && prefix.trim()!=""){
if(parent==1){
var type = "PRATIQUE";
}else if(parent==2){
var type = "A LA UNE";
}else if(parent==3){
var type = "REVUE DE PRESSE";
}
return {
"from":from,"size":size,
"query": {
    "bool": {
        "must": [
            { "multi_match": {
                "query": prefix,
                "fields": ["title.keywordsString","descreption","content"],
                "analyzer": ll,
                "fuzziness": "AUTO",
                "minimum_should_match": "70%"
            }},{
                "term":{
                    "type.keyword":type
                }
            }
        ],
        "should": [
            {
                "match": {
                    "title.keywordsString": prefix
                }
            }
        ]
    }
}
};
}else{
if(parent==1){
var type = "PRATIQUE";
}else if(parent==2){
var type = "A LA UNE";
}else if(parent==3){
var type = "REVUE DE PRESSE";
}
return {
"from":from,"size":size,
"query": {
    "bool": {
        "must": [
            { "match_all": {
                
            }},{
                "term":{
                    "type.keyword":type
                }
            }
        ]
    }
},"sort":[{ "datePr" : {"order" : "desc"}}]
};
} 
} 


function generateRequestFaqSearch(prefix,type,from,size,visi){

if(visi!=undefined)   {
if(visi=="ALL") {
if(prefix.trim()!=""){
    var str = "{ \"index\": \""+faq_index+"\", \"type\": \"qr\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \""+prefix+"\",\"fields\": [\"QUESTIONS.keywordsString\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"60%\"}},{\"match_phrase\": {\"type\": \""+type+"\"}}]}}}\n";
}else{
    var str ="{ \"index\": \""+faq_index+"\", \"type\": \"qr\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\":{ \"bool\":{ \"must\":[ {\"match\":{ \"type\":\""+type+"\" }}]}}}\n";    
}
}else{
if(prefix.trim()!=""){
    var str = "{ \"index\": \""+faq_index+"\", \"type\": \"qr\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \""+prefix+"\",\"fields\": [\"QUESTIONS.keywordsString\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"60%\"}},{\"match_phrase\": {\"type\": \""+type+"\"}},{\"match_phrase\": {\"visibility\": \""+visi+"\" }}]}}}\n";
}else{
    var str ="{ \"index\": \""+faq_index+"\", \"type\": \"qr\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\":{ \"bool\":{ \"must\":[ {\"match\":{ \"type\":\""+type+"\" }},{\"match\":{ \"visibility\":\""+visi+"\" }}]}}}\n";    
}
}

}else{
if(prefix.trim()!=""){
var str = "{ \"index\": \""+faq_index+"\", \"type\": \"qr\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \""+prefix+"\",\"fields\": [\"QUESTIONS.keywordsString\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"60%\"}},{\"match_phrase\": {\"type\": \""+type+"\"}}]}}}\n";
}else{
var str ="{ \"index\": \""+faq_index+"\", \"type\": \"qr\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\":{ \"match\":{ \"type\":\""+type+"\" }}}\n";
}
}


return str;
}

function generateRequestRefSearch(prefix, type, from, size) {
if (prefix.trim() != "") {
var str = "{ \"index\": \"reglementation_index\", \"type\": \"reglementation\" }\n{\"from\":" + from + ",\"size\":" + size + ",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \"" + prefix + "\",\"fields\": [\"desc\",\"title\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"60%\"}},{\"match_phrase\": {\"type\": \"" + type + "\"}}]}}}\n";
} else {
var str = "{ \"index\": \"reglementation_index\", \"type\": \"reglementation\" }\n{\"from\":" + from + ",\"size\":" + size + ",\"query\":{ \"match\":{ \"type\":\"" + type + "\" }}}\n";
}

return str;
}

function showListVideo(cls,target){
$('.'+cls+' .consultation-video').hide(); 
$('.'+cls+' .search-video').show();
restFullSearchList('',0,false,0,cls,target);
}

function generateRequestVideoSearch(prefix,type,from,size,typeUse){

if(typeUse==0){
var str = "{ \"index\": \""+videos_index+"\", \"type\": \"video\" }\n{\"from\":"+from+",\"size\":"+size+",\"sort\":[{ \"date\" : {\"order\" : \"desc\"}}],\"query\":{ \"match\":{ \"playlist.keyword\":\""+type+"\" }}}\n";

}else{
if(prefix.trim()!=""){
var str = "{ \"index\": \""+videos_index+"\", \"type\": \"video\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \""+prefix+"\",\"fields\": [\"QUESTIONS.keywordsString\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"60%\"}},{\"match_phrase\": {\"type\": \""+type+"\"}}]}}}\n";
}else{
var str = "{ \"index\": \""+videos_index+"\", \"type\": \"video\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\":{ \"match\":{ \"playlist.keyword\":\""+type+"\" }}}\n";
}
}


return str;
}

function generateRequestArticleSearch(prefix,type,from,size,typeUse){
if(typeUse==0){
var str = "{ \"index\": \"articles_index\", \"type\": \"article\" }\n{\"from\":"+from+",\"size\":"+size+",\"sort\":[{ \"datePr\" : {\"order\" : \"desc\"}}],\"query\":{ \"term\":{ \"type.keyword\":\""+type+"\" }}}\n";
console.log(str);
}else if(typeUse==1){
var str = "{ \"index\": \"articles_index\", \"type\": \"article\" }\n{\"from\":"+from+",\"size\":"+size+",\"sort\":[{ \"datePr\" : {\"order\" : \"desc\"}}],\"query\":{ \"match_all\":{ }}}\n";
str += "{ \"index\": \"articles_index\", \"type\": \"article\" }\n{\"from\":"+from+",\"size\":"+size+",\"sort\":[{ \"vue\" : {\"order\" : \"desc\"}}],\"query\":{ \"match_all\":{  }}}\n";
str += "{ \"index\": \"articles_index\", \"type\": \"article\" }\n{\"from\":"+from+",\"size\":"+size+",\"sort\":[{ \"like\" : {\"order\" : \"desc\"}}],\"query\":{ \"match_all\":{ }}}\n";
}else{
if(prefix.trim()!=""){
var str = "{ \"index\": \"articles_index\", \"type\": \"article\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \""+prefix+"\",\"fields\": [\"QUESTIONS.keywordsString\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"60%\"}},{\"match_phrase\": {\"type\": \""+type+"\"}}]}}}\n";
}else{
var str = "{ \"index\": \"articles_index\", \"type\": \"article\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\":{ \"term\":{ \"type.keyword\":\""+type+"\" }}}\n";
}
}


return str;
}

function generateRequestAttachementSearch(prefix,type,from,size,typeUse){

if(typeUse==0){
var str = "{ \"index\": \"attachements_index\", \"type\": \"attachement\" }\n{\"from\":"+from+",\"size\":"+size+",\"sort\":[{ \"date\" : {\"order\" : \"desc\"}}],\"query\":{ \"match\":{ \"playlist\":\""+type+"\" }}}\n";

}else{
if(prefix.trim()!=""){
var str = "{ \"index\": \"attachements_index\", \"type\": \"attachement\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \""+prefix+"\",\"fields\": [\"QUESTIONS.keywordsString\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"60%\"}},{\"match_phrase\": {\"type\": \""+type+"\"}}]}}}\n";
}else{
var str = "{ \"index\": \"attachements_index\", \"type\": \"attachement\" }\n{\"from\":"+from+",\"size\":"+size+",\"query\":{ \"match\":{ \"playlist\":\""+type+"\" }}}\n";
}
}

return str;
}


function getAllplayLists2(type){

var obj = {"size":1000,"query":{"match_all":{}}};


$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/playlist_index/playlist/_search",
datatype: "application/json",
contentType: "application/json",
data: JSON.stringify(obj),
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
console.log(result);
for(var i=0;i<result.hits.hits.length;i++){
    var div = '<div class="ow-option"> <span class="ow-option-label p'+(i+1)+'"> '+result.hits.hits[i]._source.title+' </span></div>'
    console.log(div);
    $('.playlist-list .ow-field-assistance .ow-field-assistance-inner').append(div);
}

},
error: function (error) {
console.log(error);
}
})
}


function getAllplayLists(type,size,clas,target){

var obj = {
"aggs" : {
    "genres" : {
        "terms" : { "field" : "playlist.keyword" } 
    }
}
};

$("."+clas+" .NQF-freq-quest > .ow-pl-inner").html("");

$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/"+videos_index+"/video/_search",
datatype: "application/json",
contentType: "application/json",
data: JSON.stringify(obj),
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    console.log(result);
    var tab = result.aggregations.genres.buckets;
    var playlists = [];
    var playlistsClass = [];
    console.log(tab.length);
    for(var i=0;i<tab.length;i++){
        var fieldset = '<div class="ow-pl ow-tabpanel-flex NFQ-quest-title NFQ-type-document expanded class-playlist'+i+'"> <div class="ow-pl-toolbar"><div class="ow-label-pl">'+tab[i].key+'</div> <span class="expand-collapse"> </span> <span class="actions"> </span>  </div><div class="ow-pl-inner"><div class="ow-html"> <div class="NFQ-quest-type-document det NFQ-fieldset" style="padding:0.25rem;"></div></div><div style="clear:both"> </div></div></div>';
        $("."+clas+" .NQF-freq-quest > .ow-pl-inner").append(fieldset);
        playlists.push(tab[i].key);
        playlistsClass.push(".class-playlist"+i);
    }
    RestSearchVideo("",0,size,playlists,type,playlistsClass,null,clas,target);
},
error: function (error) {
    console.log(error);
}
})
}

function getAllplayListsD(type,size,clas,target){

var obj = {
"aggs" : {
"genres" : {
    "terms" : { "field" : "playlist.keyword" } 
}
}
};

$("."+clas+" .NQF-freq-quest > .ow-pl-inner").html("");

$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/attachements_index/attachement/_search",
datatype: "application/json",
contentType: "application/json",
data: JSON.stringify(obj),
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
console.log(result);
var tab = result.aggregations.genres.buckets;
var playlists = [];
var playlistsClass = [];
console.log(tab.length);
for(var i=0;i<tab.length;i++){
    var fieldset = '<div class="ow-pl ow-tabpanel-flex NFQ-quest-title NFQ-type-document expanded class-playlist'+i+'"> <div class="ow-pl-toolbar"><div class="ow-label-pl">'+tab[i].key+'</div> <span class="expand-collapse"> </span> <span class="actions"> </span>  </div><div class="ow-pl-inner"><div class="ow-html"> <div class="NFQ-quest-type-document det NFQ-fieldset" style="padding:0.25rem;"></div></div><div style="clear:both"> </div></div></div>';
    $("."+clas+" .NQF-freq-quest > .ow-pl-inner").append(fieldset);
    playlists.push(tab[i].key);
    playlistsClass.push(".class-playlist"+i);
}
RestSearchDownload("",0,size,playlists,type,playlistsClass,null,clas,target);
},
error: function (error) {
console.log(error);
}
})
}

function RestSearchref(prefix, page, size, type, typeUse, cls,clas,target) {
var str = ""

if (type == 0) {
str += generateRequestRefSearch(prefix, "1", page, size);
str += generateRequestRefSearch(prefix, "2", page, size);
str += generateRequestRefSearch(prefix, "3", page, size);
} else if (type == 1) {
str += generateRequestRefSearch(prefix, "1", page, size);
} else if (type == 2) {
str += generateRequestRefSearch(prefix, "2", page, size);
} else if (type == 3) {
str += generateRequestRefSearch(prefix, "3", page, size);
}

if(typeUse == -1){
target.find("."+clas+" .faq-fieldset-det .full-search-list").html("");
target.find("."+clas+" .faq-fieldset-det .searchGif2").show();
target.find("."+clas+" .NQF-edit-modif").hide();
target.find("."+clas+" .NFQ-all-quest").show();
}

$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data: str,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
console.log(result);
if(typeUse!=-1){
for (var i = 0; i < result.responses.length; i++) {
    
    target.find(cls[i]).html("");
    
    for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
        console.log(result.responses[i].hits.hits[j]._id);
        // typeUse 1 for admin and 2for normal user
        NQF_add_ref(result.responses[i].hits.hits[j]._source.title, result.responses[i].hits.hits[j]._id, cls[i], typeUse,clas,target)

        // console.log(result.responses[i].hits.hits[j]._source.REPONSES);	
        console.log(result.responses[i].hits.hits[j]._source.type);
    }

    // la page a affiché  
    console.log("***************"+NQFrefCAtegorie[i]);
    target.find(cls[i]).append(`<span  class="NFQ-end" onclick="javascript:ApplicationManager.run('karaz/ux/hub/portailsearch/search/RefrentielJuridique', 'search', 'Ref', {})">  ${NQFrefCAtegorie[i]}<span>`);

}
}else if(typeUse==-1){
console.log("hello");

fullCreateRefByType(result.responses[0].hits.hits,1,typeUse);
totalFaqPages[type-1]=result.responses[0].hits.total.value;
generatePaginationRefPage((type-1),prefix,-1);
$("."+clas+" .faq-fieldset-det .searchGif2").hide();
console.log(result.responses[0].hits.total.value);

}
}
,
error: function (error) {
console.log(error.responseText);
}
})
}

var playlist_videos = [];
var playlist_attachement = [];

function RestSearchVideo(prefix, page, size, type, typeUse, cls,prev,clas,target) {
var str = ""

if(type==null){

if(typeUse=="ROKHAS ECONOMIQUE" || typeUse=="ROKHAS URBANISTIQUE" || typeUse=="Général" || typeUse=="Karaz GIS" ){
    if(prefix.trim()!=""){
        var obj = {  
            "from":page,
            "size":size,
            "query":{  
               "bool":{  
                  "must":[  
                     {  
                        "multi_match":{  
                           "query":prefix,
                           "fields":[  
                              "title.keywordsString","description"
                           ],
                           "analyzer":"rebuilt_french",
                           "fuzziness":"auto",
                           "minimum_should_match":"60%"
                        }
                     },{
                         "term":{
                             "playlist.keyword":typeUse
                         }
                     }
                  ],"should":[{
                    "match_phrase_prefix":{
                        "title":prefix
                    }
                }]
               }
            }
         };

    }else{

        var obj = {"size":size,"from":page,"query":{
            "term":{
                "playlist.keyword":typeUse
            }
        }};
                    
    }
}else{

if(prefix.trim()!=""){
    var obj = {  
        "from":page,
        "size":size,
        "query":{  
           "bool":{  
              "must":[  
                 {  
                    "multi_match":{  
                       "query":prefix,
                       "fields":[  
                          "title.keywordsString","description"
                       ],
                       "analyzer":"rebuilt_french",
                       "fuzziness":"auto",
                       "minimum_should_match":"60%"
                    }
                 }
              ],"should":[{
                "match_phrase_prefix":{
                    "title":prefix
                }
            }]
           }
        }
     };

}else{

    var obj = {"size":size,"from":page,"query":{"match_all":{}}};
                
}
}
var a = $("."+clas+" .full-search-list");
$("."+clas+" .search-video .no-result-v").hide();

$.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/"+videos_index+"/video/_search",
    datatype: "application/json",
    contentType: "application/json",
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
        if(currentPage==0){
            totalPage = Math.ceil(result.hits.total.value/4);
            createPaginationBar({"nbrPage":Math.min(totalPage,10),"begin":0,"prefix":prefix,"type":1,"prev":false,"parent":typeUse,"cls":clas,"target":target,"size":4});
            if(totalPage!=0){
                currentPage=1;
                currentLPage=1;
            }
        }else if(currentPage%10==0){
            currentLPage = (currentPage/10)+1;
            console.log("begin: "+currentPage+"lpage: "+currentLPage);
            createPaginationBar({"nbrPage":Number(Math.min(10,totalPage-currentPage))+Number(currentPage),"parent":typeUse,"begin":currentPage-1,"prefix":prefix,"type":1,"prev":false,"cls":clas,"target":target,"size":4});
        }else if(prev==true){
            createPaginationBar({"nbrPage":currentPage+1,"begin":Math.max(0,(Number(currentPage))-10),"prefix":prefix,"parent":typeUse,"type":1,"prev":true,"cls":clas,"target":target,"size":4});
        }

        console.log(result);
        a.html("");
        var results = result.hits.hits;

        

        for(i=0;i<results.length;i++){
            console.log(results[i]);
            var id = results[i]._id;
            var title = results[i]._source.title;
            var description = results[i]._source.description;
            var imgUrl= results[i]._source.img_url;
            var playlist = results[i]._source.playlist;
            var b = document.createElement("div");
            b.setAttribute("class","hp-box full-search-list-item");
            b.setAttribute("style","height: 190px;");
            var c = document.createElement("div");
            c.setAttribute("class","c-path");
           // c.innerHTML="<span class=\"p p1\">"+typeAG+"</span>"+"<span class=\"cl-orange\"> > </span> <span class=\"p p2\">"+typeAc+"</span><span class=\"cl-orange\"> > </span> <span class=\"p p3\">"+nature+"</span>";
            var s = document.createElement("span");
            s.setAttribute("class","cl-orange");
            c.appendChild(addEventSpan("p1",playlist,clas,target));
            c.appendChild(s);
            // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
            // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
            var d = document.createElement("div");
            d.setAttribute("class","item-body");
            var e = document.createElement("div");
            e.setAttribute("class","item-body-title");
            d.setAttribute("style","height: height: 150px;");
            e.innerHTML="<span title=\""+title+"\">"+subLong(title,35)+"</span>";
            var f = document.createElement("p");
            //f.innerHTML= "Etablissement dispensant des cours de stylisme et modélisme de vêtements modernes ou traditionnels. Etablissement dispensant des cours de stylisme et modélisme de ...";
            f.innerHTML = subLong(description,150);
            f.setAttribute("title",description);
            d.appendChild(c);
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("button");
            g.addEventListener("click",function(){
                var id=$(this).children("input").val();
                if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
                    ApplicationManager.run("karaz/ux/hub/portailsearch/search/GuideVideoEdit?query.idObject="+id,"search", "video", {});
                }else{
                    getVideo(id,1,clas);
                } 
                //ApplicationManager.run("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
             });
            g.setAttribute("class","item-body-button hp-sbox-btn");
            g.innerHTML="Lire vidéo<input type=\"hidden\" value=\""+id+"\" > ";
            g.setAttribute("style","display: inline-block;float:right;position: relative; color: #333;background: #f5f5f5;border: 1.2px solid #333 !important;border-radius: 15px;");
            d.appendChild(g);
            var title = document.createElement("div");
            title.setAttribute("class","item-title");
            title.setAttribute("title",playlist);
            title.setAttribute("style","width:190px;top: 63px;right: 104px;");
            title.innerHTML=subLong(playlist);
            title.addEventListener("click",function(){
                /*currentPage=0;
                    $(".div-full-search-bar .hp-search_field input").val($(this).attr("title").toLowerCase());
                    restFullSearchList($(this).html(),0,false,4);
                */
            }); 
            b.appendChild(title);
            var icons = document.createElement("div");
            icons.setAttribute("class","item-icon");
            icons.setAttribute("style","height: 150px;");
            icons.innerHTML="<img class=\"\" src=\""+imgUrl+"\" />";
            b.appendChild(icons);
            b.appendChild(d);
            a.append(b);
        }
        $("."+clas+" .search-video .searchGif").hide();
        if(result.hits.hits.length==0){
            $("."+clas+" .search-video .no-result-v").show();
        }else{
            $("."+clas+" .full-search-list").show();
        }
    },
    error: function (error) {
        console.log(error.responseText);
    }
})

}else if(type==-1){

}else{
for(var i=0;i<type.length;i++){
    str += generateRequestVideoSearch(prefix,type[i], page, size,typeUse-2);
}

console.log(str);

$.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/_msearch",
    datatype: "application/json",
    contentType: "application/x-ndjson",
    data: str,
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
        console.log(result);
        playlist_videos = [];

        for (var i = 0; i < result.responses.length; i++) {
            playlist_videos.push(new Array());

            $("."+clas+" "+cls[i]+" .det").html("");
            
            for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
                playlist_videos[i].push(result.responses[i].hits.hits[j]._source);
                console.log(result.responses[i].hits.hits[j]._id);
                // typeUse 1 for admin and 2for normal user
                if(j<4){
                    NQF_add_video(result.responses[i].hits.hits[j]._source.title,result.responses[i].hits.hits[j]._source.description,result.responses[i].hits.hits[j]._source.img_url, result.responses[i].hits.hits[j]._id, cls[i], typeUse,clas)
                }

                // console.log(result.responses[i].hits.hits[j]._source.REPONSES);	
                console.log(result.responses[i].hits.hits[j]._source.type);
            }

            // la page a affiché  

//				$(cls[i]).append(`<span  class="NFQ-end" onclick='javascript:ApplicationManager.run("karaz/ux/hub/portailsearch/search/RefrentielJuridique","search", "Refrentiel Juridique", {});'>  ${NQFrefCAtegorie[i]}<span>`);

        }
    },
    error: function (error) {
        console.log(error.responseText);
    }
})
}   
}

function RestSearchArticleSec(prefix, page, size, type, typeUse, cls,prev,clas,target,root){
console.log("arr");
var str = '';
for(var i=0;i<type.length;i++){
    str += generateRequestArticleSearch(prefix,type[i], page, size,typeUse-2);
}


$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data: str,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
console.log(result);
//playlist_videos = [];
for (var i = 0; i < result.responses.length; i++) {
    //playlist_videos.push(new Array());

    target.find("."+clas+" "+cls[i]+"").html("");
    
    for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
        //playlist_videos[i].push(result.responses[i].hits.hits[j]._source);
        console.log(result.responses[i].hits.hits[j]._id);
        // typeUse 1 for admin and 2for normal user
        if(typeUse==3){
            var objj = {
                "desc":result.responses[i].hits.hits[j]._source.description,
                "date":result.responses[i].hits.hits[j]._source.datePr.split(" ")[0].replace(/-/g,"/"),
                "like":result.responses[i].hits.hits[j]._source.like,
                "vue":result.responses[i].hits.hits[j]._source.vue,
                "author":result.responses[i].hits.hits[j]._source.author,
                "lang":result.responses[i].hits.hits[j]._source.lang
            }
            console.log("arr3");
            NQF_add_article(result.responses[i].hits.hits[j]._source.title,objj,result.responses[i].hits.hits[j]._source.imgP, result.responses[i].hits.hits[j]._id, cls[i], typeUse,clas,target,root,result.responses[i].hits.hits[j]._source)
        }else{
            console.log("arr else");
            NQF_add_article(result.responses[i].hits.hits[j]._source.title,result.responses[i].hits.hits[j]._source.description,result.responses[i].hits.hits[j]._source.imgP, result.responses[i].hits.hits[j]._id, cls[i], typeUse,clas,target,root,result.responses[i].hits.hits[j]._source)
        }

        // console.log(result.responses[i].hits.hits[j]._source.REPONSES);	
        console.log(result.responses[i].hits.hits[j]._source.type);
    }
}
},
error: function (error) {
console.log(error.responseText);
}
})
}

function NQF_add_article(quest,desc,imgUrl, id, cls, type,clas,target,root,src){
if (type == 1) {

var div = document.createElement("div");
console.log("arr1",src.lang);

if(src.lang=="Ar"){

div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
<img style="width:100%;height: 68px;" src="`+imgUrl+`" alt="">
</div>
<div>
<span style="display: block;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;color: #666;">`+subLong(quest,50)+`</span>
<p style="font-size: 13px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;margin: auto;">`+subLong(desc,70)+`</p>
</div>`;
}else{
    `<div class="video-img" style="padding: 3px 7px 1px 1px;">
<img style="width:100%;height: 68px;" src="`+imgUrl+`" alt=""> 
</div>
<div>
<span style="display: block;text-align: left;color: #666;">`+subLong(quest,50)+`</span>
<p style="font-size: 13px;text-align: left;margin: auto;">`+subLong(desc,70)+`</p>
</div>`;
}

div.addEventListener("click",function(){
getArticle(id,0,clas,target,root);
});

div.setAttribute("idd",id);
div.setAttribute("class","video-list-item");
div.setAttribute("style","display:grid;grid-template-columns:35% 65%;margin-bottom: 15px;cursor:pointer")

target.find("."+clas+" "+ cls + "").append(div);

console.log(".v-edit" + cls + "");

} else if (type == 2) {
var div = document.createElement("div");
console.log("arr2",src.lang);
if(src.lang=="Ar"){
    div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
    <img style="width:100%;height: 68px;" src="`+imgUrl+`" alt="">
    </div>
    <div>
    <span style="display: block;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;color: #666;">`+subLong(quest,50)+`</span>
    <p style="font-size: 13px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;margin: auto;">`+subLong(desc,70)+`</p>
    </div>`;
}else{
    div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
    <img style="width:100%;height: 68px;" src="`+imgUrl+`" alt="">
    </div>
    <div>
    <span style="display: block;text-align: left;color: #666;">`+subLong(quest,50)+`</span>
    <p style="font-size: 13px;text-align: left;margin: auto;">`+subLong(desc,70)+`</p>
    </div>`;
}

div.addEventListener("click",function(){
// if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
//     ApplicationManager.run("karaz/ux/hub/portailsearch/search/GuideVideoEdit?query.idObject="+id,"search", "video", {});
// }else{
//     getArticle(id,1,clas);
// } 

getArticle(id,1,clas,target,root);
});

div.setAttribute("idd",id);
div.setAttribute("class","video-list-item");
div.setAttribute("style","display:grid;grid-template-columns:35% 65%;margin-bottom: 15px;cursor:pointer")

target.find("."+clas+" "+ cls + "").append(div);

    } else if(type==3){
    var div = document.createElement("div");
    if(src.lang=="Ar"){

        div.innerHTML = `<div style="display:grid;grid-template-columns:35% 65%;direction: rtl;" ><div class="video-img" style="padding: 3px 1px 1px 7px;">
        <img style="width:100%;height: 68px;" src="`+imgUrl+`" alt="">
        </div>
        <div>
        <span style="display: block;font-size: 14px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;color: #666;">`+subLong(quest,50)+`</span>
        <p style="font-size: 12px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;margin: auto;">`+subLong(desc.desc,70)+`</p>
        </div></div>
        <p style="font-size: 11px;text-align: right;margin: auto;margin-top: 4px;color:#666">
            <span ><i class="fas fa-calendar-alt"></i> `+desc.date+`</span>  <span style="margin-left: 5px;"><i class="fas fa-heart"></i> `+desc.like+`</span>
            <span style="margin-left: 5px;" ><i class="fas fa-user"></i> `+desc.author+`</span>
        </p>
        `;
    }else{
        div.innerHTML = `<div style="display:grid;grid-template-columns:35% 65%;" ><div class="video-img" style="padding: 3px 7px 1px 1px;">
        <img style="width:100%;height: 68px;" src="`+imgUrl+`" alt="">
        </div>
        <div>
        <span style="display: block;text-align: left;color: #666;">`+subLong(quest,50)+`</span>
        <p style="font-size: 13px;text-align: left;margin: auto;">`+subLong(desc.desc,70)+`</p>
        </div></div>
        <p style="font-size: 12px;text-align: left;margin: auto;margin-top: 4px;color:#666">
            <span ><i class="fas fa-calendar-alt"></i> `+desc.date+`</span>  <span style="margin-left: 5px;"><i class="fas fa-heart"></i> `+desc.like+`</span>
            <span style="margin-left: 5px;" ><i class="fas fa-user"></i> `+desc.author+`</span>
        </p>
        `;
    }

    if(src.type=="REVUE DE PRESSE" && src.lang=="Ar"){

        div.innerHTML = `<div style="display:grid;grid-template-columns:35% 65%;direction: rtl;" ><div class="video-img" style="padding: 3px 1px 1px 7px;">
        <img style="width:100%;height: 68px;" src="`+imgUrl+`" alt="">
        </div>
        <div>
        <span style="display: block;font-size: 14px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;color: #666;">`+subLong(quest,50)+`</span>
        <p style="font-size: 12px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;margin: auto;">`+subLong(desc.desc,70)+`</p>
        </div></div>
        <p style="font-size: 11px;text-align: right;margin: auto;margin-top: 4px;color:#666">
            <span ><i class="fas fa-calendar-alt"></i> `+desc.date+`</span>
            <span style="margin-left: 5px;" ><i class="far fa-newspaper"></i> `+src.source+`</span>
        </p>
        `;
    }else if(src.type=="REVUE DE PRESSE" && src.lang!="Ar"){
        div.innerHTML = `<div style="display:grid;grid-template-columns:35% 65%;" ><div class="video-img" style="padding: 3px 7px 1px 1px;">
        <img style="width:100%;height: 68px;" src="`+imgUrl+`" alt="">
        </div>
        <div>
        <span style="display: block;text-align: left;color: #666;">`+subLong(quest,50)+`</span>
        <p style="font-size: 13px;text-align: left;margin: auto;">`+subLong(desc.desc,70)+`</p>
        </div></div>
        <p style="font-size: 12px;text-align: left;margin: auto;margin-top: 4px;color:#666">
            <span ><i class="fas fa-calendar-alt"></i> `+desc.date+`</span>
            <span style="margin-left: 5px;" ><i class="far fa-newspaper"></i> `+src.source+`</span>
        </p>
        `;
    }

        div.addEventListener("click",function(){
            if(profilesT.match(/CONTENT_EDITOR/)!='CONTENT_EDITOR'){ 
                if(src.type=="REVUE DE PRESSE"){
                    window.open(src.link);
                }else{
                    ApplicationManager.run("karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject="+id,"search", "article", {});
                }
            }else{
                ApplicationManager.run("karaz/ux/hub/portailsearch/search/NewArticle?query.idObject="+id,"search", "Cms article", {});
            }    
        });

        div.setAttribute("idd",id);
        div.setAttribute("class","video-list-item");
        div.setAttribute("style","margin-bottom: 15px;cursor:pointer")

        $("."+clas+" "+ cls + "").append(div);
    }
}



function RestSearchDownload(prefix, page, size, type, typeUse, cls,prev,clas,target) {
var str = ""

if(type==null){
if(typeUse=="ROKHAS ECONOMIQUE" || typeUse=="ROKHAS URBANISTIQUE" || typeUse=="Général" || typeUse=="Karaz GIS" ){
if(prefix.trim()!=""){
    var obj = {  
        "from":page,
        "size":size,
        "query":{  
           "bool":{  
              "must":[  
                 {  
                    "multi_match":{  
                       "query":prefix,
                       "fields":[  
                          "title.keywordsString","description"
                       ],
                       "analyzer":"rebuilt_french",
                       "fuzziness":"auto",
                       "minimum_should_match":"60%"
                    }
                 },{
                     "term":{
                         "playlist.keyword":typeUse
                     }
                 }
              ],"should":[{
                "match_phrase_prefix":{
                    "title":prefix
                }
            }]
           }
        }
     };

}else{

    var obj = {"size":size,"from":page,"query":{"term":{
        "playlist.keyword":typeUse
    }}};
                
}
}else{
if(prefix.trim()!=""){
    var obj = {  
        "from":page,
        "size":size,
        "query":{  
           "bool":{  
              "must":[  
                 {  
                    "multi_match":{  
                       "query":prefix,
                       "fields":[  
                          "title.keywordsString","description"
                       ],
                       "analyzer":"rebuilt_french",
                       "fuzziness":"auto",
                       "minimum_should_match":"60%"
                    }
                 }
              ],"should":[{
                "match_phrase_prefix":{
                    "title":prefix
                }
            }]
           }
        }
     };

}else{

    var obj = {"size":size,"from":page,"query":{"match_all":{}}};
                
}
}


var a = $("."+clas+" .full-search-list");
$("."+clas+" .search-video .no-result-v").hide();

$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/attachements_index/attachement/_search",
datatype: "application/json",
contentType: "application/json",
data: JSON.stringify(obj),
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    if(currentPage==0){
        totalPage = Math.ceil(result.hits.total.value/4);
        createPaginationBar({"nbrPage":Math.min(totalPage,10),"parent":typeUse,"begin":0,"prefix":prefix,"type":1,"prev":false,"cls":clas,"target":target,"size":4});
        if(totalPage!=0){
            currentPage=1;
            currentLPage=1;
        }
    }else if(currentPage%10==0){
        currentLPage = (currentPage/10)+1;
        console.log("begin: "+currentPage+"lpage: "+currentLPage);
        createPaginationBar({"nbrPage":Number(Math.min(10,totalPage-currentPage))+Number(currentPage),"parent":typeUse,"begin":currentPage-1,"prefix":prefix,"type":1,"prev":false,"cls":clas,"target":target,"size":4});
    }else if(prev==true){
        createPaginationBar({"nbrPage":currentPage+1,"begin":Math.max(0,(Number(currentPage))-10),"parent":typeUse,"prefix":prefix,"type":1,"prev":true,"cls":clas,"target":target,"size":4});
    }

    console.log("result** "+result);
    $("").html("");
    var results = result.hits.hits;
    for(i=0;i<results.length;i++){
        console.log(results[i]);
        var id = results[i]._id;
        var title = results[i]._source.title;
        var description = results[i]._source.description;
        var imgUrl= results[i]._source.img_url;
        var playlist = results[i]._source.playlist;
        var text = results[i]._source.text;
        var plateforme = results[i]._source.plateforme;
        var attachement = results[i]._source.attachement;
        
        if(attachement.fileId==""){
            if(imgUrl.trim()==""){
                if(plateforme=="DOC"){
                    var str = "<i class=\"fas fa-file-download\" style=\"font-size: 9VW;color: #38A;\"></i>";
                }else{
                    var str = "<i class=\"fas fa-download\" style=\"font-size: 9VW;color: #38A;\"></i>";
                }
            }else{
                var str = "<img style=\"max-width: 70%;max-height: 157px;\" src="+imgUrl+">";
            }    
        }else{
            var krn = attachement.gedId.split("/")[0];
            var str = '<div class="docthumbnail"><img style="max-width: 70%;max-height: 157px;" class="smallThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=small&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=large&amp;or=img/no-file.svg"></div>';
        }
        
        

        var b = document.createElement("div");
        b.setAttribute("class","hp-box full-search-list-item");
        b.setAttribute("style","height: 190px;");
        var c = document.createElement("div");
        c.setAttribute("class","c-path");
       // c.innerHTML="<span class=\"p p1\">"+typeAG+"</span>"+"<span class=\"cl-orange\"> > </span> <span class=\"p p2\">"+typeAc+"</span><span class=\"cl-orange\"> > </span> <span class=\"p p3\">"+nature+"</span>";
        var s = document.createElement("span");
        s.setAttribute("class","cl-orange");
        c.appendChild(addEventSpan("p1",playlist,clas,target));
        c.appendChild(s);
        // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
        // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
        var d = document.createElement("div");
        d.setAttribute("class","item-body");
        var e = document.createElement("div");
        e.setAttribute("class","item-body-title");
        d.setAttribute("style","height: height: 150px;");
        e.innerHTML="<span title=\""+title+"\">"+subLong(title,35)+"</span>";
        var f = document.createElement("p");
        //f.innerHTML= "Etablissement dispensant des cours de stylisme et modélisme de vêtements modernes ou traditionnels. Etablissement dispensant des cours de stylisme et modélisme de ...";
        f.innerHTML = subLong(description,150);
        f.setAttribute("title",description);
        d.appendChild(c);
        d.appendChild(e);
        d.appendChild(f);
        var g = document.createElement("button");
        g.addEventListener("click",function(){
            var id=$(this).children("input").val();
            if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
                ApplicationManager.run("karaz/ux/hub/portailsearch/search/DownloadEdit?query.idObject="+id,"search", "attachement", {});

            }else{
                getAttachement(id,1,clas);
            } 
         });
        g.setAttribute("class","item-body-button hp-sbox-btn");
        g.innerHTML="Détails<input type=\"hidden\" value=\""+id+"\" > ";
        g.setAttribute("style","display: inline-block;float:right;position: relative; color: #333;background: #f5f5f5;border: 1.2px solid #333 !important;border-radius: 15px;");
        d.appendChild(g);
        var title = document.createElement("div");
        title.setAttribute("class","item-title");
        title.setAttribute("title",playlist);
        title.setAttribute("style","width:190px;top: 63px;right: 104px;");
        title.innerHTML=subLong(playlist);
        title.addEventListener("click",function(){
            /*currentPage=0;
                $(".div-full-search-bar .hp-search_field input").val($(this).attr("title").toLowerCase());
                restFullSearchList($(this).html(),0,false,4);
            */
        }); 
        b.appendChild(title);
        var icons = document.createElement("div");
        icons.setAttribute("class","item-icon");
        icons.setAttribute("style","height: 150px;");
        icons.innerHTML=str;
        b.appendChild(icons);
        b.appendChild(d);
        a.append(b);
    }
    $("."+clas+" .search-video .searchGif").hide();

    if(result.hits.hits.length==0){
        $("."+clas+" .search-video .no-result-v").show();
    }else{
        $("."+clas+" .full-search-list").show();
    }
    
},
error: function (error) {
    console.log(error.responseText);
}
})

}else if(type==-1){
}else{
for(var i=0;i<type.length;i++){
str += generateRequestAttachementSearch(prefix,type[i], page, size,typeUse-2);
}

$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data: str,
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    playlist_attachement = [];

    for (var i = 0; i < result.responses.length; i++) {
        playlist_attachement.push(new Array());

        $("."+clas+" "+cls[i]+" .det").html("");
        
        for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
            playlist_attachement[i].push(result.responses[i].hits.hits[j]._source);
            console.log(result.responses[i].hits.hits[j]._id);
            NQF_add_attachement(result.responses[i].hits.hits[j]._source.title,result.responses[i].hits.hits[j]._source.attachement,result.responses[i].hits.hits[j]._source.description,result.responses[i].hits.hits[j]._source.img_url,result.responses[i].hits.hits[j]._source.plateforme,result.responses[i].hits.hits[j]._id, cls[i], typeUse,clas)    
            console.log(result.responses[i].hits.hits[j]._source.type);
        }
 }
},
error: function (error) {
    console.log(error.responseText);
}
})
}   
}

function NQF_add_ref(quest, id, cls, type,clas,target) {

// console.log(id);
if (type == 1) {
var div = document.createElement("div");
div.setAttribute("class","NFQ-mgn-bt");
div.setAttribute("idd",id);

var div2 = document.createElement("div");
div2.setAttribute("class","vpanel-body-title NQF-quest-delete");
div2.setAttribute("style","font-size: 14px;");

var span = document.createElement("span");
span.setAttribute("class","NFQ-click-btn");
span.innerHTML = quest;
span.addEventListener("click",function(){
getRefJ(id,0,clas,target);
});

var hr = document.createElement("hr");
hr.setAttribute("class","NQF-horizontal-line");

var span2 = document.createElement("span");
span2.setAttribute("class","far fa-times-circle NFQ-close-quest");
span2.setAttribute("onclick",'removerefNQF('+id+')');

div2.appendChild(span);
div2.appendChild(span2);
div2.appendChild(hr);
div.appendChild(div2);

target.find(cls + ":not(:has(>.NFQ-end))").append(div);

// target.find(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt " idd="${id}">
//                                 <div class="vpanel-body-title NQF-quest-delete" style="font-size: 14px;">
//                                     <span class = 'NFQ-click-btn'  onclick='getRefJ("${id}",0,"${clas}",${target})' >` + quest + `</span>
//                                     <span class = 'far fa-times-circle NFQ-close-quest' onclick='removerefNQF("${id}")' />
//                                 </div>
//                                 <hr class="NQF-horizontal-line " />
                            
//                                 </div>`)
} else if (type == 2) {
target.find(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt">
<div class="vpanel-body-title " style="font-size: 14px;">
<span class = 'NFQ-click-btn' onclick='getRefJ("${id}",0,"${clas}",${target})' >` + quest + `</span>
</div>
<hr class="NQF-horizontal-line " />

</div>`)
}

}

function NQF_add_video(quest,desc,imgUrl, id, cls, type,clas) {
// console.log(id);
if (type == 1) {
var div = document.createElement("div");
div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
<img style="width:100%;height: 68px;" src=`+imgUrl+` alt="">
</div>
<div>
<span style="display: block;text-align: left;color: #666;">`+subLong(quest,50)+`</span>
<p style="font-size: 13px;text-align: left;margin: auto;">`+subLong(desc,70)+`</p>
</div>`;
div.addEventListener("click",function(){
getVideo(id,0,clas);
});

div.setAttribute("idd",id);
div.setAttribute("class","video-list-item");
div.setAttribute("style","display:grid;grid-template-columns:35% 65%;margin-bottom: 15px;cursor:pointer")

$("."+clas+" .v-edit " + cls + " .det").append(div);

console.log(".v-edit" + cls + " .det");

} else if (type == 2) {
var div = document.createElement("div");
div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
<img style="width:100%;height: 68px;" src=`+imgUrl+` alt="">
</div>
<div>
<span style="display: block;text-align: left;color: #666;">`+subLong(quest,50)+`</span>
<p style="font-size: 13px;text-align: left;margin: auto;">`+subLong(desc,70)+`</p>
</div>`;
div.addEventListener("click",function(){
if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
    ApplicationManager.run("karaz/ux/hub/portailsearch/search/GuideVideoEdit?query.idObject="+id,"search", "video", {});
}else{
    getVideo(id,1,clas);
} 
});

div.setAttribute("idd",id);
div.setAttribute("class","video-list-item");
div.setAttribute("style","display:grid;grid-template-columns:35% 65%;margin-bottom: 15px;cursor:pointer")

$(".v-consultation " + cls + " .det").append(div);

}

}

function NQF_add_attachement(quest,attachement,desc,imgUrl,categ,id, cls, type,clas) {
// console.log(id);
console.log("create "+ type);

if (type == 1) {

if(attachement.gedId==""){
if(imgUrl.trim()==""){
        if(categ=="DOC"){
            var str = "<i class=\"fas fa-file-download\" style=\"font-size: 4VW;color: #38A;\"></i>";
        }else{
            var str = "<i class=\"fas fa-download\" style=\"font-size: 4VW;color: #38A;\"></i>";
        }
}else{
    var str = '<img style="width:100%;height: 80px;" src='+imgUrl+' alt="">';
}
}else{
var krn = attachement.gedId.split("/")[0];
var str = '<div class=""><img class="smallThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=small&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=large&amp;or=img/no-file.svg"></div>';
}

var div = document.createElement("div");
div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
`+str+`
</div>
<div>
<span style="display: block;text-align: left;color: #666;">`+subLong(quest,50)+`</span>
<p style="font-size: 13px;text-align: left;margin: auto;">`+subLong(desc,70)+`</p>
</div>`;

div.addEventListener("click",function(){
getAttachement(id,0,clas);
});

div.setAttribute("idd",id);
div.setAttribute("class","video-list-item");
div.setAttribute("style","display:grid;grid-template-columns:35% 65%;margin-bottom: 15px;cursor:pointer")

$("."+clas+" .v-edit " + cls + " .det").append(div);

console.log(".v-edit" + cls + " .det");

} else if (type == 2) {
console.log("create 2");
var div = document.createElement("div");


if(attachement.gedId==""){
    if(imgUrl.trim()==""){
    
            if(categ=="DOC"){
                var str = "<i class=\"fas fa-file-download\" style=\"font-size: 4VW;color: #38A;\"></i>";
            }else{
                var str = "<i class=\"fas fa-download\" style=\"font-size: 4VW;color: #38A;\"></i>";
            }
    }else{
        var str = '<img style="width:100%;height: 80px;" src='+imgUrl+' alt="">';
    }
}else{
    var krn = attachement.gedId.split("/")[0];           
    var str = '<div class=""><img class="smallThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=small&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=large&amp;or=img/no-file.svg"></div>';
}

var div = document.createElement("div");
div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
`+str+`
</div>
<div>
<span style="display: block;text-align: left;color: #666;">`+subLong(quest,50)+`</span>
<p style="font-size: 13px;text-align: left;margin: auto;">`+subLong(desc,70)+`</p>
</div>`;

div.addEventListener("click",function(){
if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
    ApplicationManager.run("karaz/ux/hub/portailsearch/search/DownloadEdit?query.idObject="+id,"search", "attachement", {});

}else{
    getAttachement(id,1,clas);
} 
});

div.setAttribute("idd",id);
div.setAttribute("class","video-list-item");
div.setAttribute("style","display:grid;grid-template-columns:35% 65%;margin-bottom: 15px;cursor:pointer")
$(".v-consultation " + cls + " .det").append(div);

}
}

function getRefJ(id, type,clas,target) {
if(type==0){
target.find("."+clas+" .NFQ-load-img").show();
target.find("."+clas+" .NFQ-all-quest").hide();
target.find("."+clas+" .NQF-vue-ref").hide();
target.find("."+clas+" .NQF-edit-modif").hide();

var pos = target.find(".pcd-header-NQF").offset().top;
$('html,body').animate({
    scrollTop: pos
},
'fast');
}

$.ajax({
type: "get",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/reglementation_index/reglementation/" + id,
datatype: "application/json",
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
refObject = result._source;
if (type == 0) {
    target.find("."+clas+" .NFQ-load-img").hide();
    target.find("."+clas+" .NQF-btn-alg").show();
    target.find("."+clas+" .NQF-vue-ref").show();
    target.find("."+clas+" .NQF-vue-ref .NQF-prev-ref >b").text(result._source.title);
    target.find("."+clas+" .NQF-text-ref").html(result._source.title);
    target.find("."+clas+" .NQF-desc-ref").text(result._source.desc);
    target.find("."+clas+" .NQF-type-ref").text(result._source.type);
    target.find("."+clas+" .NQF-id-ref").val(id);
    
} else if (type == 1) {
     createDivQuestionRef(result);
}
},
error: function (error) {
console.log(error.responseText);
}
});
}



function removerefNQF(id) {

if (window.confirm("Voulez-vous vraiment supprimer ce référentiel?")) {
$.ajax({
type: "delete",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/reglementation_index/reglementation/" + id,
//url: "http://localhost:9200/index_classification_cluster/avis/_search",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    console.log(result);
    $("div[idd=" + id + "]").hide();

},
error: function (error) {
    console.log(error);
}
});
}

}

function removereArticle(id,clas,target) {

if (window.confirm("Voulez-vous vraiment supprimer cet article?")) {
$.ajax({
type: "delete",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/article/" + id,
//url: "http://localhost:9200/index_classification_cluster/avis/_search",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    console.log(result);
    target.find("."+clas+" .NQF-vue-video").hide();
    target.find("."+clas+" div[idd=" + id + "]").hide();
},
error: function (error) {
    console.log(error);
}
});
}

}


var NQFrefCAtegorie = ["Tous les référentiels économiques","Tous les référentiels urbanistiques"];

/* end Ref juridique */


var faqPages = [1,1,1,1,1,1];
var faqGlobalPages = [1,1,1,1,1,1];
var totalFaqPages = [0,0,0,0,0,0];
var typesList = ["E-SIGN","GENERAL","DOCUMENT","PLATEFORME","ARCHITECTE","ADMINISTRATION"];

function intializeFaqPages(){
faqPages = [1,1,1,1,1,1];
totalFaqPages = [0,0,0,0,0,0];
faqGlobalPages = [1,1,1,1,1,1];
}


function generatePaginationFaqPage(index,prefix,typeUse,cls,typee,target,size){
if(typeUse==-1){
$("."+cls+" .faq-fieldset-det .pagination-new-style").html("");
var p = $("."+cls+" .faq-fieldset-det .pagination-new-style");
}else{
$("."+cls+" .faq-vbox").each(function(elm){
$(this).find(".faq-fieldset .pagination-new-style").eq(index).html("");
});
}
console.log(index);
var begin = (faqGlobalPages[index]-1)*(size+1);
console.log(totalFaqPages[index]);
var nbrPage = begin + Math.min(size+1,Math.ceil(totalFaqPages[index]/size)-(faqGlobalPages[index]-1)*(size+1));
console.log("begin :"+begin+" nbrPage :"+nbrPage);
var a = document.createElement("a");
a.innerHTML="<i class=\"fas fa-angle-double-left\"></i>";
a.addEventListener("click",function(){
if(faqPages[index]>1){
    faqPages[index]--;
    if(faqPages[index]%(size+1)==0){
        faqGlobalPages[index]--;    
    }
    RestSearchFaq(prefix,(faqPages[index]-1)*2,size,(index+1),typeUse,cls,typee,target);
} 
event.preventDefault();
});
if(typeUse==-1){ 
p.append(a);
}else{
$("."+cls+" .faq-vbox").each(function(elm){
    $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
})
}



for(var i=begin;i<nbrPage;i++){

if(i==begin){
a = document.createElement("a");
a.innerHTML=begin+1;
console.log( (Number(faqPages[index])-1) + " = " + i);
if( i == (Number(faqPages[index])-1)){
    a.setAttribute("class","active");

}

a.addEventListener("click",function(){
    if(faqGlobalPages[index]>1){
        /*faqGlobalPages[index]--;
        faqPages[index]=(faqGlobalPages[index]-1)*3+1;
        RestSearchFaq(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse);
        */
        faqPages[index]=Number(this.innerHTML);
        RestSearchFaq(prefix,(faqPages[index]-1)*size,size,(index+1),typeUse,cls,typee,target);            

    }else{
        faqPages[index]= 1;
        RestSearchFaq(prefix,(faqPages[index]-1)*size,size,(index+1),typeUse,cls,typee,target);
    }
    event.preventDefault();
});
if(typeUse==-1){
    p.append(a);
}else{
    $("."+cls+" .faq-vbox").each(function(elm){
        $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
    })
}
}else{
console.log( (Number(faqPages[index])-1) + " = " + i);


a = document.createElement("a");
var j=i+1;
a.innerHTML=(i+1);
if( i == (Number(faqPages[index])-1)){
    console.log(a.innerHTML+" notBeg");
    a.setAttribute("class","active");
}
a.addEventListener("click",function(event){
    event.preventDefault();
    faqPages[index]=Number(this.innerHTML);
    RestSearchFaq(prefix,(faqPages[index]-1)*size,size,(index+1),typeUse,cls,typee,target);            
});
if(typeUse==-1){
    p.append(a);
}else{
    $("."+cls+" .faq-vbox").each(function(elm){
        $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
    })
}            }
}
a = document.createElement("a");
a.innerHTML="<i class=\"fas fa-angle-double-right\"></i>";
a.addEventListener("click",function(){
if(faqPages[index]<Math.ceil(totalFaqPages[index]/size)){
    faqPages[index]++;
    if(faqPages[index]%3==1){
        faqGlobalPages[index]++    
    }
    RestSearchFaq(prefix,(faqPages[index]-1)*size,size,(index+1),typeUse,cls,typee,target);
}
event.preventDefault();
});        

if(typeUse==-1){
p.append(a);
}else{
$("."+cls+" .faq-vbox").each(function(elm){
    $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
})
}
}

function generatePaginationRefPage(index,prefix,typeUse,cls){
if(typeUse==-1){
$("."+cls+" .faq-fieldset-det .pagination-new-style").html("");
var p = $(".faq-fieldset-det .pagination-new-style");
}else{
$("."+cls+" .faq-vbox").each(function(elm){
$(this).find(".faq-fieldset .pagination-new-style").eq(index).html("");
});
}
console.log(index);
var begin = (faqGlobalPages[index]-1)*3;
console.log(totalFaqPages[index]);
var nbrPage = begin + Math.min(3,Math.ceil(totalFaqPages[index]/2)-(faqGlobalPages[index]-1)*3);
console.log("begin :"+begin+" nbrPage :"+nbrPage);
var a = document.createElement("a");
a.innerHTML="<i class=\"fas fa-angle-double-left\"></i>";
a.addEventListener("click",function(){
if(faqPages[index]>1){
    faqPages[index]--;
    if(faqPages[index]%3==0){
        faqGlobalPages[index]--;    
    }
    RestSearchref(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse);
} 
event.preventDefault();
});
if(typeUse==-1){
p.append(a);
}else{
$("."+cls+" .faq-vbox").each(function(elm){
    $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
})
}



for(var i=begin;i<nbrPage;i++){

if(i==begin){
a = document.createElement("a");
a.innerHTML=begin+1;
console.log( (Number(faqPages[index])-1) + " = " + i);
if( i == (Number(faqPages[index])-1)){
    a.setAttribute("class","active");

}

a.addEventListener("click",function(){
    if(faqGlobalPages[index]>1){
        /*faqGlobalPages[index]--;
        faqPages[index]=(faqGlobalPages[index]-1)*3+1;
        RestSearchFaq(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse);
        */
        faqPages[index]=Number(this.innerHTML);
        RestSearchref(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse,cls);            

    }else{
        faqPages[index]= 1;
        RestSearchref(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse,cls);
    }
    event.preventDefault();
});
if(typeUse==-1){
    p.append(a);
}else{
    $("."+cls+" .faq-vbox").each(function(elm){
        $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
    })
}
}else{
console.log( (Number(faqPages[index])-1) + " = " + i);


a = document.createElement("a");
var j=i+1;
a.innerHTML=(i+1);
if( i == (Number(faqPages[index])-1)){
    console.log(a.innerHTML+" notBeg");
    a.setAttribute("class","active");
}
a.addEventListener("click",function(event){
    event.preventDefault();
    faqPages[index]=Number(this.innerHTML);
    RestSearchref(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse,cls);            
});
if(typeUse==-1){
    p.append(a);
}else{
    $("."+cls+" .faq-vbox").each(function(elm){
        $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
    })
}            }
}
a = document.createElement("a");
a.innerHTML="<i class=\"fas fa-angle-double-right\"></i>";
a.addEventListener("click",function(){
if(faqPages[index]<Math.ceil(totalFaqPages[index]/2)){
    faqPages[index]++;
    if(faqPages[index]%3==1){
        faqGlobalPages[index]++    
    }
    RestSearchref(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse,cls);
}
event.preventDefault();
});        

if(typeUse==-1){
p.append(a);
}else{
$("."+cls+" .faq-vbox").each(function(elm){
    $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
})
}
}


function getQsFaq(id,type,cls,target){
if(type==0){
target.find("."+cls+" .NFQ-load-img").show();
target.find("."+cls+" .NQF-vue-question").hide();
var pos = target.find("."+cls+" .pcd-header-NQF").offset().top;
target.find('html,body').animate({
    scrollTop: pos
},
'fast');
}

target.find("."+cls+" .NFQ-all-quest").hide();
target.find("."+cls+" .NQF-edit-modif").hide();

$.ajax({
type: "get",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/"+faq_index+"/qr/" + id,
datatype: "application/json",
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization",AUTH);
},
success: function (result) {
if(type==0){
    console.log(result);
    //traitement rbihi
    faqObject = result._source;
    target.find("."+cls+" .NFQ-load-img").hide();
    target.find("."+cls+" .NQF-vue-question").show();
    //add header
    // $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
    target.find("."+cls+" .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").css("text-transform", "none");
    target.find("."+cls+" .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").html(`QUESTIONS FREQUENTES | <span class="title-2x" style="color:#38a; ">` + result._source.QUESTIONS + `</span>`);

    target.find("."+cls+" .NQF-vue-question .NQF-prev-quest >b").text(result._source.QUESTIONS);
    target.find("."+cls+" .NQF-prev-resp").html(result._source.REPONSES);
    target.find("."+cls+" .NQF-categorie").val(result._source.type);
    target.find("."+cls+" .NQF-id").val(id);
    target.find("."+cls+" .NQF-vue-question").show();
    
    target.find("."+cls+" .NQF-btn-alg").show();
    let a = target.find("."+cls+" .NQF-categorie")
    
    target.find("."+cls+" .NQF-new-quest-btn").show();

}else if(type==1){
    createDivQuestionFaq(result);
    RestSearchFaq("",0,6,typesList.indexOf(result._source.type)+1,-1,cls,"USER");
    //traitement youssef
}  
},
error: function (error) {
console.log(error.responseText);
}
});
}

var videoObject = null;
var attachementObject = null;
var faqObject = null;
var refObject = null;

function getVideo(id,type,cls){
if(type==0){
$("."+cls+" .NQF-new-quest-btn").show();
$("."+cls+" .NFQ-load-img").show();
$("."+cls+" .NQF-vue-question").hide();
var pos = $(".pcd-header-NQF").offset().top;
$('html,body').animate({
    scrollTop: pos
},
'fast');
}else if(type==1){
$("."+cls+" .search-video").hide();
$("."+cls+" .consultation-video").hide();
$("."+cls+" .consultation-video .video-iframe iframe").attr("src","");
$("."+cls+" .consultation-video .video-iframe iframe").attr("allowfullscreen","");
$("."+cls+" .consultation-video .video-iframe iframe").attr("mozallowfullscreen","");
$("."+cls+" .searchGif2").show();
}

$("."+cls+" .NFQ-all-quest").hide();

$.ajax({
type: "get",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/"+videos_index+"/video/" + id,
datatype: "application/json",
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization",AUTH);
},
success: function (result) {
if(type==0){
    console.log(result);
    //traitement rbihi

    $("."+cls+" .NFQ-load-img").hide();
    $("."+cls+" .NQF-vue-question").show();
    //add header
    // $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
    $("."+cls+" .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").css("text-transform", "none");

    /*
    $(".NQF-vue-question .NQF-prev-quest >b").text(result._source.QUESTIONS);
    $(".NQF-prev-resp").html(result._source.REPONSES);
    $(".NQF-categorie").val(result._source.type);
    */
   videoObject = result._source;
   if(result._source.plateforme=="Vimeo"){
        var urlemb = "https://player.vimeo.com/video/"+result._source.video_id;
   }else if(result._source.plateforme=="Youtube"){
        var urlemb = "https://www.youtube.com/embed/"+result._source.video_id;
   }

   console.log(urlemb);
   $("."+cls+" .NQF-vue-question .vue-video-frame").html("<iframe src="+urlemb+" width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
   $("."+cls+" .NQF-vue-question .vue-video-title b").html(result._source.title);
   $("."+cls+" .NQF-vue-question .vue-video-description").html(result._source.description);
   
    $("."+cls+" .NQF-id").val(id);
    $("."+cls+" .NQF-vue-question").show();
    $("."+cls+" .NQF-edit-modif").hide();
    $("."+cls+" .NQF-btn-alg").show();
   
    let a = $("."+cls+" .NQF-categorie")
    
    $("."+cls+" .NQF-new-quest-btn").show();

}else if(type==1){
    if(result._source.plateforme=="Vimeo"){
        createDivVideo(result,0,getVideoIndex(result._source.video_id,result._source.playlist));
    }else if(result._source.plateforme=="Youtube"){
        createDivVideo(result,1,getVideoIndex(result._source.video_id,result._source.playlist));
    }
      
      $("."+cls+" .searchGif2").hide();
      $("."+cls+" .consultation-video").show();

  
} 
},
error: function (error) {
console.log(error.responseText);
}
});
}

var ArticleObject = {};
function getArticle(id,type,cls,target,root){
if(type==0){
target.find("."+cls+" .NQF-new-quest-btn").show();
target.find("."+cls+" .NFQ-load-img").show();
target.find("."+cls+" .NQF-vue-question").hide();
var pos = target.find(".pcd-header-NQF").offset().top;
$('html,body').animate({
    scrollTop: pos
},
'fast');
}

target.find("."+cls+" .NFQ-all-quest").hide();

$.ajax({
type: "get",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/articles_index/article/" + id,
datatype: "application/json",
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization",AUTH);
},
success: function (result) {

    target.find("."+cls+" .NFQ-load-img").hide();
    target.find("."+cls+" .NQF-vue-question").show();
    //add header
    target.find("."+cls+" .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").css("text-transform", "none");
    
    ArticleObject = result._source;
    root.articleCms = result._source;

    target.find("."+cls+" .NQF-vue-question .vue-video-frame").html("<img src="+result._source.imgP+" width=\"90%\" height=\"100%\" frameborder=\"0\" >");
    target.find("."+cls+" .NQF-vue-question .vue-video-title b").html(result._source.title);
    target.find("."+cls+" .NQF-vue-question .vue-video-description").html(result._source.description);
   
    target.find("."+cls+" .NQF-id").val(id);
    target.find("."+cls+" .NQF-vue-question").show();
    target.find("."+cls+" .NQF-edit-modif").hide();
    target.find("."+cls+" .NQF-btn-alg").show();
   
    let a = target.find("."+cls+" .NQF-categorie");
    
    target.find("."+cls+" .NQF-new-quest-btn").show();


},
error: function (error) {
console.log(error.responseText);
}
});
}




function getAttachement(id,type,cls){
if(type==0){
$("."+cls+" .NQF-new-quest-btn").show();
$("."+cls+" .NFQ-load-img").show();
$("."+cls+" .NQF-vue-question").hide();
var pos = $(".pcd-header-NQF").offset().top;
$('html,body').animate({
    scrollTop: pos
},
'fast');
}else if(type==1){
$("."+cls+" .search-video").hide();
$("."+cls+" .consultation-video").hide();
$("."+cls+" .searchGif2").show();
}

$("."+cls+" .NFQ-all-quest").hide();

$.ajax({
type: "get",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/attachements_index/attachement/" + id,
datatype: "application/json",
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization",AUTH);
},
success: function (result) {
if(type==0){
    console.log(result);
    attachementObject = result._source;


    $("."+cls+" .NFQ-load-img").hide();
    $("."+cls+" .NQF-vue-question").show();
    //add header
    // $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
    $("."+cls+" .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").css("text-transform", "none");

    let plateforme = result._source.plateforme;
    let imgUrl = result._source.img_url;
    let attachement = result._source.attachement;

   $("."+cls+" .NQF-vue-question .vue-video-title b").html(result._source.title);
   $("."+cls+" .NQF-vue-question .vue-video-description").html(result._source.description);

 if(attachement.gedId==""){
       if(imgUrl.trim()!=""){
        $("."+cls+" .NQF-vue-question .vue-video-frame").html("<img src="+imgUrl+" width=\"90%\" height=\"100%\" frameborder=\"0\" >");
    }else{
        if(plateforme=="DOC"){
            $("."+cls+" .NQF-vue-question .vue-video-frame").html("<i class=\"fas fa-file-download\" style=\"font-size: 9VW;padding-top: 28px;padding-bottom: 28px;color: #38A;\"></i>")
        }else if(plateforme=="INSTALL"){
            $("."+cls+" .NQF-vue-question .vue-video-frame").html("<i class=\"fas fa-download\" style=\"font-size: 9VW;padding-top: 28px;padding-bottom: 28px;color: #38A;\"></i>")
        }
    }
}else{
    var krn = attachement.gedId.split("/")[0];
    $("."+cls+" .NQF-vue-question .vue-video-frame").html('<div class="docthumbnail"><img class="smallThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=small&amp;thumbnail=large&amp;or=img/no-file.svg"></div>');
}

    $("."+cls+" .NQF-id").val(id);
    $("."+cls+" .NQF-vue-question").show();
    $("."+cls+" .NQF-edit-modif").hide();
    $("."+cls+" .NQF-btn-alg").show();
   
    let a = $("."+cls+" .NQF-categorie")
    
    $("."+cls+" .NQF-new-quest-btn").show();

}else if(type==1){
    
    createDivAtt(result,0,null);
    $("."+cls+" .searchGif2").hide();
    $("."+cls+" .consultation-video").show();

} 
},
error: function (error) {
console.log(error.responseText);
}
});
}

function getVideoIndex(id,playlist){
var playlist_index = 0;
for(var i=0;i<playlist_videos.length;i++){
if(playlist_videos[i][0]!=undefined){
if(playlist==playlist_videos[i][0].playlist){
    playlist_index = i;
    break;
}
}else{
continue;
}
}

for(var i=0;playlist_videos[playlist_index].length;i++){
if(id==playlist_videos[playlist_index][i].video_id){
return { 
    "index": i,
    "playlist_index":playlist_index,
    "total":playlist_videos[playlist_index].length
 }
}
}
}

function createDivVideo(result,type,obj){
$(".consultation-video .consultation-video-title").html(result._source.title);
if(type==0){
$(".consultation-video .video-iframe iframe").attr("src","https://player.vimeo.com/video/"+result._source.video_id+"?rel=0");
$(".consultation-video .video-iframe iframe").addClass("vimeo-video-iframe");
$(".consultation-video .video-iframe iframe").removeClass("youtube-video-iframe");

}else{
$(".consultation-video .video-iframe iframe").attr("src","https://www.youtube.com/embed/"+result._source.video_id);
$(".consultation-video .video-iframe iframe").addClass("youtube-video-iframe");
$(".consultation-video .video-iframe iframe").removeClass("vimeo-video-iframe");
}
$(".consultation-video .video-description").html(result._source.description);

if(obj.total ==1){
$(".consultation-video .next-prev .next-video").attr("onClick","");
$(".consultation-video .next-prev .prev-video").attr("onClick","");
$(".consultation-video .next-prev .prev-video").removeClass("active-video");
$(".consultation-video .next-prev .next-video").removeClass("active-video");
}else{
if(obj.index==0){
var idN = playlist_videos[obj.playlist_index][obj.index+1].video_id;

$(".consultation-video .next-prev .prev-video").attr("onClick","getVideo(\""+idN.toString()+"\",1,\"classSearch-7\")");
$(".consultation-video .next-prev .next-video").removeClass("active-video");
$(".consultation-video .next-prev .next-video").attr("onClick","");
$(".consultation-video .next-prev .prev-video").addClass("active-video");
}else if(obj.index==obj.total-1){
var idP = playlist_videos[obj.playlist_index][obj.index-1].video_id;

$(".consultation-video .next-prev .prev-video").attr("onClick","");
$(".consultation-video .next-prev .prev-video").removeClass("active-video");
$(".consultation-video .next-prev .next-video").attr("onClick","getVideo(\""+idP.toString()+"\",1,\"classSearch-7\")");
$(".consultation-video .next-prev .next-video").addClass("active-video");
}else{

var idN = playlist_videos[obj.playlist_index][obj.index+1].video_id;
var idP = playlist_videos[obj.playlist_index][obj.index-1].video_id;

$(".consultation-video .next-prev .prev-video").attr("onClick","getVideo(\""+idN.toString()+"\",1,\"classSearch-7\")");
$(".consultation-video .next-prev .prev-video").addClass("active-video");
$(".consultation-video .next-prev .next-video").attr("onClick","getVideo(\""+idP.toString()+"\",1,\"classSearch-7\")");
$(".consultation-video .next-prev .next-video").addClass("active-video");

}
}
}


function createDivAtt(result,type,obj){

var plateforme = result._source.plateforme;
var imgUrl = result._source.img_url;
var attachementFileId = result._source.attachement.gedId;
var attachement = result._source.attachement;

if(attachementFileId==""){
$(".button-visual-down-1").attr("onclick","window.open(\""+result._source.url+"\")");
$(".button-visual-down-1").show();
$(".button-visual-down-2").hide();
}else{
$(".button-visual-down-2").attr("onclick","window.open(\""+contextPath+"/DownloadFile?gedId="+attachementFileId+"\")")
$(".button-visual-down-1").hide();
$(".button-visual-down-2").show();
}

if(attachementFileId==""){
if(imgUrl.trim()==""){

if(plateforme=="DOC"){
    var str = "<i class=\"fas fa-file-download\" style=\"font-size: 9VW;color: #38A;\"></i>";
}else{
    var str = "<i class=\"fas fa-download\" style=\"font-size: 9VW;color: #38A;\"></i>";
}
}else{
var str = '<img style="width:90%;height: auto;" src='+imgUrl+' alt="">';
}
}else{
var krn = attachement.gedId.split("/")[0];
var str = '<div class="docthumbnail"><img class="smallThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=small&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=large&amp;or=img/no-file.svg"></div>';
}

$(".consultation-video .consultation-video-title").html(result._source.title);
$(".consultation-video .video-iframe .thumbnail").html(str);
$(".consultation-video .video-iframe .description").html(result._source.description);
$(".consultation-video .video-description").html(result._source.text);

}




function createDivQuestionFaq(result){
$(".qst-faq .vpanel-title .blue-small").html(subLong(result._source.QUESTIONS,110));
$(".qst-faq .vpanel-title .blue-small").attr("title",result._source.QUESTIONS);
$(".qst-faq .vpanel-body .qst-body").html(result._source.QUESTIONS);
$(".qst-faq .vpanel-body .response-body").html(result._source.REPONSES);
$(".other-qst-faq .vpanel-title .blue-small").html(getTypeFaq(result._source.type));
}

function createDivQuestionRef(result){
$(".qst-faq .vpanel-title .blue-small").html(subLong(result._source.title,110));
$(".qst-faq .vpanel-title .blue-small").attr("title",result._source.title);
$(".qst-faq .vpanel-body .qst-body").html(result._source.title+"<span style=\"margin: 8px;background: #333;color: #fff;font-size: 16px;border-radius: 2px;padding: 3px 6px;\">"+result._source.typeRef+"</span>");
$(".qst-faq .vpanel-body .response-body").html(result._source.content);

if(result._source.urlV != undefined){
if(result._source.urlV.trim() != "" ){
    $(".qst-faq .vpanel-body .response-att button.download-fr").attr("onclick","window.open(\""+contextPath+"/DownloadFile?gedId="+result._source.attachementRef.gedId+"\")")
    $(".qst-faq .vpanel-body .iframe-tab iframe").attr("src",""+contextPath+"/DownloadFile?gedId="+result._source.attachementRef.gedId);
    $(".qst-faq .vpanel-body .response-att").show();
    $(".qst-faq .vpanel-body .iframe-tab iframe").show();
}else{
    $(".qst-faq .vpanel-body .response-att button.download-fr").hide();
    $(".qst-faq .vpanel-body .iframe-tab iframe").hide();
}

if(result._source.urlV2.trim() != "" ){
    if(result._source.urlV.trim() == ""){
        $(".qst-faq .vpanel-body .iframe-tab iframe").attr("src",""+contextPath+"/DownloadFile?gedId="+result._source.attachementRefAr.gedId);
        $(".qst-faq .vpanel-body .iframe-tab iframe").show();
    }
    $(".qst-faq .vpanel-body .response-att button.download-ar").attr("onclick","window.open(\""+contextPath+"/DownloadFile?gedId="+result._source.attachementRefAr.gedId+"\")")
    $(".qst-faq .vpanel-body .response-att").show();
}else{
    $(".qst-faq .vpanel-body .response-att button.download-ar").hide();
}

if(result._source.urlV.trim()=="" && result._source.urlV2.trim()==""){
    $(".qst-faq .vpanel-body .response-att").hide();
}
}else{
$(".qst-faq .vpanel-body .response-att").hide();
}


}


function getTypeFaq(type){
var types = ["E-SIGN","ADMINISTRATION","ARCHITECTE","DOCUMENT","PLATEFORME","GENERAL"];
var listType = ["e-Signature","Administration","Architecte","Pieces requises","Plateforme","Général"];
var index = types.indexOf(type);
return listType[index];
}

function NQF_add_questionDet(quest, cls) {
$(cls+":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt"><div class="vpanel-body-title " style="font-size: 14px;"><span class = 'NFQ-click-btn' >`+quest+`</span></div><hr class="NQF-horizontal-line " /></div>`)
}

function RestSearchFaqDet(prefix,page,size,type){
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
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data:str,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {    
       console.log(result);
       for(var i=0;i<result.responses.length;i++){
        if(result.responses[i].hits.hits.length!=0){
             
            for(let j=0; j<result.responses[i].hits.hits.length; j++){
                NQF_add_questionDet(result.responses[i].hits.hits[j]._source.QUESTIONS, ".NFQ-quest-type")
            }
            $(".NFQ-quest-type").append('<span  class="NFQ-end"/>');
            
        }
    }	   

},
error: function (error) {
console.log(error.responseText);
}
})

}


function RestSearchFaq(prefix,page,size,type,typeUse,cls,typee,target){
var str ="";
if(cls==undefined){
cls = "ow-view";
}


if(profilesT.indexOf("CONTENT_EDITOR")!=-1){
typee =  "ALL";
}
$("."+cls+" .faq-vbox .no-response-find").hide();
if(type==0){
$("."+cls+" .faq-fieldset").hide();
str+=generateRequestFaqSearch(prefix,"E-SIGN",page,size,typee); 
str+=generateRequestFaqSearch(prefix,"GENERAL",page,size,typee); 
str+=generateRequestFaqSearch(prefix,"DOCUMENT",page,size,typee); 
str+=generateRequestFaqSearch(prefix,"PLATEFORME",page,size,typee); 
str+=generateRequestFaqSearch(prefix,"ARCHITECTE",page,size,typee); 
str+=generateRequestFaqSearch(prefix,"ADMINISTRATION",page,size,typee);
if(profilesT.indexOf("CONTENT_EDITOR")!=-1){
str+=generateRequestFaqSearch(prefix,"INTERNE",page,size,typee);
}     
}else if(type==1){
str+=generateRequestFaqSearch(prefix,"E-SIGN",page,size,typee); 
}else if(type==2){
str+=generateRequestFaqSearch(prefix,"GENERAL",page,size,typee); 
}else if(type==3){
str+=generateRequestFaqSearch(prefix,"DOCUMENT",page,size,typee);
}else if(type==4){
str+=generateRequestFaqSearch(prefix,"PLATEFORME",page,size,typee);               
}else if(type==5){
str+=generateRequestFaqSearch(prefix,"ARCHITECTE",page,size,typee); 
}else if(type==6){
str+=generateRequestFaqSearch(prefix,"ADMINISTRATION",page,size,typee); 
}else if(type==7){
str+=generateRequestFaqSearch(prefix,"INTERNE",page,size,typee); 
}

console.log(str);

if(type!=0 && typeUse != -1){
$("."+cls+" .faq-fieldset .full-search-list").eq(type-1).html("");
$("."+cls+" .faq-fieldset .searchGif2").eq(type-1).show();
}else if(typeUse == -1){
$("."+cls+" .faq-fieldset-det .full-search-list").html("");
$("."+cls+" .faq-fieldset-det .searchGif2").show();
$("."+cls+" .NQF-edit-modif").hide();
$("."+cls+" .NFQ-all-quest").show();
}



$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data:str,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {    
console.log(result);
$("."+cls+" .searchGif").hide();
$("."+cls+" .faq-fieldset .searchGif2").hide();        
$("."+cls+" .faq-fieldset-det .searchGif2").hide();        
if(type!=0 && typeUse!=-1){
    fullCreateFaqByType(result.responses[0].hits.hits,type,undefined,cls,target);
    generatePaginationFaqPage((type-1),prefix,0,cls,typee,target,size);
}else if(type==0 && typeUse!=-1){
    var k = 0;
    console.log("ici");
    for(var i=0;i<result.responses.length;i++){
        if(result.responses[i].hits.hits.length!=0){
            if(prefix!=""){
                Array.from($("."+cls+" .faq-vbox")).forEach(function(e){
                    $("."+cls+" .faq-fieldset").eq(i).addClass("expanded");
                })
            }
            fullCreateFaqByType(result.responses[i].hits.hits,(i+1),undefined,cls,target);
            k++;
        }
        totalFaqPages[i]=result.responses[i].hits.total.value;
        generatePaginationFaqPage(i,prefix,0,cls,typee,target,size);
    }

    if(k==0){
        $("."+cls+" .faq-vbox .no-response-find").show();
    }
}else if(typeUse==-1){
    console.log("hello");
    
    
    fullCreateFaqByType(result.responses[0].hits.hits,1,typeUse,cls,target);
    totalFaqPages[type-1]=result.responses[0].hits.total.value;
    generatePaginationFaqPage((type-1),prefix,-1,cls,typee,target,size);
    console.log(result.responses[0].hits.total.value);
}
},
error: function (error) {
console.log(error.responseText);
}
})
}

var profilesT;

function fullCreateFaqByType(results,type,typeUse,cls,target){

if(typeUse==-1){
$("."+cls+" .faq-vbox").each(function(elm){
$(this).find(".faq-fieldset-det").show();
});

$("."+cls+" .faq-vbox").each(function(elm){
$(this).find(".faq-fieldset-det .full-search-list").html("");
});

for(i=0;i<results.length;i++){
var id = results[i]._id;
var titleTx = results[i]._source.QUESTIONS;
var text = results[i]._source.REPONSES;
var b = document.createElement("div");
b.setAttribute("class","hp-box full-search-list-item");
b.setAttribute("style","grid-template-columns: 100%;box-shadow: none;border: 1px solid #ddd;padding: 6px;height: 127px;background: #fcfcfc;/* margin-bottom:25px; */");
var d = document.createElement("div");
d.setAttribute("class","item-body");
d.setAttribute("style","padding:0 18px");
var e = document.createElement("div");
e.setAttribute("class","item-body-title");
e.setAttribute("style","font-size:16px");
e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,80)+"</span>";
var f = document.createElement("p");
f.innerHTML = subLong(text.replace(/<[^>]*>?/gm, ''),250);
f.setAttribute("style","font-size: 14px;text-align:left");
f.setAttribute("class","para-faq");
d.appendChild(e);
d.appendChild(f);
var g = document.createElement("a");

g.addEventListener("click",function(){
    var id=$(this).children("input").val();
    if(profilesT.match(/CONTENT_EDITOR/)!='CONTENT_EDITOR'){
        if(typePage==2 || typePage==5){
                ApplicationManager.run("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject="+id,"search", "FaqDetail", {});
        }else{
            getQsFaq(id,0,cls,target);
        }
    }else{
        toModifyFaq(id);
    } 
});

g.setAttribute("class","item-body-button");
g.setAttribute("style","color:#38a;border: none;text-decoration: underline;font-size:13px;bottom: 5px;right: 0px;");
g.innerHTML="Lire la suite ...<input type=\"hidden\" value=\""+id+"\" > ";
d.appendChild(g);
b.appendChild(d);



$("."+cls+" .faq-fieldset-det .full-search-list").append(b);

var hr = document.createElement("hr");
hr.setAttribute("style","background: #eee;border: 1px solid #eee;height: 0px;width: 88%;");
/*if(i!=results.length-1){
    $(".faq-fieldset-det .full-search-list").append(hr);                        
}*/

}
}else{

$("."+cls+" .faq-vbox").each(function(elm){
$(this).find(".faq-fieldset").eq((Number(type)-1)).show();
});

$("."+cls+" .faq-vbox").each(function(elm){
$(this).find(".faq-fieldset .full-search-list").eq((Number(type)-1)).html("");
});

for(i=0;i<results.length;i++){
var id = results[i]._id;
var titleTx = results[i]._source.QUESTIONS;
var text = results[i]._source.REPONSES;
var b = document.createElement("div");
b.setAttribute("class","hp-box full-search-list-item");
b.setAttribute("style","grid-template-columns: 100%;box-shadow: none;border: 1px solid #ddd;padding: 6px;height: 127px;background: #fcfcfc;/* margin-bottom:25px; */");
var d = document.createElement("div");
d.setAttribute("class","item-body");
d.setAttribute("style","padding:0 18px");
var e = document.createElement("div");
e.setAttribute("class","item-body-title");
e.setAttribute("style","font-size:16px");
e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,80)+"</span>";
var f = document.createElement("p");
f.innerHTML = subLong(text.replace(/<[^>]*>?/gm, ''),250);
f.setAttribute("style","font-size: 14px;text-align:left");
f.setAttribute("class","para-faq");
d.appendChild(e);
d.appendChild(f);
var g = document.createElement("a");
g.addEventListener("click",function(){
    var id=$(this).children("input").val();
    if(profilesT.match(/CONTENT_EDITOR/)!='CONTENT_EDITOR'){
        ApplicationManager.run("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject="+id,"search", "FaqDetail", {});
    }else{
        toModifyFaq(id);
    } 
});
g.setAttribute("class","item-body-button");
g.setAttribute("style","color:#38a;border: none;text-decoration: underline;font-size:13px;bottom: 5px;right: 0px;");
g.innerHTML="Lire la suite ...<input type=\"hidden\" value=\""+id+"\" > ";
d.appendChild(g);
b.appendChild(d);

var hr = document.createElement("hr");
hr.setAttribute("style","background: #eee;border: 1px solid #eee;height: 0px;width: 88%;");


$("."+cls+" .faq-vbox").each(function(elm){
    $(this).find(".faq-fieldset .full-search-list").eq((Number(type)-1)).append(b);
    /* if(i!=results.length-1){
        $(this).find(".faq-fieldset .full-search-list").eq((Number(type)-1)).append(hr);                        
    }*/
});
        
}
}
}

function fullCreateRefByType(results,type,typeUse){

if(typeUse==-1){
$(".faq-vbox").each(function(elm){
$(this).find(".faq-fieldset-det").show();
});

$(".faq-vbox").each(function(elm){
$(this).find(".faq-fieldset-det .full-search-list").html("");
});

for(i=0;i<results.length;i++){
var id = results[i]._id;
var titleTx = results[i]._source.title;
var description = results[i]._source.desc;
var text = results[i]._source.content;
var b = document.createElement("div");
b.setAttribute("class","hp-box full-search-list-item");
b.setAttribute("style","grid-template-columns: 100%;box-shadow: none;border: 1px solid #ddd;padding: 6px;height: 127px;background: #fcfcfc;/* margin-bottom:25px; */");
var d = document.createElement("div");
d.setAttribute("class","item-body");
d.setAttribute("style","padding:0 18px");
var e = document.createElement("div");
e.setAttribute("class","item-body-title");
e.setAttribute("style","font-size:16px");
e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,80)+"</span>";
var f = document.createElement("p");
f.innerHTML = subLong(text.replace(/<[^>]*>?/gm, ''),250);
f.setAttribute("style","font-size: 14px;text-align:left");
f.setAttribute("class","para-faq");
d.appendChild(e);
d.appendChild(f);
var g = document.createElement("a");

g.addEventListener("click",function(){
    var id=$(this).children("input").val();
    getRefJ(id,0,null);
});

g.setAttribute("class","item-body-button");
g.setAttribute("style","color:#38a;border: none;text-decoration: underline;font-size:13px;bottom: 5px;right: 0px;");
g.innerHTML="Lire la suite ...<input type=\"hidden\" value=\""+id+"\" > ";
d.appendChild(g);
b.appendChild(d);



$(".faq-fieldset-det .full-search-list").append(b);

var hr = document.createElement("hr");
hr.setAttribute("style","background: #eee;border: 1px solid #eee;height: 0px;width: 88%;");
/*if(i!=results.length-1){
    $(".faq-fieldset-det .full-search-list").append(hr);                        
}*/

}
}else{

$(".faq-vbox").each(function(elm){
$(this).find(".faq-fieldset").eq((Number(type)-1)).show();
});

$(".faq-vbox").each(function(elm){
$(this).find(".faq-fieldset .full-search-list").eq((Number(type)-1)).html("");
});

for(i=0;i<results.length;i++){
var id = results[i]._id;
var titleTx = results[i]._source.title;
var description = results._source.description;
var text = results[i]._source.content;
var b = document.createElement("div");
b.setAttribute("class","hp-box full-search-list-item");
b.setAttribute("style","grid-template-columns: 100%;box-shadow: none;border: 1px solid #ddd;padding: 6px;height: 127px;background: #fcfcfc;/* margin-bottom:25px; */");
var d = document.createElement("div");
d.setAttribute("class","item-body");
d.setAttribute("style","padding:0 18px");
var e = document.createElement("div");
e.setAttribute("class","item-body-title");
e.setAttribute("style","font-size:16px");
e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,80)+"</span>";
var f = document.createElement("p");
f.innerHTML = subLong(text.replace(/<[^>]*>?/gm, ''),250);
f.setAttribute("style","font-size: 14px;text-align:left");
f.setAttribute("class","para-faq");
d.appendChild(e);
d.appendChild(f);
var g = document.createElement("a");
g.addEventListener("click",function(){
    var id=$(this).children("input").val();
    ApplicationManager.run("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject="+id,"search", "FaqDetail", {});
});
g.setAttribute("class","item-body-button");
g.setAttribute("style","color:#38a;border: none;text-decoration: underline;font-size:13px;bottom: 5px;right: 0px;");
g.innerHTML="Lire la suite ...<input type=\"hidden\" value=\""+id+"\" > ";
d.appendChild(g);
b.appendChild(d);

var hr = document.createElement("hr");
hr.setAttribute("style","background: #eee;border: 1px solid #eee;height: 0px;width: 88%;");


$(".faq-vbox").each(function(elm){
    $(this).find(".faq-fieldset .full-search-list").eq((Number(type)-1)).append(b);
    /* if(i!=results.length-1){
        $(this).find(".faq-fieldset .full-search-list").eq((Number(type)-1)).append(hr);                        
    }*/
});
        
}
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
console.log(arr);
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

function moveKey(e,x,type,cls,target){
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
        if(target==undefined){
            $("."+cls+" .divSearchBar .search_button").click();    
        }else{
            target.find("."+cls+" .divSearchBar .search_button").click();    
        }
    }else{
        if(target==undefined){
            $("."+cls+" .div-full-search-bar .search_button").click();                        
        }else{
            target.find("."+cls+" .div-full-search-bar .search_button").click();                        
        }
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

function createPaginationBar(param){

var nbrPage = param.nbrPage;
var begin = param.begin;
var prefix = param.prefix;
var type = param.type;
var prev = param.prev;
var cls = param.cls;
var target = param.target;
var parent = param.parent;
var size = param.size;

var p = target.find("."+cls+" .pagination");
console.log(p.html());
console.log("tttt == "+"."+cls+" .pagination");
p.html("");
console.log(p.html());

var a = document.createElement("a");
        a.innerHTML="<i class=\"fas fa-angle-double-left\"></i>";
        a.addEventListener("click",function(){
            console.log("!next");
            previousPage({"prefix":prefix,"type":type,"cls":cls,"target":target,"parent":parent,"size":size});
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
            getPage({"page":begin+1,"prefix":prefix,"type":type,"prev":false,"cls":cls,"target":target,"parent":parent,"size":size});
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
            getPage({"page":Number(this.innerHTML),"prefix":prefix,"type":type,"prev":false,"cls":cls,"target":target,"parent":parent,"size":size});
            
        });
        p.append(a);        
    }
}
a = document.createElement("a");
a.innerHTML="<i class=\"fas fa-angle-double-right\"></i>";
a.addEventListener("click",function(){
event.preventDefault();
    console.log("next");
    nextPage({"prefix":prefix,"type":type,"cls":cls,"target":target,"parent":parent,"size":size});
});        
p.append(a);
}


function nextPage(param){
if(currentPage<totalPage){
currentPage++;
getPage({"page":currentPage,"prefix":param.prefix,"type":param.type,"prev":false,"cls":param.cls,"target":param.target,"parent":param.parent,"size":param.size});
}
}

function previousPage(param){
if(1<currentPage){
currentPage--;
if(currentPage<((currentLPage-1)*10)){
    getPage({"page":currentPage,"prefix":param.prefix,"type":param.type,"prev":true,"cls":param.cls,"target":param.target,"parent":param.parent,"size":param.size});
}else{
    getPage({"page":currentPage,"prefix":param.prefix,"type":param.type,"prev":false,"cls":param.cls,"target":param.target,"parent":param.parent,"size":param.size}); 
}
}
}

function getPage(param){
currentPage=param.page;
closeSearchList();
console.log("param",param);

if(param.type==0){
    restSearchList(param.prefix,(param.page-1)*param.size,param.prev); 
    var elm = $("."+param.cls+" .searchList .pagination a");
}else{
    restFullSearchList(param.prefix,(param.page-1)*param.size,param.prev,param.parent,param.cls,param.target);
    var elm = param.target.find("."+param.cls+" .pagination-second a");
}

if(param.prev==true){
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

function fullSearchList(results,cls,typePage,target){
	var a = target.find("."+cls+" .full-search-list");
	if(typePage== 1){
	console.log(results)
	for(i=0;i<results.length;i++){

	var id = results[i]._id;
	var titleTx = results[i]._source.title;
	var text = results[i]._source.desc;
	var type = results[i]._source.type;
	var typeTx = results[i]._source.typeRef;

	if(type=="1"){
	    type="ÉCONOMIQUE";
	}else if(type=="2"){
	    type="URBANISME";
	}else if(type=="3"){
	    type="AUTRE";
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
	f.innerHTML = subLong(text,180)+"<span style=\"background:#777;color:#FFF;display: inline-block;border-radius: 2px;padding: 1px 3px;\">"+typeTx+"</span>";
	f.setAttribute("style","font-size: 0.955vw;text-align: left;width: 100%;color: #777;")
	d.appendChild(e);
	d.appendChild(f);
	var g = document.createElement("a");
	g.addEventListener("click",function(){
	    var id=$(this).children("input").val();
	    if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
	        ApplicationManager.run("karaz/ux/hub/portailsearch/search/NewRefJuridique?query.idObject="+id,"search", "Référentiel juridique", {});
	    }else{
	        ApplicationManager.run("karaz/ux/hub/portailsearch/search/RefDetail?query.idObject="+id,"search", "Référentiel juridique", {});
	    } 
	});
	g.setAttribute("class","item-body-button");
	g.setAttribute("style","color:#38a;border: none;text-decoration: underline;text-align: right;width: 85%;display: block;");
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
	}else if(type=="AUTRE"){
	    style+="background:#f90";
	}

	title.setAttribute("style",style);
	title.innerHTML=subLong(type);
	b.appendChild(title);
	b.appendChild(d);
	a.append(b);
	}
	}else if(typePage == 2){
	var a1 = document.querySelectorAll("."+cls+" .faq-fieldset .full-search-list")[0];
	var a2 = document.querySelectorAll("."+cls+" .faq-fieldset .full-search-list")[1];
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

	}else if(typePage==80){

	console.log(results)
	for(i=0;i<results.length;i++){

	var id = results[i]._id;
	var titleTx = results[i]._source.title;
	var text = results[i]._source.description;
	var type = results[i]._source.type;
	var img = results[i]._source.imgP;
	var tags = results[i]._source.tags;
	var link = results[i]._source.link;
	var lang = results[i]._source.lang;

	var b = document.createElement("div");
	b.setAttribute("class","hp-box full-search-list-item");
	b.setAttribute("style","grid-template-columns: 0% 35% 65%;height: 190px;"); 

	var imgit = document.createElement("div");
	imgit.setAttribute("class","item-img");
	imgit.innerHTML="<img style=\"width: 93%;height: 170px;position: relative;    right: -9px;top: -11px;\" src=\""+img+"\"/>";

	var d = document.createElement("div");
	d.setAttribute("class","item-body");
	d.setAttribute("style","padding:0 15px");
	var e = document.createElement("div");
	e.setAttribute("class","item-body-title");
	if(lang=="Ar"){
	    e.setAttribute("style","font-size:16px;text-align: right;direction: rtl;font-family: Droid Arabic Kufi, sans-serif;");

	}else{
	    e.setAttribute("style","font-size:16px");
	}  
	e.innerHTML="<span title=\""+titleTx+"\">"+subLong(titleTx,60).toUpperCase()+"</span>";
	var f = document.createElement("p");
	f.innerHTML = subLong(text,200);
	if(lang=="Ar"){
	    f.setAttribute("style","font-size: 0.955vw;text-align: left;width: 100%;color: #777;text-align: right;direction: rtl;font-family: Droid Arabic Kufi, sans-serif;")

	}else{
	    f.setAttribute("style","font-size: 0.955vw;text-align: left;width: 100%;color: #777;")
	}

	d.appendChild(e);
	d.appendChild(f);

	var tgg = document.createElement("div");

	tags.forEach(function(elm){
	    tgg.innerHTML += "<span style=\" background:#38a;color:#fff;padding: 0px 4px;margin: 4px;border-radius: 3px;cursor:pointer; \">"+elm.tag+"</span>";
	});
	d.appendChild(tgg);

	var g = document.createElement("a");
	var g2 = null;

	if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
	    g2 = document.createElement("a");
	}

	g.addEventListener("click",function(){
	    var id=$(this).children("input").val();
	    var typee=$(this).children("input").attr("idd");

	    if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
	        ApplicationManager.run("karaz/ux/hub/portailsearch/search/NewArticle?query.idObject="+id,"search", "Article CMS", {});
	    }else{
	        if(typee=="REVUE DE PRESSE"){
	            window.open(id);
	        }else{
	            ApplicationManager.run("karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject="+id,"search", "DetailsActivitySearch", {});
	        }
	    } 
	});

	if(g2!=null){
	    g2.addEventListener("click",function(){
	        var id=$(this).children("input").val();
	        var typee=$(this).children("input").attr("idd");
	        if(typee=="REVUE DE PRESSE"){
	            window.open(id);
	        }else{
	            ApplicationManager.run("karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject="+id,"search", "DetailsActivitySearch", {});
	        }
	    });
	   
	    if(type=="REVUE DE PRESSE"){
	        g2.innerHTML="Ouvrir <input type=\"hidden\" value=\""+link+"\" idd=\""+type+"\" > ";
	        g2.setAttribute("style","color:#38a;border: none;text-decoration: underline;margin-right:8px;width: 100%;position: inherit;text-align: right;font-size:14px");

	    }else{
	        g2.innerHTML="Ouvrir <input type=\"hidden\" value=\""+id+"\" idd=\""+type+"\" > ";
	        g2.setAttribute("style","color:#38a;border: none;text-decoration: underline;margin-right:8px;width: 100%;position: inherit;text-align: right;font-size:14px");
	    }
	}



	if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
	    g.innerHTML="Modifier <input type=\"hidden\" value=\""+id+"\" idd=\""+type+"\" > ";
	    g.setAttribute("style","color:#38a;border: none;text-decoration: underline;width: 100%;position: inherit;text-align: right;");
	}else{
	    if(type=="REVUE DE PRESSE"){
	        g.innerHTML="Consulter sur <b>"+results[i]._source.source+"</b><input type=\"hidden\" value=\""+link+"\" idd=\""+type+"\" > ";
	        g.setAttribute("style","color:#38a;border: none;text-decoration: underline;width: 100%;position: inherit;text-align: right;font-size:14px");

	    }else{
	        g.innerHTML="Lire la suite <input type=\"hidden\" value=\""+id+"\" idd=\""+type+"\" > ";
	        g.setAttribute("style","color:#38a;border: none;text-decoration: underline;width: 100%;position: inherit;text-align: right;font-size:14px");
	    }  
	}  

	var l = document.createElement("div");
	l.setAttribute("style","color:#38a;border: none;text-decoration: underline;display: block;width: 100%;position: inherit;text-align: right;font-size:14px");

	g.setAttribute("class","item-body-button");

	if(g2!=null){
	    l.appendChild(g2);
	}

	l.appendChild(g);

	d.appendChild(l);

	var title = document.createElement("div");
	title.setAttribute("class","item-title");
	title.setAttribute("title",type);
	var style = "line-height:30px;top: 59px;height: 30px;right: 100px;width:190px;";

	if(type=="PRATIQUE"){
	    style+="background:#38a";
	}else if(type=="A LA UNE"){
	    style+="background:#f90";
	}else if(type=="REVUE DE PRESSE"){
	    style+="background:#363"; 
	}

	title.setAttribute("style",style);
	title.innerHTML = subLong(type);
	b.appendChild(title);
	b.appendChild(imgit);
	b.appendChild(d);
	a.append(b);
	}


	}else{
	for(i=0;i<results.length;i++){
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
	    b.setAttribute("style","height: 192px;");
	    var c = document.createElement("div");
	    c.setAttribute("class","c-path");
	    // c.innerHTML="<span class=\"p p1\">"+typeAG+"</span>"+"<span class=\"cl-orange\"> > </span> <span class=\"p p2\">"+typeAc+"</span><span class=\"cl-orange\"> > </span> <span class=\"p p3\">"+nature+"</span>";
	    var s = document.createElement("span");
	    s.setAttribute("class","cl-orange");
	    s.innerHTML=" > ";
	    c.appendChild(addEventSpan("p1",typeAt,cls,target));
	    c.appendChild(s);
	    // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
	    c.appendChild(addEventSpan("p2",typeAc,cls,target));
	    s = document.createElement("span");
	    s.setAttribute("class","cl-orange");
	    s.innerHTML=" > ";
	    c.appendChild(s);
	    // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
	    c.appendChild(addEventSpan("p3",nature,cls,target));
	    var d = document.createElement("div");
	    d.setAttribute("class","item-body");
	    var e = document.createElement("div");
	    e.setAttribute("class","item-body-title");
	    e.innerHTML="<span title=\""+intituleFr+"\">"+subLong(intituleFr,60)+"</span>";
	    e.innerHTML+="<span class=\"complete-text\">"+intituleFr+"</span>";
	    var f = document.createElement("p");
	    //f.innerHTML= "Etablissement dispensant des cours de stylisme et modélisme de vêtements modernes ou traditionnels. Etablissement dispensant des cours de stylisme et modélisme de ...";
	    f.innerHTML = subLongAr(intituleAr,75);
	    f.setAttribute("title",intituleAr);
	    d.appendChild(c);
	    d.appendChild(e);
	    d.appendChild(f);

	    var typeAtts= "";
	    if(typeAt=="Établissement classé" || typeAt=="Occupation Domaine Public"){
	        typeAtts = typeAt+";"+typeAc;
	    }else if(typeAt=="Autorisations urbanisme"){
	        typeAtts = typeAt+";"+nature;
	    }else{
	        typeAtts = typeAt;
	    }
	    var indexProc = procedureList[0].indexOf(typeAtts);
	    var g = document.createElement("button");
	    g.setAttribute("procName",procedureList[1][indexProc]);

	    g.addEventListener("click",function(){
	        var id=$(this).children("input").val();
	        var procName = $(this).attr("procName");
	        //ApplicationManager.run("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
	        ApplicationManager.run("karaz/ux/hub/portailsearch/search/"+procName, "search", `Procédure`, {});
	    });
	    g.setAttribute("class","item-body-button hp-sbox-btn");
	    g.innerHTML="Voire procédure<input type=\"hidden\" value=\""+id+"\" > ";
	    g.setAttribute("style","display: inline-block;color: #333;background: #f5f5f5;border: 1.2px solid #333 !important;border-radius: 15px;");
	    d.appendChild(g);
	    var title = document.createElement("div");
	    title.setAttribute("class","item-title");
	    title.setAttribute("style","background:"+setting.color+";width: 192px;top: 64px;right: 105px;");
	    title.setAttribute("title",typeAt);
	    title.innerHTML=subLong(typeAt);
	    title.addEventListener("click",function(){
	        currentPage=0;
	        $(".div-full-search-bar .hp-search_field input").val($(this).attr("title").toLowerCase());
	        restFullSearchList($(this).html(),0,false,4,cls,target);
	    });
	    b.appendChild(title);
	    var icons = document.createElement("div");
	    icons.setAttribute("class","item-icon");
	    icons.innerHTML="<i class=\"far fa-file-image\" /><i class=\""+setting.icon+"\" />";
	    b.appendChild(icons);
	    b.appendChild(d);
	    a.append(b);
	}
	}
	}



var procedureList = [["Simple Déclaration",
            "Établissement classé;Classe 2",
            "Établissement classé;Classe 3",
            "Occupation Domaine Public;Travaux Publics",
            "Occupation Domaine Public;Télécom",
            "Occupation Domaine Public;Affichage Publicitaire",
            "Occupation Domaine Public;Activité Normale",
            "Occupation Domaine Public;Stationnement Réservé",
            "Autorisations urbanisme;Projets de construction de groupes d'habitation",
            "Autorisations urbanisme;Projet de lotissement",
            "Autorisations urbanisme;Modifications de constructions existantes",
            "Autorisations urbanisme;Projet de morcellement",
            "Autorisations urbanisme;Projet de construction d'équipement à usage public",
            "Autorisations urbanisme;Projet de construction à usage d'habitation",
            "Autorisations urbanisme;Projet de construction d'institution à caractère industriel",
            "Autorisations urbanisme;Projet de construction à usage mixte",
            "Autorisations urbanisme;Equipements commerciaux",
            "Autorisations urbanisme;Projet de construction d'équipement à usage commercial"],
            ["SimpleDeclaration",
            "EtablissementClasse2",
            "EtablissementClasse",
            "OccupationDomainPubRp",
            "OccupationDomainPubRT",
            "AffichagePub",
            "OccupationDomainPubUC",
            "OccupationDomainPubUC",
            "autorusationConstructionGroupesHabitations",
            "autorusationLotissement",
            "",
            "autorisationMorcellement",
            "AutorisationsConstructionGrandsProjets",
            "AutorisationsConstructionGrandsProjets",                 
            "AutorisationsConstructionGrandsProjets",
            "AutorisationsConstructionGrandsProjets",
            "AutorisationsConstructionGrandsProjets",
            "AutorisationsConstructionGrandsProjets"                  
            ]];


function subLong(text,max){
if(text.length>max){
return text.substring(0,max-6)+"<span class=\"dot-3\">...</span>";
}
return text;
}

function subLongAr(text,max){
if(text.length>max){
return "<span class=\"dot-3\">...</span>"+text.substring(0,max-6);
}
return text;
}

function addEventSpan(spanClass,text,cls,target){
var span = document.createElement("span");
span.setAttribute("class","p "+spanClass);
span.addEventListener("click",function(){
currentPage=0;
$("."+cls+" .div-full-search-bar .hp-search_field input").val($(this).html().toLowerCase());
    if($(this).attr("class").split(' ')[1]==="p1"){
        restFullSearchList($(this).html(),0,false,1,cls,target);
    }else if($(this).attr("class").split(' ')[1]==="p2"){
        restFullSearchList($(this).html(),0,false,2,cls,target);
    }else if($(this).attr("class").split(' ')[1]==="p3"){
        restFullSearchList($(this).html(),0,false,3,cls,target);
    }else{
       restFullSearchList($(this).html(),0,false,1,cls,target);
    } 
});
span.innerHTML=text;
return span;
}


function highlights(request,result){
result = result.toLowerCase();
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
var requestSplit = request.replace(/'/g," ").replace(/"/g," ").replace(/`/g," ");
var posArray = highlights(requestSplit,result);
var nbrPos = posArray[0].length;

if(nbrPos!=0){
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
}else{
hl= result;
}

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
xhttp.open("GET",URL_SEARCH+"?operation=wselastic&shortUrl="+"/activite_economique/activite/"+id);
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

function noResults(cls){
var a = document.createElement("div");
a.setAttribute("style","text-align: left;width: 50;margin: auto;width: 60%;");
a.innerHTML="Aucune activité ne correspond aux termes de recherche spécifiés.<br/><br/>Suggestions :<br/>- Vérifiez l’orthographe des termes de recherche.<br/>- Essayez d'autres mots.<br/>- Utilisez des mots clés plus généraux.";
$("."+cls+" .full-search-list").append(a);
}


/*feature etat d'avancement dossier*/

function getFolderId(ref,cin){
$(".folder-feature .folder-feature-body i.fa-caret-right,.folder-feature .folder-feature-body i.fa-caret-left").hide();
var indexOf = getWsLink(ref.trim()); 
console.log("indexOf :"+indexOf);

if(ref.trim()==""){
$(".last-log input").blur();
$(".folder-feature .folder-feature-header i").click();
}else if(ref.trim()!="" && indexOf==null ){
$(".folder-feature-body .folder-steps .no-response").show();
$(".folder-feature .folder-feature-body .progressbar").html("");
$(".folder-feature-body .folder-steps .no-response .ref").html(ref);

if(testWidth($(window).width(),640)){
$(".folder-feature").find("div:not(.no-response)").show("fast");
$(".folder-feature").animate({'width':'show'},function(){});
}else{
$(".folder-feature").find("div:not(.no-response)").show("fast");
$(".folder-feature").slideDown();
}
}else{
$(".relative-position .last-log .loadGif").show();
$(".relative-position .folder-feature-header span").html(ref);    
$.ajax({
type: "get",
url: autListId[indexOf].url+"?query.reference="+ref.trim().toUpperCase()+"&apiKey="+autListId[indexOf].apiKey+"&offset=0&limit=10&sortInfo=id=ASC",
datatype: "application/json",
success: function (result) { 
    var newArray = transformFolder2Array(result.data);
    var index = newArray[1].indexOf(ref.trim().toUpperCase());
    if(index!=-1){
        $(".folder-feature-body .folder-steps .no-response").hide();
        getFolder(newArray[0][index],ref.trim().toUpperCase(),indexOf);
    }else{
        $(".relative-position .last-log .loadGif").hide();
        $(".folder-feature-body .folder-steps .no-response").show();
        $(".folder-feature .folder-feature-body .progressbar").html("");
        $(".folder-feature-body .folder-steps .no-response .ref").html(ref);

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
    console.log(error);
}
});
}
}

var prefixList = [["AMN","PCT","GRP","LOT","MDF","MRC","ELV"],["PH"],["ODP-AP"],["EC"],["ODP-AN"],["ODP"],["SD"]];


function getWsLink(ref){
var prefix = ref.split("-")[0];

if(prefix=="ODP"){
if(ref.split("-")[1]=="AN"){
prefix+="-AN";
}else if(ref.split("-")[1]=="AP"){
prefix+="-AP";
}
}

for(var i=0;i<URL_WS_FE2.length;i++){
if(prefixList[i].indexOf(prefix)!=-1){
break;
}
}

if(i==prefixList.length){
return null;
}else{
return i;
}
}

function getFolder(id,ref,indexOf){
$.ajax({
type: "get",
url: autListId[indexOf].url_id+"/"+id+"?processStates=true&apiKey="+autListId[indexOf].apiKey,
datatype: "application/json",
success: function (result) {
var array1 = arrayHistoricGenrated(result.historic);
var array2 = refrechArrayHistoriques(array1);

/* 
console.log(array2);

if(array2[0][0].length>10){
array2[0][0] = array2[0][0].splice(array2[0][0].length-10,array2[0][0].length);
array2[0][1] = array2[0][1].splice(array2[0][1].length-10,array2[0][1].length);
array2[0][2] = array2[0][2].splice(array2[0][2].length-10,array2[0][2].length);
}
*/
var begEnd = begEndSteps(array2[0][2]);
arrayHistoricGenratedDiv(array2[0],ref,begEnd);

if(testWidth($(window).width(),640)){
    $(".folder-feature").find("div:not(.no-response)").show("fast");
    $(".folder-feature").animate({'width':'show'},function(){});
}else{
    $(".folder-feature .folder-feature-body i.fa-caret-right,.folder-feature .folder-feature-body i.fa-caret-left").hide();
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

function begEndSteps(tab){
var beg = 0;
var end = tab.length-1; 
var maxSize = 7; 
if(tab.indexOf("active")!=-1){
if(tab.length<=maxSize){
return {"begin":beg,"end":end};    
}else if(tab.indexOf("active") < tab.length-3 && tab.indexOf("active") > 3){
return {"begin":tab.indexOf("active")-3,"end":tab.indexOf("active")+3};
}else{ 
if( tab.indexOf("tree") <= 3){
return {"begin":beg,"end":beg+6}
}else if( tab.indexOf("active") >= tab.length-3 ){
return {"begin":end-6,"end":end};
}
}
}else{
if(tab.length>=maxSize){
if(tab[0]=="active"){
return {"begin":end-6,"end":end};
}else{ 
return {"begin":beg,"end":beg+6}
}
}else{
return {"begin":beg,"end":end};    
}
}
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


var UID = {
_current: 0,
getNew: function(){
this._current++;
return this._current;
}
};

var proc = 13;
var beginStep = 0;
var endStep = 10;
var totalStep = 10;

/*
function showSteps(beg,end){
var stepsH = $(".folder-feature .folder-feature-body .progressbar li");
for(var i=0;i<stepsH.length;i++){
if( (i>=begEnd.begin && i<=begEnd.end) || !testWidth($(window).width(),640) ){
li.setAttribute("style","width:"+(proc-1)+"%");
}else{
li.setAttribute("style","visibility:hidden;width:0;height:0");
}
}    
}*/

function nextGeneratedDiv(){
if(endStep+6<totalStep){    
var begEnd = {
"begin":beginStep+6,
"end":Math.min(endStep+6,totalStep)
};
}else{
console.log("this");
var begEnd = {
"begin":totalStep-6,
"end":totalStep
};
}
arrayHistoricGenratedDiv(historiquesGlo,refer,begEnd);
}

function prevGeneratedDiv(){
if(beginStep-6>6){    
var begEnd = {
"begin": Math.max(0,beginStep-6),
"end": endStep-6
};
}else{
var begEnd = {
"begin": 0,
"end": 6
};
}
arrayHistoricGenratedDiv(historiquesGlo,refer,begEnd);
}

var historiquesGlo = [];
var refer = "";
function arrayHistoricGenratedDiv(historiques,ref,begEnd){

historiquesGlo = historiques;
refer = ref;
var maxSize = 7;

var divGlo = $(".folder-feature .folder-feature-body .progressbar");
divGlo.html("");
$(".folder-feature .folder-feature-header div span").html(ref);

var leng =  (begEnd.end-begEnd.begin+1);

proc = 100/leng;

if(historiques[0].length>maxSize){
$(".folder-feature .folder-feature-body i.fa-caret-right,.folder-feature .folder-feature-body i.fa-caret-left").show();
}

totalStep = historiques[0].length-1;

for(var i=0;i<historiques[0].length;i++){
var label = historiques[0][i];
var date = historiques[1][i];
var status = historiques[2][i];
var li = document.createElement("li");

beginStep = begEnd.begin;
endStep = begEnd.end;

if( (i>=begEnd.begin && i<=begEnd.end) || !testWidth($(window).width(),640) ){
    li.setAttribute("style","width:"+(proc-1)+"%");
}else{
    li.setAttribute("style","visibility:hidden;width:0;height:0");
}

if(status =="done"){
    if(i==begEnd.begin){
        li.setAttribute("class","bf-active first-step");
    }else{
        li.setAttribute("class","bf-active");
    }
    li.innerHTML= "<span class=\"step-title\">"+label+"</span><span class=\"step-date\">"+date.split(" ")[0]+"</span>";
}else if(status =="active"){
    if(i==begEnd.begin){
        li.setAttribute("class","active first-step");
    }else{
        li.setAttribute("class","active");
    }
    li.innerHTML= "<span class=\"step-title\">"+label+"</span><span class=\"step-date\"></span>";
}else{
    if(i==begEnd.begin){
        li.setAttribute("class","first-step");
    }else{
        li.setAttribute("class","");
    }
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

var chiffres = [1500,900,800,300];
var chiffresIni = [1500,900,800,300];


function getCountCommune(){
$.ajax({
type: "get",
url: URL_COMMUNE,
datatype: "application/json",
//contentType: "application/json",
success: function (result) {    
chiffres[0]=result.totalLength;
},
error: function (error) {
console.log(error.responseText);
}
});
}

function scrollChiffreFunction(){
$(window).scroll(function() {
console.log($(this).scrollTop());
if($(this).scrollTop() > $("cms-topictitle").eq(0).offset().top+200 ){
counterNumber($("box-card box-big-title").eq(4),chiffres[0],1)
counterNumber($("box-card box-big-title").eq(5),chiffres[1],1)
counterNumber($("box-card box-big-title").eq(6),chiffres[2],1)
counterNumber($("box-card box-big-title").eq(7),chiffres[3],1)
}
});
}

function counterNumber(counter,number,type){

if(type==0){
var duration = 5000;
}else if(type==1){
//counter.stop();
var duration = 1500;
}

counter.animate({ countNum: number  }, {
duration: duration,
easing: 'linear',
step: function () {
counter.html("+"+Math.floor(this.countNum));
},
complete: function () {
//$("box-card box-big-title").eq(4).html(this.countNum + "+");
//alert('finished');
}
});
}