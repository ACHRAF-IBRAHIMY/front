
var simple_chart_config = {
    chart: {
        container: "#tree-simple",
        rootOrientation:  'NORTH', // NORTH || EAST || WEST || SOUTH
        // levelSeparation: 30,
        subTeeSeparation:   30,
        levelSeparation:    60,
        sizblingSeparation:  60,
        nodeAlign: "BOTTOM",
        node: { HTMLclass: "evolution-tree" },
        connectors: {
            type: "step",
            style: {
                "stroke-width": 2,
                "stroke": "#ccc",
                "stroke-dasharray": "--", //"", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."
                "arrow-end": "classic-wide-long"
            }
        }
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

console.log(simple_chart_config);

var nodeStructures = [];

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
            id: newId,
            columns_idB : {},
            rep_size:0
        },
        children: []
    };
    console.log(str);
    eval("simple_chart_config.nodeStructure" + str + "[\"children\"].push(obj)");
    refrechTreant();
    console.log(newId);
    showUpdate(newId.toString());
}

function reduitNode(id,type){
    var list = id.split("-");
    var str = getParentPath(list);
    var subTree = eval("simple_chart_config.nodeStructure" + str + "[\"children\"]"); 
    var subTreeStr = JSON.parse(JSON.stringify(subTree));

    var obj = {
        "node_id":id,
        "tree":subTreeStr
    };

    console.log("obj :"+JSON.stringify(obj)+" str :"+str);
    nodeStructures.push(obj);

    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"red\"]=1");
    eval("simple_chart_config.nodeStructure"+str+"[\"HTMLclass\"]+=\" classe-red\"");
    eval("simple_chart_config.nodeStructure"+str+"[\"children\"]=[]");
    if(type==0){
        refrechTreant();
    }
}

function showSubTree(id){
    var list = id.split("-");
    var str = getParentPath(list);
    var obj = findSubTreeById(id,0);
    
    nodeStructures.splice(obj.index,1);
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"red\"]=0");
    var rpl = eval("simple_chart_config.nodeStructure"+str+"[\"HTMLclass\"].replace(\/ classe-red\/g,\"\").trim()");
    eval("simple_chart_config.nodeStructure"+str+"[\"HTMLclass\"]=rpl");
    eval("simple_chart_config.nodeStructure" + str + "[\"children\"]=obj.subTree.tree");
    refrechTreant();
};

var copy = null;

function moveLeftNode(id){
    var list = id.split("-");
    var node = list[list.length-1];
    list.pop();
    var str = getParentPath(list);
    console.log(node);
    console.log(Number(node)-1);
    console.log("str");
    var nbrChild = eval("simple_chart_config.nodeStructure" + str + "[\"children\"].length");
    console.log(nbrChild);
    if(node != 0 && nbrChild > 1 && id != ""){
        console.log(list);
        if(list.length==0){
            var id2 = (Number(node)-1).toString();
        }else{
            var id2 = list.join("-")+"-"+(Number(node)-1); 
        }
        var stockNode = getContentSubTree(id); 
        var stockNode2 = getContentSubTree(id2);    
        var str1 = getParentPath(id.split("-"));
        var str2 = getParentPath(id2.split("-"));
        eval("simple_chart_config.nodeStructure" + str1 + "=stockNode2");
        eval("simple_chart_config.nodeStructure" + str2 + "=stockNode");
        setIdTree([],simple_chart_config.nodeStructure.children);
        reduitAll();
        refrechTreant();
    }else if( node ==0 && nbrChild > 1 && id != ""){
        if(list.length==0){
            var id2 = (Number(nbrChild)-1).toString();
        }else{
            var id2 = list.join("-")+"-"+(Number(nbrChild)-1); 
        }
        var stockNode = getContentSubTree(id); 
        var stockNode2 = getContentSubTree(id2);    
        var str1 = getParentPath(id.split("-"));
        var str2 = getParentPath(id2.split("-"));
        eval("simple_chart_config.nodeStructure" + str1 + "=stockNode2");
        eval("simple_chart_config.nodeStructure" + str2 + "=stockNode");
        setIdTree([],simple_chart_config.nodeStructure.children);
        reduitAll();
        refrechTreant();
    }
     
}

function moveRightNode(id){
    
    var list = id.split("-");
    var node = list[list.length-1];
    list.pop();
    var str = getParentPath(list);
    console.log(str);
    var nbrChild = eval("simple_chart_config.nodeStructure" + str + "[\"children\"].length");
    console.log(nbrChild);
    if(node != nbrChild-1 && nbrChild > 1 && id != ""){
        console.log(list);
        if(list.length==0){
            var id2 = (Number(node)+1).toString();
        }else{
            var id2 = list.join("-")+"-"+(Number(node)+1); 
        }
        
        console.log("*****replace "+id +" By"+id2);
        var stockNode = getContentSubTree(id); 
        var stockNode2 = getContentSubTree(id2);    
        var str1 = getParentPath(id.split("-"));
        var str2 = getParentPath(id2.split("-"));
        eval("simple_chart_config.nodeStructure" + str1 + "=stockNode2");
        eval("simple_chart_config.nodeStructure" + str2 + "=stockNode");
        setIdTree([],simple_chart_config.nodeStructure.children);
        reduitAll();
        refrechTreant();
    }else if( node ==nbrChild-1 && nbrChild > 1 && id != ""){
        if(list.length==0){
            var id2 = "0"; 
        }else{
            var id2 = list.join("-")+"-0"; 
        }
        var stockNode = getContentSubTree(id); 
        var stockNode2 = getContentSubTree(id2);    
        var str1 = getParentPath(id.split("-"));
        var str2 = getParentPath(id2.split("-"));
        eval("simple_chart_config.nodeStructure" + str1 + "=stockNode2");
        eval("simple_chart_config.nodeStructure" + str2 + "=stockNode");
        setIdTree([],simple_chart_config.nodeStructure.children);
        reduitAll();
        refrechTreant();
    }
}

function moveUpNode(id){
    var list = id.split("-");
    var node = list[list.length-1];
    list.pop();
    var strChild = getParentPath(list);
    list.pop();
    var str = getParentPath(list);
    //var nbrChild = eval("simple_chart_config.nodeStructure" + str + "[\"children\"].length");
    console.log(id);
    if( id != "" && id.split("-").length > 1 ){
        console.log(list);
        console.log(id);
        var stockNode = getContentSubTree(id); 
        var nb = id.split("-")[id.split("-").length-1];
        eval("simple_chart_config.nodeStructure" + str + "[\"children\"].push(stockNode)");
        eval("simple_chart_config.nodeStructure" + strChild + "[\"children\"].splice(nb,1)");
        setIdTree([],simple_chart_config.nodeStructure.children);
        reduitAll();
        refrechTreant();
    }
}


function moveDownNode(){
    alert("Not working yet !!");
}


function copySubTree(id){
    var list = id.split("-");
    var str = getParentPath(list);

    var copyTree = getContentSubTree(id);
    
    copy = JSON.parse(JSON.stringify(copyTree));

    console.log("copied1 :"+ JSON.stringify(copy));
    eval("simple_chart_config.nodeStructure"+str+"[\"HTMLclass\"]+=\" copied\""); 
    reduitAll();   
    refrechTreant();
}



