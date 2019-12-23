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

function createArticlesCms(results,context){
   var container = context.formRender.targetPanel.find(".articles-list");
   for(var i=0;i<results.length;i++){
       var div = document.createElement("div");
       div.setAttribute("class","article-elm");
       var divP = document.createElement("div");
       var span = document.createElement("span");
       span.setAttribute("class","articles-title");
       span.innerHTML = results[i]._source.title;
       var div2 = document.createElement("div");
       div2.setAttribute("style","font-size: 14px;");
       divP.append(span);
       div2.innerHTML="<i class='fas fa-eye'></i> "+results[i]._source.vue+" <i class='fas fa-heart'></i> "+results[i]._source.like+" <i class='fas fa-comment'></i> "+countCmmnt(results[i]._source.comments);
       divP.append(span);
       div.append(divP);
       div.append(div2); 
       container.append(div);

    }
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
        createCmtCms(commentsList,context);

    });
}

function createCmtCms(results,context){
    var container = context.formRender.targetPanel.find(".notif-glo-cmmt");
    for(var i=0;i<results.length;i++){
        var div = document.createElement("div");
        div.setAttribute("class","article-elm");
        var divP = document.createElement("div");
        var span = document.createElement("span");
        span.setAttribute("class","articles-title");
        span.innerHTML = results[i].title;
        var div2 = document.createElement("div");
        div2.setAttribute("style","display:grid;grid-template-columns: 25% 75%;font-size: 14px;");
        divP.append(span);
        div2.innerHTML="<span><i class='fas fa-user'></i> "+results[i].nom+" "+results[i].prenom+"<br/><i class='fas fa-clock'></i> "+results[i].date+"</span><span><i class='fas fa-comment'></i> : "+results[i].text+"</span>";
        divP.append(span);
        div.append(divP);
        div.append(div2); 
        container.append(div);
     }
 }

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

function createPaginationArticleCms(params){
    var currentPage = params.currentPage;
    var nbrPage = params.nombrePage;
    var nbrSizing = params.nbrSizing;
    var target = params.target;
    var cls = params.cls;
}

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

