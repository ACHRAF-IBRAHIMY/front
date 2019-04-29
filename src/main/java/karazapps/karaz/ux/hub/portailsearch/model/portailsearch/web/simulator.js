function addQuestion(qst){ 
    $(".simulator .simulator-qr .qr").html("");
    createQuestion(qst.response.type,qst);
}

function createQuestion(type,obj){
    
    var gldiv = document.getElementsByClassName("simulator")[0].getElementsByClassName("qr")[0];
    var q = document.createElement("div");
    q.setAttribute("class","ques-rep");
    var q1 = document.createElement("div");
    q1.setAttribute("class","ques");
    q1.innerHTML= obj.question;
    var q2 = document.createElement("div");
    q2.setAttribute("class","rep");
    
    if(type=="check"){
        var size = obj.response.content.length;
        var response = document.createElement("div");
        response.setAttribute("class","rep-pred rep-type-0");
        
        if(size==3){
            response.setAttribute("style","display: grid;grid-template-columns: 33% 33% 33%;")
        }else{
            response.setAttribute("style","display: grid;grid-template-columns: 50% 50%;")            
        }
        
        for(var i=0;i<size;i++){
            var resDiv = document.createElement("div");
            if(size==3){
                resDiv.setAttribute("style","display: grid;grid-template-columns: 15% 85%;");
            }else{
                resDiv.setAttribute("style","display: grid;grid-template-columns: 10% 90%;");
            }
            var input = document.createElement("input");
            input.setAttribute("type","hidden");
            input.setAttribute("value",i+1);
            var res = document.createElement("span");
            res.setAttribute("class","rep-check");
            res.innerHTML = obj.response.content[i];   
            var check = document.createElement("span");
            check.setAttribute("class","check");
            check.addEventListener("click",function(){
                $(this).parent().parent().find(".check-ent").removeClass("active-check");
                $(this).children(".check-ent").addClass("active-check");
            });
            var checkEnt = document.createElement("span");
            checkEnt.setAttribute("class","check-ent");
            if(i==0)checkEnt.setAttribute("class","check-ent active-check");
            check.appendChild(checkEnt);   
            resDiv.appendChild(check);
            resDiv.appendChild(res);
            resDiv.appendChild(input);
            response.appendChild(resDiv);
        }
        
        q2.appendChild(response);
        
    }else if(type=="select"){ 
       var size = obj.response.content.length;
       var response = document.createElement("select");
       response.setAttribute("class","rep-pred rep-type-1");
       for(var i=0;i<size;i++){
         var check = document.createElement("option");
         check.setAttribute("value",i+1);
         check.innerHTML = obj.response.content[i];   
         response.appendChild(check);
       }
        q2.appendChild(response);    
        
    }else if(type=="input"){
        var response = document.createElement("input");
        response.setAttribute("class","rep-pred rep-type-2");
        response.setAttribute("placeholder",obj.response.content[0]);
        q2.appendChild(response);
    }
    
    q.appendChild(q1);
    q.appendChild(q2);
    gldiv.appendChild(q);
}

function bin2int(num){
    return parseInt(num,2);
}

function int2bin(num){
  return (num).toString(2);
}


function bin2vec(num){
  return num.split('');
}

function predictBin(){
  return Math.floor((Math.random() * 1099511627775) + 1);
}

function completVec(size,vec){
  var nbr = size-vec.length;
  for(var i=0;i<nbr;i++){
    vec.unshift("0");
  }
  return vec;
}

function vec2bin(vec){
  return vec.join('');
}


function createArrayPredict(size){
    var vect = [];
    for(var i=0;i<size;i++){
        vect.push(0);
    }
    return vect;
}


