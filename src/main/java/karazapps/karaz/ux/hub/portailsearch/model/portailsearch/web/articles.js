
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
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/_update/"+id,
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
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/_update/"+root.article._id,
datatype: "application/json",
contentType: "application/json",
data:JSON.stringify(obj),
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", ADMIN_AUTH);
},
success: function(){
    target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
    target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);
    root.article._source.liste_like.splice(root.article._source.liste_like.indexOf(user),1);
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


function htmlToString(xml){
    return xml.replace(/<[^>]*>?/gm, '');
}


function addComment(root,target,context,commentGb){

    var text = context.formRender.targetPanel.find("#toolbarsecCom .ql-editor").html();
    root["articleComment"] = text;

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

if(htmlToString(root["articleComment"]).trim()==""){
target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre commentaire");
return ;
}

var current_datetime = new Date();

var dateYear = current_datetime.getFullYear();
var dateMonths = (current_datetime.getMonth() + 1).toString().length==1?"0"+(current_datetime.getMonth() + 1):(current_datetime.getMonth() + 1);
var dateDays = current_datetime.getDate().toString().length==1?"0"+current_datetime.getDate():current_datetime.getDate();

// var hours = current_datetime.getHours().toString().length==1?"0"+current_datetime.getHours():current_datetime.getHours();
// var minutes = current_datetime.getMinutes().toString().length==1?"0"+current_datetime.getMinutes():current_datetime.getMinutes();
// var seconds = current_datetime.getSeconds().toString().length==1?"0"+current_datetime.getSeconds():current_datetime.getSeconds();

var formatted_date = dateYear + "/" + dateMonths + "/" + dateDays;



if(target.find(".comment-form span.rep-comment").attr("idd")==""){
var comment = {
    "nom": root["articleCommentName"],
    "prenom":root["articleCommentLastName"],
    "email":root["articleCommentEmail"],
    "text":root["articleComment"],
    "date": formatted_date,
    "comments":[]
};

if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
    comment.admin = "true";
}

console.log("commentGb",commentGb)
if(commentGb==true){
    console.log("commentGb",commentGb)
    addCommentRestCmt(root,target,comment,context,-1);
}else{
    addCommentRest(root,target,comment,context,-1);
}

}else{
var comment = {
    "nom": root["articleCommentName"],
    "prenom":root["articleCommentLastName"],
    "email":root["articleCommentEmail"],
    "text":root["articleComment"],
    "date": formatted_date,
};

if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
    comment.admin = "true";
}

console.log("commentGb",commentGb)

if(commentGb==true){

addCommentRestCmt(root,target,comment,context,Number(target.find(".comment-form span.rep-comment").attr("idd")));

}else{
addCommentRest(root,target,comment,context,Number(target.find(".comment-form span.rep-comment").attr("idd")));
}
}
}


