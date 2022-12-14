
var simulator_index_qr = "simulator_index_qr";
var simulator_index_docs = "simulator_index_docs";
var simulator_index_steps = "simulator_index_steps";
var faq_index = "faq_index";
var videos_index ="videos_index";

var searchParams = new URLSearchParams(window.location.search)
var param = searchParams.get('lang');

if(param!=undefined){
if(param=="ar"){
    simulator_index_qr = "simulator_index_qrs_ar"; 
    simulator_index_docs = "simulator_index_docs_ar";
    simulator_index_steps = "simulator_index_steps_ar";
    faq_index = "faq_index_ar";
    videos_index ="videos_index_ar";
}
}

function removeExpanded(type){ 
if(type==1){
$(".simulator .docs-qr div.ow-pl").removeClass("expanded");
}else if(type ==2){
$(".faq-vbox .faq-fieldset").removeClass("expanded");
}
}


function addQuestion(qst){ 
$(".simulator .simulator-qr .qr").html("");
console.log(qst);

if(arrayVect[0].length==1){
createSpecialQst(qst[0][0]);
}else{
for(var i = 0;i<qst[0].length;i++){
createQuestion(qst[0][i].response.type,qst[0][i],qst[1][i],qst[2][i]);   
}
}
}


function createSpecialQst(obj){
$(".simulator .simulator-qr .next-button").hide();
var gldiv = document.getElementsByClassName("simulator")[0].getElementsByClassName("qr")[0];
var q = document.createElement("div");
q.setAttribute("class","ques-rep");

var q1 = document.createElement("div");
q1.setAttribute("class","ques");
q1.innerHTML= obj.question;
var q2 = document.createElement("div");
q2.setAttribute("class","rep");

var icons = ["fas fa-building","fas fa-cogs","fas fa-search"]
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
resDiv.setAttribute("class","type-demande");
resDiv.setAttribute("idd",i+1);
var input = document.createElement("input");
input.setAttribute("type","hidden");
input.setAttribute("value",i+1);
var res = document.createElement("span");
res.setAttribute("class","");
res.innerHTML = obj.response.content[i];   
var check = document.createElement("i");
check.setAttribute("class",icons[i]);


resDiv.appendChild(check);
resDiv.appendChild(res);
resDiv.appendChild(input);
resDiv.addEventListener("click",function(){
    var val = this.getAttribute("idd");
    addToArrayVect(arrayVect[0][arrayVect [0].length - qstArray[0].length],val,val,"NR");                 
    startButton(1);  
    var str = getTreeHier(tree,[arrayVect[0].slice(0,arrayVect [0].length - qstArray[0].length +1),arrayVect[1].slice(0,arrayVect [1].length - qstArray[0].length +1),arrayVect[2].slice(0,arrayVect [2].length - qstArray[0].length +1)]); 
    console.log(str);
    var treeLocal = eval("tree"+str);
    console.log("*********tree :"+tree);
    traitementResponse(treeLocal,val-1,0,"NR",false,false)
    if($(".simulator .simulator-qr .next-button button.next-rq").hasClass("stopped")){
       $(".simulator .simulator-qr .next-button button.next-rq").removeClass("stopped");
       removeExpanded(); 
    }

});
response.appendChild(resDiv);
}

q2.appendChild(response);
q.appendChild(q1);
q.appendChild(q2);
gldiv.appendChild(q);
}

