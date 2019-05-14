var simple_chart_config = {
    chart: {
        container: "#tree-simple",
        rootOrientation:  'NORTH', // NORTH || EAST || WEST || SOUTH
        // levelSeparation: 30,
        subTeeSeparation:   30,
        levelSeparation:    60,
        siblingSeparation:  60,
        nodeAlign: "BOTTOM",
        node: { HTMLclass: "evolution-tree" },
        connectors: {
            type: "step",
            style: {
                "stroke-width": 2,
                "stroke": "#ccc",
                "stroke-dasharray": "--", //"", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."
                "arrow-end": "classic-wide-long"
        }}
    },

    nodeStructure: {
        text: {
            name: "Root",
            question_id: "1",
            question:"Quelle est la nature de votre demande d'autorisation ?",
            id:""
        },
        children: []
    }
};

function addChild(id) {
    var list = id.split("-");
    var str = getParentPath(list);
    var length = eval("simple_chart_config.nodeStructure" + str + "[\"children\"].length");
    if(id!=""){
        var newId = id + "-" + length;
    }else{
        var newId = length;
    }
    
    var obj = {
        text: {
            name: "Child "+(length+1),
            question_id: "-1",
            question:"Quel est votre question ?",
            status:0,
            id: newId
        },
        children: []
    };
    console.log(str);
    eval("simple_chart_config.nodeStructure" + str + "[\"children\"].push(obj)");
    refrechTreant();
    console.log(newId);
    showUpdate(newId.toString());
}


function getParentPath(list) {
    var str = "";
    if(list[0]!=""){
        for (var i = 0; i < list.length; i++) {
            str += "[\"children\"][" + list[i] + "]";
        }
    }
    return str;
}

var my_chart = null;

function startTreant(){
    my_chart = new Treant(simple_chart_config, function () {}, $);
}

function showUpdate(id){
    var list = id.split("-");
    var str  = getParentPath(list);
    var obj  = eval("simple_chart_config.nodeStructure"+str);
    console.log(obj);
    $(".cms-form .header-cms-form input").val(obj.text.name);
    $(".cms-form  input.class-id").val(obj.text.id);
    $(".cms-form .body-cms-form .class-title span").eq(1).children("input").val(obj.text.name);
    $(".cms-form .body-cms-form .class-question .link-sim-cms span").html(obj.text.question+"<input type=\"hidden\" value=\""+obj.text.question_id+"\"/>");    
    $(".cms-form .body-cms-form .class-responses .responses-sim-cms").html("");
    
    if(obj.text.status == 0){
        $(".cms-form .body-cms-form .class-oid span.classee").html("Non Classé");
    }else{
        $(".cms-form .body-cms-form .class-oid span.classee").html("Classé");
    }

    for(var i =0 ; i< obj.children.length;i++){
        $(".cms-form .body-cms-form .class-responses .responses-sim-cms").html($(".cms-form .body-cms-form .class-responses .responses-sim-cms").html()+"<div><span class=\"link-sim-cms\">"+obj.children[i].text.name+"</span></div>");    
    }
        $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-edit").show();
        $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-plus").hide();
        $(".simulator-cms .side-bar .body").show();
        $(".simulator-cms .side-bar .body1").hide();
}

function updateNode(id){

    var title = $(".cms-form .header-cms-form input").val();
    var list = id.split("-");
    var str  = getParentPath(list);
    if($(".cms-form .body-cms-form .class-question .link-sim-cms span select").html()!=undefined){
            var questionId =  $(".cms-form .body-cms-form .class-question .link-sim-cms select option:selected").val();
            var question =  $(".cms-form .body-cms-form .class-question .link-sim-cms select option:selected").html();   
        console.log(questionId+"****"+question);
        eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question_id\"]=questionId"); 
        eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question\"]=question"); 
    }
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"name\"]=title");
    refrechTreant();
    showUpdate(id);
}

function removeNode(id){
    var list = id.split("-");
    var pos = list.pop();
    var str  = getParentPath(list);
    eval("simple_chart_config.nodeStructure"+str+".children.splice(pos,1)");
    setIdTree([],simple_chart_config.nodeStructure.children);
    refrechTreant();
}

function updateNodeWithQuestion(id,question){
    var title = $(".cms-form .header-cms-form input").val();
    var idsec = $(".simulator-cms .side-bar .body .div-1 .cms-form input.class-id").val();
    var list = idsec.split("-");
    var str  = getParentPath(list);
    var questionId =  id;
    var question =  question;   
    console.log(questionId+"****"+question);
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question_id\"]=questionId"); 
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question\"]=question"); 
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"name\"]=title"); 
    refrechTreant();
    showUpdate(idsec);
}