function createDivComments(comments,target,root){
    var commentsDr = sortCommentsByDateGb(comments).comments;
    var cmmIndex = sortCommentsByDateGb(comments).cmmIndex;

    var i = 0;
    target.find(".comments-list > .ow-vl-inner").html("");
    commentsDr.forEach(function(elm){
    var div = document.createElement("div");
    div.setAttribute("class","ow-vl ow-vbox");
    var div1 = document.createElement("div");
    div1.setAttribute("class","ow-vl-inner ow-gbox grided-mobile");
    div1.setAttribute("style","grid-template-columns: 100px auto;");
    var div2 = document.createElement("div");
    div2.setAttribute("class","ow-vl ow-vbox comment-user-img");
    var div3 = document.createElement("div");
    div3.setAttribute("class","ow-vl-inner");
    var div4 = document.createElement("div");
    div4.setAttribute("class","ow-html");
    if(elm.admin != undefined){
    div4.innerHTML = "<img src="+"./img/picto-rokhas-color.svg"+" style=\"width: 78px;margin-top: 11px;\" />";
    }else{
    div4.innerHTML = "<img src="+"./img/defaultAvatar.png"+" style=\"width: 78px;margin-top: 11px;\" />";
    }
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
    if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
        div8.innerHTML += " "+elm.email
    }
    var div9 = document.createElement("div");
    div9.setAttribute("class","comment-det");
    div9.innerHTML = elm.text;
    var div10 = document.createElement("div");
    div10.setAttribute("class","div-date");
    div10.setAttribute("index",cmmIndex[i]);
    var span = document.createElement("span");
    span.innerHTML = elm.date+ " | ";
    span.setAttribute("style","font-size: 14px;display: inline-block;margin-right: 8px;")
    var span1 = document.createElement("span");
    span1.innerHTML="Répondre à ce commentaire";
    span1.setAttribute("style","cursor:pointer;font-size: 15px;color: #38A;");
    span1.addEventListener("click",function(){
    target.find(".comment-form h1.add-comment").hide();
    target.find(".comment-form span.rep-comment").show();
    target.find(".comment-form span.rep-comment").attr("idd",this.parentNode.getAttribute("index"));
        var pos = target.find(".classSearch-82 .comment-form").offset().top;
        $('html,body').animate(
                {
                scrollTop: pos - 150
            },
            'slow');   
    });

    
    var span2 = document.createElement("span");
    span2.innerHTML = " | Supprimer";
    span2.setAttribute("style","cursor:pointer;font-size: 15px;color: #38A;");
    span2.addEventListener("click",function(){
        var index = $(this).parent(".div-date").attr("index");
        removeCommentsRest(root,target,Number(index),-1)
    });
    
  
    div10.appendChild(span);
    div10.appendChild(span1);

    if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){

    div10.appendChild(span2);
   
    }
     
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

    target.find(".comments-list > .ow-vl-inner").append(div);
    if(elm.comments!=undefined){
        var j = 0;
    elm.comments.forEach(function(e){
        var div = document.createElement("div");
        div.setAttribute("class","ow-vl ow-vbox");
        div.setAttribute("style","margin-left: 70px;")
        var div1 = document.createElement("div");
        div1.setAttribute("class","ow-vl-inner ow-gbox grided-mobile");
        div1.setAttribute("style","grid-template-columns: 100px auto;");
        var div2 = document.createElement("div");
        div2.setAttribute("class","ow-vl ow-vbox comment-user-img");
        var div3 = document.createElement("div");
        div3.setAttribute("class","ow-vl-inner");
        var div4 = document.createElement("div");
        div4.setAttribute("class","ow-html");
        if(e.admin != undefined){
            console.log(e.admin);
            div4.innerHTML = "<img src="+"./img/picto-rokhas-color.svg"+" style=\"width: 78px;margin-top: 11px;\" />";
        }else{
            div4.innerHTML = "<img src="+"./img/defaultAvatar.png"+" style=\"width: 78px;margin-top: 11px;\" />";
        }
        var div5 = document.createElement("div");
        div5.setAttribute("class","ow-vl ow-vbox comment-det");
        var div6 = document.createElement("div");
        div6.setAttribute("class","ow-vl-inner");
        var div7 = document.createElement("div");
        div7.setAttribute("class","ow-html");
        var div8 = document.createElement("div");
        div8.setAttribute("class","comment-user-name");
        div8.setAttribute("style","font-size: 17px;font-weight: 600;");
        div8.innerHTML = e.nom + " " + e.prenom;
        if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
            div8.innerHTML += " "+elm.email
        }
        var div9 = document.createElement("div");
        div9.setAttribute("class","comment-det");
        div9.innerHTML = e.text;
        var div10 = document.createElement("div");
        div10.setAttribute("class","div-date");
        div10.setAttribute("index",cmmIndex[i]);
        div10.setAttribute("sousindex",j);
        j++;
        var span = document.createElement("span");
        span.innerHTML = e.date;
        span.setAttribute("style","font-size: 14px;display: inline-block;margin-right: 8px;");
         
    var span2 = document.createElement("span");
    span2.innerHTML = " | Supprimer";
    span2.setAttribute("style","cursor:pointer;font-size: 15px;color: #38A;");
    span2.addEventListener("click",function(){
        var index = $(this).parent(".div-date").attr("index");
        var sousindex = $(this).parent(".div-date").attr("sousindex");
        removeCommentsRest(root,target,Number(index),Number(sousindex));

    });
        div10.appendChild(span);
        
        if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR'){
            div10.appendChild(span2); 
        }

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
        target.find(".comments-list > .ow-vl-inner").append(div);
    });
    };

    i++;

});
}