function createQuestion(type,obj,hide,clmm){
$(".simulator .simulator-qr .next-button").show();

var gldiv = document.getElementsByClassName("simulator")[0].getElementsByClassName("qr")[0];
var q = document.createElement("div");
q.setAttribute("class","ques-rep");
q.setAttribute("typpe",hide)

console.log("clmm"+clmm);

if(Object.keys(clmm).length!=0){
q.setAttribute("clmm","classed");
}else{
q.setAttribute("clmm","notClassed");
}

if(hide=="SQH"){
q.setAttribute("style","display:none");
};

var q1 = document.createElement("div");
q1.setAttribute("class","ques");
if(obj.response.help != undefined){
if(obj.response.help.trim()!=""){
q1.innerHTML= obj.question+"<i class=\"fas fa-question-circle\" title=\""+obj.response.help+"\"></i>";
}else{
q1.innerHTML= obj.question;
}
}else{
q1.innerHTML= obj.question;
}

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
  
var check = document.createElement("span");
check.setAttribute("class","check");

if(obj.response.content[i].indexOf("***")!=-1){
    var a = obj.response.content[i];
    var elm = a.substring(a.indexOf("***")+3,a.indexOf("***",a.indexOf("***")+1));
    var icc = document.createElement("i");
    icc.setAttribute("class","fas fa-info");
    icc.setAttribute("style","margin-left: 7px;font-size: 11px;width: 17px;background: #38a;color: #fff;border-radius: 50%;text-align: center;height: 17px;line-height: 17px;cursor: pointer;");
    icc.setAttribute("title",elm);
    res.innerHTML = obj.response.content[i].substring(0,a.indexOf("***"))+" "; 
    res.appendChild(icc);
 }else{
    res.innerHTML = obj.response.content[i]; 
}


check.addEventListener("click",function(){
    $(this).parent().parent().find(".check-ent").removeClass("active-check");
    $(this).children(".check-ent").addClass("active-check");
    if($(".simulator .simulator-qr .next-button button.next-rq").hasClass("stopped")){
       $(".simulator .simulator-qr .next-button button.next-rq").removeClass("stopped");
       $(".simulator .simulator-qr button.next-report").hide();
       $(".error-msg-sim").hide();

       removeExpanded(); 
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

if(obj.response.content[i].indexOf("***")!=-1){
var a = obj.response.content[i];
var elm = a.substring(a.indexOf("***")+3,a.indexOf("***",a.indexOf("***")+1));
check.setAttribute("title",elm);
check.innerHTML = obj.response.content[i].substring(0,a.indexOf("***"));   
}else{
check.innerHTML = obj.response.content[i];   
}

response.appendChild(check);
}
response.addEventListener("change",function(){
if($(".simulator .simulator-qr .next-button button.next-rq").hasClass("stopped")){
    $(".simulator .simulator-qr .next-button button.next-rq").removeClass("stopped");
    $(".simulator .simulator-qr button.next-report").hide();
    $(".error-msg-sim").hide();

    removeExpanded(); 
}
});
q2.appendChild(response);    
}else if(type=="input"){
var response = document.createElement("input");
response.setAttribute("class","rep-pred rep-type-2");
response.setAttribute("placeholder",obj.response.placeholder);
response.addEventListener("input",function(){
if($(".simulator .simulator-qr .next-button button.next-rq").hasClass("stopped")){
$(".simulator .simulator-qr .next-button button.next-rq").removeClass("stopped");
$(".simulator .simulator-qr button.next-report").hide();
$(".error-msg-sim").hide();
removeExpanded(); 
}
});

q2.appendChild(response);
}else if(type=="input-conditional"){
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
response.addEventListener("input",function(){
if($(".simulator .simulator-qr .next-button button.next-rq").hasClass("stopped")){
    $(".simulator .simulator-qr .next-button button.next-rq").removeClass("stopped");
    $(".simulator .simulator-qr button.next-report").hide();
    $(".error-msg-sim").hide();

    removeExpanded(); 
 }
});
q2.appendChild(response);
}else if(type == "location"){
var content = obj.response.content;
var response = document.createElement("input");
response.setAttribute("class","rep-pred rep-type-4");
response.setAttribute("placeholder","Localit??");
response.addEventListener("input",function(){
if($(".simulator .simulator-qr .next-button button.next-rq").hasClass("stopped")){
$(".simulator .simulator-qr .next-button button.next-rq").removeClass("stopped");
$(".simulator .simulator-qr button.next-report").hide();
$(".error-msg-sim").hide();

removeExpanded(); 
}
});
response.setAttribute("style","vertical-align: top;margin-top:6px;");
var index = localiteType.indexOf(content);
autoCompleteSim(response,index,null,0);
q2.appendChild(response);
if(localiteLib.length==0){
q2.innerHTML += "<img src=\"img/loadgif3.gif\" style=\"width:50px;vertical-align: top;\" class=\"loadGif\"></img>";
}

var icon = document.createElement("i");
icon.setAttribute("class","fas fa-edit");
icon.setAttribute("style","display:none;font-size: 24px;padding-top: 7px;margin-left: 8px;cursor:pointer");
icon.addEventListener("click",function(){
this.parentElement.getElementsByTagName("input")[0].removeAttribute("disabled");    
});
q2.appendChild(icon);
}else if(type=="activite"){
autorisation = true;
var content = obj.response.content;
var response = document.createElement("input");
response.setAttribute("class","rep-pred rep-type-5");
response.setAttribute("placeholder","Activit??");
$(".simulator .simulator-qr .next-button button.next-rq").addClass("stopped");
response.addEventListener("input",function(){
if($(".simulator .simulator-qr .next-button button.next-rq").hasClass("stopped")){
    $(".simulator .simulator-qr button.next-report").hide();
    $(".error-msg-sim").hide();
    removeExpanded(); 
}
});
response.setAttribute("style","vertical-align: top;margin-top:6px;");
var index = localiteType.indexOf(content);
q2.appendChild(response);


var icon = document.createElement("i");
icon.setAttribute("class","fas fa-edit");
icon.setAttribute("style","display:none;font-size: 24px;padding-top: 7px;margin-left: 8px;cursor:pointer");
icon.addEventListener("click",function(){
    $(".simulator .simulator-qr .next-button button.next-rq").addClass("stopped");
    this.parentElement.getElementsByTagName("input")[0].removeAttribute("disabled");    
});
q2.appendChild(icon);
    autoCompleteSim(q2.getElementsByClassName("rep-type-5")[0],index,null,5);

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
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/"+simulator_index_qr+"/qrs/"+id,
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
};

function getQuestions(qstts,type,clmm,iter){
loadQuestion();
$.ajax({
type: "get",
//url: "http://localhost:9200/"+simulator_index_qr+"/qrs/"+id,
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/"+simulator_index_qr+"/qrs/"+qstts[iter],
datatype: "application/json",
contentType: "application/json",
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
console.log(iter);
console.log(clmm);
qstArray[0].push(result._source);
qstArray[1].push(type[iter]);
qstArray[2].push(clmm[iter]);
startButton(1);
if(qstts.length-1==iter || qstts[iter+1].toString()=="-1"){
    if(qstts[iter].toString()!="-1")addQuestion(qstArray);
}else{
    getQuestions(qstts,type,clmm,iter+1);
}    
},
error: function (error) {
console.log(error.responseText);
}
});
};



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

var tree2 = [{}];

var arrayVect = [new Array(),new Array(),new Array(),new Array()];
var qstArray = [new Array(),new Array(),new Array()];
var qstId = [new Array(),new Array()];


/* Parcourir tree2*/ 
function getQstFromTree(list){
if(list.length==1){
return tree2;
}else{
var list2 = [];
for(var i=0;i<list.length-1;i++){
list2.push((Number(list[i])-1).toString());
}
var str = getParentPath(list2);
console.log(str);
var subTree = eval("tree2" + str );    
}
return subTree;
}

function getQstId(idVect){
var idVectLoc = new Array();
idVectLoc=idVectLoc.concat(idVect)
var qstVect = [new Array(), new Array(),new Array()];
var qstTree = getQstFromTree(idVect);
console.log(qstTree.text)
if(qstTree.children.length!=1 || qstTree.children.length==0){
return [[qstTree.text.question_id],["NR"],[qstTree.text.columns_idB]];
}else if(qstTree.children.length==1){
if(qstTree.text.type_aff == "NR" || qstTree.text.type_aff == undefined ){
return [[qstTree.text.question_id],["NR"],[qstTree.text.columns_idB]];
}else{
console.log(idVectLoc);
idVectLoc[idVectLoc.length-1]="1";
idVectLoc.push("0");
console.log(idVectLoc);

qstVect[0].push(qstTree.text.question_id);
qstVect[1].push(qstTree.text.type_aff);
qstVect[2].push(qstTree.text.columns_idB);

qstVect[0]=qstVect[0].concat(getQstId(idVectLoc)[0]);
qstVect[1]=qstVect[1].concat(getQstId(idVectLoc)[1]);
qstVect[2]=qstVect[2].concat(getQstId(idVectLoc)[2]);

return qstVect;
}
}
}


function addToArrayVect(key,value,type,typpe){
console.log("add To arrayVect :"+key+value);
var index = arrayVect[0].indexOf(key);
if(index==-1){
arrayVect[0].push(key);
arrayVect[1].push(value);
arrayVect[2].push(type);
arrayVect[3].push(typpe);
}else{
arrayVect[1][index]= value;
arrayVect[2][index]=type;
arrayVect[3][index]=typpe;
}
}

function popArrayVect(i){
if(i==undefined){
arrayVect[0].pop();
arrayVect[1].pop();
arrayVect[2].pop();
arrayVect[3].pop();
}else{
arrayVect[0].splice(i,i+1);
arrayVect[1].splice(i,i+1);
arrayVect[2].splice(i,i+1);
arrayVect[3].splice(i,i+1);
}
}

function loadQuestion(){
var str = "<img src=\"img/load-text.gif\" style=\"margin: auto;display: block;height: 100px;\" alt=\"\"/>";
$(".simulator .simulator-qr .qr").html(str);
}

function intializeVectArray(){
arrayVect = [[],[],[],[]];
arrayVect[0].push(Object.keys(tree)[0]);
arrayVect[1].push(0);
arrayVect[2].push(0);
arrayVect[3].push(0);
}

function allNextClick(){
var qrs = document.querySelectorAll(".simulator .ques-rep");

for(var i=0;i<qrs.length;i++){
console.log(qrs[i],i);
nextClick(qrs[i],i);
}
}

var autoEconom = ["Simple D??claration","??tablissement class??","Occupation Domaine Public",]
var autoUrba = [["Projet de construction d'institution ?? caract??re industriel","Projet de construction ?? usage mixte","Equipements commerciaux","Projet de construction d'??quipement ?? usage commercial","Projet de construction d'??quipement ?? usage public"],["Modifications de constructions existantes"],["Projet de morcellement"],["Projet de construction ?? usage d'habitation"],["Projet de lotissement"]];
var autoodp = ["T??l??com","Travaux Publics","Affichage Publicitaire","Stationnement R??serv??","Activit?? Normale",]
var autoec = ["agroalimentaire", "agroalimentaire 1", "automobile et motocycle", "automobile et motocycle 1", "beaut?? et bien ??tre", "chaudronnier, tuyauteur et soudeur", "chimie et peinture", "c??r??monie et loisir", "d??cors et meuble", "d??cors et meuble 1", "d??p??t et froid", "d??p??t et froid 1", "??cole et Institut", "import Export", "imprimerie", "industrie plastique", "industrie de cuir", "industrie m??tallique", "industrie m??tallique 1", "industrie: bois, li??ge, vannerie et sparterie", "industrie: electronique electrique et c??blages", "industrie: electronique electrique et c??blages 1", "industrie: marbre, carrelage et pierre", "industrie: min??raux non m??talliques", "joaillerie et bijouterie", "maison et jardin", "papier et carton", "production et distribution d'??lectricit??, de gaz, de vapeur et d'air conditionn??", "sport", "textile et chaussure", "textile et chaussure 1", "transformation et conservation de la viande", "construction"];
var autosd = ["agriculture et jardin", "agroalimentaire", "animaux", "automobile et motocycle", "beaut?? et bien ??tre", "bois, li??ge, vannerie et sparterie", "d??cors et meuble", "ecole et institut", "electrique, electronique, ??lectrom??canique et hydrom??canique", "ev??nements et attractions", "finance et assurance", "informatique, multim??dia et t??l??com", "jouets et articles de cadeaux", "juridique", "librairie, papeterie et imprimerie", "maison et m??tier li??", "mat??riels et accessoires sportif", "restaurant, traiteur, caf?? et snack", "sanitaire", "sant??", "si??ge soci??t?? et bureau d'??tudes", "textile et chaussure", "tourisme et h??tellerie", "transport et messagerie"];

function nextClick(qr,iter){
console.log(qr);
var type = $(qr.querySelector(".simulator-qr .rep-pred"));

if(type.hasClass("rep-type-0")){
type=0
}else if(type.hasClass("rep-type-1")){
type=1
}else if(type.hasClass("rep-type-3")){
type=3
}else if(type.hasClass("rep-type-5")){
type=5;
}else{
type=2;
}

switch(type){

case 0:
    var val = $(qr.querySelector(".simulator-qr .rep-pred .check .active-check")).parent().parent().children("input").val();
    var typpe = qr.getAttribute("typpe");
    var clmm = qr.getAttribute("clmm");
    var classed = false;

    if(clmm="classed"){
        classed = true;
    }

    console.log(typpe);
    addToArrayVect(arrayVect[0][arrayVect [0].length - qstArray[0].length + iter],val,val,typpe);                 
    startButton(1);  
    var str = getTreeHier(tree,[arrayVect[0].slice(0,arrayVect [0].length - qstArray[0].length + iter+1),arrayVect[1].slice(0,arrayVect [1].length - qstArray[0].length + iter+1),arrayVect[2].slice(0,arrayVect [2].length - qstArray[0].length + iter+1)]); 
    console.log(str);
    var treeLocal = eval("tree"+str);
    console.log("*********tree :"+tree);
    traitementResponse(treeLocal,val-1,iter,typpe,classed,false)
    break;
case 1:
    var val = $(qr.querySelector(".simulator-qr .rep-pred option:checked")).val();
    var typpe = qr.getAttribute("typpe");
    var clmm = qr.getAttribute("clmm");
    var classed = false;

    if(clmm="classed"){
        classed = true;
    }

    console.log(typpe);
    addToArrayVect(arrayVect[0][arrayVect [0].length - qstArray[0].length + iter],val,val,typpe);  
    startButton(1);
    var str = getTreeHier(tree,[arrayVect[0].slice(0,arrayVect [0].length - qstArray[0].length + iter+1),arrayVect[1].slice(0,arrayVect [1].length - qstArray[0].length + iter+1),arrayVect[2].slice(0,arrayVect [2].length - qstArray[0].length + iter+1)]); 
    var treeLocal = eval("tree"+str);
    console.log("*********tree :"+tree);
    traitementResponse(treeLocal,val-1,iter,typpe,classed,false)
    break;
case 2:
    var val = $(qr.querySelector(".simulator-qr .rep-pred")).val();
    var typpe = qr.getAttribute("typpe");
    console.log(typpe);
    addToArrayVect(arrayVect[0][arrayVect [0].length - qstArray[0].length + iter],val,val,typpe);  
    startButton(1);
    var str = getTreeHier(tree,[arrayVect[0].slice(0,arrayVect [0].length - qstArray[0].length + iter+1),arrayVect[1].slice(0,arrayVect [1].length - qstArray[0].length + iter+1),arrayVect[2].slice(0,arrayVect [2].length - qstArray[0].length + iter+1)]); 
    var treeLocal = eval("tree"+str);
    console.log(tree);
    traitementResponse(treeLocal,0,iter,typpe,false,false)
    break;
case 3:
    var val = $(qr.querySelector(".simulator-qr .rep-pred")).val();
    var typpe = qr.getAttribute("typpe");
    console.log(typpe);
    addToArrayVect(arrayVect[0][arrayVect [0].length - qstArray[0].length + iter],val,val,typpe);  
    var inputs = qr.querySelector(".simulator-qr .hidden-conditional");
    for(var i =0;i<inputs.length;i++){
        if(eval("val"+inputs.eq(i).val())){
            val = (i+1).toString();
            break;
        }
    }
    console.log(Object.keys(arrayVect)[Object.keys(arrayVect).length-1]);
    startButton(1);
    var str = getTreeHier(tree,[arrayVect[0].slice(0,arrayVect [0].length - qstArray[0].length + iter+1),arrayVect[1].slice(0,arrayVect [1].length - qstArray[0].length + iter+1),arrayVect[2].slice(0,arrayVect [2].length - qstArray[0].length + iter+1)]); 
    var treeLocal = eval("tree"+str);
    console.log(str);
    console.log(treeLocal);
    traitementResponse(treeLocal,val-1,iter,typpe,false,false)
    break;
case 5:
    var inputAut = document.querySelector("input.rep-type-5");
    var val = inputAut.value;
    var typeAutG= null;
    var typeAct= inputAut.getAttribute("typeAct");
    var typeAut= inputAut.getAttribute("typeAut");
    var natureAct = inputAut.getAttribute("natureAct");
    var typeAutt = null;
    var typeActt = null;

    if(typeAut!="" && typeAct!=""){

        if(autoEconom.indexOf(typeAut)!=-1){
            typeAutG = 2;
            typeAutt = autoEconom.indexOf(typeAut);
            console.log("typeAutt",typeAutt);

            if(typeAutt==0){
                if(autosd.indexOf(natureAct.toLowerCase())!=-1){
                    typeActt = autosd.indexOf(natureAct.toLowerCase());
                }else{
                    typeActt = null;
                }
            }

            if(typeAutt==1){
                if(autoec.indexOf(natureAct.toLowerCase())!=-1){
                    typeActt = autoec.indexOf(natureAct.toLowerCase());
                }else{
                    typeActt = null;
                }
            }

            if(typeAutt==2){
                if(autoodp.indexOf(typeAct)==0 || autoodp.indexOf(typeAct)==1){
                    typeAutt = 2;
                }else if(autoodp.indexOf(typeAct)==2){
                    typeAutt = 3;
                }else if(autoodp.indexOf(typeAct)==3 || autoodp.indexOf(typeAct)==4 ){
                    typeAutt = 4;
                }
            }
        };

        if(typeAut=="Autorisations urbanisme"){ 
            typeAutG = 1;
            for(var i=0;i<autoUrba.length;i++){
                if(autoUrba[i].indexOf(natureAct)!=-1){
                    typeAutt = 0;
                    typeActt = i;
                    break;
                }
            }
        };

        
    }

    popArrayVect();
    addToArrayVect(arrayVect[0][arrayVect [0].length - 1],typeAutG,typeAutG,"NR");  
    startButton(1);
    var str = getTreeHier(tree,[arrayVect[0].slice(0,arrayVect [0].length),arrayVect[1].slice(0,arrayVect [1].length),arrayVect[2].slice(0,arrayVect [2].length)]); 
    var treeLocal = eval("tree"+str);
    traitementResponse(treeLocal,typeAutG-1,0,"NR",false,true);
    addToArrayVect(arrayVect[0][arrayVect [0].length - 1],typeAutt+1,typeAutt+1,"NR");  
    console.log("array1 :"+arrayVect);
    startButton(1);
    var str = getTreeHier(tree,[arrayVect[0].slice(0,arrayVect [0].length),arrayVect[1].slice(0,arrayVect [1].length),arrayVect[2].slice(0,arrayVect [2].length)]); 
    var treeLocal = eval("tree"+str);

   if(typeActt!=null){
        traitementResponse(treeLocal,typeAutt,-1,"NR",false,true);
        addToArrayVect(arrayVect[0][arrayVect [0].length - 1],typeActt+1,typeActt+1,"NR");  
        console.log("array1 :"+arrayVect);
        startButton(1);
        var str = getTreeHier(tree,[arrayVect[0].slice(0,arrayVect [0].length),arrayVect[1].slice(0,arrayVect [1].length),arrayVect[2].slice(0,arrayVect [2].length)]); 
        var treeLocal = eval("tree"+str);
        traitementResponse(treeLocal,typeActt,-1,"NR",true,false);
   }else{
        traitementResponse(treeLocal,typeAutt,-1,"NR",true,false);
   }


    break;    
}
} 

function infoAutorisationSim(final){
var bulk = createBulkRequestFromArrayVect();
console.log(bulk);
sendBulkRequestFromArrayVect(bulk,final);

};

function createBulkRequestFromArrayVect(){
var request = "";
for(var i=0;i<arrayVect[0].length;i++){
request += "{ \"index\": \""+simulator_index_qr+"\", \"type\": \"qrs\" }\n";
request += "{ \"query\": { \"match\": { \"id\":\""+arrayVect[0][i]+"\"}}}\n";
};
return request;
};

function sendBulkRequestFromArrayVect(bulk,final){
$.ajax({
type: "post",
//url: "http://localhost:9200/_msearch",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data:bulk,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
$(".simulator .info-container").html("") ;
reportD.chemin = [];
for(var i=0;i<result.responses.length;i++){
    var qstio = result.responses[i].hits.hits[0]._source;
    if( (qstio.response.type=="select" || qstio.response.type=="check") && Number(arrayVect[1][i]) != 0 ){
        var doc = document.createElement("div");
        doc.setAttribute("class","ctr");
        
        if(qstio.response.content[Number(arrayVect[1][i])-1].indexOf("***")!=-1){
            var a = qstio.response.content[Number(arrayVect[1][i])-1]
            var  reponseTemp = a.substring(0,a.indexOf("***"));   
         }else{
            var reponseTemp = qstio.response.content[Number(arrayVect[1][i])-1];   
         }

        doc.innerHTML = "<div style=\"padding: 3px 35px; text-align:left; font-size: 15px;margin-top: 10px;\">"+qstio.question+"</div><div style=\"padding: 3px 50px;text-align:left;color: #38A;\">"+reponseTemp+"</div>"
        $(".simulator .info-container").append(doc) ;
        var obj = {
            "question":qstio.question,
            "reponse":reponseTemp
        }
        reportD.chemin.push(obj);
    }else{
        continue;
    }
};
   
console.log(result);

if(final==true){
    $(".simulator .next-report").addClass("autori");
}else{
    $(".simulator .next-report").removeClass("autori");
}

},
error: function (error) {
console.log(error.responseText);
}
})
};

