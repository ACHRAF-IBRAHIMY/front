function getAllCommuneObject(filters,sortBy,rev,size,from){
    var filtersObj = [];
    
    for(var i=0;i<filters[0].length;i++){
    var filter = {
    "term":{}     
    };
    
    filter["term"][filters[0][i]]=filters[1][i];
    filtersObj.push(filter);
      }
     
    var objSort = {};
    objSort[sortBy] = {"order":rev}
    
    
    
    var obj = {
    "size":size,"from":from,
    "query": {
    "bool": {
    "filter": filtersObj
    }
    },
    "sort" : [ objSort ]
    };
    
    return obj;
    }
    
    
    function restGetAllCommue(filters,sortBy,rev,size,from,type,currentPage){
    
    var obj = getAllCommuneObject(filters,sortBy,rev,size,from);
    console.log(JSON.stringify(obj));
    
    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking/_search",
    datatype: "application/json",
    contentType: "application/json",
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
      console.log(result);
      var totalPage = Math.ceil(result.hits.total.value/size);
      if(from==0|| from==1)currentPage=1;

    if(filters[0].length==1 && type==0 && rev=="desc" && sortBy=="indecators.score" ){
        var dec = true;
        var str = "";
        var trims = filters[1][0].split("-");
        if(trims[0]=="1"){
            str += "1er trimestre "+trims[1];
        }else if(trims[0]=="2"){
            str += "2éme trimestre "+trims[1];
        }else if(trims[0]=="3"){
            str += "3éme trimestre "+trims[1];
        }else if(trims[0]=="4"){
            str += "4éme trimestre "+trims[1];
        }
        try{
            if(transMap[str.replace(/ /g,"__")]!=undefined){
            var strTrans = transMap[str.replace(/ /g,"__")];
            }else{
            var strTrans = str
            }
    
            }catch(e){}
        dataReportRk.trim = strTrans;
        dataReportRk.data = [];
    }
    
    
    switch (type){
        case 0 : createCommuneTable(result,dec);createPaginationBarR({nbrPage:totalPage,begin:0,size:size,filters:filters,sortBy:sortBy,rev:rev,type:type,prev:false,currentPage:currentPage,nature:"communeglob"});break;
        case 1 : createBarTop3(result,".ranking-bar3-dl","delai");break;   
        case 2 : createBarTop3(result,".ranking-bar3-at","attractivite");break;   
        case 3 : createBarTop3(result,".ranking-bar3-dg","digital");break;   
        case 4 : createBarTop3(result,".ranking-bar3-es","ecosystem");break;   
        case 5 : createBarTop3(result,".ranking-bar3-fs","fiscalite");break; 
        case 6 : createBarTop10(result,".ranking-bar10-U","scoreU");break;  
       //  case 7 : createBarTop10(result,".ranking-bar10-E","scoreE");break;  
    }
       
    
    },
    error: function (error) {
      console.log(error);
    }
    })
    
    };
    function  searchAll(){
        var myinput = document.getElementById("myInput");
        var text = myinput.value;
     var trim = $(".ranking-fieldset #period option:selected").val();
    var region = $(".ranking-fieldset #region option:selected").val();
    var prefecture = $(".ranking-fieldset #prefecture option:selected").val();
    var rankBy = $(".ranking-fieldset #rankBy option:selected").val();
    
    var filters = [];
    var filtersBy = [];

    if(trim=="default"){
      filters.push("trim.keyword");
      filtersBy.push(tabInd[0]);
    }else{
      filters.push("trim.keyword");
      filtersBy.push(trim);
    }

    if( !(region=="default" || rankBy!="commune") ){
      filters.push("région.keyword");
      filtersBy.push(region);
    }

    if( !(region=="default" || rankBy!="commune1") ){
      filters.push("région.keyword");
      filtersBy.push(region);
    }

     if( !(region=="default" || rankBy!="arrondissement") ){
      filters.push("région.keyword");
      filtersBy.push(region);
    }
   if( !(region=="default" || rankBy!="communesml") ){
      filters.push("région.keyword");
      filtersBy.push(region);
    }
      if( !(region=="default" || rankBy!="communemed") ){
      filters.push("région.keyword");
      filtersBy.push(region);
    }
     if( !(region=="default" || rankBy!="prefecture") ){
      filters.push("région.keyword");
      filtersBy.push(region);
    }

    if( !(prefecture=="default" || rankBy=="region" || rankBy=="ville" || rankBy=="prefecture") ){
      filters.push("prefecture.keyword");
      filtersBy.push(prefecture);
    }
    
    tabInd = [];
    tabInd.push(trim);
    tabInd.push(region);
    tabInd.push(prefecture);
    var filtersObj = [];
    var myfilters=[filters,filtersBy];
     var sortBy="commune";
     var rev="desc";
    var size=2000;
     var from=0;
     for(var i=0;i<myfilters[0].length;i++){
     var filter = {
     "term":{}     
     };
     
     filter["term"][myfilters[0][i]]=myfilters[1][i];
     filtersObj.push(filter);
       }
      console.log("this is filter "+filtersObj);
      console.log("this is rankBy "+rankBy);
      if(text.length<3) {
         if(text.length==0){
        if(rankBy=="commune"){
            restGetAllCommue([filters,filtersBy],"indecators.score","desc",200,0,0);
           
          }else if(rankBy=="commune1"){
            restGetAllCommune1([filters,filtersBy],"indecators.score","desc",200,0,0);
 
          }else if(rankBy=="arrondissement"){
            restGetAllarrondissement([filters,filtersBy],"indecators.score","desc",200,0,0);
  
          }else if(rankBy=="prefecture"){
            restGetAllPrefecture([filters,filtersBy],"indecators.score","desc",200,0,0);
      
          }else if(rankBy=="region"){ 
            restGetAllRegion([filters,filtersBy],"indecators.score","desc",100,0,0);
        
          }else if(rankBy=="ville"){
            restGetAllVille([filters,filtersBy],"indecators.score","desc",100,0,0);
  
          
           }else if(rankBy=="communesml"){
            restGetAllSmlCommune([filters,filtersBy],"indecators.score","desc",200,0,0);

          
             }else if(rankBy=="communemed"){
            restGetAllMedCommune([filters,filtersBy],"indecators.score","desc",200,0,0);
     
          }
        }
        else return null;
      }

     var objSort = {};
     objSort[sortBy] = {"order":rev}
     
     
     var index=""; 
     var field="commune";
     if(rankBy=="commune")
      index="index_ranking";
     else if(rankBy=="commune1")
      index="index_ranking_comm";
     else if(rankBy=="arrondissement")
    	 index="index_ranking_arr";
     else if(rankBy=="communesml")
    	 index="index_ranking_smlcom";
     else if(rankBy=="communemed")
    	 index="index_ranking_medcom";
     else if(rankBy=="prefecture"){
    	 index="index_ranking_prefecture";
         field="prefecture";
     }
     else if(rankBy=="region"){
    	 index="index_ranking_region";
         field="région";
     }
     else if(rankBy=="ville"){
    	 index="index_ranking_ville";
         field="ville";
     }
     var obj = {
     "size":size,"from":from,
     "query": {
     "bool": {
     "filter": filtersObj,
     "must":[{
         "query_string":{
             "fields":[field],
             "query":"*"+text+"*",
             "fuzziness":"AUTO",
             "minimum_should_match":"100%"}}],
     "should":[{"match_phrase_prefix":{"value":text}}]
     }
     },
     };
     
     
     console.log(JSON.stringify(obj));
     
     $.ajax({
     type: "post",
     url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/"+index+"/_search",
     datatype: "application/json",
     contentType: "application/json",
     data: JSON.stringify(obj),
     beforeSend: function (xhr) {
       xhr.setRequestHeader("Authorization", AUTH);
     },
     success: function (result) {
       console.log(result);
     
     if(myfilters[0].length==1  && rev=="desc" && sortBy==field ){
         var dec = true;
         var str = "";
         var trims = myfilters[1][0].split("-");
         if(trims[0]=="1"){
             str += "1er trimestre "+trims[1];
         }else if(trims[0]=="2"){
             str += "2éme trimestre "+trims[1];
         }else if(trims[0]=="3"){
             str += "3éme trimestre "+trims[1];
         }else if(trims[0]=="4"){
             str += "4éme trimestre "+trims[1];
         }
         try{
             if(transMap[str.replace(/ /g,"__")]!=undefined){
             var strTrans = transMap[str.replace(/ /g,"__")];
             }else{
             var strTrans = str
             }
     
             }catch(e){}
        
     }
     
     
     if(rankBy=="commune" || rankBy=="commune1" || rankBy=="arrondissement" || rankBy=="communesml" || rankBy=="communemed")
    	 createCommuneTable(result,dec);
     else if(rankBy=="prefecture")
    	 createCommuneTableP(result,dec);
     else if(rankBy=="region")
    	 createCommuneTableG(result,dec);
     else if(rankBy=="ville")
    	 createCommuneTableV(result,dec);

        
         
        //  case 7 : createBarTop10(result,".ranking-bar10-E","scoreE");break;  
     
        
     
     },
     error: function (error) {
       console.log(error);
     }
     })
};
function restGetAllMedCommune(filters,sortBy,rev,size,from,type,currentPage){
        
        var obj = getAllCommuneObject(filters,sortBy,rev,size,from);
        
        console.log(JSON.stringify(obj));
        
        $.ajax({
        type: "post",
        url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking_medcom/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
          console.log(result);
        
        
          var totalPage = Math.ceil(result.hits.total.value/size);
          if(from==0|| from==1)currentPage=1;

        
        if(filters[0].length==1 && type==0 && rev=="desc" && sortBy=="indecators.score" ){
            var dec = true;
            var str = "";
            var trims = filters[1][0].split("-");
            if(trims[0]=="1"){
                str += "1er trimestre "+trims[1];
            }else if(trims[0]=="2"){
                str += "2éme trimestre "+trims[1];
            }else if(trims[0]=="3"){
                str += "3éme trimestre "+trims[1];
            }else if(trims[0]=="4"){
                str += "4éme trimestre "+trims[1];
            }
            try{
                if(transMap[str.replace(/ /g,"__")]!=undefined){
                var strTrans = transMap[str.replace(/ /g,"__")];
                }else{
                var strTrans = str
                }
        
                }catch(e){}
            dataReportRk.trim = strTrans;
            dataReportRk.type = "commune";
            dataReportRk.data = [];
        }
        
        
        switch (type){
            case 0 : createCommuneTable(result,dec);createPaginationBarR({nbrPage:totalPage,begin:0,size:size,filters:filters,sortBy:sortBy,rev:rev,type:type,prev:false,currentPage:currentPage,nature:"communemed"});break;
            case 1 : createBarTop3(result,".ranking-bar3-dl","delai");break;   
            case 2 : createBarTop3(result,".ranking-bar3-at","attractivite");break;   
            case 3 : createBarTop3(result,".ranking-bar3-dg","digital");break;   
            case 4 : createBarTop3(result,".ranking-bar3-es","ecosystem");break;   
            case 5 : createBarTop3(result,".ranking-bar3-fs","fiscalite");break; 
            case 6 : createBarTop10(result,".ranking-bar10-U","scoreU");break;  
         //   case 7 : createBarTop10(result,".ranking-bar10-E","scoreE");break;  
        }
           
        
        },
        error: function (error) {
          console.log(error);
        }
        })
        
        };  
 function restGetAllSmlCommune(filters,sortBy,rev,size,from,type,currentPage){
        
        var obj = getAllCommuneObject(filters,sortBy,rev,size,from);
        
        console.log(JSON.stringify(obj));
        
        $.ajax({
        type: "post",
        url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking_smlcom/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
          console.log(result);
        
          var totalPage = Math.ceil(result.hits.total.value/size);
          if(from==0|| from==1)currentPage=1;
        
        
        if(filters[0].length==1 && type==0 && rev=="desc" && sortBy=="indecators.score" ){
            var dec = true;
            var str = "";
            var trims = filters[1][0].split("-");
            if(trims[0]=="1"){
                str += "1er trimestre "+trims[1];
            }else if(trims[0]=="2"){
                str += "2éme trimestre "+trims[1];
            }else if(trims[0]=="3"){
                str += "3éme trimestre "+trims[1];
            }else if(trims[0]=="4"){
                str += "4éme trimestre "+trims[1];
            }
            try{
                if(transMap[str.replace(/ /g,"__")]!=undefined){
                var strTrans = transMap[str.replace(/ /g,"__")];
                }else{
                var strTrans = str
                }
        
                }catch(e){}
            dataReportRk.trim = strTrans;
            dataReportRk.data = [];
            dataReportRk.type = "commune";

        }
        
        
        switch (type){
            case 0 : createCommuneTable(result,dec);createPaginationBarR({nbrPage:totalPage,begin:0,size:size,filters:filters,sortBy:sortBy,rev:rev,type:type,prev:false,currentPage:currentPage,nature:"communesml"});break;
            case 1 : createBarTop3(result,".ranking-bar3-dl","delai");break;   
            case 2 : createBarTop3(result,".ranking-bar3-at","attractivite");break;   
            case 3 : createBarTop3(result,".ranking-bar3-dg","digital");break;   
            case 4 : createBarTop3(result,".ranking-bar3-es","ecosystem");break;   
            case 5 : createBarTop3(result,".ranking-bar3-fs","fiscalite");break; 
            case 6 : createBarTop10(result,".ranking-bar10-U","scoreU");break;  
           // case 7 : createBarTop10(result,".ranking-bar10-E","scoreE");break;  
        }
           
        
        },
        error: function (error) {
          console.log(error);
        }
        })
        
        };

    
    function restGetAllarrondissement(filters,sortBy,rev,size,from,type,currentPage){
    
    var obj = getAllCommuneObject(filters,sortBy,rev,size,from);
    
    console.log(JSON.stringify(obj));
    
    $.ajax({
      type: "post",
      url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking_arr/_search",
      datatype: "application/json",
      contentType: "application/json",
      data: JSON.stringify(obj),
      beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization", AUTH);
      },
      success: function (result) {
          console.log(result);

          var totalPage = Math.ceil(result.hits.total.value/size);
          if(from==0|| from==1)currentPage=1;

        
    
        
    
        if(filters[0].length==1 && type==0 && rev=="desc" && sortBy=="indecators.score" ){
            var dec = true;
            var str = "";
            var trims = filters[1][0].split("-");
            if(trims[0]=="1"){
                str += "1er trimestre "+trims[1];
            }else if(trims[0]=="2"){
                str += "2éme trimestre "+trims[1];
            }else if(trims[0]=="3"){
                str += "3éme trimestre "+trims[1];
            }else if(trims[0]=="4"){
                str += "4éme trimestre "+trims[1];
            }
            try{
                if(transMap[str.replace(/ /g,"__")]!=undefined){
                var strTrans = transMap[str.replace(/ /g,"__")];
                }else{
                var strTrans = str
                }
        
                }catch(e){}
            dataReportRk.trim = strTrans;
            dataReportRk.data = [];
            dataReportRk.type = "commune";

        }
    
    
        switch (type){
            case 0 : createCommuneTable(result,dec);createPaginationBarR({nbrPage:totalPage,begin:0,size:size,filters:filters,sortBy:sortBy,rev:rev,type:type,prev:false,currentPage:currentPage,nature:"arrondissement"}); break;
            case 1 : createBarTop3(result,".ranking-bar3-dl","delai");break;   
            case 2 : createBarTop3(result,".ranking-bar3-at","attractivite");break;   
            case 3 : createBarTop3(result,".ranking-bar3-dg","digital");break;   
            case 4 : createBarTop3(result,".ranking-bar3-es","ecosystem");break;   
            case 5 : createBarTop3(result,".ranking-bar3-fs","fiscalite");break; 
            case 6 : createBarTop10(result,".ranking-bar10-U","scoreU");break;  
           // case 7 : createBarTop10(result,".ranking-bar10-E","scoreE");break;  
        }
           
    
      },
      error: function (error) {
          console.log(error);
      }
    })
    
    };
    
    function restGetAllCommune1(filters,sortBy,rev,size,from,type,currentPage){
    
    var obj = getAllCommuneObject(filters,sortBy,rev,size,from);
    
    console.log(JSON.stringify(obj));
    
    $.ajax({
          type: "post",
          url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking_comm/_search",
          datatype: "application/json",
          contentType: "application/json",
          data: JSON.stringify(obj),
          beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", AUTH);
          },
          success: function (result) {
              console.log(result);
            

              var totalPage = Math.ceil(result.hits.total.value/size);
              if(from==0|| from==1)currentPage=1;

            
            
    
            if(filters[0].length==1 && type==0 && rev=="desc" && sortBy=="indecators.score" ){
                var dec = true;
                var str = "";
                var trims = filters[1][0].split("-");
                if(trims[0]=="1"){
                    str += "1er trimestre "+trims[1];
                }else if(trims[0]=="2"){
                    str += "2éme trimestre "+trims[1];
                }else if(trims[0]=="3"){
                    str += "3éme trimestre "+trims[1];
                }else if(trims[0]=="4"){
                    str += "4éme trimestre "+trims[1];
                }
                try{
                    if(transMap[str.replace(/ /g,"__")]!=undefined){
                    var strTrans = transMap[str.replace(/ /g,"__")];
                    }else{
                    var strTrans = str
                    }
            
                    }catch(e){}
                dataReportRk.trim = strTrans;
                dataReportRk.data = [];
                dataReportRk.type = "commune";

            }
    
    
            switch (type){
                case 0 : createCommuneTable(result,dec);createPaginationBarR({nbrPage:totalPage,begin:0,size:size,filters:filters,sortBy:sortBy,rev:rev,type:type,prev:false,currentPage:currentPage,nature:"communes"});break;
                case 1 : createBarTop3(result,".ranking-bar3-dl","delai");break;   
                case 2 : createBarTop3(result,".ranking-bar3-at","attractivite");break;   
                case 3 : createBarTop3(result,".ranking-bar3-dg","digital");break;   
                case 4 : createBarTop3(result,".ranking-bar3-es","ecosystem");break;   
                case 5 : createBarTop3(result,".ranking-bar3-fs","fiscalite");break; 
                case 6 : createBarTop10(result,".ranking-bar10-U","scoreU");break;  
              //  case 7 : createBarTop10(result,".ranking-bar10-E","scoreE");break;  
            }
               
    
          },
          error: function (error) {
              console.log(error);
          }
      }) 
    
    };
    
    
    function restGetAllPrefecture(filters,sortBy,rev,size,from,type){
    
    var obj = getAllCommuneObject(filters,sortBy,rev,size,from);
    
    console.log(JSON.stringify(obj));
    
    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking_prefecture/_search",
    datatype: "application/json",
    contentType: "application/json",
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
      console.log(result);
      var p = document.getElementById('pagination');
    	p.innerHTML="";
      if(filters[0].length==1 && type==0 && rev=="desc" && sortBy=="indecators.score" ){
          var dec = true;
          var str = "";
          var trims = filters[1][0].split("-");
          if(trims[0]=="1"){
              str += "1er trimestre "+trims[1];
          }else if(trims[0]=="2"){
              str += "2éme trimestre "+trims[1];
          }else if(trims[0]=="3"){
              str += "3éme trimestre "+trims[1];
          }else if(trims[0]=="4"){
              str += "4éme trimestre "+trims[1];
          }
          try{
              if(transMap[str.replace(/ /g,"__")]!=undefined){
              var strTrans = transMap[str.replace(/ /g,"__")];
              }else{
              var strTrans = str
              }
      
              }catch(e){}
          dataReportRk.trim = strTrans;
          dataReportRk.data = [];
          dataReportRk.type = "prefecture";

      } 
    switch (type){
        case 0 : createCommuneTableP(result,dec);break;
        case 1 : createBarTop3P(result,".ranking-bar3-dl","delai");break;   
        case 2 : createBarTop3P(result,".ranking-bar3-at","attractivite");break;   
        case 3 : createBarTop3P(result,".ranking-bar3-dg","digital");break;   
        case 4 : createBarTop3P(result,".ranking-bar3-es","ecosystem");break;   
        case 5 : createBarTop3P(result,".ranking-bar3-fs","fiscalite");break; 
        case 6 : createBarTop10P(result,".ranking-bar10-U","score");break;  
      //  case 7 : createBarTop10P(result,".ranking-bar10-E","scoreE");break;  
    }
       
    
    },
    error: function (error) {
      console.log(error);
    }
    })
    
    };
    
    function restGetAllRegion(filters,sortBy,rev,size,from,type){
    
    var obj = getAllCommuneObject(filters,sortBy,rev,size,from);
    
    console.log(JSON.stringify(obj));
    
    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking_region/_search",
    datatype: "application/json",
    contentType: "application/json",
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
      console.log(result);
      var p = document.getElementById('pagination');
    	p.innerHTML="";
      if(filters[0].length==1 && type==0 && rev=="desc" && sortBy=="indecators.score" ){
          var dec = true;
          var str = "";
          var trims = filters[1][0].split("-");
          if(trims[0]=="1"){
              str += "1er trimestre "+trims[1];
          }else if(trims[0]=="2"){
              str += "2éme trimestre "+trims[1];
          }else if(trims[0]=="3"){
              str += "3éme trimestre "+trims[1];
          }else if(trims[0]=="4"){
              str += "4éme trimestre "+trims[1];
          }
          try{
              if(transMap[str.replace(/ /g,"__")]!=undefined){
              var strTrans = transMap[str.replace(/ /g,"__")];
              }else{
              var strTrans = str
              }
      
              }catch(e){}
          dataReportRk.trim = strTrans;
          dataReportRk.data = [];
          dataReportRk.type = "region";

      } 
    switch (type){
        case 0 : createCommuneTableG(result);break;
        case 1 : createBarTop3G(result,".ranking-bar3-dl","delai");break;   
        case 2 : createBarTop3G(result,".ranking-bar3-at","attractivite");break;   
        case 3 : createBarTop3G(result,".ranking-bar3-dg","digital");break;   
        case 4 : createBarTop3G(result,".ranking-bar3-es","ecosystem");break;   
        case 5 : createBarTop3G(result,".ranking-bar3-fs","fiscalite");break; 
        case 6 : createBarTop10G(result,".ranking-bar10-U","score");break;  
       // case 7 : createBarTop10G(result,".ranking-bar10-E","scoreE");break;  
    }
       
    
    },
    error: function (error) {
      console.log(error);
    }
    })
    
    };
    
    function restGetAllVille(filters,sortBy,rev,size,from,type){
    
    var obj = getAllCommuneObject(filters,sortBy,rev,size,from);
    
    console.log(JSON.stringify(obj));
    
    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking_ville/_search",
    datatype: "application/json",
    contentType: "application/json",
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
      console.log(result);
      var p = document.getElementById('pagination');
    	p.innerHTML="";
      if(filters[0].length==1 && type==0 && rev=="desc" && sortBy=="indecators.score" ){
          var dec = true;
          var str = "";
          var trims = filters[1][0].split("-");
          if(trims[0]=="1"){
              str += "1er trimestre "+trims[1];
          }else if(trims[0]=="2"){
              str += "2éme trimestre "+trims[1];
          }else if(trims[0]=="3"){
              str += "3éme trimestre "+trims[1];
          }else if(trims[0]=="4"){
              str += "4éme trimestre "+trims[1];
          }
          try{
              if(transMap[str.replace(/ /g,"__")]!=undefined){
              var strTrans = transMap[str.replace(/ /g,"__")];
              }else{
              var strTrans = str
              }
      
              }catch(e){}
          dataReportRk.trim = strTrans;
          dataReportRk.data = [];
          dataReportRk.type = "ville";

      } 
    switch (type){
        case 0 : createCommuneTableV(result);break;
        case 1 : createBarTop3V(result,".ranking-bar3-dl","delai");break;   
        case 2 : createBarTop3V(result,".ranking-bar3-at","attractivite");break;   
        case 3 : createBarTop3V(result,".ranking-bar3-dg","digital");break;   
        case 4 : createBarTop3V(result,".ranking-bar3-es","ecosystem");break;   
        case 5 : createBarTop3V(result,".ranking-bar3-fs","fiscalite");break; 
        case 6 : createBarTop10V(result,".ranking-bar10-U","score");break;  
       // case 7 : createBarTop10(result,".ranking-bar10-E","scoreE");break;  
    }
       
    
    },
    error: function (error) {
      console.log(error);
    }
    })
    
    };
    
    function sortByRanking(tabs,classe,val,type){
    
    if(val=="commune" || val=="commune1" || val=="arrondissement" || val=="communemed" || val=="communesml" ){
    var newTabs = tabs;
    }else if(val=="prefecture"){
    	
    var newTabs = [];
    newTabs.push(tabs[0]);
    newTabs.push(tabs[1]);
   
    }else if(val=="region"){
    var newTabs = [];
    newTabs.push(tabs[0]);
    	
    }else if(val=="ville"){
   var newTabs = [];
    newTabs.push(tabs[0]);
    	
    }
    var p = document.getElementsByClassName('active');
      var from=p[0].innerText-1;
    if(val=="commune"){
    if(classe=="rank-dl"){
    restGetAllCommue(getFiltersArray(newTabs),"indecators.delai",type,200,from,0)
    }else if(classe=="rank-dg"){
    restGetAllCommue(getFiltersArray(newTabs),"indecators.digital",type,200,from,0)
    }else if(classe=="rank-at"){
    restGetAllCommue(getFiltersArray(newTabs),"indecators.attractivite",type,200,from,0)
    }else if(classe=="rank-es"){
    restGetAllCommue(getFiltersArray(newTabs),"indecators.ecosystem",type,200,from,0)
    }else if(classe=="rank-fs"){
    restGetAllCommue(getFiltersArray(newTabs),"indecators.fiscalite",type,200,from,0)
    }else if(classe=="sp-td"){
    restGetAllCommue(getFiltersArray(newTabs),"indecators.score",type,200,from,0)
    }
    }else if(val=="commune1"){
    if(classe=="rank-dl"){
        restGetAllCommune1(getFiltersArray(newTabs),"indecators.delai",type,200,from,0)
      }else if(classe=="rank-dg"){
        restGetAllCommune1(getFiltersArray(newTabs),"indecators.digital",type,200,from,0)
      }else if(classe=="rank-at"){
        restGetAllCommune1(getFiltersArray(newTabs),"indecators.attractivite",type,200,from,0)
      }else if(classe=="rank-es"){
        restGetAllCommune1(getFiltersArray(newTabs),"indecators.ecosystem",type,200,from,0)
      }else if(classe=="rank-fs"){
        restGetAllCommune1(getFiltersArray(newTabs),"indecators.fiscalite",type,200,from,0)
      }else if(classe=="sp-td"){
        restGetAllCommune1(getFiltersArray(newTabs),"indecators.score",type,200,from,0)
      }
    }else if(val=="arrondissement"){
    if(classe=="rank-dl"){
    restGetAllarrondissement(getFiltersArray(newTabs),"indecators.delai",type,200,from,0)
    }else if(classe=="rank-dg"){
    restGetAllarrondissement(getFiltersArray(newTabs),"indecators.digital",type,200,from,0)
    }else if(classe=="rank-at"){
    restGetAllarrondissement(getFiltersArray(newTabs),"indecators.attractivite",type,200,from,0)
    }else if(classe=="rank-es"){
    restGetAllarrondissement(getFiltersArray(newTabs),"indecators.ecosystem",type,200,from,0)
    }else if(classe=="rank-fs"){
    restGetAllarrondissement(getFiltersArray(newTabs),"indecators.fiscalite",type,200,from,0)
    }else if(classe=="sp-td"){
    restGetAllarrondissement(getFiltersArray(newTabs),"indecators.score",type,200,from,0)
    }
    }else if(val=="prefecture"){
    if(classe=="rank-dl"){
    restGetAllPrefecture(getFiltersArray(newTabs),"indecators.delai",type,200,from,0)
    }else if(classe=="rank-dg"){
    restGetAllPrefecture(getFiltersArray(newTabs),"indecators.digital",type,200,from,0)
    }else if(classe=="rank-at"){
    restGetAllPrefecture(getFiltersArray(newTabs),"indecators.attractivite",type,200,from,0)
    }else if(classe=="rank-es"){
    restGetAllPrefecture(getFiltersArray(newTabs),"indecators.ecosystem",type,200,from,0)
    }else if(classe=="rank-fs"){
    restGetAllPrefecture(getFiltersArray(newTabs),"indecators.fiscalite",type,200,from,0)
    }else if(classe=="sp-td"){
    restGetAllPrefecture(getFiltersArray(newTabs),"indecators.score",type,200,from,0)
    }
    }else if(val=="region"){
    if(classe=="rank-dl"){
    restGetAllRegion(getFiltersArray(newTabs),"indecators.delai",type,200,from,0)
    }else if(classe=="rank-dg"){
    restGetAllRegion(getFiltersArray(newTabs),"indecators.digital",type,200,from,0)
    }else if(classe=="rank-at"){
    restGetAllRegion(getFiltersArray(newTabs),"indecators.attractivite",type,200,from,0)
    }else if(classe=="rank-es"){
    restGetAllRegion(getFiltersArray(newTabs),"indecators.ecosystem",type,200,from,0)
    }else if(classe=="rank-fs"){
    restGetAllRegion(getFiltersArray(newTabs),"indecators.fiscalite",type,200,from,0)
    }else if(classe=="sp-td"){
    restGetAllRegion(getFiltersArray(newTabs),"indecators.score",type,200,from,0)
    }
    }else if(val=="ville"){
    if(classe=="rank-dl"){
    restGetAllVille(getFiltersArray(newTabs),"indecators.delai",type,200,from,0)
    }else if(classe=="rank-dg"){
    restGetAllVille(getFiltersArray(newTabs),"indecators.digital",type,200,from,0)
    }else if(classe=="rank-at"){
    restGetAllVille(getFiltersArray(newTabs),"indecators.attractivite",type,200,from,0)
    }else if(classe=="rank-es"){
    restGetAllVille(getFiltersArray(newTabs),"indecators.ecosystem",type,200,from,0)
    }else if(classe=="rank-fs"){
    restGetAllVille(getFiltersArray(newTabs),"indecators.fiscalite",type,200,from,0)
    }else if(classe=="sp-td"){
    restGetAllVille(getFiltersArray(newTabs),"indecators.score",type,200,from,0)
    }
    }
    else if(val=="communesml"){
        if(classe=="rank-dl"){
        restGetAllSmlCommune(getFiltersArray(newTabs),"indecators.delai",type,200,from,0)
        }else if(classe=="rank-dg"){
        restGetAllSmlCommune(getFiltersArray(newTabs),"indecators.digital",type,200,from,0)
        }else if(classe=="rank-at"){
        restGetAllSmlCommune(getFiltersArray(newTabs),"indecators.attractivite",type,200,from,0)
        }else if(classe=="rank-es"){
        restGetAllSmlCommune(getFiltersArray(newTabs),"indecators.ecosystem",type,200,from,0)
        }else if(classe=="rank-fs"){
        restGetAllSmlCommune(getFiltersArray(newTabs),"indecators.fiscalite",type,200,from,0)
        }else if(classe=="sp-td"){
        restGetAllSmlCommune(getFiltersArray(newTabs),"indecators.score",type,200,from,0)
        }
        }
    else if(val=="communemed"){
        if(classe=="rank-dl"){
        restGetAllMedCommune(getFiltersArray(newTabs),"indecators.delai",type,200,from,0)
        }else if(classe=="rank-dg"){
        restGetAllMedCommune(getFiltersArray(newTabs),"indecators.digital",type,200,from,0)
        }else if(classe=="rank-at"){
        restGetAllMedCommune(getFiltersArray(newTabs),"indecators.attractivite",type,200,from,0)
        }else if(classe=="rank-es"){
        restGetAllMedCommune(getFiltersArray(newTabs),"indecators.ecosystem",type,200,from,0)
        }else if(classe=="rank-fs"){
        restGetAllMedCommune(getFiltersArray(newTabs),"indecators.fiscalite",type,200,from,0)
        }else if(classe=="sp-td"){
        restGetAllMedCommune(getFiltersArray(newTabs),"indecators.score",type,200,from,0)
        }
        }
    }
    
    
    function createBarTop3(result,id,select){
    var bar = $(id);
    var results = result.hits.hits;
    
    bar.find(".div-bar-1 .bar1 .bottom-div").html("");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("");
    
    try{
        if(transMap[results[0]._source.commune.replace(/ /g,"__")]!=undefined){
            var communeTrans0 = transMap[results[0]._source.commune.replace(/ /g,"__")];
        }else{
            var communeTrans0 = results[0]._source.commune
        }
        if(transMap[results[1]._source.commune.replace(/ /g,"__")]!=undefined){
            var communeTrans1 = transMap[results[1]._source.commune.replace(/ /g,"__")];
        }else{
            var communeTrans1 = results[1]._source.commune
        }
        if(transMap[results[2]._source.commune.replace(/ /g,"__")]!=undefined){
            var communeTrans2 = transMap[results[2]._source.commune.replace(/ /g,"__")];
        }else{
            var communeTrans2 = results[2]._source.commune
        }

        }catch(e){}
    var cm1 = communeTrans1.replace("COMMUNE DE ","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    var cm2 = communeTrans0.replace("COMMUNE DE ","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    var cm3 = communeTrans2.replace("COMMUNE DE ","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    
    var hg1 = results[1]._source.indecators[select];
    var hg2 = results[0]._source.indecators[select];
    var hg3 = results[2]._source.indecators[select];
    
    bar.find(".div-bar-1 .bar1 .bottom-div").html("<div class=\"cm cm1\">"+cm1+"</div><div style=\"height:"+((hg1*135)/hg2+25)+"px\"><span>"+Number(hg1).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+2+"</span></div>");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("<div class=\"cm cm2\">"+cm2+"</div><div style=\"height:"+((hg2*135)/hg2+25)+"px\"><span>"+Number(hg2).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+1+"</span></div>");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("<div class=\"cm cm3\">"+cm3+"</div><div style=\"height:"+((hg3*135)/hg2+25)+"px\"><span>"+Number(hg3).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+3+"</span></div>");
    
    }
    
    function createBarTop10(result,id,select){
    var bar = $(id);
    bar.find(".div-1-top10").html("");
    bar.find(".div-3-top10").html("");
    
    var results = result.hits.hits;
    
    for(var i=0;i<results.length;i++){
        try{
            if(transMap[results[i]._source.commune.replace(/ /g,"__")]!=undefined){
            var communeTrans = transMap[results[i]._source.commune.replace(/ /g,"__")];
            }else{
            var communeTrans = results[i]._source.commune
            }
    
            }catch(e){}
    bar.find(".div-1-top10").append("<span>"+communeTrans+"</span>");
    bar.find(".div-3-top10").append("<div style=\"width:"+((results[i]._source.indecators[select]*80)/results[0]._source.indecators[select])+"%\" ><span>"+(i+1)+"</span></div><span class=\"nbr-div\">"+results[i]._source.indecators[select].toFixed(1)+"</span><br/>");
    }
    }  
    
    
    function createBarTop3P(result,id,select){
    var bar = $(id);
    var results = result.hits.hits;
    
    bar.find(".div-bar-1 .bar1 .bottom-div").html("");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("");
    
    var cm1 = results[1]._source.prefecture.replace("PROVINCE ","").replace("PRÉFECTURE ","").replace("PREFECTURE "," ").replace("ARRONDISSEMENT ","");
    var cm2 = results[0]._source.prefecture.replace("PROVINCE ","").replace("PRÉFECTURE ","").replace("PREFECTURE "," ").replace("ARRONDISSEMENT ","");
    var cm3 = results[2]._source.prefecture.replace("PROVINCE ","").replace("PRÉFECTURE ","").replace("PREFECTURE "," ").replace("ARRONDISSEMENT ","");
    
    var hg1 = results[1]._source.indecators[select];
    var hg2 = results[0]._source.indecators[select];
    var hg3 = results[2]._source.indecators[select];
    
    
    bar.find(".div-bar-1 .bar1 .bottom-div").html("<div class=\"cm cm1\">"+cm1+"</div><div style=\"height:"+((hg1*135)/hg2+25)+"px\"><span>"+Number(hg1).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+2+"</span></div>");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("<div class=\"cm cm2\">"+cm2+"</div><div style=\"height:"+((hg2*135)/hg2+25)+"px\"><span>"+Number(hg2).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+1+"</span></div>");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("<div class=\"cm cm3\">"+cm3+"</div><div style=\"height:"+((hg3*135)/hg2+25)+"px\"><span>"+Number(hg3).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+3+"</span></div>");
    }
    
    function createBarTop10P(result,id,select){
    
    var bar = $(id);
    bar.find(".div-1-top10").html("");
    bar.find(".div-3-top10").html("");
    
    var results = result.hits.hits;
    
    for(var i=0;i<results.length;i++){
    bar.find(".div-1-top10").append("<span>"+results[i]._source.prefecture+"</span>");
    bar.find(".div-3-top10").append("<div style=\"width:"+((results[i]._source.indecators[select]*80)/results[0]._source.indecators[select])+"%\" ><span>"+(i+1)+"</span></div><span class=\"nbr-div\">"+results[i]._source.indecators[select].toFixed(1)+"</span><br/>");
    }
    }
    
    
    function createBarTop3G(result,id,select){
    var bar = $(id);
    var results = result.hits.hits;
    
    bar.find(".div-bar-1 .bar1 .bottom-div").html("");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("");
    
    var cm1 = results[1]._source.région.replace("REGION DE ","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    var cm2 = results[0]._source.région.replace("REGION DE","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    var cm3 = results[2]._source.région.replace("REGION DE","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","");
    
    var hg1 = results[1]._source.indecators[select];
    var hg2 = results[0]._source.indecators[select];
    var hg3 = results[2]._source.indecators[select];
    
    
    bar.find(".div-bar-1 .bar1 .bottom-div").html("<div class=\"cm cm1\">"+cm1+"</div><div style=\"height:"+((hg1*135)/hg2+25)+"px\"><span>"+Number(hg1).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+2+"</span></div>");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("<div class=\"cm cm2\">"+cm2+"</div><div style=\"height:"+((hg2*135)/hg2+25)+"px\"><span>"+Number(hg2).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+1+"</span></div>");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("<div class=\"cm cm3\">"+cm3+"</div><div style=\"height:"+((hg3*135)/hg2+25)+"px\"><span>"+Number(hg3).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+3+"</span></div>");
    }
    
    function createBarTop10G(result,id,select){
    var bar = $(id);
    bar.find(".div-1-top10").html("");
    bar.find(".div-3-top10").html("");
    
    var results = result.hits.hits;
    
    for(var i=0;i<results.length;i++){
        try{
            if(transMap[results[i]._source.région.replace(/ /g,"__")]!=undefined){
            var regionTrans = transMap[results[i]._source.région.replace(/ /g,"__")];
            }else{
            var regionTrans = results[i]._source.région
            }
    
            }catch(e){}
    bar.find(".div-1-top10").append("<span>"+regionTrans+"</span>");
    bar.find(".div-3-top10").append("<div style=\"width:"+((results[i]._source.indecators[select]*80)/results[0]._source.indecators[select])+"%\" ><span>"+(i+1)+"</span></div><span class=\"nbr-div\">"+results[i]._source.indecators[select].toFixed(1)+"</span><br/>");
    }
    }
    
    function createBarTop3V(result,id,select){
    var bar = $(id);
    var results = result.hits.hits;
    
    bar.find(".div-bar-1 .bar1 .bottom-div").html("");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("");
    
    var cm1 = results[1]._source.ville.replace("REGION DE ","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","").replace("COMMUNE DE ","");
    var cm2 = results[0]._source.ville.replace("REGION DE","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","").replace("COMMUNE DE ","");
    var cm3 = results[2]._source.ville.replace("REGION DE","").replace("COMMUNE D'","").replace("COMMUNE "," ").replace("ARRONDISSEMENT ","").replace("COMMUNE DE ","");
    
    var hg1 = results[1]._source.indecators[select];
    var hg2 = results[0]._source.indecators[select];
    var hg3 = results[2]._source.indecators[select];
    
    
    bar.find(".div-bar-1 .bar1 .bottom-div").html("<div class=\"cm cm1\">"+cm1+"</div><div style=\"height:"+((hg1*135)/hg2+25)+"px\"><span>"+Number(hg1).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+2+"</span></div>");
    bar.find(".div-bar-1 .bar2 .bottom-div").html("<div class=\"cm cm2\">"+cm2+"</div><div style=\"height:"+((hg2*135)/hg2+25)+"px\"><span>"+Number(hg2).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+1+"</span></div>");
    bar.find(".div-bar-1 .bar3 .bottom-div").html("<div class=\"cm cm3\">"+cm3+"</div><div style=\"height:"+((hg3*135)/hg2+25)+"px\"><span>"+Number(hg3).toFixed(2)+"</span><span class=\"nbr-rnk\" >"+3+"</span></div>");
    }
    
    function createBarTop10V(result,id,select){
    var bar = $(id);
    bar.find(".div-1-top10").html("");
    bar.find(".div-3-top10").html("");
    
    var results = result.hits.hits;
    
    for(var i=0;i<results.length;i++){
        try{
            if(transMap[results[i]._source.ville.replace(/ /g,"__")]!=undefined){
            var communeTrans = transMap[results[i]._source.ville.replace(/ /g,"__")];
            }else{
            var communeTrans = results[i]._source.ville
            }
    
            }catch(e){}
    bar.find(".div-1-top10").append("<span>"+communeTrans+"</span>");
    bar.find(".div-3-top10").append("<div style=\"width:"+((results[i]._source.indecators[select]*80)/results[0]._source[select])+"%\" ><span>"+(i+1)+"</span></div><span class=\"nbr-div\">"+results[i]._source.indecators[select].toFixed(1)+"</span><br/>");
    }
    }
    function createPaginationBarR(param){

    	var nbrPage = param.nbrPage;
    	var begin = param.begin;
    	var prev = param.prev;
         var size = param.size;
          var filters=param.filters;
          var sortBy=param.sortBy;
          var rev=param.rev;
          var type=param.type;
          var currentPage=param.currentPage;
          var nature=param.nature;
          var p = document.getElementById('pagination');
      	p.innerHTML="";
      	console.log(p);
    	var a = document.createElement("a");
    	var aiangle="<i class=\"fas fa-angle-double-left\"></i>";
    
    	a.innerHTML=aiangle;
    	        a.addEventListener("click",function(){
    	            console.log("!next");
    	            previousPageR({"page":currentPage,"size":size,"filters":filters,"sortBy":sortBy,"rev":rev,"type":type,"nature":nature});
    	            event.preventDefault();
    	        });
    	p.append(a);

    	for(var i=begin;i<nbrPage;i++){
            console.log("this is i"+i);
    	    if(i==begin){
    	        a = document.createElement("a");
    	        a.innerHTML=begin+1;
    	        console.log("prev is"+prev);
    	      /*  if(prev==false){
    	            a.setAttribute("class","active");                
    	        }*/
    	        a.addEventListener("click",function(){
    	            event.preventDefault();
    	            console.log("1");
    	            getPageR({"page":begin+1,"prev":false,"size":size,"filters":filters,"sortBy":sortBy,"rev":rev,"type":type,"nature":nature});
    	        });

    	        p.append(a);
    	    }else{
    	        a = document.createElement("a");
    	    /*    if(prev==true && i==nbrPage-2){
    	        a.setAttribute("class","active");
    	        }*/
    	        var j=i+1;
    	        a.innerHTML=(j);
    	        a.addEventListener("click",function(event){
    	            event.preventDefault();
    	            console.log(this.innerHTML);
    	            getPageR({"page":Number(this.innerHTML),"prev":false,"size":size,"filters":filters,"sortBy":sortBy,"rev":rev,"type":type,"nature":nature});
    	            
    	        });
    	        p.append(a);        
    	    }
    	}
    	a = document.createElement("a");
    	a = document.createElement("a");
    	var aiangle="<i class=\"fas fa-angle-double-right\"></i>";
    	a.innerHTML=aiangle;
    	a.addEventListener("click",function(){
    	event.preventDefault();
    	    console.log("next");
    	    nextPageR({"page":currentPage,"size":size,"filters":filters,"sortBy":sortBy,"rev":rev,"type":type,"nature":nature,"nature":nature});
    	});        
    	p.append(a);
    	var elm = $("#pagination a");
        elm.get(currentPage).setAttribute("class","active");
    	}


    	function nextPageR(param){
            var currentPage=param.page;
    	if(currentPage!=6){
    	currentPage++;
    	getPageR({"page":currentPage,"size":param.size,"filters":param.filters,"sortBy":param.sortBy,"rev":param.rev,"type":param.type,"prev":false,"nature":param.nature});
    	}
    	}

    	function previousPageR(param){
            var currentPage=param.page;
    	if(1<currentPage){
    	currentPage--;
    	    getPageR({"page":currentPage,"size":param.size,"filters":param.filters,"sortBy":param.sortBy,"rev":param.rev,"type":param.type,"prev":true,"nature":param.nature});
    	}
    	}

    	function getPageR(param){
    		if(param.nature=="communeglob")
    		restGetAllCommue(param.filters,param.sortBy,param.rev,param.size,(param.page-1)*param.size,param.type,param.page)
    		else if(param.nature=="communemed")
    		restGetAllMedCommune(param.filters,param.sortBy,param.rev,param.size,(param.page-1)*param.size,param.type,param.page)
           else if(param.nature=="communesml")
    		restGetAllSmlCommune(param.filters,param.sortBy,param.rev,param.size,(param.page-1)*param.size,param.type,param.page)
    		   else if(param.nature=="communes")
    		restGetAllCommune1(param.filters,param.sortBy,param.rev,param.size,(param.page-1)*param.size,param.type,param.page)
    		   else if(param.nature=="arrondissement")
    		restGetAllArrondissement(param.filters,param.sortBy,param.rev,param.size,(param.page-1)*param.size,param.type,param.page)
    		var elm = $("#pagination a");
    		activePageBarR(elm,param);
    	}

    	function activePageBarR(elm,param){
        var currentPage=param.page;
        console.log("this current page "+currentPage);
    	elm.removeClass("active");
    	elm.get(currentPage).setAttribute("class","active");
    	}

    function updateTitles(){
    var trim = $(".ranking-fieldset #period option:selected").val();
    var region = $(".ranking-fieldset #region option:selected").val();
    var prefecture = $(".ranking-fieldset #prefecture option:selected").val();
    var str = "";
    $(".ranking-fieldset .ow-label-pl span").remove();
    var trims = trim.split("-");
    
    if(trims[0]=="1"){
    str += "1er trimestre "+trims[1];
    }else if(trims[0]=="2"){
    str += "2éme trimestre "+trims[1];
    }else if(trims[0]=="3"){
    str += "3éme trimestre "+trims[1];
    }else if(trims[0]=="4"){
    str += "4éme trimestre "+trims[1];
    }
    try{
        if(transMap[str.replace(/ /g,"__")]!=undefined){
            var strTrans = transMap[str.replace(/ /g,"__")];
        }else{
            var strTrans = str
        }
        if(transMap[region.replace(/ /g,"__")]!=undefined){
            var regionTrans = transMap[région.replace(/ /g,"__")];
        }else{
            var regionTrans = region
        }
        if(transMap[prefecture.replace(/ /g,"__")]!=undefined){
            var prefectureTrans = transMap[prefecture.replace(/ /g,"__")];
        }else{
            var prefectureTrans = prefecture
        }

        }catch(e){}
    
    if(region != "default"){
        strTrans += " | "+regionTrans;
    }
    
    if(prefecture != "default"){
        strTrans += " | "+prefectureTrans;
    }
    
    $(".ranking-fieldset > .ow-pl-toolbar .ow-label-pl").append("<span style=\"color:orange\"> "+strTrans+"</span>");
    }
    
    var dataReportRk = {
        date : [],
        trim : "",
        type : "",
    };
    
    function createCommuneTable(result,dec){
    var results = result.hits.hits;
    var tableHtml = $("#ranking-table2");
  
    
    //$("#ranking-table tr:not(.first-tr)").remove();
    $("#ranking-table2 tr:not(.first-tr)").remove();
    $("#ranking-table2 .err-msg-rk").remove();
    if(results.length==0){
        tableHtml.append("<span class=\"err-msg-rk\" style=\"display: block;margin-top: 50px;color: #333;font-size: 20px;\">"+transMap["ACPP00"]+"</span>");
    }else{
        $("#ranking-table2 tr:not(.first-tr)").remove();
    }
    
    for(var i=0;i<results.length;i++){
        var tr = $(document.createElement("tr"));
        var rankCom = results[i]._source.rankComp;
        var newRankComp = results[i]._source.newRankComp;
        var rankStr = "";
        
        if(dec == true){
        	
            dataReportRk.data.push(results[i]._source);
        }
    
        if(rankCom>0){
            rankStr = "<span><i style=\"color:green\" class=\"fas fa-arrow-up \"></i>"+" +"+rankCom+"</span>";
        }else if(rankCom<0){
            rankStr = "<span><i style=\"color:red\" class=\"fas fa-arrow-down\"></i>"+" "+rankCom+"</span>";
        }else{
        	if(results[i]._source.trim == "2-2021"){
	        	if(newRankComp == 1 || newRankComp == 1){
	        		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
	        	}
        	}else{
        		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
        	}
        }
        try{
            if(transMap[results[i]._source.commune.replace(/ /g,"__")]!=undefined){
            var communeTrans = transMap[results[i]._source.commune.replace(/ /g,"__")];
            var prefectureTrans = transMap[results[i]._source.prefecture.replace(/ /g,"__")];
            }else{
            var communeTrans = results[i]._source.commune
            var prefectureTrans = results[i]._source.prefecture
            }
    
            }catch(e){}
        tr.html(`<td class=\"commune-td\" style="font-size: 15px;text-align: left;padding-left: 30px;width: 28%;">`+`<span style=\"display: grid;grid-template-columns: 80% 20%;\" title=\"`+communeTrans+`\"><span>`+subLong(communeTrans,30)+`</span> `+rankStr+`</span><span style="display: block;color: orange;font-size: 11px;    margin-top: 1px;margin-left: 19px;">`+prefectureTrans+`</span></td>`);        
        $('.hidden-table-rank').append("<tr><td><span>"+subLong(communeTrans,30)+"</span>"+rankStr+"</span></td></tr>");
        tr.html(tr.html()+`<td class="sp-td">`+(results[i]._source.rank)+`</td>`);
        try{
            if(transMap["Petit projets : ".replace(/ /g,"__")]!=undefined){
                var ppTrans = transMap["Petit projets : ".replace(/ /g,"__")];
            }else{
                var ppTrans = "Petit projets : "
            }
            if(transMap[" jours".replace(/ /g,"__")]!=undefined){
                var joursTrans = transMap[" jours".replace(/ /g,"__")];
            }else{
                var joursTrans = " jours"
            }
            if(transMap["Grand projets : ".replace(/ /g,"__")]!=undefined){
                var gpTrans = transMap["Grand projets : ".replace(/ /g,"__")];
            }else{
                var gpTrans = "Grand projets : "
            }
            if(transMap[" jours - Petit projets : ".replace(/ /g,"__")]!=undefined){
                var jppTrans = transMap[" jours - Petit projets : ".replace(/ /g,"__")];
            }else{
                var jppTrans = " jours - Petit projets : "
            }
            if(transMap["Dossiers traités".replace(/ /g,"__")]!=undefined){
                var dtTrans = transMap["Dossiers traités".replace(/ /g,"__")];
            }else{
                var dtTrans = "Dossiers traités"
            }
    
            }catch(e){}
        if(results[i]._source.indecators.delaiPpV==-1){
            var titleText = gpTrans+(results[i]._source.indecators.delaiGpV).toFixed(2)+joursTrans;
        }
        if(results[i]._source.indecators.delaiGpV==-1) {
            var titleText = ppTrans+(results[i]._source.indecators.delaiPpV).toFixed(2)+joursTrans ;
        }
         if(results[i]._source.indecators.delaiGpV==-1 && results[i]._source.indecators.delaiPpV==-1 ){
            var titleText = "Pas de dossiers délivrés" ;

        }

     if(results[i]._source.indecators.delaiGpV!=-1 && results[i]._source.indecators.delaiPpV!=-1 ){
            var titleText = gpTrans+(results[i]._source.indecators.delaiPpV).toFixed(2)+joursTrans +jppTrans+(results[i]._source.indecators.delaiGpV).toFixed(2)+joursTrans;

        }
     console.log("check titleText "+titleText)
        tr.html(tr.html()+`<td class="sp-td">`+Math.floor(results[i]._source.indecators.score)+`</td>`);
        tr.html(tr.html()+`<td class="rm" title="">`+Math.floor(results[i]._source.indecators.delai)+`</td>`);
        tr.html(tr.html()+`<td class="rm" title="">`+Math.floor(results[i]._source.indecators.attractivite)+`<i class="fas fa-info-circle tooltip" title=""> <span class="tooltiptext">`+results[i]._source.indecators.attractiviteUV+dtTrans+` </span></i></td>`);
        tr.html(tr.html()+`<td class="rm" >`+Math.floor(results[i]._source.indecators.digital)+`</td>`);
        tr.html(tr.html()+`<td class="rm" >`+Math.floor(results[i]._source.indecators.ecosystem)+`</td>`);
        tr.html(tr.html()+`<td class="rm" title="">`+Math.floor(results[i]._source.indecators.fiscalite)+`</td>`);
        tableHtml.append(tr);
    }
    
    }
    
    function createCommuneTableP(result,dec){
    var results = result.hits.hits;
    var tableHtml = $("#ranking-table2");
    
    //$("#ranking-table tr:not(.first-tr)").remove();
    $("#ranking-table2 tr:not(.first-tr)").remove();
    $("#ranking-table2 .err-msg-rk").remove();
    if(results.length==0){
    tableHtml.append("<span class=\"err-msg-rk\" style=\"display: block;margin-top: 50px;color: #333;font-size: 20px;\">"+transMap["ACPP00"]+"</span>");
    }else{
    $("#ranking-table2 tr:not(.first-tr)").remove();
    }
    for(var i=0;i<results.length;i++){
    var tr = $(document.createElement("tr"));
    var rankCom = results[i]._source.rankComp;
    var newRankComp = results[i]._source.newRankComp;
    var rankStr = "";
    if(dec == true){
        dataReportRk.data.push(results[i]._source);
    }
    if(rankCom>0){
        rankStr = "<span><i style=\"color:green\" class=\"fas fa-arrow-up \"></i>"+" +"+rankCom+"</span>";
    }else if(rankCom<0){
        rankStr = "<span><i style=\"color:red\" class=\"fas fa-arrow-down\"></i>"+" "+rankCom+"</span>";
    }else{
    	if(results[i]._source.trim == "2-2021"){
	    	if(newRankComp == 1){
	    		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
	    	}
    	}else{
    		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
    	}
    }
    tr.html(`<td class=\"commune-td\" style="font-size: 15px;text-align: left;padding-left: 30px;width: 28%;">`+"<span style=\"display: grid;grid-template-columns: 80% 20%;\" title=\""+results[i]._source.prefecture+"\"><span>"+(i+1)+"- "+subLong(results[i]._source.prefecture,30)+"</span> "+rankStr+`</span></td>`);
    tr.html(tr.html()+`<td class="sp-td">`+(results[i]._source.rank)+`</td>`);
    tr.html(tr.html()+`<td class="sp-td">`+Math.floor(results[i]._source.indecators.score)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.delai)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.attractivite)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.digital)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.ecosystem)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.fiscalite)+`</td>`);
    tableHtml.append(tr);
    }
    
    }
    
    function createCommuneTableG(result){
    var results = result.hits.hits;
    var tableHtml = $("#ranking-table2");
    
    //$("#ranking-table tr:not(.first-tr)").remove();
    $("#ranking-table2 tr:not(.first-tr)").remove();
    $("#ranking-table2 .err-msg-rk").remove();
    
    if(results.length==0){
    tableHtml.append("<span class=\"err-msg-rk\" style=\"display: block;margin-top: 50px;color: #333;font-size: 20px;\">"+transMap["ACPP00"]+"</span>");
    }else{
    $("#ranking-table2 tr:not(.first-tr)").remove();
    }
    
    for(var i=0;i<results.length;i++){
    var tr = $(document.createElement("tr"));
    var rankCom = results[i]._source.rankComp;
    var newRankComp = results[i]._source.newRankComp;
    var rankStr = "";
    
    if(rankCom>0){
    	rankStr = "<span><i style=\"color:green\" class=\"fas fa-arrow-up \"></i>"+" +"+rankCom+"</span>";
    }else if(rankCom<0){
    	rankStr = "<span><i style=\"color:red\" class=\"fas fa-arrow-down\"></i>"+" "+rankCom+"</span>";
    }else{
    	if(results[i]._source.trim == "2-2021"){
	    	if(newRankComp == 1){
	    		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
	    	}
    	}else{
    		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
    	}
    }
    try{
        if(transMap[results[i]._source.région.replace(/ /g,"__")]!=undefined){
        var regionTrans = transMap[results[i]._source.région.replace(/ /g,"__")];
        }else{
        var regionTrans = results[i]._source.région
        }

        }catch(e){}
    tr.html(`<td class=\"commune-td\" style="font-size: 15px;text-align: left;padding-left: 30px;width: 28%;">`+"<span style=\"display: grid;grid-template-columns: 80% 20%;\" title=\""+regionTrans+"\"><span>"+(i+1)+"- "+subLong(regionTrans,30)+"</span> "+rankStr+`</span></td>`);
    tr.html(tr.html()+`<td class="sp-td">`+(results[i]._source.rank)+`</td>`);
    tr.html(tr.html()+`<td class="sp-td">`+Math.floor(results[i]._source.indecators.score)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.delai)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.attractivite)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.digital)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.ecosystem)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.indecators.fiscalite)+`</td>`);
    tableHtml.append(tr);
    }
    
    }
    
    
  /*  function createCommuneTableV(result){
    var results = result.hits.hits;
    var tableHtml = $("#ranking-table2");
    
    //$("#ranking-table tr:not(.first-tr)").remove();
    $("#ranking-table2 tr:not(.first-tr)").remove();
    $("#ranking-table2 .err-msg-rk").remove();
    
    if(results.length==0){
    tableHtml.append("<span class=\"err-msg-rk\" style=\"display: block;margin-top: 50px;color: #333;font-size: 20px;\">"+transMap["ACPP00"]+"</span>");
    }else{
    $("#ranking-table2 tr:not(.first-tr)").remove();
    }
    for(var i=0;i<results.length;i++){
    var tr = $(document.createElement("tr"));
    var rankCom = results[i]._source.rankComp;
    var newRankComp = results[i]._source.newRankComp;
    var rankStr = "";
    
    if(rankCom>0){
    	rankStr = "<span><i style=\"color:green\" class=\"fas fa-arrow-up \"></i>"+" +"+rankCom+"</span>";
    }else if(rankCom<0){
    	rankStr = "<span><i style=\"color:red\" class=\"fas fa-arrow-down\"></i>"+" "+rankCom+"</span>";
    }else{
    	if(results[i]._source.trim == "2-2021"){
	    	if(newRankComp == 1){
	    		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
	    	}
    	}else{
    		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
    	}
    }
    tr.html(`<td class=\"commune-td\" style="font-size: 15px;text-align: left;padding-left: 30px;width: 28%;">`+"<span style=\"display: grid;grid-template-columns: 80% 20%;\" title=\""+communeTrans+"\"><span>"+(i+1)+"- "+subLong(communeTrans,30)+"</span> "+rankStr+`</span></td>`);
    tr.html(tr.html()+`<td class="sp-td">`+(results[i]._source.rank)+`</td>`);
    tr.html(tr.html()+`<td class="sp-td">`+Math.floor(results[i]._source.score)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.delai)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.attractivite)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.digital)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.ecosystem)+`</td>`);
    tr.html(tr.html()+`<td>`+Math.floor(results[i]._source.fiscalite)+`</td>`);
    tableHtml.append(tr);
    }
    
    }
    */
    function createCommuneTableV(result){
        var results = result.hits.hits;
        var tableHtml = $("#ranking-table2");
        
        
        //$("#ranking-table tr:not(.first-tr)").remove();
        $("#ranking-table2 tr:not(.first-tr)").remove();
        $("#ranking-table2 .err-msg-rk").remove();
        if(results.length==0){
            tableHtml.append("<span class=\"err-msg-rk\" style=\"display: block;margin-top: 50px;color: #333;font-size: 20px;\">"+transMap["ACPP00"]+"</span>");
        }else{
            $("#ranking-table2 tr:not(.first-tr)").remove();
        }
        
        for(var i=0;i<results.length;i++){
            var tr = $(document.createElement("tr"));
            var rankCom = results[i]._source.rankComp;
            var newRankComp = results[i]._source.newRankComp;
            var rankStr = "";
            
            
        
            if(rankCom>0){
                rankStr = "<span><i style=\"color:green\" class=\"fas fa-arrow-up \"></i>"+" +"+rankCom+"</span>";
            }else if(rankCom<0){
                rankStr = "<span><i style=\"color:red\" class=\"fas fa-arrow-down\"></i>"+" "+rankCom+"</span>";
            }else{
            	if(results[i]._source.trim == "2-2021"){
    	        	if(newRankComp == 1 || newRankComp == 1){
    	        		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
    	        	}
            	}else{
            		rankStr = "<span><i style=\"color:blue\" class=\"fas fa-arrow-right\"></i>"+" +"+rankCom+"</span>";
            	}
            }
            try{
                if(transMap[results[i]._source.ville.replace(/ /g,"__")]!=undefined){
                var communeTrans = transMap[results[i]._source.ville.replace(/ /g,"__")];
                var prefectureTrans = transMap[results[i]._source.prefecture.replace(/ /g,"__")];
                }else{
                var communeTrans = results[i]._source.ville
                var prefectureTrans = results[i]._source.prefecture
                }
        
                }catch(e){console.log("error in ville ");}
            tr.html(`<td class=\"commune-td\" style="font-size: 15px;text-align: left;padding-left: 30px;width: 28%;">`+`<span style=\"display: grid;grid-template-columns: 80% 20%;\" title=\"`+communeTrans+`\"><span>`+(i+1)+`- `+subLong(communeTrans,30)+`</span> `+rankStr+`</span><span style="display: block;color: orange;font-size: 11px;    margin-top: 1px;margin-left: 19px;">`+prefectureTrans+`</span></td>`);        
            $('.hidden-table-rank').append("<tr><td><span>"+(i+1)+"- "+subLong(communeTrans,30)+"</span>"+rankStr+"</span></td></tr>");
            tr.html(tr.html()+`<td class="sp-td">`+(results[i]._source.rank)+`</td>`);
            try{
                if(transMap["Petit projets : ".replace(/ /g,"__")]!=undefined){
                    var ppTrans = transMap["Petit projets : ".replace(/ /g,"__")];
                }else{
                    var ppTrans = "Petit projets : "
                }
                if(transMap[" jours".replace(/ /g,"__")]!=undefined){
                    var joursTrans = transMap[" jours".replace(/ /g,"__")];
                }else{
                    var joursTrans = " jours"
                }
                if(transMap["Grand projets : ".replace(/ /g,"__")]!=undefined){
                    var gpTrans = transMap["Grand projets : ".replace(/ /g,"__")];
                }else{
                    var gpTrans = "Grand projets : "
                }
                if(transMap[" jours - Petit projets : ".replace(/ /g,"__")]!=undefined){
                    var jppTrans = transMap[" jours - Petit projets : ".replace(/ /g,"__")];
                }else{
                    var jppTrans = " jours - Petit projets : "
                }
                if(transMap["Dossiers traités".replace(/ /g,"__")]!=undefined){
                    var dtTrans = transMap["Dossiers traités".replace(/ /g,"__")];
                }else{
                    var dtTrans = "Dossiers traités"
                }
        
                }catch(e){}
            if(results[i]._source.indecators.delaiPpV==-1){
                var titleText = ppTrans+(results[i]._source.indecators.delaiGpV).toFixed(2)+joursTrans;
            }else if(results[i]._source.indecators.delaiGpV==-1) {
                var titleText = gpTrans+(results[i]._source.indecators.delaiPpV).toFixed(2) ;
            }
            else if(results[i]._source.indecators.delaiGpV==-1 && results[i]._source.indecators.delaiPpV==-1 ){
                var titleText = "Pas de dossiers délivrés" ;

            }
            else {
                var titleText = gpTrans+(results[i]._source.indecators.delaiPpV).toFixed(2) +jppTrans+(results[i]._source.indecators.delaiGpV).toFixed(2)+joursTrans;

            }
            tr.html(tr.html()+`<td class="sp-td">`+Math.floor(results[i]._source.indecators.score)+`</td>`);
            tr.html(tr.html()+`<td class="rm" title="">`+Math.floor(results[i]._source.indecators.delai)+`</td>`);
            tr.html(tr.html()+`<td class="rm" title="">`+Math.floor(results[i]._source.indecators.attractivite)+`</td>`);
            tr.html(tr.html()+`<td class="rm" >`+Math.floor(results[i]._source.indecators.digital)+`</td>`);
            tr.html(tr.html()+`<td class="rm" >`+Math.floor(results[i]._source.indecators.ecosystem)+`</td>`);
            tr.html(tr.html()+`<td class="rm" title="">`+Math.floor(results[i]._source.indecators.fiscalite)+`</td>`);
            tableHtml.append(tr);
        }
        
        }
    function getReportDataRk(root,context){
    root.dataReportRk = {};
    context.formRender.notifyObservers("dataReportRk");
    root.dataReportRk = dataReportRk;
    context.formRender.notifyObservers("dataReportRk");
    }
    
    
    function getAllByAggs(field,size,filter,byfilter,type){
    
    if(filter != null){
    var filterObj = {};
    filterObj[filter] = byfilter;
    
    var obj = {
    
    "aggs":{
        "filter_aggs":{
            "aggs" : {
        "genres" : {
            "terms" : { "field" : field,"size":size } 
        }
    },
    "filter" : { "term": filterObj }
        }
    }
    
    };
    
    }else{
    var obj = {
    
    
            "aggs" : {
        "genres" : {
            "terms" : { "field" : field,"size":size } 
        }
    }
    
    
    };
    }
    
    return $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking/_search",
    datatype: "application/json",
    contentType: "application/json",
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
        console.log(result);
    
        switch (type){
        case 0 : createSelectRanking(result,"#period",filter);break;
        case 1 : createSelectRanking(result,"#region",filter);break;   
        case 2 : createSelectRanking(result,"#prefecture",filter);break;      
        }
    
    },
    error: function (error) {
        console.log(error);
    }
    });
    }
    
    function getFiltersArray(arr){
    var  arrFilters = ["trim.keyword","région.keyword","prefecture.keyword","commune.keyword"];
    var array=[[],[]];
    
    for(var i=0;i<arr.length;i++){
    if(arr[i]=="default"){
    continue;
    }else{
    array[0].push(arrFilters[i]);
    array[1].push(arr[i]);
    }
    
    }
    
    return array;
    }
    
    function createSelectRanking(result,idHtml,filter){
    
    if(filter!=null){
    var elms = result.aggregations.filter_aggs.genres.buckets;
    }else{
    var elms = result.aggregations.genres.buckets;
    }
    
    if(idHtml=="#period"){
    elms = triPeriods(elms);
    }
    
    $(".ranking-fieldset "+idHtml+" option:not(.ranking-fieldset "+idHtml+" option:first-child)").remove();
    var select = $(".ranking-fieldset "+idHtml);  
    
    for(var i=0;i<elms.length;i++){
    var option = document.createElement("option");
    var str = "";
    if(idHtml=="#period"){
    var trims = elms[i].key.split("-");
    if(trims[0]=="1"){
        str += "1er trimestre "+trims[1];
    }else if(trims[0]=="2"){
        str += "2éme trimestre "+trims[1];
    }else if(trims[0]=="3"){
        str += "3éme trimestre "+trims[1];
    }else if(trims[0]=="4"){
        str += "4éme trimestre "+trims[1];
    }
    }else{
      str = elms[i].key;
    }
    try{
        if(transMap[str.replace(/ /g,"__")]!=undefined){
        var strTrans = transMap[str.replace(/ /g,"__")];
        }else{
        var strTrans = str
        }

        }catch(e){}
    
    option.innerHTML = strTrans;
    option.setAttribute("value",elms[i].key);
    
    if(!strTrans.includes("COMMUNE")){
     select.append(option);
    }
    
    }
    
    if(idHtml=="#period"){  
    $(".ranking-fieldset #period").val(elms[0].key);
    updateTitles();
    }
    }
    
    function triPeriods(elm){
    var newElm = [];
    
    if(elm.length!=0){
    newElm.push(elm[0]);
    }
    
    newElm = elm.sort(function(a,b){
    return -compareTrims(a.key,b.key);
    });
    
    
    return newElm;
    }
    
    function compareTrims(trimA,trimB){
    var trimAs = trimA.split("-");
    var trimBs = trimB.split("-");
    if(Number(trimAs[1])>Number(trimBs[1])){
    return 1;
    }else if(Number(trimAs[1])<Number(trimBs[1])){
    return -1;
    }else{
    if(Number(trimAs[0])<Number(trimBs[0])){
    return -1;
    }else{
    return 1;
    }
    }
    }
    
    
    var region_color = ["#4472C4","#FFC000","#264478","#AA8B2B","#ED7D31","##77ACDC","#AE6736","#255E91",
    "#B4B4B4","#70AD47","#7D7D7D","#43682B"];
    
    /*function getObjRankBy(trim,rankBy){
    return {"query" : {
    "term":{
    "trim.keyword":trim
    }
    },
    "aggregations": {
    "region_ind": {
      "aggregations": {
         "score": {
            "avg": {
               "field": "indecators.score"
            }
         },
          "delai": {
            "avg": {
               "field": "indecators.delai"
            }
            },"attractivite": {
            "avg": {
               "field": "indecators.attractivite"
            }
            },"digital": {
            "avg": {
               "field": "indecators.digital"
            }
            },"ecosystem": {
            "avg": {
               "field": "indecators.ecosystem"
            }
            },"fiscalite": {
            "avg": {
               "field": "indecators.fiscalite"
            }
            }
            }
         ,"terms": {
         "field": rankBy,
         "order": {
            "score": "desc"
         }
     }
    }}
    };
    
    }*/
    
    function drawRadarRegion(trim){
    
    var obj = {
        "query" : {
        "term":{
        "trim.keyword":trim
        }
    }};
    
    
    $.ajax({
    type: "post", 
    url: URL_SEARCH+"?operation=wselastic&shortUrl=" + "/index_ranking_region/_search",
    datatype: "application/json",
    contentType: "application/json",
    data: JSON.stringify(obj),
    beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
    console.log(result);
    
    var dataset = result.hits.hits;
    var datasets = [];
    
    console.log("dataset"+dataset);
    
    var legendDiv = $(".legend-region .lg");
    legendDiv.html("");
    
    for(var i = 0;i<dataset.length;i++){
        var dtobj = {
            label : dataset[i].key,
            borderColor : region_color[i],
            pointBackgroundColor : region_color[i],
            data: [
                dataset[i]._source.indecators.delai.toFixed(2),
                (dataset[i]._source.indecators.attractivite/5).toFixed(2),
                dataset[i]._source.indecators.digital.toFixed(2),
                dataset[i]._source.indecators.ecosystem.toFixed(2),
                dataset[i]._source.indecators.fiscalite.toFixed(2)
            ]
        }; 

        try{
            if(transMap[dataset[i]._source.région.replace(/ /g,"__")]!=undefined){
            var regionTrans = transMap[dataset[i]._source.région.replace(/ /g,"__")];
            }else{
            var regionTrans = dataset[i]._source.région
            }
    
            }catch(e){}
    
        datasets.push(dtobj);
        legendDiv.append("<div><hr style=\"background: "+region_color[i]+"\"><span>"+regionTrans.replace("REGION DE ","").replace("REGION ","")+"</span></div>");
    }

    try{
        if(transMap['Délai']!=undefined){
            var delaiTrans = transMap['Délai'];
        }else{
            var delaiTrans = 'Délai'
        }
        if(transMap['Attractivité-N']!=undefined){
            var attrTrans = transMap['Attractivité-N'];
        }else{
            var attrTrans = 'Attractivité-N'
        }
        if(transMap['Digital']!=undefined){
            var digitalTrans = transMap['Digital'];
        }else{
            var digitalTrans = 'Digital'
        }
        if(transMap['Ecosystème']!=undefined){
            var ecosystemeTrans = transMap['Ecosystème'];
        }else{
            var ecosystemeTrans = 'Ecosystème'
        }
        if(transMap['Fiscalité']!=undefined){
            var fiscaliteTrans = transMap['Fiscalité'];
        }else{
            var fiscaliteTrans = 'Fiscalité'
        }

        }catch(e){}
    
    
    var config = {
        type: 'radar',
        data: {
            labels: [delaiTrans, attrTrans, digitalTrans, ecosystemeTrans, fiscaliteTrans],
            datasets: datasets
            }
        ,
        options: {
            legend: {
                display: false
            },
            title: {
                display: false,
                text: 'Radar' 
            },
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };
    
    
    if(window.myRadar != undefined){
        window.myRadar.destroy();
    }
    window.myRadar = new Chart(document.getElementById('radarCanvas'), config);
    
    },
    error: function (error) {
    console.log(error);
    }
    });
    
    }
    
    function getAllProc(){
    var obj = {
    "size":100,"query":{
    "match_all":{}
    }
    };
    
    return $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/ranking_index_proc/_search",
    datatype: "application/json",
    contentType: "application/json",
    data:JSON.stringify(obj),
    beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
    
    var trs = $(".table-rk-pc tr");
    
    for(var i=1;i<trs.length;i++){
        trs.eq(i).remove();
    };
    
    var rss = result.hits.hits.sort(function(a,b){
        return Number(a._source.Nr)-Number(b._source.Nr);
    });
    
    for(var i=0;i<result.hits.hits.length;i++){
            var tr = document.createElement("tr");
            tr.setAttribute("typeIdd","null");
            tr.setAttribute("idd",result.hits.hits[i]._id);
    
            var td1 = document.createElement("td");
            var input1 = document.createElement("input");
            input1.setAttribute("value",result.hits.hits[i]._source.Nr);
            input1.setAttribute("style","border:none;width:100%;padding:4px 5px;text-align:center");
            input1.addEventListener("change",function(){
                this.parentNode.parentNode.setAttribute("typeIdd","update");
            });
            td1.appendChild(input1);
            var td2 = document.createElement("td");
            var input = document.createElement("input");
            input.setAttribute("value",result.hits.hits[i]._source.title);
            input.setAttribute("style","border:none;width:100%;padding:4px 5px;");
            input.addEventListener("change",function(){
                this.parentNode.parentNode.setAttribute("typeIdd","update");
            });
            td2.appendChild(input);
            var td3 = document.createElement("td");
            var icon = document.createElement("i");
            icon.setAttribute("class","fas fa-close");
            icon.setAttribute("style","cursor:pointer");
            icon.addEventListener("click",function(){
                this.parentNode.parentNode.setAttribute("typeIdd","delete");
                this.parentNode.parentNode.style.display = "none";
            });
    
            td3.appendChild(icon);
    
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            
            $(".table-rk-pc").append(tr);
        }
    },
    error: function (error) {
    console.log(error.responseText);
    }
    })
    }
    
    
    function getAllCommuneProc(liste,type){
    
    if(type==0){
    var obj = {
    "size":1500,"query":{
        "term":{
            "active":"1"               
        }
    }
    };
    }else{
    var obj = {
    "size":2000,"query":{
        "match_all":{}
    }
    };
    }
    
    
    
    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/ranking_index_communes/_search",
    datatype: "application/json",
    contentType: "application/json",
    data:JSON.stringify(obj),
    beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", AUTH);
    },
    success: function (result) {
    
    var trs = $(".table-rk-dg tr");
    
    for(var i=0;i<trs.length;i++){
        trs.eq(i).remove();
    };
    
    
    result.hits.hits.sort(function(a,b){
        return (a._source.commune > b._source.commune)?1:-1; 
    });
    
    liste.hits.hits.sort(function(a,b){
        return Number(a._source.Nr) - Number(b._source.Nr); 
    });
    
    var tr = document.createElement("tr");
    var td = document.createElement("th"); 
    td.innerHTML = "Commune";
    tr.appendChild(td);
    var procId = [];
    for(var i=0;i<liste.hits.hits.length;i++){
        td = document.createElement("th");
        td.innerHTML = "P "+(i+1);
        td.setAttribute("title",liste.hits.hits[i]._source.title);
        tr.appendChild(td);
        procId.push(liste.hits.hits[i]._id);
    };
    var td = document.createElement("th");
    td.innerHTML = "Bonus";
    td.setAttribute("style","width:50px");
    tr.appendChild(td);
    var td = document.createElement("th"); 
    td.innerHTML = "Score";
    tr.appendChild(td);
    var td = document.createElement("th"); 
    td.innerHTML = "Population";
    tr.appendChild(td);
    
    
    
    $(".table-rk-dg").append(tr);
    
    for(var i=0;i<result.hits.hits.length;i++){
            
            var tr = document.createElement("tr");
            tr.setAttribute("typeIdd","null");
            tr.setAttribute("idd",result.hits.hits[i]._id);
    
            var td1 = document.createElement("td");
            td1.innerHTML = result.hits.hits[i]._source.commune;
            td1.setAttribute("title",result.hits.hits[i]._source.commune);
            
            var tds = [];
    
            for(var j=0;j<procId.length;j++){
                td = document.createElement("td");
                td.setAttribute("idd",procId[j]);
                td.innerHTML = "<i class=\"far fa-smile\"></i><input type='checkbox' value='0' /> <i class=\"far fa-meh\"></i><input type='checkbox' value='0' />";
                td.setAttribute("title",liste.hits.hits[j]._source.title);
                td.addEventListener("click",function(){
                    this.parentNode.setAttribute("typeIdd","update");
                });
                tds.push(td);
            }
    
            var td = document.createElement("td");
            if(result.hits.hits[i]._source.bonus!= undefined){
                var input = document.createElement("input");
                input.setAttribute("value",result.hits.hits[i]._source.bonus);
                input.addEventListener("change",function(){
                    this.parentNode.parentNode.setAttribute("typeIdd","update");
                });
                td.appendChild(input);
            }else{
                var input = document.createElement("input");
                input.setAttribute("value",'0');
                input.addEventListener("change",function(){
                    this.parentNode.parentNode.setAttribute("typeIdd","update");
                });
                td.appendChild(input);
            }
    
            var tdPop = document.createElement("td");
            if(result.hits.hits[i]._source.population != undefined){
                var input = document.createElement("input");
                input.setAttribute("value",result.hits.hits[i]._source.population);
                input.addEventListener("change",function(){
                    this.parentNode.parentNode.setAttribute("typeIdd","update");
                });
                tdPop.appendChild(input);
            }else{
                var input = document.createElement("input");
                input.setAttribute("value",'0');
                input.addEventListener("change",function(){
                    this.parentNode.parentNode.setAttribute("typeIdd","update");
                });
                tdPop.appendChild(input);
            }
           
            if(result.hits.hits[i]._source.procs!=undefined){
                for(var j=0;j<result.hits.hits[i]._source.procs.length;j++){
                    
                    var indexProc = procId.indexOf(result.hits.hits[i]._source.procs[j].id);
                    if(indexProc!=-1){
                        if(result.hits.hits[i]._source.procs[j].value=='10'){
                            //tds[indexProc].innerHTML = "<input type='checkbox' value='"+result.hits.hits[i]._source.procs[j].value+"' checked />";
                            tds[indexProc].innerHTML = "<i class=\"far fa-smile\"></i><input type='checkbox' value='"+result.hits.hits[i]._source.procs[j].value+"' checked/> <i class=\"far fa-meh\"></i><input type='checkbox' value='"+result.hits.hits[i]._source.procs[j].value+"'  />";
                        }else if(result.hits.hits[i]._source.procs[j].value=='5'){
                            //tds[indexProc].innerHTML = "<input type='checkbox' value='"+result.hits.hits[i]._source.procs[j].value+"' checked />";
                            tds[indexProc].innerHTML = "<i class=\"far fa-smile\"></i><input type='checkbox' value='"+result.hits.hits[i]._source.procs[j].value+"'/> <i class=\"far fa-meh\"></i><input type='checkbox' value='"+result.hits.hits[i]._source.procs[j].value+"' checked />";
    
                        }
                    }
                };
            }
            
            var td2 = document.createElement("td");
            if(result.hits.hits[i]._source.score==undefined){
                td2.innerHTML = 0;
                td2.setAttribute("title",0);
            }else{
                td2.innerHTML = result.hits.hits[i]._source.score;
                td2.setAttribute("title",result.hits.hits[i]._source.score);
            }
            
        
            tr.appendChild(td1);
            
    
            for(var j=0;j<tds.length;j++){
                tr.appendChild(tds[j]);
            }
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(tdPop);
            //tr.appendChild(td2);
            //tr.appendChild(td3);
            
            $(".table-rk-dg").append(tr);
        }
    },
    error: function (error) {
    console.log(error.responseText);
    }
    })
    }
    
    function saveListProc(clas){
    var trs = $(clas+" tr");
    var listProc = [];
    for(var i=1;i<trs.length;i++){
    
    var obj = {
        "title": trs.eq(i).find("td input").eq(1).val(),
        "Nr": trs.eq(i).find("td input").eq(0).val(),
        "id": trs.eq(i).attr("idd"),
        "typeIdd":trs.eq(i).attr("typeIdd")
    };
    
    listProc.push(obj);
    }
    
    $(clas+" input").attr("disabled","disabled");
    sendBulkRequestProc(createBulkRequestProc(listProc)); 
    }
    
    function saveListCommune(clas){
    var trs = $(clas+" tr");
    var listProc = [];
    for(var i=1;i<trs.length;i++){
    
    var obj = {
    "id":trs.eq(i).attr('idd'),
    "typeIdd":trs.eq(i).attr("typeIdd"),
    "commune": trs.eq(i).find("td").eq(0).html(),
    "proc":[],
    "bonus": trs.eq(i).find("td").eq(trs.eq(i).find("td").length-3).find("input").eq(0).val(),
    "population":trs.eq(i).find("td").eq(trs.eq(i).find("td").length-1).find("input").eq(0).val(),
    "active":"1"
    };
    
    
    var score = 0;
    
    for(var j=1;j<trs.eq(i).find("td").length-3;j++){
    //alert(trs.eq(i).find("td").eq(j).attr("idd"));
    //alert(trs.eq(i).find("td").eq(j).find("input").eq(0).prop("checked"));
    var value1 = trs.eq(i).find("td").eq(j).find("input").eq(0).prop("checked")?'10':'0';
    var value2 = trs.eq(i).find("td").eq(j).find("input").eq(1).prop("checked")?'5':'0';
    
    if(value1=='10'){
        var value = '10';
    }else{
        if(value2=='5'){
            var value = '5'
        }else{
            var value = '0';
        }
    }
    
    var mObj = {
        "id":trs.eq(i).find("td").eq(j).attr("idd"),
        "value": value
    };
    
    score += Number(mObj.value);
    
    //alert(mObj);
    obj.proc.push(mObj);
    }
    
    score+= Number(obj.bonus);
    obj.score = score;
    
    listProc.push(obj);
    }
    
    $(clas+" input").attr("disabled","disabled");
    sendBulkRequestCommune(createBulkRequestCommune(listProc)); 
    }
    
    function createBulkRequestProc(liste){
    var str = "";
    
    liste.forEach(function(obj){
    if(obj.typeIdd=="add"){
    str+= '{ "index" : { "_index" : "ranking_index_proc" } }\n'
    str+= '{ "title":"'+obj.title+'","Nr":"'+obj.Nr+'" }\n';
    }else if(obj.typeIdd=="update"){
    str+='{ "update" : {"_id" : "'+obj.id+'", "_index" : "ranking_index_proc"} }\n';
    str+='{ "doc" : { "title":"'+obj.title+'","Nr":"'+obj.Nr+'" }}\n'
    }else if(obj.typeIdd=="delete"){
    str+='{ "delete" : { "_index" : "ranking_index_proc", "_id" : "'+obj.id+'" } }\n';
    }
    });
    
    return str;
    }
    
    function sendBulkRequestProc(bulk){
    
    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/_bulk",
    datatype: "application/json",
    contentType: "application/x-ndjson",
    data:bulk,
    beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", ADMIN_AUTH);
    },
    success: function (result) {
    setTimeout(function(){
        getAllProc().done(function(liste){
            getAllCommuneProc(liste,0);
        });
    },2000);
        },
    error: function (error) {
    alert("Ops !! Error"+error.responseText);
    getAllProc().done(function(liste){
        getAllCommuneProc(liste,0);
    });
    console.log(error.responseText);
    }
    })
    
    }
    
    function createBulkRequestCommune(liste){
    var str = "";
    
    liste.forEach(function(obj){
    
    if(obj.typeIdd=="update"){
    str+='{ "update" : {"_id" : "'+obj.id+'", "_index" : "ranking_index_communes"} }\n';
    str+='{ "doc" : { "commune":"'+obj.commune+'","procs":'+JSON.stringify(obj.proc)+',"bonus":"'+obj.bonus+'","population":"'+obj.population+'","active":"1","score":"'+obj.score+'" }}\n'
    }
    
    });
    
    return str;
    }
    
    function sendBulkRequestCommune(bulk){
    
    $.ajax({
    type: "post",
    url: URL_SEARCH+"?operation=wselastic&shortUrl="+"/_bulk",
    datatype: "application/json",
    contentType: "application/x-ndjson",
    data:bulk,
    beforeSend: function (xhr) {
    xhr.setRequestHeader("Authorization", ADMIN_AUTH);
    },
    success: function (result) {
    setTimeout(function(){
        getAllProc().done(function(liste){
            getAllCommuneProc(liste,0);
        });
    },2000);
    },
    error: function (error) {
    alert("Ops !! Error"+error.responseText);
    console.log(error.responseText);
    getAllProc().done(function(liste){
        getAllCommuneProc(liste,0);
    });
    }
    })
    
}