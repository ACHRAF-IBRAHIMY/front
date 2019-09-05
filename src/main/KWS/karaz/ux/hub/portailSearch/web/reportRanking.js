
function getAllCommuneObject(filters,sortBy,rev,size,from){
    var filtersObj = [];
    
      for(var i=0;i<filters[0].length;i++){
        var filter = {
          "term":{}     
        };
      
        filter["term"][filters[0][i]]=filters[1][i];
        filtersObj.push(filter);
      }
    
      var objSort = {};
      objSort[sortBy] = {"order":rev}
    
    
    
    var obj = {
        "size":size,"from":from,
        "query": {
        "bool": {
          "filter": filtersObj
        }
      },
      "sort" : [ objSort ]
    };
    
    return obj;
  }
  
  
  function restGetAllCommue(filters,sortBy,rev,size,from,type){
    
    var obj = getAllCommuneObject(filters,sortBy,rev,size,from);

    console.log(JSON.stringify(obj));
    
    $.ajax({
          type: "post",
          url: URL_SEARCH + "/ranking_index/_search",
          datatype: "application/json",
          contentType: "application/json",
          data: JSON.stringify(obj),
          beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", AUTH);
          },
          success: function (result) {
              console.log(result);
  
            switch (type){
                case 0 : createCommuneTable(result);break;
                case 1 : createBarTop3(result,".ranking-bar3-dl","delai");break;   
                case 2 : createBarTop3(result,".ranking-bar3-at","attractivite");break;   
                case 3 : createBarTop3(result,".ranking-bar3-dg","digital");break;   
                case 4 : createBarTop3(result,".ranking-bar3-es","ecosystem");break;   
                case 5 : createBarTop3(result,".ranking-bar3-fs","fiscalite");break; 
                case 6 : createBarTop10(result,".ranking-bar10-U","scoreU");break;  
                case 7 : createBarTop10(result,".ranking-bar10-E","scoreE");break;  
            }
               

          },
          error: function (error) {
              console.log(error);
          }
      })
    
  };
  