function traitementResponse(treeLocal,val,iter,typpe,classed,dontShow){
console.log("%%%% ",treeLocal);
console.log("traitement "+val);
var existBody = true;

if(existBody2(treeLocal,val)==true ){
if(treeLocal.length == 1){
var id = Object.keys(treeLocal[0])[0];
console.log(arrayVect [0].length - qstArray[0].length + iter);
addToArrayVect(arrayVect[0][arrayVect [0].length - qstArray[0].length + iter],val+1,1,typpe);
console.log("treeLocal.length1");
}else{
var id = Object.keys(treeLocal[val])[0];
console.log("treeLocal.length!1");   
}  
console.log(id,qstArray[0].length,iter);

if(qstArray[0].length-1==iter){
console.log("qstArray.length0");   
addToArrayVect(id.toString(),0,0,0);
var qstss = getQstId(arrayVect[2]);
console.log("iter====="+qstss);
for(var i=0;i<qstss[0].length;i++){
    if(qstss[0][i]!="-1")addToArrayVect(qstss[0][i].toString(),0,0,0);
}
console.log(arrayVect);
qstArray = [[],[],[]];
if(dontShow!=true){
    infoAutorisationSim(false);
    getQuestions(qstss[0],qstss[1],qstss[2],0);    
}
}
}else{
console.log("end");
infoAutorisationSim(true);
stopedButton(0);
existBody = false;

if(existBody2(treeLocal,val)==null){
$(".simulator .simulator-qr .next-button .back-rq").removeClass("stopped");
console.log()
if((Object.keys(treeLocal[0])[0]==2 && val == 6) || (Object.keys(treeLocal[0])[0]==37 && val ==5 ) ){
$(".error-msg-sim2").show();
}else{
$(".error-msg-sim1").show();
}
}else{
$(".simulator .simulator-qr .next-report").show();
$(".simulator .simulator-qr .next-button .back-rq").removeClass("stopped");
}

}

if(classed==true){
endFunctionSendAdv(existBody);
}
}

