
function NQF_remove_subtitle() {
$(".NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").html(`QUESTIONS FREQUENTES`);
}

function PCD_addtitle() {
$(".PCD-addtitle> .ow-pl-toolbar .ow-label-pl:not(:has(>i))").append(`<i class="fas fa-info-circle PCD-tooltip" title="Il s'agit d'indicateurs contextuels représentants la performances relatifs au processus, à l'entité ou à l'utilisateur concerné"/>`)
}
function PCD_headerfieldset_color(pcdClasstype) {
$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl").css("color","#999999");
}

function PCD_add_header_style_action(pcdClasstype, pcdSecondheader){

PCD_headerfieldset_color(pcdClasstype);
$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('karaz/ux/hub/portailsearch/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").append(` | <span class="title-2x" style="color:#38a; ">`+ pcdSecondheader + `</span>`);	

}

function PCD_add_header_style_action_eco(pcdClasstype, pcdSecondheader){
PCD_headerfieldset_color(pcdClasstype);
$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('karaz/ux/hub/portailsearch/search/proceduresEconomique', 'search', 'procedures Economique', {});");
$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").append(` | <span class="title-2x" style="color:#38a; ">`+ pcdSecondheader + `</span>`);	
}

/* start procedure  */

/* start NQF */
function PCD_header_style_quest_type(qtypeCls, fontAwsCls){

$(qtypeCls+"> .ow-pl-toolbar .ow-label-pl:not(:has(>i))").prepend('<i class="'+fontAwsCls+' NFQ-fa-style" />')

}




function NQF_edit(type,clas) {
if(type == 1){
let question = $("."+clas+" .NQF-vue-question .NQF-prev-quest b").text();

let resp = $("."+clas+" .NQF-prev-resp").html();
let categ = $("."+clas+" .NQF-categorie").val();
let ID = $("."+clas+" .NQF-id").val();
console.log(ID)

$(".NQF-edit-float .ow-field-container.ow-field-text-container").addClass("focusedInput");
$('.ow-field-input[data-xpath="question"]').val(question);
if (categ == "E-SIGN") {
$("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
$("."+clas+' .ow-field-input-select[data-xpath="categ"]').text("Signature électronique");
} else if (categ == "GENERAL") {
$("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
$("."+clas+' .ow-field-input-select[data-xpath="categ"]').text("Général");
} else if (categ == "DOCUMENT") {
$("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
$("."+clas+' .ow-field-input-select[data-xpath="categ"]').text("Document");
} else if (categ == "PLATEFORME") {
$("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
$("."+clas+' .ow-field-input-select[data-xpath="categ"]').text("Plateforme");
} else if (categ == "ARCHITECTE") {
$("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
$("."+clas+' .ow-field-input-select[data-xpath="categ"]').text("Architecte");
} else if (categ == "ADMINISTRATION") {
$("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
$("."+clas+' .ow-field-input-select[data-xpath="categ"]').text("Administration");
}

$("."+clas+'  .ql-editor').html(resp)
$("."+clas+" .NQF-edit-modif").show();
$("."+clas+" .NQF-btn-alg").hide();
} else if(type == 2){
// add edit here

}
}


function NQF_preview_QR(type,clas,dataroot,target) {

    let title = target.find('.'+clas+' .ow-field-input[data-xpath="NQFtitle"]').val();
    let typee = target.find('.'+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text();
    let categ = target.find('.'+clas+' .ow-field-input-select[data-xpath="NQFcategorie"]').text();
    let lang = target.find('.'+clas+' .ow-field-input-select[data-xpath="NQFlang"]').text();
    let author = target.find('.'+clas+' .ow-field-input[data-xpath="NQFauthor"]').val();
    if(categ=="REVUE DE PRESSE"){
        var source = target.find('.'+clas+' .ow-field-input[data-xpath="NQFsource"]').val();
        var link = target.find('.'+clas+' .ow-field-input[data-xpath="NQFlink"]').val();
    }else{
        var source = "";
        var link = "";
    }

    let tags = target.find('.'+clas+' .ow-field-input[data-xpath="NQFtags"]').val();
    let texte = target.find('.'+clas+'  .ql-editor').html();
    let description = target.find('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 

    if(dataroot.attachementArImg.gedId!=""){  
        imgUrl = "/karazal/DownloadFile?gedId="+dataroot.attachementArImg.gedId+"";
    }
    target.find("."+clas+" .NQF-vue-question .vue-video-frame").html("<img src="+imgUrl+" width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
    target.find("."+clas+" .NQF-vue-question .vue-video-title b").html(title);
    target.find("."+clas+" .NQF-vue-question .vue-video-description").html(description);
    target.find("."+clas+" .NQF-vue-video").show();
    target.find("."+clas+" .NQF-btn-alg").hide();
    target.find("."+clas+" .NQF-vue-question").show();

}

function NQF_new_QR(type,clas,target) {

if(type == 1){
//add header
// $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
target.find("."+clas+" .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").html(`NOUVELLE QUESTIONS FREQUENTES `);

target.find("."+clas+' .ow-field-input[data-xpath="question"]').val("");
target.find("."+clas+' .ow-field-input-select[data-xpath="categ"]').text("");
target.find("."+clas+'  .ql-editor').text("")
target.find("."+clas+" .NQF-id").val("");


target.find("."+clas+" .NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput");
target.find("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput");


target.find("."+clas+" .NQF-vue-question").hide();
} else if(type == 2){
target.find("."+clas+" .NQF-titre-ref > .ow-pl-toolbar .ow-label-pl").html(`NOUVEAU RÉFÉRENTIEL JURIDIQUE`);


target.find("."+clas+' .ow-field-input[data-xpath="NQFtitle"]').val("");
target.find("."+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text("");
target.find("."+clas+' .NFQ-desc-refjuridique textarea').val("");
target.find("."+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html("")
target.find("."+clas+" .NQF-id-ref").val("");


target.find("."+clas+" .NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput filledInput");
target.find("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput");
target.find("."+clas+" .ow-field-textArea-container:has(.NFQ-desc-refjuridique)").removeClass("filledInput")

target.find("."+clas+" .NQF-vue-ref").hide();
}

}


function verifieVideo(clas){
var vr = true; 
let title = $("."+clas+' .ow-field-input[data-xpath="title"]').val();
let categ = $("."+clas+' .ow-field-input-select[data-xpath="categ"]').text();
let urlV = $("."+clas+' .ow-field-input[data-xpath="url"]').val();
let description = $("."+clas+' .ow-field-input-line textarea[data-xpath="description"]').val(); 
let playlist = $("."+clas+' .ow-field-input-select[data-xpath="playlist"]').text();

if(title.trim()==""){
alert("Veuillez saisir le titre de vidéo");
return false;
}

if(categ.trim()==""){
alert("Veuillez selectionner la plateforme d'hébergement de vidéo !");
return false;
}

if(urlV.trim()==""){
alert("Veuillez saisir le lien de vidéo !");
return false;
}

return vr;
}


function verifieArticle(clas,root,target){
var vr = true;  
let title = target.find('.'+clas+' .ow-field-input[data-xpath="NQFtitle"]').val();
let typee = target.find('.'+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text();
let categ = target.find('.'+clas+' .ow-field-input-select[data-xpath="NQFcategorie"]').text();
let lang = target.find('.'+clas+' .ow-field-input-select[data-xpath="NQFlang"]').text();
let author = target.find('.'+clas+' .ow-field-input[data-xpath="NQFauthor"]').val();
let tags = target.find('.'+clas+' .ow-field-input[data-xpath="NQFtags"]').val();
let texte = target.find('.'+clas+'  .ql-editor').html();
let description = target.find('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 
let source = target.find('.'+clas+' .ow-field-input[data-xpath="NQFsource"]').val();
let link = target.find('.'+clas+' .ow-field-input[data-xpath="NQFlink"]').val();    
var attachement = root.attachementArImg;

if(title.trim()==""){
alert("Veuillez saisir le titre de l'article");
return false;
}

if(categ.trim()==""){
alert("Veuillez selectionner le type d'article !");
return false;
}

if(typee.trim()==""){
alert("Veuillez selectionner la categorie d'article !");
return false;
}

if(attachement.gedId.trim()==""){
alert("Veuillez ajouter l'image principale de l'article !");
return false;
}

if(categ=="REVUE DE PRESSE"){
if(source.trim()==""){
    alert("Veuillez ajouter source de l'article !");
    return false;
}
if(link.trim()==""){
    alert("Veuillez ajouter lien de l'article !");
    return false;
}   
}

return vr;
}

function verifieDownload(clas,root){
var vr = true; 
let title = $("."+clas+' .ow-field-input[data-xpath="title"]').val();
let categ = $("."+clas+' .ow-field-input-select[data-xpath="categ"]').text();
let urlV = $("."+clas+' .ow-field-input[data-xpath="url"]').val();
let description = $("."+clas+' .ow-field-input-line textarea[data-xpath="description"]').val(); 
let playlist = $("."+clas+' .ow-field-input-select[data-xpath="playlist"]').text();

if(title.trim()==""){
alert("Veuillez saisir le titre de vidéo");
return false;
}

if(categ.trim()==""){
alert("Veuillez selectionner le type d'attachement !");
return false;
}

if(urlV.trim()=="" && root.attachement.gedId==""){
alert("Veuillez saisir le lien de l'attachement ou attacher un fichier !");
return false;
}

return vr;
}

function NQF_save_QR(type,root,target) {
	if (type == 1) {
	var clas = "classSearch-5";

	let question = target.find("."+clas+' .ow-field-input[data-xpath="question"]').val();
	let categ = target.find("."+clas+' .ow-field-input-select[data-xpath="categ"]').text();
	let resp = target.find("."+clas+'  .ql-editor').html()
	let ID = target.find("."+clas+" .NQF-id").val();
	let visibility = root.visibility;

	if(visibility.trim()==""){
	    visibility = "ADMIN";
	}


	target.find("."+clas+" .NQF-vue-question .NQF-prev-quest >b").text(question);
	target.find("."+clas+" .NQF-prev-resp").html(resp);

	var req = {
	    "QUESTIONS": "",
	    "REPONSES": "",
	    "type": "",
	    "visibility":""
	}

	req.QUESTIONS = question;
	req.REPONSES = resp;
	req.type = categ;
	req.visibility = visibility;

	// type
	if (categ == "Signature électronique") {
	    req.type = "E-SIGN";
	} else if (categ == "Général") {
	    req.type = "GENERAL";
	} else if (categ == "Document") {
	    req.type = "DOCUMENT";
	} else if (categ == "Plateforme") {
	    req.type = "PLATEFORME";
	} else if (categ == "Architecte") {
	    req.type = "ARCHITECTE";
	} else if (categ == "Administration") {
	    req.type = "ADMINISTRATION";
	}

	//
	console.log(req, ID);
	if (req.QUESTIONS != "" && req.REPONSES != "" && req.type != "") {

	    console.log(req, ID);
	    updateQuestionNQF(ID, req,target);
	    
	    if (target.find("."+clas+" .ow-btn-container:has(> i)").length == 0) {
	        target.find("."+clas+" .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
	    }
	    
	    setTimeout(function () {
	        target.find("."+clas+" .ow-btn-container i.fa-check").remove()
	        target.find("."+clas+" .NQF-edit-modif").hide()
	        target.find("."+clas+" .NQF-new-quest-btn").show();
	        target.find("."+clas+" .NQF-vue-question").show();
	    }, 2000);
	    
	    
	} else {
	    alert("verifier que tout les champs sont bien remplis");
	    target.find("."+clas+" .NQF-vue-question").hide();
	}

	} else if(type == 2){

	var clas = "classSearch-3";

	// let title = $('.'+clas+' .ow-field-input[data-xpath="NQFtitle"]').val();
	// let categ = $('.'+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text();
	// let texte = $('.'+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html();
	// let typee = $('.'+clas+' .ow-field-input-select[data-xpath="NQFtypeRef"]').text();
	// let description = $('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 

	let title = root.NQFtitle;
	let categ = root.NQFtype;
	let texte = root.NQFtext;
	let typee = root.NQFtypeRef;
	let description = target.find('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 

	if(title.trim()=="" || categ.trim()=="" || typee.trim()=="" ){
	    alert("verifier que tout les champs sont bien remplis");
	    return; 
	}

	var attachement = root.attachementRef;
	if(attachement.gedId.trim()!=""){ 
	    var urlV = "/karazal/DownloadFile?gedId="+attachement.gedId;
	}else{
	    var urlV = "";
	}

	var attachement2 = root.attachementRefAr;
	if(attachement2.gedId.trim()!=""){
	    var urlV2 = "/karazal/DownloadFile?gedId="+attachement2.gedId;
	}else{
	    var urlV2 = "";
	}

	console.log(title, categ, texte, description)
	var T = 0;
	if(categ == "Urbanisme"){
	    T = 2; 
	} else if(categ == "Economique"){
	    T = 1;
	} else if(categ=="Autre"){
	    T = 3;
	}
	let id = "";
	id = $("."+clas+" .NQF-id-ref").val();
	$("."+clas+" .NQF-title-ref").text(title);
	$("."+clas+" .NQF-desc-ref").text(description);
	$("."+clas+" .NQF-text-ref").html(texte);

	var req = {
	    "title": "",
	    "type": "",
	    "content": "",
	    "desc":"",
	    "attachementRef":"",
	    "urlV":"",
	    "attachementRefAr":"",
	    "urlV2":"",
	    "typeRef":""
	};

	req.title = title;
	req.type = T.toString();
	req.content = texte;
	req.desc = description;
	req.urlV = urlV;
	req.urlV2 = urlV2;
	req.attachementRef = attachement;
	req.attachementRefAr = attachement2;
    req.typeRef = typee;
    try{
        req.decsCnt = htmlToString(texte);
    }catch(e){
    }

	console.log(req, id);

	//
	if (target.find("."+clas+" .ow-btn-container:has(> i)").length == 0) {
	    target.find("."+clas+" .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
	}
	setTimeout(function () {
	    target.find("."+clas+" .ow-btn-container i.fa-check").remove()
	    target.find("."+clas+" .NQF-edit-modif").hide()
	    target.find("."+clas+" .NQF-new-quest-btn").show();
	    target.find("."+clas+" .NQF-vue-ref").show();
	    target.find("."+clas+" .NQF-btn-alg").hide();
	}, 2000);

	updateReglementation(id,req,target);
	}else if(type==3){
	var clas = "classSearch-6";
	let title = $('.'+clas+' .ow-field-input[data-xpath="title"]').val();
	let categ = $('.'+clas+' .ow-field-input-select[data-xpath="categ"]').text();
	let urlV  = $('.'+clas+' .ow-field-input[data-xpath="url"]').val();
	let description = $('.'+clas+' .ow-field-input-line textarea[data-xpath="description"]').val(); 
	let playlist = $('.'+clas+' .ow-field-input-select[data-xpath="playlist"]').text();
	let tag = $('.'+clas+' .ow-field-input-select[data-xpath="tag"]').text();

	if(categ=="Vimeo"){
	    var video_id = urlV.match(/\/\d+/)[0].replace(/\//g,""); 
	}else if(categ=="Youtube"){
	    var video_id = urlV.match(/v=\w+[&]*/)[0].replace("v=",'');; 
	}

	if(playlist.trim()==""){
	    playlist = "Général";
	}

	if(tag.trim()==""){
	    tag = "without_tag";
	}

	var current_datetime = new Date();

	var dateYear = current_datetime.getFullYear();
	var dateMonths = (current_datetime.getMonth() + 1).toString().length==1?"0"+(current_datetime.getMonth() + 1):(current_datetime.getMonth() + 1);
	var dateDays = current_datetime.getDate().toString().length==1?"0"+current_datetime.getDate():current_datetime.getDate();

	var hours = current_datetime.getHours().toString().length==1?"0"+current_datetime.getHours():current_datetime.getHours();
	var minutes = current_datetime.getMinutes().toString().length==1?"0"+current_datetime.getMinutes():current_datetime.getMinutes();
	var seconds = current_datetime.getSeconds().toString().length==1?"0"+current_datetime.getSeconds():current_datetime.getSeconds();

	var formatted_date = dateYear + "-" + dateMonths + "-" + dateDays + " " + hours + ":" + minutes + ":" + seconds+"";

	var req = {
	    "title": title,
	    "plateforme": categ,
	    "url": urlV,
	    "playlist":playlist,
	    "description":description,
	    "video_id":video_id,
	    "img_url":"",
	    "tag":tag,
	    "date": formatted_date,
	};

	let id = "";
	id = $(".NQF-id-ref").val();
	if(categ=="Vimeo"){
	    $.ajax({
	        type:'GET',
	        url: 'https://vimeo.com/api/v2/video/' + video_id + '.json',
	        jsonp: 'callback',
	        dataType: 'jsonp', 
	        success: function(data){
	            var thumbnail_src = data[0].thumbnail_large;
	            req.img_url = thumbnail_src;
	            if ($("."+clas+" .ow-btn-container:has(> i)").length == 0) {
	                $("."+clas+" .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
	            }

	            
	            var urlemb = "https://player.vimeo.com/video/"+urlV.match(/\/\d+/)[0].replace(/\//g,"");
	            console.log(urlemb);
	            $("."+clas+" .NQF-vue-question .vue-video-frame").html("<iframe src="+urlemb+" width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
	            $("."+clas+" .NQF-vue-question .vue-video-title b").html(title);
	            $("."+clas+" .NQF-vue-question .vue-video-description").html(description);
	            
	            setTimeout(function () {
	                $("."+clas+" .ow-btn-container i.fa-check").remove()
	                $("."+clas+" .NQF-edit-modif").hide()
	                $("."+clas+" .NQF-new-quest-btn").show();
	                $("."+clas+" .NQF-vue-ref").show();
	                $("."+clas+" .NQF-btn-alg").hide();
	                $("."+clas+" .NQF-vue-question").show();
	                
	                getAllplayLists(1,100,clas);

	            }, 2000);
	            
	            updateVideo(req.video_id,req);
	        }
	    });

	}else if(categ=="Youtube"){
	    
	    
	            req.img_url = "https://img.youtube.com/vi/"+req.video_id+"/0.jpg";
	            
	            if ($("."+clas+" .ow-btn-container:has(> i)").length == 0) {
	                $("."+clas+" .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
	            }

	            
	            var urlemb = "https://www.youtube.com/embed/"+req.video_id;
	            console.log(urlemb);
	            $("."+clas+" .NQF-vue-question .vue-video-frame").html("<iframe src="+urlemb+" width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
	            $("."+clas+" .NQF-vue-question .vue-video-title b").html(title);
	            $("."+clas+" .NQF-vue-question .vue-video-description").html(description);
	            
	            setTimeout(function () {
	                $("."+clas+" .ow-btn-container i.fa-check").remove()
	                $("."+clas+" .NQF-edit-modif").hide()
	                $("."+clas+" .NQF-new-quest-btn").show();
	                $("."+clas+" .NQF-vue-ref").show();
	                $("."+clas+" .NQF-btn-alg").hide();
	                $("."+clas+" .NQF-vue-question").show();
	                
	                getAllplayLists(1,100,clas);

	            }, 2000);
	            
	            updateVideo(req.video_id,req);
	}


	}else if(type==4){
	var clas = "classSearch-11";
	let title = $('.'+clas+' .ow-field-input[data-xpath="title"]').val();
	let categ = $('.'+clas+' .ow-field-input-select[data-xpath="categ"]').text();
	let urlV  = $('.'+clas+' .ow-field-input[data-xpath="url"]').val();
	let description = $('.'+clas+' .ow-field-input-line textarea[data-xpath="description"]').val(); 
	let playlist = $('.'+clas+' .ow-field-input-select[data-xpath="playlist"]').text();
	let text = $('.'+clas+' .ql-editor').html();
	var imgUrl = $('.'+clas+' .ow-field-input[data-xpath="imgUrl"]').val();
	console.log("root.attachement== "+root.attachement);
	var attachement = root.attachement;
	var attachementImg = root.attachementImg;
	console.log("saveeeeeeeeee : "+attachement);

	if(attachementImg.gedId!=""){
	    imgUrl = "/karazal/DownloadFile?gedId="+attachementImg.gedId+"";
	}

	if(playlist.trim()==""){
	    playlist = "Général";
	}


	var current_datetime = new Date();

	var dateYear = current_datetime.getFullYear();
	var dateMonths = (current_datetime.getMonth() + 1).toString().length==1?"0"+(current_datetime.getMonth() + 1):(current_datetime.getMonth() + 1);
	var dateDays = current_datetime.getDate().toString().length==1?"0"+current_datetime.getDate():current_datetime.getDate();

	var hours = current_datetime.getHours().toString().length==1?"0"+current_datetime.getHours():current_datetime.getHours();
	var minutes = current_datetime.getMinutes().toString().length==1?"0"+current_datetime.getMinutes():current_datetime.getMinutes();
	var seconds = current_datetime.getSeconds().toString().length==1?"0"+current_datetime.getSeconds():current_datetime.getSeconds();

	var formatted_date = dateYear + "-" + dateMonths + "-" + dateDays + " " + hours + ":" + minutes + ":" + seconds+"";

	var req = {
	    "title": title,
	    "plateforme": categ,
	    "url": urlV,
	    "playlist":playlist,
	    "description":description,
	    "img_url":imgUrl,
	    "date": formatted_date,
	    "attachement":attachement,
	    "attachementImg": attachementImg,
	    "text":text
	};

	if(attachement.gedId==""){    
	    if(imgUrl.trim()!=""){
	        $("."+clas+" .NQF-vue-question .vue-video-frame").html("<img src="+imgUrl+" width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
	    }else{
	        if(categ=="DOC"){
	            $("."+clas+" .NQF-vue-question .vue-video-frame").html("<i class=\"fas fa-file-download\" style=\"font-size: 9VW;padding-top: 28px;padding-bottom: 28px;color: #38A;\"></i>")
	        }else if(categ=="INSTALL"){
	                $("."+clas+" .NQF-vue-question .vue-video-frame").html("<i class=\"fas fa-download\" style=\"font-size: 9VW;padding-top: 28px;padding-bottom: 28px;color: #38A;\"></i>")
	        }
	    }
	}else{
	    var krn = attachement.gedId.split("/")[0];
	    var str = '<div class="docthumbnail"><img class="smallThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=small&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="'+contextPath+'/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=large&amp;or=img/no-file.svg"></div>';
	}

	let id = "";
	id = $("."+clas+" .NQF-id").val();

	$("."+clas+" .NQF-vue-question .vue-video-title b").html(title);
	$("."+clas+" .NQF-vue-question .vue-video-description").html(description);
	setTimeout(function () {
	    $("."+clas+" .ow-btn-container i.fa-check").remove()
	    $("."+clas+" .NQF-edit-modif").hide()
	    $("."+clas+" .NQF-new-quest-btn").show();
	    $("."+clas+" .NQF-vue-ref").show();
	    $("."+clas+" .NQF-btn-alg").hide();
	    $("."+clas+" .NQF-vue-question").show();
	    
	    getAllplayListsD(1,100,clas,target);

	}, 2000);

	updatePlaylist(id,req);

	}else if(type==7){
	var clas = "classSearch-99";

	// let title = $('.'+clas+' .ow-field-input[data-xpath="NQFtitle"]').val();
	// let typee = $('.'+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text();
	// let categ = $('.'+clas+' .ow-field-input-select[data-xpath="NQFcategorie"]').text();
	// let author = $('.'+clas+' .ow-field-input[data-xpath="NQFauthor"]').val();
	// let tags = $('.'+clas+' .ow-field-input[data-xpath="NQFtags"]').val();
	// let texte = $('.'+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html();
	// let description = $('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 

	if(root.articleCms != ""){
	    console.log("articleCms!=null");
	    var title = root.NQFtitle;
	    var typee = root.NQFtype;
	    var categ = root.NQFcategorie;
	    var author = root.NQFauthor;
	    var tags = root.NQFtags;
	    var lang = root.NQFlang;
	    var source = root.NQFsource;
	    var link = root.NQFlink;
	    var texte = target.find('.'+clas+'  .ql-editor').html();
	    var description = target.find('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 
	    var attachement = root.attachementArImg;

	    if(attachement.gedId.trim()!=""){
	        var urlV = "/karazal/DownloadFile?gedId="+attachement.gedId;
	    }else{
	        var urlV = "";
	    }

	    var formatted_date = root.articleCms.datePr;
	    var vue = root.articleCms.vue;
	    var like=root.articleCms.like;
	    var comments=root.articleCms.comments;
	    var list_vue=root.articleCms.list_vue;
	    var liste_like=root.articleCms.liste_like;

	}else{
	    var title = root.NQFtitle;
	    var typee = root.NQFtype;
	    var categ = root.NQFcategorie;
	    var lang = root.NQFlang;
	    var author = root.NQFauthor;
	    var tags = root.NQFtags;
	    var source = root.NQFsource;
	    var link = root.NQFlink;
	    var texte = target.find('.'+clas+'  .ql-editor').html();
	    var description = target.find('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 
	    var attachement = root.attachementArImg;
	    if(attachement.gedId.trim()!=""){
	        var urlV = "/karazal/DownloadFile?gedId="+attachement.gedId;
	    }else{
	        var urlV = "";
	    }

	    var current_datetime = new Date();

	    var dateYear = current_datetime.getFullYear();
	    var dateMonths = (current_datetime.getMonth() + 1).toString().length==1?"0"+(current_datetime.getMonth() + 1):(current_datetime.getMonth() + 1);
	    var dateDays = current_datetime.getDate().toString().length==1?"0"+current_datetime.getDate():current_datetime.getDate();

	    var hours = current_datetime.getHours().toString().length==1?"0"+current_datetime.getHours():current_datetime.getHours();
	    var minutes = current_datetime.getMinutes().toString().length==1?"0"+current_datetime.getMinutes():current_datetime.getMinutes();
	    var seconds = current_datetime.getSeconds().toString().length==1?"0"+current_datetime.getSeconds():current_datetime.getSeconds();
	    
	    var formatted_date = dateYear + "-" + dateMonths + "-" + dateDays + " " + hours + ":" + minutes + ":" + seconds+"";

	    var vue = 0;
	    var like=0;
	    var comments=[];
	    var list_vue=[];
	    var liste_like=[];

	}








	console.log(title, categ, texte, description)

	let id = "";

	id = target.find("."+clas+" .NQF-id").val();

	/*$("."+clas+" .NQF-title-ref").text(title);
	$("."+clas+" .NQF-desc-ref").text(description);
	$("."+clas+" .NQF-text-ref").html(texte);
	*/

	var req = {
	    "title": "",
	    "type": "",
	    "content": "",
	    "description":"",
	    "attachementRef":"",
	    "imgP":"",
	    "datePr":"",
	    "categorie":"",
	    "author":"",
	    "tags":"",
	    "tagsText":"",
	    "vue":0,
	    "like":0,
	    "comments":[],
	    "list_vue":[],
	    "liste_like":[],
	    "source":"",
	    "link":"",
	    "lang":""
	};



	req.title = title;
	req.type = categ;
	req.content = texte;
	req.description = description;
	req.imgP = urlV;
	req.attachementRef = attachement;
	req.categorie = typee;
	req.datePr = formatted_date;
	req.author = author;
	req.tagsText = tags;
	req.vue= vue;
	req.like= like;
	req.source = source;
	req.link = link;
	req.comments= comments;
	req.list_vue= list_vue;
	req.liste_like= liste_like;
	req.lang=lang;

	var ttg = tags.split("//"); 
	var tagsArr = [];

	ttg.forEach(function(elm){
	    var tagObj = {
	        "tag":elm,
	        "id":""
	    };
	    tagsArr.push(tagObj);
	})

	req.tags = tagsArr;

	target.find("."+clas+" .NQF-vue-question .vue-video-frame").html("<img src="+urlV+" width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
	target.find("."+clas+" .NQF-vue-question .vue-video-title b").html(title);
	target.find("."+clas+" .NQF-vue-question .vue-video-description").html(description);
	            

	console.log(req, id);

	//
	if (target.find("."+clas+" .ow-btn-container:has(> i)").length == 0) {
	    target.find("."+clas+" .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
	}

	setTimeout(function () {
	    target.find("."+clas+" .ow-btn-container i.fa-check").remove()
	    target.find("."+clas+" .NQF-edit-modif").hide()
	    target.find("."+clas+" .NQF-new-quest-btn").show();
	    target.find("."+clas+" .NQF-vue-video").show();
	    target.find("."+clas+" .NQF-btn-alg").hide();
	}, 2000);
	console.log(req);
	updateArticle(id,req,target,root);
	}
	}
 

function NQF_add_question(quest, id, cls, type,target) {
var clas = "classSearch-5";
// console.log(id);
if (type == 1) {
var div = document.createElement("div");
div.setAttribute("idd",id);
var div2 = document.createElement("div");
div2.setAttribute("class","vpanel-body-title NQF-quest-delete");
div2.setAttribute("style","font-size: 14px;");
var span1 = document.createElement("span");
span1.setAttribute("class","NFQ-click-btn");
span1.innerHTML = quest;
span1.addEventListener("click",function(){
    getQsFaq(id,0,clas,target);
});
var span2 = document.createElement("span");
span2.setAttribute("class","far fa-times-circle NFQ-close-quest");
span2.addEventListener("click",function(){
    getQsFaq(id,0,clas,target);
    removeQuestionNFQ(id,"/"+faq_index+"/qr/")
});
var hr = document.createElement("hr");
hr.setAttribute("class","NQF-horizontal-line");
div2.appendChild(span1);
div2.appendChild(span2);
div.appendChild(div2);
div.appendChild(hr);
target.find(cls + ":not(:has(>.NFQ-end))").append(div);

} else if (type == 2 || type ==3) {

 if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/)=='ADMINISTRATEUR'){
    var str = `toModifyFaq("${id}")`; 
}else{
    var str = `ApplicationManager.run("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject=${id}","search", "FaqDetail", {});`
} 

target.find(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt">
<div class="vpanel-body-title " style="font-size: 14px;">
    <span class = 'NFQ-click-btn' onclick='javascript:`+str+`' >` + quest + `</span>
</div>
<hr class="NQF-horizontal-line " />

</div>`)
}

}


function viderUrl(type,root,context){
if(type==0){
var attachement = root.attachement;
console.log("Emptyyyyyyyyyyy:"+JSON.stringify(attachement));
root.attachement.fileId = "";
root.attachement.gedId = "";
root.url = "";
context.formRender.notifyObservers("attachement");
attachement = root.attachement;
console.log(attachement);

}else if(type==1){
var attachement = root.attachementImg;
console.log(attachement);
root.attachementImg.fileId = "";
root.attachementImg.gedId = "";
root.imgUrl = "";
context.formRender.notifyObservers("attachementImg");
attachement = root.attachement;
console.log(attachementImg);
}
}



function updateQuestionNQF(id, obj,target) {

let newID = ""
if (id != "") {
newID = id;
}
$.ajax({
type: "post",

url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/"+faq_index+"/qr/" + newID,
datatype: "application/json",
data: JSON.stringify(obj),
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    $(".NQF-id").val(result._id);
    voidRestSearch("",0,5,0,[".NFQ-quest-type-document",".NFQ-quest-type-plat",".NFQ-quest-type-general",".NFQ-quest-type-esign",".NFQ-quest-type-archit",".NFQ-quest-type-adminis"],1,target);
    console.log(result);
},
error: function (error) {
    console.log(error.responseText);
}
});

}

function updateReglementation(id, obj,target) {


let newID = ""
if (id != "") {
newID = id;
}
$.ajax({
type: "post",

url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/reglementation_index/reglementation/" + newID,
datatype: "application/json",
data: JSON.stringify(obj),
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0,target);
    console.log(result);
},
error: function (error) {
    console.log(error.responseText);
}
});

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
    
    console.log(JSON.stringify(obj));
    
    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/"+index+"/_search",
    contentType: "application/json",
    datatype:"application/json",
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
     xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
    console.log(result);
  
        createListeRes(inp,result.hits.hits,req,2);
   
    },
    error: function (error) {
    console.log(error.responseText);
    }
    });    
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
        
        var str = arr[i]._source.title;
        
        
        b.setAttribute("title",str);
        if(val==""){
        b.innerHTML=str.toLowerCase();
        }else{
        b.innerHTML=addSpansHL(val.toLowerCase(),str.toLowerCase());
        }
        
        if(type==1){
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


function getCountArticles(cls){

var str = "{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{ \"size\":0,\"query\": { \"match_all\": {}}}\n{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{ \"size\":0,\"query\": { \"term\": { \"type.keyword\":\"PRATIQUE\" }}}\n{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{ \"size\":0,\"query\": { \"term\": { \"type.keyword\":\"A LA UNE\" }}}\n{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{ \"size\":0,\"query\": { \"term\": { \"type.keyword\":\"REVUE DE PRESSE\" }}}\n";

$.ajax({
type: "post",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data:str,
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    //voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0);
    var count_all = result.responses[0].hits.total.value;
    var count_astuce = result.responses[1].hits.total.value;
    var count_alaune = result.responses[2].hits.total.value;
    var count_avenir = result.responses[3].hits.total.value;

    $("."+cls+" .article-categorie li.li-1 span").html("("+count_all+")");
    $("."+cls+" .article-categorie li.li-2 span").html("("+count_astuce+")");
    $("."+cls+" .article-categorie li.li-3 span").html("("+count_alaune+")");
    $("."+cls+" .article-categorie li.li-4 span").html("("+count_avenir+")");


},
error: function (error) {
    console.log(error.responseText);
}
});




}

function updateArticle(id, obj,target,root) {


let newID = ""
if (id != "") {
newID = id;
}
$.ajax({
type: "post",

url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/" + newID,
datatype: "application/json",
data: JSON.stringify(obj),
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    //voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0);
    setTimeout(function(){
        RestSearchArticleSec("", 0, 5, ["PRATIQUE","A LA UNE","REVUE DE PRESSE"], 2, [".vv1 .NFQ-quest-type-astuce",".vv1 .NFQ-quest-type-alune",".vv1 .NFQ-quest-type-avenir"],0,"classSearch-99",target,root)
    },2000);
    console.log(result);
},
error: function (error) {
    console.log(error.responseText);
}
});

}

function updateVideo(id, obj) {
let newID = ""
if (id != "") {
newID = id;
}
$.ajax({
type: "post",

url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/"+videos_index+"/video/" + newID,
datatype: "application/json",
data: JSON.stringify(obj),
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    
    //voidRestSearch("",0,7,0,[".NFQ-quest-type-eco",".NFQ-quest-type-urba"],0);
    console.log(result);
    
},
error: function (error) {
    console.log(error.responseText);
}
});

}

function updatePlaylist(id, obj) {
let newID = ""
if (id != "") {
newID = id;
}

$.ajax({
type: "POST",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/attachements_index/attachement/" + newID,
datatype: "application/json",
data: JSON.stringify(obj),
contentType: "application/json",
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    //voidRestSearch("",0,7,0,[".NFQ-quest-type-eco",".NFQ-quest-type-urba"],0);
    console.log(result);
},
error: function (error) {
    console.log(error.responseText);
}
});

}

function voidRestSearch(prefix, page, size, type, cls, atr,target){
$(".faq-vbox .no-response-find").hide();
if(atr==0){
    var str = ""

    if (type == 0) {
        str += generateRequestRefSearch(prefix, "1", page, size);
        str += generateRequestRefSearch(prefix, "2", page, size);
    } else if (type == 1) {
        str += generateRequestRefSearch(prefix, "1", page, size);
    } else if (type == 2) {
        str += generateRequestRefSearch(prefix, "2", page, size);
    }

}else{

var str = "";
if (type == 0) {
    $(".vv2 .faq-fieldset").hide();
    str += generateRequestFaqSearch(prefix, "DOCUMENT", page, size);
    str += generateRequestFaqSearch(prefix, "PLATEFORME", page, size);
    str += generateRequestFaqSearch(prefix, "GENERAL", page, size);
    str += generateRequestFaqSearch(prefix, "E-SIGN", page, size);
    str += generateRequestFaqSearch(prefix, "ARCHITECTE", page, size);
    str += generateRequestFaqSearch(prefix, "ADMINISTRATION", page, size);
} else if (type == 1) {
    str += generateRequestFaqSearch(prefix, "DOCUMENT", page, size);
} else if (type == 2) {
    str += generateRequestFaqSearch(prefix, "PLATEFORME", page, size);
} else if (type == 3) {
    str += generateRequestFaqSearch(prefix, "GENERAL", page, size);
} else if (type == 4) {
    str += generateRequestFaqSearch(prefix, "E-SIGN", page, size);
} else if (type == 5) {
    str += generateRequestFaqSearch(prefix, "ARCHITECTE", page, size);
} else if (type == 6) {
    str += generateRequestFaqSearch(prefix, "ADMINISTRATION", page, size);
}
}

$.ajax({
type: "post",
//url: "http://localhost:9200/_msearch",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data: str,
beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
    console.log("go ...! "+result);

    if(atr==0){
        setTimeout(function () {
            RestSearchref("",0,7,0,1,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1",".vv1 .NFQ-quest-type-autre1"],"classSearch-3",target);
        }, 1000);
    }else{
        setTimeout(function () {
            RestSearchFaqSec("",0,5,0,[".vv1 .NFQ-quest-type-document",".vv1 .NFQ-quest-type-plat",".vv1 .NFQ-quest-type-general",".vv1 .NFQ-quest-type-esign",".vv1 .NFQ-quest-type-archit",".vv1 .NFQ-quest-type-adminis"],1,null,target);
            RestSearchFaqSec("",0,5,0,[".vv1 .NFQ-quest-type-document1",".vv1 .NFQ-quest-type-plat1",".vv1 .NFQ-quest-type-general1",".vv1 .NFQ-quest-type-esign1",".vv1 .NFQ-quest-type-archit1",".vv1 .NFQ-quest-type-adminis1"],2,null,target);    
        }, 1000);
    }
},error: function (error) {
    console.log(error);
}
})
}

function RestSearchFaqSec(prefix, page, size, type, cls, atr,typee,target) {

var str = ""
//$(".faq-vbox .no-response-find").hide();

if (type == 0) {
target.find(".vv2 .faq-fieldset").hide();
str += generateRequestFaqSearch(prefix, "DOCUMENT", page,size,typee);
str += generateRequestFaqSearch(prefix, "PLATEFORME", page,size,typee);
str += generateRequestFaqSearch(prefix, "GENERAL", page,size,typee);
str += generateRequestFaqSearch(prefix, "E-SIGN", page,size,typee);
str += generateRequestFaqSearch(prefix, "ARCHITECTE", page,size,typee);
str += generateRequestFaqSearch(prefix, "ADMINISTRATION", page,size,typee);
} else if (type == 1) {
str += generateRequestFaqSearch(prefix, "DOCUMENT", page,size,typee);
} else if (type == 2) {
str += generateRequestFaqSearch(prefix, "PLATEFORME", page,size,typee);
} else if (type == 3) {
str += generateRequestFaqSearch(prefix, "GENERAL", page,size,typee);
} else if (type == 4) {
str += generateRequestFaqSearch(prefix, "E-SIGN", page,size,typee);
} else if (type == 5) {
str += generateRequestFaqSearch(prefix, "ARCHITECTE", page,size,typee);
} else if (type == 6) {
str += generateRequestFaqSearch(prefix, "ADMINISTRATION", page,size,typee);
}

/*
if (type != 0) {
$(".faq-fieldset .full-search-list").eq(type - 1).html("");
$(".faq-fieldset .searchGif2").eq(type - 1).show();
}
*/
$.ajax({
type: "post",
//url: "http://localhost:9200/_msearch",
url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/_msearch",
datatype: "application/json",
contentType: "application/x-ndjson",
data: str,
beforeSend: function (xhr) {
xhr.setRequestHeader("Authorization", AUTH);
},
success: function (result) {
console.log(result);
if(type!=0){
for (var i = 0; i < result.responses.length; i++) {
    if (result.responses[i].hits.hits.length != 0) {
    

        for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
    
            NQF_add_question(result.responses[i].hits.hits[j]._source.QUESTIONS, result.responses[i].hits.hits[j]._id, cls, atr,target)

        }
        if(atr!=3 && result.responses[i].hits.hits != 0){
            target.find(cls).append(`<span  class="NFQ-end" onclick='ApplicationManager.run("karaz/ux/hub/portailsearch/search/FaqPage","search", "Faq Page", {});'> Toutes les questions de la catégorie<span>`);
        }
        
    }
}
}else{
    for(var i=0;i<result.responses.length;i++){
        target.find(cls[i]).html("");
        for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
            
            NQF_add_question(result.responses[i].hits.hits[j]._source.QUESTIONS, result.responses[i].hits.hits[j]._id, cls[i], atr,target)

        }
        if(atr!=3 && result.responses[i].hits.hits != 0){
            console.log(result.responses[i].hits);
            target.find(cls[i]).append(`<span  class="NFQ-end" onclick="RestSearchFaqWithIntilize('',0,2,${typesList.indexOf(result.responses[i].hits.hits[0]._source.type)+1},-1)"> Toutes les questions de la catégorie<span>`);                        }else{
        }   
    }
}

},
error: function (error) {
console.log(error.responseText);
} 
})


}

function RestSearchFaqWithIntilize(var1,var2,var3,var4,var5,target){
intializeFaqPages();
RestSearchFaq(var1,var2,var3,var4,var5,undefined,undefined,target);
}


function RestSearchRefWithIntilize(var1,var2,var3,var4,var5){
intializeFaqPages();
RestSearchref(var1,var2,var3,var4,var5);
}


function toModifyFaq(id){
ApplicationManager.run("karaz/ux/hub/portailsearch/search/NewfreqQuestion?query.idObject="+id,"search", "Edit question fréquente", {});
};


function removeQuestionNFQ(id,indexType) {

var str = "Do you really want to delete this element ?";
if (window.confirm(str)) {
console.log(URL_SEARCH+"?operation=wselastic&shortUrl=" + indexType + id);
$.ajax({
    type: "delete",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + indexType + id,
    //url: "http://localhost:9200/index_classification_cluster/avis/_search",
    contentType: "application/json",
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
        console.log(result);
        $("div[idd=" + id + "]").hide();

    },
    error: function (error) {
        console.log(error);
    }
});
}

}

function NQF_edit_av(type,dataroot,ctx,clas,target) {

if(type == 1){
ctx.formRender.targetPanel.find("."+clas+" .NFQ-all-quest").hide();

let resp = ctx.formRender.targetPanel.find("."+clas+" .NQF-prev-resp").html();
let ID = ctx.formRender.targetPanel.find("."+clas+" .NQF-id").val();
dataroot.question= faqObject.QUESTIONS;
// dataroot.nfqresponse=resp;
dataroot.categ= faqObject.type;
dataroot.visibility = faqObject.visibility;
ctx.formRender.notifyObservers("question");
ctx.formRender.notifyObservers("nfqresponse");
ctx.formRender.notifyObservers("categ");
ctx.formRender.notifyObservers("visibility");

ctx.formRender.targetPanel.find("."+clas+'  .ql-editor').empty();
ctx.formRender.targetPanel.find("."+clas+'  .ql-editor').html(resp)
ctx.formRender.targetPanel.find("."+clas+" .NQF-edit-modif").show();
ctx.formRender.targetPanel.find("."+clas+" .NQF-btn-alg").hide();
} else if(type == 2){
// add edit here
let title = refObject.title;
let desc  = refObject.desc;
let text  = refObject.content;
let type  = refObject.type;
let typeRef = refObject.typeRef;
let lang = refObject.lang;


if(refObject.urlV != undefined){ 
    var urlV = refObject.urlV;
}else{
    var urlV = "";
}

if( refObject.attachementRef != undefined){
    let attachement = refObject.attachementRef;
    dataroot.attachementRef = attachement;
    ctx.formRender.notifyObservers("attachementRef");
}else{
    let attachement = {
        "fileId":"",
        "fileName":"",
        "fileSize":"",
        "fileSignature":"",
        "fileTime":"",
        "gedId":""
    };
    dataroot.attachementRef = attachement;
    ctx.formRender.notifyObservers("attachementRef");
}

if(refObject.urlV2 != undefined){
    var urlV2 = refObject.urlV2;
}else{
    var urlV2 = "";
}

if( refObject.attachementRefAr != undefined){
    let attachement2 = refObject.attachementRefAr;
    dataroot.attachementRefAr = attachement2;
    ctx.formRender.notifyObservers("attachementRefAr");
}else{
    let attachement2 = {
        "fileId":"",
        "fileName":"",
        "fileSize":"",
        "fileSignature":"",
        "fileTime":"",
        "gedId":""
    };
    dataroot.attachementRefAr = attachement;
    ctx.formRender.notifyObservers("attachementRefAr");
}

console.log(title, desc, text, type);

dataroot.NQFtitle=title;
dataroot.NQFtype=type;
dataroot.NQFdesc=desc;
dataroot.urlRef =urlV;
dataroot.urlRef2=urlV2;
dataroot.NQFtypeRef=typeRef; 
dataroot.NQFLang=lang; 

ctx.formRender.notifyObservers("NQFtitle");
ctx.formRender.notifyObservers("NQFtype");
ctx.formRender.notifyObservers("NQFtypeRef");
ctx.formRender.notifyObservers("NQFdesc");
ctx.formRender.notifyObservers("urlRef");
ctx.formRender.notifyObservers("NQFLang");

$("."+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').empty();
$("."+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html(text)
$("."+clas+" .NQF-edit-modif").show();
$("."+clas+" .NQF-btn-alg").hide();

}else if(type==3){

dataroot.title = videoObject.title;
dataroot.url = videoObject.url;
dataroot.playlist = videoObject.playlist;
dataroot.categ = videoObject.plateforme;
dataroot.description = videoObject.description;
dataroot.tag = videoObject.tag;

ctx.formRender.notifyObservers("title");
ctx.formRender.notifyObservers("url");
ctx.formRender.notifyObservers("playlist");
ctx.formRender.notifyObservers("categ");
ctx.formRender.notifyObservers("description");
ctx.formRender.notifyObservers("tag");

$("."+clas+" .NQF-edit-modif").show();
$("."+clas+" .NQF-btn-alg").hide();
}else if(type==4){
dataroot.title = attachementObject.title;
dataroot.url = attachementObject.url;
dataroot.playlist = attachementObject.playlist;
dataroot.categ = attachementObject.plateforme;
dataroot.description = attachementObject.description;
dataroot.imgUrl = attachementObject.img_url;
dataroot.attachement = attachementObject.attachement;
dataroot.attachementImg = attachementObject.attachementImg;

if(attachementObject.attachement.gedId!=""){
    dataroot.url = contextPath+"/DownloadFile?gedId="+attachementObject.attachement.gedId;
}

let text = attachementObject.text;

ctx.formRender.notifyObservers("title");
ctx.formRender.notifyObservers("url");
ctx.formRender.notifyObservers("playlist");
ctx.formRender.notifyObservers("categ");
ctx.formRender.notifyObservers("description");
ctx.formRender.notifyObservers("imgUrl");
ctx.formRender.notifyObservers("attachement");
ctx.formRender.notifyObservers("attachementImg");

$("."+clas+' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').empty();
$("."+clas+' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html(text);

$("."+clas+" .NQF-edit-modif").show();
$("."+clas+" .NQF-btn-alg").hide();
}else if(type==7){
// add edit here
let title = dataroot.articleCms.title;
let desc  = dataroot.articleCms.description;
let text  = dataroot.articleCms.content;
let type  = dataroot.articleCms.type;
let categ = dataroot.articleCms.categorie;
let author = dataroot.articleCms.author;
let tag = dataroot.articleCms.tagsText;

if(dataroot.articleCms.lang!=undefined){
    var lang = dataroot.articleCms.lang; 
}else{
    var lang = "Fr";
}


try{
    var source = dataroot.articleCms.source;
    var link = dataroot.articleCms.link;
}catch(e){
    console.log(e);
}

if(dataroot.articleCms.imgP != undefined){
    var urlV = dataroot.articleCms.imgP;
}else{
    var urlV = "";
}

if( dataroot.articleCms.attachementRef != undefined){
    let attachement = dataroot.articleCms.attachementRef;
    dataroot.attachementArImg = attachement;
    ctx.formRender.notifyObservers("attachementArImg");
}else{
    let attachement = {
        "fileId":"",
        "fileName":"",
        "fileSize":"",
        "fileSignature":"",
        "fileTime":"",
        "gedId":""
    };
    dataroot.attachementArImg = attachement;
    ctx.formRender.notifyObservers("attachementArImg");
}

console.log(title, desc, text, type);

dataroot.NQFtitle=title;
dataroot.NQFtype=categ;
dataroot.NQFdesc=desc;
dataroot.urlRef =urlV;
dataroot.NQFcategorie = type;
dataroot.NQFauthor = author;
dataroot.NQFtags = tag;
dataroot.NQFlang = lang;

try{
    dataroot.NQFsource = source;
    dataroot.NQFlink = link;
}catch(e){
    console.log(e);
}

ctx.formRender.notifyObservers("NQFtitle");
ctx.formRender.notifyObservers("NQFtype");
ctx.formRender.notifyObservers("NQFdesc");
ctx.formRender.notifyObservers("urlRef");
ctx.formRender.notifyObservers("NQFcategorie");
ctx.formRender.notifyObservers("NQFauthor");
ctx.formRender.notifyObservers("NQFtags");
ctx.formRender.notifyObservers("NQFlang");
ctx.formRender.notifyObservers("NQFsource");
ctx.formRender.notifyObservers("NQFlink");

target.find("."+clas+'  .ql-editor').empty();
target.find("."+clas+'  .ql-editor').html(text)
target.find("."+clas+" .NQF-edit-modif").show();
target.find("."+clas+" .NQF-btn-alg").hide();

}
}

function getFormatedDate(date){
    var current_datetime = date;

    var dateYear = current_datetime.getFullYear();
    var dateMonths = (current_datetime.getMonth() + 1).toString().length==1?"0"+(current_datetime.getMonth() + 1):(current_datetime.getMonth() + 1);
    var dateDays = current_datetime.getDate().toString().length==1?"0"+current_datetime.getDate():current_datetime.getDate();

    var hours = current_datetime.getHours().toString().length==1?"0"+current_datetime.getHours():current_datetime.getHours();
    var minutes = current_datetime.getMinutes().toString().length==1?"0"+current_datetime.getMinutes():current_datetime.getMinutes();
    var seconds = current_datetime.getSeconds().toString().length==1?"0"+current_datetime.getSeconds():current_datetime.getSeconds();
    
    var formatted_date = dateYear + "-" + dateMonths + "-" + dateDays + " " + hours + ":" + minutes + ":" + seconds+"";

    return formatted_date;
}


function closeGeoPopUp(id){
    var modal = $("#"+id+" #myModal").get(0);
    var iframe = document.querySelector( "#"+id+" #myModal iframe");
    var video = document.querySelector( "#"+id+" #myModal video" );
    if ( iframe !== null ) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if ( video !== null ) {
        video.pause();
    }
    modal.style.display = "none";
} 

function openGeoPopUp(id){
    var modal = $("#"+id+" #myModal").get(0);
    modal.style.display = "block";
}