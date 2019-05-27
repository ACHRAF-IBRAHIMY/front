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
                if($(".simulator .simulator-qr .next-button button.next-rq").hasClass("stopped")){
                   $(".simulator .simulator-qr .next-button button.next-rq").removeClass("stopped"); 
                }
                
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
       response.setAttribute("placeholder",obj.response.placeholder);
       q2.appendChild(response);
    }else if(type="input-conditional"){
        var size = obj.response.content.length;
        var response = document.createElement("input");
        for(var i=0;i<size;i++){
            var check = document.createElement("input");
            check.setAttribute("value",obj.response.content[i]);   
            check.setAttribute("type","hidden");
            check.setAttribute("class","hidden-conditional");
            q2.appendChild(check);
        }
        response.setAttribute("class","rep-pred rep-type-3");
        response.setAttribute("placeholder",obj.response.placeholder);
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

function completeArrayMatrix(ar1,ar2,size){
    console.log(ar1);
    console.log(ar2);
    var list = [];  
      for(var i=0;i<size;i++){
          if(ar1.indexOf(i.toString())!=-1){
            list.push(ar2[ar1.indexOf(i.toString())]);
          }else{
            list.push(0);
          }
      }
     console.log(list); 
    return list;
}

function createArrayPredict(size){
    var vect = [];
    for(var i=0;i<size;i++){
        vect.push(0);
    }
    return vect;
}

function getQuestion(id,type){
    loadQuestion();
    $.ajax({
        type: "get",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: URL_SEARCH+"/simulator_index_qr/qrs/"+id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
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

var tree = [{
    "0": [{
        "1": [{
            "2": [{
                    "3": []
               },
                {
                    "3": []
                },
                {
                    "7": [{
                        "3": []
                }],
             }],
            "6": [{
                "5": []
            }]
        }]},{
        "4": [{
            "7": [{
                "5": []
            }]
        }]
    
}]}];


var arrayVect = [new Array(),new Array(),new Array()];

function addToArrayVect(key,value,type){
    var index = arrayVect[0].indexOf(key);
    if(index==-1){
        arrayVect[0].push(key);
        arrayVect[1].push(value);
        arrayVect[2].push(type);
    }else{
        arrayVect[1][index]= value;
        arrayVect[2][index]=type;
    }
}

function popArrayVect(){
    arrayVect[0].pop();
    arrayVect[1].pop();
    arrayVect[2].pop();
}

function loadQuestion(){
    var str = "<img src=\"img/load-text.gif\" style=\"margin: auto;display: block;height: 100px;\" alt=\"\"/>";
    $(".simulator .simulator-qr .qr").html(str);
}

function intializeVectArray(){
    arrayVect[0].push(Object.keys(tree)[0]);
    arrayVect[1].push(0);
    arrayVect[2].push(0);
}

function nextClick(){
        var type = $(".simulator .simulator-qr .rep-pred");
        if(type.hasClass("rep-type-0")){
            type=0
        }else if(type.hasClass("rep-type-1")){
            type=1
        }else if(type.hasClass("rep-type-3")){
            type=3
        }else{
            type=2
        }

        switch(type){
            
            case 0:
                var val = $(".simulator .simulator-qr .rep-pred .check .active-check").parent().parent().children("input").val();
                addToArrayVect(arrayVect[0][arrayVect [0].length-1],val,val);                 
                startButton(1);  
                var str = getTreeHier(tree,arrayVect); 
                var treeLocal = eval("tree"+str);
                console.log(str);
                console.log(treeLocal);
                traitementResponse(treeLocal,val-1)
                break;
            case 1:
                var val = $(".simulator .simulator-qr .rep-pred option:selected").val();
                startButton(1);
                addToArrayVect(arrayVect[0][arrayVect [0].length-1],val,val);                 
                var str = getTreeHier(tree,arrayVect); 
                var treeLocal = eval("tree"+str);
                console.log(str);
                console.log(treeLocal);
                traitementResponse(treeLocal,val-1)
                break;
            case 2:
                var val = $(".simulator .simulator-qr .rep-pred").val();
                console.log(val);
                console.log(Object.keys(arrayVect)[Object.keys(arrayVect).length-1]);
                addToArrayVect(arrayVect[0][arrayVect [0].length-1],val,val);                 
                startButton(1);
                var str = getTreeHier(tree,arrayVect); 
                var treeLocal = eval("tree"+str);
                console.log(str);
                console.log(treeLocal);
                traitementResponse(treeLocal,0);       
                break;
            case 3:
                var val = $(".simulator .simulator-qr .rep-pred").val();
                var inputs = $(".simulator .simulator-qr .hidden-conditional");
                for(var i =0;i<inputs.length;i++){
                    if(eval("val"+inputs.eq(i).val())){
                        val = (i+1).toString();
                        break;
                    }
                }
                
                console.log(Object.keys(arrayVect)[Object.keys(arrayVect).length-1]);
                addToArrayVect(arrayVect[0][arrayVect [0].length-1],val,val);                 
                startButton(1);
                var str = getTreeHier(tree,arrayVect); 
                var treeLocal = eval("tree"+str);
                console.log(str);
                console.log(treeLocal);
                traitementResponse(treeLocal,val-1);       
                break;
        }

} 



function traitementResponse(treeLocal,val){
    if(existBody(treeLocal)){
      if(treeLocal.length == 1){
        var id = Object.keys(treeLocal[0])[0];
        addToArrayVect(arrayVect[0][arrayVect [0].length-1],val+1,1);
      }else{
        var id = Object.keys(treeLocal[val])[0];   
      }  
        console.log(id);
        getQuestion(id,0);    
        addToArrayVect(id,0,0);
    }else{
      console.log("end");
      endFunctionSend();
    }
}


function endFunctionSend(){
    reps = [];
    stopedButton(0);
    
    var search = makeResponse(arrayVect);
    console.log("search :"+search);
    var objSearchMatrix = searchInMatrix2(matrix,search);

    countDoc(0,objSearchMatrix);
    countDoc(1,objSearchMatrix);
    countDoc(2,objSearchMatrix);
    
    
}

function getTreeHier(treeGl,array) {
    var str = "[0][0]";
    console.log(array);
    for(var i=1;i<array[0].length;i++){
        str+="["+Math.max(0,(array[2][i-1]-1))+"]["+(array[0][i])+"]";
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

var qsts = [];

function makeResponse(array){    
    var reps = [];

    for(var i =0 ; i< qsts.length;i++){
        reps.push(0);
    }
    
    for(var i =0 ; i< array[0].length ; i++){
        var index = qsts.indexOf(array[0][i].toString());
        reps[index]= array[1][i];
    }
    
    return reps;
}               

var matrix = [["11110000","11130000","11220000","11120000","11210000","11230000","11310001","11330001","11320001","11320002","11310002","11330002"],[67111656,67111656,323552,67373800,61408,61408,4072,4072,266216,266217,4073,4073],[1023,1023,1023,1023,1023,1023,1023,1023,1023,1023,1023,1023],[4096,4096,0000,4096,0000,0000,0000,0000,0000,0000,0000,0000]];

function searchInMatrix(matrix,key){
     var index = matrix[0].indexOf(key);

     if(index!=-1){
        return { docs :matrix[1][index], steps :matrix[2][index] , docsComp : matrix[3][index]};
     }else{
         alert("Ce chemin n'existe pas encore dans la matrice de classement, veuillez choisir un autre chemin.");
         return null;
     }
}

function searchInMatrix2(matrix,listKey){
    var index = -1;
    for(var i=0;i<matrix[0].length;i++){
        for(var j=0;j<matrix[0][i].length;j++){
            if(matrix[0][i][j]!=listKey[j] && matrix[0][i][j]!=-1){
              break;
            }
        }
      if(j==matrix[0][i].length){
         index = i;
         break;
      }
    }
    
    if(index!=-1){
        return { docs :matrix[1][index], steps :matrix[2][index] , docsComp : matrix[3][index]};
     }else{
         alert("Ce chemin n'existe pas encore dans la matrice de classement, veuillez choisir un autre chemin.");
         return null;
     }
}

function bulkRequest(vector,type){
    
    var request = "";
    if(type==0){
        for(var i=0;i<vector.length;i++){
              if(vector[i]==1){
                    request += "{ \"index\": \"simulator_index_docs\", \"type\": \"docs\" }\n";
                    request += "{ \"query\": { \"match\": { \"id\":"+(i+1)+"}}}\n";
                }
        }
    }else{
        for(var i=0;i<vector.length;i++){
              if(vector[i]==1){
                    request += "{ \"index\": \"simulator_index_steps\", \"type\": \"steps\" }\n";
                    request += "{ \"query\": { \"match\": { \"id\":"+(i+1)+"}}}\n";
                }
        }
    }
    
    return request;
}



function sendRequestBulk(bulk,type){
    $.ajax({
        type: "post",
        //url: "http://localhost:9200/_msearch",
        url: URL_SEARCH+"/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data:bulk,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {    
            console.log(result);
            if(type==0 || type==2){
                addDocs(result.responses,type);
            }else{
                addSteps(result.responses);                
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })

}

function firstEsTreeCall(){
    var bulk = "{ \"index\": \"simulator_index_qr\", \"type\": \"qrs\" }\n{\"size\":4000,\"query\":{\"match_all\":{}}}\n{ \"index\": \"simulator_index_matrix\", \"type\": \"columns\" }\n{\"size\":4000,\"query\":{\"match_all\":{}}}\n";
    $.ajax({
        type: "post",
        //url: "http://localhost:9200/_msearch",
        url: URL_SEARCH+"/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data:bulk,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {    
            console.log(result);
            var sizeQuestions = result.responses[0].hits.hits.length;
            var columns = result.responses[1].hits.hits;
            console.log("matrix length :" + columns.length);
            matrix = [[],[],[],[]];
            qsts =[];
            for(var i=0;i<result.responses[0].hits.hits.length;i++){
                qsts.push(result.responses[0].hits.hits[i]._source.id.toString());
            }
            
            qsts.sort(function(a, b) {
                return Number(a) - Number(b);
            })


            for(var i=0;i<columns.length;i++){
                var ar1 = columns[i]._source.list; 
                var ar2 = columns[i]._source.list_rep;
                console.log(ar1);
                matrix[0].push(completeArrayMatrix(ar1,ar2,sizeQuestions)); 
                matrix[1].push(columns[i]._source.docs_requis);
                matrix[2].push(columns[i]._source.steps);
                matrix[3].push(columns[i]._source.docs_comp);

                console.log(completeArrayMatrix(ar1,ar2,sizeQuestions));
            }


            for(key in Object.keys(tree)){
                getQuestion(key,0);
            }
            intializeVectArray();
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })
}


function countDoc(type,objSearchMatrix) {
    var obj = {
        "query": {
            "match_all": {}
        }
    };

    if (type == 0 || type == 2 || type == 20) {
        var url = "simulator_index_docs/docs/_count";
    } else if (type == 1) {
        var url = "simulator_index_qr/qrs/_count";
    }

    $.ajax({
        type: "post",
      //  url: "http://localhost:9200/" + url,
        url: URL_SEARCH+"/"+url,
        datatype: "application/json",
        contentType: "application/json",
        data: obj,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            if (type == 0) {
                var inte = objSearchMatrix.docs;
                var vector = bin2vec(int2bin(inte));
                vector = completVec(result.count, vector);
                var bulk = bulkRequest(vector, 0);
                if (bulk != "") {
                    sendRequestBulk(bulkRequest(vector, 0), 0);
                } else {
                    addDocs([], 0);
                }
            } else if (type == 1) {
                var inte2 = objSearchMatrix.steps;
                var vector2 = bin2vec(int2bin(inte2));
                vector2 = completVec(result.count, vector2);
                var bulk2 = bulkRequest(vector2, 1);
                if (bulk2 != "") {
                    sendRequestBulk(bulkRequest(vector2, 1), 1);
                } else {
                    addSteps([]);
                }
            } else if (type == 2) {
                var inte3 = objSearchMatrix.docsComp;
                var vector3 = bin2vec(int2bin(inte3));
                vector3 = completVec(result.count, vector3);
                var bulk3 = bulkRequest(vector3, 0);
                if (bulk3 != "") {
                    console.log(bulk3.length + " ln");
                    sendRequestBulk(bulkRequest(vector3, 0), 2);
                } else {
                    addDocs([], 2);
                }
                
            } else if (type == 20) {
                
                


            }
            result.count
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })

}

function backClick(){
    popArrayVect();
    var id = arrayVect[0][arrayVect[0].length-1];
    startButton(0);
    if(arrayVect[0].length==1){
        stopedButton(1);
    }
    getQuestion(id,0);
}

function addDocs(result,type){
    if(type==0){
        var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("docs-container")[0];
    }else if(type==2){
        var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("docs-comp-container")[0];    
    }
    docContainer.innerHTML="";
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


function addSteps(result){
    var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("steps-container")[0];
    docContainer.innerHTML="";
    for(var i =0 ; i <result.length;i++){
        var doc = document.createElement("div");
        doc.setAttribute("class","doc-item");
        var icon = document.createElement("span");
        icon.setAttribute("class","icon-number");
        icon.innerHTML = (i+1);
        var docName = document.createElement("span");
        docName.innerHTML = result[i].hits.hits[0]._source.title;
        docName.setAttribute("class","doc-name");
        
        doc.appendChild(icon);
        if(result[i].hits.hits[0]._source.membres != undefined){
            for(var j=0;j<result[i].hits.hits[0]._source.membres.length;j++){
                var spa = "<span class=\"membre-span\">"+result[i].hits.hits[0]._source.membres[j]+"</span>"
                docName.innerHTML+=spa;
            }
        }
        
        doc.appendChild(docName);
        var det = document.createElement("div");
        det.setAttribute("style","font-size:14px;color:#888;margin-bottom:10px");
        det.innerHTML = checkUndefined(result[i].hits.hits[0]._source.detail);
        var detadd = document.createElement("div");
        doc.appendChild(detadd);
        doc.appendChild(det);
        docContainer.appendChild(doc);
        

    }
}

function stopedButton(type){
    if(type==0){
       $(".simulator .simulator-qr .next-button .next-rq").addClass("stopped");
    }else{
       $(".simulator .simulator-qr .next-button .back-rq").addClass("stopped");
    }
}


function startButton(type){
    if(type==0){
       $(".simulator .simulator-qr .next-button .next-rq").removeClass("stopped");
    }else{
       $(".simulator .simulator-qr .next-button .back-rq").removeClass("stopped");
    }
}