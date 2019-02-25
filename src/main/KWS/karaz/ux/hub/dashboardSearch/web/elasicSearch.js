/* from file karazapps/karaz/ux/hub/dashboardsearch/model/dashboardsearch/web/elasicSearch.js  */
var currentPage = 0;
var totalPage = 0;
var timerID = 0;
var msecc =0;
var startTime = 0
var start = 0;
var end = 0;
var diff = 0;


function restAutoComplete(inp,prefix,type){
    var result = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            closeAllLists();
            var res = JSON.parse(this.responseText);
            for(var i=0;i<res.hits.hits.length;i++){
                var elm = res.hits.hits[i]._source.value;
                if(check(result,elm)){
                    result.push(elm);
                }
            }
            autocompleteF(inp,result,prefix,type);
        }
    };
   // xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    xhttp.open("POST","https://cmdbserver.karaz.org:9200/completion_index/completionTerm/_search");
    xhttp.setRequestHeader("Authorization","Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
            "size": 5,
            "query": {
                "bool":{
                    "must":[{
                        "query_string": {

                            "fields":["value"],
                            "query": "*"+prefix+"*"

                        }
                    }],
                    "should":[{
                        "match_phrase_prefix":{
                            "value":prefix
                        }
                    }]
                }
            }
        }
    ));
    return result;
}


//Check if result has already token
function check(res,elm){
    for(var i=0;i<res.length;i++){
        console.log(res[i]+"***"+elm);
        if(res[i]==elm){
            return false;
        }
    }
    return true;
}


//Search results and redirect to activity model
function restSearchList(prefix,from) {
    var result = [];
    var xhttp = new XMLHttpRequest();
    $(".searchGif").show();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            clearTimeout(timerID);
            stopChrono();
            document.getElementsByClassName("nbrRes")[0].getElementsByTagName("span")[0].innerHTML=res.hits.total;
            for(var i=0;i<res.hits.hits.length;i++){
                result.push(res.hits.hits[i]);
            }
            $(".searchGif").hide();
            if(currentPage==0){
                totalPage = Math.ceil(res.hits.total/4);
                createPaginationBar(totalPage,prefix);
                if(totalPage!=0){
                    currentPage=1;
                }
            }
            searchList(result);
        }
    };
 //   xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    xhttp.open("POST","https://cmdbserver.karaz.org:9200/activite_economique/activite/_search");
    xhttp.setRequestHeader("Authorization","Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var testLanguage = RegExp('[أ-ي]');
    if(testLanguage.test(prefix)){
        xhttp.send(JSON.stringify(
            {
                "from":from,"size":4,
                "query": {
                    "bool": {
                        "must": [
                            { "multi_match": {
                                "query": prefix,
                                "fields": ["tags.keywordsString"],
                                "analyzer": "rebuilt_arabic",
                                "fuzziness": "AUTO",
                                "minimum_should_match": "70%"
                            }},{
                                "match_phrase": {
                                    "content.categorie": {
                                        "query": "Intitulé activité"
                                    }
                                }}
                        ],
                        "should": [
                            {
                                "match": {
                                    "content.intituleAr": prefix
                                }
                            }
                        ]
                    }
                }
            }
        ));
    }else{
        xhttp.send(JSON.stringify(
            {
                "from":from,"size":4,
                "query": {
                    "bool": {
                        "must": [
                            { "multi_match": {
                                "query": prefix,
                                "fields": ["tags.keywordsString"],
                                "analyzer": "rebuilt_french",
                                "fuzziness": "AUTO",
                                "minimum_should_match": "70%"
                            }},{
                                "match_phrase": {
                                    "content.categorie": {
                                        "query": "Intitulé activité"
                                    }
                                }}
                        ],
                        "should": [
                            {
                                "match": {
                                    "content.intituleFr": prefix
                                }
                            }
                        ]
                    }
                }
            }
        ));
    }

    return result;
}

//Create list of results
function searchList(results) {
    var x = document.getElementsByClassName("searchList")[0].getElementsByClassName("searchListD");
    var y = document.getElementsByClassName("result-item");
    console.log(y.length);
    var size = y.length;

    for (var i = 0; i < size; i++) {
        y[0].parentNode.removeChild(y[0]);
    }


    for (var j = 0; j < results.length; j++) {
        var b = document.createElement("div");
        var intituleFr = results[j]._source.content.intituleFr;
        var typeAc = checkUndefined(results[j]._source.parents[1]);
        var nature = checkUndefined(results[j]._source.parents[0]);
        var typeAt = checkUndefined(results[j]._source.parents[2]);
        
        b.setAttribute("class","list-group-item result-item");
        b.innerHTML="<span class=\"titleS\">"+intituleFr+" </span><span class=\"grid-item\" style=\"{color:red;display:none}\"> Score:"+results[j]._score+"</span>";
        //b.innerHTML+="<div class=\"titleS grid-item\" style=\"{float:right}\">"+results[j]._source.content.intituleAr+" </div>";
        /*
        b.innerHTML+="<div class=\"grid-item\"> <b>Nature d'activité :</b> "+results[j]._source.parents[0].content.intituleFr+"</div>";
        b.innerHTML+="<div class=\"grid-item\"> <b>Type d'activité :</b> "+results[j]._source.parents[1].content.intituleFr+"</div>";
        b.innerHTML+="<div class=\"grid-item\"> <b>Type d'autorisation :</b> "+results[j]._source.parents[2].content.intituleFr+"</div>";
        */
        b.innerHTML+="<p class=\"searchP\"><b>Nature d'activité :</b> "+nature+"<b> Type d'activité :</b> "+typeAc+"<b> Type d'autorisation :</b> "+typeAt+"</p>"
        b.addEventListener("click", function(e) {
            console.log("go to model");
        });
        
        x[0].appendChild(b);
    }
}


