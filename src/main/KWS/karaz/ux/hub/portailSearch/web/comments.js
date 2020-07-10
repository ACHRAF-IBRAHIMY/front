function getArticlesCms(params){
    var size = params.size;
    var from = params.from;
    var context = params.context;
    var root = params.root;
        
    var obj = {
            "from":from,
            "size":size,
            "query": {
                    "match_all": {}
            }
    };
    
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
        console.log("results :",result.hits.hits);
        createArticlesCms(result.hits.hits,context);
    });
}

var listComments = [];

function createArticlesCms(results,context){
   var container = context.formRender.targetPanel.find(".articles-list");
   var modal = context.formRender.targetPanel.find("#myModal");

   for(var i=0;i<results.length;i++){
       var div = document.createElement("div");
       div.setAttribute("class","article-elm");
       var divP = document.createElement("div");
       var span = document.createElement("span");
       span.setAttribute("class","articles-title");
       span.setAttribute("xid",i);
       span.innerHTML = results[i]._source.title;
       var div2 = document.createElement("div");
       div2.setAttribute("style","font-size: 14px;");
       divP.append(span);
       div2.innerHTML="<i class='fas fa-eye'></i> "+results[i]._source.vue+" <i class='fas fa-heart'></i> "+results[i]._source.like+" <i class='fas fa-comment'></i> "+countCmmnt(results[i]._source.comments);
       listComments.push(results[i]._source);
       divP.append(span);
       div.append(divP);
       div.append(div2);
       div.addEventListener("click",function(){
           createModelDesc(modal,listComments[Number($(this).attr("xid"))]);
       }); 
       container.append(div);

    }
}

function createModelDesc(modal,source){
    modal.find(".article-modal-content .title").html(source.title);
    modal.find(".article-modal-content .description").html(source.description);
    modal.get(0).style.display = "block";
}

function getCommtsCms(params){
    var size = params.size;
    var from = params.from;
    var context = params.context;
    var root = params.root;
        
    var obj = {
            "from":0,
            "size":10000,
            "query": {
                    "match_all": {}
            }
    };
    
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
        console.log("results :",result.hits.hits);
        var commentsList = extarctCmmt(result.hits.hits,context);
        createCmtCms(sortCommentsByDate(commentsList),context);

    });
}

function sortCommentsByDate(comments){
    comments.sort(function (a, b) {
        var time1 = new Date(a.date);
        var time2 = new Date(b.date);


        if (time1 > time2) {
            return -1;
        }

        if (time1 > time2) {
            return 1;
        }

        return 0;
    });
    return comments;
}

function getMaxDate(comment){
    console.log("getMaxDate comments size ",comment);
    if(comment.comments.length==0){
        console.log("getMaxDate comments date ",comment.date)
        return comment.date;
    }else{
        var timeMax = comment.comments[0].date;
        var timeCmpr = new Date(comment.comments[0].date);
        var commentMax = {};
        for(var i=1;i<comment.comments.length;i++){
            var time1 = new Date(comment.comments[i].date);
            if(time1 > timeCmpr){
                timeCmpr = time1
                timeMax = comment.comments[i].date;
            }
        }
        console.log("getMaxDate comments date ",timeMax);
        return timeMax;
    }
}

function sortCommentsByDateGb(comments){
    console.log("sortCommentsByDate comments",comments);
    var comm = JSON.parse(JSON.stringify(comments));
    var commVar = [];
    for(var i=0;i<comm.length;i++){
        var obj = {
            "date": getMaxDate(comm[i]),
            "comment": comm[i],
            "index": i
        }
        commVar.push(obj);
    }
    sortCommentsByDate(commVar);

    var commentsVar = [];
    var commentsIndex = [];

    for(var i=0;i<commVar.length;i++){
        commentsVar.push(commVar[i].comment);
        commentsIndex.push(commVar[i].index);
    }
    console.log("sortCommentsByDate commVar",commVar);

    return {"comments":commentsVar,"cmmIndex":commentsIndex};

}

function createCmtCms(results,context){
    var container = context.formRender.targetPanel.find(".notif-glo-cmmt");
    for(var i=0;i<results.length;i++){
        var div = document.createElement("div");
        div.setAttribute("class","article-elm");
        var divP = document.createElement("div");
        var divPc = document.createElement("div");
        var span = document.createElement("span");
        span.setAttribute("class","articles-title");
        span.innerHTML = results[i].title;
        var span1 = document.createElement("span");
        span1.innerHTML = "<span>Répondre au commentaire</span> <span>Supprimer</span>"
        var div2 = document.createElement("div");
        div2.setAttribute("style","display:grid;grid-template-columns: 25% 75%;font-size: 14px;");
        divP.append(span);
        div2.innerHTML="<span><i class='fas fa-user'></i> "+results[i].nom+" "+results[i].prenom+"<br/><i class='fas fa-clock'></i> "+results[i].date+"</span><span><i class='fas fa-comment'></i> : "+results[i].text+"</span>";
        divP.append(span);
        divPc.append(span1);
        divPc.setAttribute("style","color:#38A");
        div.append(divP);
        div.append(div2); 
        div.append(divPc); 
        container.append(div);
    }
}

// Extract comments form articles
function extarctCmmt(results,context){
    var commentsList = [];
    for(var i=0;i<results.length;i++){
        for(var j=0;j<results[i]._source.comments.length;j++){
            var comment = {
                "date": results[i]._source.comments[j].date,
                "text":    results[i]._source.comments[j].text,
                "nom": results[i]._source.comments[j].nom,
                "prenom": results[i]._source.comments[j].prenom,
                "email":results[i]._source.comments[j].email,
                "index":k,
                "type":"parent"+j,
                "id":results[i]._id,
                "title":results[i]._source.title
             };
             commentsList.push(comment);

            if(results[i]._source.comments[j].comments!=undefined){
                for(var k=0;k<results[i]._source.comments[j].comments.length;k++){
                    var commentC = {
                       "date": results[i]._source.comments[j].comments[k].date,
                       "text":    results[i]._source.comments[j].comments[k].text,
                       "nom": results[i]._source.comments[j].comments[k].nom,
                       "prenom": results[i]._source.comments[j].comments[k].prenom,
                       "email":results[i]._source.comments[j].comments[k].email,
                       "index":k,
                       "type":"child-"+j+"-"+k,
                       "id":results[i]._id,
                       "title":results[i]._source.title
                    };
                    commentsList.push(commentC);
                }   
            } 
        }
    }
    return commentsList;
}

// create pagination articles
function createPaginationArticleCms(params){
    var currentPage = params.currentPage;
    var nbrPage = params.nombrePage;
    var nbrSizing = params.nbrSizing;
    var target = params.target;
    var cls = params.cls;
}

// count number of comments in article
function countCmmnt(comments){
    var sum = 0;
    console.log(comments);
    for(var i=0;i<comments.length;i++){
        console.log("here");
        sum++;
        if(comments[i].comments!=undefined){
            for(var j=0;j<comments[i].comments.length;j++){
                sum++;
            }
        }
    }
    return sum;
}