function createBarTop3(result,id,select){
    var bar = $(id);
    var results = result.hits.hits;

    var cm1 = results[1]._source.commune.replace("COMMUNE DE ","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    var cm2 = results[0]._source.commune.replace("COMMUNE DE ","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    var cm3 = results[2]._source.commune.replace("COMMUNE DE ","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    
    var hg1 = results[1]._source.indecators[select];
    var hg2 = results[0]._source.indecators[select];
    var hg3 = results[2]._source.indecators[select];

    bar.find(".div-bar-1 .bar1 .bottom-div").html("<div class=\"cm cm1\">"+cm1+"</div><div style=\"height:"+((hg1*155)/hg2)+"px\"><span>"+Number(hg1).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+2+"</span></div>");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("<div class=\"cm cm2\">"+cm2+"</div><div style=\"height:"+((hg2*155)/hg2)+"px\"><span>"+Number(hg2).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+1+"</span></div>");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("<div class=\"cm cm3\">"+cm3+"</div><div style=\"height:"+((hg3*155)/hg2)+"px\"><span>"+Number(hg3).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+3+"</span></div>");

}

function createBarTop10(result,id,select){
    var bar = $(id);
    bar.find(".div-1-top10").html("");
    bar.find(".div-3-top10").html("");

    var results = result.hits.hits;

    for(var i=0;i<results.length;i++){
        bar.find(".div-1-top10").append("<span>"+results[i]._source.commune+"</span>");
        bar.find(".div-3-top10").append("<div style=\"width:"+((results[i]._source.indecators[select]*80)/results[0]._source.indecators[select])+"%\" ><span>"+(i+1)+"</span></div><span class=\"nbr-div\">"+results[i]._source.indecators[select].toFixed(1)+"</span>");
    }
}  

function updateTitles(){
    var trim = $(".ranking-fieldset #period option:selected").val();
    var region = $(".ranking-fieldset #region option:selected").val();
    var prefecture = $(".ranking-fieldset #prefecture option:selected").val();
    var str = "";
    $(".ranking-fieldset .ow-label-pl span").remove();
    var trims = trim.split("-");

    if(trims[0]=="1"){
        str += "1er trimestre "+trims[1];
    }else if(trims[0]=="2"){
        str += "2éme trimestre "+trims[1];
    }else if(trims[0]=="3"){
        str += "3éme trimestre "+trims[1];
    }else if(trims[0]=="4"){
        str += "4éme trimestre "+trims[1];
    }

    if(region != "default"){
        str += " | "+region;
    }

    if(prefecture != "default"){
        str += " | "+prefecture;
    }

    $(".ranking-fieldset > .ow-pl-toolbar .ow-label-pl").append("<span style=\"color:orange\"> "+str+"</span>");
}
  
var dataReportRk = [];

function createCommuneTable(result){
    var results = result.hits.hits;
    var tableHtml = $("#ranking-table2");

    //$("#ranking-table tr:not(.first-tr)").remove();
    $("#ranking-table2 tr").remove();

    for(var i=0;i<results.length;i++){
        var tr = $(document.createElement("tr"));
        var rankCom = results[i]._source.rankComp;
        var rankStr = "";
        
        dataReportRk.push(results[i]._source);

        if(rankCom>0){
            rankStr = "<span><i style=\"color:green\" class=\"fas fa-arrow-up \"></i>"+" +"+rankCom+"</span>";
        }else if(rankCom<0){
            rankStr = "<span><i style=\"color:red\" class=\"fas fa-arrow-down\"></i>"+" "+rankCom+"</span>";
        }else{
            rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
        }
        tr.html(`<td style="font-size: 15px;text-align: left;padding-left: 30px;width: 28%;">`+"<span style=\"display: grid;grid-template-columns: 80% 20%;\" title=\""+results[i]._source.commune+"\"><span>"+(i+1)+"- "+subLong(results[i]._source.commune,30)+"</span> "+rankStr+`</span></td>`);
        tr.html(tr.html()+`<td class="sp-td">`+(results[i]._source.rank)+`</td>`);
        tr.html(tr.html()+`<td class="sp-td">`+Math.floor(results[i]._source.indecators.score)+`</td>`);
        tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.delai)+`</td>`);
        tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.attractivite)+`</td>`);
        tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.digital)+`</td>`);
        tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.ecosystem)+`</td>`);
        tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.fiscalite)+`</td>`);
        tableHtml.append(tr);
    }
   
}

function getReportDataRk(root,context){
    root.dataReportRk = {};
    context.formRender.notifyObservers("dataReportRk");
    root.dataReportRk = dataReportRk;
    context.formRender.notifyObservers("dataReportRk");
}


