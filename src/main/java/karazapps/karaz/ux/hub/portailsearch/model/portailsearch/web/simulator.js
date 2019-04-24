
function createQuestion(type,obj){
    var q = document.createElement("div");
    q.setAttribute("class","ques-rep");
    var q1 = document.createElements("div");
    q1.setAttribute("class","ques");
    q1.innerHTML= obj.question;
    var q2 = document.createElements("div");
    q2.setAttribute("class","rep");
    
    if(type==0){
        var response = document.createElements("div");
        response.setAttribute("class","rep-type-0");
       for(var i=0;i<obj.reponse.length;i++){
         var resDiv = document.createElements("div");
         var res = document.createElements("span");
         res.setAttribute("class","rep-check");
         res.innerHTML = obj.reponse[i];   
         var check = document.createElements("span");
         check.setAttribute("class","check");
         var checkEnt = document.createElements("span");
         checkEnt.setAttribute("class","check-ent");
         check.appendChild(checkEnt);   
         resDiv.appendChild(check);
         resDiv.appendChild(res);
         response.appendChild(resDiv);
       }
        q2.appendChild(response);
        
    }else if(type==1){
        
       var response = document.createElements("select");
       response.setAttribute("class","rep-type-1");
       for(var i=0;i<obj.reponse.length;i++){
         var check = document.createElements("option");
         check.setAttribute("value",obj.reponse[i]);
         check.innerHTML = obj.reponse[i];   
         response.appendChild(check);
       }
        
    }else if(type==2){
        var response = document.createElements("input");
        response.setAttribute("class","rep-type-2");
    }else if(type==3){
        
    }
}