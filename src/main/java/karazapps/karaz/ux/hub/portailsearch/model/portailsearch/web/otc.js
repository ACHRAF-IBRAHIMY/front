
var colorCluster =["#0048BA","#B0BF1A","#7CB9E8","#C9FFE5","#72A0C1","#EDEAE0","#F0F8FF","#C5E17A","#C46210","#EFDECD","#3B7A57","#FFBF00","#9966CC","#CD9575","#665D1E","#915C83","#841B2D","#FAEBD7","#008000","#8DB600","#FBCEB1","#00FFFF","#7FFFD4","#D0FF14","#4B5320","#8F9779","#E9D66B","#B2BEB5","#87A96B","#FF9966","#A52A2A","#FDEE00","#6E7F80","#568203","#007FFF","#F0FFFF","#89CFF0","#A1CAF1","#F4C2C2","#FEFEFA","#FF91AF","#FAE7B5","#DA1884","#7C0A02","#848482","#BCD4E6","#9F8170","#F5F5DC","#2E5894","#9C2542","#D99A6C","#FFE4C4","#3D2B1F","#967117","#CAE00D","#BFFF00","#FE6F5E","#BF4F51","#000000","#3D0C02","#1B1811","#3B2F2F","#54626F","#3B3C36","#BFAFB2","#FFEBCD","#A57164","#318CE7","#ACE5EE","#FAF0BE","#660000","#0000FF","#1F75FE","#0093AF","#0087BD","#0018A8","#333399","#0247FE","#A2A2D0","#6699CC","#0D98BA","#064E40","#5DADEC","#126180","#8A2BE2","#7366BD","#4D1A7F","#5072A7","#3C69E7","#DE5D83","#79443B","#0095B6","#E3DAC9","#006A4E","#87413F","#CB4154","#66FF00","#D891EF","#C32148","#1974D2","#FFAA1D","#FF55A3","#FB607F","#004225","#CD7F32","#88540B","#AF6E4D","#1B4D3E","#7BB661","#F0DC82","#800020","#DEB887","#A17A74","#CC5500","#E97451","#8A3324","#BD33A4","#702963","#536872","#5F9EA0","#A9B2C3","#91A3B0","#006B3C","#ED872D","#E30022","#FFF600","#A67B5B","#4B3621","#A3C1AD","#C19A6B","#EFBBCC","#FFFF99","#FFEF00","#FF0800","#E4717A","#00BFFF","#592720","#C41E3A","#00CC99","#960018","#D70040","#FFA6C9","#B31B1B","#56A0D3","#ED9121","#00563F","#703642","#C95A49","#ACE1AF","#007BA7","#2F847C","#B2FFFF","#246BCE","#DE3163","#007BA7","#2A52BE","#6D9BC3","#1DACD6","#007AA5","#E03C31","#F7E7CE","#F1DDCF","#36454F","#232B2B","#E68FAC","#DFFF00","#7FFF00","#FFB7C5","#954535","#DE6FA1","#A8516E","#AA381E","#856088","#FFB200","#7B3F00","#D2691E","#FFA700","#98817B","#E34234","#CD607E","#E4D00A","#9FA91F","#7F1734","#0047AB","#D2691E","#6F4E37","#B9D9EB","#F88379","#8C92AC","#B87333","#DA8A67","#AD6F69","#CB6D51","#996666","#FF3800","#FF7F50","#F88379","#893F45","#FBEC5D","#6495ED","#FFF8DC","#2E2D88","#FFF8E7","#81613C","#FFBCD9","#FFFDD0","#DC143C","#9E1B32","#F5F5F5","#00FFFF","#00B7EB","#58427C","#FFD300","#F56FA1","#666699","#654321","#5D3954","#26428B","#008B8B","#536878","#B8860B","#013220","#006400","#1A2421","#BDB76B","#483C32","#534B4F","#543D37","#8B008B","#4A5D23","#556B2F","#FF8C00","#9932CC","#03C03C","#301934","#8B0000","#E9967A","#8FBC8F","#3C1414","#8CBED6","#483D8B","#2F4F4F","#177245","#00CED1","#9400D3","#00703C","#555555","#DA3287","#FAD6A5","#B94E48","#004B49","#FF1493","#FF9933","#00BFFF","#4A646C","#7E5E60","#1560BD","#2243B6","#C19A6B","#EDC9AF","#696969","#C53151","#1E90FF","#D71868","#967117","#00009C","#EFDFBB","#E1A95F","#555D50","#C2B280","#1B1B1B","#614051","#F0EAD6","#1034A6","#7DF9FF","#00FF00","#6F00FF","#CCFF00","#BF00FF","#8F00FF","#50C878","#6C3082","#1B4D3E","#B48395","#AB4B52","#CC474B","#563C5C","#00FF40","#96C8A2","#C19A6B","#801818","#B53389","#DE5285","#F400A1","#E5AA70","#4D5D53","#4F7942","#6C541E","#FF5470","#B22222","#CE2029","#E95C4B","#E25822","#EEDC82","#0063dc","#FB0081","#A2006D","#FFFAF0","#15F4EE","#5FA777","#014421","#228B22","#A67B5B","#856D4D","#0072BB","#FD3F92","#86608E","#9EFD38","#D473D4","#FD6C9E","#C72C48","#F64A8A","#77B5FE","#8806CE","#E936A7","#FF00FF","#C154C1","#CC397B","#C74375","#E48400","#CC6666"];


