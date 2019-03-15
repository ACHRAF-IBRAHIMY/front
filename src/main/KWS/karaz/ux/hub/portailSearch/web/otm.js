
function ESCall(){	
	var obj = {
		    "aggs" : {
		        "genres" : {
		           "terms": { "field" : "Avis","size": 500 }
		        }
		    }
		};
	
	$.ajax({
        type: "POST",
        url: "http://localhost:9200/index_classification/class",
        datatype : "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        success: function( result ) {
            console.log(result);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
}


function ESCall(){	
	var obj = {
		    "aggs" : {
		        "genres" : {
		           "terms": { "field" : "Avis","size": 500 }
		        }
		    }
		};
	
	$.ajax({
        type: "POST",
        url: "http://localhost:9200/index_classification_test/avis/_search",
        datatype : "application/json",
        contentType: "application/json",
        data:JSON.stringify(obj),
        success: function( result ) {
            console.log(result);
            var labels = createArray(result,"aggregations.genres.buckets.key");
            var data = createArray(result,"aggregations.genres.buckets.doc_count");
            loaded(data,labels);
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
}

function createArray(results,path){
    var arr = new Array();
    var tabP = path.split(".");
    var res = results;
    var key = tabP[tabP.length-1];
    for(var j=0;j<tabP.length-1;j++){
        res= res[tabP[j]];
    }
    
    for(var i=0;i<res.length;i++){
        arr.push(res[i][key]);
    }
    console.log(arr);
}

function loaded(data,labels){
	var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
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
}