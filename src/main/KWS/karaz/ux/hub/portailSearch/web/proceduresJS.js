
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

		$("."+clas+' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html(resp)
		$("."+clas+" .NQF-edit-modif").show();
		$("."+clas+" .NQF-btn-alg").hide();
	} else if(type == 2){
		// add edit here

	}
	}


	function NQF_preview_QR(type,clas,dataroot) {
		if(type == 1){
			let question = $("."+clas+' .ow-field-input[data-xpath="question"]').val();
			let categ = $("."+clas+' .ow-field-input-select[data-xpath="categ"]').text();
			let resp = $("."+clas+' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html()
			

			if (question == "" && categ == "" && resp == "<p><br></p>") {
				alert("rien à prévisualiser")

			} else {
				$("."+clas+" .NQF-vue-question .NQF-prev-quest >b").text(question);
				$("."+clas+" .NQF-prev-resp").html(resp);
				$("."+clas+" .NQF-vue-question").show();

			}
		} else if(type == 2){
			let title = $("."+clas+' .ow-field-input[data-xpath="NQFtitle"]').val();
			let categ = $("."+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text();
			let texte = $("."+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html()
			let description = $("."+clas+' .NFQ-desc-refjuridique textarea').val(); 
			
			
			if (title == "" && categ == "" && texte == "<p><br></p>" && description == "") {
				alert("rien à prévisualiser")

			} else {
				$("."+clas+" .NQF-title-ref").text(title);
				$("."+clas+" .NQF-desc-ref").text(description);
				$("."+clas+" .NQF-text-ref").html(texte);
				$("."+clas+" .NQF-vue-ref").show();
				$("."+clas+" .NQF-btn-alg").hide();

			}
		} else if(type==3){
            let title = $("."+clas+' .ow-field-input[data-xpath="title"]').val();
			let categ = $("."+clas+' .ow-field-input-select[data-xpath="categ"]').text();
            let urlV = $("."+clas+' .ow-field-input[data-xpath="url"]').val();
            let description = $("."+clas+' .ow-field-input-line textarea[data-xpath="description"]').val(); 
            let playlist = $("."+clas+' .ow-field-input-select[data-xpath="playlist"]').text();
            if (title == "" && categ == "" && urlV == "" && description == "" && playlist=="") {
				alert("rien à prévisualiser")

			} else {
                if(categ=="Vimeo"){
                    var urlemb = "https://player.vimeo.com/video/"+urlV.match(/\/\d+/)[0].replace(/\//g,"");
                    console.log(urlemb);
                }else if(categ=="Youtube"){
                    var urlemb = "https://www.youtube.com/embed/"+urlV.match(/v=\w+[&]*/)[0].replace("v=",'');;
                    console.log(urlemb);
                }else if(categ=="Autre"){
                    var urlemb = urlV;
                    console.log(urlemb);
                }else{
                    alert("veuillez choisir la plateforme d'hébergement");
                    return ;
                }
                
				$("."+clas+" .NQF-vue-question .vue-video-frame").html("<iframe src="+urlemb+" width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
				$("."+clas+" .NQF-vue-question .vue-video-title b").html(title);
				$("."+clas+" .NQF-vue-question .vue-video-description").html(description);
				$("."+clas+" .NQF-vue-ref").show();
                $("."+clas+" .NQF-btn-alg").hide();
                $("."+clas+" .NQF-vue-question").show();
			}
        } else if(type==4){
            let title = $("."+clas+' .ow-field-input[data-xpath="title"]').val();
			let categ = $("."+clas+' .ow-field-input-select[data-xpath="categ"]').text();
            let urlV = $("."+clas+' .ow-field-input[data-xpath="url"]').val();
            let description = $("."+clas+' .ow-field-input-line textarea[data-xpath="description"]').val(); 
            let playlist = $("."+clas+' .ow-field-input-select[data-xpath="playlist"]').text();
            var imgUrl = $("."+clas+' .ow-field-input[data-xpath="imgUrl"]').val();
            let attachement = dataroot.attachement;
            let attachementImg = dataroot.attachementImg;

            if(attachementImg.gedId!=""){
                 imgUrl = "/karazal/DownloadFile?gedId="+attachementImg.gedId+"&thumbnail=small&krn="+attachementImg.gedId.split("/")[0]+"&or=img/no-file.svg";
            }

            if (title == "" && categ == "" && urlV == "" && description == "" && playlist=="") {
				alert("rien à prévisualiser")

			} else {

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
                    $("."+clas+" .NQF-vue-question .vue-video-frame").html('<div class="docthumbnail"><img class="smallThumbnailImg" src="/karazal/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=small&amp;krn='+krn+'&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="/karazal/DownloadFile?gedId='+attachement.gedId+'&amp;krn='+krn+'&amp;thumbnail=large&amp;or=img/no-file.svg"></div>');
                }
                
                
				$("."+clas+" .NQF-vue-question .vue-video-title b").html(title);
				$("."+clas+" .NQF-vue-question .vue-video-description").html(description);
				$("."+clas+" .NQF-vue-ref").show();
                $("."+clas+" .NQF-btn-alg").hide();
                $("."+clas+" .NQF-vue-question").show();
			}
        }
	}

	function NQF_new_QR(type,clas) {

		if(type == 1){
		//add header
		// $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","ApplicationManager.run('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
		$("."+clas+" .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").html(`NOUVELLE QUESTIONS FREQUENTES `);

		$("."+clas+' .ow-field-input[data-xpath="question"]').val("");
		$("."+clas+' .ow-field-input-select[data-xpath="categ"]').text("");
		$("."+clas+' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').text("")
		$("."+clas+" .NQF-id").val("");


		$("."+clas+" .NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput");
		$("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput");


		$("."+clas+" .NQF-vue-question").hide();
		} else if(type == 2){
		$("."+clas+" .NQF-titre-ref > .ow-pl-toolbar .ow-label-pl").html(`NOUVEAU RÉFÉRENTIEL JURIDIQUE`);

		
		

		$("."+clas+' .ow-field-input[data-xpath="NQFtitle"]').val("");
		$("."+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text("");
		$("."+clas+' .NFQ-desc-refjuridique textarea').val("");
		$("."+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html("")
		$("."+clas+" .NQF-id-ref").val("");


		$("."+clas+" .NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput filledInput");
		$("."+clas+" .NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput");
		$("."+clas+" .ow-field-textArea-container:has(.NFQ-desc-refjuridique)").removeClass("filledInput")
		
		 

		$("."+clas+" .NQF-vue-ref").hide();
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

    function NQF_save_QR(type,root) {
		if (type == 1) {
            var clas = "classSearch-5";

			let question = $("."+clas+' .ow-field-input[data-xpath="question"]').val();
			let categ = $("."+clas+' .ow-field-input-select[data-xpath="categ"]').text();
			let resp = $("."+clas+' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html()
			let ID = $("."+clas+" .NQF-id").val();

			$("."+clas+" .NQF-vue-question .NQF-prev-quest >b").text(question);
			$("."+clas+" .NQF-prev-resp").html(resp);
            
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
				if ($("."+clas+" .ow-btn-container:has(> i)").length == 0) {
					$("."+clas+" .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
                }
                
				setTimeout(function () {
					$("."+clas+" .ow-btn-container i.fa-check").remove()
					$("."+clas+" .NQF-edit-modif").hide()
					$("."+clas+" .NQF-new-quest-btn").show();
					$("."+clas+" .NQF-vue-question").show();
				}, 2000);
				
				
			} else {
				alert("verifier que tout les champs sont bien remplis");
				$("."+clas+" .NQF-vue-question").hide();
			}
			// $(".NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput")
			// $(".NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput");
			
		} else if(type == 2){
			
            var clas = "classSearch-3";

			let title = $('.'+clas+' .ow-field-input[data-xpath="NQFtitle"]').val();
			let categ = $('.'+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text();
			let texte = $('.'+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html();
			let description = $('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 
			
			console.log(title, categ, texte, description)
			
			if(categ == "Urbanisme"){
				T = 2; 
			} else if(categ == "Economique"){
				T = 1;
			}
			let id = "";
			id = $("."+clas+".NQF-id-ref").val();
			$("."+clas+".NQF-title-ref").text(title);
			$("."+clas+".NQF-desc-ref").text(description);
			$("."+clas+".NQF-text-ref").html(texte);

			var req = {
				"title": "",
				"type": "",
				"content": "",
				"desc":""
			}
			req.title = title;
			req.type = T.toString();
			req.content = texte;
			req.desc = description;
			console.log(req, id);
			
			//
			if ($("."+clas+".ow-btn-container:has(> i)").length == 0) {
				$("."+clas+".ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
			}
			setTimeout(function () {
				$("."+clas+".ow-btn-container i.fa-check").remove()
				$("."+clas+".NQF-edit-modif").hide()
				$("."+clas+".NQF-new-quest-btn").show();
				$("."+clas+".NQF-vue-ref").show();
				$("."+clas+".NQF-btn-alg").hide();
			}, 2000);
			
			updateReglementation(id,req);
		}else if(type==3){
            var clas = "classSearch-7";
            let title = $('.'+clas+' .ow-field-input[data-xpath="title"]').val();
			let categ = $('.'+clas+' .ow-field-input-select[data-xpath="categ"]').text();
            let urlV  = $('.'+clas+' .ow-field-input[data-xpath="url"]').val();
            let description = $('.'+clas+' .ow-field-input-line textarea[data-xpath="description"]').val(); 
			let playlist = $('.'+clas+' .ow-field-input-select[data-xpath="playlist"]').text();
            
            if(categ=="Vimeo"){
                var video_id = urlV.match(/\/\d+/)[0].replace(/\//g,""); 
            }else if(categ=="Youtube"){
                var video_id = urlV.match(/v=\w+[&]*/)[0].replace("v=",'');; 
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
                "video_id":video_id,
                "img_url":"",
                "date": formatted_date,
			};


            let id = "";
            id = $(".NQF-id-ref").val();
            if(categ=="Vimeo"){
                $.ajax({
                    type:'GET',
                    url: 'http://vimeo.com/api/v2/video/' + video_id + '.json',
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

            if(attachementImg.gedId!=""){
                imgUrl = "/karazal/DownloadFile?gedId="+attachementImg.gedId+"&thumbnail=small&krn="+attachementImg.gedId.split("/")[0]+"&or=img/no-file.svg"
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
                var str = '<div class="docthumbnail"><img class="smallThumbnailImg" src="/karazal/DownloadFile?gedId='+attachement.gedId+'&amp;thumbnail=small&amp;krn='+krn+'&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="/karazal/DownloadFile?gedId='+attachement.gedId+'&amp;krn='+krn+'&amp;thumbnail=large&amp;or=img/no-file.svg"></div>';
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
                
                getAllplayListsD(1,100,clas);

            }, 2000);

            updatePlaylist(id,req);
            
        }
	}
	
	function NQF_add_question(quest, id, cls, type) {
        var clas = "classSearch-5";
		// console.log(id);
		if (type == 1) {
			$(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt " idd="${id}">
											<div class="vpanel-body-title NQF-quest-delete" style="font-size: 14px;">
												<span class = 'NFQ-click-btn'  onclick='getQsFaq("${id}",0,"${clas}")' >` + quest + `</span>
												<span class = 'far fa-times-circle NFQ-close-quest' onclick='removeQuestionNFQ("${id}","/faq_index/qr/")' />
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


    function viderUrl(type,root,context){
        if(type==0){
            console.log(root.attachement);
            root.attachement.fileId = "";
            root.attachement.gedId = "";
            console.log(root.attachement);
            root.url = "";
            context.formRender.notifyObservers("url");
        }else if(type==1){
            root.attachementImg.fileId = "";
            root.attachementImg.gedId = "";
             root.imgUrl = "";
             context.formRender.notifyObservers("imgUrl");
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
                $(".NQF-id").val(result._id);
                voidRestSearch("",0,5,0,[".NFQ-quest-type-document",".NFQ-quest-type-plat",".NFQ-quest-type-general",".NFQ-quest-type-esign",".NFQ-quest-type-archit",".NFQ-quest-type-adminis"],1);
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
                voidRestSearch("",0,7,0,[".NFQ-quest-type-eco",".NFQ-quest-type-urba"],0);
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

			url: URL_SEARCH + "/videos_index/video/" + newID,
			datatype: "application/json",
			data: JSON.stringify(obj),
			contentType: "application/json",
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
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
			url: URL_SEARCH + "/attachements_index/attachement/" + newID,
			datatype: "application/json",
			data: JSON.stringify(obj),
			contentType: "application/json",
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", "Basic YWRtaW46RWxhc3RpY19tdTFUaGFlVzRhX0s0cmF6");
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

    function voidRestSearch(prefix, page, size, type, cls, atr){
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
                console.log("go ...! "+result);
            
                if(atr==0){
                    setTimeout(function () {
                        RestSearchref("",0,7,0,1,[".NFQ-quest-type-eco",".NFQ-quest-type-urba"]);
                        RestSearchref("",0,7,0,2,[".NFQ-quest-type-eco1",".NFQ-quest-type-urba1"]);
                    }, 1000);
                }else{
                    setTimeout(function () {
                        RestSearchFaqSec("",0,5,0,[".NFQ-quest-type-document",".NFQ-quest-type-plat",".NFQ-quest-type-general",".NFQ-quest-type-esign",".NFQ-quest-type-archit",".NFQ-quest-type-adminis"],1);
                        RestSearchFaqSec("",0,5,0,[".NFQ-quest-type-document1",".NFQ-quest-type-plat1",".NFQ-quest-type-general1",".NFQ-quest-type-esign1",".NFQ-quest-type-archit1",".NFQ-quest-type-adminis1"],2);    
                    }, 1000);
                }
            },error: function (error) {
				console.log(error);
			}
		})
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
			url: URL_SEARCH + "/_msearch?pretty",
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
							//console.log(result.responses[i].hits.hits[j]._id);
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
                        $(cls[i]).html("");
                        for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
                           // console.log(result.responses[i].hits.hits[j]._id);
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


    function RestSearchRefWithIntilize(var1,var2,var3,var4,var5){
        intializeFaqPages();
        RestSearchref(var1,var2,var3,var4,var5);
    }

    

	
	
	function removeQuestionNFQ(id,indexType) {

        var str = "Do you really want to delete this element ?";
		if (window.confirm(str)) {
            console.log(URL_SEARCH + indexType + id);
            $.ajax({
				type: "delete",
				url: URL_SEARCH + indexType + id,
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
	
    function NQF_edit_av(type,dataroot,ctx,clas) {
		
		if(type == 1){
			$("."+clas+" .NFQ-all-quest").hide();
			let question = $("."+clas+" .NQF-vue-question .NQF-prev-quest b").text();

			let resp = $("."+clas+" .NQF-prev-resp").html();
			let categ = $("."+clas+" .NQF-categorie").val();
			let ID = $("."+clas+" .NQF-id").val();
			dataroot.question=question;
	       // dataroot.nfqresponse=resp;
			dataroot.categ=categ;
			ctx.formRender.notifyObservers("question");
			ctx.formRender.notifyObservers("nfqresponse");
			ctx.formRender.notifyObservers("categ");
			
			$("."+clas+' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').empty();
			$("."+clas+' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html(resp)
			$("."+clas+" .NQF-edit-modif").show();
			$("."+clas+" .NQF-btn-alg").hide();
		} else if(type == 2){
			// add edit here
			let title = $("."+clas+" .NQF-title-ref").text();
			let desc  = $("."+clas+" .NQF-desc-ref").text();
			let text  = $("."+clas+" .NQF-text-ref").html();
			let type  = $("."+clas+" .NQF-type-ref").text();
			console.log(title, desc, text, type);

			dataroot.NQFtitle=title;

			dataroot.NQFtype=type;
			dataroot.NQFdesc=desc;
			ctx.formRender.notifyObservers("NQFtitle");
			ctx.formRender.notifyObservers("NQFtype");
			ctx.formRender.notifyObservers("NQFdesc");

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

			ctx.formRender.notifyObservers("title");
			ctx.formRender.notifyObservers("url");
			ctx.formRender.notifyObservers("playlist");
			ctx.formRender.notifyObservers("categ");
			ctx.formRender.notifyObservers("description");

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
        }
}