function pasteSubTree(id){
    var list = id.split("-");
    var str = getParentPath(list);
    showCopy();
    var list2 = copy.text.id.toString().split("-");
    var str2 = getParentPath(list2);
    console.log("list : "+str2);
    eval("simple_chart_config.nodeStructure"+str+"=copy");    
    var lastId = copy.text.id.toString();
    setIdTree([],simple_chart_config.nodeStructure.children);
    var rpl = eval("simple_chart_config.nodeStructure"+str2+"[\"HTMLclass\"].replace(\/ copied\/g,\"\").trim()");
    eval("simple_chart_config.nodeStructure"+str2+"[\"HTMLclass\"]=rpl");
    console.log("lastId :"+lastId);
    copy = null;
    removeRed();
    reduitAll();   
    refrechTreant();
}

function showPaste(){
    var selector = document.querySelectorAll(".evolution-tree .copy");

    for(var i=0;i<selector.length;i++){
        selector[i].style.display = "none";
    }

    var selector2 = document.querySelectorAll(".evolution-tree .paste");
    
    for(var i=0;i<selector2.length;i++){
        selector2[i].style.display = "inline-block";
    }
}

function showCopy(){
    var selector = document.querySelectorAll(".evolution-tree .paste");

    for(var i=0;i<selector.length;i++){
        selector[i].style.display = "none";
    }

    var selector2 = document.querySelectorAll(".evolution-tree .copy");
    
    for(var i=0;i<selector2.length;i++){
        selector2[i].style.display = "inline-block";
    }
}

function removeRed(){
    var tempNodeStructures = simple_chart_config.nodeStructure; 
    
    nodeStructures.sort(function(a, b) {
        return a.node_id.length - b.node_id.length;
    });

    for(var i=0;i<nodeStructures.length;i++){
        var list = nodeStructures[i].node_id.split("-");
        var str = getParentPath(list);
        var obj = findSubTreeById(nodeStructures[i].node_id,0);
        try{
            eval("tempNodeStructures" + str + "[\"children\"]=obj.subTree.tree");
        }
        catch(e){
            continue;
        }
        
    }
    
    return tempNodeStructures;       
}

function reduitAll(){
    nodeStructures = [];
    var nodeStructureTemp = getRedNodes(simple_chart_config.nodeStructure,[],[]);
    nodeStructureTemp.sort(function(a, b) {
        return b.length - a.length;
    });
    
    console.log("-----------"+nodeStructureTemp);

    for(var i=0;i<nodeStructureTemp.length;i++){
        reduitNode(nodeStructureTemp[i],1);
    };

};

function findSubTreeById(id,type){
    if(type==0){
        for(var i=0;i<nodeStructures.length;i++){
            if(nodeStructures[i].node_id == id){
                return { "subTree":nodeStructures[i],"index":i};
            }
        }
    }else{
        var arr = [];
        for(var i=0;i<nodeStructures.length;i++){
            if(nodeStructures[i].node_id.startsWith(id)){
                var array = [];
                array = JSON.stringify(nodeStructures[i]);
                var ar = { "nodeStructure":JSON.parse(array)};
                arr.push(ar);
            }
        }
        return arr;
    }
}



function getParentPath(list) {
    var str = "";
    console.log("list***"+list);
    if(list.length==0)return str;

    if(list[0]!=""){
        console.log("list***"+list[0]);
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


var removeMtrixCLass = false;

function showUpdate(id){
    $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").show();
    $(".cms-form .body-cms-form .class-question .link-sim-cms span.update").hide();
            
    $(".simulator-cms .side-bar .div-1").show();
    $(".simulator-cms .side-bar .div-2").hide();
    removeMtrixCLass = false;
    var list = id.split("-");
    var str  = getParentPath(list);
    var obj  = eval("simple_chart_config.nodeStructure"+str);
    console.log(obj);
    $(".cms-form .header-cms-form span").html(obj.text.name);
    $(".cms-form  input.class-id").val(obj.text.id);
    $(".cms-form .body-cms-form .class-title span").eq(1).children("input").val(obj.text.name);
    $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").html(obj.text.question);    
    $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").attr("title",obj.text.question_id);

    if(obj.text.type_aff=="NR" || obj.text.type_aff==undefined){
        $(".cms-form .body-cms-form .class-type-aff select option").eq(0).prop("selected",true)
    }else if(obj.text.type_aff=="SQH"){
        $(".cms-form .body-cms-form .class-type-aff select option").eq(1).prop("selected",true)
    }else if(obj.text.type_aff=="SQS"){
        $(".cms-form .body-cms-form .class-type-aff select option").eq(2).prop("selected",true)
    }
    
    $(".cms-form .body-cms-form .class-responses .responses-sim-cms").html("");
    
    if(obj.text.status == 0){
        $(".cms-form .body-cms-form .class-oid span.classee").html("Non Classé");
    }else{
        $(".cms-form .body-cms-form .class-oid span.classee").html("Classé");
        var icon = document.createElement("i");
        icon.setAttribute("class","fa fa-close");
        icon.setAttribute("style","cursor: pointer;color: red;margin: auto 5px;");
        icon.setAttribute("title","Annuler la classification");
        icon.addEventListener("click",function(){
            removeMtrixCLass = true;
            $(".cms-form .body-cms-form .class-oid span.classee").html("Non Classé");
        });
        $(".cms-form .body-cms-form .class-oid span.classee").append(icon);
    }

    
    for(var i =0 ; i< obj.children.length;i++){
        var doc = document.createElement("div");
        var span = document.createElement("span");
        var input = document.createElement("input");
        input.setAttribute("class","index");
        input.setAttribute("value",i);
        input.setAttribute("type","hidden");
        span.setAttribute("class","link-sim-cms");
        span.innerHTML = obj.children[i].text.name;
        span.addEventListener("click",function(){
            if(id==""){
                var newId = this.parentNode.getElementsByClassName("index")[0].value;
            }else{
                var newId = id+"-"+this.parentNode.getElementsByClassName("index")[0].value;
            }
            showUpdate(newId);
        });
        doc.appendChild(input);
        doc.appendChild(span);
        
        $(".cms-form .body-cms-form .class-responses .responses-sim-cms").append(doc);
       // $(".cms-form .body-cms-form .class-responses .responses-sim-cms").html($(".cms-form .body-cms-form .class-responses .responses-sim-cms").html()+"<div><span class=\"link-sim-cms\">"+obj.children[i].text.name+"</span></div>");    
    }
        $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-edit").show();
        $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-plus").hide();
        $(".simulator-cms .side-bar .body").show();
        $(".simulator-cms .side-bar .body1").hide();
       
}

var qstList = [];


function loadQuestionsFromEs(){
    var obj = {
        "size":4000,"query":{
            "match_all": {}
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH+"/simulator_index_qr/qrs/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        data: JSON.stringify(obj),
        success: function (result) {
            qstList = [];
            for(var i=0;i<result.hits.hits.length;i++){
                var qstObj = {
                    "id":result.hits.hits[i]._id,
                    "question":result.hits.hits[i]._source.question,
                    "rep":result.hits.hits[i]._source.response.content,
                    "type_rep":result.hits.hits[i]._source.response.type
                };
                qstList.push(qstObj);
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function indexOfQst(id,list){
    for(var i =0 ; i<list.length;i++){
        if(id.toString()==list[i].id.toString()){
            return i;
        }
    }
    return -1;
}


function updateNode(id){

    var title = $(".cms-form .body-cms-form .class-title input").val();
    var list = id.split("-");
    var str  = getParentPath(list);

    var questionId =  $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").attr("title");
    var question =  $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").html();
    var repSize = qstList[indexOfQst(questionId,qstList)].rep.length;
    var typeAff = $(".cms-form .body-cms-form .class-type-aff select option:selected").val();

    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question_id\"]=questionId"); 
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question\"]=question"); 
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"rep_size\"]=repSize");
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"type_aff\"]=typeAff");
    
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"name\"]=title");
    
    if(removeMtrixCLass == true){
        var clms = eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_idB\"]");


        for(var i = 0; i < Object.keys(clms).length;i++){
            deleted.push(clms[Object.keys(clms)[i]]);
        }

        eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"status\"]=0");
        eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_idB\"]={}");
        eval("delete simple_chart_config.nodeStructure"+str+"[\"HTMLclass\"]");
    }

    refrechTreant();
    showUpdate(id);
}