function getAllByAggs(field,size,filter,byfilter,type){

    if(filter != null){
        var filterObj = {};
        filterObj[filter] = byfilter;

        var obj = {
     
            "aggs":{
                "filter_aggs":{
                    "aggs" : {
                "genres" : {
                    "terms" : { "field" : field,"size":size } 
                }
            },
            "filter" : { "term": filterObj }
                }
            }
            
        };

    }else{
        var obj = {
     
            
                    "aggs" : {
                "genres" : {
                    "terms" : { "field" : field,"size":size } 
                }
            }
            
            
        };
    }
  
    $.ajax({
        type: "post",
        url: URL_SEARCH + "/ranking_index/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);

            switch (type){
              case 0 : createSelectRanking(result,"#period",filter);break;
              case 1 : createSelectRanking(result,"#region",filter);break;   
              case 2 : createSelectRanking(result,"#prefecture",filter);break;      
            }

        },
        error: function (error) {
            console.log(error);
        }
    })
  }

  function getFiltersArray(arr){
      var  arrFilters = ["trim.keyword","région.keyword","préfecture.keyword","commune.keyword"];
      var array=[[],[]];
      
      for(var i=0;i<arr.length;i++){
          if(arr[i]=="default"){
            continue;
          }else{
            array[0].push(arrFilters[i]);
            array[1].push(arr[i]);
          }
        
      }

      return array;
  }

  function createSelectRanking(result,idHtml,filter){

      if(filter!=null){
        var elms = result.aggregations.filter_aggs.genres.buckets;
      }else{
        var elms = result.aggregations.genres.buckets;
      }

      if(idHtml=="#period"){
        elms = triPeriods(elms);
      }

      $(".ranking-fieldset "+idHtml+" option:not(.ranking-fieldset "+idHtml+" option:first-child)").remove();
      var select = $(".ranking-fieldset "+idHtml);  

      for(var i=0;i<elms.length;i++){
        var option = document.createElement("option");
        var str = "";
        if(idHtml=="#period"){
            var trims = elms[i].key.split("-");
            if(trims[0]=="1"){
                str += "1er trimestre "+trims[1];
            }else if(trims[0]=="2"){
                str += "2éme trimestre "+trims[1];
            }else if(trims[0]=="3"){
                str += "3éme trimestre "+trims[1];
            }else if(trims[0]=="4"){
                str += "4éme trimestre "+trims[1];
            }
          }else{
              str = elms[i].key;
          }
        option.innerHTML = str;
        option.setAttribute("value",elms[i].key);
        select.append(option);
      }

      if(idHtml=="#period"){  
        $(".ranking-fieldset #period").val(elms[0].key);
        updateTitles();
      }
  }

  function triPeriods(elm){
      var newElm = [];

      if(elm.length!=0){
        newElm.push(elm[0]);
      }

      newElm = elm.sort(function(a,b){
        return -compareTrims(a.key,b.key);
      });
      

      return newElm;
  }

  function compareTrims(trimA,trimB){
    var trimAs = trimA.split("-");
    var trimBs = trimB.split("-");
    if(Number(trimAs[1])>Number(trimBs[1])){
      return 1;
    }else if(Number(trimAs[1])<Number(trimBs[1])){
      return -1;
    }else{
      if(Number(trimAs[0])<Number(trimBs[0])){
          return -1;
        }else{
          return 1;
        }
    }
}


  var region_color = ["#4472C4","#FFC000","#264478","#AA8B2B","#ED7D31","##77ACDC","#AE6736","#255E91",
    "#B4B4B4","#70AD47","#7D7D7D","#43682B"];

  function drawRadarRegion(trim){
      
      var obj = {"query" : {
        "term":{
            "trim.keyword":trim
        }
      },
        "aggregations": {
           "region_ind": {
              "aggregations": {
                 "score": {
                    "avg": {
                       "field": "indecators.score"
                    }
                 },
                  "delai": {
                    "avg": {
                       "field": "indecators.delai"
                    }
                    },"attractivite": {
                    "avg": {
                       "field": "indecators.attractivite"
                    }
                    },"digital": {
                    "avg": {
                       "field": "indecators.digital"
                    }
                    },"ecosystem": {
                    "avg": {
                       "field": "indecators.ecosystem"
                    }
                    },"fiscalite": {
                    "avg": {
                       "field": "indecators.fiscalite"
                    }
                    }
                    }
                 ,"terms": {
                 "field": "région.keyword",
                 "order": {
                    "score": "desc"
                 }
             }
      }}
      };

      $.ajax({
        type: "post",
        url: URL_SEARCH + "/ranking_index/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);

            var dataset = result.aggregations.region_ind.buckets;
            var datasets = [];

            var legendDiv = $(".legend-region .lg");

            for(var i = 0;i<dataset.length;i++){
                var dtobj = {
                    label : dataset[i].key,
                    borderColor : region_color[i],
                    pointBackgroundColor : region_color[i],
                    data: [
                        dataset[i].delai.value,
                        dataset[i].attractivite.value,
                        dataset[i].digital.value,
                        dataset[i].ecosystem.value,
                        dataset[i].fiscalite.value
                        
                    ]
                };

                datasets.push(dtobj);
                legendDiv.append("<div><hr style=\"background: "+region_color[i]+"\"><span>"+dataset[i].key.replace("REGION DE ","").replace("REGION ","")+"</span></div>");
            }


            var config = {
                type: 'radar',
                data: {
                    labels: ['Délai', 'Attractivité', 'Digital', 'Ecosystème', 'Fiscalité'],
                    datasets: datasets
                    }
                ,
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                        text: 'Radar'
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            };
    

			window.myRadar = new Chart(document.getElementById('radarCanvas'), config);

        },
        error: function (error) {
            console.log(error);
        }
    });

  }