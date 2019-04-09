var chartG = null;

function ESCall(size, membre) {
    
    var obj = {
        "aggs": {
            "genres": {
                "terms": {
                    "field": "Avis",
                    "size": size
                }
            }
        }
    };
    

    if (membre != null) {
        obj = {
            "aggs": {
                "categories": {
                    "filter": {
                        "term": {
                            "MEMBRE": membre
                        }
                    },
                    "aggs": {
                        "names": {
                            "terms": {
                                "field": "Avis",
                                "size":size
                            }
                        }
                    }
                }
            }
        };
    }

    callLoadGif();
    $.ajax({
        type: "post",
        url: "https://cmdbserver.karaz.org:9200/index_classification_test/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            if(membre==null){
                var labels = createArray(result, "aggregations.genres.buckets.key");
                var data = createArray(result, "aggregations.genres.buckets.doc_count");
            }else{
                var labels = createArray(result, "aggregations.categories.names.buckets.key");
                var data = createArray(result, "aggregations.categories.names.buckets.doc_count");    
            }
            
            loaded(data, labels,membre);
            $(".dashbord-right .d2 .word-list .tab").html("");
            loadDiv(1, new Array(data, labels),membre);
        },
        error: function (error) {
            console.log(error.responseText,membre);
        }
    });
};

function createArray(results, path) {
    var arr = new Array();
    var tabP = path.split(".");
    var res = results;
    var key = tabP[tabP.length - 1];
    for (var j = 0; j < tabP.length - 1; j++) {
        res = res[tabP[j]];
    }

    for (var i = 0; i < res.length; i++) {
        arr.push(res[i][key]);
    }
    return arr;
}

function loaded(data, labels,membre) {
    var canvas = document.getElementById('myChart');
    var ctx = canvas.getContext('2d');
    if (chartG != null) {
        chartG.destroy();
    }

    chartG = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# occurrence',
                data: data,
                backgroundColor: '#38a',
                borderColor: [
                    '#38a'
                ],
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    display: false
                }]
            }
        }
    });

    canvas.onclick = function (evt) {
        var activePoints = chartG.getElementsAtEvent(evt);
        if (activePoints[0]) {
            var chartData = activePoints[0]['_chart'].config.data;
            var idx = activePoints[0]['_index'];

            var label = chartData.labels[idx];
            var value = chartData.datasets[0].data[idx];
            activePage=1 ;
            filePage=0 ;
            getDetWordKeyLoad(label,membre);

        }
    };
}


function loadList(data, labels,membre) {
    var list = $(".stat-dashbord .dashbord-right .d2 .word-list .div table");
    for (var i = 0; i < Math.min(12, data.length); i++) {
        var ap = document.createElement("tr");
        ap.setAttribute("class", "exist-word-list-item");

        var sp1 = document.createElement("td");
        sp1.innerHTML = labels[i];

        var sp2 = document.createElement("td");
        sp2.innerHTML = data[i];

        var sp3 = document.createElement("td");

        var icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-align-justify");
        icon.setAttribute("style", "color:#38a;cursor:pointer;");
        icon.addEventListener("click", function () {
            var word = this.parentNode.parentNode.children[0].innerHTML;
            activePage=1;
            filePage=0;
            getDetWordKeyLoad(word,membre);
        });
        sp3.appendChild(icon);

        ap.appendChild(sp1);
        ap.appendChild(sp2);
        ap.appendChild(sp3);

        list.append(ap);
    }
}

