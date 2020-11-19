var chartG = null;

function ESCall(size, membre,decision) {


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
                        "size": size
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
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/index_classification_cluster2/avis/_search",
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
data: JSON.stringify(obj),
success: function (result) {
    if (membre == null) {
        var labels = createArray(result, "aggregations.genres.buckets.key");
        var data = createArray(result, "aggregations.genres.buckets.doc_count");
    } else {
        var labels = createArray(result, "aggregations.categories.names.buckets.key");
        var data = createArray(result, "aggregations.categories.names.buckets.doc_count");
    }

    loaded(data, labels, membre);
    $(".dashbord-right .d2 .word-list .tab").html("");
    loadDiv(1, new Array(data, labels), membre);
},
error: function (error) {
    console.log(error.responseText, membre);
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

function loaded(data, labels, membre) {
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
    activePage = 1;
    filePage = 0;
    getDetWordKeyLoad(label, membre);

}
};

updateChart(chartG,7,$(".word-cloud-container"));


}


function loadList(data, labels, membre) {
var list = $(".stat-dashbord .dashbord-right .d2 .word-list .div table");
for (var i = 0; i < data.length ; i++) {
var ap = document.createElement("tr");
ap.setAttribute("class", "exist-word-list-item show");

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
    activePage = 1;
    filePage = 0;
    getDetWordKeyLoad(word, membre);
});
sp3.setAttribute("style", "text-align:center");

var sp4 = document.createElement("td");
sp4.setAttribute("style", "text-align:center");

var icon2 = document.createElement("i");
icon2.setAttribute("class", "fas fa-times");
icon2.setAttribute("style", "color:#38a;cursor:pointer;");
icon2.addEventListener("click", function () {
    var word = this.parentNode.parentNode.children[0].innerHTML;
    updateChart(chartG, 5, word);
});


var sp5 = document.createElement("td");
sp5.setAttribute("style", "text-align:center;display:none");

var icon3 = document.createElement("i");
icon3.setAttribute("class", "fas fa-eye");
icon3.setAttribute("style", "color:#38a;cursor:pointer;");
icon3.addEventListener("click", function () {
    var word = this.parentNode.parentNode.children[0].innerHTML;
    updateChart(chartG, 6, word);
});

sp3.appendChild(icon);
sp4.appendChild(icon2);
sp5.appendChild(icon3);

ap.appendChild(sp1);
ap.appendChild(sp2);
ap.appendChild(sp3);
ap.appendChild(sp4);
ap.appendChild(sp5);

if(i>=10){
    ap.setAttribute("style","display:none");
}

list.append(ap);
}

return list;
}

