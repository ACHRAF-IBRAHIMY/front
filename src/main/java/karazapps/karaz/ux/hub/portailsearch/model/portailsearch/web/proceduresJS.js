/* start procedure  */
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
	$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
	$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").append(` | <span class="title-2x" style="color:#38a; ">`+ pcdSecondheader + `</span>`);	

}

function PCD_add_header_style_action_eco(pcdClasstype, pcdSecondheader){

	PCD_headerfieldset_color(pcdClasstype);
	$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresEconomique', 'search', 'procedures Economique', {});");
	$(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").append(` | <span class="title-2x" style="color:#38a; ">`+ pcdSecondheader + `</span>`);	

}


/* start procedure  */

/* start NQF */
function PCD_header_style_quest_type(qtypeCls, fontAwsCls){

	$(qtypeCls+"> .ow-pl-toolbar .ow-label-pl:not(:has(>i))").prepend('<i class="'+fontAwsCls+' NFQ-fa-style" />')
	
}





function NQF_edit(type) {
	if(type == 1){
		let question = $(".NQF-vue-question .NQF-prev-quest b").text();

		let resp = $(".NQF-prev-resp").html();
		let categ = $(".NQF-categorie").val();
		let ID = $(".NQF-id").val();
		console.log(ID)

		$(".NQF-edit-float .ow-field-container.ow-field-text-container").addClass("focusedInput");
		$('.ow-field-input[data-xpath="question"]').val(question);
		if (categ == "E-SIGN") {
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

		$('.ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html(resp)
		$(".NQF-edit-modif").show();
		$(".NQF-btn-alg").hide();
	} else if(type == 2){
		// add edit here

	}
	}









	function NQF_preview_QR(type) {
		if(type == 1){
			let question = $('.ow-field-input[data-xpath="question"]').val();
			let categ = $('.ow-field-input-select[data-xpath="categ"]').text();
			let resp = $('.ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html()
			

			if (question == "" && categ == "" && resp == "<p><br></p>") {
				alert("rien à prévisualiser")

			} else {
				$(".NQF-vue-question .NQF-prev-quest >b").text(question);
				$(".NQF-prev-resp").html(resp);
				$(".NQF-vue-question").show();

			}
		} else if(type == 2){
			let title = $('.ow-field-input[data-xpath="NQFtitle.ref"]').val();
			let categ = $('.ow-field-input-select[data-xpath="NQFtype.ref"]').text();
			let texte = $('.ow-field-htmleditor[data-xpath="NQFtext.ref"] .ql-editor').html()
			let description = $('.NFQ-desc-refjuridique textarea').val(); 
			
			
			if (title == "" && categ == "" && texte == "<p><br></p>" && description == "") {
				alert("rien à prévisualiser")

			} else {
				$(".NQF-title-ref").text(title);
				$(".NQF-desc-ref").text(description);
				$(".NQF-text-ref").html(texte);
				$(".NQF-vue-ref").show();

			}
		}
	}

	function NQF_new_QR(type) {

		if(type == 1){
		//add header
		// $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
		$(".NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").html(`NOUVELLE QUESTIONS FREQUENTES `);

		$('.ow-field-input[data-xpath="question"]').val("");
		$('.ow-field-input-select[data-xpath="categ"]').text("");
		$('.ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').text("")
		$(".NQF-id").val("");


		$(".NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput");
		$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput");


		$(".NQF-vue-question").hide();
		} else if(type == 2){
		$(".NQF-titre-ref > .ow-pl-toolbar .ow-label-pl").html(`NOUVEAU RÉFÉRENTIEL JURIDIQUE`);

		
		

		$('.ow-field-input[data-xpath="NQFtitle.ref"]').val("");
		$('.ow-field-input-select[data-xpath="NQFtype.ref"]').text("");
		$('.NFQ-desc-refjuridique textarea').val("");
		$('.ow-field-htmleditor[data-xpath="NQFtext.ref"] .ql-editor').html("")
		$(".NQF-id-ref").val("");


		$(".NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput filledInput");
		$(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput");
		$(".ow-field-textArea-container:has(.NFQ-desc-refjuridique)").removeClass("filledInput")
		
		 

		$(".NQF-vue-ref").hide();
		}

	}


	function NQF_save_QR(type) {
		if (type == 1) {
			let question = $('.ow-field-input[data-xpath="question"]').val();
			let categ = $('.ow-field-input-select[data-xpath="categ"]').text();
			let resp = $('.ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html()
			let ID = $(".NQF-id").val();

			$(".NQF-vue-question .NQF-prev-quest >b").text(question);
			$(".NQF-prev-resp").html(resp);
			var req = {
				"QUESTIONS": "",
				"REPONSES": "",
				"type": ""
			}
			req.QUESTIONS = question;
			req.REPONSES = resp;
			req.type = categ;

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
				updateQuestionNQF(ID, req);
				// added recently
				/*
				if (req.type == "E-SIGN") {
					$(".NFQ-quest-type-esign").empty();
					RestSearchFaqSec("", 0, 5, 4, ".NFQ-quest-type-esign", 1)
				} else if (req.type == "GENERAL") {
					$(".NFQ-quest-type-general").empty();
					RestSearchFaqSec("", 0, 5, 3, ".NFQ-quest-type-general", 1)
				} else if (req.type == "DOCUMENT") {
					$(".NFQ-quest-type-document").empty();
					RestSearchFaqSec("", 0, 5, 1, ".NFQ-quest-type-document", 1)
				} else if (req.type = "PLATEFORME") {
					$(".NFQ-quest-type-plat").empty();
					RestSearchFaqSec("", 0, 5, 2, ".NFQ-quest-type-plat", 1)
				} else if (req.type = "ARCHITECTE") {
					$(".NFQ-quest-type-archit").empty();
					RestSearchFaqSec("", 0, 5, 5, ".NFQ-quest-type-archit", 1)
				} else if (req.type = "ADMINISTRATION") {
					$(".NFQ-quest-type-adminis").empty();
					RestSearchFaqSec("", 0, 5, 6, ".NFQ-quest-type-adminis", 1)
				}*/
				//
				if ($(".ow-btn-container:has(> i)").length == 0) {
					$(".ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
				}
				setTimeout(function () {
					$(".ow-btn-container i.fa-check").remove()
					$(".NQF-edit-modif").hide()
					$(".NQF-new-quest-btn").show();
					$(".NQF-vue-question").show();
				}, 2000);
				
				
			} else {
				alert("verifier que tout les champs sont bien remplis");
				$(".NQF-vue-question").hide();
			}
			// $(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput")
			// $(".NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput");
			
		} else if(type == 2){
			

			let title = $('.ow-field-input[data-xpath="NQFtitle.ref"]').val();
			let categ = $('.ow-field-input-select[data-xpath="NQFtype.ref"]').text();
			let texte = $('.ow-field-htmleditor[data-xpath="NQFtext.ref"] .ql-editor').html()
			let description = $('.NFQ-desc-refjuridique textarea').val(); 
			
			console.log(title, categ, texte, description)
			let T;
			if(categ == "Urbanisme"){
				T = 2; 
			} else if(categ == "Economique"){
				T = 1;
			}
			let ID = "";

			$(".NQF-title-ref").text(title);
			$(".NQF-desc-ref").text(description);
			$(".NQF-text-ref").html(texte);

			var req = {
				"title": "",
				"type": "",
				"content": "",
				"desc":""
			}
			req.title = title;
			req.type = T;
			req.content = texte;
			req.desc = description;
			console.log(req);
			
			//
			if ($(".ow-btn-container:has(> i)").length == 0) {
				$(".ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
			}
			setTimeout(function () {
				$(".ow-btn-container i.fa-check").remove()
				$(".NQF-edit-modif").hide()
				$(".NQF-new-quest-btn").show();
				$(".NQF-vue-ref").show();
			}, 2000);
			
			// updateReglementation(ID,req);
		}
	}

	function NQF_add_question(quest, id, cls, type) {

		// console.log(id);
		if (type == 1) {
			$(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt " idd="${id}">
											<div class="vpanel-body-title NQF-quest-delete" style="font-size: 14px;">
												<span class = 'NFQ-click-btn'  onclick='getQsFaq("${id}",0)' >` + quest + `</span>
												<span class = 'far fa-times-circle NFQ-close-quest' onclick='removeQuestionNFQ("${id}")' />
											</div>
											<hr class="NQF-horizontal-line " />
											
											</div>`)
		} else if (type == 2 || type ==3) {
			$(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt">
			<div class="vpanel-body-title " style="font-size: 14px;">
				<span class = 'NFQ-click-btn' onclick='javascript:ApplicationManager.run("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject=${id}","search", "FaqDetail", {});' >` + quest + `</span>
			</div>
			<hr class="NQF-horizontal-line " />
			
			</div>`)
		}

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

	function updateReglementation(id, obj) {


		let newID = ""
		if (id != "") {
			newID = id;
		}
		$.ajax({
			type: "post",

			url: URL_SEARCH + "/reglementation_index/reglementation/" + newID,
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


	function RestSearchFaqSec(prefix, page, size, type, cls, atr) {

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
                if(type!=0){
                for (var i = 0; i < result.responses.length; i++) {
					if (result.responses[i].hits.hits.length != 0) {
						// console.log(result.responses[i].hits.hits);
						// console.log(result.responses[i].hits.hits.length);


						for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
							console.log(result.responses[i].hits.hits[j]._id);
							// console.log(result.responses[i].hits.hits[j]._source.QUESTIONS);

							NQF_add_question(result.responses[i].hits.hits[j]._source.QUESTIONS, result.responses[i].hits.hits[j]._id, cls, atr)

							// console.log(result.responses[i].hits.hits[j]._source.REPONSES);	
                        }
                        if(atr!=3){
                            $(cls).append(`<span  class="NFQ-end" onclick='ApplicationManager.run("karaz/ux/hub/portailsearch/search/FaqPage","search", "Faq Page", {});'> Toutes les questions de la catégorie<span>`);
                        }
						// fullCreateFaqByType(result.responses[i].hits.hits,(i+1));
						// k++;
					}
                }
                }else{
                    for(var i=0;i<result.responses.length;i++){
                        for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
                            console.log(result.responses[i].hits.hits[j]._id);
                            // console.log(result.responses[i].hits.hits[j]._source.QUESTIONS);

                            NQF_add_question(result.responses[i].hits.hits[j]._source.QUESTIONS, result.responses[i].hits.hits[j]._id, cls[i], atr)

                            // console.log(result.responses[i].hits.hits[j]._source.REPONSES);	
                        }
                        if(atr!=3){
                        	$(cls[i]).append(`<span  class="NFQ-end" onclick="RestSearchFaqWithIntilize('',0,2,${typesList.indexOf(result.responses[i].hits.hits[0]._source.type)+1},-1)"> Toutes les questions de la catégorie<span>`);                        }else{
                        }   
                    }
                }

			},
			error: function (error) {
				console.log(error.responseText);
			}
		})


	}

	function RestSearchFaqWithIntilize(var1,var2,var3,var4,var5){
        intializeFaqPages();
        RestSearchFaq(var1,var2,var3,var4,var5);
    }

	
	
	function removeQuestionNFQ(id) {

		if (window.confirm("Do you really want to delete this question?")) {
			$.ajax({
				type: "delete",
				url: URL_SEARCH + "/faq_index/qr/" + id,
				//url: "http://localhost:9200/index_classification_cluster/avis/_search",
				contentType: "application/json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
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
	
	function NQF_edit_av(type,dataroot,ctx) {
		
		if(type == 1){
			$(".NFQ-all-quest").hide();
			let question = $(".NQF-vue-question .NQF-prev-quest b").text();

			let resp = $(".NQF-prev-resp").html();
			let categ = $(".NQF-categorie").val();
			let ID = $(".NQF-id").val();
			dataroot.question=question;
	       // dataroot.nfqresponse=resp;
			dataroot.categ=categ;
			ctx.formRender.notifyObservers("question");
			ctx.formRender.notifyObservers("nfqresponse");
			ctx.formRender.notifyObservers("categ");
			/*let ID = $(".NQF-id").val();
			console.log(ID);

			$(".NQF-edit-float .ow-field-container.ow-field-text-container").addClass("focusedInput");
			$('.ow-field-input[data-xpath="question"]').val(question);
			if (categ == "E-SIGN") {
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
			}*/
	$('.ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').empty();
			$('.ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html(resp)
			$(".NQF-edit-modif").show();
			$(".NQF-btn-alg").hide();
		} else if(type == 2){
			// add edit here

		}
		}

