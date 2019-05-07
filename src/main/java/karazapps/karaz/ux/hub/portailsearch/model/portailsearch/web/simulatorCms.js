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
            question_id: "0",
            question:"Quel est votre question ?",
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
    
    for(var i =0 ; i< obj.children.length;i++){
        $(".cms-form .body-cms-form .class-responses .responses-sim-cms").html($(".cms-form .body-cms-form .class-responses .responses-sim-cms").html()+"<div><span class=\"link-sim-cms\">"+obj.children[i].text.name+"</span></div>");    
    }
        $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-edit").show();
        $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-plus").hide();

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
    console.log(scrollTop);
    console.log(scrollLeft);
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
  return conevertTo(tree,array,newObj);
}


function conevertTo(tree,array,newObj){
  for(var i=0;i<tree.children.length;i++){
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
    $.ajax({
        type: "post",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: "https://cmdbserver.karaz.org:9200/simulator_index_tree/tree/1",
        datatype: "application/json",
        data:JSON.stringify(treeObject),
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

function getTreeFromEs(type){
    $.ajax({
        type: "get",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: "https://cmdbserver.karaz.org:9200/simulator_index_tree/tree/1",
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
               for(key in Object.keys(tree)){
                    getQuestion(key,0);
                }
                intializeVectArray();
           }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}