function existBody2(treeGl,val){

console.log("treeeGl"+JSON.stringify(treeGl));
if(Object.keys(treeGl).length==0){
return false;
}else{
if(Object.keys(treeGl).length==1){
if(Object.keys(treeGl[0])[0].toString()=="-1" ){
    return false;
}
}else{
if(treeGl[val]!=undefined){
    if(Object.keys(treeGl[val])[0].toString()=="-1" ){
        return false;
    }
}else{
   return null;
}

}

return true;
}
}

var DocsGlobal = [];

function endFunctionSend(){
reps = [];


var search = makeResponse(arrayVect);
console.log("search :"+search);
var objSearchMatrix = searchInMatrix2(matrix,search);

countDoc(0,objSearchMatrix);
countDoc(1,objSearchMatrix);
countDoc(2,objSearchMatrix);


}

function endFunctionSendAdv(existBody){
var list = [[],[],[],[]];
var vector = [];

for(var i=0;i<arrayVect[0].length+1;i++){
list[0] = arrayVect[0].slice(0,i);
list[1] = arrayVect[1].slice(0,i);
list[2] = arrayVect[2].slice(0,i);
list[3] = arrayVect[3].slice(0,i);
var search = makeResponse(list);
var objSearchMatrix = searchInMatrix2(matrix,search);
if(objSearchMatrix!=null){
// alert(JSON.stringify(objSearchMatrix));
}
console.log(search);
console.log(objSearchMatrix);
if(objSearchMatrix!=null){
vector.push(objSearchMatrix);
}
};

countDocAdv(0,vector,existBody);
countDocAdv(2,vector,existBody);
countDocAdv(1,vector,existBody);
countDocAdv(3,vector,existBody);
countDocAdv(4,vector,existBody);
//countDoc(1,objSearchMatrix);
}