function removeCommentsRest(root,target,index,type){
    if(type==-1){
        var obj = {
            "script" : {
                "source": "ctx._source.comments.remove(params.ind)",
                "lang": "painless",
                "params" : {
                    "ind" : index
                }
            }
        };
        }else{
        var obj = {
            "script" : {
                "source": "ctx._source.comments[params.index].comments.remove(params.ind)",
                "lang": "painless",
                "params" : {
                    "ind" : index,
                    "index":type
                }
            }
        };
    }

    $.ajax({
        type: "post",
        url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/_update/"+root.article._id,
        datatype: "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function(){    
            getObjectArticle(root.query.idObject,root,target);
            
        }
    });

}


function addCommentRest(root,target,comment,context,type){
	if(type==-1){
	var obj = {
	    "script" : {
	        "source": "ctx._source.comments.add(params.comment)",
	        "lang": "painless",
	        "params" : {
	            "comment" : comment
	        }
	    }
	};
	}else{
	var obj = {
	    "script" : {
	        "source": "ctx._source.comments[params.index].comments.add(params.comment)",
	        "lang": "painless",
	        "params" : {
	            "comment" : comment,
	            "index":type
	        }
	    }
	};
	}


	$.ajax({
	type: "post",
	url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/_update/"+root.article._id,
	datatype: "application/json",
	contentType: "application/json",
	data:JSON.stringify(obj),
	beforeSend: function (xhr) {
	    xhr.setRequestHeader("Authorization", ADMIN_AUTH);
	},
	success: function(){


	    root.articleCommentName = "";
	    root.articleCommentLastName = "";
	    root.articleCommentEmail = "";
	    root.articleComment = "";
	    context.formRender.targetPanel.find("#toolbarsecCom .ql-editor").html("");

	    context.formRender.notifyObservers("articleCommentName");
	    context.formRender.notifyObservers("articleCommentLastName");
	    context.formRender.notifyObservers("articleCommentEmail");
	    context.formRender.notifyObservers("articleComment");

            getObjectArticle(root.query.idObject,root,target);
        

//	     target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
//	     target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);
	}
	});
}


function addCommentRestCmt(root,target,comment,context,type){
    console.log("root add coment",root.article)

    if(type==-1){
        var obj = {
            "script" : {
                "source": "ctx._source.comments.add(params.comment)",
                "lang": "painless",
                "params" : {
                    "comment" : comment
                }
            }
        };
        }else{
        var obj = {
            "script" : {
                "source": "ctx._source.comments[params.index].comments.add(params.comment)",
                "lang": "painless",
                "params" : {
                    "comment" : comment,
                    "index":type
                }
            }
        };
        }
    
    
        $.ajax({
        type: "post",
        url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/comments_index/_update/"+root.article._id,
        datatype: "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function(result){
            console.log("result add coment",result)
    
            root.articleCommentName = "";
            root.articleCommentLastName = "";
            root.articleCommentEmail = "";
            root.articleComment = "";
            context.formRender.targetPanel.find("#toolbarsecCom .ql-editor").html("");
    
            context.formRender.notifyObservers("articleCommentName");
            context.formRender.notifyObservers("articleCommentLastName");
            context.formRender.notifyObservers("articleCommentEmail");
            context.formRender.notifyObservers("articleComment");
    
          
                getObjectArticleCmt(root.query.idObject,root,target)
            
    
    //	     target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
    //	     target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);
        }
        });
}