function getDetWordKeyLoad(word, membre) {

callLoadGif();
var offset = (activePage - 1) * 5;
var obj = {
"size": 5,
"from": offset,
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


if (membre != null) {
obj = {
    "size": 5,
    "from": offset,
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
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/index_classification_cluster2/avis/_search",
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
data: JSON.stringify(obj),
success: function (result) {
    $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d2 table.note-div-items").html("");
    $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d1 .div-d1-det").html("");
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
var span = addSpansHL(extractByTag(hl[j].highlight.Avis[0], 'em'),subLong( extractArray(hl[j]._source.Avis, extractByTag(hl[j].highlight.Avis[0], 'em')),150));
var span_without =  extractArray(hl[j]._source.Avis, extractByTag(hl[j].highlight.Avis[0], 'em'));
console.log(span+" "+span_without);


var tr = document.createElement("tr");
tr.setAttribute("class", "note-div-item");
var td1 = document.createElement("td");
td1.setAttribute("style","font-size:14px");
td1.setAttribute("title",span_without);
td1.innerHTML = span;
var td2 = document.createElement("td");
td2.innerHTML = "<i class=\"far fa-file-alt\"></i>";
td2.innerHTML += "<input type=\"hidden\" value=\"" + hl[j]._id + "\">";
td2.setAttribute("style", "cursor:pointer;text-align:center;width:25px;");
td2.setAttribute("title","Afficher l'avis");


td2.addEventListener("click", function () {
    //alert(this.parentElement.getElementsByTagName("input")[0].value);
   $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .avis-det-full .extract-notes").hide();
    getAvis(this.parentElement.getElementsByTagName("input")[0].value, word,0);
});

var td3 = document.createElement("td");
td3.innerHTML="<i class=\"fas fa-search\"></i>"
td3.setAttribute("style","cursor:pointer;text-align:center;width:25px;");
td3.setAttribute("title","Recherche par similarité");
td3.addEventListener("click",function(){
    filePage=0;
    activePage =1;
    searchMLT(this.parentElement.children[0].getAttribute("title"));
});

tr.appendChild(td1);
tr.appendChild(td3);
tr.appendChild(td2);

$(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d2 table.note-div-items").append(tr);
}
}

function callLoadGif() {
$(".dashbord-right .d2 .word-list-div").hide();
$(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d2 table").html("");
$(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d1 .div-d1-det").html("");
$(".stat-dashbord .dashbord-right .d2 .mlt-search table").html("");
$(".dashbord-right .d2 .word-list-load-gif").show();
}

function loadDiv(div, key, membre) {
    try{
        if(transMap["LISTE DES MOTS EXISTES".replace(/ /g,"__")]!=undefined){
            var LMETrans = transMap["LISTE DES MOTS EXISTES".replace(/ /g,"__")];
        }else{
            var LMETrans = "LISTE DES MOTS EXISTES"
        }

    }catch(e){}
switch (div) {
case 1:
    $(".stat-dashbord .dashbord-right .d2 .ow-label-pl ").html(LMETrans);
    if (key != null){
        loadList(key[0], key[1], membre);
        createPaginationListWords(10,key[0].length);
    } 
    $(".dashbord-right .d2 .word-list-load-gif").hide();
    $(".dashbord-right .d2 .word-list").show();
    break;
case 2:
    $(".stat-dashbord .dashbord-right .d2 .ow-label-pl ").html("MOT | <span class=\"cl-orange\" style=\"text-transform: capitalize;\">"+key.word+"</span>");
    getDetWordKey(key.result, key.word, membre);
    createPagintionOtm(key.result.hits.total.value, 5, key.word, membre, activePage,0);
    $(".dashbord-right .d2 .word-list-load-gif").hide();
    $(".dashbord-right .d2 .word-list-det").show();
    break;
case 3:
    $(".stat-dashbord .dashbord-right .d2 .ow-label-pl ").html("MOT | <span class=\"cl-orange\" style=\"text-transform: none;\" >"+subLong(key.key,60).substring(0,1).toUpperCase()+subLong(key.key,60).substr(1)+"</span> <span class=\"cl-orange search-word\" style=\"display:none\">"+key.key+"</span>");
    getTextAvis(key.avis, key.membre, key.remarques, key.key,key.type);
    $(".dashbord-right .d2 .word-list-load-gif").hide();
    $(".dashbord-right .d2 .word-list-text-avis").show();
    break;
case 4:
    $(".stat-dashbord .dashbord-right .d2 .ow-label-pl ").html("RESULTATS");
    searchMLTDiv(key,membre);
    createPagintionOtm(key.hits.total.value, 5, membre, null, activePage,1);
    $(".dashbord-right .d2 .word-list-load-gif").hide();
    $(".dashbord-right .d2 .mlt-search").show();
    break;
        
}
}

var typeGlobal = 0;
function getTextAvis(avis, membre, remarques, key,type) {
$(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .avis-det-membre span").html(membre);
$(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .avis-det-avis p").html(avis);

var p = document.createElement("ul");
for (var i = 0; i < remarques.length; i++) {
var l = document.createElement("li");
l.innerHTML = remarques[i];
p.appendChild(l);
}
typeGlobal = type;
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
if (isNaN(pos1)) pos1 = 0;
if (isNaN(pos2)) pos2 = text.length;
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


function getAvis(id, key,type) {
callLoadGif();
$.ajax({
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/index_classification_cluster2/avis/" + id,
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    var res = {
        "avis": result._source.Avis,
        "membre": result._source.MEMBRE,
        "remarques": result._source.Remarques,
        "key": key,
        "type":type
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
    chart.data.datasets[0].backgroundColor = tabColor;
    console.log("chart :" + chart.data.datasets[0].backgroundColor.length);
    chart.data.datasets[0].borderColor = ["#eee"];
    chart.data.datasets[0].borderWidth = 0.5;
    chart.update();

    break;

case 4:
    chart.config.type = "bar";
    chart.data.datasets[0].backgroundColor = "#38a";
    chart.data.datasets[0].borderColor = ["#38a"];
    chart.data.datasets[0].borderWidth = 0;
    chart.update();
    break;
case 5:
    var boucle = chart.data.labels;
    var search = searchWordListDataset(boucle, key);

    chart.data.labels.splice(search, 1);
    chart.data.datasets[0].data.splice(search, 1);
    chart.update();
    var listTab = document.getElementsByClassName("word-list")[0].getElementsByClassName("content")[0].getElementsByClassName("div")[0].getElementsByClassName("exist-word-list")[0].getElementsByTagName("tr");
    var pos = searchWordListTab(listTab, key);
    listTab[pos].classList.add("hide");
    listTab[pos].classList.remove("show");
    listTab[pos].getElementsByTagName("td")[3].style.display = "none";
    listTab[pos].getElementsByTagName("td")[4].style.display = "block";
    break;
case 6:
    var listTab = document.getElementsByClassName("word-list")[0].getElementsByClassName("content")[0].getElementsByClassName("div")[0].getElementsByClassName("exist-word-list")[0].getElementsByTagName("tr");
    var listTabS = document.getElementsByClassName("word-list")[0].getElementsByClassName("content")[0].getElementsByClassName("div")[0].getElementsByClassName("exist-word-list")[0].getElementsByClassName("show");
    var posT = searchWordListTab(listTab, key);
    var array = searchForShowedTr(listTab);
    var done = false;
    console.log(array);
    console.log(posT);
    var wordMissNbr = listTab[posT].getElementsByTagName("td")[1].innerHTML;
    for (var i = 0; i < array.length; i++) {
        if (posT < array[i] && done == false) {
            console.log(i);
            var wordMiss = listTab[array[i]].getElementsByTagName("td")[0].innerHTML;

            var boucle = chart.data.labels;
            console.log("wordMiss : " + wordMiss);
            var posMiss = searchWordListDataset(boucle, wordMiss);
            console.log(posMiss);
            chart.data.labels.splice(posMiss, 0, key);
            chart.data.datasets[0].data.splice(posMiss, 0, wordMissNbr);
            chart.update();
            done = true;
        }
    }

    if (done == false) {
        chart.data.labels.push(key);
        chart.data.datasets[0].data.push(wordMissNbr);
        chart.update();
    }

    listTab[posT].classList.remove("hide");
    listTab[posT].classList.add("show");
    listTab[posT].getElementsByTagName("td")[4].style.display = "none";
    listTab[posT].getElementsByTagName("td")[3].style.display = "block";
    break;
case 7:
    var words = [
        {text: "Lorem", weight: 13},
        {text: "Ipsum", weight: 10.5},
        {text: "Dolor", weight: 9.4},
        {text: "Sit", weight: 8},
        {text: "Amet", weight: 6.2},
        {text: "Consectetur", weight: 5},
        {text: "Adipiscing", weight: 5}
    ];
    console.log(chart);
    var word2 = [];
    for(var i=0;i<chart.data.labels.length;i++){
        var obj = {
            "text":chart.data.labels[i],
            "weight":chart.data.datasets[0].data[i]
        }
        word2.push(obj);
    }
    setTimeout(function(){loadWordCloud(key,word2)},100);
break;    
}

}

function loadWordCloud(div,words){
div.jQCloud("destroy");
div.jQCloud(words);
}

function searchWordListDataset(boucle, key) {
var search = null;
for (var i = 0; i < boucle.length; i++) {
if (boucle[i] == key) {
    search = i;
    return search;
}
}
return search;
}

function searchForShowedTr(listTab) {
var array = new Array();
for (var i = 0; i < listTab.length; i++) {
if (listTab[i].classList.contains("show")) {
    array.push(i);
}
}
return array;
}

function searchWordListTab(listTab, key) {
for (var i = 0; i < listTab.length; i++) {
console.log(listTab[i].getElementsByTagName("td")[0].innerHTML + " *** " + key);
if (listTab[i].getElementsByTagName("td")[0].innerHTML == key) {
    return i;
}
}
}

var tabColor = [
"#18161B",
"#2F2B38",
"#3100A7",
"#3A00C7",
"#6000ff",
"#4800ff",
"#2700FF",
"#6339C7",
"#5050FF",
"#5050FF",
"#005EFF",
"#3470D6",
"#2471A3",
"#65558B",
"#5D5D5E",
"#0277bd",
"#2962ff",
"#2979ff",
"#1e88e5",
"#5050FF",
"#4D82DC",
"#8A8A92",
"#2196f3",
"#039be5",
"#4DB0DC",
"#42a5f5",
"#9191C5",
"#82b1ff",
"#64b5f6",
"#03a9f4",
"#81d4fa",
"#90caf9",
"#7C7474",
"#4fc3f7",
"#29b6f6",
"#03a9f4",
"#0288d1",
"#40c4ff",
"#5DADE2",
"#52F0FF",
"#52FCFF",
"#80d8ff",
"#78FAD8",
"#C0FFF2",
"#AED6F1",
"#bbdefb",
"#b3e5fc",
"#C0EFFF",
"#D2BCFF",
"#96A3FF",
"#D6D0E2",
"#FC88FF",
"#FDB5FF",
"#D0D1D8",
"#FFCFF5",
"#e1f5fe",
"#E7F2FA",
"#E9EAF4",
"#EEEFF7",
"#F8F8F8"
];




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
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/index_classification_cluster2/avis/_search",
type: "POST",
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
data: JSON.stringify(obj),
success: function (result) {
    chart.update();
}
});
}


function getMembers() {

var obj = {
"size":1,"aggs": {
    "membres": {
        "terms": {
            "field": "MEMBRE",
            "size": 500
        }
    }
}
};

$.ajax({
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/index_classification_cluster2/avis/_search?scroll=1m",
type: "POST",
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) { 
    xhr.setRequestHeader("Authorization", AUTH);
},
data: JSON.stringify(obj),
success: function (result) {
    var array = new Array();
    var size = result.aggregations.membres.buckets.length;
    var nbrAvis = result.hits.total.value;
    for (var i = 0; i < size; i++) {
        array.push(result.aggregations.membres.buckets[i].key);
    }

    getNumberRemarque(nbrAvis, size);
    array.sort();
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

function updateDashbordStat(obj) {
document.getElementsByClassName("stat-div")[0].getElementsByClassName("stat")[1].getElementsByTagName("span")[0].innerHTML = obj.replacenbrAvis;
document.getElementsByClassName("stat-div")[0].getElementsByClassName("stat")[2].getElementsByTagName("span")[0].innerHTML = obj.nbrMem;
document.getElementsByClassName("stat-div")[0].getElementsByClassName("stat")[0].getElementsByTagName("span")[0].innerHTML = obj.nbrNote;
document.getElementsByClassName("stat-div")[0].getElementsByClassName("stat")[3].getElementsByTagName("span")[0].innerHTML = obj.nbrClusters;
}


function getNumberRemarque(nbrAvis, nbrMem) {

var obj = {
"size":1,
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
};

$.ajax({
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/index_classification_cluster2/avis/_search?scroll=1m",
type: "POST",
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
data: JSON.stringify(obj),
success: function (result) {

    var nbrRemarques = result.aggregations.sumR.value;
    getAllClustersCount({"replacenbrAvis":nbrAvis,"nbrMem":nbrMem,"nbrNote":nbrRemarques,"nbrClusters":0},0);

}
});

}


function getAllClustersCount(params,typeClass){
var clusterName = "cluster";
var url = "http://localhost:9200/index_classification_cluster/avis/_search";

if(typeClass != 0){
clusterName = "cluster_km";
}else{
clusterName = "cluster";
}


var objRequest = { "aggs" : {"classes" : {"terms" : { "field" : clusterName,"size":100 }}}};

$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/index_classification_cluster/avis/_search",
//url: url,
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
     xhr.setRequestHeader("Authorization", AUTH);
},
data: JSON.stringify(objRequest),
success: function (result) {
    var clusters_var = [];
    for(var i=0;i<result["aggregations"]["classes"]["buckets"].length;i++){
        clusters_var.push(result["aggregations"]["classes"]["buckets"][i]["key"]);
    }
    
    params.nbrClusters = clusters_var.length;

    updateDashbordStat(params);

},
error: function (error) {
    console.log(error.responseText);
}
}); 
}




var filePage = 0;
var activePage = 1;

function createPagintionOtm(total, size, word, membre, active,pagination) {
var begin = 0;

if (filePage != 0) {
begin = filePage * 2;
}

var totalEx = Math.ceil((total - ((filePage - 1) * 2 + 5) * 5) / 5);


var nbrPage = Math.min(4, 2 + totalEx);

if (filePage == 0) {
totalEx = Math.ceil(total / 5);
nbrPage = Math.min(4,totalEx-1);
}


console.log("totalEx :" + totalEx + " nbr page: " + nbrPage);

if(pagination==1){
var p = $(".d2 .mlt-search .pagination-otm-search")
}else{
var p = $(".d2 .pagination-otm");   
}


p.html(" ");
var a = document.createElement("a");
a.innerHTML = "<i class=\"fas fa-angle-double-left\"></i>";
a.addEventListener("click", function () {
previousPageOtm(word, membre,pagination);
event.preventDefault();
});
p.append(a);

console.log("from " + (begin + 1) + " to " + (begin + nbrPage));

for (var i = begin; i < begin + nbrPage + 1; i++) {
a = document.createElement("a");
var j = i + 1;

a.innerHTML = (j);
if (i == begin) {
    a.addEventListener("click", function (event) {
        event.preventDefault();
        if (begin != 0) {
            activePage = this.innerHTML;
            getPrevPageFile(word, membre,pagination);
        } else {
            getPageOtm(this.innerHTML, word, membre,pagination);
        }
    });
} else if (i == begin + nbrPage) {
    a.addEventListener("click", function (event) {
        event.preventDefault();

        if ((begin + nbrPage + 1) != Math.ceil(total / 5)) {
            activePage = this.innerHTML;
            getNextPageFile(word, membre,pagination);
        } else {
            getPageOtm(this.innerHTML, word, membre,pagination);
        }

    });
} else {
    a.addEventListener("click", function (event) {
        event.preventDefault();
        getPageOtm(this.innerHTML, word, membre,pagination);
    });
}

if (i == active - 1) {
    a.setAttribute("class", "active");
}

p.append(a);
}

a = document.createElement("a");
a.innerHTML = "<i class=\"fas fa-angle-double-right\"></i>";
a.addEventListener("click", function () {
event.preventDefault();
nextPageOtm(word, membre, Math.ceil(total / 5),pagination);
});
p.append(a);
}


function getPageOtm(page, word, membre,pagination) {
activePage = page;
if(pagination==1){
searchMLT(word);
}else{
getDetWordKeyLoad(word, membre);
}
}

function previousPageOtm(word, membre,pagination) {
if (activePage != 1) {
activePage--;
if (activePage == (filePage * 2) + 1 && activePage != 1) {
    getPrevPageFile(word, membre,pagination);
} else {
    if(pagination==1){
        searchMLT(word);
    }else{
        getDetWordKeyLoad(word, membre);
    }
}
console.log("to Prev file Page");
console.log(activePage);
}
}

function nextPageOtm(word, membre, total,pagination) {
console.log("total :" + total);
if (activePage != total) {
activePage++;
if ((filePage != 0 && activePage == (filePage * 2) + 5) || (filePage == 0 && activePage == 5)) {
    console.log("to Next file Page");
    getNextPageFile(word, membre,pagination);
} else {
    console.log("No Next file");
    if(pagination==1){
        searchMLT(word);
    }else{
        getDetWordKeyLoad(word, membre);
    }
}
console.log(activePage);
}
}

function getPrevPageFile(word, membre,pagination) {
filePage = filePage - 1;
if(pagination==1){
searchMLT(word)
}else{
getDetWordKeyLoad(word, membre);    
}
}

function getNextPageFile(word, membre,pagination) {
filePage = filePage + 1;
console.log(filePage);
if(pagination==1){
searchMLT(word);
}else {
getDetWordKeyLoad(word, membre);            
}

}


function searchMLT(word) {
var from = (activePage-1)*5;
var obj = {
"size":5,from:from,
"query": {
    "more_like_this": {
        "fields": ["Avis"],
        "like": [word],
        "min_term_freq": 1,
        "min_doc_freq": 1,
        "minimum_should_match":"100%"
    }
}
};

callLoadGif();
$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/index_classification_cluster2/avis/_search",
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
data: JSON.stringify(obj),
success: function (result) {
    
    loadDiv(4,result,word);
},
error: function (error) {
    console.log(error.responseText);
}
});

}


function searchMLTDiv(result,word){
var total = result.hits.total.value;
$(".stat-dashbord .dashbord-right .d2 .mlt-search .total-hits span").html(total);
$(".stat-dashbord .dashbord-right .d2 .mlt-search .word").html(word);
console.log(result.hits.hits.length);
for (var j = 0; j < Math.min(5,result.hits.hits.length); j++) {

var hl = result.hits.hits[j];
var span = hl._source.Avis;
var tr = document.createElement("tr");
tr.setAttribute("class", "note-div-item");
var td1 = document.createElement("td");
td1.setAttribute("style","font-size: 14px;");
td1.setAttribute("title",span);
td1.innerHTML = subLong(span,135);
var td2 = document.createElement("td");
td2.innerHTML = "<i class=\"far fa-file-alt\"></i>";
td2.innerHTML += "<input type=\"hidden\" value=\"" + hl._id + "\">";
td2.setAttribute("style", "cursor:pointer");

td2.addEventListener("click", function () {
    $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .avis-det-full .extract-notes").hide();
    getAvis(this.parentElement.getElementsByTagName("input")[0].value, word,1);
    
});

tr.appendChild(td1);
tr.appendChild(td2);


$(".stat-dashbord .dashbord-right .d2 .mlt-search table.note-div-items").append(tr);
}

}


function createPaginationListWords(size,total){
console.log(total);
var nbrPage = Math.ceil(total/size);
console.log(nbrPage);
var p = $(".stat-dashbord .dashbord-right .d2 .word-list-div .pagination-word-list");
p.html("");
var table = $(".stat-dashbord .dashbord-right .d2 .word-list .div table tr");
var a = document.createElement("a");
a.innerHTML = "<i class=\"fas fa-angle-double-left\"></i>";
a.addEventListener("click", function () {
previousPageLW(table);
event.preventDefault();
});
p.append(a);


for (var i = 0; i <nbrPage; i++) {
a = document.createElement("a");
var j = i + 1;
if(j==1){
    a.setAttribute("class","active");
}
a.innerHTML = (j);
a.addEventListener("click", function (event) {
    event.preventDefault();
    getPageLW(this.innerHTML,table);
});


p.append(a);
}

a = document.createElement("a");
a.innerHTML = "<i class=\"fas fa-angle-double-right\"></i>";
a.addEventListener("click", function () {
event.preventDefault();
nextPageLW(table);
});
p.append(a);
}
var wordListPage = 1;

function previousPageLW(table){
if(wordListPage != 1){
wordListPage--;
var page =  wordListPage;
getPageLW(page,table);
}
console.log("previous page to :"+page);
}

function nextPageLW(table){
if(wordListPage!=Math.ceil(table.length/10)){
wordListPage++;
var page = wordListPage;
getPageLW(page,table);
} 
console.log("next page to :"+page);
}

function getPageLW(page,table){
wordListPage = page;
tableShows(10,table);
console.log("get page :"+page);
}

function tableShows(size,table){
var tab =  $(".stat-dashbord .dashbord-right .d2 .word-list .div table tr");

var page = wordListPage;
var total = tab.length-(wordListPage-1)*size;
var start = (wordListPage-1)*size;
resetTable(tab);
for(var i = start;i<start+Math.min(size,total);i++){
tab.eq(i).show();
}

$(".pagination-word-list a").removeClass("active");
$(".pagination-word-list a").eq(page).addClass("active");    
}

function resetTable(table){
for(var i=0;i<table.length;i++){
table.eq(i).hide();
}
}

function paginationReset(){
wordListPage = 1;
}