
var alertMap = {
    "Warning":{
        iconAlrt:"fa-exclamation-triangle",
        colorAlrt:"#FFF",
        bgColorAlrt:"orange"
    },"Danger":{
        iconAlrt:"fa-exclamation-triangle",
        colorAlrt:"#FFF",
        bgColorAlrt:"red"
    },"Info":{
        iconAlrt:"fa-info-circle",
        colorAlrt:"#FFF",
        bgColorAlrt:"green"
    }
}

function createAlertObject(context,root){
    try{
        var type = root.alert.typeAlrt;
        var costum = false;
        if(type=="Customize"){
            costum=true;
            var iconalrt = root.alert.iconAlrt;
            var bgColorAlrt = root.alert.bgColorAlrt;
            var colorAlrt = root.alert.colorAlrt;
        }else{
            var iconalrt = alertMap[type].iconAlrt;
            var bgColorAlrt = alertMap[type].bgColorAlrt;
            var colorAlrt = alertMap[type].colorAlrt;
        }

        var text = context.formRender.targetPanel.find("#toolbarNBNB .ql-editor").html();
        var textGl = "";
        
        var iconGl = '<i class="fas '+iconalrt+'"></i>';
        textGl = '<marquee onmouseover="this.stop();" onmouseout="this.start();" style="padding: 11px 3px;background:'+bgColorAlrt+'; color: '+colorAlrt+';" ><div class="marquenbnb">'+iconGl+' '+text+'<div></marquee>';
         
        context.formRender.targetPanel.find(".visual-nbnb").html(textGl);
        context.formRender.targetPanel.find(".visual-nbnb").css({
            "background":bgColorAlrt,
            "color":colorAlrt
        });

        console.log("textGl == ",textGl);

        var obj = { 
            "active":root.alert.statut,
            "type":type,
            "text": textGl,
            "textnr":text,
            "root":root.alert,
            "title":root.alert.title         
        }

        console.log("***",obj);

        return obj;

    }catch(e){
        console.log(e);
        return null;
    }
}

function saveAlertMsg(context,root){
    var obj = createAlertObject(context,root);
    if(root.alert.id==undefined){
        root.alert.id="";
    }

    if(root.alert.statut!="Active"){
        updateAlert(root.alert.id,obj,context,root);
    }else{
        allDesactive().done(function(result){
            updateAlert(root.alert.id,obj,context,root);
        });
    }
}

function initAlertMsg(context,root){
    root.alert = {
        "id":"",
        "iconAlrt":"",
        "colorAlrt":"",
        "typeAlrt":"",
        "bgColorAlrt":"",
        "title":"",
        "statut":""
    };
    context.formRender.notifyObservers("alert");
    context.formRender.targetPanel.find("#toolbarNBNB .ql-editor").html("");
}

function deleteAlertMsg(id,context,root){
    $.ajax({
        type: "delete",
    
        url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/newsbar_index/alert/" + id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            //voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0);
            console.log("result",result);
            initAlertMsg(context,root);
            setTimeout(function(){
                refrechListalert(context,root);
            },2000);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function loadAllAlerts(context){

}

function updateAlert(id,obj,context,root){

    console.log(JSON.stringify(obj));

    $.ajax({
    type: "post",

    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/newsbar_index/alert/" + id,
    datatype: "application/json",
    data: JSON.stringify(obj),
    contentType: "application/json",
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
        //voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0);
        console.log("result",result);
        setTimeout(function(){
            initAlertMsg(context,root);
            refrechListalert(context,root);
        },2000);
    },
    error: function (error) {
        console.log(error.responseText);
        if(error.statusText=="OK"){
            setTimeout(function(){
                initAlertMsg(context,root);
                refrechListalert(context,root);
            },2000);
        }

        
    }
    });
}

function allDesactive(){
    var  obj = {
        "size":1000,"query": {
          "bool" : {
            "must" : {
              "match_all":{}
            }
          }
        },"script": {
            "source": "ctx._source.active='Desactive';ctx._source.root.statut='Desactive';",
            "lang": "painless"
        }
      };

      return $.ajax({
        type: "post",
        url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/newsbar_index/alert/_update_by_query",
        datatype: "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
        }
    })

}

function getLastActive(div){
    var  obj = {
        "size":1,
        "query":{
        "term":{"active": "Active"}
    
        }
    };

    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/newsbar_index/alert/_search",
    datatype: "application/json",
    contentType: "application/json",
    data:JSON.stringify(obj),
    beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
    }
    }).done(function(result){
        console.log("result$$",result);
        console.log("context$$",context);
        var elm = result.hits.hits[0];
        $("."+div).html(elm._source.text);
    });
}

function refrechListalert(context,root){
    var  obj = {
            "size":100,"query":{"match_all": {}}
        };

    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/newsbar_index/alert/_search",
    datatype: "application/json",
    contentType: "application/json",
    data:JSON.stringify(obj),
    beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
    }
    }).done(function(result){
            console.log("result$$",result);
            console.log("context$$",context);
            root.listeAletrs = result.hits.hits;
            context.formRender.notifyObservers("listeAlerts");
            createAlertsHtml(context,result.hits.hits);
    });

}
 
function openAlertToUp(id,instanceId){
    console.log('$(".ow-vbox."'+instanceId +'"button").attr("show",'+id+')');
    $(".ow-vbox."+instanceId +" button").attr("show",id);
    $(".ow-vbox."+instanceId +" button").click();
}

function openAlertDiv(idClass,root,context){
    console.log("===",idClass);
    console.log("root===",root);
    var element = searchInListArticle(root.listeAletrs,idClass);
    context.formRender.targetPanel.find("#toolbarNBNB .ql-editor").html(element._source.textnr);
    root.alert = element._source.root; 
    root.alert.id = idClass;
    context.formRender.notifyObservers("alert");
    createAlertObject(context,root);
    root.visual = "oui";
    context.formRender.notifyObservers("visual");
} 

function searchInListArticle(liste,idClass){
    for(var i=0;i<liste.length;i++){
        if(liste[i]._id == idClass){
            return liste[i];
        }
    }
}
 
function createAlertsHtml(context,liste){
    context.formRender.targetPanel.find(".list-nb-cnt").html("");

    liste.forEach(function(elm){
        console.log("elm==",elm);
        if(elm._source.title==undefined)elm._source.title="TITRE"; 
        var hmlt=  `<div class="ow-html" style="display: grid;grid-template-columns: auto 100px 100px;">  
                <div style="border: 1px solid #DDD;padding: 9px 8px;">
                    <span style="display: inline-block;" >${elm._source.title}<span>
                </div>  
                <span style="display:inline-block; padding: 9px 8px;
                text-align: center;border: 1px solid #777;
                background: #555;
                color: #EEE;" class="${elm._source.active}">${elm._source.active}</span>
                <button style="border-radius: 0;border: 1px solid;" idd="${elm._id}" onClick="openAlertToUp('${elm._id}','${context.formRender.instanceId}')" >Modifier</button>
            </div>`;
        var htmlRender = context.formRender.targetPanel.find(".list-nb-cnt").html();
        context.formRender.targetPanel.find(".list-nb-cnt").html(htmlRender+hmlt); 
    }); 
}