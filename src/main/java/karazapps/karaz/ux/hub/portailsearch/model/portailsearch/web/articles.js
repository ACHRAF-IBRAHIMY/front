
function getAllArticlesByType(prefix,type,varfl,pp,clas,root,context){
    currentPage=0;
    root.query.typeArticle = pp;
    context.formRender.notifyObservers("query.typeArticle");
    var pp = root.query.typeArticle;

    if(pp==""){
        pp=0;
    }
 
    if(root.query.typeArticle==""){
        $(".classSearch-80 .vpanel-title .title-2x").html("TOUS");
      }else if(root.query.typeArticle==1){
        $(".classSearch-80 .vpanel-title .title-2x").html("ASTUCES ET FONCTIONNALITES");
      }else if(root.query.typeArticle==2){
       $(".classSearch-80 .vpanel-title .title-2x").html("A LA UNE");
      }else if(root.query.typeArticle==3){
        $(".classSearch-80 .vpanel-title .title-2x").html("A VENIR");
      }

    restFullSearchList(prefix,type,varfl,pp,clas);
}

function createArticlesHtml(clas,result){
var divGlo = $(clas);
$(clas).html("");

result.forEach(function(elm){
    var div1 = document.createElement("div");
    div1.setAttribute("class","ow-vl ow-vbox article");

    var div2 = document.createElement("div");
    div2.setAttribute("class","ow-vl-inner");

    var div3 = document.createElement("div");
    div3.setAttribute("class","ow-html");

    var img = document.createElement("img");
    img.setAttribute("src",elm._source.imgP);
    div3.appendChild(img);

    var div4 = document.createElement("div");
    div4.setAttribute("class","ow-html toggle-art");
    div4.setAttribute("style","padding:3px 12px;");


    var htitle =  document.createElement("h3");
    htitle.innerHTML = elm._source.title;
    htitle.setAttribute("style","font-size:19px;font-weight: 600;");

    var par = document.createElement("p");
    par.setAttribute("style","color:#666;font-size:15px;text-align:left");
    par.innerHTML = subLong(elm._source.description,190);
    var tags = elm._source.tags;
    var div5 = document.createElement("div");

    for(var i=0;i<tags.length;i++){
        var span = document.createElement("span");
        span.setAttribute("class","tag");
        span.innerHTML = tags[i].tag;
        div5.appendChild(span);
    }

    var div6 = document.createElement("div");
    div6.setAttribute("class","pub-by");
    div6.setAttribute("style","color:#333;font-size:15px");
    try{
        div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">'+elm._source.author.split("|")[0].trim()+'</span> <span style="">'+elm._source.author.split("|")[1].trim()+'</span></span>';
    }
    
    catch(e){
        div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">'+elm._source.author+'</span></span>';

    }
    
    div4.appendChild(htitle);
    div4.appendChild(par); 
    div4.appendChild(div5);
    div4.appendChild(div6);

    var div7 = document.createElement("div");
    div7.setAttribute("class","ow-html footer-article");
    div7.setAttribute("style","color:#666;font-size:15px");

    var span2 = document.createElement("span");
    span2.innerHTML = '<i style="color:#38A" class="fas fa-calendar-alt"></i> '+elm._source.datePr.split(" ")[0].replace(/-/g,"/");

    var span3 = document.createElement("span");
    span3.innerHTML = '<i style="color:#ce1515" class="fas fa-heart"></i> '+elm._source.like;

    var span4 = document.createElement("span");
    span4.innerHTML = '<i class="fas fa-eye"></i> '+elm._source.vue;

    div7.appendChild(span2);
    div7.appendChild(span3);
    div7.appendChild(span4);

    div2.appendChild(div3);
    div2.appendChild(div4);
    div2.appendChild(div7);

    div1.appendChild(div2);

    div1.addEventListener("click",function(){
        ApplicationManager.run(`karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject=${elm._id}`,`search`, `DetailsActivitySearch`, {});
    });

    divGlo.append(div1);

});
}


function getMostPopularArticle(size,type,clas){

var obj = {
    "size":size,"query":{
   "term":{
        "type.keyword":type
    }
    },"sort":[{ "vue" : {"order" : "desc"}}]
     
};


if(type==""){
     obj = {
        "size":size,"query":{
            "match_all":{}
        
        },"sort":[{ "datePr" : {"order" : "desc"}}]
         
    };
}

$.ajax({
    type: "post",
    url: URL_SEARCH + "/articles_index/article/_search",
    datatype: "application/json",
    contentType: "application/json",
    data:JSON.stringify(obj),
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
    }
}).done(function(result){
        createArticlesHtml(clas,result.hits.hits);
    
});

}


function getObjectArticle(id){
$(".divSearch-article .search-details-icon img").show();
$.ajax({
    type: "get",
    url: URL_SEARCH + "/articles_index/article/"+id,
    datatype: "application/json",
    contentType: "application/json",
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
    }
}).done(function(results){

    var obj = results._source; 
    $(".classSearch-82 .vpanel-title .title-2x").html(obj.type);
    $(".divSearch-article .article-title h1").html(obj.title);
    $(".divSearch-article .det-div .author-pub").html(obj.author);
    $(".divSearch-article .det-div .date-pub").html(obj.datePr.split(" ")[0].replace(/-/g,"/"));
    $(".divSearch-article .date-det span").eq(0).html(obj.vue);
    $(".divSearch-article .date-det span").eq(1).html(obj.like);
    $(".divSearch-article .article-img img").attr("src",obj.imgP);
    $(".divSearch-article .article-desc div p").html(obj.description);
    $(".divSearch-article .content-article").html(obj.content);
    $(".divSearch-article .search-details-icon img").hide();
    $(".divSearch-article .div-fsb-details .fsb-container").show();
});
}