function getDetWordKeyLoad(word,membre) {

    callLoadGif();
    var offset = (activePage-1)*5;
    var obj = {
        "size":5,"from":offset,
        "query": {
            "multi_match": {
                "fields": ["Avis"],
                "query": word,
                "analyzer": "rebuilt_french",
                "minimum_should_match": "100%"
            }
        },
        "highlight": {
            "fields": {
                "Avis": {}
            }
        }
    };
    
    
    if(membre!=null){
        obj= {
              "size":5,"from":offset,
              "query": {
                "bool": {
                  "must": {
                    "multi_match": {
                            "fields": ["Avis"],
                            "query": word,
                            "analyzer": "rebuilt_french",
                            "minimum_should_match": "100%"
                        }
                  },
                  "filter": {
                    "term": {
                      "MEMBRE": membre
                    }
                  }
                }
              },
              "highlight": {
                        "fields": {
                            "Avis": {}
                        }
                    }
            }
    }

    $.ajax({
        type: "POST",
        url: "https://cmdbserver.karaz.org:9200/index_classification_test/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            var res = {
                "result": result,
                "word": word
            };
            loadDiv(2, res, membre);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getDetWordKey(result, word) {
    $(".stat-dashbord .dashbord-right .d2 .word-list-det .vpanel-title span.cl-orange").html(word);
    var a = filtering(result);
    var hl = result.hits.hits;

    for (var i = 0; i < Math.min(5, a.length); i++) {
        var sp = document.createElement("span");
        sp.setAttribute("class", "rac");
        sp.innerHTML = a[i];
        $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d1 .div-d1-det").append(sp);
        /*if(i!=Math.min(5,a.length)-1)
            $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d1 .div-d1-det").append("-");
        */
    }

    for (var j = 0; j < Math.min(5, hl.length); j++) {
        //var span = addSpansHL(extractByTag(hl[j].highlight.Avis[0],'em'),hl[j].highlight.Avis[0].replace("<em>","").replace("</em>",""));
        var span = addSpansHL(extractByTag(hl[j].highlight.Avis[0], 'em'), extractArray(hl[j]._source.Avis, extractByTag(hl[j].highlight.Avis[0], 'em')));
        var tr = document.createElement("tr");
        tr.setAttribute("class", "note-div-item");
        var td1 = document.createElement("td");
        td1.innerHTML = span;
        var td2 = document.createElement("td");
        td2.innerHTML = "<i class=\"far fa-file-alt\"></i>";
        td2.innerHTML += "<input type=\"hidden\" value=\"" + hl[j]._id + "\">";
        td2.setAttribute("style", "cursor:pointer");

        td2.addEventListener("click", function () {
            //alert(this.parentElement.getElementsByTagName("input")[0].value);
            getAvis(this.parentElement.getElementsByTagName("input")[0].value, word);
        });

        tr.appendChild(td1);
        tr.appendChild(td2);


        $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d2 table.note-div-items").append(tr);
    }
}

function callLoadGif() {
    $(".dashbord-right .d2 .word-list-div").hide();
    $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d2 table").html("");
    $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d1 .div-d1-det").html("");
    $(".dashbord-right .d2 .word-list-load-gif").show();
}

function loadDiv(div, key,membre) {
    switch (div) {
        case 1:
            if (key != null) loadList(key[0], key[1],membre);
            $(".dashbord-right .d2 .word-list-load-gif").hide();
            $(".dashbord-right .d2 .word-list").show();
            break;
        case 2:
            getDetWordKey(key.result, key.word , membre);
            createPagintionOtm(key.result.hits.total,5,key.word,membre,activePage);
            $(".dashbord-right .d2 .word-list-load-gif").hide();
            $(".dashbord-right .d2 .word-list-det").show();
            break;
        case 3:
            getTextAvis(key.avis, key.membre,key.remarques, key.key);
            $(".dashbord-right .d2 .word-list-load-gif").hide();
            $(".dashbord-right .d2 .word-list-text-avis").show();
            break;
    }
}


function getTextAvis(avis, membre,remarques, key) {
    $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .avis-det-membre span").html(membre);
    $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .avis-det-avis p").html(avis);
    $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .vpanel-title span.cl-orange").html(key);
    var p = document.createElement("ul");
    for(var i=0;i<remarques.length;i++){
        var l = document.createElement("li");
        l.innerHTML=remarques[i];
        p.appendChild(l);
    }
    $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .extract-notes").html(p);
}


function filtering(result) {
    var resultF = new Array();
    var total = result.hits.hits.length;
    for (var i = 0; i < total; i++) {
        var totalF = result.hits.hits[i].highlight.Avis.length;
        var tab = result.hits.hits[i].highlight.Avis;
        for (var j = 0; j < totalF; j++) {
            if (resultF.indexOf(extractByTag(tab[j], 'em').toLowerCase()) == -1) {
                resultF.push(extractByTag(tab[j], 'em').toLowerCase());
            }
        }
    }
    return resultF;
}

function extractByTag(text, tag) {
    var tab = null;
    var tagBegin = "<" + tag + ">";
    var tagEnd = "</" + tag + ">";
    var posBegin = text.indexOf(tagBegin) + 4;
    var posEnd = text.indexOf(tagEnd);
    var extract = text.substring(posBegin, posEnd);
    tab = extract;
    return tab;
}

function extractRaw(text, reg) {
    var found = oneByOneRegex(text, reg);
    return found;
}

String.prototype.regexIndexOf = function (regex, startpos) {
    var indexOf = this.substring(startpos || 0).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;
}

function oneByOne(text, word) {
    var indexOf = text.indexOf(word, 0);
    var array = new Array(new Array(), new Array());
    while (indexOf != -1) {
        array[0].push(indexOf);
        array[1].push(indexOf + word.length);
        indexOf = text.indexOf(word, indexOf + 1);
    }
    return array;
}

function oneByOneRegex(text, reg) {
    var match = text.match(reg);
    var indexOf = text.regexIndexOf(reg, 0);
    var array = new Array(new Array(), new Array());
    var i = 0;
    while (indexOf != -1) {
        array[0].push(indexOf);
        array[1].push(indexOf + match[i].length);
        indexOf = text.regexIndexOf(reg, indexOf + match[i].length);
        i++;
    }
    return array;
}

function extractArray(text, word) {
    var reg = /[1-9]*-/g;
    var reg2 = /[.]/g;
    var pos = text.indexOf(word);
    var arr = extractRaw(text, reg);
    var arr2 = extractRaw(text, reg2);
    var pos1 = searchBefAft(pos, arr[1], 0);
    var pos2 = searchBefAft(pos, arr2[1].concat(arr[0]), 1);
    if(isNaN(pos1))pos1=0;
    if(isNaN(pos2))pos2=text.length; 
    return text.substring(pos1, pos2);
}


function searchBefAft(pos, arr, vr) {
    var copie = new Array();
    if (vr == 0) {
        arr.forEach(function (elm) {
            if ((elm - pos) <= 0) {
                copie.push(elm - pos);
            }
        });
        return copie.sort(function (a, b) {
            return b - a;
        })[0] + pos;
    } else {
        arr.forEach(function (elm) {
            if ((elm - pos) > 0) {
                copie.push(elm - pos);
            }

        });
        return copie.sort(function (a, b) {
            return a - b;
        })[0] + pos;
    }
}


function getAvis(id, key) {
    callLoadGif();
    $.ajax({
        url: "https://cmdbserver.karaz.org:9200/index_classification_test/avis/" + id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
            var res = {
                "avis": result._source.Avis,
                "membre": result._source.MEMBRE,
                "remarques" : result._source.Remarques,
                "key": key
            }
            loadDiv(3, res);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}


function updateChart(chart, type, key) {
    switch (type) {
        case 1:
            chart = restUpdateChart(chart, type, key);
            break;

        case 2:
            chart = restUpdateChart(chart, type, key);
            break;

        case 3:
            chart.config.type = "pie";
            chart.data.datasets[0].backgroundColor=tabColor;
            console.log("chart :"+chart.data.datasets[0].backgroundColor);
            chart.update();
            break;

        case 4:
            chart.config.type = "bar";
            chart.data.datasets[0].backgroundColor="#38a";
            chart.update();
            break;
    }

}

var tabColor = [
    "#338800",
    "#338811",
    "#338822",
    "#338833",
    "#338844",
    "#338855",
    "#338866",
    "#338877",
    "#338888",
    "#338899",
    "#3388aa",
    "#3388bb",
    "#3388cc",
    "#3388dd",
    "#3388ee",
    "#3388ff",
    "#3377ff",
    "#3366ff",
    "#3355ff",
    "#3344ff",
    "#3333ff",
    "#3322ff",
    "#3311ff",
    "#3300ff",
    "#2200ff",
    "#1100ff",
    "#0000ff",
    "#0000ee",
    "#0000dd",
    "#0000cc",
    "#0000bb",
    "#0000aa",
    "#000099",
    "#000088",
    "#000077",
    "#000066",
    "#000055",
    "#000044",
    "#000033",
    "#000022",
    "#000011",
    "#000000",
    "#000022",
    "#000044",
    "#000066",
    "#000088",
    "#0000aa",
    "#0000cc",
    "#0000ee",
    "#0000ff",
    "#2200ff",
    "#4400ff",
    "#4422ff",
    "#4444ff",
    "#4466ff",
    "#3388aa",
    "#3388bb",
    "#3388cc",
    "#3388dd",
    "#3388ee",
    "#3388ff",
    "#3377ff"
]


function restUpdateChart(chart, type, key) {
    var obj = {

    };

    switch (type) {
        case 1:
            break;

        case 2:
            break;
    }

    $.ajax({
        url: "https://cmdbserver.karaz.org:9200/index_classification_test/avis/_search",
        type: "POST",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            chart.update();
        }
    });
}


function getMembers() {

    var obj = {
        "aggs": {
            "membres": {
                "terms": {
                    "field": "MEMBRE",
                    "size": 300
                }
            }
        }
    };

    $.ajax({
        url: "https://cmdbserver.karaz.org:9200/index_classification_test/avis/_search",
        type: "POST",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            var array = new Array();
            var size = result.aggregations.membres.buckets.length;
            var nbrAvis = result.hits.total;
            for (var i = 0; i < size; i++) {
                array.push(result.aggregations.membres.buckets[i].key);
            }
            
            getNumberRemarque(nbrAvis,size);
            createSelect(array);
            
        }
    });
}



function createSelect(array) {
    var s = $(".stat-dashbord .dashbord-right .d1 .config-bar select.s2");
    for (var i = 0; i < array.length; i++) {
        s.append("<option value=\"" + array[i] + "\">" + array[i] + "</option>");
    }
}

function updateDashbordStat(nbrAvis,nbrMem,nbrNote){
    document.getElementsByClassName("stat-div")[0].getElementsByClassName("stat")[1].getElementsByTagName("span")[0].innerHTML=nbrAvis;
    document.getElementsByClassName("stat-div")[0].getElementsByClassName("stat")[2].getElementsByTagName("span")[0].innerHTML=nbrMem;
    document.getElementsByClassName("stat-div")[0].getElementsByClassName("stat")[0].getElementsByTagName("span")[0].innerHTML=nbrNote;
}


function getNumberRemarque(nbrAvis, nbrMem) {
    var obj = {
        "query": {
            "match_all": {}
        },
        "aggs": {
            "sumR": {
                "sum": {
                    "script": {
                        "lang": "painless",
                        "source": "doc['Remarques.keyword'].size()"
                    }
                }
            }
        }
    }
    
    
    $.ajax({
        url: "https://cmdbserver.karaz.org:9200/index_classification_test/avis/_search",
        type: "POST",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            
            var nbrRemarques = result.aggregations.sumR.value;
            updateDashbordStat(nbrAvis,nbrMem,nbrRemarques);
            
        }
    });
    
}

var filePage = 0;
var activePage = 1;

function createPagintionOtm(total,size,word,membre,active){
  var begin = 0;

  if(filePage!=0){
    begin = filePage*2;
  }   

  var totalEx = Math.ceil((total-((filePage-1)*2+5)*5)/5);
  if(filePage==0){
      totalEx = Math.ceil(total/5);
  }    
    
  var nbrPage = Math.min(4,2+totalEx);
  console.log("totalEx :"+totalEx+" nbr page: "+nbrPage);      

  var p = $(".d2 .pagination-otm");
  p.html(" ");
  var a = document.createElement("a");
  a.innerHTML="<i class=\"fas fa-angle-double-left\"></i>";
  a.addEventListener("click",function(){
    previousPageOtm(word,membre);
    event.preventDefault();
  });
  p.append(a);
    
  console.log("from "+(begin+1)+" to "+(begin+nbrPage));    
    
  for(var i=begin;i<begin+nbrPage+1;i++){
        a = document.createElement("a");
        var j=i+1;

        a.innerHTML=(j);
        if(i==begin){
            a.addEventListener("click",function(event){
                event.preventDefault();
                if(begin!=0){
                    activePage = this.innerHTML;
                    getPrevPageFile(word,membre);
                }else{
                    getPageOtm(this.innerHTML,word,membre);
                }
            });
        }else if(i==begin+nbrPage){
           a.addEventListener("click",function(event){
                event.preventDefault();
              
               if((begin+nbrPage+1)!=Math.ceil(total/5)){
                   activePage = this.innerHTML;
                   getNextPageFile(word,membre);   
               }else{
                   getPageOtm(this.innerHTML,word,membre);
               }
                
            }); 
        }else{
           a.addEventListener("click",function(event){
            event.preventDefault();
               getPageOtm(this.innerHTML,word,membre);
            }); 
        }

        if(i==active-1){
            a.setAttribute("class","active");             
         }

        p.append(a);        
    }
    
   a = document.createElement("a");
   a.innerHTML="<i class=\"fas fa-angle-double-right\"></i>";
   a.addEventListener("click",function(){
        event.preventDefault();
        nextPageOtm(word,membre,Math.ceil(total/5));
   });        
   p.append(a);
}


function getPageOtm(page,word,membre){
    activePage = page;
    getDetWordKeyLoad(word,membre);
}

function previousPageOtm(word,membre){
    if(activePage!=1){
        activePage--;
        if(activePage == (filePage*2)+1 && activePage != 1){
            getPrevPageFile(word,membre);    
        }else{
            getDetWordKeyLoad(word,membre);
        }
        console.log("to Prev file Page");
        console.log(activePage);
    }
}

function nextPageOtm(word,membre,total){
    console.log("total :"+total);
    if(activePage!=total){
        activePage++;
        if((filePage != 0 && activePage == (filePage*2)+5)||(filePage == 0 && activePage==5)){
            console.log("to Next file Page");
            getNextPageFile(word,membre);  
        }else{
            console.log("No Next file");
            getDetWordKeyLoad(word,membre);
        }
        console.log(activePage);
    }
}

function getPrevPageFile(word,membre){
    filePage=filePage-1;
    getDetWordKeyLoad(word,membre);
}

function getNextPageFile(word,membre){
    filePage=filePage+1;
    console.log(filePage);
    getDetWordKeyLoad(word,membre);
}



