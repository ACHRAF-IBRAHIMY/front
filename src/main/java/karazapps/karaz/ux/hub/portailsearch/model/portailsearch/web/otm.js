

function ESCall() {
    var obj = {
        "aggs": {
            "genres": {
                "terms": {
                    "field": "Avis",
                    "size": 12
                }
            }
        }
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:9200/index_classification_test/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (result) {
            console.log(result);
            var labels = createArray(result, "aggregations.genres.buckets.key");
            var data = createArray(result, "aggregations.genres.buckets.doc_count");
            loaded(data, labels);
            loadList(data, labels);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

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

function loaded(data, labels) {
    console.log(labels.length);
    console.log(data.length);
    var canvas = document.getElementById('myChart');
    var ctx = canvas.getContext('2d');
    var chart = new Chart(ctx, {
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
                }]
            }
        }
    });
    
    canvas.onclick = function(evt) {
            var activePoints = chart.getElementsAtEvent(evt);
            if (activePoints[0]) {
            var chartData = activePoints[0]['_chart'].config.data;
            var idx = activePoints[0]['_index'];

            var label = chartData.labels[idx];
            var value = chartData.datasets[0].data[idx];
            
            removeWordDet();
            getDetWordKeyLoad(label);
                
                
       }
    };
               
}


function loadList(data, labels) {
    var list = $(".stat-dashbord .dashbord-right .d2 .word-list .div div");
    for (var i = 0; i < data.length; i++) {
        var ap = document.createElement("div");
        ap.setAttribute("class", "exist-word-list-item");

        var sp1 = document.createElement("span");
        sp1.innerHTML = labels[i];

        var sp2 = document.createElement("span");
        sp2.innerHTML = data[i];

        var sp3 = document.createElement("span");
        sp3.setAttribute("class", "fas fa-align-left");
        sp3.setAttribute("style", "color:#38a;cursor:pointer;");
        sp3.addEventListener("click", function () {
            var word = this.parentNode.children[0].innerHTML;
            getDetWordKeyLoad(word);
        });

        ap.appendChild(sp1);
        ap.appendChild(sp2);
        ap.appendChild(sp3);

        list.append(ap);
    }
}

function getDetWordKeyLoad(word) {
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

    $.ajax({
        type: "POST",
        url: "http://localhost:9200/index_classification_test/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        success: function (result) {
            getDetWordKey(result, word);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getDetWordKey(result, word) {
    $(".stat-dashbord .dashbord-right .d2 .word-list-det h1 b").html(word);
    var a = filtering(result);
    var hl = result.hits.hits;
    for(var i=0;i<Math.min(5,a.length);i++){
        $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d1 .div-d1-det").append(a[i]);
        if(i!=Math.min(5,a.length)-1)
        $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d1 .div-d1-det").append("-");
    }
    
    for(var j=0;j<Math.min(5,hl.length);j++){
        var span = addSpansHL(extractByTag(hl[j].highlight.Avis[0],'em'),hl[j].highlight.Avis[0].replace("<em>","").replace("</em>",""));
        console.log(span);
        $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d2 ul").append("<li>"+span+"</li>");
    }
    
    
    $(".stat-dashbord .dashbord-right .d2 .word-list").hide();
    $(".stat-dashbord .dashbord-right .d2 .word-list-det").show();
}

function filtering(result){
    var resultF = new Array();
    var total = result.hits.hits.length;
    for(var i=0;i<total;i++){
        var totalF = result.hits.hits[i].highlight.Avis.length;
        var tab = result.hits.hits[i].highlight.Avis;
        for(var j=0;j<totalF;j++){
            if(resultF.indexOf(extractByTag(tab[j],'em').toLowerCase())==-1){
                resultF.push(extractByTag(tab[j],'em').toLowerCase());
            }
        }
    }
    return resultF;
}

function extractByTag(text, tag) {
    var tab = null;
    var tagBegin = "<" + tag + ">";
    var tagEnd = "</" + tag + ">";
    var posBegin = text.indexOf(tagBegin)+4;
    var posEnd = text.indexOf(tagEnd);
    var extract = text.substring(posBegin, posEnd);
    tab = extract;
    return tab;
}

function removeWordDet(){
    $(".stat-dashbord .dashbord-right .d2 .word-list-det").hide(); 
    $(".stat-dashbord .dashbord-right .d2 .word-list").show();
    $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d2 ul").html("");
    $(".stat-dashbord .dashbord-right .d2 .word-list-det .div-d1 .div-d1-det").html("");
}