function modeUpdate(){
    var idQuestion = $(".cms-form .body-cms-form .class-question .link-sim-cms span input").val();
    console.log(idQuestion);
    $(".cms-form .body-cms-form .class-question .link-sim-cms span").html("<select style=\"display:none\"></select>");
    $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-edit").hide();
    $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-plus").show();
    createSelectQuestion(document.getElementsByClassName("cms-form")[0].getElementsByClassName("body-cms-form")[0].getElementsByClassName("class-question")[0].getElementsByTagName("select")[0],idQuestion);
}

function showQuestion(results){
    $(".cms-form .body-cms-form .class-question-q input.id").val(results._source.id);
    $(".cms-form .body-cms-form .class-question-q .link-sim-cms").html("<input type=\"text\" value=\""+results._source.question+"\">");
    for(var j=0;j<$(".cms-form .body-cms-form .class-type-question select option").length;j++){
        if($(".cms-form .body-cms-form .class-type-question select option").eq(j).val()==results._source.response.type){
           $(".cms-form .body-cms-form .class-type-question select option").eq(j).select(); 
        }
    }
    $(".cms-form .body-cms-form .class-responses-q .responses-sim-cms").html("");
    for(var i=0;i<results._source.response.content.length;i++){
        $(".cms-form .body-cms-form .class-responses-q .responses-sim-cms").html($(".cms-form .body-cms-form .class-responses-q .responses-sim-cms").html()+"<div><input type=\"text\" value=\""+results._source.response.content[i]+"\"/></div>")
    }
    $(".simulator-cms .side-bar .body .div-2").show();
}