function removeNode(id){
    var list = id.split("-");
    var pos = list.pop();
    var str  = getParentPath(list);
    simple_chart_config.nodeStructure = removeRed();
    console.log(getParentPath(id.split("-")));
    var treeObj = eval("simple_chart_config.nodeStructure"+getParentPath(id.split("-")));
    getIdDeletedColumns(treeObj);
    if(id!=""){
        eval("simple_chart_config.nodeStructure"+str+".children.splice(pos,1)");
    }else{
        eval("simple_chart_config.nodeStructure.children=[]");
    }
    setIdTree([],simple_chart_config.nodeStructure.children);
    reduitAll();
    refrechTreant();
}

function updateNodeWithQuestion(id,question){
    var title = $(".cms-form .header-cms-form span").html();
    var idsec = $(".simulator-cms .side-bar .body .div-1 .cms-form input.class-id").val();
    var list = idsec.split("-");
    var str  = getParentPath(list);
    var questionId =  id;
    var question =  question;   
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question_id\"]=questionId"); 
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question\"]=question"); 
    eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"name\"]=title"); 
    refrechTreant();
    showUpdate(idsec);
}


function modeUpdate(){
    var idQuestion = $(".cms-form .body-cms-form .class-question .link-sim-cms span input").val();
    $(".cms-form .body-cms-form .class-question .link-sim-cms span.update").html("<input style=\"text-align: left;border: none;height: 28px;width: 85%;outline: none;\" placeHolder=\"Question\"/><i class=\"fas fa-eye\"></i>");
    $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-edit").hide();
    $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").hide();
    $(".cms-form .body-cms-form .class-question .link-sim-cms i.fa-plus").show();
    $(".cms-form .body-cms-form .class-question .link-sim-cms span.update").show();
    //createSelectQuestion(document.getElementsByClassName("cms-form")[0].getElementsByClassName("body-cms-form")[0].getElementsByClassName("class-question")[0].getElementsByTagName("input")[0],idQuestion);
    autoCompleteSim(document.getElementsByClassName("cms-form")[0].getElementsByClassName("body-cms-form")[0].getElementsByClassName("class-question")[0].getElementsByClassName("update")[0].getElementsByTagName("input")[0],"simulator_index_qr","question");
    document.querySelector(".cms-form .body-cms-form .class-question .link-sim-cms span.update .fa-eye").addEventListener("click",function(){
        getAllCmsQuestion(document.getElementsByClassName("cms-form")[0].getElementsByClassName("body-cms-form")[0].getElementsByClassName("class-question")[0].getElementsByClassName("update")[0].getElementsByTagName("input")[0],"simulator_index_qr");
    });
}

function showQuestion(results){
    $(".cms-form .body-cms-form .class-question-q input.id").val(results._source.id);
    $(".cms-form .body-cms-form .class-question-q .link-sim-cms").html("<textarea>"+results._source.question+"</textarea>");
    
    var type=results._source.response.type;

    for(var j=0;j<$(".cms-form .body-cms-form .class-type-question select option").length;j++){
        if($(".cms-form .body-cms-form .class-type-question select option").eq(j).val()==results._source.response.type){
            $(".cms-form .body-cms-form .class-type-question select option").eq(j).prop("selected",true); 
        }
    }

    if(type=="input"){
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-responses-q").hide();
    }else{
        $(".simulator-cms .side-bar .body .div-2 .cms-form  .class-responses-q").show();                
    }

    if(results._source.response.help != undefined){
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-help-q input").val(results._source.response.help);
    }else{
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-help-q input").val("");
    }

    if(type=="input" || type=="input-conditional"){
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q input").val(results._source.response.placeholder);
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q").show();
    }else{
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q input").val("");
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q").hide(); 
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-location-q").show();
               
    }

    if(type=="location"){
        $(".simulator-cms .side-bar .body .div-2 .cms-form  .class-responses-q").hide();                
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q").hide();
        for(var j=0;j<$(".simulator-cms .side-bar .body .div-2 .cms-form .class-location-q select option").length;j++){
            if($(".simulator-cms .side-bar .body .div-2 .cms-form .class-location-q select option").eq(j).val()==results._source.response.content){
                $(".simulator-cms .side-bar .body .div-2 .cms-form .class-location-q select option").eq(j).prop("selected",true); 
            }
        }                
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q input").val("");
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-location-q").show();
        $(".cms-form .body-cms-form .class-responses-q .responses-sim-cms").html("<div><textarea style=\"width: 98%;border: 1px solid #eee;\"></textarea></div>");

    }else{
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-location-q").hide();
        $(".cms-form .body-cms-form .class-responses-q .responses-sim-cms").html("");
        let str = results._source.response.content.join("//");
        $(".cms-form .body-cms-form .class-responses-q .responses-sim-cms").html("<div><textarea style=\"width: 98%;border: 1px solid #eee;\">"+str+"</textarea></div>");
    }

    if(type=="activite"){
        $(".simulator-cms .side-bar .body .div-2 .cms-form  .class-responses-q").hide();                
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q").hide();                
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q input").val("");
        $(".simulator-cms .side-bar .body .div-2 .cms-form .class-location-q").hide();
        $(".cms-form .body-cms-form .class-responses-q .responses-sim-cms").html("<div><textarea style=\"width: 98%;border: 1px solid #eee;\"></textarea></div>");
    }

    

    $(".simulator-cms .side-bar .body .div-2").show();
    $(".simulator-cms .side-bar .body .div-3").hide();
}

