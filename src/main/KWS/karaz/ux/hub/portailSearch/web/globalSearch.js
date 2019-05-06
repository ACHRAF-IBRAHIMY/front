function setPaganateSizeValueById(divId,childId,size){
	try{
console.log("setPaganateSizeValueById(divId,size) ......."+divId+"size=="+size ); 
         if(size>=10){
         return;
         }  
        var v0=size;
	    var v1=size*2;

   if( size<5){
    v1=size*3;
    }     
	   var v2=parseInt(30/size)*size;
       var v3=parseInt(50/size)*size;
       var v4=parseInt(100/size)*size;
      var v5=parseInt(250/size)*size;
      var v6=parseInt(500/size)*size;
     var v7=parseInt(1000/size)*size;
var optionsStr= '<option value="'+v0+'" selected="true">'+v0+'</option><option value="'+v1+'">'+v1+'</option><option value="'+v2+'">'+v2+'</option><option value="'+v3+'">'+v3+'</option><option value="'+v4+'">'+v4+'</option><option value="'+v5+'">'+v5+'</option> <option value="'+v6+'">'+v6+'</option><option value="'+v7+'">'+v7+'</option>';
$("#"+divId+" #"+childId+" .ow-pagination-pageSize").each(function(i) {
$(this).empty();
$(this).html(optionsStr);
$(this).val(v0).change();
//alert("i======"+i); 
});
	}catch(e){
		console.log("ERROR in Javascript function setPaganateSizeValueById(divId,size) ......."+e);
	}
}
function setProgressSearch(divId,childId,loadingId){
	try{
console.log("setProgressSearch......." +divId+"childId=="+childId ); 
    $("#"+divId+" #"+childId+" .ow-pagination-navgroup").children().each(function(i) {
    var classNme=$(this).attr("class");
    //alert(classNme);
   if(!("ow-pagination-pageLabel"==classNme || "ow-pagination-pageNbrLable"==classNme || "ow-pagination-pageNbrValue"==classNme)){
  $(this).click(function(){
	  console.dir($("#"+childId));
            $("#"+loadingId).show();
			var oftop=parseInt($("#"+childId).offset().top) - 250;
			//alert($("#"+childId).offset().top);
             $("#"+divId+" #"+childId+" .ow-vl-inner.list-wrapper").empty();
			  $('html').animate({
      scrollTop: oftop
    }, 1000);
  
      });
  }
  });
$("#"+divId+" #"+childId+" .ow-pagination-pageSize").change(function(){
                  $("#"+loadingId).show();
           $("#"+divId+" #"+childId+" .ow-vl-inner.ow-gbox.list-wrapper").empty();

    });     
	}catch(e){
		console.log("ERROR in Javascript function setProgressSearch ......."+e);
	}
}

function setShowProgressSearch(divId,childId,loadingId){
	try{
console.log("setShowProgressSearch......." ); 
     $("#"+loadingId).show();
             $("#"+divId+" #"+childId+" .ow-vl-inner.list-wrapper").empty();
	}catch(e){
		console.log("ERROR in Javascript function setShowProgressSearch ......."+e);
	}
}
function setPaganateSizeValueById(divId,childId,size,timeOut){
	try{
console.log("setPaganateSizeValueById(divId,size) ......."+divId+"size=="+size ); 
setTimeout(function(){ 
if(size>=10){
         return;
         } 
        var v0=size;
	    var v1=size*2;

   if( size<5){
    v1=size*3;
    }     
	   var v2=parseInt(30/size)*size;
       var v3=parseInt(50/size)*size;
       var v4=parseInt(100/size)*size;
      var v5=parseInt(250/size)*size;
      var v6=parseInt(500/size)*size;
     var v7=parseInt(1000/size)*size;
var optionsStr= '<option value="'+v0+'" selected="true">'+v0+'</option><option value="'+v1+'">'+v1+'</option><option value="'+v2+'">'+v2+'</option><option value="'+v3+'">'+v3+'</option><option value="'+v4+'">'+v4+'</option><option value="'+v5+'">'+v5+'</option> <option value="'+v6+'">'+v6+'</option><option value="'+v7+'">'+v7+'</option>';
$("#"+divId+" #"+childId+" .ow-pagination-pageSize").each(function(i) {
$(this).empty();
$(this).html(optionsStr);
$(this).val(v0).change();
//alert("i======"+i); 
});
 }, timeOut); 
         
	}catch(e){
		console.log("ERROR in Javascript function setPaganateSizeValueById(divId,size) ......."+e);
	}
}

function forceClickElement(divId,childId,fwkclass){
$("#"+divId+" #"+childId+" ."+fwkclass).click();
}
function hideLoadingElement(loadingId){
console.log("hideLoadingElement ......."+loadingId ); 
$("#"+loadingId).hide();
}