function concatIfExist(vectorG,vector){
if(vector!=null){
for(var i=0;i<vector.length;i++){
if(vectorG.indexOf(vector[i])==-1){
    vectorG.push(vector[i]);
}else{
    continue;
}
}
return vectorG;
}else{
return vectorG;
}
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

var matrix = [["11110000","11130000","11220000","11120000","11210000","11230000","11310001","11330001","11320001","11320002","11310002","11330002"],[67111656,67111656,323552,67373800,61408,61408,4072,4072,266216,266217,4073,4073],[1023,1023,1023,1023,1023,1023,1023,1023,1023,1023,1023,1023],[4096,4096,0000,4096,0000,0000,0000,0000,0000,0000,0000,0000],[],[],[],[],[],[]];

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
return { docs :matrix[1][index], steps :matrix[2][index] , docsComp : matrix[3][index],stepSort : matrix[4][index],docSort :matrix[5][index],docComSort :matrix[6][index],docFacSort:matrix[7][index],docSortSort:matrix[8][index],id:matrix[9][index] };
}else{
console.log("Ce chemin n'existe pas encore dans la matrice de classement, veuillez choisir un autre chemin.");
return null;
}
}

var reportD = {
chemin :[],
docsR:[],
docC:[],
steps:[],
docF:[],
docD:[],
chemins:0,
docsRs:0,
docsFs:0,
docsCs:0,
stepsS:0,
docDs:0
};