function getQuestionCms(id){
    $.ajax({
        type: "get",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: URL_SEARCH+"/simulator_index_qr/qrs/" + id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
                showQuestion(result);            
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function removeQuestion(){
    var id = $(".cms-form .body-cms-form .class-question-q input.id").val();
    restRemoveQuestion(id);
}

function restRemoveQuestion(id){
    $.ajax({
        type: "delete",
        url: URL_SEARCH+"/simulator_index_qr/qrs/"+id,
        contentType: "application/json",
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
            console.log(result);
            loadQuestionsFromEs();
            var title = $(".cms-form .header-cms-form span").html();
            var idsec = $(".simulator-cms .side-bar .body .div-1 .cms-form input.class-id").val();
            var list = idsec.split("-");
            var str  = getParentPath(list);
            var questionId =  "-1";
            var question =  "Quel est votre question ?";   
            console.log(questionId+"****"+question);
            eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question_id\"]=questionId"); 
            eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"question\"]=question"); 
            eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"name\"]=title"); 
            refrechTreant();
            showUpdate(idsec);       
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getQuestionDet(){
    var obj = {};
    var id = $(".cms-form .body-cms-form .class-question-q input.id").val();
    var question = $(".cms-form .body-cms-form .class-question-q .link-sim-cms textarea").val();
    var type = $(".cms-form .body-cms-form .class-type-question select option:selected").val();
    var help = $(".simulator-cms .side-bar .body .div-2 .cms-form .class-help-q input").val();
    
    
    var content = [];
    
    content=$(".cms-form .body-cms-form .class-responses-q .responses-sim-cms div textarea").val().split("//");
    
    if(type=="location"){
        content = $(".simulator-cms .side-bar .body .div-2 .cms-form .class-location-q select option:selected").val(); 
     }

     if(type=="activite"){
        content = ""
     }

    obj["id"]=id;
    obj["question"]=question;
    obj["response"]={
        "type":type,
        "content":content,
        "help":help
    };

    if(type=="input" || type=="input-conditional"){
        var placeholder = $(".simulator-cms .side-bar .body .div-2 .cms-form .class-placeholder-q input").val();
        obj["response"]["placeholder"]=placeholder;
    }
    
    

    console.log(obj);
    updateQuestionCms(id,obj);
}


function showAddQuestionForm(){
    $(".cms-form-2 .body-cms-form .class-question-q .link-sim-cms textarea").val("");
    $(".cms-form-2 .body-cms-form .class-type-question select option").eq(0).prop("selected",true);
    $(".cms-form-2 .body-cms-form .class-responses-q .responses-sim-cms input").val("");
    $(".cms-form-2 .body-cms-form .class-placeholder-q .responses-sim-cms input").val("");
    
    $(".simulator-cms .side-bar .body .cms-form-2 .class-help-q input").val("");
    
    $(".simulator-cms .side-bar .body .div-3 .cms-form-2  .class-responses-q").show();                
    $(".simulator-cms .side-bar .body .div-3 .cms-form-2 .class-placeholder-q").hide();                
    $(".simulator-cms .side-bar .body .div-3 .cms-form-2 .class-location-q").hide();
    $(".simulator-cms .side-bar .body .div-3 .cms-form-2 .class-location-q select option").eq(0).prop("selected",true);
    $(".simulator-cms .side-bar .body .div-2").hide();
    $(".simulator-cms .side-bar .body .div-3").show();
}

function addQuestionForm(){
    var obj = {};
    var question = $(".cms-form-2 .body-cms-form .class-question-q .link-sim-cms textarea").val();
    var type = $(".cms-form-2 .body-cms-form .class-type-question select option:selected").val();
    var help = $(".simulator-cms .side-bar .body .cms-form-2 .class-help-q input").val();
    var content = [];
    
    if(type != "input" && type != "location" ){
        var listt = $(".cms-form-2 .body-cms-form .class-responses-q .responses-sim-cms input").val();
        for(var i=0;i<listt.split("//").length;i++){
            content.push(listt.split("//")[i]);
        }
    }

    if(type=="location"){
        content = $(".simulator-cms .side-bar .body .div-3 .cms-form-2 .class-location-q select option:selected").val();
    }

    if(type=="activite"){
        content = "";
    }
    
    obj["question"]=question;
    obj["response"]={
        "type":type,
        "content":content,
        "help":help
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
        url: URL_SEARCH+"/simulator_index_qr/qrs/_search",
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        data: JSON.stringify(obj),
        success: function (result) {
            objectUp["id"]=result.hits.hits.length;   
            updateQuestionCms(result.hits.hits.length,objectUp);
            $(".simulator-cms .side-bar .body .div-3").hide();

            
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}


function updateQuestionCms(id,obj){
    updateNodeWithQuestion(id,obj.question);
    $.ajax({
        type: "post",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: URL_SEARCH+"/simulator_index_qr/qrs/" + id,
        datatype: "application/json",
        data:JSON.stringify(obj),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
        },
        success: function (result) {
            console.log(result);
            loadQuestionsFromEs();
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
        url: URL_SEARCH+"/simulator_index_qr/qrs/_search",
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
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
    if(copy!=null){
        showPaste();
    }else{
        
    }
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

        if(tree.children[i].text.status==1){
            var list = tree.children[i].text.id.split("-");
            var obj = simple_chart_config.nodeStructure;    
            var culumns = getMatrixColumns(list,obj);
            var matrixColumn = getMatrixColumns(list,obj);
            var reps = [];
            for(var j=0;j<list.length;j++){
                reps.push(Number(list[j])+1);
            }

            var column = Object.keys(tree.children[i].text.columns_idB);
            console.log("======"+column);
            for(var j = 0;j<column.length;j++){
                var bulk = {
                    "id":tree.children[i].text.columns_idB[column[j]],
                    "list":matrixColumn,
                    "list_rep": parcourirTreeReps(tree.children[i].text.id,Number(column[j]))
                }
            }
            
            
            matrixBulk.push(bulk);
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

function getRedNodes(tree,array,newObj){
  
    for(var i=0;i<tree.children.length;i++){
   
      console.log(tree.children[i].text);
      if(tree.children[i].text.red==1){
         newObj.push(tree.children[i].text.id);
      }
      
      var sousTree = tree.children[i];
              
      array.push(i);
      
      if(tree.children[i].text.children!=0){
        newObj = getRedNodes(sousTree,array,newObj);
      }
      
      array.pop();
    }
    
    
    return newObj;
}

function getContentSubTree(id){
    var list = id.split("-");
    var all = removeRed();
    var str = getParentPath(list);
    return eval("all"+str);
}


function parcourirTreeReps(id,add){
    var list = id.split("-");
    if(add!=null)list.push(add);
    var newList = [];
    var sample_tree = simple_chart_config.nodeStructure;
    console.log(sample_tree.text.rep_size)
    var repSize = sample_tree.text.rep_size;
    for(var i=0;i<list.length-1;i++){
      console.log(sample_tree);
      if(sample_tree.children.length==1 && repSize!=1){
        newList.push(-1);
      }else{
        newList.push(Number(list[i])+1);
      }
      console.log(list[i]);
      sample_tree = sample_tree.children[list[i]];
      repSize = sample_tree.text.rep_size;
      
      if(i==list.length-2){
        newList.push(Number(list[i+1])+1);
      }

      console.log(newList);
    }
    return newList;
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
    simple_chart_config.nodeStructure = removeRed();
    treeObject["treeComp"]= simple_chart_config.nodeStructure;
    treeObject["treeSimp"]= convertTreeComp2SimpleTree(simple_chart_config.nodeStructure);
    
    $(".simulator-cms .container-sim-cms .container-1 .button-upload-es button span").addClass("active");
    $(".simulator-cms .container-sim-cms .container-1 .button-upload-es span.valide").hide();

    $.ajax({
        type: "post",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: URL_SEARCH+"/simulator_index_tree/tree/2",
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
            var bulks2 = deleteBulkRequest(deleted);
            sendRequestBulkMatrix(bulks);
            sendRequestBulkMatrix(bulks2);
            deleted = [];
            reduitAll();
        },
        error: function (error) {
            console.log(error.responseText);
        }
    }); 
}

function uploadTreeToESHS(){
    var treeObject = {};
    simple_chart_config.nodeStructure = removeRed();
    treeObject["treeComp"]= simple_chart_config.nodeStructure;
    treeObject["treeSimp"]= convertTreeComp2SimpleTree(simple_chart_config.nodeStructure);
    var dateD = new Date();
    var date = dateD.getFullYear().toString()+(dateD.getMonth()+1).toString()+dateD.getDate().toString()+dateD.getHours().toString()+dateD.getMinutes().toString()+dateD.getSeconds().toString()

    $.ajax({
        type: "post",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: URL_SEARCH+"/simulator_index_tree_hs/tree/"+date,
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


function createBulkRequestMatrix(){
    var str = "";
    for(var i=0;i<matrixBulk.length;i++){
        str += "{ \"update\" : { \"_index\" : \"simulator_index_matrix\", \"_type\":\"columns\" ,\"_id\" : \""+matrixBulk[i].id+"\" } } \n";
        str += "{\"script\" : \"ctx._source.list = "+JSON.stringify(matrixBulk[i].list).replace(/"/g,"\\\"")+" \"}\n";
        str += "{ \"update\" : { \"_index\" : \"simulator_index_matrix\", \"_type\":\"columns\" ,\"_id\" : \""+matrixBulk[i].id+"\" } } \n";
        str += "{\"script\" : \"ctx._source.list_rep = "+JSON.stringify(matrixBulk[i].list_rep)+" \"}\n";
    }
    console.log(str);
    return str;
}

function sendRequestBulkMatrix(bulks){
    $.ajax({
        type: "post",
        //url: "http://localhost:9200/_msearch",
        url: URL_SEARCH+"/_bulk",
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
    
	if(type==0){
        $(".container-sim-cms #tree-simple").html("<div class=\"gif-load-simulator-cms\"><img src=\"img/load-text.gif\" /></div>");
    }
    nodeStructures=[];

    $.ajax({
        type: "get",
        url: URL_SEARCH+"/simulator_index_tree/tree/2",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
           if(type==0){
                console.log(simple_chart_config);
                simple_chart_config.nodeStructure = result._source.treeComp;
                reduitAll();
                startTreant();
                loadQuestionsFromEs();
                deleted = [];
           }else if(type==1){
                tree = result._source.treeSimp;
                tree2 = result._source.treeComp;
                firstEsTreeCall();
                //restGetAllLocalite(0,100,0);
           }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getAllCms(type,callback,hiddenList,sortList){
    var obj = {"size":1000,"query":{"match_all":{}}};
    if(type==0 || type==2){
        var url = "simulator_index_docs/docs/_search";
    }else if(type==1){
        var url = "simulator_index_steps/steps/_search";
    }

    $.ajax({
        type: "post",
        url: URL_SEARCH+"/"+url,
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", AUTH);
        },
        data: JSON.stringify(obj),
        success: function (result) {
            console.log(hiddenList);
            callback(result['hits']['hits'],0,hiddenList,sortList);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function createAllCms(response,type,hiddenList,sortList){
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
    hiddenList = getIndexOfBin(completVec(42,hiddenList));
    console.log(JSON.stringify(hiddenList));

    if(sortList != undefined){
        for(var j=0;j<sortList.length;j++){
            var index = arrayOfdivTabs[1][arrayOfdivTabs[0].indexOf((sortList[j]).toString())];
            addDocItemToDocAdded(index);
        }
    }else{
        for(var j=0;j<hiddenList.length;j++){
            var index = arrayOfdivTabs[1][arrayOfdivTabs[0].indexOf((hiddenList[j]+1).toString())];
            console.log(index);
            addDocItemToDocAdded(index);
        }
    }
    
}

function addDocItemToDocAdded(index){
    var title = $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item").eq(index).children("span").html();
    var id = $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item").eq(index).children("input.id").val();
    $(".simulator-cms .side-bar .body1 .docs-in .docs-list .doc-item").eq(index).hide();
    var divGlo = document.querySelector(".simulator-cms .side-bar .body1 .docs-in .docs-added");
    var docItem = document.createElement("div");
    docItem.setAttribute("class","doc-item");
    docItem.setAttribute("style","grid-template-columns: 8% 68% 8% 8% 8%;");
    var i1 = document.createElement("i");
    i1.setAttribute("class","fas fa-file");
    var i11 = document.createElement("i");
    var i12 = document.createElement("i");
    i11.setAttribute("class","fas fa-caret-up");
    i12.setAttribute("class","fas fa-caret-down");
    i11.addEventListener("click",function(){
        var index = Array.from(document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")).indexOf(this.parentNode);
        if(index != 0){
            var indexRep = this.parentNode.querySelector("input").value;
            var textRep = this.parentNode.querySelector("span").innerHTML;
            this.parentNode.querySelector("input").value = document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")[index-1].querySelector("input").value;
            this.parentNode.querySelector("span").innerHTML = document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")[index-1].querySelector("span").innerHTML;
            document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")[index-1].querySelector("input").value = indexRep;
            document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")[index-1].querySelector("span").innerHTML = textRep;
        }
    });
    i12.addEventListener("click",function(){
        var index = Array.from(document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")).indexOf(this.parentNode);
        if(index < document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item").length-1){
            var indexRep = this.parentNode.querySelector("input").value;
            var textRep = this.parentNode.querySelector("span").innerHTML;
            this.parentNode.querySelector("input").value = document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")[index+1].querySelector("input").value;
            this.parentNode.querySelector("span").innerHTML = document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")[index+1].querySelector("span").innerHTML;
            document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")[index+1].querySelector("input").value = indexRep;
            document.querySelectorAll(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item")[index+1].querySelector("span").innerHTML = textRep;
        }
    });
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
    docItem.appendChild(i11);
    docItem.appendChild(i12);
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

function afterChildClass(idChild){
    var id = $(".simulator-cms .side-bar .body .div-1 .cms-form input.class-id").val();                
    objectJsonMatrixColumns = {};
    beginStepsMatrixColumns(id,idChild);
    $(".simulator-cms .side-bar .body1 .docs-in").attr("ident",idChild);
    $(".simulator-cms .side-bar .body1 .docs-in .docs-list").html("");
    $(".simulator-cms .side-bar .body1 .docs-in .docs-added").html("");
    $(".simulator-cms .side-bar .body1 .docs-in .header-doc span").removeClass("active");
    $(".simulator-cms .side-bar .body1 .docs-in .header-doc span.docs-requis").addClass("active");
    $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(1).hide();
    $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(0).show();
    $(".simulator-cms .side-bar .body1 input.tree-pos").val();
    $(".simulator-cms .side-bar .body1 .top-header-doc").hide();
    $(".simulator-cms .side-bar .body1 .docs-in").show();

}

function createChildClasses(){
    var questionId =  $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").attr("title");
    var id = $(".simulator-cms .side-bar .body .div-1 .cms-form input.class-id").val(); 
    var list = id.split("-");               
    var str = getParentPath(list);
    var clms = eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_idB\"]");
    

    var childs = qstList[indexOfQst(questionId,qstList)].rep;
    console.log(childs);
    $(".simulator-cms .side-bar .body1 .top-header-doc").html("");
    for(var i=0;i<childs.length;i++){
        var span = document.createElement("span");
        span.setAttribute("index",i);

        var span1 = document.createElement("span");
        span1.innerHTML=childs[i];
        span1.addEventListener("click",function(){
            afterChildClass(this.parentNode.getAttribute("index"));
        });

        span.append(span1);

        if( eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_idB\"]")!=undefined){
        if( Object.keys(clms).indexOf(i.toString()) !=-1 ){
            var ic = document.createElement("i");
            ic.setAttribute("class","fas fa-close");
            ic.setAttribute("index",i);
            ic.addEventListener("click",function(){
                if(confirm("SUPPRIMER !!")){
                    deleted.push(clms[this.getAttribute("index").toString()]);
                    this.style.display = "none";
                    eval("delete simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_idB\"]["+this.getAttribute("index").toString()+"]");
                    
                    if(Object.keys(eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_idB\"]")).length==0){
                        eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"status\"]=0");
                        eval("delete simple_chart_config.nodeStructure"+str+"[\"HTMLclass\"]");
                    }

                }
            });
            span.append(ic);

        }}

        
        $(".simulator-cms .side-bar .body1 .top-header-doc").append(span);
    }
}

function nextStepDocsIn(type,id){
    var ident = $(".simulator-cms .side-bar .body1 .docs-in").attr("ident");
    console.log(id)
    if(type==0){
        console.log(objectJsonMatrixColumns+" "+Object.keys(objectJsonMatrixColumns).length);
        if(Object.keys(objectJsonMatrixColumns).length==0){
            
            objectJsonMatrixColumns = makeMatrixClass(id,ident);
            getAllCms(0,createAllCms,[]);
        }else{
            
            objectJsonMatrixColumns["docs_requis"]= makeMatrixClass(id,ident)["docs_requis"];
            objectJsonMatrixColumns["docSort"] = getListStepsAdded();
            
            if(objectJsonMatrixColumns["docs_comp"]!=undefined){
                list = bin2vec(int2bin(objectJsonMatrixColumns["docs_comp"]));
                sortedList = objectJsonMatrixColumns["docsCompSort"];
            } 

            getAllCms(0,createAllCms,list,sortedList);        

            console.log("else :"+JSON.stringify(objectJsonMatrixColumns));
            //getAllCms(0,createAllCms,bin2vec(int2bin(objectJsonMatrixColumns["docs_comp"])));
        }
        $(".simulator-cms .side-bar .body1 .docs-in .docs-list").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-added").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span").removeClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span.docs-comp").addClass("active");
        
    }else if(type==1){
        objectJsonMatrixColumns["docs_comp"] = getListDocsAdded();
        objectJsonMatrixColumns["docsCompSort"] = getListStepsAdded();
        var list = [];
        var sortedList = [];
        if(objectJsonMatrixColumns["steps"]!=undefined){
            list = bin2vec(int2bin(objectJsonMatrixColumns["steps"]));
            sortedList = objectJsonMatrixColumns["stepSort"];
        } 
        getAllCms(1,createAllCms,list,sortedList);        
        $(".simulator-cms .side-bar .body1 .docs-in .docs-list").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-added").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span").removeClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span.steps").addClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(0).hide();
        $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(1).show();
        
    }else if(type==2){
        objectJsonMatrixColumns["steps"] = getListDocsAdded();
        objectJsonMatrixColumns["stepSort"] = getListStepsAdded();

        $(".simulator-cms .side-bar .body1 .docs-in .docs-list").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-added").html("");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span").removeClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .header-doc span.docs-requis").addClass("active");
        $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(1).hide();
        $(".simulator-cms .side-bar .body1 .docs-in .docs-in-buttons button").eq(0).show();
        console.log("objectJson::::::",objectJsonMatrixColumns);
        var ident = $(".simulator-cms .side-bar .body1 .docs-in").attr("ident");
        addMatrixElement(objectJsonMatrixColumns,id,ident);
    }
}

function makeMatrixClass(id,ident){
    var list = id.split("-");
    var obj = simple_chart_config.nodeStructure;    
    console.log(list);
    var reps = [];
    for(var i=0;i<list.length;i++){
        reps.push(Number(list[i])+1);
    }

    var objectJson = {
        id:"0",
        list:getMatrixColumns(list,obj,ident),
        list_rep:[].concat(reps,Number(ident)+1),
        docs_requis:getListDocsAdded(),
        docSort:getListStepsAdded()
    }
    console.log(objectJson);
    console.log("ùùùùùùù",objectJson.list);
    return objectJson;

}

function beginStepsMatrixColumns(id,childId){
    var list = id.split("-");
    var str = getParentPath(list);
    var objStatus = eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"status\"]");
    
    if(objStatus!=0){
        var columns_idB = eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_idB\"]");
            if(Object.keys(columns_idB).indexOf(childId.toString())==-1){
                getAllCms(0,createAllCms,[]);    
            }else{
                console.log(columns_idB);
                readMatrixCms(columns_idB[childId.toString()]);
            }
    }else{
        getAllCms(0,createAllCms,[]);    
    }
    
}

function readMatrixCms(id){
    $.ajax({
        type: "get",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: URL_SEARCH+"/simulator_index_matrix/columns/"+id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            objectJsonMatrixColumns = result._source;
            objectJsonMatrixColumns["id"] = result._id;
            var list = [];
            var sortedList = [];
            if(objectJsonMatrixColumns["docs_requis"]!=undefined){
                list = bin2vec(int2bin(objectJsonMatrixColumns["docs_requis"]));
                sortedList = objectJsonMatrixColumns["docSort"];
            }     
            getAllCms(0,createAllCms,list,sortedList);
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


function addMatrixElement(objectJson,id,ident){

    var idObject = objectJson.id;
    if(idObject==0){
        var str = "";    
    }else{
        var str = idObject;
    }

    $.ajax({
        type: "post",
        //url: "http://localhost:9200/simulator_index_qr/qrs/"+id,
        url: URL_SEARCH+"/simulator_index_matrix/columns/" + str,
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
                eval("simple_chart_config.nodeStructure"+str+"[\"text\"][\"columns_idB\"][\""+ident+"\"]=result._id");
                eval("simple_chart_config.nodeStructure"+str+"[\"HTMLclass\"]=\"classe-evo\"");
                showUpdate(id);
                refrechTreant();             
        },
        error: function (error) {
            console.log(error.responseText);
        }
    }); 
}


function getMatrixColumns(list,obj,idChild){
    var array = [];
    var str = "";
    array.push(eval("obj"+str+"[\"text\"][\"question_id\"]"))
    if(list[0]!=""){
        for (var i = 0; i < list.length; i++) {
            str += "[\"children\"][" + list[i] + "]";
            console.log("srrrrrrrrr",str);
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
        console.log(id);
        vector[id-1] = 1;
    }
    console.log(vector.join('')+"**"+bin2int(vector.join('')));
    return 555;
}

function getListStepsAdded(){
    var vector2 = [];
    var listChecked = $(".simulator-cms .side-bar .body1 .docs-in .docs-added .doc-item");
    for(var i=0;i<listChecked.length;i++){
        var id = listChecked.eq(i).children("input").val();
        vector2.push(id);
    }
    return vector2;
}

function setIdTree(list,childs){
    var str = getParentPath(list);
    console.log(str);
    for(var i=0;i<childs.length;i++){
      var new_list= [];
      new_list = new_list.concat(list);
      new_list.push(i.toString());
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
      url: URL_SEARCH+"/"+index,
      //url: "http://localhost:9200/index_classification_cluster/avis/_search",
      datatype: "application/json",
      contentType: "application/json",
      beforeSend: function (xhr) {
           xhr.setRequestHeader("Authorization", AUTH);
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
        url: URL_SEARCH+"/"+index+id,
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
        url: URL_SEARCH+"/"+index+id,
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        contentType: "application/json",
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", AUTH);
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
        url: URL_SEARCH+"/"+index+id,
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
        url: URL_SEARCH+"/"+index,
        //url: "http://localhost:9200/index_classification_cluster/avis/_search",
        contentType: "application/json",
        datatype:"application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", AUTH);
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
        url: URL_SEARCH+"/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data:bulk,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
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
            if(arrayQst[i]==-1){
                td.innerHTML = "All";
            }else{
                td.innerHTML = arrayQst[i];
            }
            
            tr.appendChild(td);
        }
        divGlobal.appendChild(tr);
    }
}

function getIdDeletedColumns(tree){
    var newObj = [];
    var obj = {};
    obj[tree.text.question_id]=[];
    var array = [[],[]]; 
        if(tree.text.status==1){
            var clms = tree.text.columns_idB;
                for(var i = 0; i < Object.keys(clms).length;i++){
                    deleted.push(clms[Object.keys(clms)[i]]);
                }
            
        
    }  
      return deletedCol(tree,array,newObj);
}
  
var deleted = [];

function deletedCol(tree,array,newObj){
    for(var i=0;i<tree.children.length;i++){
          if(tree.children[i].text.status==1){
              var clms = tree.text.columns_idB;
                for(var j = 0; j < Object.keys(clms).length;j++){
                    deleted.push(clms[Object.keys(clms)[j]]);
                }
          }
      
      var obj = {};
      var sousTree = tree.children[i];
      obj[tree.children[i].text.question_id]=[];
      str = getTreeHierS(array);
      array[0].push(tree.children[i].text.question_id);
      array[1].push(i);
      if(tree.children[i].text.children!=0){
        newObj = deletedCol(sousTree,array,newObj);
      }
      array[0].pop();
      array[1].pop();
    }
    return newObj;
  }
  
  function deleteBulkRequest(array){
    var str = "";
    for(var i=0;i<array.length;i++){
      str+="{ \"delete\" : { \"_index\" : \"simulator_index_matrix\", \"_type\":\"columns\", \"_id\" : \""+array[i]+"\" } }\n";
    }
    console.log(str)
    return str;
}

function restAutoComplete3(inp,req,index,field){

    var obj = {"size":5,"query": 
    {
    "bool":{
        "must":[{
            "query_string": {
                "fields":["content.intituleFr"],
                "query":"*"+req+"*",
                "minimum_should_match": "100%"                   
            }
        },{
                "term": {
                    "content.categorie.keyword": {
                        "value": "Intitulé Activité"
                    }
                }
            
        }]
    }
  }
};
    
    console.log(JSON.stringify(obj));

    $.ajax({
        type: "post",
        url: URL_SEARCH+"/"+index+"/_search",
        contentType: "application/json",
        datatype:"application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            var arr = [];
            var arrObj = [];
            for(var i=0;i<result.hits.hits.length;i++){
                arr.push(result.hits.hits[i]._source);
            };

            for(var i=0;i<result.hits.hits.length;i++){
                arrObj.push(result.hits.hits[i]._id);
            };

            createListeResAc(inp,arr,arrObj,req,2);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });    
}


  /* auto complete */
  function autoCompleteSim(inp,index,field,type){
      if(type==0){      
          inp.addEventListener("input",function(){
              var val = this.value;
              var arr = searching(val,index);
              createListeResLoc(this,arr,val,2);
          },false);
          
          inp.addEventListener("keydown", function(e) {
              var x = document.getElementById("autocomplete-list");
              if (x) x = x.getElementsByTagName("div");
      
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
          },false);
      }else if(type==5){
        

        inp.addEventListener("input",function(){
            var val = this.value;
            restAutoComplete3(inp,val,"activite_economique","intituleFr");
        });


        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById("autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
    
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

      }else{
              inp.addEventListener("input",function(){
                  var req = inp.value;
                  restAutoComplete2(inp,req,index,field);
              });
              
          if(index=="simulator_index_qr"){
              inp.addEventListener("keydown", function(e) {
                  var x = document.getElementById("autocomplete-list");
                  if (x) x = x.getElementsByTagName("div");
          
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
              },false);
          }
      }
  }


  function createListeResAc(inp,arr,arrObj,val,type){
    closeAllListsSim(1);
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    a.setAttribute("style","margin-top: auto;top:auto;position:absolute;width:46%;left: 12px;")
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);
    
    /*for each item in the array...*/
    for (i = 0; i < 5; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        var b = document.createElement("DIV");
        /*make the matching letters bold:*/
        var str = arr[i].content.intituleFr;

        b.setAttribute("title",str);
        
        if(val==""){
            b.innerHTML=str.toUpperCase();
        }else{
            b.innerHTML=addSpansHL(val.toUpperCase(),str.toUpperCase());
        }
        
     
        /*insert a input field that will hold the current array item's value:*/
        var input = document.createElement("input");
        input.setAttribute("type","hidden");
        input.setAttribute("value",arr[i].content.intituleFr);
        b.appendChild(input);
        b.setAttribute("idd",arrObj[i]);
        b.setAttribute("typeAct",arr[i].parents.TypeActivite);
        b.setAttribute("typeAut",arr[i].parents.TypeAutorisation);
        b.setAttribute("natureAct",arr[i].parents.NatureActivite);


        /*execute a function when someone clicks on the item value (DIV element):*/
    
        b.addEventListener("click", function(e) {
            inp.value = this.getElementsByTagName("input")[0].value;
            inp.setAttribute("idd",this.getAttribute("idd"));
            inp.setAttribute("typeAct",this.getAttribute("typeAct"));
            inp.setAttribute("typeAut",this.getAttribute("typeAut"));
            inp.setAttribute("natureAct",this.getAttribute("natureAct"));
            inp.setAttribute("disabled","disabled");
            inp.parentElement.getElementsByTagName("i")[0].style.display = "inline-block";
            closeAllListsSim(1);
        });
        a.appendChild(b);
    }

    
}

function restAutoComplete2(inp,req,index,field){
    
    var obj = {"size":5,"query": 
    {
    "bool":{
        "must":[{
            "query_string": {
                "fields":[field],
                "query": "*"+req+"*",
                "fuzziness": "AUTO",
                "minimum_should_match": "100%"
            }
        }],
        "should":[{
            "match_phrase_prefix":{
                "value":req
            }
        }]
    }
    }};
    
    if(index=="faq_index"){
        obj =   {"size":5,"query": 
        {
        "bool":{
            "must":[{
                "query_string": {
                    "fields":[field+".completion"],
                    "query":"*"+req+"*",
                    "minimum_should_match": "100%"                   
                }
            }],
            "should":[{
                "match_phrase_prefix":{
                    "value":req
                }
            }]
        }
      }
    };
    }
    console.log(JSON.stringify(obj));

    $.ajax({
        type: "post",
        url: URL_SEARCH+"/"+index+"/_search",
        contentType: "application/json",
        datatype:"application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);
            if(index=="faq_index"){
                createListeRes(inp,result.hits.hits,req,0);
            }else if(index=="videos_index"){
                createListeResVideo(inp,result.hits.hits,req,1);
            }else{
                createListeRes(inp,result.hits.hits,req,1);
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });    
}

function getAllCmsQuestion(inp,index){
    var obj = {
            "size":50,"query":{
            "match_all":{}
        }
    };

    console.log("test");
    
    $.ajax({
        type: "post",
        url: URL_SEARCH+"/"+index+"/_search",
        contentType: "application/json",
        datatype:"application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
             xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log("test");
            console.log(result);

            createListeRes(inp,result.hits.hits,"",1);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    }); 
}


function locationAutoComplete2(inp,arr,val,type){
    closeAllListsSim(0);
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items2");
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);
    for (i = 0; i < arr[0].length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        var b = document.createElement("DIV");
        /*make the matching letters bold:*/
        var str = arr[0][i];
        b.setAttribute("title",str);
        if(val==""){
            b.innerHTML=str.toLowerCase();
        }else{
            b.innerHTML=addSpansHL(val.toLowerCase(),str.toLowerCase());
        }
        var input = document.createElement("input");
        input.setAttribute("type","hidden");
        input.setAttribute("value",arr[1][i]);
        b.appendChild(input);
        b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getAttribute("title");
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllListsSim(0);
        });
        b.appendChild(input);
        a.appendChild(b);

    }   
}

function createListeRes(inp,arr,val,type){
    closeAllListsSim();
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);
   
    
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        var b = document.createElement("DIV");
        /*make the matching letters bold:*/
        if(type!=0){
            var str = arr[i]._source.question;
        }else{
            var str = arr[i]._source.QUESTIONS;
        }
        b.setAttribute("title",str);
        if(val==""){
            b.innerHTML=str.toLowerCase();
        }else{
            b.innerHTML=addSpansHL(val.toLowerCase(),str.toLowerCase());
        }
     
        if(type!=0){
            /*insert a input field that will hold the current array item's value:*/
            var input = document.createElement("input");
            input.setAttribute("type","hidden");
            input.setAttribute("value",arr[i]._id);
            b.appendChild(input);
            /*execute a function when someone clicks on the item value (DIV element):*/
        
            b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").html(this.getAttribute("title"));    
            $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").attr("title",this.getElementsByTagName("input")[0].value); 
            $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").show();
            $(".cms-form .body-cms-form .class-question .link-sim-cms span.update").hide();
            $(".cms-form .body-cms-form .class-question .link-sim-cms .fa-edit").show();
            $(".cms-form .body-cms-form .class-question .link-sim-cms .fa-plus").hide();
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllListsSim(1);
            });
        }else{
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getAttribute("title");
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllListsSim(1);
            });
        }
        a.appendChild(b);
    }
}

function createListeResVideo(inp,arr,val,type){
    closeAllListsSim();
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);
   
    
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        var b = document.createElement("DIV");
        /*make the matching letters bold:*/
        
        var str = arr[i]._source.title;
       
        b.setAttribute("title",str);
        if(val==""){
            b.innerHTML=str.toLowerCase();
        }else{
            b.innerHTML=addSpansHL(val.toLowerCase(),str.toLowerCase());
        }
     
        
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getAttribute("title");
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllListsSim(1);
            });
        
        a.appendChild(b);
    }
}


function createListeResLoc(inp,arr,val,type){
    closeAllListsSim(1);
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    a.setAttribute("style","margin-top: auto;top:auto;position:absolute;width:46%;left: 12px;")
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);
    
    /*for each item in the array...*/
    for (i = 0; i < 5; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        var b = document.createElement("DIV");
        /*make the matching letters bold:*/
        var str = arr[i];

        b.setAttribute("title",str);
        
        if(val==""){
            b.innerHTML=str.toUpperCase();
        }else{
            b.innerHTML=addSpansHL(val.toUpperCase(),str.toUpperCase());
        }
        
     
        /*insert a input field that will hold the current array item's value:*/
        var input = document.createElement("input");
        input.setAttribute("type","hidden");
        input.setAttribute("value",arr[i]);
        b.appendChild(input);
        /*execute a function when someone clicks on the item value (DIV element):*/
    
        b.addEventListener("click", function(e) {
            inp.value = this.getElementsByTagName("input")[0].value;
            inp.setAttribute("disabled","disabled");
            inp.parentElement.getElementsByTagName("i")[0].style.display = "inline-block";
            closeAllListsSim(1);
        });
        a.appendChild(b);
    }

    
}


function closeAllListsSim(type) {
    currentFocus = -1;
    if(type!=0){
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            x[i].parentNode.removeChild(x[i]);
        }
    }else{
        var y = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < y.length; i++) {
            y[i].parentNode.removeChild(y[i]);
        }
    }
    
}

/* localite */
var localiteType = ["pays", "préfecture/province", "commune/arrondissement", "region", "ville", "quartier"];
var localiteLib = [];

function restGetAllLocalite(offset,limit,type){
    $.ajax({
        type: "get",
        url: "http://91.121.57.204:8080/karazortal/access/rest/kdata/search/referentiel_localite_search_AllLocalite?apiKey=AB90G-BH903-W4EE1-Z66Q9-7822K&offset="+offset+"&limit="+limit+"&sortInfo=id=ASC",
        datatype: "application/json",
        success: function (result) {
            var data = result.data;
            localiteLib = [];
            Array.from(document.querySelectorAll(".simulator-qr .rep img.loadGif")).forEach(function(elm){
                elm.style.display = "none";
            });
            if(type==0){
                for(var i=0;i<localiteType.length;i++){
                    localiteLib.push([]);   
                }
            }
            
            for(var i=0;i<data.length;i++){
                var indexLocaliteType =  localiteType.indexOf(data[i].stringIndex13);
                if(indexLocaliteType != -1 ){
                    localiteLib[indexLocaliteType].push(data[i].stringIndex1);
                }else{
                    localiteType.push(data[i].stringIndex13);    
                    localiteLib.push([]);
                    localiteLib[localiteLib.length-1].push(data[i].stringIndex1);
                }
            }
            console.log(localiteLib);

        },
        error: function (error) {
            console.log(error.responseText);
            alert("Error dans le chargement des localités..!");
        }
    });
}

function searching(val,i){
    if(i==-1){
        return localiteLib.join(",").split(",").filter(result => {
            const regex = new RegExp(val,'gi')
            return result.match(regex) ;
        });
    }else{
        return localiteLib[i].filter(result => {
            const regex = new RegExp(val,'gi')
            return result.match(regex) ;
        });
    }
}