var chartG = null;

function ESCall(size, membre) {
    console.log(size,membre);
    
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
            console.log(result);
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
    console.log(arr);
    return arr;
}

function loaded(data, labels,membre) {
    console.log(labels.length);
    console.log(data.length);
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
    var obj = {
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
        console.log(extractByTag(hl[j].highlight.Avis[0], 'em') + " **** " + hl[j]._source.Avis);
        var span = addSpansHL(extractByTag(hl[j].highlight.Avis[0], 'em'), extractArray(hl[j]._source.Avis, extractByTag(hl[j].highlight.Avis[0], 'em')));
        console.log(span);
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
            $(".dashbord-right .d2 .word-list-load-gif").hide();
            $(".dashbord-right .d2 .word-list-det").show();
            break;
        case 3:
            getTextAvis(key.avis, key.membre, key.key);
            $(".dashbord-right .d2 .word-list-load-gif").hide();
            $(".dashbord-right .d2 .word-list-text-avis").show();
            break;
    }
}


function getTextAvis(avis, membre, key) {
    $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .avis-det-membre span").html(membre);
    $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .avis-det-avis p").html(avis);
    $(".stat-dashbord .dashbord-right .d2 .word-list-text-avis .vpanel-title span.cl-orange").html(key);
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
    console.log(pos1 + "," + pos2 + "," + text.substring(pos1, pos2));
    return text.substring(pos1, pos2);
}


function searchBefAft(pos, arr, vr) {
    var copie = new Array();
    console.log(vr == 0);
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
            console.log(result);
            var res = {
                "avis": result._source.Avis,
                "membre": result._source.MEMBRE,
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
    console.log(chart);
    switch (type) {
        case 1:
            chart = restUpdateChart(chart, type, key);
            break;

        case 2:
            chart = restUpdateChart(chart, type, key);
            break;

        case 3:
            chart.config.type = "pie";
            chart.update();
            break;

        case 4:
            chart.config.type = "bar";
            chart.update();
            break;
    }

}

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