function getReportData(root,context){
root.dataReport = {};
context.formRender.notifyObservers("dataReport");
root.dataReport = reportD;
context.formRender.notifyObservers("dataReport");
}

function bulkRequest(vector,type){

var request = "";
if(type==0){
for(var i=0;i<vector.length;i++){
  if(vector[i]==1){
        request += "{ \"index\": \""+simulator_index_docs+"\", \"type\": \"docs\" }\n";
        request += "{ \"query\": { \"match\": { \"id\":"+(i+1)+"}}}\n";
    }
}
}else{
for(var i=0;i<vector.length;i++){
  if(vector[i]==1){
        request += "{ \"index\": \""+simulator_index_steps+"\", \"type\": \"steps\" }\n";
        request += "{ \"query\": { \"match\": { \"id\":"+(i+1)+"}}}\n";
    }
}
}

return request;
}

function bulkRequestByVect(vector) {
var request = "";
for(var i=0;i<vector.length;i++){
request += "{ \"index\": \""+simulator_index_steps+"\", \"type\": \"steps\" }\n";
request += "{ \"query\": { \"match\": { \"id\":"+vector[i]+"}}}\n";
}
return request;
}

function bulkRequestByVect2(vector) {
var request = "";
for(var i=0;i<vector.length;i++){
request += "{ \"index\": \""+simulator_index_docs+"\", \"type\": \"docs\" }\n";
request += "{ \"query\": { \"match\": { \"id\":"+vector[i]+"}}}\n";
}
return request;
}

function sendRequestBulk(bulk,type,existBody){
$.ajax({
type: "post",
//url: "http://localhost:9200/_msearch",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data:bulk,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {    
console.log(result);
if(type==0 || type==2 || type==3 || type==4){
    $(".simulator .simulator-qr .next-button img").hide();
    addDocs(result.responses,type,existBody);
}else{
    addSteps(result.responses,existBody);                
}
},
error: function (error) {
console.log(error.responseText);
$(".simulator .simulator-qr .next-button img").hide();

}
})

}

function firstEsTreeCall(){
var bulk = "{ \"index\": \""+simulator_index_qr+"\", \"type\": \"qrs\" }\n{\"size\":6000,\"query\":{\"match_all\":{}}}\n{ \"index\": \"simulator_index_matrix\", \"type\": \"columns\" }\n{\"size\":4000,\"query\":{\"match_all\":{}}}\n";
$.ajax({
type: "post",
//url: "http://localhost:9200/_msearch",
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/_msearch",
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
matrix = [[],[],[],[],[],[],[],[],[],[]];
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
    matrix[0].push(completeArrayMatrix(ar1,ar2,sizeQuestions)); 
    matrix[1].push(columns[i]._source.docs_requis);
    matrix[2].push(columns[i]._source.steps);
    matrix[3].push(columns[i]._source.docs_comp);
    matrix[4].push(columns[i]._source.stepSort);
    matrix[5].push(columns[i]._source.docSort);

    if(columns[i]._source.docsCompSort==undefined){
        matrix[6].push([]);
    }else{
        matrix[6].push(columns[i]._source.docsCompSort);
    }

    if(columns[i]._source.docFacSort==undefined){
        matrix[7].push([]);
    }else{
        matrix[7].push(columns[i]._source.docFacSort);
    }

    if(columns[i]._source.docSortSort==undefined){
        matrix[8].push([]);
    }else{
        matrix[8].push(columns[i]._source.docSortSort);
    }

    matrix[9].push(columns[i]._id);

    console.log(completeArrayMatrix(ar1,ar2,sizeQuestions));
}


/*for(key in Object.keys(tree)){
    getQuestion(key,0);
}*/

intializeVectArray();
var qstss = getQstId(arrayVect[2]);
qstArray = [[],[],[]];
console.log(qstss);
getQuestions(qstss[0],qstss[1],qstss[2],0);    
},
error: function (error) {
console.log(error.responseText);
}
})
}