function getQuestion(id,type){
    $.ajax({
        type: "get",
        //url: "https://cmdbserver.karaz.org:9200/simulator_index_qr/qrs/"+id,
        url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
           // xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {    
            if(type==0){
                console.log(result);
                addQuestion(result._source);
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

            var tree = {
                "0": {
                    "1": {
                         "2":{
                            "3":{
                            }     
                         },
                            "6":{
                                "5":{
                                    
                                }
                            }
                    },
                    "4":{
                        
                    }
                }
            };


var arrayVect = [new Array(),new Array()];

function addToArrayVect(key,value){
    var index = arrayVect[0].indexOf(key);
    if(index==-1){
        arrayVect[0].push(key);
        arrayVect[1].push(value);
    }else{
        arrayVect[1][index]= value;
    }
}

function intializeVectArray(){
    arrayVect[0].push(Object.keys(tree)[0]);
    arrayVect[1].push(0);
}

function nextClick(){
    
    
        var type = $(".simulator .simulator-qr .rep-pred");
        if(type.hasClass("rep-type-0")){
            type=0
        }else if(type.hasClass("rep-type-1")){
            type=1
        }else{
            type=2
        }

        switch(type){
            case 0:
                  var val = $(".simulator .simulator-qr .rep-pred .check .active-check").parent().parent().children("input").val();
                  var str = getTreeHier(tree,arrayVect); 
                  console.log(str);    
                  var treeLocal = eval("tree"+str);
                  addToArrayVect(arrayVect[0][arrayVect [0].length-1],val);  
                  if(existBody(treeLocal)){
                    var id = Object.keys(treeLocal)[val-1];
                    getQuestion(id,0);    
                    addToArrayVect(id,0);

                  }else{
                      console.log(arrayVect);
                      var search = makeResponse(arrayVect);
                      console.log(search);
                      var inte = searchInMatrix(matrix,search);
                      console.log(inte);
                      var vector = bin2vec(int2bin(inte));
                      console.log(bulkRequestDocs(vector));
                      sendRequestBulk(bulkRequestDocs(vector));
                  }
                  break;
            case 1:
                  var val = $(".simulator .simulator-qr .rep-pred option:selected").val();
                  var str = getTreeHier(tree,arrayVect); 
                 console.log(str);  
                 var treeLocal = eval("tree"+str);
                 addToArrayVect(arrayVect[0][arrayVect[0].length-1],val);
                 if(existBody(treeLocal)){
                    var id = Object.keys(treeLocal)[val-1];
                    getQuestion(id,0);    
                    addToArrayVect(id,0);
                  }else{
                      console.log(arrayVect);
                      var search = makeResponse(arrayVect);
                      console.log(search);
                      searchInMatrix(matrix,search); 
                      
                  }
                  break;
            case 2:
                  var val = $(".simulator .simulator-qr .rep-pred").val();
                  console.log(val);
                  var str = getTreeHier(tree,arrayVect); 
                  var treeLocal = eval("tree"+str);
                  console.log(Object.keys(arrayVect)[Object.keys(arrayVect).length-1]);
                 addToArrayVect(arrayVect[0][arrayVect[0].length-1],val);
                  if(existBody(treeLocal)){
                    var id = Object.keys(treeLocal)[0];
                    getQuestion(id,0);    
                    addToArrayVect(id,0);
                  }else{
                      console.log(arrayVect);
                      var search = makeResponse(arrayVect);
                      searchInMatrix(matrix,search);
                  }
                  break;
        }

} 




function getTreeHier(treeGl,array) {
    var str = "";
    console.log(array);
    for(key in array[0]){
        str+="["+key+"]";
    }
    return str;
}

function existBody(treeGl){
    if(Object.keys(treeGl).length==0){
        return false;
    }else{
        return true;
    }
}


var qsts = ["0","1","2","3","4","5","6","7"];
var reps = [];

function makeResponse(array){
    
    for(var i =0 ; i< qsts.length;i++){
        reps.push(0);
    }
    
    for(var i =0 ; i< array[0].length ; i++){
        var index = qsts.indexOf(array[0][i]);
        reps[index]= array[1][i];
    }
    
    return reps.join('');
}               

var matrix = [["11110000","11100000","120200200"],[12,13,8]];

function searchInMatrix(matrix,key){
    var index = matrix[0].indexOf(key);
    if(index!=-1){
        return matrix[1][index];
     }else{
         console.log("doesnt exist ");
     }
}

function bulkRequestDocs(vector){
    var request = "";
    for(var i=0;i<vector.length;i++){
        if(vector[i]==1){
            request += "{ \"index\": \"simulator_index_docs\", \"type\": \"docs\" }\n";
            request += "{ \"query\": { \"match\": { \"id\":"+(i+1)+"}}}\n";
        }
    }
    return request;
}


function sendRequestBulk(bulk){
    $.ajax({
        type: "post",
        //url: "https://cmdbserver.karaz.org:9200/simulator_index_qr/qrs/"+id,
        url: "http://localhost:9200/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data:bulk,
        beforeSend: function (xhr) {
           // xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {    
            console.log(result);
            addDocs(result.responses);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })

}


function addDocs(result){
    var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("docs-container")[0];
    for(var i =0 ; i <result.length;i++){
        var doc = document.createElement("div");
        doc.setAttribute("class","doc-item");
        var icon = document.createElement("i");
        icon.setAttribute("class","far fa-file-alt");
        var docName = document.createElement("span");
        docName.innerHTML = result[i].hits.hits[0]._source.title;
        docName.setAttribute("class","doc-name");
        doc.appendChild(icon);
        doc.appendChild(docName);
        docContainer.appendChild(doc);
    }
}
