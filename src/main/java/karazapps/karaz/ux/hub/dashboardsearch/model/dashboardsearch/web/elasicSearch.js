/* from file karazapps/karaz/ux/hub/dashboardsearch/model/dashboardsearch/web/elasicSearch.js  */
    
function restAutoComplete(inp,prefix){
    var result = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            console.log(res.suggest.items);
            for(var i=0;i<res.suggest.items[0].options.length;i++){
                var elm = res.suggest.items[0].options[i].text;
                if(check(result,elm)){
                    result.push(elm);
                }
            }
            autocompleteF(inp,result,prefix);
        }
    };
    console.log(prefix);
    xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "from" : 0, "size" : 5,
        "suggest": {
            "items" : {
                "prefix" : prefix,
                "completion" : {
                    "field" : "tags"
                }
            }
        }
    }));

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
function restSearchList(prefix) {
    var result = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);

            for(var i=0;i<res.hits.hits.length;i++){
                result.push(res.hits.hits[i]._source);
            }
            
            searchList(result);
        }
    };
    xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(
        {

            "query":{
                "bool":{
                    "must":[
                        {
                            "query_string" : {
                                "query" : "*"+prefix+"*"
                            }},{
                            "match_phrase":{
                                "content.categorie":"Intitulé Activité"
                            }
                        }]
                }}
        }

    ));

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

    document.getElementsByClassName("nbrRes")[0].getElementsByTagName("span")[0].innerHTML=results.length;

    for (var j = 0; j < results.length; j++) {
        var b = document.createElement("div");
        b.setAttribute("class","list-group-item result-item");
        b.innerHTML="<span class=\"titleS\">"+results[j].content.intituleFr+"</span><br>";
        b.innerHTML+="<span> <b>Nature d'activité :</b> "+results[j].parents[0].content.intituleFr+"</span>";
        b.innerHTML+="<span> <b>Type d'activité :</b> "+results[j].parents[1].content.intituleFr+"</span>";
        b.innerHTML+="<span> <b>Type d'autorisation :</b> "+results[j].parents[2].content.intituleFr+"</span>";
       /* b.innerHTML+="<span class=\"details\">"+results[j].parents[0].content.intituleFr+"<span/>";
        b.innerHTML+="<span class=\"details\">"+results[j].parents[0].content.intituleFr+"<span/>";
        b.innerHTML+="<span class=\"details\">"+results[j].parents[0].content.intituleFr+"<span/>";*/
        b.innerHTML+="<i class=\"fas fa-bars\"></i>";
        b.getElementsByTagName("i")[0].addEventListener("click",function(){
            
            $("#activiteModal").show();
        })
        b.addEventListener("click", function(e) {
            console.log("go to model");
        });
        
        x[0].appendChild(b);
    }
}


function autocompleteF(inp,arr,val){
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        var str = arr[i];

        b.innerHTML = str.substring(0,str.toLowerCase().search(val.toLowerCase()));
        b.innerHTML += "<strong>" + str.substring(str.toLowerCase().search(val.toLowerCase()),str.toLowerCase().search(val.toLowerCase())+val.length) + "</strong>";
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
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
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

    

//modal scripts
