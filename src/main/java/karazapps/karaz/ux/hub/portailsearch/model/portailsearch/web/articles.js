
function addLike(user,id,target){
    var obj = {
        "script" : {
            "source": "ctx._source.like ++;ctx._source.liste_like.add(params.text)",
            "lang": "painless",
            "params" : {
                
                    "text":user
                
            }
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "/articles_index/_update/"+id,
        datatype: "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function(result){
            target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())+1);
        }
    });
}

function removeLike(root,user,target){
    var obj = {
        "script" : {
            "source": "ctx._source.like --;ctx._source.liste_like.remove(ctx._source.liste_like.indexOf(params.tag.text))",
            "lang": "painless",
            "params" : {
                "tag" : {
                    "text":user
                }
            }
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "/articles_index/_update/"+root.article._id,
        datatype: "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function(){
            target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
            target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);

        }
    });
}

function isEmailValidArt(value){
    try{
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( reg.test(value)){
            return true;
        }else{
            return false;
        }
    }catch(e){
        console.log("ERROR in Javascript function isValidEmail(value) .......");
    }        
}

function addComment(root,target){

    

    if(root["articleCommentName"].trim()==""){
        target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre nom");
        return ;
    }
    
    if(root["articleCommentLastName"].trim()==""){
        target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre prénom");
        return ;

    }
    
    if(!isEmailValidArt(root["articleCommentEmail"])){
        target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre email valide")
        return ;
    }

    if(root["articleComment"].trim()==""){
        target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre commentaire");
        return ;
    }

    var comment = {
        "nom": root["articleCommentName"],
        "prenom":root["articleCommentLastName"],
        "email":root["articleCommentEmail"],
        "text":root["articleComment"]
    };

    addCommentRest(root,target,comment);
}

function createDivComments(comments,target){
    var i = 0;
    comments.forEach(function(elm){
        var div = document.createElement("div");
        div.setAttribute("class","ow-vl ow-vbox");
        var div1 = document.createElement("div");
        div1.setAttribute("class","ow-vl-inner ow-gbox");
        div1.setAttribute("style","grid-template-columns: 20% 80%;");
        var div2 = document.createElement("div");
        div2.setAttribute("class","ow-vl ow-vbox comment-user-img");
        var div3 = document.createElement("div");
        div3.setAttribute("class","ow-vl-inner");
        var div4 = document.createElement("div");
        div4.setAttribute("class","ow-html");
        div4.innerHTML = "<img src="+"./img/defaultAvatar.png"+" style=\"width: 89px;margin-top: 11px;\" />";
        var div5 = document.createElement("div");
        div5.setAttribute("class","ow-vl ow-vbox comment-det");
        var div6 = document.createElement("div");
        div6.setAttribute("class","ow-vl-inner");
        var div7 = document.createElement("div");
        div7.setAttribute("class","ow-html");
        var div8 = document.createElement("div");
        div8.setAttribute("class","comment-user-name");
        div8.setAttribute("style","font-size: 17px;font-weight: 600;");
        div8.innerHTML = elm.nom + " " + elm.prenom;
        var div9 = document.createElement("div");
        div9.setAttribute("class","comment-det");
        div9.innerHTML = elm.text;
        var div10 = document.createElement("div");
        div10.setAttribute("class","div-date");
        div10.setAttribute("index",i);
        var span = document.createElement("span");
        span.innerHTML = "20/11/2019";
        span.setAttribute("style","font-size: 14px;display: inline-block;margin-right: 8px;")
        var span1 = document.createElement("span");
        span1.innerHTML="Répondre";
        span1.setAttribute("style","cursor:pointer");
        span1.addEventListener("click",function(){
            alert(this.parentNode.getAttribute("index"));
        });

        div10.appendChild(span);
        div10.appendChild(span1);
        div7.appendChild(div8);
        div7.appendChild(div9);
        div7.appendChild(div10);
        div6.appendChild(div7);
        div5.appendChild(div6);
        div3.appendChild(div4);
        div2.appendChild(div3);
        div1.appendChild(div2);
        div1.appendChild(div5);
        div.appendChild(div1);
        i++;

        target.find(".comments-list > .ow-vl-inner").append(div);
    });
}


function addCommentRest(root,target,comment){
    var obj = {
        "script" : {
            "source": "ctx._source.comments.add(params.comment)",
            "lang": "painless",
            "params" : {
                "comment" : comment
            }
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "/articles_index/_update/"+root.article._id,
        datatype: "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function(){
        //     target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
        //     target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);
        }
    });
}

function verifierLike(user,array){
    var userName = user.split(";")[0];
    var userIp = user.split(";")[1];
    var index = -1;

    if(userName=="anonymous@karaz"){
        index = array.indexOf(user);
        if(index==-1){
            return true;
        }else{
            return false;
        }
    }else{
        array.forEach(function(elm){
            if(elm.split(";")[0]==userName){
                return false;
            }
        });
    } 

    return true;
}

function likeArticle(root,userQN,userIp,target){
    var user = userQN+";"+userIp;
    if(verifierLike(user,root.article._source.liste_like)){
        target.find(".classSearch-82 .reseau-ss .like").addClass("active-like");
        addLike(user,root.article._id,target);
    }
}

function addVue(user,id,target){
    var obj = {
        "script" : {
            "source": "ctx._source.vue++;ctx._source.list_vue.add(params.text)",
            "lang": "painless",
            "params" : {
                
                    "text":user
                
            }
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "/articles_index/_update/"+id,
        datatype: "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },success:function(){
            target.find(".classSearch-82 .date-det span.vue-span").html(Number(target.find(".classSearch-82 .date-det span.vue-span").html())+1);
        }
    });
}

function verifierVue(user,array){
    var userName = user.split(";")[0];
    var userIp = user.split(";")[1];
    var index = -1;

    if(userName=="anonymous@karaz"){
        index = array.indexOf(user);
        if(index==-1){
            return true;
        }else{
            return false;
        }
    }else{
        array.forEach(function(elm){
            if(elm.split(";")[0]==userName){
                return false;
            }
        });
    } 

    return true;
}

function vueArticle(root,userQN,userIp,target){
    var user = userQN+";"+userIp;
    if(verifierVue(user,root.article._source.list_vue)){
        addVue(user,root.article._id,target);
    }
}


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


function getObjectArticle(id,root,target){
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
    root.article = results;
    vueArticle(root,userQN,userIp,target);

    if(!verifierLike(userQN+";"+userIp,root.article._source.liste_like)){
        target.find(".classSearch-82 .reseau-ss .like").addClass("active-like");
    }

    createDivComments(obj.comments,target); 

    target.find(".classSearch-82 .vpanel-title .title-2x").html(obj.type);
    target.find(".divSearch-article .article-title h1").html(obj.title);
    target.find(".divSearch-article .det-div .author-pub").html(obj.author);
    target.find(".divSearch-article .det-div .date-pub").html(obj.datePr.split(" ")[0].replace(/-/g,"/"));
    target.find(".divSearch-article .date-det span.vue-span").html(obj.vue);
    target.find(".divSearch-article .date-det span.like-span").html(obj.like);
    target.find(".divSearch-article .article-img img").attr("src",obj.imgP);
    target.find(".divSearch-article .article-desc div p").html(obj.description);
    target.find(".divSearch-article .content-article").html(obj.content);
    target.find(".divSearch-article .search-details-icon img").hide();
    target.find(".divSearch-article .div-fsb-details .fsb-container").show();
});
}