function countDocAdv(type,objSearchMatrixArr,existBody){
$(".simulator .simulator-qr .next-button img").show();

var obj = {
"query": {
"match_all": {}
}
};

if(type==0 || type==2 || type==3 || type==4){
var url = ""+simulator_index_docs+"/docs/_count";
}else if(type==1){
var url = ""+simulator_index_steps+"/steps/_count";
}

$.ajax({
type: "post",
//  url: "http://localhost:9200/" + url,
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/"+url,
datatype: "application/json",
contentType: "application/json",
data: obj,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
var vectorGlo = [];
console.log(objSearchMatrixArr);
for(var i=0;i<objSearchMatrixArr.length;i++){
    if(type==0){
        var inte = objSearchMatrixArr[i].docSort;
    }else if(type==2){
        var inte = objSearchMatrixArr[i].docComSort;
    }else if(type==1){
        var inte = objSearchMatrixArr[i].stepSort;
    }else if(type==3){
        var inte = objSearchMatrixArr[i].docFacSort;
    }else if(type==4){
        var inte = objSearchMatrixArr[i].docSortSort;
    }
    console.log(inte);
    vectorGlo = concatIfExist(vectorGlo,inte);
};
console.log(vectorGlo);
if(type==0 || type==2 || type==3 || type==4){
    var bulk = bulkRequestByVect2(vectorGlo);
}else if(type==1){
    var bulk = bulkRequestByVect(vectorGlo);
}
console.log("bulk :::"+type+" \n"+bulk);
if (bulk != "") {
    console.log(bulk);
    sendRequestBulk(bulk,type,existBody);
} else {
    if(type==0 || type==2 || type==3 || type==4){
        addDocs([],type,existBody);
    }else if(type==1){
        addSteps([],existBody);
    }
}
},
error: function (error) {
console.log(error.responseText);
}
});
}

function sumAB(a,b){
var s = [];

for(var i=0;i<a.length;i++){
var somme = Number(a[i])+Number(b[i]);

if(somme==2){
somme = 1;
}

s.push(somme.toString());
};

return s;
};