function autocompleteF(inp,arr,val,type){
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
   if(type){
    console.log(type);   
    inp.parentNode.parentNode.appendChild(a);   
   }else{
    console.log(type);   
    inp.parentNode.appendChild(a);
   }
    
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        var str = arr[i];

        b.innerHTML = str.substring(0,str.toLowerCase().search(val.toLowerCase()));
        if(str.toLowerCase().search(val.toLowerCase())!=-1){
                b.innerHTML += "<span>" + str.substring(str.toLowerCase().search(val.toLowerCase()),str.toLowerCase().search(val.toLowerCase())+val.length) + "</span>";
        }else{
            b.innerHTML += str.substring(str.toLowerCase().search(val.toLowerCase()),str.toLowerCase().search(val.toLowerCase())+val.length);
        }
        b.innerHTML += arr[i].substr(str.toLowerCase().search(val.toLowerCase())+val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
    }
}


function autocomplete(inp,arr) {
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        if (!val) {
            closeAllLists();
            return false;
        }
        currentFocus = -1;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        restAutoComplete(inp,val);

    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        console.log(x.length);

        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    
    
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        console.log(currentFocus);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        console.log(currentFocus);
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
            x[i].getElementsByTagName("span")[0].classList.remove("span-active");
        }
    }
}
    function addActive(x) {
        console.log(currentFocus);
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
        x[currentFocus].getElementsByTagName("span")[0].classList.add("span-active");

    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
            x[i].getElementsByTagName("span")[0].classList.remove("span-active");
        }
    }

    function moveKey(e,x){
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }else{
                console.log(currentFocus);
                document.getElementsByClassName("divSearchBar")[0].style.display=none;
                restSearchList(document.getElementsByClassName("ow-field-input")[2].value);
                document.getElementsByClassName("searchList")[0].style.display=block;

            }
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i]) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });

    $(".searchListD .fa-bars").click(function(){
                   var valu = $(this).parent().children(".details").html();
                    $(".acticiteModel .modal-content").html(valu);
                    modal.style.display = "block";
    });

    function createPaginationBar(nbrPage,prefix){
        var p = $(".searchList .pagination");
        p.html(" ");
        var a = document.createElement("a");
                a.innerHTML="<i class=\"fas fa-angle-double-left\"></i>";
                a.addEventListener("click",function(){
                    console.log("!next");
                    previousPage(prefix);
                    event.preventDefault();
                });
                p.append(a);

        for(var i=0;i<nbrPage;i++){
            if(i==0){
                a = document.createElement("a");
                a.innerHTML="1";
                a.setAttribute("class","active");                
                a.addEventListener("click",function(){
                    event.preventDefault();
                    console.log("1");
                    getPage(1,prefix);
                });
        
                p.append(a);
            }else{
                a = document.createElement("a");
                var j=i+1;
                console.log(j);
                a.innerHTML=(j);
                a.addEventListener("click",function(event){
                    event.preventDefault();    
                    getPage(this.innerHTML,prefix);
                });
                p.append(a);        
            }
        }
        a = document.createElement("a");
        a.innerHTML="<i class=\"fas fa-angle-double-right\"></i>";
       a.addEventListener("click",function(){
           event.preventDefault();
            console.log("next");
            nextPage(prefix);
       });
        
        p.append(a);
    }


    function nextPage(prefix){
        if(currentPage<totalPage){
            currentPage++;
            getPage(currentPage,prefix);
        }
    }

    function previousPage(prefix){
        if(1<currentPage){
            currentPage--;
            getPage(currentPage,prefix);
        }
    }

    function getPage(page,prefix){
        currentPage=page;
        closeSearchList();
        restSearchList(prefix,(page-1)*4);
        activePageBar();
    }

    function activePageBar(){
        $(".searchList .pagination a").removeClass("active");
        $(".searchList .pagination a").get(currentPage).setAttribute("class","active");;
    }

    function closeSearchList(){
        $(".searchList .searchListD").html("<div class=\"searchGif\"><img src=\"img/search-move.gif\" /></div>");
    }

    function getTimeCounter(){
        var start = new Date();
        chrono();
    }

    function stopChrono(){
        var second = msecc/1000;
        document.getElementsByClassName("searchList")[0].getElementsByClassName("nbrRes")[0].getElementsByTagName("span")[1].innerHTML=second;
    }

    function chrono(){
	       end = new Date()
	       diff = end - start
	       diff = new Date(diff)
	       var msec = diff.getMilliseconds()
	       var sec = diff.getSeconds()
	       var min = diff.getMinutes()
	       var hr = diff.getHours()-1
            if (min < 10){
                min = "0" + min
            }
            if (sec < 10){
                sec = "0" + sec
            }
            if(msec < 10){
                msec = "00" +msec
            }
            else if(msec < 100){
                msec = "0" +msec
            }
            msecc = msec;
            console.log(msecc+"*******"+msec);
	        timerID = setTimeout("chrono()", 10)
        }
    function checkUndefined(text){
        if(text == undefined){
            return "";
        }
        return text.content.intituleFr;
    }

   


//modal scripts