var typeClassification = 0
function getAllNotesClass(){
    var obj = {"size":1000,"query":{"match_all":{}}};
    $.ajax({
        type: "post",
        //url: "https://cmdbserver.karaz.org:9200/index_classification_cluster/avis/_search",
        url: "http://localhost:9200/index_classification_cluster/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
          //  xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            console.log(result['hits']['hits']);
            getAllNotesClassDiv(result['hits']['hits'])
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getAllNotesClassDiv(data){
    var tab = document.getElementsByClassName("cf")[0].getElementsByClassName("cf-1")[0].getElementsByClassName("tab")[0];
    
    $(".cf .cf-1 .menu-config .item .index-name").html(data[0]["_index"]);
    $(".cf .cf-1 .menu-config .item .size-match-all").html(data.length);
    
    for(var i=0;i<data.length;i++){
        var divG = document.createElement("div");
        divG.setAttribute("class","item");
        
        var div1 = document.createElement("div");
        div1.setAttribute("class","check");
        
        var inp = document.createElement("input");
        inp.setAttribute("type","checkbox");
        
        div1.appendChild(inp);
        
        var div2 = document.createElement("div");
        div2.setAttribute("class","note");
        div2.innerHTML = data[i]["_source"]["Avis"];
        
        var inpH = document.createElement("input");
        inpH.setAttribute("type","hidden");
        inpH.setAttribute("class","id-note");
        inpH.setAttribute("value",data[i]["_id"]);
        
        var inpH2 = document.createElement("input");
        inpH2.setAttribute("type","hidden");
        inpH2.setAttribute("class","cluster-km-note");
        inpH2.setAttribute("value",data[i]["_source"]["cluster_km"]);
        
        var inpH3 = document.createElement("input");
        inpH3.setAttribute("type","hidden");
        inpH3.setAttribute("class","cluster-note");
        inpH3.setAttribute("value",data[i]["_source"]["cluster"]);
        
        divG.appendChild(div1);
        divG.appendChild(div2);
        divG.appendChild(inpH);
        divG.appendChild(inpH2);
        divG.appendChild(inpH3);
        
        tab.appendChild(divG);
    }
    
}

var clusters = [];
var clustersKm = [];

function getAllClusters(draw,typeClass){
    var cluster = "cluster";
    var url = "http://localhost:9200/index_classification_cluster/avis/_search";

    if(typeClass != 0){
        cluster = "cluster_km";
    }else{
        cluster = "cluster";
    }
    
    
    var obj = { "aggs" : {"classes" : {"terms" : { "field" : cluster,"size":100 }}}};
    $.ajax({
        type: "post",
        //url: "https://cmdbserver.karaz.org:9200/index_classification_cluster/avis/_search",
        url: url,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
         //    xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            var clusters_var = [];
            for(var i=0;i<result["aggregations"]["classes"]["buckets"].length;i++){
                clusters_var.push(result["aggregations"]["classes"]["buckets"][i]["key"]);
            }
            
            if(draw != true){
                if(typeClass == 0){
                    clusters = clusters_var;
                    console.log(clusters.length)
                }else{
                    clustersKm = clusters_var;
                    console.log(clustersKm.length)
                }
            }else{
                console.log("draw");
                getAllClustersDiv(result["aggregations"]["classes"]["buckets"]);
                findByCluster(result["aggregations"]["classes"]["buckets"][0]["key"]);
            }
                
        },
        error: function (error) {
            console.log(error.responseText);
        }
    }); 
}

function getAllClustersDiv(data){
    
    var select = document.getElementsByClassName("cf")[0].getElementsByClassName("cf-2")[0].getElementsByClassName("select-cluster")[0];
    document.getElementsByClassName("cf")[0].getElementsByClassName("cf-2")[0].getElementsByClassName("sp4")[0].innerHTML = data.length;
    select.innerHTML = "";
    for(var i =0 ; i<data.length;i++){
        var option = document.createElement("option");
        option.setAttribute("value",data[i]["key"]);
        option.innerHTML = data[i]["key"];
        select.appendChild(option);
    }
}

function findByCluster(cluster){
    
    var obj = {"size": 1000, "query": {"match": {"cluster": cluster}}};
    if(typeClassification == 0){
        url = "http://localhost:9200/index_classification_cluster/avis/_search";
    }else{
        url = "http://localhost:9200/index_classification_cluster_km/avis/_search";        
    }
     $.ajax({
        type: "post",
        //url: "https://cmdbserver.karaz.org:9200/index_classification_cluster/avis/_search",
        url: url,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
        //    xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            console.log(result["hits"]["hits"]);
            findByClusterDiv(result['hits']['hits'],cluster);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function findByClusterDiv(data,cluster){
    
    var tab = document.getElementsByClassName("cf")[0].getElementsByClassName("cf-2")[0].getElementsByClassName("tab")[0];
    tab.innerHTML = "";
    
    $(".cf .cf-2 .menu-config .item .index-name").html(cluster);
    $(".cf .cf-2 .menu-config .item .size-match-all").html(data.length);
    
    for(var i=0;i<data.length;i++){
        var divG = document.createElement("div");
        divG.setAttribute("class","item");
        
        var div1 = document.createElement("div");
        div1.setAttribute("class","check");
        
        var inp = document.createElement("input");
        inp.setAttribute("type","checkbox");
        
        div1.appendChild(inp);
        
        var div2 = document.createElement("div");
        div2.setAttribute("class","note");
        div2.innerHTML = data[i]["_source"]["Avis"];
        
        var inpH = document.createElement("input");
        inpH.setAttribute("type","hidden");
        inpH.setAttribute("class","id-note");
        inpH.setAttribute("value",data[i]["_id"]);
        
        divG.appendChild(div1);
        divG.appendChild(div2);
        divG.appendChild(inpH);
        
        tab.appendChild(divG);
    }
}

function colorClusterFunc(type){
    if(type=="mlt"){
            var clusterColor = [clusters,colorCluster.slice(0,clusters.length)];
    }else{
            var clusterColor = [clustersKm,colorCluster.slice(0,clustersKm.length)];

    }
    
    var elements = $(".cf .cf-1 .tab .item");
    var color = "#ffffff";
    for(var i=0;i<elements.length;i++){
        if(type=="mlt"){
            var colorIndex = clusterColor[0].indexOf(elements.eq(i).children(".cluster-note").val());
            color = clusterColor[1][colorIndex]+"44";
        }else if(type=="km"){
            var colorIndex = clusterColor[0].indexOf(elements.eq(i).children(".cluster-km-note").val());
            color = clusterColor[1][colorIndex]+"44";
        }
        elements.eq(i).css("background-color",color);
    }
}

function doColorCluster(val,active){
        if(val == "mlt" && active!=true ){
             colorClusterFunc("mlt");
         }else if( val == "km" && active!=true ){
             colorClusterFunc("km");
         }else{
             $(".cf .cf-1 .menu .acc span").removeClass("active");
             colorClusterFunc("bl");
         }
}