function countDoc(type,objSearchMatrix) {
$(".simulator .simulator-qr .next-button img").show();
var obj = {
"query": {
"match_all": {}
}
};

if (type == 0 || type == 2 || type == 20) {
var url = ""+simulator_index_docs+"/docs/_count";
} else if (type == 1) {
var url = ""+simulator_index_steps+"/steps/_count";
}

$.ajax({
type: "post",
//  url: "http://localhost:9200/" + url,
url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/"+url,
datatype: "application/json",
contentType: "application/json",
data: obj,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
console.log("result :" + JSON.stringify(result));
console.log(objSearchMatrix);
if(objSearchMatrix==null){
    $(".simulator .simulator-qr .next-button img").hide();
}else{

if (type == 0) {
    var inte = objSearchMatrix.docs;
    var vector = bin2vec(int2bin(inte));
    var vectortest = objSearchMatrix.docSort;
    vector = completVec(result.count, vector);
    var bulk = bulkRequestByVect2(vectortest);
    
    if (bulk != "") {
        console.log(bulk);
        sendRequestBulk(bulkRequestByVect2(vectortest), 0);
    } else {
        addDocs([], 0);
    }

} else if (type == 1) {
    var inte2 = objSearchMatrix.steps;
    var vector2 = bin2vec(int2bin(inte2));
    var vectortest = objSearchMatrix.stepSort;
    console.log("********: "+vector2);
    console.log("********: "+vectortest);
    vector2 = completVec(result.count, vector2);
    //var bulk2 = bulkRequest(vector2, 1);
    var bulk2 = bulkRequestByVect(vectortest);
    console.log(bulk2);
    if (bulk2 != "") {
        console.log(bulk2);
        sendRequestBulk(bulkRequestByVect(vectortest), 1);
    } else {
       // addSteps([]);
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
    
} else if (type == 3) {
    var inte3 = objSearchMatrix.docFacSort;
    var vector3 = bin2vec(int2bin(inte3));
    vector3 = completVec(result.count, vector3);
    var bulk3 = bulkRequest(vector3, 0);
    if (bulk3 != "") {
        console.log(bulk3.length + " ln");
        sendRequestBulk(bulkRequest(vector3, 0), 2);
    } else {
        addDocs([], 2);
    }
    
} else if (type == 4) {
    var inte3 = objSearchMatrix.docSortSort;
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
}
},
error: function (error) {
console.log(error.responseText);
}
})

}

function backClick(){
console.log("######1"+arrayVect[0]);

stopedButton(1);

while(arrayVect[1].length!=1) {
if(arrayVect[1][arrayVect[1].length-1]==0 || arrayVect[1][arrayVect[1].length-1]=="0"){
popArrayVect(undefined);
}else{
break;
}
}

backQst();


startButton(0);
$(".simulator .simulator-qr .next-report").hide();



var qstss = getQstId([].concat(arrayVect[2],-1));
qstArray = [[],[],[]];
console.log(qstss);    
console.log("iter====="+qstss);
for(var i=0;i<qstss[0].length;i++){
if(qstss[0][i]!="-1")addToArrayVect(qstss[0][i],0,0,0);
}

if(arrayVect[0].length==1){
stopedButton(1);
}

endFunctionSendAdv(true);
infoAutorisationSim(false);

getQuestions(qstss[0],qstss[1],qstss[2],0);
}

function backQst(){
if(arrayVect[1].length==1){
popArrayVect(undefined);
}else{
if(arrayVect[3][arrayVect[3].length-1]=="NR" && arrayVect[3][arrayVect[3].length-2]=="NR" ){
popArrayVect(undefined);
}else{
if(arrayVect[3].length==1){
    popArrayVect(undefined);
}else{
    popArrayVect(undefined);
    while (arrayVect[1].length!=1) {
        if(arrayVect[3][arrayVect[3].length-1]!="NR"){
            popArrayVect(undefined);
        }else{
            break;
        }    
    }
}
}
}

}

function addDocs(result,type,existBody){


if(type==0){
reportD.docsR = [];
$(".simulator .docs-qr div.ow-pl").eq(0).addClass("expanded");
var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("docs-container")[0];
}else if(type==2){
reportD.docsC = [];
$(".simulator .docs-qr div.ow-pl").eq(3).addClass("expanded");
var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("docs-comp-container")[0];    
}else if(type==3){
reportD.docsF = [];
$(".simulator .docs-qr div.ow-pl").eq(4).addClass("expanded");
var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("docs-fac-container")[0];                
}else if(type==4){
reportD.docsD = [];
$(".simulator .docs-qr div.ow-pl").eq(5).addClass("expanded");
var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("docs-sort-container")[0];    
}

docContainer.innerHTML="";
var docsTemp = [];

for(var i =0 ; i <result.length;i++){
var doc = document.createElement("div");
doc.setAttribute("class","doc-item");
var icon = document.createElement("i");

if(result[i].hits.hits[0]._source.type=="type-1"){
icon.setAttribute("class","far fa-file-alt");
icon.setAttribute("title","Document ?? num??riser et attacher");
}else{
icon.setAttribute("class","far fa-file-code");
icon.setAttribute("style","color:#f93");
icon.setAttribute("title","Document g??n??r?? par ROKHAS");

}

var docName = document.createElement("span");
var docApr = document.createElement("i");
docApr.setAttribute("style","cursor:pointer");
docApr.setAttribute("class","fas fa-info");
docName.innerHTML = result[i].hits.hits[0]._source.title;
docName.setAttribute("class","doc-name");


var obj = {
"docName":result[i].hits.hits[0]._source.title,
"type":result[i].hits.hits[0]._source.type
};

docsTemp.push(obj);

var srcImg = result[i].hits.hits[0]._source.attachementImg;

if(srcImg != undefined){
var docImg = document.createElement("div");
docImg.setAttribute("style","display:none;position: absolute;width: 327px;background: #EEE;right: 12px;z-index: 1;");
docImg.innerHTML = "<img style=\"width: 100%;border: 1px solid black;\" src="+srcImg+" />";
docApr.addEventListener("mouseenter",function(){
    this.getElementsByTagName("div")[0].style.display = "block";
});
docApr.addEventListener("mouseleave",function(){
    this.getElementsByTagName("div")[0].style.display = "none";
});
docApr.appendChild(docImg);
};

docName.appendChild(docApr);
doc.appendChild(icon);
doc.appendChild(docName);
//doc.appendChild(docApr);
docContainer.appendChild(doc);
}

if(type==0){
reportD.docsR = docsTemp;
reportD.docsRs = docsTemp.length;
if(existBody==false){
$(".simulator .next-report").addClass("docsR");
};
}else if(type==2){
reportD.docsC = docsTemp;
reportD.docsCs = docsTemp.length;
if(existBody==false){
$(".simulator .next-report").addClass("docsC");
};
}else if(type==3){
reportD.docsF = docsTemp;
reportD.docsFs = docsTemp.length;
if(existBody==false){
$(".simulator .next-report").addClass("docsF");
};
}else if(type==4){
reportD.docD = docsTemp;
reportD.docDs = docsTemp.length;
if(existBody==false){
$(".simulator .next-report").addClass("docsD");
};
}

}


function addSteps(result,existBody){
var docContainer = document.getElementsByClassName("simulator")[0].getElementsByClassName("docs-qr")[0].getElementsByClassName("steps-container")[0];
docContainer.innerHTML="";

if(result.length!=0){
$(".simulator .docs-qr div.ow-pl").eq(1).addClass("expanded");
}

reportD.steps=[];

for(var i =0 ; i <result.length;i++){
var doc = document.createElement("div");
doc.setAttribute("class","doc-item");
var icon = document.createElement("span");
icon.setAttribute("class","icon-number");
icon.innerHTML = (i+1);
var docName = document.createElement("span");
docName.innerHTML = result[i].hits.hits[0]._source.title;
docName.setAttribute("class","doc-name");

var obj = {
"stepName":result[i].hits.hits[0]._source.title,
"membre":result[i].hits.hits[0]._source.membress
};

reportD.steps.push(obj);

doc.appendChild(icon);
if(result[i].hits.hits[0]._source.membress != undefined){
for(var j=0;j<result[i].hits.hits[0]._source.membress.length;j++){
    if(result[i].hits.hits[0]._source.membress[j].type=="D"){
        var spa = "<span class=\"membre-span\" onmouseover=\"this.style.background='#38A';this.style.color='#FFF';\" onmouseout=\"this.style.background='';this.style.color='#38A';\" style=\"cursor:pointer;padding: 2px;line-height: 150%;color:#38a;border-color:#38a;\">"+result[i].hits.hits[0]._source.membress[j].membre+"</span>"
    }else{
        var spa = "<span class=\"membre-span\" onmouseover=\"this.style.background='#f93';this.style.color='#FFF';\" onmouseout=\"this.style.background='';this.style.color='#f93';\" style=\"cursor:pointer;padding: 2px;line-height: 150%\">"+result[i].hits.hits[0]._source.membress[j].membre+"</span>"
    }
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

reportD.stepsS = reportD.steps.length;

if(existBody==false){
$(".simulator .next-report").addClass("steps");
};
}

function stopedButton(type){
if(type==0){
$(".simulator .simulator-qr .next-button .next-rq").addClass("stopped");
}else{
$(".simulator .simulator-qr .next-button .back-rq").addClass("stopped");
}
}

function startButton(type){
$(".simulator .simulator-qr .next-report").hide();
$(".error-msg-sim").hide();

if(type==0){
$(".simulator .simulator-qr .next-button .next-rq").removeClass("stopped");
}else{
$(".simulator .simulator-qr .next-button .back-rq").removeClass("stopped");
}
}