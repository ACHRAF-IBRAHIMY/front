/* start procedure  */
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
/* start procedure  */