function verifierLike(user,array){
var userName = user.split(";")[0];
var index = -1;

if(userName=="anonymous@karaz"){

if(document.cookie.indexOf("userRef")==-1){
    document.cookie="{\"userRef\":"+(new Date()).getTime()+"}";
    return true;
}else{
    try{
        index = array.indexOf(userName+";"+JSON.parse(document.cookie).userRef);
    }catch(e){
        var a= document.cookie;
        var b = a.slice(a.indexOf("userRef")-2,a.indexOf("}",a.indexOf("userRef"))+1)
        index = array.indexOf(userName+";"+JSON.parse(b).userRef);
    }
    if(index==-1){
        return true;
    }else{
        return false; 
    }
}


}else{
for(var i=0;i<array.length;i++){
    if(array[i].split(";")[0]==userName){
        return false;
    }
}  
} 

return true;
}

function likeArticle(root,userQN,userIp,target){ 
var user = userQN+";"+userIp;
if(verifierLike(user,root.article._source.liste_like)){
target.find(".classSearch-82 .reseau-ss .like").addClass("active-like");
if(userQN!="anonymous@karaz"){
    addLike(userQN+";20191919",root.article._id,target);
}else{
    try{
        addLike(userQN+";"+JSON.parse(document.cookie).userRef,root.article._id,target);
    }catch(e){
        var a = document.cookie;
        var b = a.slice(a.indexOf("userRef")-2,a.indexOf("}",a.indexOf("userRef"))+1);
        addLike(userQN+";"+JSON.parse(b).userRef,root.article._id,target);
    }
}

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
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/_update/"+id,
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

// function verifierVue(user,array){
//     var userName = user.split(";")[0];
//     var userIp = user.split(";")[1];
//     var index = -1;

//     if(userName=="anonymous@karaz"){
//         index = array.indexOf(user);


//         if(index==-1){
//             return true;
//         }else{
//             return false;
//         }
//     }else{
//         array.forEach(function(elm){
//             if(elm.split(";")[0]==userName){
//                 return false;
//             }
//         });
//     } 

//     return true;
// }

function verifierVue(user,array){
var userName = user.split(";")[0];
var index = -1;

if(userName=="anonymous@karaz"){

if(document.cookie.indexOf("userRef")==-1){
    document.cookie="{\"userRef\":"+(new Date()).getTime()+"}";
    return true;
}else{
    try{
        index = array.indexOf(userName+";"+JSON.parse(document.cookie).userRef);
    }
    catch(e){
        var a= document.cookie;
        var b = a.slice(a.indexOf("userRef")-2,a.indexOf("}",a.indexOf("userRef"))+1)
        index = array.indexOf(userName+";"+JSON.parse(b).userRef);
    }

    
    
    if(index==-1){
        return true;
    }else{
        return false;
    }
}


}else{
for(var i=0;i<array.length;i++){
    if(array[i].split(";")[0]==userName){
        console.log("out");
        return false;
    }
}

} 

return true;
}

function vueArticle(root,userQN,userIp,target){
var user = userQN+";"+userIp;
if(verifierVue(user,root.article._source.list_vue)){
if(userQN!="anonymous@karaz"){
    addVue(userQN+";20191919",root.article._id,target);
}else{
    try{
        addVue(userQN+";"+JSON.parse(document.cookie).userRef,root.article._id,target);

    }catch(e){
        var a = document.cookie;
        var b = a.slice(a.indexOf("userRef")-2,a.indexOf("}",a.indexOf("userRef"))+1);
        addVue(userQN+";"+JSON.parse(b).userRef,root.article._id,target);
    }
}

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
$(".classSearch-80 .vpanel-title .title-2x").html("PRATIQUE");
}else if(root.query.typeArticle==2){
$(".classSearch-80 .vpanel-title .title-2x").html("A LA UNE");
}else if(root.query.typeArticle==3){
$(".classSearch-80 .vpanel-title .title-2x").html("REVUE DE PRESSE");
}

restFullSearchList(prefix,type,varfl,pp,clas,context.formRender.targetPanel);
}

function createArticlesHtml(clas,result){

var divGlo = $(clas);
divGlo.html("");

result.forEach(function(elm){
var div1 = document.createElement("div");
div1.setAttribute("class","ow-vl ow-vbox article");

var div2 = document.createElement("div");
div2.setAttribute("class","ow-vl-inner");

var div3 = document.createElement("div");
div3.setAttribute("class","ow-html");

var img = document.createElement("img");
img.setAttribute("src",""+elm._source.imgP);
div3.appendChild(img);

var div4 = document.createElement("div");
div4.setAttribute("class","ow-html toggle-art");
div4.setAttribute("style","padding:3px 12px;");


var htitle =  document.createElement("h3");
htitle.innerHTML = elm._source.title;

if(elm._source.lang=='Ar'){
    htitle.setAttribute("style","font-size:19px;font-weight: 600;font-family:Droid Arabic Kufi, sans-serif");   
}else{
    htitle.setAttribute("style","font-size:19px;font-weight: 600;");
}


var par = document.createElement("p");
if(elm._source.lang=='Ar'){
    par.setAttribute("style","color:#666;font-size:15px;text-align:right;font-family:Droid Arabic Kufi, sans-serif");
}else{
    par.setAttribute("style","color:#666;font-size:15px;text-align:left");
}
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
if(elm._source.type=="REVUE DE PRESSE"){
    div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">'+elm._source.source+'</span></span>';
}else{
    div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">'+elm._source.author.split("|")[0].trim()+'</span> <span style="">'+elm._source.author.split("|")[1].trim()+'</span></span>';
}
}

catch(e){
if(elm._source.type=="REVUE DE PRESSE"){
    div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">'+elm._source.source+'</span></span>';
}else{
    div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">'+elm._source.author+'</span></span>';
}

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

if(elm._source.type!="REVUE DE PRESSE"){
    div7.appendChild(span3);
    div7.appendChild(span4);
}


div2.appendChild(div3);
div2.appendChild(div4);
div2.appendChild(div7);

div1.appendChild(div2);

if(elm._source.type=="REVUE DE PRESSE"){
div1.addEventListener("click",function(){
    window.open(elm._source.link);
});
}else{
div1.addEventListener("click",function(){
    ApplicationManager.run(`karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject=${elm._id}`,`search`, `DetailsActivitySearch`, {});
});
}


divGlo.append(div1);

});
}


function getMostPopularArticle(size,type,clas){
var obj = {
"size":size,"query":{
"term":{
    "type.keyword":type
}
},"sort":[{ "datePr" : {"order" : "desc"}}]


};


if(type==""){
    obj = {
        "size":size,"query": {
          "bool" : {
            "must" : {
              "match_all":{}
            },
            "must_not" : {
              "bool":{
                  "must" :[ {
                      "term":{
                          "type.keyword":"REVUE DE PRESSE"
                      }},{"range":{
                          "datePr":{
                              "lte":"now-7d/d"
                          }
                      }
                  }]		
              }
              
            }
          }
        },
        "sort":[{ "datePr" : {"order" : "desc"}}]
      };
}

$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/article/_search",
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

var rootTest = {
"article":{
    "_id":1
}
}; 

function removeCommentRest(root,target,comment,context,type){
if(type==-1){ 
    var obj = {
        "script" : {
            "source": "ctx._source.comments.remove(params.comment)",
            "lang": "painless",
            "params" : {
                "comment" : comment
            }
        }
    };
}else{
    var obj = {
        "script" : {
            "source": "ctx._source.comments[params.context].comments.remove(params.comment)",
            "lang": "painless",
            "params" : {
                "comment" : comment,
                "context" : context
            }
        }
    };
}



$.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/_update/"+root.article._id,
    datatype: "application/json",
    contentType: "application/json",
    data:JSON.stringify(obj),
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", ADMIN_AUTH);
    },
    success: function(){

        /*
        root.articleCommentName = "";
        root.articleCommentLastName = "";
        root.articleCommentEmail = "";
        root.articleComment = "";

        context.formRender.notifyObservers("articleCommentName");
        context.formRender.notifyObservers("articleCommentLastName");
        context.formRender.notifyObservers("articleCommentEmail");
        context.formRender.notifyObservers("articleComment");
    */
        getObjectArticle(root.article._id,root,target);
    
    //     target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
    //     target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);
    }
});
}

