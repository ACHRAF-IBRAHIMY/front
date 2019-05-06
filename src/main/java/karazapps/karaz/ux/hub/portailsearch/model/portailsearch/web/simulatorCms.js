var simple_chart_config = {
    chart: {
        container: "#tree-simple",
        connectors: {
            type: 'step'
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
        $(".cms-form .body-cms-form .class-question .link-sim-cms i").show();

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
    showUpdate(id)
}

function modeUpdate(){
    var idQuestion = $(".cms-form .body-cms-form .class-question .link-sim-cms span input").val();
    console.log(idQuestion);
    $(".cms-form .body-cms-form .class-question .link-sim-cms span").html("<select style=\"display:none\"></select>");
    $(".cms-form .body-cms-form .class-question .link-sim-cms i").hide();
    createSelectQuestion(document.getElementsByClassName("cms-form")[0].getElementsByClassName("body-cms-form")[0].getElementsByClassName("class-question")[0].getElementsByTagName("select")[0],idQuestion);
}

function showQuestion(results){
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

function updateQuestionCms(id){
    
}

function addQuestion(){
    
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
    my_chart.destroy();
    my_chart = new Treant(simple_chart_config, function () {}, $);
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