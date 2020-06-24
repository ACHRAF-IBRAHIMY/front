var alertMap = {
    "Warning":{
        iconAlrt:"fa-close",
        colorAlrt:"#FFF",
        bgColorAlrt:"green"
    }
}

function createAlertObject(context,root){
    try{
        var type = root.typeAlrt;
        var costum = false;
        if(type=="Customize"){
            costum=true;
            var iconalrt = root.iconAlrt;
            var bgColorAlrt = root.bgColorAlrt;
            var colorAlrt = root.colorAlrt;
        }else{
            var iconalrt = alertMap[type].iconAlrt;
            var bgColorAlrt = alertMap[type].bgColorAlrt;
            var colorAlrt = alertMap[type].colorAlrt;
        }

        var text = context.formRender.targetPanel.find("#toolbarNBNB .ql-editor").html();
        var textGl = "";
        
        var iconGl = '<i class="fas '+iconalrt+'"></i>';
        textGl = '<div class="marquenbnb" style="padding: 6px 2px;background:'+bgColorAlrt+'; color: '+colorAlrt+';">'+iconGl+' '+text+'<div>';
        
        context.formRender.targetPanel.find(".visual-nbnb marquee").html(textGl);
        context.formRender.targetPanel.find(".visual-nbnb marquee").css({
            "background":bgColorAlrt,
            "color":colorAlrt
        });

        console.log("textGl == ",textGl);

        var obj = {
            "active":root.statut,
            "type":type,
            "text": textGl          
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
    updateAlert("",obj,context);
}

function loadAllAlerts(context){

}

function updateAlert(id,obj,context){

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
            refrechListalert(context);
        },2000);
    },
    error: function (error) {
        console.log(error.responseText);
    }
    });
}

function refrechListalert(context){
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

    createAlertsHtml(context,result.hits.hits);
});

}
 
function createAlertsHtml(context,liste){
    context.formRender.targetPanel.find(".list-nb-cnt").html("");

liste.forEach(function(elm){
var hmlt=  `<div class="ow-html visual-nbnb" style="margin-top:3pxdisplay:grid;">  
        <marquee>
        `+elm._source.text+`
        </marquee>
        <button idd="${elm._id}">Modifier</button>
      </div>`;
var htmlRender = context.formRender.targetPanel.find(".list-nb-cnt").html();
context.formRender.targetPanel.find(".list-nb-cnt").html(htmlRender+" - "+hmlt);
});
}