function getQuestionCms(id){
    $.ajax({
        type: "get",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: "https://cmdbserver.karaz.org:9200/simulator_index_qr/qrs/" + id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
                console.log(result);
                showQuestion(result);
            
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}


function getQuestionDet(){
    var obj = {};
    var id = $(".cms-form .body-cms-form .class-question-q input.id").val();
    var question = $(".cms-form .body-cms-form .class-question-q .link-sim-cms input").val();
    var type = $(".cms-form .body-cms-form .class-type-question select option:selected").val();
    var content = [];
    
    for(var i=0;i<$(".cms-form .body-cms-form .class-responses-q .responses-sim-cms div").length;i++){
        content.push($(".cms-form .body-cms-form .class-responses-q .responses-sim-cms div").eq(i).children("input").val());
    }
    

    obj["id"]=id;
    obj["question"]=question;
    obj["response"]={
        "type":type,
        "content":content
    };

    console.log(obj);
    updateQuestionCms(id,obj);
}

function showAddQuestionForm(){
    $(".cms-form-2 .body-cms-form .class-question-q .link-sim-cms input").val("");
    $(".cms-form-2 .body-cms-form .class-type-question select option").eq(0).select();
    $(".cms-form-2 .body-cms-form .class-responses-q .responses-sim-cms input").val("");
    $(".simulator-cms .side-bar .body .div-2").hide();
    $(".simulator-cms .side-bar .body .div-3").show();
}

function addQuestionForm(){
    var obj = {};
    var question = $(".cms-form-2 .body-cms-form .class-question-q .link-sim-cms input").val();
    var type = $(".cms-form-2 .body-cms-form .class-type-question select option:selected").val();
    var content = [];
    if(type != "input"){
        var listt = $(".cms-form-2 .body-cms-form .class-responses-q .responses-sim-cms input").val();
        for(var i=0;i<listt.split("//").length;i++){
            content.push(listt.split("//")[i]);
        }
    }

    
    obj["question"]=question;
    obj["response"]={
        "type":type,
        "content":content
    };

    if(type=="input" || type=="input-conditional"){
        var placeholder = $(".cms-form-2 .body-cms-form .class-placeholder input.placeholder").val();
        obj["response"]["placeholder"]=placeholder;
    }
    

    console.log(obj);
    addQuestionCms(obj);
    
}

function addQuestionCms(objectUp){
    var obj = {
        "size":4000,"query":{
        "match_all":{}
    }};

    $.ajax({
        type: "post",
        url: "https://cmdbserver.karaz.org:9200/simulator_index_qr/qrs/_search",
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            objectUp["id"]=result.hits.hits.length;   
            updateQuestionCms(result.hits.hits.length,objectUp);
            updateNodeWithQuestion(result.hits.hits.length,objectUp.question);
            
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}


function updateQuestionCms(id,obj){
    $.ajax({
        type: "post",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: "https://cmdbserver.karaz.org:9200/simulator_index_qr/qrs/" + id,
        datatype: "application/json",
        data:JSON.stringify(obj),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
                console.log(result);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    }); 
}

function createSelectQuestion(select,id){
    var obj = {
        "size":4000,"query":{
        "match_all":{}
    }};

    $.ajax({
        type: "post",
        url: "https://cmdbserver.karaz.org:9200/simulator_index_qr/qrs/_search",
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {   
            for(var i=0;i<result.hits.hits.length;i++){
                var option = document.createElement("option");
                option.setAttribute("value",result.hits.hits[i]._source.id);
                option.innerHTML = result.hits.hits[i]._source.question ;
                select.appendChild(option);
            }
            
            for(var j=0;j<select.getElementsByTagName("option").length;j++){
                if(select.getElementsByTagName("option")[j].value==id){
                    console.log(id);
                    select.getElementsByTagName("option")[j].selected = true;
                }
            }
            
            select.style.display = "inline"
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function refrechTreant() {
	scrollTop = $("#tree-simple").scrollTop();
    scrollLeft = $("#tree-simple").scrollLeft();
    my_chart.destroy();
    my_chart = new Treant(simple_chart_config, function () {}, $);
    $("#tree-simple").scrollTop(scrollTop);
    $("#tree-simple").scrollLeft(scrollLeft);
}

function convertTreeComp2SimpleTree(tree){
  var newObj = [];
  var obj = {};
  obj[tree.text.question_id]=[];
  newObj.push(obj);
  var array = [[],[]];
  matrixBulk = []; 
  return conevertTo(tree,array,newObj);
}

var matrixBulk = [];

function conevertTo(tree,array,newObj){
  for(var i=0;i<tree.children.length;i++){

    if(tree.children[i].text.question_id==-1){
        if(tree.children[i].text.status==1){
            var list = tree.children[i].text.id.split("-");
            var obj = simple_chart_config.nodeStructure;    
            var culumns = getMatrixColumns(list,obj);
            console.log(tree.children[i].text.columns_id+"*/*/*/*/*/*/*"+tree.children[i].text.id);
            var matrixColumn = getMatrixColumns(list,obj);
            var reps = [];
            for(var j=0;j<list.length;j++){
                reps.push(Number(list[j])+1);
            }
            var bulk = {
                "id":tree.children[i].text.columns_id,
                "list":matrixColumn,
                "list_rep": reps
            }
            
            matrixBulk.push(bulk);
        }
        continue;
    }
    
    var obj = {};
    var sousTree = tree.children[i];
    obj[tree.children[i].text.question_id]=[];
    str = getTreeHierS(array);
        
    console.log("obj :"+JSON.stringify(newObj));
    eval("newObj"+str+".push(obj)");
    
    array[0].push(tree.children[i].text.question_id);
    array[1].push(i);
    
    if(tree.children[i].text.children!=0){
      newObj = conevertTo(sousTree,array,newObj);
    }
    
    array[0].pop();
    array[1].pop();
  }
  return newObj;
}


function getTreeHierS(array) {
    var str = "[0][0]";
    console.log(array);
    for (var i = 0; i < array[0].length; i++) {
        str += "[" + array[1][i] + "][" + (array[0][i]) + "]";
    }
    console.log(str);
    return str;
}

function uploadTreeToES(){
    var treeObject = {};
    treeObject["treeComp"]= simple_chart_config.nodeStructure;
    treeObject["treeSimp"]= convertTreeComp2SimpleTree(simple_chart_config.nodeStructure);
    
    $(".simulator-cms .container-sim-cms .container-1 .button-upload-es button span").addClass("active");
    $(".simulator-cms .container-sim-cms .container-1 .button-upload-es span.valide").hide();

    $.ajax({
        type: "post",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: "https://cmdbserver.karaz.org:9200/simulator_index_tree/tree/2",
        datatype: "application/json",
        data:JSON.stringify(treeObject),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
            $(".simulator-cms .container-sim-cms .container-1 .button-upload-es button span").removeClass("active");
            $(".simulator-cms .container-sim-cms .container-1 .button-upload-es span.valide").show();
            var bulks = createBulkRequestMatrix();
            sendRequestBulkMatrix(bulks);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    }); 
}

function createBulkRequestMatrix(){
    var str = "";
    for(var i=0;i<matrixBulk.length;i++){
        str += "{ \"update\" : { \"_index\" : \"simulator_index_matrix\", \"_type\":\"columns\" ,\"_id\" : \""+matrixBulk[i].id+"\" } } \n";
        str += "{\"script\" : \"ctx.list = "+JSON.stringify(matrixBulk[i].list).replace(/"/g,"\\\"")+" \"}\n";
        str += "{ \"update\" : { \"_index\" : \"simulator_index_matrix\", \"_type\":\"columns\" ,\"_id\" : \""+matrixBulk[i].id+"\" } } \n";
        str += "{\"script\" : \"ctx.list_rep = \'"+JSON.stringify(matrixBulk[i].list_rep)+"\' \"}\n";
    }
    console.log(str);
    return str;
}

function sendRequestBulkMatrix(bulks){
    $.ajax({
        type: "post",
        //url: "http://localhost:9200/_msearch",
        url: "https://cmdbserver.karaz.org:9200/_bulk",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data:bulks,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {    
            console.log(result);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })
};

function getTreeFromEs(type){
    $.ajax({
        type: "get",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: "https://cmdbserver.karaz.org:9200/simulator_index_tree/tree/2",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
           if(type==0){
                simple_chart_config.nodeStructure = result._source.treeComp;
                startTreant();
           }else if(type==1){
               tree = result._source.treeSimp;
               
                firstEsTreeCall();
           }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getAllCms(type,callback,hiddenList){
    var obj = {"size":1000,"query":{"match_all":{}}};
    if(type==0 || type==2){
        var url = "simulator_index_docs/docs/_search";
    }else if(type==1){
        var url = "simulator_index_steps/steps/_search";
    }
     

    $.ajax({
        type: "post",
        url: "https://cmdbserver.karaz.org:9200/"+url,
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(obj),
        success: function (result) {
            console.log(hiddenList);
            callback(result['hits']['hits'],0,hiddenList);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function createAllCms(response,type,hiddenList){
    if(type==0){
        intilizeVector(response.length);
        var divGlo = document.querySelector(".simulator-cms .side-bar .body1 .docs-in .docs-list");
        divGlo.innerHTML = "";
    }else if(type==1){

    }

    for(var i=0;i<response.length;i++){
        var docItem = document.createElement("div");
        docItem.setAttribute("class","doc-item");
        var i1 = document.createElement("i");
        i1.setAttribute("class","fas fa-file");
        var i2 = document.createElement("i");
        i2.setAttribute("class","fas fa-plus");
        i2.addEventListener("click",function(){
            var index = this.parentNode.querySelector("input.index").value;
            console.log(index);
            addDocItemToDocAdded(index);
        });
        var span = document.createElement("span");
        span.innerHTML = response[i]._source.title;
        var input = document.createElement("input");
        input.setAttribute("type","hidden");
        input.setAttribute("value",response[i]._source.id);
        input.setAttribute("class","id");
        var input2 = document.createElement("input");
        input2.setAttribute("class","index");
        input2.setAttribute("type","hidden");
        input2.setAttribute("value",i);
        docItem.appendChild(i1);
        docItem.appendChild(span);
        docItem.appendChild(input);
        docItem.appendChild(input2);
        docItem.appendChild(i2);
        divGlo.appendChild(docItem);
    }

    arrayOfdivTabs = transformDivTotab();
    hiddenList = getIndexOfBin(completVec(response.length,hiddenList));
    
    for(var j=0;j<hiddenList.length;j++){
        var index = arrayOfdivTabs[1][arrayOfdivTabs[0].indexOf((hiddenList[j]+1).toString())];
        addDocItemToDocAdded(index);
    }

}

function addDocItemToDocAdded(index){
    var title = $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item").eq(index).children("span").html();
    var id = $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item").eq(index).children("input.id").val();
    $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item").eq(index).hide();
    var divGlo = document.querySelector(".simulator-cms .side-bar .body1 .docs-in .docs-added");
    var docItem = document.createElement("div");
    docItem.setAttribute("class","doc-item");
    var i1 = document.createElement("i");
    i1.setAttribute("class","fas fa-file");
    var i2 = document.createElement("i");
    i2.setAttribute("class","fas fa-close");
    i2.addEventListener("click",function(){
        var idTo = this.parentNode.querySelector("input").value;
        removeFromDocAdded(idTo);
        this.parentNode.parentNode.removeChild(this.parentNode);
    });
    var span = document.createElement("span");
    span.innerHTML = title;
    var input = document.createElement("input");
    input.setAttribute("type","hidden");
    input.setAttribute("value",id);
    docItem.appendChild(i1);
    docItem.appendChild(span);
    docItem.appendChild(input);
    docItem.appendChild(i2);
    divGlo.appendChild(docItem);
}

function removeFromDocAdded(id){
    var index = arrayOfdivTabs[1][arrayOfdivTabs[0].indexOf(id)];
    console.log(index);
    $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item").eq(index).show();
}

var arrayOfdivTabs = null;

function transformDivTotab(){
    var array =[[],[]];
    
    var ids = $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item input.id");
    var indexs = $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item input.index");

    for(var i=0;i<ids.length;i++){
        array[0].push(ids.eq(i).val());
        array[1].push(indexs.eq(i).val());
    }

    return array;
}

/* matrice de classement */

var objectJsonMatrixColumns = {};

function nextStepDocsIn(type,id){
    if(type==0){
        console.log(objectJsonMatrixColumns+" "+Object.keys(objectJsonMatrixColumns).length);
        if(Object.keys(objectJsonMatrixColumns).length==0){
            objectJsonMatrixColumns = makeMatrixClass(id);
            getAllCms(0,createAllCms,[]);
        }else{
            console.log(makeMatrixClass(id)["docs_requis"]);
            objectJsonMatrixColumns["docs_requis"]= makeMatrixClass(id)["docs_requis"];
            console.log("else :"+JSON.stringify(objectJsonMatrixColumns));
            getAllCms(0,createAllCms,bin2vec(int2bin(objectJsonMatrixColumns["docs_comp"])));
        }
        $(".simulator-cms .side-bar .body1 .docs-in .docs-list").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-added").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span").removeClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span.docs-comp").addClass("active");
        
    }else if(type==1){
        objectJsonMatrixColumns["docs_comp"] = getListDocsAdded();
        var list = [];
        if(objectJsonMatrixColumns["steps"]!=undefined) list = bin2vec(int2bin(objectJsonMatrixColumns["steps"]));
        getAllCms(1,createAllCms,list);        
        $(".simulator-cms .side-bar .body1 .docs-in .docs-list").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-added").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span").removeClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span.steps").addClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(0).hide();
        $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(1).show();
        
    }else if(type==2){
        objectJsonMatrixColumns["steps"] = getListDocsAdded();
        $(".simulator-cms .side-bar .body1 .docs-in .docs-list").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-added").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span").removeClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span.docs-requis").addClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(1).hide();
        $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(0).show();
        console.log(objectJsonMatrixColumns);
        addMatrixElement(objectJsonMatrixColumns,id);
    }
        
    

}

function makeMatrixClass(id){
    var list = id.split("-");
    var obj = simple_chart_config.nodeStructure;    
    getMatrixColumns(list,obj);
    getListDocsAdded();
    console.log(list);
    var reps = [];
    for(var i=0;i<list.length;i++){
        reps.push(Number(list[i])+1);
    }

    var objectJson = {
        id:"0",
        list:getMatrixColumns(list,obj),
        list_rep:reps,
        docs_requis:getListDocsAdded()
    }

    return objectJson;

}

function beginStepsMatrixColumns(id){
    var list = id.split("-");
    var str = getParentPath(list);
    var objStatus = eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"status\"]");
    var columns_id = eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_id\"]");
    
    if(objStatus!=0){
        readMatrixCms(columns_id);
    }else{
        getAllCms(0,createAllCms,[]);    
    }
    
}

function readMatrixCms(id){
    $.ajax({
        type: "get",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: "https://cmdbserver.karaz.org:9200/simulator_index_matrix/columns/"+id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
            objectJsonMatrixColumns = result._source;
            objectJsonMatrixColumns["id"] = result._id;    
            getAllCms(0,createAllCms,bin2vec(int2bin(objectJsonMatrixColumns.docs_requis)));
        },
        error: function (error) {
            console.log(error.responseText);
        }
    }); 
}

function getIndexOfBin(vectorBin){
  var list = [];
  for(var i=0; i<vectorBin.length;i++){
    if(vectorBin[i]==1){
        list.push(i);
    }
  }  
  return list;
}


function addMatrixElement(objectJson,id){

    var idObject = objectJson.id;
    if(idObject==0){
        var str = "";    
    }else{
        var str = idObject;
    }

    $.ajax({
        type: "post",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: "https://cmdbserver.karaz.org:9200/simulator_index_matrix/columns/" + str,
        datatype: "application/json",
        data:JSON.stringify(objectJson),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success:function (result) {
                console.log(result);
                $(".simulator-cms .side-bar .body1").hide();
                $(".simulator-cms .side-bar .body").show();
                var list = id.split("-");
                var str  = getParentPath(list);
                eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"status\"]=1");
                eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_id\"]=result._id");
                eval("simple_chart_config.nodeStructure"+str+"[\"HTMLclass\"]=\"classe-evo\"");
                showUpdate(id);
                refrechTreant();             
        },
        error: function (error) {
            console.log(error.responseText);
        }
    }); 
}


function getMatrixColumns(list,obj){
    var array = [];
    var str = "";
    array.push(eval("obj"+str+"[\"text\"][\"question_id\"]"))
    if(list[0]!=""){
        for (var i = 0; i < list.length-1; i++) {
            str += "[\"children\"][" + list[i] + "]";
            array.push(eval("obj"+str+"[\"text\"][\"question_id\"]"));
        }
    }
    console.log(array);
    return array;
}

var vector = [];

    
function intilizeVector(size){
    vector = [];
    for(var i=0;i<size;i++){
        vector.push(0);
    }
}

function getListDocsAdded(){
    var listChecked = $(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item");
    for(var i=0;i<listChecked.length;i++){
        var id = listChecked.eq(i).children("input").val();
        vector[id-1] = 1;
    }
    console.log(vector.join('')+"**"+bin2int(vector.join('')));
    return bin2int(vector.join(''));
}

function setIdTree(list,childs){
    var str = getParentPath(list);
    console.log(str);
    for(var i=0;i<childs.length;i++){
      var new_list= [];
      new_list = new_list.concat(list);
      new_list.push(i.toString());
      console.log(list);
      console.log(new_list);
      var newId = new_list.join("-");
      console.log(newId);
      
      eval("simple_chart_config.nodeStructure"+str+"[\"children\"][i][\"text\"][\"id\"]= newId");
      var new_child = eval("simple_chart_config.nodeStructure"+str+"[\"children\"][i][\"children\"]")
      if(new_child.length!=0){         
          setIdTree(new_list,new_child);                     
       }
    }
  }


function getAllDocsClass(type){
    if(type==0){
      var index = "simulator_index_docs/docs/_search";
    }else if(type==1){
      var index = "simulator_index_steps/steps/_search";
    }

  var obj = {"size":1000,"query":{"match_all":{}}};
  $.ajax({
      type: "post",
      url: "https://cmdbserver.karaz.org:9200/"+index,
      //url: "http://localhost:9200/index_classification_cluster/avis/_search",
      datatype: "application/json",
      contentType: "application/json",
      beforeSend: function (xhr) {
           xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
      },
      data: JSON.stringify(obj),
      success: function (result) {
          console.log(result['hits']['hits']);
          getAllDocsClassDiv(result['hits']['hits'],type);
      },
      error: function (error) {
          console.log(error.responseText);
      }
  });
}

function getAllDocsClassDiv(data,type){
  if(type==0){
      var tab = document.getElementsByClassName("simulator-cms")[0].getElementsByClassName("container-sim-cms")[0].getElementsByClassName("container-2")[0].getElementsByClassName("container-docs")[0];
      $(".simulator-cms .container-sim-cms .container-2 .container-docs").html("");
      
  }else if(type==1){
      var tab = document.getElementsByClassName("simulator-cms")[0].getElementsByClassName("container-sim-cms")[0].getElementsByClassName("container-3")[0].getElementsByClassName("container-steps")[0];
      $(".simulator-cms .container-sim-cms .container-3 .container-steps").html("");
  }
  
  
  for(var i=0;i<data.length;i++){
      var divG = document.createElement("div");
      divG.setAttribute("class","item");
      
      var div1 = document.createElement("i");
      div1.setAttribute("class","fas fa-file");
     
      var div2 = document.createElement("div");
      div2.setAttribute("class","note");
      div2.innerHTML = data[i]["_source"]["title"];
      
      var inpH = document.createElement("input");
      inpH.setAttribute("type","hidden");
      inpH.setAttribute("class","id-note");
      inpH.setAttribute("value",data[i]["_id"]);
     
      var div3 = document.createElement("i");
      div3.setAttribute("class","fas fa-bars");
      div3.setAttribute("style","cursor:pointer");
      div3.addEventListener("click",function(){
        if(type==0){
            var id = this.parentElement.getElementsByClassName("id-note")[0].value;
            showDivManager(4);
            getDocClass(type,id);
        }else{
            var id = this.parentElement.getElementsByClassName("id-note")[0].value;
            showDivManager(5);
            getDocClass(type,id);
        }        
    });
     
      var div4 = document.createElement("i");
      div4.setAttribute("class","fas fa-close");
      div4.setAttribute("style","cursor:pointer");
      div4.addEventListener("click",function(){
        var id = this.parentElement.getElementsByClassName("id-note")[0].value;
        this.parentElement.style.display = "none";
        removeDocObject(type,id);
      });
      
      divG.appendChild(div1);
      divG.appendChild(div2);
      divG.appendChild(inpH);
      divG.appendChild(div3);
      divG.appendChild(div4);
      
      tab.appendChild(divG);
  }
  
}

function showDivManager(type){
    if(type==1){
        $(".simulator-cms .side-bar .body .div-1").hide();
        $(".simulator-cms .side-bar .body .div-2").hide();
        $(".simulator-cms .side-bar .body .div-3").hide();
        $(".simulator-cms .side-bar .body .div-4").show();
        $(".simulator-cms .side-bar .body .div-5").hide();
        $(".simulator-cms .side-bar .body .div-6").hide();
        $(".simulator-cms .side-bar .body .div-7").hide();
    }else if(type==2){
        $(".simulator-cms .side-bar .body .div-4").hide();
        $(".simulator-cms .side-bar .body .div-1").show();
        $(".simulator-cms .side-bar .body .div-2").show();
        $(".simulator-cms .side-bar .body .div-5").hide();
        $(".simulator-cms .side-bar .body .div-6").hide();
        $(".simulator-cms .side-bar .body .div-7").hide();
    }else if(type==3){
        $(".simulator-cms .side-bar .body .div-4").hide();
        $(".simulator-cms .side-bar .body .div-1").hide();
        $(".simulator-cms .side-bar .body .div-2").hide();
        $(".simulator-cms .side-bar .body .div-5").show();
        $(".simulator-cms .side-bar .body .div-6").hide();
        $(".simulator-cms .side-bar .body .div-7").hide();
    }else if(type==4){
        $(".simulator-cms .side-bar .body .div-4").hide();
        $(".simulator-cms .side-bar .body .div-1").hide();
        $(".simulator-cms .side-bar .body .div-2").hide();
        $(".simulator-cms .side-bar .body .div-5").hide();
        $(".simulator-cms .side-bar .body .div-6").show();
        $(".simulator-cms .side-bar .body .div-7").hide();
    }else if(type==5){
        $(".simulator-cms .side-bar .body .div-4").hide();
        $(".simulator-cms .side-bar .body .div-1").hide();
        $(".simulator-cms .side-bar .body .div-2").hide();
        $(".simulator-cms .side-bar .body .div-5").hide();       
        $(".simulator-cms .side-bar .body .div-6").hide();
        $(".simulator-cms .side-bar .body .div-7").show();
    }else if(type==6){
        $(".simulator-cms .side-bar .body .div-4").hide();
        $(".simulator-cms .side-bar .body .div-1").hide();
        $(".simulator-cms .side-bar .body .div-2").hide();
        $(".simulator-cms .side-bar .body .div-5").hide();       
        $(".simulator-cms .side-bar .body .div-6").hide();
        $(".simulator-cms .side-bar .body .div-7").hide();
    }
}

function updateDocClass(type,doc){
    if(type==0){
        var index = "simulator_index_docs/docs/";
      }else if(type==1){
        var index = "simulator_index_steps/steps/";
      }


      var id = null;

      if(doc.id == undefined){
          id ="";
      }else{
          id = doc.id;
      }
  
    $.ajax({
        type: "post",
        url: "https://cmdbserver.karaz.org:9200/"+index+id,
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        data: JSON.stringify(doc),
        success: function (result) {
            setTimeout(getAllDocsClass(type),2000);
            console.log(result);
            //getAllDocsClassDiv(result['hits']['hits'],type);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getModifyObject(type){
    var obj = {};
    switch(type){
        case 0: obj.title = $(".simulator-cms .side-bar .body .div-4 .class-question-q input").val();
                obj.type = $(".simulator-cms .side-bar .body .div-4 .class-type-question select option:selected").val();
                break;
        case 1: obj.title = $(".simulator-cms .side-bar .body .div-5 .class-question-q input").val();
                obj.description = $(".simulator-cms .side-bar .body .div-5 .class-desc-q input").val();
                obj.membres = $(".simulator-cms .side-bar .body .div-5 .class-membre-q input").val().split("-");
                break;
        case 2: obj.id = $(".simulator-cms .side-bar .body .div-6 .input-id").val();
                obj.title = $(".simulator-cms .side-bar .body .div-6 .class-question-q input").val();
                obj.type = $(".simulator-cms .side-bar .body .div-6 .class-type-question select option:selected").val();
                break;
        case 3: obj.id = $(".simulator-cms .side-bar .body .div-7 .input-id").val();
                obj.title = $(".simulator-cms .side-bar .body .div-7 .class-question-q input").val();
                obj.description = $(".simulator-cms .side-bar .body .div-7 .class-desc-q input").val();
                obj.membres = $(".simulator-cms .side-bar .body .div-7 .class-membre-q input").val().split("-");
                break;
    }
    return obj;
}

function detailsDocObject(result,type){
    if(type==0){
        $(".simulator-cms .side-bar .body .div-6 .input-id").val(result._id);
        $(".simulator-cms .side-bar .body .div-6 .class-question-q input").val(result._source.title);
        var selected = Number(result._source.type.split("-")[1])-1;
        $(".simulator-cms .side-bar .body .div-6 .class-type-question select option").eq(selected).select();
    }else if(type==1){
        $(".simulator-cms .side-bar .body .div-7 .input-id").val(result._id);
        $(".simulator-cms .side-bar .body .div-7 .class-question-q input").val(result._source.title);
        $(".simulator-cms .side-bar .body .div-7 .class-desc-q input").val(result._source.description);
        $(".simulator-cms .side-bar .body .div-7 .class-membre-q input").val(result._source.membres.join("-"));
    }
}

function getDocClass(type,id){
    if(type==0){
        var index = "simulator_index_docs/docs/";
    }else if(type==1){
        var index = "simulator_index_steps/steps/";
    }

    $.ajax({
        type: "get",
        url: "https://cmdbserver.karaz.org:9200/"+index+id,
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        contentType: "application/json",
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
            console.log(result);
            detailsDocObject(result,type);
            //getAllDocsClassDiv(result['hits']['hits'],type);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function removeDocObject(type,id){
    if(type==0){
        var index = "simulator_index_docs/docs/";
    }else if(type==1){
        var index = "simulator_index_steps/steps/";
    }

    $.ajax({
        type: "delete",
        url: "https://cmdbserver.karaz.org:9200/"+index+id,
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        contentType: "application/json",
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
            console.log(result);
            setTimeout(getAllDocsClass(type),2000);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getMaxDocsClass(type,object){
    var obj = {
        "aggs" : {
            "max_id" : { "max" : { "field" : "id" } }
        }
    };
    if(type==0){
        var index = "simulator_index_docs/docs/_search";
    }else if(type==1){
        var index = "simulator_index_steps/steps/_search";
    }

    $.ajax({
        type: "post",
        url: "https://cmdbserver.karaz.org:9200/"+index,
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        contentType: "application/json",
        datatype:"application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
            console.log(Number(result.aggregations.max_id.value)+1);
            object.id = Number(result.aggregations.max_id.value)+1;
            updateDocClass(type,object);
            //getAllDocsClass(type);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getAllCoumnsMatrixCn4(){
    var bulk = "{ \"index\": \"simulator_index_qr\", \"type\": \"qrs\" }\n{\"size\":4000,\"query\":{\"match_all\":{}}}\n{ \"index\": \"simulator_index_matrix\", \"type\": \"columns\" }\n{\"size\":4000,\"query\":{\"match_all\":{}}}\n";
    $(".simulator-cms .container-sim-cms .container-4 table.tab-matrix").html("");

    $.ajax({
        type: "post",
        //url: "http://localhost:9200/_msearch",
        url: "https://cmdbserver.karaz.org:9200/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data:bulk,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {    
            console.log(result);
            var columns = result.responses[0].hits.hits;
            var columnsMatrix = result.responses[1].hits.hits;
            columns.sort(function(a, b) {
                return Number(a._id) - Number(b._id);
            });

            console.log(columns);
            var arrayQst = [[],[]];
            for(var i=0;i<columns.length;i++){
                var str = "Q"+columns[i]._id;
                console.log(str.toString());
                arrayQst[0].push(str);
                arrayQst[1].push(columns[i]._source.question);
            }
            arrayQst[0].push("Docs Requis");
            arrayQst[1].push("Docs Requis");
            arrayQst[0].push("Docs Comp");
            arrayQst[1].push("Docs Comp");
            arrayQst[0].push("Steps");
            arrayQst[1].push("Steps");
            var size = columnsMatrix.length;
            console.log(size);
            createColumns(0,arrayQst);
            
            for(var i=0;i<size;i++){
                var listQr = columnsMatrix[i]._source.list;
                var listRep = columnsMatrix[i]._source.list_rep;
            
                var arrayReps = [];
                
                for(var j = 0 ;j< columns.length;j++){
                    arrayReps.push(0);
                }
                
                for(var j=0;j<listQr.length;j++){
                    arrayReps[Number(listQr[j])]= listRep[j];
                }

                arrayReps.push(columnsMatrix[i]._source.docs_requis);
                arrayReps.push(columnsMatrix[i]._source.docs_comp);
                arrayReps.push(columnsMatrix[i]._source.steps);

                createColumns(1,arrayReps);
            }

            
        },
        error: function (error){
            console.log(error.responseText);
        }
    })

}

function createColumns(type,arrayQst){
    var divGlobal = document.querySelector(".simulator-cms .container-sim-cms .container-4 table.tab-matrix");
    if(type==0){
        var tr = document.createElement("tr");
        for(var i=0;i<arrayQst[0].length;i++){
            var td = document.createElement("th");
            td.innerHTML = arrayQst[0][i];
            td.setAttribute("title",arrayQst[1][i]);
            tr.appendChild(td);
        }
        
        divGlobal.appendChild(tr);
    }else if(type==1){
        var tr = document.createElement("tr");
        for(var i=0;i<arrayQst.length;i++){
            var td = document.createElement("td");
            td.innerHTML = arrayQst[i];
            tr.appendChild(td);
        }
        divGlobal.appendChild(tr);
    }
}