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
        
        divG.appendChild(div1);
        divG.appendChild(div2);
        divG.appendChild(inpH);
        
        tab.appendChild(divG);
    }
    
}

function getAllClusters(){
    if(typeClassification == 0){
        url = "http://localhost:9200/index_classification_cluster/avis/_search";
    }else{
        url = "http://localhost:9200/index_classification_cluster_km/avis/_search";        
    }
    
    var obj = { "aggs" : {"classes" : {"terms" : { "field" : "cluster","size":100 }}}};
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
            console.log(result["aggregations"]["classes"]["buckets"]);
            getAllClustersDiv(result["aggregations"]["classes"]["buckets"]);
            findByCluster(result["aggregations"]["classes"]["buckets"][0]["key"]);
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
