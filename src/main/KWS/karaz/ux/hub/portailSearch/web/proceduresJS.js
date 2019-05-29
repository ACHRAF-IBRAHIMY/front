/* start procedure  */
function PCD_addtitle() {
	$(".PCD-addtitle> .ow-pl-toolbar .ow-label-pl:not(:has(>i))").append(`<i class="fas fa-info-circle PCD-tooltip" title="Il s'agit d'indicateurs contextuels représentants la performances relatifs au processus, à l'entité ou à l'utilisateur concerné"/>`)
}

function PCD_headerfieldset_color(pcdClasstype) {
	$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl").css("color","#999999");
}
function PCD_add_header_style_action(pcdClasstype, pcdSecondheader){

	PCD_headerfieldset_color(pcdClasstype);
	$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
	$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").append(` | <span class="title-2x" style="color:#38a; ">`+ pcdSecondheader + `</span>`);	

}
/* start procedure  */

/* start NQF */
function NQF_edit() {

	let question = $(".NQF-vue-question .NQF-prev-quest b").text();
	let resp = $(".NQF-prev-resp").text();
	let categ = $(".NQF-categorie").val();
	

	$(".NQF-edit-float .ow-field-container.ow-field-text-container").addClass("focusedInput");
	$('.ow-field-input[data-xpath="question"]').val(question);
	if(categ == "E-SIGN" ){
		$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
		$('.ow-field-input-select[data-xpath="categ"]').text("Signature électronique");
	} else if (categ == "GENERAL") {
		$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")                                            
		$('.ow-field-input-select[data-xpath="categ"]').text("Général");
	} else if (categ == "DOCUMENT") {
		$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")                                            
		$('.ow-field-input-select[data-xpath="categ"]').text("Document");
	} else if (categ == "PLATEFORME") {
		$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")                                            
		$('.ow-field-input-select[data-xpath="categ"]').text("Plateforme");
	} else if (categ == "ARCHITECTE") {
		$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")                                            
		$('.ow-field-input-select[data-xpath="categ"]').text("Architecte");
	} else if (categ == "ADMINISTRATION") {
		$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")                                            
		$('.ow-field-input-select[data-xpath="categ"]').text("Administration");
	}
	
	$('.ow-field-htmleditor[data-xpath="NFQ-response"] .ql-editor').text(resp)
}









function NQF_preview_QR() {
	
	let question = $('.ow-field-input[data-xpath="question"]').val();
	let categ = $('.ow-field-input-select[data-xpath="categ"]').text();
	let resp = $('.ow-field-htmleditor[data-xpath="NFQ-response"] .ql-editor').text()
	console.log(!(question != "" && categ != "" && resp != ""));
	
	if ( question == "" && categ == "" && resp == ""){
		alert("rien à prévisualiser")

	}else{
		$(".NQF-vue-question .NQF-prev-quest >b").text(question);
		$(".NQF-prev-resp").text(resp);
		$(".NQF-vue-question").show();
		
	}
}

function NQF_new_QR(){
	$('.ow-field-input[data-xpath="question"]').val("");
	$('.ow-field-input-select[data-xpath="categ"]').text("");
	$('.ow-field-htmleditor[data-xpath="NFQ-response"] .ql-editor').text("")
	$(".NQF-id").val("");
	
	$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput")
	$(".NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput");
	
	$(".NQF-vue-question").hide();


}


function NQF_save_QR() {
	let question = $('.ow-field-input[data-xpath="question"]').val();
	let categ = $('.ow-field-input-select[data-xpath="categ"]').text();
	let resp = $('.ow-field-htmleditor[data-xpath="NFQ-response"] .ql-editor').text()
	let ID = $(".NQF-id").val();


	$(".NQF-vue-question .NQF-prev-quest >b").text(question);
	$(".NQF-prev-resp").text(resp);
	var req = {
		"QUESTIONS": "",
		"REPONSES": "",
		"type": ""
	}
	req.QUESTIONS = question;
	req.REPONSES = resp;
	// type
	if(categ == "Signature électronique" ){
		req.type = "E-SIGN";
	} else if (categ == "Général") {
		req.type ="GENERAL";
	} else if (categ == "Document") {
		req.type ="DOCUMENT";
	} else if (categ == "Plateforme") {
		req.type ="PLATEFORME";
	} else if (categ == "Architecte") {
		req.type = "ARCHITECTE";
	} else if (categ == "Administration") {
		req.type ="ADMINISTRATION";
	}	
	 
	//
	
	if ( req.QUESTIONS != "" && req.REPONSES != "" && req.type != ""){
		console.log(req, ID);
		updateQuestionNQF(ID,req);
		if ($(".ow-btn-container:has(> i)").length == 0) {
			$(".ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')

			
		}
		$(".NQF-vue-question").show();
	}else{
		alert("verifier que tout les champs sont bien remplis");
		$(".NQF-vue-question").hide();
	}
	// $(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput")
	// $(".NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput");
	setTimeout(function(){$(".ow-btn-container i.fa-check").remove()}, 2000);
}

function NQF_add_question(quest, id, cls) {

    // console.log(id);
	
	$(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt">
                                    <div class="vpanel-body-title " style="font-size: 14px;">
                                        <span class = 'NFQ-click-btn' onclick='getQsFaq("${id}",0)' >` + quest + `</span>
                                    </div>
									<hr class="NQF-horizontal-line " />
									
                                	</div>`)


}








function updateQuestionNQF(id, obj) {


	let newID = ""
	if (id != "") {
		newID = id;
	}
	$.ajax({
		type: "post",

		url: URL_SEARCH + "/faq_index/qr/" + newID,
		datatype: "application/json",
		data: JSON.stringify(obj),
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


function RestSearchFaqSec(prefix, page, size, type, cls) {


	var str = ""
	$(".faq-vbox .no-response-find").hide();

	if (type == 0) {
		$(".faq-fieldset").hide();
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

	if (type != 0) {
		$(".faq-fieldset .full-search-list").eq(type - 1).html("");
		$(".faq-fieldset .searchGif2").eq(type - 1).show();
	}

	$.ajax({
		type: "post",
		//url: "http://localhost:9200/_msearch",
		url: URL_SEARCH + "/_msearch",
		datatype: "application/json",
		contentType: "application/x-ndjson",
		data: str,
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", AUTH);
		},
		success: function (result) {
			console.log(result);
			for (var i = 0; i < result.responses.length; i++) {
				if (result.responses[i].hits.hits.length != 0) {
					// console.log(result.responses[i].hits.hits);
					// console.log(result.responses[i].hits.hits.length);
					
					
					for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
						console.log(result.responses[i].hits.hits[j]._id);
						// console.log(result.responses[i].hits.hits[j]._source.QUESTIONS);
						
						NQF_add_question(result.responses[i].hits.hits[j]._source.QUESTIONS, result.responses[i].hits.hits[j]._id ,cls)
						
						// console.log(result.responses[i].hits.hits[j]._source.REPONSES);	
					}
					$(".NFQ-quest-type").append('<span  class="NFQ-end"/>');

					// fullCreateFaqByType(result.responses[i].hits.hits,(i+1));
					// k++;
				}
			}

		},
		error: function (error) {
			console.log(error.responseText);
		}
	})


}
// 
/*end NQF */