function getObjectArticle(id,root,target){
target.find(".divSearch-article .search-details-icon img").show();
$.ajax({
type: "get",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/articles_index/article/"+id,
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
}
}).done(function(results){

var obj = results._source; 
root.article = results;
vueArticle(root,userQN,userIp,target);

target.find(".comment-form h1.add-comment").show();
target.find(".comment-form span.rep-comment").hide(); 
target.find(".comment-form span.rep-comment").attr("idd","");

if(!verifierLike(userQN+";"+userIp,root.article._source.liste_like)){
    target.find(".classSearch-82 .reseau-ss .like").addClass("active-like");
}

createDivComments(obj.comments,target,root); 

target.find(".classSearch-82 .vpanel-title .title-2x").html(obj.type);
target.find(".classSearch-82 .vpanel-title .title-2x").click(function(e){
    if(obj.type=="PRATIQUE"){
        typeArt = 1;
    }else if(obj.type=="A LA UNE"){
        typeArt = 2;
    }else if(obj.type=="REVUE DE PRESSE"){
        typeArt = 3;
    }
    ApplicationManager.run('karaz/ux/hub/portailsearch/search/ArticlesListe?query.typeArticle='+typeArt,'search','Articles',{});
});
target.find(".divSearch-article .article-title h1").html(obj.title);
target.find(".divSearch-article .article-desc div p").html(obj.description);

if(obj.lang=='Ar'){
    target.find(".divSearch-article .article-title h1").css("text-align","right");
    target.find(".divSearch-article .article-title h1").css("font-family","Droid Arabic Kufi, sans-serif");

    target.find(".divSearch-article .article-desc div p").css("text-align","right");
    target.find(".divSearch-article .article-desc div p").css("font-family","Droid Arabic Kufi, sans-serif");

}

target.find(".divSearch-article .det-div .author-pub").html(obj.author);
target.find(".divSearch-article .det-div .date-pub").html(obj.datePr.split(" ")[0].replace(/-/g,"/"));
target.find(".divSearch-article .date-det span.vue-span").html(obj.vue);
target.find(".divSearch-article .date-det span.like-span").html(obj.like);
target.find(".divSearch-article .article-img img").attr("src",""+obj.imgP);
target.find(".divSearch-article .content-article").html(obj.content);
target.find(".divSearch-article .search-details-icon img").hide();
target.find(".divSearch-article .div-fsb-details .fsb-container").show();
target.find(".classSearch-82 .reseau-ss .url-share textArea").html(window.location.href+"index.jsp#search//karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject="+results._id+"//search");
});
}

function getObjectArticleCmt(id,root,target){
    target.find(".divSearch-article .search-details-icon img").show();
    $.ajax({
    type: "get",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/comments_index/_doc/"+id,
    datatype: "application/json",
    contentType: "application/json",
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
    }
    }).done(function(results){
        var obj = results._source; 
        root.article = results;
    createDivComments(obj.comments,target,root); 
    });
    
}