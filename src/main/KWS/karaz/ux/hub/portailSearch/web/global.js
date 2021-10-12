/* History Page */
var historyPages = [];
var indexOfHPage = 0;
var checkMap = true;
var homePage = {
    "path":"karaz/ux/hub/portailsearch/search/HomePage?query.typeArticle=0",
    "type":"search",
    "label":"ACCUEIL", 
    "obj":{}
};

historyPages.push(homePage);

/*if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('extensions/sworker.js').then(function(r){
            console.log('Service worker registered with scope: ', r.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
        });
    });
}*/

function addToHistory(obj) {
    historyPages.push(obj);
    indexOfHPage++;
}

function removeFromHistory() {
    var tempArray = [];
    for (var i = 0; i <= indexOfHPage; i++) {
        tempArray.push(historyPages[i]);
    }
    historyPages = tempArray;
}

function displaySearchByHisto(path, type, label, obj,typed) {
    var historique = {
        "path": path,
        "type": type,
        "label": label,
        "obj": obj,
        "typed":typed
    }

    console.log("historique=",historique);

    if(indexOfHPage!=historyPages.length-1){
        removeFromHistory();
    }
 
    history.pushState(null, document.title, location.href);
    addToHistory(historique);
    
    if(typed=="display"){
         ApplicationManager.displayObject(path,type,label,obj);
    }else{
         ApplicationManager.run(path, type, label, obj);
    }

} 

window.addEventListener('popstate', function (event) {
    if(indexOfHPage!=0){
     history.pushState(null, document.title, location.href);
     indexOfHPage--;
     var page = historyPages[indexOfHPage];
        if(page.typed=="display"){
            ApplicationManager.displayObject(page.path,page.type,page.label,page.obj);

        }else{
         ApplicationManager.run(page.path, page.type, page.label, page.obj);

        }
    }
});  
/* History Page */


/* from file karazapps/gis/raster/model/raster/web/raster.js  */

function drawRasterCarousel(l, rmin, rmax, cmin, cmax, cr, cc, offset, divId, srcPrfx) {
    var container = $("#" + divId + "-container");
    container.empty();
    console.log("container,", container);
    if (cc - offset >= cmin) {
        var left = $('<div/>', {
            id: divId + '-left',
            title: 'Left',
            'class': 'rasterCarouselLeft fa fa-chevron-left',
            'data-cmin': '' + cmin,
            'onclick': 'drawRasterCarousel(' + l + ', ' + rmin + ', ' + rmax + ', ' + cmin + ', ' + cmax + ', ' + cr + ', ' + (cc - offset) + ', ' + offset + ', "' + divId + '", "' + srcPrfx + '")'
        }).appendTo(container);
    }
    if (cc + offset <= cmax) {
        var right = $('<div/>', {
            id: divId + '-right',
            title: 'Left',
            'class': 'rasterCarouselRight fa fa-chevron-right',
            'data-cmin': '' + cmin,
            'onclick': 'drawRasterCarousel(' + l + ', ' + rmin + ', ' + rmax + ', ' + cmin + ', ' + cmax + ', ' + cr + ', ' + (cc + offset) + ', ' + offset + ', "' + divId + '", "' + srcPrfx + '")'
        }).appendTo(container);
    }
    if (cr + offset >= rmin) {
        var top = $('<div/>', {
            id: divId + '-top',
            title: 'Left',
            'class': 'rasterCarouselTop fa fa-chevron-up',
            'data-rmin': '' + rmin,
            'onclick': 'drawRasterCarousel(' + l + ', ' + rmin + ', ' + rmax + ', ' + cmin + ', ' + cmax + ', ' + (cr - offset) + ', ' + (cc) + ', ' + offset + ', "' + divId + '", "' + srcPrfx + '")'
        }).appendTo(container);
    }
    if (cr - offset <= rmax) {
        var bottom = $('<div/>', {
            id: divId + '-bottom',
            title: 'Left',
            'class': 'rasterCarouselBottom fa fa-chevron-down',
            'data-rmin': '' + rmin,
            'onclick': 'drawRasterCarousel(' + l + ', ' + rmin + ', ' + rmax + ', ' + cmin + ', ' + cmax + ', ' + (cr + offset) + ', ' + (cc) + ', ' + offset + ', "' + divId + '", "' + srcPrfx + '")'
        }).appendTo(container);
    }

    for (var ri = 0; ri < offset; ri++) {
        var bp = 10 + (80 / offset) * ri;
        var lp = 4;
        var wp = (80 / offset) - 1;
        var hp = (80 / offset) - 1;
        $('<div />', {
            text: "" + (ri + cr),
            'class': 'rasterCarouselRow',
            style: 'position: absolute; font-size:12px; font-family:Calibri; top : ' + bp + '%; left: ' + lp + '%;    '
        }).appendTo(container);
    }


    for (var ci = 0; ci < offset; ci++) {
        var tp = 7;
        var lp = 10 + (80 / offset) * ci;
        var wp = (80 / offset) - 1;
        var hp = (80 / offset) - 1;
        $('<div />', {
            text: "" + (ci + cc),
            'class': 'rasterCarouselCol',
            style: 'position: absolute; font-size:12px; font-family:Calibri; top : ' + tp + '%; left: ' + lp + '%;    '
        }).appendTo(container);
    }


    for (var ri = 0; ri < offset; ri++) {
        var ir = Math.pow(2, l) - (ri + cr);
        for (var ci = 0; ci < offset; ci++) {
            var bp = 10 + (80 / offset) * ri;
            var lp = 10 + (80 / offset) * ci;
            var wp = (80 / offset) - 1;
            var hp = (80 / offset) - 1;

            $('<img/>', {
                id: divId + '-img-' + ri + '-' + ci,
                src: srcPrfx.replace("(z)", "" + l).replace("(x)", "" + (ci + cc)).replace("(y)", "" + ir),
                'class': 'rasterCarouselImage',
                style: 'position: absolute; top : ' + bp + '%; left: ' + lp + '%; width: ' + wp + '%; height: ' + hp + '%;border: 1px dashed #004d40;',
                'data-c': '' + (cc + ci),
                'data-r': '' + (cr + ri),
                onerror: "if (this.src != 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=') this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='; "
            }).appendTo(container);
        }
    }
}/* from file karazapps/gis/zonebundle/model/zonebundle/web/zoneBundle.js  */

function zbGeoRefTableExport(xml) {
    window.console.log('zbGeoRefTableExport xml=' + xml);
    var xmlDoc = $.parseXML(xml);
    $xml = $(xmlDoc);
    var ret = "";
    $xml.find("geoRef").each(function () {
        ret = ret + $(this).find("borne").text() + " " + $(this).find("mapX").text() + " " + $(this).find("mapY").text() + "\n";
    });
    return ret;
}

function zbGeoRefTableImport(txt) {
    var lines = txt.split(/#+/g);
    var lc = lines.length;
    var xml = "<geoRefs>";
    for (i = 0; i < lc; i++) {
        var line = lines[i];
        var wrds = line.split(/\s+/g);
        var wc = wrds.length;
        if (wc > 1) {
            xml += "<geoRef><borne>" + wrds[0].replace(',', '.') + "</borne><mapX>" + wrds[1].replace(',', '.') + "</mapX><mapY>" + wrds[2].replace(',', '.') + "</mapY></geoRef>";
        }
    }
    window.console.log("zbGeoRefTableImport xml=" + xml);
    xml += "</geoRefs>";

    return xml;
}



function kgisJsToolsExport(xml, tmplt) {
    // alert("aucMapRefPolygonExport "+xml);
    window.console.log('kgisJsToolsExport  xml=' + xml);
    var xmlDoc = $.parseXML(xml);
    $xml = $(xmlDoc);
    var ret = "";
    $xml.children().each(function () {
        $(this).children().each(function () {
            //window.console.dir(this);
            $(this).children().each(function () {
                // window.console.dir(this);
                ret = ret + $(this).text() + "; ";
            });
            ret = ret + "\n";
        });
    });
    return ret;
}

function kgisJsToolsImport(txt, parentTag, tmplt) {
    window.console.log("kgisJsToolsImport txt= " + txt);
    window.console.log("kgisJsToolsImport parentTag= " + parentTag);
    window.console.log("kgisJsToolsImport tmplt= " + tmplt);
    var lines = txt.split(/#+/g);
    var lc = lines.length;
    var xml = "<" + parentTag + ">";
    //window.console.dir(lines);
    for (i = 0; i < lc; i++) {
        var line = lines[i];
        var wrds = line.split(/;\s*/g);
        //window.console.dir(wrds);
        var wc = wrds.length;
        var row = tmplt;

        for (j = 0; j < wc; j++) {
            row = row.replace('${' + j + '}', wrds[j].replace("_HASHTAG_", "#"));
        }
        xml += row.replace(/\[/g, "<").replace(/\]/g, ">");
    }
    xml += "</" + parentTag + ">";


    return xml;
}	/* from file karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/alertsearch.js  */

if ($(window).width() < 900) {

    $(".menu-body button").click(function () {
        $(".menu-body").slideUp();
    });


}


$(".header-logo .menu-bars").click(function () {
    $(".menu-body").slideToggle();
});

function toogleFieldSet(id) {
    if ($("#" + id + " .ow-tabpanel-flex").hasClass("expanded")) {
        $("#" + id + " .ow-tabpanel-flex").removeClass("expanded");
        $("#" + id + " .ow-body").hide();
    } else {
        $("#" + id + " .ow-tabpanel-flex").addClass("expanded");
        $("#" + id + " .ow-body").show();
    }

}


var alertMap = {
    "Warning": {
        iconAlrt: "fa-close",
        colorAlrt: "#FFF",
        bgColorAlrt: "green"
    }
}



function createAlertObject(context, root) {
    try {
        var type = root.typeAlrt;
        var costum = false;
        if (type == "Customize") {
            costum = true;
            var iconalrt = root.iconAlrt;
            var bgColorAlrt = root.bgColorAlrt;
            var colorAlrt = root.colorAlrt;
        } else {
            var iconalrt = alertMap[type].iconAlrt;
            var bgColorAlrt = alertMap[type].bgColorAlrt;
            var colorAlrt = alertMap[type].colorAlrt;
        }

        var text = context.formRender.targetPanel.find("#toolbarNBNB .ql-editor").html();
        var textGl = "";

        var iconGl = '<i class="fas ' + iconalrt + '"></i>';
        textGl = '<div class="marquenbnb" style="padding: 6px 2px;background:' + bgColorAlrt + '; color: ' + colorAlrt + ';">' + iconGl + ' ' + text + '<div>';

        context.formRender.targetPanel.find(".visual-nbnb marquee").html(textGl);
        context.formRender.targetPanel.find(".visual-nbnb marquee").css({
            "background": bgColorAlrt,
            "color": colorAlrt
        });

        console.log("textGl == ", textGl);

        var obj = {
            "active": root.statut,
            "type": type,
            "text": textGl
        }

        console.log("***", obj);

        return obj;

    } catch (e) {
        console.log(e);
        return null;
    }
}

function saveAlertMsg(context, root) {
    var obj = createAlertObject(context, root);
    updateAlert("", obj, context);
}

function loadAllAlerts(context) {

}

function updateAlert(id, obj, context) {

    console.log(JSON.stringify(obj));

    $.ajax({
        type: "post",

        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/newsbar_index/alert/" + id,
        datatype: "application/json",
        data: JSON.stringify(obj),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            //voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0);
            console.log("result", result);
            setTimeout(function () {
                refrechListalert(context);
            }, 2000);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function refrechListalert(context) {
    var obj = {
        "size": 100, "query": { "match_all": {} }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/newsbar_index/alert/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        }
    }).done(function (result) {
        console.log("result$$", result);

        createAlertsHtml(context, result.hits.hits);
    });

}

function createAlertsHtml(context, liste) {
    context.formRender.targetPanel.find(".list-nb-cnt").html("");

    liste.forEach(function (elm) {
        var hmlt = `<div class="ow-html visual-nbnb" style="margin-top:3pxdisplay:grid;">  
        <marquee>
        `+ elm._source.text + `
        </marquee>
        <button idd="${elm._id}">Modifier</button>
      </div>`;
        var htmlRender = context.formRender.targetPanel.find(".list-nb-cnt").html();
        context.formRender.targetPanel.find(".list-nb-cnt").html(htmlRender + " - " + hmlt);
    });
}
/* from file karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/articles.js  */

function addLike(user, id, target) {
    var obj = {
        "script": {
            "source": "ctx._source.like ++;ctx._source.liste_like.add(params.text)",
            "lang": "painless",
            "params": {

                "text": user

            }
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_update/" + id,
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function (result) {
            target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html()) + 1);
        }
    });
}

function removeLike(root, user, target) {
    var obj = {
        "script": {
            "source": "ctx._source.like --;ctx._source.liste_like.remove(ctx._source.liste_like.indexOf(params.tag.text))",
            "lang": "painless",
            "params": {
                "tag": {
                    "text": user
                }
            }
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_update/" + root.article._id,
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function () {
            target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
            target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html()) - 1);
            root.article._source.liste_like.splice(root.article._source.liste_like.indexOf(user), 1);
        }
    });
}

function isEmailValidArt(value) {
    try {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(value)) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log("ERROR in Javascript function isValidEmail(value) .......");
    }
}


function htmlToString(xml) {
    return xml.replace(/<[^>]*>?/gm, '');
}


function addComment(root, target, context, commentGb) {

    var text = context.formRender.targetPanel.find("#toolbarsecCom .ql-editor").html();
    root["articleComment"] = text;

    if (root["articleCommentName"].trim() == "") {
        target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre nom");
        return;
    }

    if (root["articleCommentLastName"].trim() == "") {
        target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre prénom");
        return;

    }

    if (!isEmailValidArt(root["articleCommentEmail"])) {
        target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre email valide")
        return;
    }

    if (htmlToString(root["articleComment"]).trim() == "") {
        target.find(".classSearch-82 .err-msg").html("Veuillez saisir votre commentaire");
        return;
    }

    var current_datetime = new Date();

    var dateYear = current_datetime.getFullYear();
    var dateMonths = (current_datetime.getMonth() + 1).toString().length == 1 ? "0" + (current_datetime.getMonth() + 1) : (current_datetime.getMonth() + 1);
    var dateDays = current_datetime.getDate().toString().length == 1 ? "0" + current_datetime.getDate() : current_datetime.getDate();

    // var hours = current_datetime.getHours().toString().length==1?"0"+current_datetime.getHours():current_datetime.getHours();
    // var minutes = current_datetime.getMinutes().toString().length==1?"0"+current_datetime.getMinutes():current_datetime.getMinutes();
    // var seconds = current_datetime.getSeconds().toString().length==1?"0"+current_datetime.getSeconds():current_datetime.getSeconds();

    var formatted_date = dateYear + "/" + dateMonths + "/" + dateDays;



    if (target.find(".comment-form span.rep-comment").attr("idd") == "") {
        var comment = {
            "nom": root["articleCommentName"],
            "prenom": root["articleCommentLastName"],
            "email": root["articleCommentEmail"],
            "text": root["articleComment"],
            "date": formatted_date,
            "comments": []
        };

        if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
            comment.admin = "true";
        }

        console.log("commentGb", commentGb)
        if (commentGb == true) {
            console.log("commentGb", commentGb)
            addCommentRestCmt(root, target, comment, context, -1);
        } else {
            addCommentRest(root, target, comment, context, -1);
        }

    } else {
        var comment = {
            "nom": root["articleCommentName"],
            "prenom": root["articleCommentLastName"],
            "email": root["articleCommentEmail"],
            "text": root["articleComment"],
            "date": formatted_date,
        };

        if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
            comment.admin = "true";
        }

        console.log("commentGb", commentGb)

        if (commentGb == true) {

            addCommentRestCmt(root, target, comment, context, Number(target.find(".comment-form span.rep-comment").attr("idd")));

        } else {
            addCommentRest(root, target, comment, context, Number(target.find(".comment-form span.rep-comment").attr("idd")));
        }
    }
}


function createDivComments(comments, target) {
    var commentsDr = sortCommentsByDateGb(comments).comments;
    var cmmIndex = sortCommentsByDateGb(comments).cmmIndex;

    var i = 0;
    target.find(".comments-list > .ow-vl-inner").html("");
    commentsDr.forEach(function (elm) {
        var div = document.createElement("div");
        div.setAttribute("class", "ow-vl ow-vbox");
        var div1 = document.createElement("div");
        div1.setAttribute("class", "ow-vl-inner ow-gbox grided-mobile");
        div1.setAttribute("style", "grid-template-columns: 100px auto;");
        var div2 = document.createElement("div");
        div2.setAttribute("class", "ow-vl ow-vbox comment-user-img");
        var div3 = document.createElement("div");
        div3.setAttribute("class", "ow-vl-inner");
        var div4 = document.createElement("div");
        div4.setAttribute("class", "ow-html");
        if (elm.admin != undefined) {
            div4.innerHTML = "<img src=" + "./img/picto-rokhas-color.svg" + " style=\"width: 78px;margin-top: 11px;\" />";
        } else {
            div4.innerHTML = "<img src=" + "./img/defaultAvatar.png" + " style=\"width: 78px;margin-top: 11px;\" />";
        }
        var div5 = document.createElement("div");
        div5.setAttribute("class", "ow-vl ow-vbox comment-det");
        var div6 = document.createElement("div");
        div6.setAttribute("class", "ow-vl-inner");
        var div7 = document.createElement("div");
        div7.setAttribute("class", "ow-html");
        var div8 = document.createElement("div");
        div8.setAttribute("class", "comment-user-name");
        div8.setAttribute("style", "font-size: 17px;font-weight: 600;");
        div8.innerHTML = elm.nom + " " + elm.prenom;
        if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
            div8.innerHTML += " " + elm.email
        }
        var div9 = document.createElement("div");
        div9.setAttribute("class", "comment-det");
        div9.innerHTML = elm.text;
        var div10 = document.createElement("div");
        div10.setAttribute("class", "div-date");
        div10.setAttribute("index", cmmIndex[i]);
        var span = document.createElement("span");
        span.innerHTML = elm.date + " | ";
        span.setAttribute("style", "font-size: 14px;display: inline-block;margin-right: 8px;")
        var span1 = document.createElement("span");
        span1.innerHTML = "Répondre à ce commentaire";
        span1.setAttribute("style", "cursor:pointer;font-size: 15px;color: #38A;");
        span1.addEventListener("click", function () {
            target.find(".comment-form h1.add-comment").hide();
            target.find(".comment-form span.rep-comment").show();
            target.find(".comment-form span.rep-comment").attr("idd", this.parentNode.getAttribute("index"));
            var pos = target.find(".classSearch-82 .comment-form").offset().top;
            $('html,body').animate(
                {
                    scrollTop: pos - 150
                },
                'slow');
        });

        div10.appendChild(span);
        div10.appendChild(span1);
        div7.appendChild(div8);
        div7.appendChild(div9);
        div7.appendChild(div10);
        div6.appendChild(div7);
        div5.appendChild(div6);
        div3.appendChild(div4);
        div2.appendChild(div3);
        div1.appendChild(div2);
        div1.appendChild(div5);
        div.appendChild(div1);
        i++;

        target.find(".comments-list > .ow-vl-inner").append(div);
        if (elm.comments != undefined) {
            elm.comments.forEach(function (e) {
                var div = document.createElement("div");
                div.setAttribute("class", "ow-vl ow-vbox");
                div.setAttribute("style", "margin-left: 70px;")
                var div1 = document.createElement("div");
                div1.setAttribute("class", "ow-vl-inner ow-gbox grided-mobile");
                div1.setAttribute("style", "grid-template-columns: 100px auto;");
                var div2 = document.createElement("div");
                div2.setAttribute("class", "ow-vl ow-vbox comment-user-img");
                var div3 = document.createElement("div");
                div3.setAttribute("class", "ow-vl-inner");
                var div4 = document.createElement("div");
                div4.setAttribute("class", "ow-html");
                if (e.admin != undefined) {
                    console.log(e.admin);
                    div4.innerHTML = "<img src=" + "./img/picto-rokhas-color.svg" + " style=\"width: 78px;margin-top: 11px;\" />";
                } else {
                    div4.innerHTML = "<img src=" + "./img/defaultAvatar.png" + " style=\"width: 78px;margin-top: 11px;\" />";
                }
                var div5 = document.createElement("div");
                div5.setAttribute("class", "ow-vl ow-vbox comment-det");
                var div6 = document.createElement("div");
                div6.setAttribute("class", "ow-vl-inner");
                var div7 = document.createElement("div");
                div7.setAttribute("class", "ow-html");
                var div8 = document.createElement("div");
                div8.setAttribute("class", "comment-user-name");
                div8.setAttribute("style", "font-size: 17px;font-weight: 600;");
                div8.innerHTML = e.nom + " " + e.prenom;
                if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
                    div8.innerHTML += " " + elm.email
                }
                var div9 = document.createElement("div");
                div9.setAttribute("class", "comment-det");
                div9.innerHTML = e.text;
                var div10 = document.createElement("div");
                div10.setAttribute("class", "div-date");
                div10.setAttribute("index", i);
                var span = document.createElement("span");
                span.innerHTML = e.date;
                span.setAttribute("style", "font-size: 14px;display: inline-block;margin-right: 8px;")
                div10.appendChild(span);
                div7.appendChild(div8);
                div7.appendChild(div9);
                div7.appendChild(div10);
                div6.appendChild(div7);
                div5.appendChild(div6);
                div3.appendChild(div4);
                div2.appendChild(div3);
                div1.appendChild(div2);
                div1.appendChild(div5);
                div.appendChild(div1);
                target.find(".comments-list > .ow-vl-inner").append(div);
            });
        };
    });
}


function addCommentRest(root, target, comment, context, type) {
    if (type == -1) {
        var obj = {
            "script": {
                "source": "ctx._source.comments.add(params.comment)",
                "lang": "painless",
                "params": {
                    "comment": comment
                }
            }
        };
    } else {
        var obj = {
            "script": {
                "source": "ctx._source.comments[params.index].comments.add(params.comment)",
                "lang": "painless",
                "params": {
                    "comment": comment,
                    "index": type
                }
            }
        };
    }


    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_update/" + root.article._id,
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function () {


            root.articleCommentName = "";
            root.articleCommentLastName = "";
            root.articleCommentEmail = "";
            root.articleComment = "";
            context.formRender.targetPanel.find("#toolbarsecCom .ql-editor").html("");

            context.formRender.notifyObservers("articleCommentName");
            context.formRender.notifyObservers("articleCommentLastName");
            context.formRender.notifyObservers("articleCommentEmail");
            context.formRender.notifyObservers("articleComment");

            getObjectArticle(root.query.idObject, root, target);


            //	     target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
            //	     target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);
        }
    });
}


function addCommentRestCmt(root, target, comment, context, type) {
    console.log("root add coment", root.article)

    if (type == -1) {
        var obj = {
            "script": {
                "source": "ctx._source.comments.add(params.comment)",
                "lang": "painless",
                "params": {
                    "comment": comment
                }
            }
        };
    } else {
        var obj = {
            "script": {
                "source": "ctx._source.comments[params.index].comments.add(params.comment)",
                "lang": "painless",
                "params": {
                    "comment": comment,
                    "index": type
                }
            }
        };
    }


    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/comments_index/_update/" + root.article._id,
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function (result) {
            console.log("result add coment", result)

            root.articleCommentName = "";
            root.articleCommentLastName = "";
            root.articleCommentEmail = "";
            root.articleComment = "";
            context.formRender.targetPanel.find("#toolbarsecCom .ql-editor").html("");

            context.formRender.notifyObservers("articleCommentName");
            context.formRender.notifyObservers("articleCommentLastName");
            context.formRender.notifyObservers("articleCommentEmail");
            context.formRender.notifyObservers("articleComment");


            getObjectArticleCmt(root.query.idObject, root, target)


            //	     target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
            //	     target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);
        }
    });
}


function verifierLike(user, array) {
    var userName = user.split(";")[0];
    var index = -1;

    if (userName == "anonymous@karaz") {

        if (document.cookie.indexOf("userRef") == -1) {
            document.cookie = "{\"userRef\":" + (new Date()).getTime() + "}";
            return true;
        } else {
            try {
                index = array.indexOf(userName + ";" + JSON.parse(document.cookie).userRef);
            } catch (e) {
                var a = document.cookie;
                var b = a.slice(a.indexOf("userRef") - 2, a.indexOf("}", a.indexOf("userRef")) + 1)
                index = array.indexOf(userName + ";" + JSON.parse(b).userRef);
            }
            if (index == -1) {
                return true;
            } else {
                return false;
            }
        }


    } else {
        for (var i = 0; i < array.length; i++) {
            if (array[i].split(";")[0] == userName) {
                return false;
            }
        }
    }

    return true;
}

function likeArticle(root, userQN, userIp, target) {
    var user = userQN + ";" + userIp;
    if (verifierLike(user, root.article._source.liste_like)) {
        target.find(".classSearch-82 .reseau-ss .like").addClass("active-like");
        if (userQN != "anonymous@karaz") {
            addLike(userQN + ";20191919", root.article._id, target);
        } else {
            try {
                addLike(userQN + ";" + JSON.parse(document.cookie).userRef, root.article._id, target);
            } catch (e) {
                var a = document.cookie;
                var b = a.slice(a.indexOf("userRef") - 2, a.indexOf("}", a.indexOf("userRef")) + 1);
                addLike(userQN + ";" + JSON.parse(b).userRef, root.article._id, target);
            }
        }

    }
}

function addVue(user, id, target) {
    var obj = {
        "script": {
            "source": "ctx._source.vue++;ctx._source.list_vue.add(params.text)",
            "lang": "painless",
            "params": {

                "text": user

            }
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_update/" + id,
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        }, success: function () {
            target.find(".classSearch-82 .date-det span.vue-span").html(Number(target.find(".classSearch-82 .date-det span.vue-span").html()) + 1);
        }
    });
}

// function verifierVue(user,array){
//     var userName = user.split(";")[0];
//     var userIp = user.split(";")[1];
//     var index = -1;

//     if(userName=="anonymous@karaz"){
//         index = array.indexOf(user);


//         if(index==-1){
//             return true;
//         }else{
//             return false;
//         }
//     }else{
//         array.forEach(function(elm){
//             if(elm.split(";")[0]==userName){
//                 return false;
//             }
//         });
//     } 

//     return true;
// }

function verifierVue(user, array) {
    var userName = user.split(";")[0];
    var index = -1;

    if (userName == "anonymous@karaz") {

        if (document.cookie.indexOf("userRef") == -1) {
            document.cookie = "{\"userRef\":" + (new Date()).getTime() + "}";
            return true;
        } else {
            try {
                index = array.indexOf(userName + ";" + JSON.parse(document.cookie).userRef);
            }
            catch (e) {
                var a = document.cookie;
                var b = a.slice(a.indexOf("userRef") - 2, a.indexOf("}", a.indexOf("userRef")) + 1)
                index = array.indexOf(userName + ";" + JSON.parse(b).userRef);
            }



            if (index == -1) {
                return true;
            } else {
                return false;
            }
        }


    } else {
        for (var i = 0; i < array.length; i++) {
            if (array[i].split(";")[0] == userName) {
                console.log("out");
                return false;
            }
        }

    }

    return true;
}

function vueArticle(root, userQN, userIp, target) {
    var user = userQN + ";" + userIp;
    if (verifierVue(user, root.article._source.list_vue)) {
        if (userQN != "anonymous@karaz") {
            addVue(userQN + ";20191919", root.article._id, target);
        } else {
            try {
                addVue(userQN + ";" + JSON.parse(document.cookie).userRef, root.article._id, target);

            } catch (e) {
                var a = document.cookie;
                var b = a.slice(a.indexOf("userRef") - 2, a.indexOf("}", a.indexOf("userRef")) + 1);
                addVue(userQN + ";" + JSON.parse(b).userRef, root.article._id, target);
            }
        }

    }
}


function getAllArticlesByType(prefix, type, varfl, pp, clas, root, context) {
    currentPage = 0;
    root.query.typeArticle = pp;
    context.formRender.notifyObservers("query.typeArticle");
    var pp = root.query.typeArticle;

    if (pp == "") {
        pp = 0;
    }

    if (root.query.typeArticle == "") {
        $(".classSearch-80 .vpanel-title .title-2x").html("TOUS");
    } else if (root.query.typeArticle == 1) {
        $(".classSearch-80 .vpanel-title .title-2x").html("PRATIQUE");
    } else if (root.query.typeArticle == 2) {
        $(".classSearch-80 .vpanel-title .title-2x").html("A LA UNE");
    } else if (root.query.typeArticle == 3) {
        $(".classSearch-80 .vpanel-title .title-2x").html("REVUE DE PRESSE");
    }

    restFullSearchList(prefix, type, varfl, pp, clas, context.formRender.targetPanel);
}

function createArticlesHtml(clas, result) {

    var divGlo = $(clas);
    divGlo.html("");

    result.forEach(function (elm) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "ow-vl ow-vbox article");

        var div2 = document.createElement("div");
        div2.setAttribute("class", "ow-vl-inner");

        var div3 = document.createElement("div");
        div3.setAttribute("class", "ow-html");

        var img = document.createElement("img");
        img.setAttribute("src", "" + elm._source.imgP);
        div3.appendChild(img);

        var div4 = document.createElement("div");
        div4.setAttribute("class", "ow-html toggle-art");
        div4.setAttribute("style", "padding:3px 12px;");


        var htitle = document.createElement("h3");
        htitle.innerHTML = elm._source.title;

        if (elm._source.lang == 'Ar') {
            htitle.setAttribute("style", "font-size:19px;font-weight: 600;font-family:Droid Arabic Kufi, sans-serif");
        } else {
            htitle.setAttribute("style", "font-size:19px;font-weight: 600;");
        }


        var par = document.createElement("p");
        if (elm._source.lang == 'Ar') {
            par.setAttribute("style", "color:#666;font-size:15px;text-align:right;font-family:Droid Arabic Kufi, sans-serif");
        } else {
            par.setAttribute("style", "color:#666;font-size:15px;text-align:left");
        }
        par.innerHTML = subLong(elm._source.description, 190);
        var tags = elm._source.tags;
        var div5 = document.createElement("div");

        for (var i = 0; i < tags.length; i++) {
            var span = document.createElement("span");
            span.setAttribute("class", "tag");
            span.innerHTML = tags[i].tag;
            div5.appendChild(span);
        }

        var div6 = document.createElement("div");
        div6.setAttribute("class", "pub-by");
        div6.setAttribute("style", "color:#333;font-size:15px");
        try {
            if (elm._source.type == "REVUE DE PRESSE") {
                div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">' + elm._source.source + '</span></span>';
            } else {
                div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">' + elm._source.author.split("|")[0].trim() + '</span> <span style="">' + elm._source.author.split("|")[1].trim() + '</span></span>';
            }
        }

        catch (e) {
            if (elm._source.type == "REVUE DE PRESSE") {
                div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">' + elm._source.source + '</span></span>';
            } else {
                div6.innerHTML = 'Publié par : <span style=""><span style="font-weight: 600;">' + elm._source.author + '</span></span>';
            }

        }

        div4.appendChild(htitle);
        div4.appendChild(par);
        div4.appendChild(div5);
        div4.appendChild(div6);

        var div7 = document.createElement("div");
        div7.setAttribute("class", "ow-html footer-article");
        div7.setAttribute("style", "color:#666;font-size:15px");

        var span2 = document.createElement("span");
        span2.innerHTML = '<i style="color:#38A" class="fas fa-calendar-alt"></i> ' + elm._source.datePr.split(" ")[0].replace(/-/g, "/");

        var span3 = document.createElement("span");
        span3.innerHTML = '<i style="color:#ce1515" class="fas fa-heart"></i> ' + elm._source.like;

        var span4 = document.createElement("span");
        span4.innerHTML = '<i class="fas fa-eye"></i> ' + elm._source.vue;
        div7.appendChild(span2);

        if (elm._source.type != "REVUE DE PRESSE") {
            div7.appendChild(span3);
            div7.appendChild(span4);
        }


        div2.appendChild(div3);
        div2.appendChild(div4);
        div2.appendChild(div7);

        div1.appendChild(div2);

        if (elm._source.type == "REVUE DE PRESSE") {
            div1.addEventListener("click", function () {
                window.open(elm._source.link);
            });
        } else {
            div1.addEventListener("click", function () {
                displaySearchByHisto(`karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject=${elm._id}`, `search`, `DetailsActivitySearch`, {});
            });
        }


        divGlo.append(div1);

    });
}


function getMostPopularArticle(size, type, clas) {
    var obj = {
        "size": size, "query": {
            "term": {
                "type.keyword": type
            }
        }, "sort": [{ "datePr.keyword": { "order": "desc" } }]


    };


    if (type == "") {
        obj = {
            "size": size, "query": {
                "bool": {
                    "must": {
                        "match_all": {}
                    },
                    "must_not": {
                        "bool": {
                            "must": [{
                                "term": {
                                    "type.keyword": "REVUE DE PRESSE"
                                }
                            }, {
                                "range": {
                                    "datePr.keyword": {
                                        "lte": "now-7d/d"
                                    }
                                }
                            }]
                        }

                    }
                }
            },
            "sort": [{ "datePr.keyword": { "order": "desc" } }]
        };
    }

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        }
    }).done(function (result) {
        createArticlesHtml(clas, result.hits.hits);
    });

}

var rootTest = {
    "article": {
        "_id": 1
    }
};

function removeCommentRest(root, target, comment, context, type) {
    if (type == -1) {
        var obj = {
            "script": {
                "source": "ctx._source.comments.remove(params.comment)",
                "lang": "painless",
                "params": {
                    "comment": comment
                }
            }
        };
    } else {
        var obj = {
            "script": {
                "source": "ctx._source.comments[params.context].comments.remove(params.comment)",
                "lang": "painless",
                "params": {
                    "comment": comment,
                    "context": context
                }
            }
        };
    }



    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_update/" + root.article._id,
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", ADMIN_AUTH);
        },
        success: function () {

            /*
            root.articleCommentName = "";
            root.articleCommentLastName = "";
            root.articleCommentEmail = "";
            root.articleComment = "";
    
            context.formRender.notifyObservers("articleCommentName");
            context.formRender.notifyObservers("articleCommentLastName");
            context.formRender.notifyObservers("articleCommentEmail");
            context.formRender.notifyObservers("articleComment");
        */
            getObjectArticle(root.article._id, root, target);

            //     target.find(".classSearch-82 .reseau-ss .like").removeClass("active-like");
            //     target.find(".classSearch-82 .date-det span.like-span").html(Number(target.find(".classSearch-82 .date-det span.like-span").html())-1);
        }
    });
}

function getObjectArticle(id, root, target) {
    target.find(".divSearch-article .search-details-icon img").show();
    $.ajax({
        type: "get",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/" + id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        }
    }).done(function (results) {

        var obj = results._source;
        root.article = results;
        vueArticle(root, userQN, userIp, target);

        target.find(".comment-form h1.add-comment").show();
        target.find(".comment-form span.rep-comment").hide();
        target.find(".comment-form span.rep-comment").attr("idd", "");

        if (!verifierLike(userQN + ";" + userIp, root.article._source.liste_like)) {
            target.find(".classSearch-82 .reseau-ss .like").addClass("active-like");
        }

        createDivComments(obj.comments, target);

        target.find(".classSearch-82 .vpanel-title .title-2x").html(obj.type);
        target.find(".classSearch-82 .vpanel-title .title-2x").click(function (e) {
            if (obj.type == "PRATIQUE") {
                typeArt = 1;
            } else if (obj.type == "A LA UNE") {
                typeArt = 2;
            } else if (obj.type == "REVUE DE PRESSE") {
                typeArt = 3;
            }
            displaySearchByHisto('karaz/ux/hub/portailsearch/search/ArticlesListe?query.typeArticle=' + typeArt, 'search', 'Articles', {});
        });
        target.find(".divSearch-article .article-title h1").html(obj.title);
        target.find(".divSearch-article .article-desc div p").html(obj.description);

        if (obj.lang == 'Ar') {
            target.find(".divSearch-article .article-title h1").css("text-align", "right");
            target.find(".divSearch-article .article-title h1").css("font-family", "Droid Arabic Kufi, sans-serif");

            target.find(".divSearch-article .article-desc div p").css("text-align", "right");
            target.find(".divSearch-article .article-desc div p").css("font-family", "Droid Arabic Kufi, sans-serif");

        }

        target.find(".divSearch-article .det-div .author-pub").html(obj.author);
        target.find(".divSearch-article .det-div .date-pub").html(obj.datePr.split(" ")[0].replace(/-/g, "/"));
        target.find(".divSearch-article .date-det span.vue-span").html(obj.vue);
        target.find(".divSearch-article .date-det span.like-span").html(obj.like);
        target.find(".divSearch-article .article-img img").attr("src", "" + obj.imgP);
        target.find(".divSearch-article .content-article").html(obj.content);
        target.find(".divSearch-article .search-details-icon img").hide();
        target.find(".divSearch-article .div-fsb-details .fsb-container").show();
        target.find(".classSearch-82 .reseau-ss .url-share textArea").html(window.location.href + "index.jsp#search//karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject=" + results._id + "//search");
    });
}

function getObjectArticleCmt(id, root, target) {
    target.find(".divSearch-article .search-details-icon img").show();
    $.ajax({
        type: "get",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/comments_index/_doc/" + id,
        datatype: "application/json",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        }
    }).done(function (results) {
        var obj = results._source;
        root.article = results;
        createDivComments(obj.comments, target);
    });

}/* from file karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/comments.js  */
function getArticlesCms(params) {
    var size = params.size;
    var from = params.from;
    var context = params.context;
    var root = params.root;

    var obj = {
        "from": from,
        "size": size,
        "query": {
            "match_all": {}
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        }
    }).done(function (result) {
        console.log("results :", result.hits.hits);
        createArticlesCms(result.hits.hits, context);
    });
}

var listComments = [];

function createArticlesCms(results, context) {
    var container = context.formRender.targetPanel.find(".articles-list");
    var modal = context.formRender.targetPanel.find("#myModal");

    for (var i = 0; i < results.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "article-elm");
        var divP = document.createElement("div");
        var span = document.createElement("span");
        span.setAttribute("class", "articles-title");
        span.setAttribute("xid", i);
        span.innerHTML = results[i]._source.title;
        var div2 = document.createElement("div");
        div2.setAttribute("style", "font-size: 14px;");
        divP.append(span);
        div2.innerHTML = "<i class='fas fa-eye'></i> " + results[i]._source.vue + " <i class='fas fa-heart'></i> " + results[i]._source.like + " <i class='fas fa-comment'></i> " + countCmmnt(results[i]._source.comments);
        listComments.push(results[i]._source);
        divP.append(span);
        div.append(divP);
        div.append(div2);
        div.addEventListener("click", function () {
            createModelDesc(modal, listComments[Number($(this).attr("xid"))]);
        });
        container.append(div);

    }
}

function createModelDesc(modal, source) {
    modal.find(".article-modal-content .title").html(source.title);
    modal.find(".article-modal-content .description").html(source.description);
    modal.get(0).style.display = "block";
}

function getCommtsCms(params) {
    var size = params.size;
    var from = params.from;
    var context = params.context;
    var root = params.root;

    var obj = {
        "from": 0,
        "size": 10000,
        "query": {
            "match_all": {}
        }
    };

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/_search",
        datatype: "application/json",
        contentType: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        }
    }).done(function (result) {
        console.log("results :", result.hits.hits);
        var commentsList = extarctCmmt(result.hits.hits, context);
        createCmtCms(sortCommentsByDate(commentsList), context);

    });
}

function sortCommentsByDate(comments) {
    comments.sort(function (a, b) {
        var time1 = new Date(a.date);
        var time2 = new Date(b.date);


        if (time1 > time2) {
            return -1;
        }

        if (time1 > time2) {
            return 1;
        }

        return 0;
    });
    return comments;
}

function getMaxDate(comment) {
    console.log("getMaxDate comments size ", comment);
    if (comment.comments.length == 0) {
        console.log("getMaxDate comments date ", comment.date)
        return comment.date;
    } else {
        var timeMax = comment.comments[0].date;
        var timeCmpr = new Date(comment.comments[0].date);
        var commentMax = {};
        for (var i = 1; i < comment.comments.length; i++) {
            var time1 = new Date(comment.comments[i].date);
            if (time1 > timeCmpr) {
                timeCmpr = time1
                timeMax = comment.comments[i].date;
            }
        }
        console.log("getMaxDate comments date ", timeMax);
        return timeMax;
    }
}

function sortCommentsByDateGb(comments) {
    console.log("sortCommentsByDate comments", comments);
    var comm = JSON.parse(JSON.stringify(comments));
    var commVar = [];
    for (var i = 0; i < comm.length; i++) {
        var obj = {
            "date": getMaxDate(comm[i]),
            "comment": comm[i],
            "index": i
        }
        commVar.push(obj);
    }
    sortCommentsByDate(commVar);

    var commentsVar = [];
    var commentsIndex = [];

    for (var i = 0; i < commVar.length; i++) {
        commentsVar.push(commVar[i].comment);
        commentsIndex.push(commVar[i].index);
    }
    console.log("sortCommentsByDate commVar", commVar);

    return { "comments": commentsVar, "cmmIndex": commentsIndex };

}

function createCmtCms(results, context) {
    var container = context.formRender.targetPanel.find(".notif-glo-cmmt");
    for (var i = 0; i < results.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "article-elm");
        var divP = document.createElement("div");
        var span = document.createElement("span");
        span.setAttribute("class", "articles-title");
        span.innerHTML = results[i].title;
        var div2 = document.createElement("div");
        div2.setAttribute("style", "display:grid;grid-template-columns: 25% 75%;font-size: 14px;");
        divP.append(span);
        div2.innerHTML = "<span><i class='fas fa-user'></i> " + results[i].nom + " " + results[i].prenom + "<br/><i class='fas fa-clock'></i> " + results[i].date + "</span><span><i class='fas fa-comment'></i> : " + results[i].text + "</span>";
        divP.append(span);
        div.append(divP);
        div.append(div2);
        container.append(div);
    }
}

// Extract comments form articles
function extarctCmmt(results, context) {
    var commentsList = [];
    for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < results[i]._source.comments.length; j++) {
            var comment = {
                "date": results[i]._source.comments[j].date,
                "text": results[i]._source.comments[j].text,
                "nom": results[i]._source.comments[j].nom,
                "prenom": results[i]._source.comments[j].prenom,
                "email": results[i]._source.comments[j].email,
                "index": k,
                "type": "parent" + j,
                "id": results[i]._id,
                "title": results[i]._source.title
            };
            commentsList.push(comment);

            if (results[i]._source.comments[j].comments != undefined) {
                for (var k = 0; k < results[i]._source.comments[j].comments.length; k++) {
                    var commentC = {
                        "date": results[i]._source.comments[j].comments[k].date,
                        "text": results[i]._source.comments[j].comments[k].text,
                        "nom": results[i]._source.comments[j].comments[k].nom,
                        "prenom": results[i]._source.comments[j].comments[k].prenom,
                        "email": results[i]._source.comments[j].comments[k].email,
                        "index": k,
                        "type": "child-" + j + "-" + k,
                        "id": results[i]._id,
                        "title": results[i]._source.title
                    };
                    commentsList.push(commentC);
                }
            }
        }
    }
    return commentsList;
}

// create pagination articles
function createPaginationArticleCms(params) {
    var currentPage = params.currentPage;
    var nbrPage = params.nombrePage;
    var nbrSizing = params.nbrSizing;
    var target = params.target;
    var cls = params.cls;
}

// count number of comments in article
function countCmmnt(comments) {
    var sum = 0;
    console.log(comments);
    for (var i = 0; i < comments.length; i++) {
        console.log("here");
        sum++;
        if (comments[i].comments != undefined) {
            for (var j = 0; j < comments[i].comments.length; j++) {
                sum++;
            }
        }
    }
    return sum;
}/* from file karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/elasicSearch.js  */
var currentPage = 0;
var currentLPage = 0;
var totalPage = 0;
var timerID = 0;
var msecc = 0;
var startTime = 0
var start = 0;
var end = 0;
var diff = 0;
var p = 0;

var AUTH = "";
var ADMIN_AUTH = "";
var URL_SEARCH = contextPath + "/kas/DataSynchronise";
// var URL_SEARCH+"?operation=wselastic&shortUrl=" = "http://elasticformation.karaz.org:9200";
var URL_COMMUNE = "https://bkurba.rokhas.ma/karazortal/access/rest/kdata/search/referentiel_localite_search_AllLocalite?query.decoupageDesc.description=ROKHAS&query.typeloc=commune/arrondissement&apiKey=AB90G-BH903-W4EE1-Z66Q9-7822K&offset=0&limit=1&sortInfo=id=ASC";
var URL_WS_1 = "https://bkurba.rokhas.ma";
var URL_WS_SEARCH_ALL_AUTORISATION = URL_WS_1 + "/karazortal/access/rest/kdata/search/cug_cri_urbanisme_autorisation_search_AllAutorisationConstruction";
var URL_WS_KDATA_OBJECT = URL_WS_1 + "/karazortal/access/rest/kdata/object/karazapps.cug.cri.urbanisme.autorisation.model.AutorisationConstruction/";
var URL_WS_FE = "https://bkurba.rokhas.ma";
var URL_WS_FE2 = "https://bkp.rokhas.ma";









//Check if result has already token
function check(res, elm) {
    for (var i = 0; i < res.length; i++) {
        console.log(res[i] + "***" + elm);
        if (res[i] == elm) {
            return false;
        }
    }
    return true;
}

var typePage = 0;
var articles = [];
var faqs = [];


function removeFullListSearch(cls, target) {
    target.find("." + cls + " .full-search-list").html("");
}

function testWidth(width, nbr) {
    return width > nbr;
}

//Search results and redirect to activity model
function restFullSearchList(prefix, from, prev, parent, cls, target) {
    var result = [];
    var xhttp = new XMLHttpRequest();
    removeFullListSearch(cls, target);
    target.find("." + cls + " .searchGif").show();
    target.find("." + cls + " .no-result-v").hide();


    typePage = Number(cls.split("-")[1]);
    var sizeliste = 4;

    if (typePage == 0 || typePage == 80 || typePage == 1) {
        sizeliste = 6;
    }


    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            removeFullListSearch(cls, target);
            var res = JSON.parse(this.responseText);
            for (var i = 0; i < res.hits.hits.length; i++) {
                result.push(res.hits.hits[i]);
            }

            console.log("typePage :" + typePage);

            if (typePage != 1 && typePage != 2) {
                target.find(".div-full-search-bar .hp-sbox-text span.total").html(res.hits.total.value);
                target.find(".div-full-search-bar .hp-sbox-text span.prefix").html(prefix);
            }

            target.find("." + cls + " .searchGif").hide();

            if (typePage == 1) {
                if (currentPage == 0) {
                    totalPage = Math.ceil(res.hits.total.value / sizeliste);
                    createPaginationBar({ nbrPage: Math.min(totalPage, 10), begin: 0, prefix: prefix, type: 1, prev: false, cls: cls, target: target, parent: parent, size: sizeliste });
                    if (totalPage != 0) {
                        currentPage = 1;
                        currentLPage = 1;
                    }
                } else if (currentPage % 10 == 0) {
                    currentLPage = (currentPage / 10) + 1;
                    console.log("begin: " + currentPage + "lpage: " + currentLPage);
                    createPaginationBar({ nbrPage: Number(Math.min(10, totalPage - currentPage)) + Number(currentPage), begin: currentPage - 1, prefix: prefix, type: 1, prev: false, cls: cls, target: target, parent: parent, size: sizeliste });
                } else if (prev == true) {
                    createPaginationBar({ nbrPage: currentPage + 1, begin: Math.max(0, (Number(currentPage)) - 10), prefix: prefix, type: 1, prev: true, cls: cls, target: target, parent: parent, size: sizeliste });
                }
            } else {
                if (currentPage == 0) {
                    totalPage = Math.ceil(res.hits.total.value / sizeliste);
                    createPaginationBar({ nbrPage: Math.min(totalPage, 10), begin: 0, prefix: prefix, type: 1, prev: false, cls: cls, target: target, parent: parent, size: sizeliste });
                    if (totalPage != 0) {
                        currentPage = 1;
                        currentLPage = 1;
                    }
                } else if (currentPage % 10 == 0) {
                    currentLPage = (currentPage / 10) + 1;
                    console.log("begin: " + currentPage + "lpage: " + currentLPage);
                    createPaginationBar({ nbrPage: Number(Math.min(10, totalPage - currentPage)) + Number(currentPage), begin: currentPage - 1, prefix: prefix, type: 1, prev: false, cls: cls, target: target, parent: parent, size: sizeliste });
                } else if (prev == true) {
                    createPaginationBar({ nbrPage: currentPage + 1, begin: Math.max(0, (Number(currentPage)) - 10), prefix: prefix, type: 1, prev: true, cls: cls, target: target, parent: parent, size: sizeliste });
                }
            }


            if (totalPage == 0 && typePage == 0) {
                noResults(cls);
            } else if (typePage == 1) {
                if (result.length == 0) {
                    target.find("." + cls + " .no-result-v").show();
                }
                fullSearchList(result, cls, typePage, target);
            } else if (typePage == 2) {
                fullSearchList(faqs, cls, typePage, target);
            } else if (typePage == 80) {
                if (result.length == 0) {
                    target.find("." + cls + " .no-result-v").show();
                }
                fullSearchList(result, cls, typePage, target);
            } else {
                fullSearchList(result, cls, typePage, target);
            }

            var pos = $(".Header-signup").offset().top + 50;
            $('html,body').animate({
                scrollTop: pos
            },
                1000);
        }
    };
    //   xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    var index = "";
    if (typePage == 0) {
        xhttp.open("POST", URL_SEARCH + "?operation=wselastic&shortUrl=" + "/activite_economique/activite/_search");
        xhttp.setRequestHeader("Authorization", AUTH);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    } else if (typePage == 1) {
        xhttp.open("POST", URL_SEARCH + "?operation=wselastic&shortUrl=" + "/reglementation_index/reglementation/_search");
        xhttp.setRequestHeader("Authorization", AUTH);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    } else if (typePage == 80) {
        xhttp.open("POST", URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/_search");
        xhttp.setRequestHeader("Authorization", AUTH);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }


    var testLanguage = RegExp('[أ-ي]');
    if (typePage == 80) {
        xhttp.send(JSON.stringify(getObjectToSendArticle(parent, prefix, testLanguage.test(prefix), from, sizeliste)));

    };

    return result;
}

function getObjectToSendArticle(parent, prefix, lang, from, size) {
    if (lang == true) {
        var ll = "rebuilt_arabic";
    } else {
        var ll = "rebuilt_french";
    }
    if (parent == 0) {
        if (prefix.trim() != "") {
            return {
                "from": from, "size": size,
                "query": {
                    "bool": {
                        "must": [
                            {
                                "multi_match": {
                                    "query": prefix,
                                    "fields": ["title.keywordsString", "descreption", "content"],
                                    "analyzer": ll,
                                    "fuzziness": "AUTO",
                                    "minimum_should_match": "70%"
                                }
                            }
                        ],
                        "should": [
                            {
                                "match": {
                                    "title.keywordsString": prefix
                                }
                            }
                        ]
                    }
                }
            };
        } else {
            return {
                "from": from,
                "size": size,
                "query": {
                    "match_all": {}
                },
                "sort": [{ "datePr.keyword": { "order": "desc" } }]
            };
        }
    } else if (parent != 0 && prefix.trim() != "") {
        if (parent == 1) {
            var type = "PRATIQUE";
        } else if (parent == 2) {
            var type = "A LA UNE";
        } else if (parent == 3) {
            var type = "REVUE DE PRESSE";
        }
        return {
            "from": from, "size": size,
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "query": prefix,
                                "fields": ["title.keywordsString", "descreption", "content"],
                                "analyzer": ll,
                                "fuzziness": "AUTO",
                                "minimum_should_match": "70%"
                            }
                        }, {
                            "term": {
                                "type.keyword": type
                            }
                        }
                    ],
                    "should": [
                        {
                            "match": {
                                "title.keywordsString": prefix
                            }
                        }
                    ]
                }
            }
        };
    } else {
        if (parent == 1) {
            var type = "PRATIQUE";
        } else if (parent == 2) {
            var type = "A LA UNE";
        } else if (parent == 3) {
            var type = "REVUE DE PRESSE";
        }
        return {
            "from": from, "size": size,
            "query": {
                "bool": {
                    "must": [
                        {
                            "match_all": {

                            }
                        }, {
                            "term": {
                                "type.keyword": type
                            }
                        }
                    ]
                }
            }, "sort": [{ "datePr.keyword": { "order": "desc" } }]
        };
    }
}










function generateRequestArticleSearch(prefix, type, from, size, typeUse) {
    if (typeUse == 0) {
        var str = "{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{\"from\":" + from + ",\"size\":" + size + ",\"sort\":[{ \"datePr.keyword\" : {\"order\" : \"desc\"}}],\"query\":{ \"term\":{ \"type.keyword\":\"" + type + "\" }}}\n";
        console.log(str);
    } else if (typeUse == 1) {
        var str = "{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{\"from\":" + from + ",\"size\":" + size + ",\"sort\":[{ \"datePr.keyword\" : {\"order\" : \"desc\"}}],\"query\":{ \"match_all\":{ }}}\n";
        str += "{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{\"from\":" + from + ",\"size\":" + size + ",\"sort\":[{ \"vue\" : {\"order\" : \"desc\"}}],\"query\":{ \"match_all\":{  }}}\n";
        str += "{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{\"from\":" + from + ",\"size\":" + size + ",\"sort\":[{ \"like\" : {\"order\" : \"desc\"}}],\"query\":{ \"match_all\":{ }}}\n";
    } else {
        if (prefix.trim() != "") {
            var str = "{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{\"from\":" + from + ",\"size\":" + size + ",\"query\": {\"bool\":{\"must\": [{\"multi_match\":{\"query\": \"" + prefix + "\",\"fields\": [\"QUESTIONS.keywordsString\"],\"analyzer\": \"rebuilt_french\",\"fuzziness\": \"auto\",\"minimum_should_match\": \"60%\"}},{\"match_phrase\": {\"type\": \"" + type + "\"}}]}}}\n";
        } else {
            var str = "{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{\"from\":" + from + ",\"size\":" + size + ",\"query\":{ \"term\":{ \"type.keyword\":\"" + type + "\" }}}\n";
        }
    }


    return str;
}

var playlist_videos = [];
var playlist_attachement = [];


function RestSearchArticleSec(prefix, page, size, type, typeUse, cls, prev, clas, target, root) {
    console.log("arr");
    var str = '';
    for (var i = 0; i < type.length; i++) {
        str += generateRequestArticleSearch(prefix, type[i], page, size, typeUse - 2);
    }


    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data: str,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);
            //playlist_videos = [];
            for (var i = 0; i < result.responses.length; i++) {
                //playlist_videos.push(new Array());

                target.find("." + clas + " " + cls[i] + "").html("");

                for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
                    //playlist_videos[i].push(result.responses[i].hits.hits[j]._source);
                    console.log(result.responses[i].hits.hits[j]._id);
                    // typeUse 1 for admin and 2for normal user
                    if (typeUse == 3) {
                        var objj = {
                            "desc": result.responses[i].hits.hits[j]._source.description,
                            "date": result.responses[i].hits.hits[j]._source.datePr.split(" ")[0].replace(/-/g, "/"),
                            "like": result.responses[i].hits.hits[j]._source.like,
                            "vue": result.responses[i].hits.hits[j]._source.vue,
                            "author": result.responses[i].hits.hits[j]._source.author,
                            "lang": result.responses[i].hits.hits[j]._source.lang
                        }
                        console.log("arr3");
                        NQF_add_article(result.responses[i].hits.hits[j]._source.title, objj, result.responses[i].hits.hits[j]._source.imgP, result.responses[i].hits.hits[j]._id, cls[i], typeUse, clas, target, root, result.responses[i].hits.hits[j]._source)
                    } else {
                        console.log("arr else");
                        NQF_add_article(result.responses[i].hits.hits[j]._source.title, result.responses[i].hits.hits[j]._source.description, result.responses[i].hits.hits[j]._source.imgP, result.responses[i].hits.hits[j]._id, cls[i], typeUse, clas, target, root, result.responses[i].hits.hits[j]._source)
                    }

                    // console.log(result.responses[i].hits.hits[j]._source.REPONSES);	
                    console.log(result.responses[i].hits.hits[j]._source.type);
                }
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })
}

function NQF_add_article(quest, desc, imgUrl, id, cls, type, clas, target, root, src) {
    if (type == 1) {

        var div = document.createElement("div");
        console.log("arr1", src.lang);

        if (src.lang == "Ar") {

            div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
<img style="width:100%;height: 68px;" src="`+ imgUrl + `" alt="">
</div>
<div>
<span style="display: block;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;color: #666;">`+ subLong(quest, 50) + `</span>
<p style="font-size: 13px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;margin: auto;">`+ subLong(desc, 70) + `</p>
</div>`;
        } else {
            `<div class="video-img" style="padding: 3px 7px 1px 1px;">
<img style="width:100%;height: 68px;" src="`+ imgUrl + `" alt=""> 
</div>
<div>
<span style="display: block;text-align: left;color: #666;">`+ subLong(quest, 50) + `</span>
<p style="font-size: 13px;text-align: left;margin: auto;">`+ subLong(desc, 70) + `</p>
</div>`;
        }

        div.addEventListener("click", function () {
            getArticle(id, 0, clas, target, root);
        });

        div.setAttribute("idd", id);
        div.setAttribute("class", "video-list-item");
        div.setAttribute("style", "display:grid;grid-template-columns:35% 65%;margin-bottom: 15px;cursor:pointer")

        target.find("." + clas + " " + cls + "").append(div);

        console.log(".v-edit" + cls + "");

    } else if (type == 2) {
        var div = document.createElement("div");
        console.log("arr2", src.lang);
        if (src.lang == "Ar") {
            div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
    <img style="width:100%;height: 68px;" src="`+ imgUrl + `" alt="">
    </div>
    <div>
    <span style="display: block;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;color: #666;">`+ subLong(quest, 50) + `</span>
    <p style="font-size: 13px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;margin: auto;">`+ subLong(desc, 70) + `</p>
    </div>`;
        } else {
            div.innerHTML = `<div class="video-img" style="padding: 3px 7px 1px 1px;">
    <img style="width:100%;height: 68px;" src="`+ imgUrl + `" alt="">
    </div>
    <div>
    <span style="display: block;text-align: left;color: #666;">`+ subLong(quest, 50) + `</span>
    <p style="font-size: 13px;text-align: left;margin: auto;">`+ subLong(desc, 70) + `</p>
    </div>`;
        }

        div.addEventListener("click", function () {
            // if(profilesT.match(/CONTENT_EDITOR/)=='CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/)=='ADMINISTRATEUR'){
            //     displaySearchByHisto("karaz/ux/hub/portailsearch/search/GuideVideoEdit?query.idObject="+id,"search", "video", {});
            // }else{
            //     getArticle(id,1,clas);
            // } 

            getArticle(id, 1, clas, target, root);
        });

        div.setAttribute("idd", id);
        div.setAttribute("class", "video-list-item");
        div.setAttribute("style", "display:grid;grid-template-columns:35% 65%;margin-bottom: 15px;cursor:pointer")

        target.find("." + clas + " " + cls + "").append(div);

    } else if (type == 3) {
        var div = document.createElement("div");
        if (src.lang == "Ar") {

            div.innerHTML = `<div style="display:grid;grid-template-columns:35% 65%;direction: rtl;" ><div class="video-img" style="padding: 3px 1px 1px 7px;">
        <img style="width:100%;height: 68px;" src="`+ imgUrl + `" alt="">
        </div>
        <div>
        <span style="display: block;font-size: 14px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;color: #666;">`+ subLong(quest, 50) + `</span>
        <p style="font-size: 12px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;margin: auto;">`+ subLong(desc.desc, 70) + `</p>
        </div></div>
        <p style="font-size: 11px;text-align: right;margin: auto;margin-top: 4px;color:#666">
            <span ><i class="fas fa-calendar-alt"></i> `+ desc.date + `</span>  <span style="margin-left: 5px;"><i class="fas fa-heart"></i> ` + desc.like + `</span>
            <span style="margin-left: 5px;" ><i class="fas fa-user"></i> `+ desc.author + `</span>
        </p>
        `;
        } else {
            div.innerHTML = `<div style="display:grid;grid-template-columns:35% 65%;" ><div class="video-img" style="padding: 3px 7px 1px 1px;">
        <img style="width:100%;height: 68px;" src="`+ imgUrl + `" alt="">
        </div>
        <div>
        <span style="display: block;text-align: left;color: #666;">`+ subLong(quest, 50) + `</span>
        <p style="font-size: 13px;text-align: left;margin: auto;">`+ subLong(desc.desc, 70) + `</p>
        </div></div>
        <p style="font-size: 12px;text-align: left;margin: auto;margin-top: 4px;color:#666">
            <span ><i class="fas fa-calendar-alt"></i> `+ desc.date + `</span>  <span style="margin-left: 5px;"><i class="fas fa-heart"></i> ` + desc.like + `</span>
            <span style="margin-left: 5px;" ><i class="fas fa-user"></i> `+ desc.author + `</span>
        </p>
        `;
        }

        if (src.type == "REVUE DE PRESSE" && src.lang == "Ar") {

            div.innerHTML = `<div style="display:grid;grid-template-columns:35% 65%;direction: rtl;" ><div class="video-img" style="padding: 3px 1px 1px 7px;">
        <img style="width:100%;height: 68px;" src="`+ imgUrl + `" alt="">
        </div>
        <div>
        <span style="display: block;font-size: 14px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;color: #666;">`+ subLong(quest, 50) + `</span>
        <p style="font-size: 12px;text-align: right;font-family: Droid Arabic Kufi, sans-serif;direction: rtl;margin: auto;">`+ subLong(desc.desc, 70) + `</p>
        </div></div>
        <p style="font-size: 11px;text-align: right;margin: auto;margin-top: 4px;color:#666">
            <span ><i class="fas fa-calendar-alt"></i> `+ desc.date + `</span>
            <span style="margin-left: 5px;" ><i class="far fa-newspaper"></i> `+ src.source + `</span>
        </p>
        `;
        } else if (src.type == "REVUE DE PRESSE" && src.lang != "Ar") {
            div.innerHTML = `<div style="display:grid;grid-template-columns:35% 65%;" ><div class="video-img" style="padding: 3px 7px 1px 1px;">
        <img style="width:100%;height: 68px;" src="`+ imgUrl + `" alt="">
        </div>
        <div>
        <span style="display: block;text-align: left;color: #666;">`+ subLong(quest, 50) + `</span>
        <p style="font-size: 13px;text-align: left;margin: auto;">`+ subLong(desc.desc, 70) + `</p>
        </div></div>
        <p style="font-size: 12px;text-align: left;margin: auto;margin-top: 4px;color:#666">
            <span ><i class="fas fa-calendar-alt"></i> `+ desc.date + `</span>
            <span style="margin-left: 5px;" ><i class="far fa-newspaper"></i> `+ src.source + `</span>
        </p>
        `;
        }

        div.addEventListener("click", function () {
            if (profilesT.match(/CONTENT_EDITOR/) != 'CONTENT_EDITOR') {
                if (src.type == "REVUE DE PRESSE") {
                    window.open(src.link);
                } else {
                    displaySearchByHisto("karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject=" + id, "search", "article", {});
                }
            } else {
                displaySearchByHisto("karaz/ux/hub/portailsearch/search/NewArticle?query.idObject=" + id, "search", "Cms article", {});
            }
        });

        div.setAttribute("idd", id);
        div.setAttribute("class", "video-list-item");
        div.setAttribute("style", "margin-bottom: 15px;cursor:pointer")

        $("." + clas + " " + cls + "").append(div);
    }
}

function removerefNQF(id) {

    if (window.confirm("Voulez-vous vraiment supprimer ce référentiel?")) {
        $.ajax({
            type: "delete",
            url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/reglementation_index/reglementation/" + id,
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

function removereArticle(id, clas, target) {

    if (window.confirm("Voulez-vous vraiment supprimer cet article?")) {
        $.ajax({
            type: "delete",
            url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/" + id,
            //url: "http://localhost:9200/index_classification_cluster/avis/_search",
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", AUTH);
            },
            success: function (result) {
                console.log(result);
                target.find("." + clas + " .NQF-vue-video").hide();
                target.find("." + clas + " div[idd=" + id + "]").hide();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

}


var NQFrefCAtegorie = ["Tous les référentiels économiques", "Tous les référentiels urbanistiques"];

/* end Ref juridique */


var faqPages = [1, 1, 1, 1, 1, 1];
var faqGlobalPages = [1, 1, 1, 1, 1, 1];
var totalFaqPages = [0, 0, 0, 0, 0, 0];
var typesList = ["E-SIGN", "GENERAL", "DOCUMENT", "PLATEFORME", "ARCHITECTE", "ADMINISTRATION"];

function intializeFaqPages() {
    faqPages = [1, 1, 1, 1, 1, 1];
    totalFaqPages = [0, 0, 0, 0, 0, 0];
    faqGlobalPages = [1, 1, 1, 1, 1, 1];
}


function generatePaginationFaqPage(index, prefix, typeUse, cls, typee, target, size) {
    if (typeUse == -1) {
        $("." + cls + " .faq-fieldset-det .pagination-new-style").html("");
        var p = $("." + cls + " .faq-fieldset-det .pagination-new-style");
    } else {
        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset .pagination-new-style").eq(index).html("");
        });
    }
    console.log(index);
    var begin = (faqGlobalPages[index] - 1) * (size + 1);
    console.log(totalFaqPages[index]);
    var nbrPage = begin + Math.min(size + 1, Math.ceil(totalFaqPages[index] / size) - (faqGlobalPages[index] - 1) * (size + 1));
    console.log("begin :" + begin + " nbrPage :" + nbrPage);
    var a = document.createElement("a");
    a.innerHTML = "<i class=\"fas fa-angle-double-left\"></i>";
    a.addEventListener("click", function () {
        if (faqPages[index] > 1) {
            faqPages[index]--;
            if (faqPages[index] % (size + 1) == 0) {
                faqGlobalPages[index]--;
            }
            RestSearchFaq(prefix, (faqPages[index] - 1) * 2, size, (index + 1), typeUse, cls, typee, target);
        }
        event.preventDefault();
    });
    if (typeUse == -1) {
        p.append(a);
    } else {
        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
        })
    }



    for (var i = begin; i < nbrPage; i++) {

        if (i == begin) {
            a = document.createElement("a");
            a.innerHTML = begin + 1;
            console.log((Number(faqPages[index]) - 1) + " = " + i);
            if (i == (Number(faqPages[index]) - 1)) {
                a.setAttribute("class", "active");

            }

            a.addEventListener("click", function () {
                if (faqGlobalPages[index] > 1) {
                    /*faqGlobalPages[index]--;
                    faqPages[index]=(faqGlobalPages[index]-1)*3+1;
                    RestSearchFaq(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse);
                    */
                    faqPages[index] = Number(this.innerHTML);
                    RestSearchFaq(prefix, (faqPages[index] - 1) * size, size, (index + 1), typeUse, cls, typee, target);

                } else {
                    faqPages[index] = 1;
                    RestSearchFaq(prefix, (faqPages[index] - 1) * size, size, (index + 1), typeUse, cls, typee, target);
                }
                event.preventDefault();
            });
            if (typeUse == -1) {
                p.append(a);
            } else {
                $("." + cls + " .faq-vbox").each(function (elm) {
                    $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
                })
            }
        } else {
            console.log((Number(faqPages[index]) - 1) + " = " + i);


            a = document.createElement("a");
            var j = i + 1;
            a.innerHTML = (i + 1);
            if (i == (Number(faqPages[index]) - 1)) {
                console.log(a.innerHTML + " notBeg");
                a.setAttribute("class", "active");
            }
            a.addEventListener("click", function (event) {
                event.preventDefault();
                faqPages[index] = Number(this.innerHTML);
                RestSearchFaq(prefix, (faqPages[index] - 1) * size, size, (index + 1), typeUse, cls, typee, target);
            });
            if (typeUse == -1) {
                p.append(a);
            } else {
                $("." + cls + " .faq-vbox").each(function (elm) {
                    $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
                })
            }
        }
    }
    a = document.createElement("a");
    a.innerHTML = "<i class=\"fas fa-angle-double-right\"></i>";
    a.addEventListener("click", function () {
        if (faqPages[index] < Math.ceil(totalFaqPages[index] / size)) {
            faqPages[index]++;
            if (faqPages[index] % 3 == 1) {
                faqGlobalPages[index]++
            }
            RestSearchFaq(prefix, (faqPages[index] - 1) * size, size, (index + 1), typeUse, cls, typee, target);
        }
        event.preventDefault();
    });

    if (typeUse == -1) {
        p.append(a);
    } else {
        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
        })
    }
}

function generatePaginationRefPage(index, prefix, typeUse, cls) {
    if (typeUse == -1) {
        $("." + cls + " .faq-fieldset-det .pagination-new-style").html("");
        var p = $(".faq-fieldset-det .pagination-new-style");
    } else {
        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset .pagination-new-style").eq(index).html("");
        });
    }
    console.log(index);
    var begin = (faqGlobalPages[index] - 1) * 3;
    console.log(totalFaqPages[index]);
    var nbrPage = begin + Math.min(3, Math.ceil(totalFaqPages[index] / 2) - (faqGlobalPages[index] - 1) * 3);
    console.log("begin :" + begin + " nbrPage :" + nbrPage);
    var a = document.createElement("a");
    a.innerHTML = "<i class=\"fas fa-angle-double-left\"></i>";
    a.addEventListener("click", function () {
        if (faqPages[index] > 1) {
            faqPages[index]--;
            if (faqPages[index] % 3 == 0) {
                faqGlobalPages[index]--;
            }
            RestSearchref(prefix, (faqPages[index] - 1) * 2, 2, (index + 1), typeUse);
        }
        event.preventDefault();
    });
    if (typeUse == -1) {
        p.append(a);
    } else {
        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
        })
    }



    for (var i = begin; i < nbrPage; i++) {

        if (i == begin) {
            a = document.createElement("a");
            a.innerHTML = begin + 1;
            console.log((Number(faqPages[index]) - 1) + " = " + i);
            if (i == (Number(faqPages[index]) - 1)) {
                a.setAttribute("class", "active");

            }

            a.addEventListener("click", function () {
                if (faqGlobalPages[index] > 1) {
                    /*faqGlobalPages[index]--;
                    faqPages[index]=(faqGlobalPages[index]-1)*3+1;
                    RestSearchFaq(prefix,(faqPages[index]-1)*2,2,(index+1),typeUse);
                    */
                    faqPages[index] = Number(this.innerHTML);
                    RestSearchref(prefix, (faqPages[index] - 1) * 2, 2, (index + 1), typeUse, cls);

                } else {
                    faqPages[index] = 1;
                    RestSearchref(prefix, (faqPages[index] - 1) * 2, 2, (index + 1), typeUse, cls);
                }
                event.preventDefault();
            });
            if (typeUse == -1) {
                p.append(a);
            } else {
                $("." + cls + " .faq-vbox").each(function (elm) {
                    $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
                })
            }
        } else {
            console.log((Number(faqPages[index]) - 1) + " = " + i);


            a = document.createElement("a");
            var j = i + 1;
            a.innerHTML = (i + 1);
            if (i == (Number(faqPages[index]) - 1)) {
                console.log(a.innerHTML + " notBeg");
                a.setAttribute("class", "active");
            }
            a.addEventListener("click", function (event) {
                event.preventDefault();
                faqPages[index] = Number(this.innerHTML);
                RestSearchref(prefix, (faqPages[index] - 1) * 2, 2, (index + 1), typeUse, cls);
            });
            if (typeUse == -1) {
                p.append(a);
            } else {
                $("." + cls + " .faq-vbox").each(function (elm) {
                    $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
                })
            }
        }
    }
    a = document.createElement("a");
    a.innerHTML = "<i class=\"fas fa-angle-double-right\"></i>";
    a.addEventListener("click", function () {
        if (faqPages[index] < Math.ceil(totalFaqPages[index] / 2)) {
            faqPages[index]++;
            if (faqPages[index] % 3 == 1) {
                faqGlobalPages[index]++
            }
            RestSearchref(prefix, (faqPages[index] - 1) * 2, 2, (index + 1), typeUse, cls);
        }
        event.preventDefault();
    });

    if (typeUse == -1) {
        p.append(a);
    } else {
        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset .pagination-new-style").eq(index).append(a);
        })
    }
}


function getQsFaq(id, type, cls, target) {
    if (type == 0) {
        target.find("." + cls + " .NFQ-load-img").show();
        target.find("." + cls + " .NQF-vue-question").hide();
        var pos = target.find("." + cls + " .pcd-header-NQF").offset().top;
        target.find('html,body').animate({
            scrollTop: pos
        },
            'fast');
    }

    target.find("." + cls + " .NFQ-all-quest").hide();
    target.find("." + cls + " .NQF-edit-modif").hide();

    $.ajax({
        type: "get",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/" + faq_index + "/qr/" + id,
        datatype: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            if (type == 0) {
                console.log(result);
                //traitement rbihi
                faqObject = result._source;
                target.find("." + cls + " .NFQ-load-img").hide();
                target.find("." + cls + " .NQF-vue-question").show();
                //add header
                // $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","displaySearchByHisto('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
                target.find("." + cls + " .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").css("text-transform", "none");
                target.find("." + cls + " .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").html(`QUESTIONS FREQUENTES | <span class="title-2x" style="color:#38a; ">` + result._source.QUESTIONS + `</span>`);

                target.find("." + cls + " .NQF-vue-question .NQF-prev-quest >b").text(result._source.QUESTIONS);
                target.find("." + cls + " .NQF-prev-resp").html(result._source.REPONSES);
                target.find("." + cls + " .NQF-categorie").val(result._source.type);
                target.find("." + cls + " .NQF-id").val(id);
                target.find("." + cls + " .NQF-vue-question").show();

                target.find("." + cls + " .NQF-btn-alg").show();
                let a = target.find("." + cls + " .NQF-categorie")

                target.find("." + cls + " .NQF-new-quest-btn").show();

            } else if (type == 1) {
                createDivQuestionFaq(result);
                RestSearchFaq("", 0, 6, typesList.indexOf(result._source.type) + 1, -1, cls, "USER");
                //traitement youssef
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

var videoObject = null;
var attachementObject = null;
var faqObject = null;
var refObject = null;

function getVideo(id, type, cls) {
    if (type == 0) {
        $("." + cls + " .NQF-new-quest-btn").show();
        $("." + cls + " .NFQ-load-img").show();
        $("." + cls + " .NQF-vue-question").hide();
        var pos = $(".pcd-header-NQF").offset().top;
        $('html,body').animate({
            scrollTop: pos
        },
            'fast');
    } else if (type == 1) {
        $("." + cls + " .search-video").hide();
        $("." + cls + " .consultation-video").hide();
        $("." + cls + " .consultation-video .video-iframe iframe").attr("src", "");
        $("." + cls + " .consultation-video .video-iframe iframe").attr("allowfullscreen", "");
        $("." + cls + " .consultation-video .video-iframe iframe").attr("mozallowfullscreen", "");
        $("." + cls + " .searchGif2").show();
    }

    $("." + cls + " .NFQ-all-quest").hide();

    $.ajax({
        type: "get",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/" + videos_index + "/video/" + id,
        datatype: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            if (type == 0) {
                console.log(result);
                //traitement rbihi

                $("." + cls + " .NFQ-load-img").hide();
                $("." + cls + " .NQF-vue-question").show();
                //add header
                // $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","displaySearchByHisto('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
                $("." + cls + " .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").css("text-transform", "none");

                /*
                $(".NQF-vue-question .NQF-prev-quest >b").text(result._source.QUESTIONS);
                $(".NQF-prev-resp").html(result._source.REPONSES);
                $(".NQF-categorie").val(result._source.type);
                */
                videoObject = result._source;
                if (result._source.plateforme == "Vimeo") {
                    var urlemb = "https://player.vimeo.com/video/" + result._source.video_id;
                } else if (result._source.plateforme == "Youtube") {
                    var urlemb = "https://www.youtube.com/embed/" + result._source.video_id;
                }

                console.log(urlemb);
                $("." + cls + " .NQF-vue-question .vue-video-frame").html("<iframe src=" + urlemb + " width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
                $("." + cls + " .NQF-vue-question .vue-video-title b").html(result._source.title);
                $("." + cls + " .NQF-vue-question .vue-video-description").html(result._source.description);

                $("." + cls + " .NQF-id").val(id);
                $("." + cls + " .NQF-vue-question").show();
                $("." + cls + " .NQF-edit-modif").hide();
                $("." + cls + " .NQF-btn-alg").show();

                let a = $("." + cls + " .NQF-categorie")

                $("." + cls + " .NQF-new-quest-btn").show();

            } else if (type == 1) {
                if (result._source.plateforme == "Vimeo") {
                    createDivVideo(result, 0, getVideoIndex(result._source.video_id, result._source.playlist));
                } else if (result._source.plateforme == "Youtube") {
                    createDivVideo(result, 1, getVideoIndex(result._source.video_id, result._source.playlist));
                }

                $("." + cls + " .searchGif2").hide();
                $("." + cls + " .consultation-video").show();


            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

var ArticleObject = {};
function getArticle(id, type, cls, target, root) {
    if (type == 0) {
        target.find("." + cls + " .NQF-new-quest-btn").show();
        target.find("." + cls + " .NFQ-load-img").show();
        target.find("." + cls + " .NQF-vue-question").hide();
        var pos = target.find(".pcd-header-NQF").offset().top;
        $('html,body').animate({
            scrollTop: pos
        },
            'fast');
    }

    target.find("." + cls + " .NFQ-all-quest").hide();

    $.ajax({
        type: "get",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/" + id,
        datatype: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {

            target.find("." + cls + " .NFQ-load-img").hide();
            target.find("." + cls + " .NQF-vue-question").show();
            //add header
            target.find("." + cls + " .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").css("text-transform", "none");

            ArticleObject = result._source;
            root.articleCms = result._source;

            target.find("." + cls + " .NQF-vue-question .vue-video-frame").html("<img src=" + result._source.imgP + " width=\"90%\" height=\"100%\" frameborder=\"0\" >");
            target.find("." + cls + " .NQF-vue-question .vue-video-title b").html(result._source.title);
            target.find("." + cls + " .NQF-vue-question .vue-video-description").html(result._source.description);

            target.find("." + cls + " .NQF-id").val(id);
            target.find("." + cls + " .NQF-vue-question").show();
            target.find("." + cls + " .NQF-edit-modif").hide();
            target.find("." + cls + " .NQF-btn-alg").show();

            let a = target.find("." + cls + " .NQF-categorie");

            target.find("." + cls + " .NQF-new-quest-btn").show();


        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}




function getAttachement(id, type, cls) {
    if (type == 0) {
        $("." + cls + " .NQF-new-quest-btn").show();
        $("." + cls + " .NFQ-load-img").show();
        $("." + cls + " .NQF-vue-question").hide();
        var pos = $(".pcd-header-NQF").offset().top;
        $('html,body').animate({
            scrollTop: pos
        },
            'fast');
    } else if (type == 1) {
        $("." + cls + " .search-video").hide();
        $("." + cls + " .consultation-video").hide();
        $("." + cls + " .searchGif2").show();
    }

    $("." + cls + " .NFQ-all-quest").hide();

    $.ajax({
        type: "get",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/attachements_index/attachement/" + id,
        datatype: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            if (type == 0) {
                console.log(result);
                attachementObject = result._source;


                $("." + cls + " .NFQ-load-img").hide();
                $("." + cls + " .NQF-vue-question").show();
                //add header
                // $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","displaySearchByHisto('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
                $("." + cls + " .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").css("text-transform", "none");

                let plateforme = result._source.plateforme;
                let imgUrl = result._source.img_url;
                let attachement = result._source.attachement;

                $("." + cls + " .NQF-vue-question .vue-video-title b").html(result._source.title);
                $("." + cls + " .NQF-vue-question .vue-video-description").html(result._source.description);

                if (attachement.gedId == "") {
                    if (imgUrl.trim() != "") {
                        $("." + cls + " .NQF-vue-question .vue-video-frame").html("<img src=" + imgUrl + " width=\"90%\" height=\"100%\" frameborder=\"0\" >");
                    } else {
                        if (plateforme == "DOC") {
                            $("." + cls + " .NQF-vue-question .vue-video-frame").html("<i class=\"fas fa-file-download\" style=\"font-size: 9VW;padding-top: 28px;padding-bottom: 28px;color: #38A;\"></i>")
                        } else if (plateforme == "INSTALL") {
                            $("." + cls + " .NQF-vue-question .vue-video-frame").html("<i class=\"fas fa-download\" style=\"font-size: 9VW;padding-top: 28px;padding-bottom: 28px;color: #38A;\"></i>")
                        }
                    }
                } else {
                    var krn = attachement.gedId.split("/")[0];
                    $("." + cls + " .NQF-vue-question .vue-video-frame").html('<div class="docthumbnail"><img class="smallThumbnailImg" src="' + contextPath + '/DownloadFile?gedId=' + attachement.gedId + '&amp;thumbnail=small&amp;thumbnail=large&amp;or=img/no-file.svg"></div>');
                }

                $("." + cls + " .NQF-id").val(id);
                $("." + cls + " .NQF-vue-question").show();
                $("." + cls + " .NQF-edit-modif").hide();
                $("." + cls + " .NQF-btn-alg").show();

                let a = $("." + cls + " .NQF-categorie")

                $("." + cls + " .NQF-new-quest-btn").show();

            } else if (type == 1) {

                createDivAtt(result, 0, null);
                $("." + cls + " .searchGif2").hide();
                $("." + cls + " .consultation-video").show();

            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function getVideoIndex(id, playlist) {
    var playlist_index = 0;
    for (var i = 0; i < playlist_videos.length; i++) {
        if (playlist_videos[i][0] != undefined) {
            if (playlist == playlist_videos[i][0].playlist) {
                playlist_index = i;
                break;
            }
        } else {
            continue;
        }
    }

    for (var i = 0; playlist_videos[playlist_index].length; i++) {
        if (id == playlist_videos[playlist_index][i].video_id) {
            return {
                "index": i,
                "playlist_index": playlist_index,
                "total": playlist_videos[playlist_index].length
            }
        }
    }
}

function createDivVideo(result, type, obj) {
    $(".consultation-video .consultation-video-title").html(result._source.title);
    if (type == 0) {
        $(".consultation-video .video-iframe iframe").attr("src", "https://player.vimeo.com/video/" + result._source.video_id + "?rel=0");
        $(".consultation-video .video-iframe iframe").addClass("vimeo-video-iframe");
        $(".consultation-video .video-iframe iframe").removeClass("youtube-video-iframe");

    } else {
        $(".consultation-video .video-iframe iframe").attr("src", "https://www.youtube.com/embed/" + result._source.video_id);
        $(".consultation-video .video-iframe iframe").addClass("youtube-video-iframe");
        $(".consultation-video .video-iframe iframe").removeClass("vimeo-video-iframe");
    }
    $(".consultation-video .video-description").html(result._source.description);

    if (obj.total == 1) {
        $(".consultation-video .next-prev .next-video").attr("onClick", "");
        $(".consultation-video .next-prev .prev-video").attr("onClick", "");
        $(".consultation-video .next-prev .prev-video").removeClass("active-video");
        $(".consultation-video .next-prev .next-video").removeClass("active-video");
    } else {
        if (obj.index == 0) {
            var idN = playlist_videos[obj.playlist_index][obj.index + 1].video_id;

            $(".consultation-video .next-prev .prev-video").attr("onClick", "getVideo(\"" + idN.toString() + "\",1,\"classSearch-7\")");
            $(".consultation-video .next-prev .next-video").removeClass("active-video");
            $(".consultation-video .next-prev .next-video").attr("onClick", "");
            $(".consultation-video .next-prev .prev-video").addClass("active-video");
        } else if (obj.index == obj.total - 1) {
            var idP = playlist_videos[obj.playlist_index][obj.index - 1].video_id;

            $(".consultation-video .next-prev .prev-video").attr("onClick", "");
            $(".consultation-video .next-prev .prev-video").removeClass("active-video");
            $(".consultation-video .next-prev .next-video").attr("onClick", "getVideo(\"" + idP.toString() + "\",1,\"classSearch-7\")");
            $(".consultation-video .next-prev .next-video").addClass("active-video");
        } else {

            var idN = playlist_videos[obj.playlist_index][obj.index + 1].video_id;
            var idP = playlist_videos[obj.playlist_index][obj.index - 1].video_id;

            $(".consultation-video .next-prev .prev-video").attr("onClick", "getVideo(\"" + idN.toString() + "\",1,\"classSearch-7\")");
            $(".consultation-video .next-prev .prev-video").addClass("active-video");
            $(".consultation-video .next-prev .next-video").attr("onClick", "getVideo(\"" + idP.toString() + "\",1,\"classSearch-7\")");
            $(".consultation-video .next-prev .next-video").addClass("active-video");

        }
    }
}


function createDivAtt(result, type, obj) {

    var plateforme = result._source.plateforme;
    var imgUrl = result._source.img_url;
    var attachementFileId = result._source.attachement.gedId;
    var attachement = result._source.attachement;

    if (attachementFileId == "") {
        $(".button-visual-down-1").attr("onclick", "window.open(\"" + result._source.url + "\")");
        $(".button-visual-down-1").show();
        $(".button-visual-down-2").hide();
    } else {
        $(".button-visual-down-2").attr("onclick", "window.open(\"" + contextPath + "/DownloadFile?gedId=" + attachementFileId + "\")")
        $(".button-visual-down-1").hide();
        $(".button-visual-down-2").show();
    }

    if (attachementFileId == "") {
        if (imgUrl.trim() == "") {

            if (plateforme == "DOC") {
                var str = "<i class=\"fas fa-file-download\" style=\"font-size: 9VW;color: #38A;\"></i>";
            } else {
                var str = "<i class=\"fas fa-download\" style=\"font-size: 9VW;color: #38A;\"></i>";
            }
        } else {
            var str = '<img style="width:90%;height: auto;" src=' + imgUrl + ' alt="">';
        }
    } else {
        var krn = attachement.gedId.split("/")[0];
        var str = '<div class="docthumbnail"><img class="smallThumbnailImg" src="' + contextPath + '/DownloadFile?gedId=' + attachement.gedId + '&amp;thumbnail=small&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="' + contextPath + '/DownloadFile?gedId=' + attachement.gedId + '&amp;thumbnail=large&amp;or=img/no-file.svg"></div>';
    }

    $(".consultation-video .consultation-video-title").html(result._source.title);
    $(".consultation-video .video-iframe .thumbnail").html(str);
    $(".consultation-video .video-iframe .description").html(result._source.description);
    $(".consultation-video .video-description").html(result._source.text);

}




function createDivQuestionFaq(result) {
    $(".qst-faq .vpanel-title .blue-small").html(subLong(result._source.QUESTIONS, 110));
    $(".qst-faq .vpanel-title .blue-small").attr("title", result._source.QUESTIONS);
    $(".qst-faq .vpanel-body .qst-body").html(result._source.QUESTIONS);
    $(".qst-faq .vpanel-body .response-body").html(result._source.REPONSES);
    $(".other-qst-faq .vpanel-title .blue-small").html(getTypeFaq(result._source.type));
}

function createDivQuestionRef(result) {
    $(".qst-faq .vpanel-title .blue-small").html(subLong(result._source.title, 110));
    $(".qst-faq .vpanel-title .blue-small").attr("title", result._source.title);
    $(".qst-faq .vpanel-body .qst-body").html(result._source.title + "<span style=\"margin: 8px;background: #333;color: #fff;font-size: 16px;border-radius: 2px;padding: 3px 6px;\">" + result._source.typeRef + "</span>");
    $(".qst-faq .vpanel-body .response-body").html(result._source.content);

    if (result._source.urlV != undefined) {
        if (result._source.urlV.trim() != "") {
            $(".qst-faq .vpanel-body .response-att button.download-fr").attr("onclick", "window.open(\"" + contextPath + "/DownloadFile?gedId=" + result._source.attachementRef.gedId + "\")")
            $(".qst-faq .vpanel-body .iframe-tab iframe").attr("src", "" + contextPath + "/DownloadFile?gedId=" + result._source.attachementRef.gedId);
            $(".qst-faq .vpanel-body .response-att").show();
            $(".qst-faq .vpanel-body .iframe-tab iframe").show();
        } else {
            $(".qst-faq .vpanel-body .response-att button.download-fr").hide();
            $(".qst-faq .vpanel-body .iframe-tab iframe").hide();
        }

        if (result._source.urlV2.trim() != "") {
            if (result._source.urlV.trim() == "") {
                $(".qst-faq .vpanel-body .iframe-tab iframe").attr("src", "" + contextPath + "/DownloadFile?gedId=" + result._source.attachementRefAr.gedId);
                $(".qst-faq .vpanel-body .iframe-tab iframe").show();
            }
            $(".qst-faq .vpanel-body .response-att button.download-ar").attr("onclick", "window.open(\"" + contextPath + "/DownloadFile?gedId=" + result._source.attachementRefAr.gedId + "\")")
            $(".qst-faq .vpanel-body .response-att").show();
        } else {
            $(".qst-faq .vpanel-body .response-att button.download-ar").hide();
        }

        if (result._source.urlV.trim() == "" && result._source.urlV2.trim() == "") {
            $(".qst-faq .vpanel-body .response-att").hide();
        }
    } else {
        $(".qst-faq .vpanel-body .response-att").hide();
    }


}


function getTypeFaq(type) {
    var types = ["E-SIGN", "ADMINISTRATION", "ARCHITECTE", "DOCUMENT", "PLATEFORME", "GENERAL"];
    var listType = ["e-Signature", "Administration", "Architecte", "Pieces requises", "Plateforme", "Général"];
    var index = types.indexOf(type);
    return listType[index];
}

function NQF_add_questionDet(quest, cls) {
    $(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt"><div class="vpanel-body-title " style="font-size: 14px;"><span class = 'NFQ-click-btn' >` + quest + `</span></div><hr class="NQF-horizontal-line " /></div>`)
}

function RestSearchFaqDet(prefix, page, size, type) {
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
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/_msearch",
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

                    for (let j = 0; j < result.responses[i].hits.hits.length; j++) {
                        NQF_add_questionDet(result.responses[i].hits.hits[j]._source.QUESTIONS, ".NFQ-quest-type")
                    }
                    $(".NFQ-quest-type").append('<span  class="NFQ-end"/>');

                }
            }

        },
        error: function (error) {
            console.log(error.responseText);
        }
    })

}


function RestSearchFaq(prefix, page, size, type, typeUse, cls, typee, target) {
    var str = "";
    if (cls == undefined) {
        cls = "ow-view";
    }


    if (profilesT.indexOf("CONTENT_EDITOR") != -1) {
        typee = "ALL";
    }
    $("." + cls + " .faq-vbox .no-response-find").hide();
    if (type == 0) {
        $("." + cls + " .faq-fieldset").hide();
        str += generateRequestFaqSearch(prefix, "E-SIGN", page, size, typee);
        str += generateRequestFaqSearch(prefix, "GENERAL", page, size, typee);
        str += generateRequestFaqSearch(prefix, "DOCUMENT", page, size, typee);
        str += generateRequestFaqSearch(prefix, "PLATEFORME", page, size, typee);
        str += generateRequestFaqSearch(prefix, "ARCHITECTE", page, size, typee);
        str += generateRequestFaqSearch(prefix, "ADMINISTRATION", page, size, typee);
        if (profilesT.indexOf("CONTENT_EDITOR") != -1) {
            str += generateRequestFaqSearch(prefix, "INTERNE", page, size, typee);
        }
    } else if (type == 1) {
        str += generateRequestFaqSearch(prefix, "E-SIGN", page, size, typee);
    } else if (type == 2) {
        str += generateRequestFaqSearch(prefix, "GENERAL", page, size, typee);
    } else if (type == 3) {
        str += generateRequestFaqSearch(prefix, "DOCUMENT", page, size, typee);
    } else if (type == 4) {
        str += generateRequestFaqSearch(prefix, "PLATEFORME", page, size, typee);
    } else if (type == 5) {
        str += generateRequestFaqSearch(prefix, "ARCHITECTE", page, size, typee);
    } else if (type == 6) {
        str += generateRequestFaqSearch(prefix, "ADMINISTRATION", page, size, typee);
    } else if (type == 7) {
        str += generateRequestFaqSearch(prefix, "INTERNE", page, size, typee);
    }

    console.log(str);

    if (type != 0 && typeUse != -1) {
        $("." + cls + " .faq-fieldset .full-search-list").eq(type - 1).html("");
        $("." + cls + " .faq-fieldset .searchGif2").eq(type - 1).show();
    } else if (typeUse == -1) {
        $("." + cls + " .faq-fieldset-det .full-search-list").html("");
        $("." + cls + " .faq-fieldset-det .searchGif2").show();
        $("." + cls + " .NQF-edit-modif").hide();
        $("." + cls + " .NFQ-all-quest").show();
    }



    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data: str,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);
            $("." + cls + " .searchGif").hide();
            $("." + cls + " .faq-fieldset .searchGif2").hide();
            $("." + cls + " .faq-fieldset-det .searchGif2").hide();
            if (type != 0 && typeUse != -1) {
                fullCreateFaqByType(result.responses[0].hits.hits, type, undefined, cls, target);
                generatePaginationFaqPage((type - 1), prefix, 0, cls, typee, target, size);
            } else if (type == 0 && typeUse != -1) {
                var k = 0;
                console.log("ici");
                for (var i = 0; i < result.responses.length; i++) {
                    if (result.responses[i].hits.hits.length != 0) {
                        if (prefix != "") {
                            Array.from($("." + cls + " .faq-vbox")).forEach(function (e) {
                                $("." + cls + " .faq-fieldset").eq(i).addClass("expanded");
                            })
                        }
                        fullCreateFaqByType(result.responses[i].hits.hits, (i + 1), undefined, cls, target);
                        k++;
                    }
                    totalFaqPages[i] = result.responses[i].hits.total.value;
                    generatePaginationFaqPage(i, prefix, 0, cls, typee, target, size);
                }

                if (k == 0) {
                    $("." + cls + " .faq-vbox .no-response-find").show();
                }
            } else if (typeUse == -1) {
                console.log("hello");


                fullCreateFaqByType(result.responses[0].hits.hits, 1, typeUse, cls, target);
                totalFaqPages[type - 1] = result.responses[0].hits.total.value;
                generatePaginationFaqPage((type - 1), prefix, -1, cls, typee, target, size);
                console.log(result.responses[0].hits.total.value);
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    })
}

var profilesT;

function fullCreateFaqByType(results, type, typeUse, cls, target) {

    if (typeUse == -1) {
        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset-det").show();
        });

        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset-det .full-search-list").html("");
        });

        for (i = 0; i < results.length; i++) {
            var id = results[i]._id;
            var titleTx = results[i]._source.QUESTIONS;
            var text = results[i]._source.REPONSES;
            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "grid-template-columns: 100%;box-shadow: none;border: 1px solid #ddd;padding: 6px;height: 127px;background: #fcfcfc;/* margin-bottom:25px; */");
            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            d.setAttribute("style", "padding:0 18px");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            e.setAttribute("style", "font-size:16px");
            e.innerHTML = "<span title=\"" + titleTx + "\">" + subLong(titleTx, 80) + "</span>";
            var f = document.createElement("p");
            f.innerHTML = subLong(text.replace(/<[^>]*>?/gm, ''), 250);
            f.setAttribute("style", "font-size: 14px;text-align:left");
            f.setAttribute("class", "para-faq");
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("a");

            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                if (profilesT.match(/CONTENT_EDITOR/) != 'CONTENT_EDITOR') {
                    if (typePage == 2 || typePage == 5) {
                        displaySearchByHisto("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject=" + id, "search", "FaqDetail", {});
                    } else {
                        getQsFaq(id, 0, cls, target);
                    }
                } else {
                    toModifyFaq(id);
                }
            });

            g.setAttribute("class", "item-body-button");
            g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;font-size:13px;bottom: 5px;right: 0px;");
            g.innerHTML = "Lire la suite ...<input type=\"hidden\" value=\"" + id + "\" > ";
            d.appendChild(g);
            b.appendChild(d);



            $("." + cls + " .faq-fieldset-det .full-search-list").append(b);

            var hr = document.createElement("hr");
            hr.setAttribute("style", "background: #eee;border: 1px solid #eee;height: 0px;width: 88%;");
            /*if(i!=results.length-1){
                $(".faq-fieldset-det .full-search-list").append(hr);                        
            }*/

        }
    } else {

        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset").eq((Number(type) - 1)).show();
        });

        $("." + cls + " .faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset .full-search-list").eq((Number(type) - 1)).html("");
        });

        for (i = 0; i < results.length; i++) {
            var id = results[i]._id;
            var titleTx = results[i]._source.QUESTIONS;
            var text = results[i]._source.REPONSES;
            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "grid-template-columns: 100%;box-shadow: none;border: 1px solid #ddd;padding: 6px;height: 127px;background: #fcfcfc;/* margin-bottom:25px; */");
            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            d.setAttribute("style", "padding:0 18px");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            e.setAttribute("style", "font-size:16px");
            e.innerHTML = "<span title=\"" + titleTx + "\">" + subLong(titleTx, 80) + "</span>";
            var f = document.createElement("p");
            f.innerHTML = subLong(text.replace(/<[^>]*>?/gm, ''), 250);
            f.setAttribute("style", "font-size: 14px;text-align:left");
            f.setAttribute("class", "para-faq");
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("a");
            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                if (profilesT.match(/CONTENT_EDITOR/) != 'CONTENT_EDITOR') {
                    displaySearchByHisto("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject=" + id, "search", "FaqDetail", {});
                } else {
                    toModifyFaq(id);
                }
            });
            g.setAttribute("class", "item-body-button");
            g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;font-size:13px;bottom: 5px;right: 0px;");
            g.innerHTML = "Lire la suite ...<input type=\"hidden\" value=\"" + id + "\" > ";
            d.appendChild(g);
            b.appendChild(d);

            var hr = document.createElement("hr");
            hr.setAttribute("style", "background: #eee;border: 1px solid #eee;height: 0px;width: 88%;");


            $("." + cls + " .faq-vbox").each(function (elm) {
                $(this).find(".faq-fieldset .full-search-list").eq((Number(type) - 1)).append(b);
                /* if(i!=results.length-1){
                    $(this).find(".faq-fieldset .full-search-list").eq((Number(type)-1)).append(hr);                        
                }*/
            });

        }
    }
}

function fullCreateRefByType(results, type, typeUse) {

    if (typeUse == -1) {
        $(".faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset-det").show();
        });

        $(".faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset-det .full-search-list").html("");
        });

        for (i = 0; i < results.length; i++) {
            var id = results[i]._id;
            var titleTx = results[i]._source.title;
            var description = results[i]._source.desc;
            var text = results[i]._source.content;
            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "grid-template-columns: 100%;box-shadow: none;border: 1px solid #ddd;padding: 6px;height: 127px;background: #fcfcfc;/* margin-bottom:25px; */");
            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            d.setAttribute("style", "padding:0 18px");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            e.setAttribute("style", "font-size:16px");
            e.innerHTML = "<span title=\"" + titleTx + "\">" + subLong(titleTx, 80) + "</span>";
            var f = document.createElement("p");
            f.innerHTML = subLong(text.replace(/<[^>]*>?/gm, ''), 250);
            f.setAttribute("style", "font-size: 14px;text-align:left");
            f.setAttribute("class", "para-faq");
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("a");

            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                getRefJ(id, 0, null);
            });

            g.setAttribute("class", "item-body-button");
            g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;font-size:13px;bottom: 5px;right: 0px;");
            g.innerHTML = "Lire la suite ...<input type=\"hidden\" value=\"" + id + "\" > ";
            d.appendChild(g);
            b.appendChild(d);



            $(".faq-fieldset-det .full-search-list").append(b);

            var hr = document.createElement("hr");
            hr.setAttribute("style", "background: #eee;border: 1px solid #eee;height: 0px;width: 88%;");
            /*if(i!=results.length-1){
                $(".faq-fieldset-det .full-search-list").append(hr);                        
            }*/

        }
    } else {

        $(".faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset").eq((Number(type) - 1)).show();
        });

        $(".faq-vbox").each(function (elm) {
            $(this).find(".faq-fieldset .full-search-list").eq((Number(type) - 1)).html("");
        });

        for (i = 0; i < results.length; i++) {
            var id = results[i]._id;
            var titleTx = results[i]._source.title;
            var description = results._source.description;
            var text = results[i]._source.content;
            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "grid-template-columns: 100%;box-shadow: none;border: 1px solid #ddd;padding: 6px;height: 127px;background: #fcfcfc;/* margin-bottom:25px; */");
            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            d.setAttribute("style", "padding:0 18px");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            e.setAttribute("style", "font-size:16px");
            e.innerHTML = "<span title=\"" + titleTx + "\">" + subLong(titleTx, 80) + "</span>";
            var f = document.createElement("p");
            f.innerHTML = subLong(text.replace(/<[^>]*>?/gm, ''), 250);
            f.setAttribute("style", "font-size: 14px;text-align:left");
            f.setAttribute("class", "para-faq");
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("a");
            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                displaySearchByHisto("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject=" + id, "search", "FaqDetail", {});
            });
            g.setAttribute("class", "item-body-button");
            g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;font-size:13px;bottom: 5px;right: 0px;");
            g.innerHTML = "Lire la suite ...<input type=\"hidden\" value=\"" + id + "\" > ";
            d.appendChild(g);
            b.appendChild(d);

            var hr = document.createElement("hr");
            hr.setAttribute("style", "background: #eee;border: 1px solid #eee;height: 0px;width: 88%;");


            $(".faq-vbox").each(function (elm) {
                $(this).find(".faq-fieldset .full-search-list").eq((Number(type) - 1)).append(b);
                /* if(i!=results.length-1){
                    $(this).find(".faq-fieldset .full-search-list").eq((Number(type)-1)).append(hr);                        
                }*/
            });

        }
    }
}


//Create list of results
function searchList(results) {
    var x = document.getElementsByClassName("searchList")[0].getElementsByClassName("searchListD");
    var y = document.getElementsByClassName("result-item");
    console.log(y.length);
    var size = y.length;

    for (var i = 0; i < size; i++) {
        y[0].parentNode.removeChild(y[0]);
    }


    for (var j = 0; j < results.length; j++) {
        var b = document.createElement("div");
        var intituleFr = results[j]._source.content.intituleFr;
        var typeAc = checkUndefined(results[j]._source.parents["TypeActivité"]);
        var nature = checkUndefined(results[j]._source.parents["NatureActivité"]);
        var typeAt = checkUndefined(results[j]._source.parents["TypeAutorisation"]);

        b.setAttribute("class", "list-group-item result-item");
        b.innerHTML = "<span class=\"titleS\">" + intituleFr + " </span><span class=\"grid-item\" style=\"{color:red;display:none}\"> Score:" + results[j]._score + "</span>";
        //b.innerHTML+="<div class=\"titleS grid-item\" style=\"{float:right}\">"+results[j]._source.content.intituleAr+" </div>";
        /*
        b.innerHTML+="<div class=\"grid-item\"> <b>Nature d'activité :</b> "+results[j]._source.parents[0].content.intituleFr+"</div>";
        b.innerHTML+="<div class=\"grid-item\"> <b>Type d'activité :</b> "+results[j]._source.parents[1].content.intituleFr+"</div>";
        b.innerHTML+="<div class=\"grid-item\"> <b>Type d'autorisation :</b> "+results[j]._source.parents[2].content.intituleFr+"</div>";
        */
        b.innerHTML += "<p class=\"searchP\"><b>Nature d'activité :</b> " + nature + "<b> Type d'activité :</b> " + typeAc + "<b> Type d'autorisation :</b> " + typeAt + "</p>"
        b.addEventListener("click", function (e) {
            console.log("go to model");
        });

        x[0].appendChild(b);
    }
}


function autocompleteF(inp, arr, val, type) {
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    console.log(arr);
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    if (type) {
        console.log(type);
        inp.parentNode.parentNode.appendChild(a);
    } else {
        console.log(type);
        inp.parentNode.appendChild(a);
    }
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        var b = document.createElement("DIV");
        /*make the matching letters bold:*/
        var str = arr[i];

        console.log(val + "  " + str + " " + addSpansHL(val, str));
        b.innerHTML = addSpansHL(val, str);

        /*insert a input field that will hold the current array item's value:*/
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("value", str);
        b.appendChild(input);
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
    }
}


function autocomplete(inp, arr) {
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        if (!val) {
            closeAllLists();
            return false;
        }
        currentFocus = -1;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        restAutoComplete(inp, val);

    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        console.log(x.length);

        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });



    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        console.log(currentFocus);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        console.log(currentFocus);
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
            for (var k = 0; k < x[i].getElementsByTagName("span").length; k++)
                x[i].getElementsByTagName("span")[k].classList.remove("span-active");
        }
    }
}
function addActive(x) {
    console.log(currentFocus);
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
    for (var k = 0; k < x[currentFocus].getElementsByTagName("span").length; k++)
        x[currentFocus].getElementsByTagName("span")[k].classList.add("span-active");

}

function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
        for (var k = 0; k < x[i].getElementsByTagName("span").length; k++)
            x[i].getElementsByTagName("span")[k].classList.remove("span-active");
    }
}

function moveKey(e, x, type, cls, target) {
    if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
    } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
    } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
        } else {
            console.log(currentFocus);
            if (type == 0) {
                if (target == undefined) {
                    $("." + cls + " .divSearchBar .search_button").click();
                } else {
                    target.find("." + cls + " .divSearchBar .search_button").click();
                }
            } else {
                if (target == undefined) {
                    $("." + cls + " .div-full-search-bar .search_button").click();
                } else {
                    target.find("." + cls + " .div-full-search-bar .search_button").click();
                }
            }

        }
    }
}

function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i]) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
    currentFocus = -1;
}

/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});

$(".searchListD .fa-bars").click(function () {
    var valu = $(this).parent().children(".details").html();
    $(".acticiteModel .modal-content").html(valu);
    modal.style.display = "block";
});

function createPaginationBar(param) {

    var nbrPage = param.nbrPage;
    var begin = param.begin;
    var prefix = param.prefix;
    var type = param.type;
    var prev = param.prev;
    var cls = param.cls;
    var target = param.target;
    var parent = param.parent;
    var size = param.size;

    var p = target.find("." + cls + " .pagination");
    console.log(p.html());
    console.log("tttt == " + "." + cls + " .pagination");
    p.html("");
    console.log(p.html());

    var a = document.createElement("a");
    a.innerHTML = "<i class=\"fas fa-angle-double-left\"></i>";
    a.addEventListener("click", function () {
        console.log("!next");
        previousPage({ "prefix": prefix, "type": type, "cls": cls, "target": target, "parent": parent, "size": size });
        event.preventDefault();
    });
    p.append(a);

    for (var i = begin; i < nbrPage; i++) {
        if (i == begin) {
            a = document.createElement("a");
            a.innerHTML = begin + 1;
            if (prev == false) {
                a.setAttribute("class", "active");
            }
            a.addEventListener("click", function () {
                event.preventDefault();
                console.log("1");
                getPage({ "page": begin + 1, "prefix": prefix, "type": type, "prev": false, "cls": cls, "target": target, "parent": parent, "size": size });
            });

            p.append(a);
        } else {
            a = document.createElement("a");
            if (prev == true && i == nbrPage - 2) {
                a.setAttribute("class", "active");
            }
            var j = i + 1;
            a.innerHTML = (j);
            a.addEventListener("click", function (event) {
                event.preventDefault();
                console.log(this.innerHTML + " " + prefix + " " + type);
                getPage({ "page": Number(this.innerHTML), "prefix": prefix, "type": type, "prev": false, "cls": cls, "target": target, "parent": parent, "size": size });

            });
            p.append(a);
        }
    }
    a = document.createElement("a");
    a.innerHTML = "<i class=\"fas fa-angle-double-right\"></i>";
    a.addEventListener("click", function () {
        event.preventDefault();
        console.log("next");
        nextPage({ "prefix": prefix, "type": type, "cls": cls, "target": target, "parent": parent, "size": size });
    });
    p.append(a);
}


function nextPage(param) {
    if (currentPage < totalPage) {
        currentPage++;
        getPage({ "page": currentPage, "prefix": param.prefix, "type": param.type, "prev": false, "cls": param.cls, "target": param.target, "parent": param.parent, "size": param.size });
    }
}

function previousPage(param) {
    if (1 < currentPage) {
        currentPage--;
        if (currentPage < ((currentLPage - 1) * 10)) {
            getPage({ "page": currentPage, "prefix": param.prefix, "type": param.type, "prev": true, "cls": param.cls, "target": param.target, "parent": param.parent, "size": param.size });
        } else {
            getPage({ "page": currentPage, "prefix": param.prefix, "type": param.type, "prev": false, "cls": param.cls, "target": param.target, "parent": param.parent, "size": param.size });
        }
    }
}

function getPage(param) {
    currentPage = param.page;
    closeSearchList();
    console.log("param", param);

    if (param.type == 0) {
        restSearchList(param.prefix, (param.page - 1) * param.size, param.prev);
        var elm = $("." + param.cls + " .searchList .pagination a");
    } else {
        restFullSearchList(param.prefix, (param.page - 1) * param.size, param.prev, param.parent, param.cls, param.target);
        var elm = param.target.find("." + param.cls + " .pagination-second a");
    }

    if (param.prev == true) {
        currentLPage--;
    }




    activePageBar(elm);
}

function activePageBar(elm) {
    elm.removeClass("active");
    var cpage = 0;
    if (currentLPage == 1) {
        cpage = currentPage;
    } else {
        cpage = currentPage - (10 * (currentLPage - 1)) + 1;
        console.log(cpage + " " + currentLPage + " " + currentPage);
    }
    elm.get(cpage).setAttribute("class", "active");;
}

function closeSearchList() {
    $(".searchList .searchListD").html("<div class=\"searchGif\"><img src=\"img/search-move.gif\" /></div>");
}

function getTimeCounter() {
    var start = new Date();
    chrono();
}

function stopChrono() {
    var second = msecc / 1000;
    document.getElementsByClassName("searchList")[0].getElementsByClassName("nbrRes")[0].getElementsByTagName("span")[1].innerHTML = second;
}

function chrono() {
    end = new Date()
    diff = end - start
    diff = new Date(diff)
    var msec = diff.getMilliseconds()
    var sec = diff.getSeconds()
    var min = diff.getMinutes()
    var hr = diff.getHours() - 1
    if (min < 10) {
        min = "0" + min
    }
    if (sec < 10) {
        sec = "0" + sec
    }
    if (msec < 10) {
        msec = "00" + msec
    }
    else if (msec < 100) {
        msec = "0" + msec
    }
    msecc = msec;
    console.log(msecc + "*******" + msec);
    timerID = setTimeout("chrono()", 10)
}

function checkUndefined(text) {
    if (text == undefined) {
        return "";
    }
    return text;
}

function loadPageBytype(type) {
    typePage = type;
}

function fullSearchList(results, cls, typePage, target) {
    var a = target.find("." + cls + " .full-search-list");
    if (typePage == 1) {
        console.log(results)
        for (i = 0; i < results.length; i++) {

            var id = results[i]._id;
            var titleTx = results[i]._source.title;
            var text = results[i]._source.desc;
            var type = results[i]._source.type;
            var typeTx = results[i]._source.typeRef;

            if (type == "1") {
                type = "ÉCONOMIQUE";
            } else if (type == "2") {
                type = "URBANISME";
            } else if (type == "3") {
                type = "AUTRE";
            }

            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "grid-template-columns: 0% 100%;height: 173px;")
            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            d.setAttribute("style", "padding:0 40px");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            e.setAttribute("style", "font-size:16px");
            e.innerHTML = "<span title=\"" + titleTx + "\">" + subLong(titleTx, 100).toUpperCase() + "</span>";
            var f = document.createElement("p");
            f.innerHTML = subLong(text, 180) + "<span style=\"background:#777;color:#FFF;display: inline-block;border-radius: 2px;padding: 1px 3px;\">" + typeTx + "</span>";
            f.setAttribute("style", "font-size: 0.955vw;text-align: left;width: 100%;color: #777;")
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("a");
            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
                    displaySearchByHisto("karaz/ux/hub/portailsearch/search/NewRefJuridique?query.idObject=" + id, "search", "Référentiel juridique", {});
                } else {
                    displaySearchByHisto("karaz/ux/hub/portailsearch/search/RefDetail?query.idObject=" + id, "search", "Référentiel juridique", {});
                }
            });
            g.setAttribute("class", "item-body-button");
            g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;text-align: right;width: 85%;display: block;");
            g.innerHTML = "Texte intégral<input type=\"hidden\" value=\"" + id + "\" > ";
            d.appendChild(g);
            var title = document.createElement("div");
            title.setAttribute("class", "item-title");
            title.setAttribute("title", type);
            var style = "line-height:30px;top: 51px;height: 30px;right: 92px;";

            if (type == "URBANISME") {
                style += "background:#38a";
            } else if (type == "INVESTISSEMENT") {
                style += "background:#f90";
            } else if (type == "ÉCONOMIQUE") {
                style += "background:#363";
            } else if (type == "AUTRE") {
                style += "background:#f90";
            }

            title.setAttribute("style", style);
            title.innerHTML = subLong(type);
            b.appendChild(title);
            b.appendChild(d);
            a.append(b);
        }
    } else if (typePage == 2) {
        var a1 = document.querySelectorAll("." + cls + " .faq-fieldset .full-search-list")[0];
        var a2 = document.querySelectorAll("." + cls + " .faq-fieldset .full-search-list")[1];
        for (i = 0; i < results[0].content.length; i++) {
            var id = results[0].content[i]._id;
            var titleTx = results[0].content[i].question;
            var text = results[0].content[i].response;
            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "grid-template-columns: 100%;box-shadow: none;border: none;padding:0;height:145px;margin-bottom:25px;");
            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            d.setAttribute("style", "padding:0 18px");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            e.setAttribute("style", "font-size:16px");
            e.innerHTML = "<span title=\"" + titleTx + "\">" + subLong(titleTx, 100) + "</span>";
            var f = document.createElement("p");
            f.innerHTML = text;
            f.setAttribute("style", "font-size: 14px;text-align:left");
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("a");
            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                //displaySearchByHisto("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
            });
            g.setAttribute("class", "item-body-button");
            g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;font-size:13px;");
            g.innerHTML = "Lire la suite ...<input type=\"hidden\" value=\"" + id + "\" > ";
            d.appendChild(g);
            b.appendChild(d);
            a1.appendChild(b);
        }

        for (i = 0; i < results[1].content.length; i++) {
            var id = results[1].content[i]._id;
            var titleTx = results[1].content[i].question;
            var text = results[1].content[i].response;
            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "grid-template-columns: 100%;box-shadow: none;border: none;padding:0;height:145px;margin-bottom:25px;");
            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            d.setAttribute("style", "padding:0 18px");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            e.setAttribute("style", "font-size:16px");
            e.innerHTML = "<span title=\"" + titleTx + "\">" + subLong(titleTx, 100) + "</span>";
            var f = document.createElement("p");
            f.innerHTML = text;
            f.setAttribute("style", "font-size: 14px;text-align:left;");
            d.appendChild(e);
            d.appendChild(f);
            var g = document.createElement("a");
            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                //displaySearchByHisto("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
            });
            g.setAttribute("class", "item-body-button");
            g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;font-size:13px;");
            g.innerHTML = "Lire la suite ...<input type=\"hidden\" value=\"" + id + "\" > ";
            d.appendChild(g);
            b.appendChild(d);
            a2.appendChild(b);
        }

    } else if (typePage == 80) {

        console.log(results)
        for (i = 0; i < results.length; i++) {

            var id = results[i]._id;
            var titleTx = results[i]._source.title;
            var text = results[i]._source.description;
            var type = results[i]._source.type;
            var img = results[i]._source.imgP;
            var tags = results[i]._source.tags;
            var link = results[i]._source.link;
            var lang = results[i]._source.lang;

            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "grid-template-columns: 0% 35% 65%;height: 190px;");

            var imgit = document.createElement("div");
            imgit.setAttribute("class", "item-img");
            imgit.innerHTML = "<img style=\"width: 93%;height: 170px;position: relative;    right: -9px;top: -11px;\" src=\"" + img + "\"/>";

            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            d.setAttribute("style", "padding:0 15px");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            if (lang == "Ar") {
                e.setAttribute("style", "font-size:16px;text-align: right;direction: rtl;font-family: Droid Arabic Kufi, sans-serif;");

            } else {
                e.setAttribute("style", "font-size:16px");
            }
            e.innerHTML = "<span title=\"" + titleTx + "\">" + subLong(titleTx, 60).toUpperCase() + "</span>";
            var f = document.createElement("p");
            f.innerHTML = subLong(text, 200);
            if (lang == "Ar") {
                f.setAttribute("style", "font-size: 0.955vw;text-align: left;width: 100%;color: #777;text-align: right;direction: rtl;font-family: Droid Arabic Kufi, sans-serif;")

            } else {
                f.setAttribute("style", "font-size: 0.955vw;text-align: left;width: 100%;color: #777;")
            }

            d.appendChild(e);
            d.appendChild(f);

            var tgg = document.createElement("div");

            tags.forEach(function (elm) {
                tgg.innerHTML += "<span style=\" background:#38a;color:#fff;padding: 0px 4px;margin: 4px;border-radius: 3px;cursor:pointer; \">" + elm.tag + "</span>";
            });
            d.appendChild(tgg);

            var g = document.createElement("a");
            var g2 = null;

            if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
                g2 = document.createElement("a");
            }

            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                var typee = $(this).children("input").attr("idd");

                if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
                    displaySearchByHisto("karaz/ux/hub/portailsearch/search/NewArticle?query.idObject=" + id, "search", "Article CMS", {});
                } else {
                    if (typee == "REVUE DE PRESSE") {
                        window.open(id);
                    } else {
                        displaySearchByHisto("karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject=" + id, "search", "DetailsActivitySearch", {});
                    }
                }
            });

            if (g2 != null) {
                g2.addEventListener("click", function () {
                    var id = $(this).children("input").val();
                    var typee = $(this).children("input").attr("idd");
                    if (typee == "REVUE DE PRESSE") {
                        window.open(id);
                    } else {
                        displaySearchByHisto("karaz/ux/hub/portailsearch/search/ArticleConsultation?query.idObject=" + id, "search", "DetailsActivitySearch", {});
                    }
                });

                if (type == "REVUE DE PRESSE") {
                    g2.innerHTML = "Ouvrir <input type=\"hidden\" value=\"" + link + "\" idd=\"" + type + "\" > ";
                    g2.setAttribute("style", "color:#38a;border: none;text-decoration: underline;margin-right:8px;width: 100%;position: inherit;text-align: right;font-size:14px");

                } else {
                    g2.innerHTML = "Ouvrir <input type=\"hidden\" value=\"" + id + "\" idd=\"" + type + "\" > ";
                    g2.setAttribute("style", "color:#38a;border: none;text-decoration: underline;margin-right:8px;width: 100%;position: inherit;text-align: right;font-size:14px");
                }
            }



            if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
                g.innerHTML = "Modifier <input type=\"hidden\" value=\"" + id + "\" idd=\"" + type + "\" > ";
                g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;width: 100%;position: inherit;text-align: right;");
            } else {
                if (type == "REVUE DE PRESSE") {
                    g.innerHTML = "Consulter sur <b>" + results[i]._source.source + "</b><input type=\"hidden\" value=\"" + link + "\" idd=\"" + type + "\" > ";
                    g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;width: 100%;position: inherit;text-align: right;font-size:14px");

                } else {
                    g.innerHTML = "Lire la suite <input type=\"hidden\" value=\"" + id + "\" idd=\"" + type + "\" > ";
                    g.setAttribute("style", "color:#38a;border: none;text-decoration: underline;width: 100%;position: inherit;text-align: right;font-size:14px");
                }
            }

            var l = document.createElement("div");
            l.setAttribute("style", "color:#38a;border: none;text-decoration: underline;display: block;width: 100%;position: inherit;text-align: right;font-size:14px");

            g.setAttribute("class", "item-body-button");

            if (g2 != null) {
                l.appendChild(g2);
            }

            l.appendChild(g);

            d.appendChild(l);

            var title = document.createElement("div");
            title.setAttribute("class", "item-title");
            title.setAttribute("title", type);
            var style = "line-height:30px;top: 59px;height: 30px;right: 100px;width:190px;";

            if (type == "PRATIQUE") {
                style += "background:#38a";
            } else if (type == "A LA UNE") {
                style += "background:#f90";
            } else if (type == "REVUE DE PRESSE") {
                style += "background:#363";
            }

            title.setAttribute("style", style);
            title.innerHTML = subLong(type);
            b.appendChild(title);
            b.appendChild(imgit);
            b.appendChild(d);
            a.append(b);
        }


    } else {
        for (i = 0; i < results.length; i++) {
            var id = results[i]._id;
            var intituleFr = results[i]._source.content.intituleFr;
            var intituleAr = results[i]._source.content.intituleAr;
            var typeAc = checkUndefined(results[i]._source.parents["TypeActivite"]);
            var nature = checkUndefined(results[i]._source.parents["NatureActivite"]);
            var typeAt = checkUndefined(results[i]._source.parents["TypeAutorisation"]);
            var typeAG = "Activités économiques";
            var setting = getColIcon(typeAt);
            var b = document.createElement("div");
            b.setAttribute("class", "hp-box full-search-list-item");
            b.setAttribute("style", "height: 192px;");
            var c = document.createElement("div");
            c.setAttribute("class", "c-path");
            // c.innerHTML="<span class=\"p p1\">"+typeAG+"</span>"+"<span class=\"cl-orange\"> > </span> <span class=\"p p2\">"+typeAc+"</span><span class=\"cl-orange\"> > </span> <span class=\"p p3\">"+nature+"</span>";
            var s = document.createElement("span");
            s.setAttribute("class", "cl-orange");
            s.innerHTML = " > ";
            c.appendChild(addEventSpan("p1", typeAt, cls, target));
            c.appendChild(s);
            // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
            c.appendChild(addEventSpan("p2", typeAc, cls, target));
            s = document.createElement("span");
            s.setAttribute("class", "cl-orange");
            s.innerHTML = " > ";
            c.appendChild(s);
            // c.innerHTML+="<span class=\"cl-orange\"> > </span>";
            c.appendChild(addEventSpan("p3", nature, cls, target));
            var d = document.createElement("div");
            d.setAttribute("class", "item-body");
            var e = document.createElement("div");
            e.setAttribute("class", "item-body-title");
            e.innerHTML = "<span title=\"" + intituleFr + "\">" + subLong(intituleFr, 60) + "</span>";
            e.innerHTML += "<span class=\"complete-text\">" + intituleFr + "</span>";
            var f = document.createElement("p");
            //f.innerHTML= "Etablissement dispensant des cours de stylisme et modélisme de vêtements modernes ou traditionnels. Etablissement dispensant des cours de stylisme et modélisme de ...";
            f.innerHTML = subLongAr(intituleAr, 75);
            f.setAttribute("title", intituleAr);
            d.appendChild(c);
            d.appendChild(e);
            d.appendChild(f);

            var typeAtts = "";
            if (typeAt == "Établissement classé" || typeAt == "Occupation Domaine Public") {
                typeAtts = typeAt + ";" + typeAc;
            } else if (typeAt == "Autorisations urbanisme") {
                typeAtts = typeAt + ";" + nature;
            } else {
                typeAtts = typeAt;
            }
            var indexProc = procedureList[0].indexOf(typeAtts);
            var g = document.createElement("button");
            g.setAttribute("procName", procedureList[1][indexProc]);

            g.addEventListener("click", function () {
                var id = $(this).children("input").val();
                var procName = $(this).attr("procName");
                //displaySearchByHisto("karaz/ux/hub/portailsearch/search/DetailsActivitySearch?query.idObject="+id,"search", "DetailsActivitySearch", {});
                displaySearchByHisto("karaz/ux/hub/portailsearch/search/" + procName, "search", `Procédure`, {});
            });
            g.setAttribute("class", "item-body-button hp-sbox-btn");
            g.innerHTML = "Voire procédure<input type=\"hidden\" value=\"" + id + "\" > ";
            g.setAttribute("style", "display: inline-block;color: #333;background: #f5f5f5;border: 1.2px solid #333 !important;border-radius: 15px;");
            d.appendChild(g);
            var title = document.createElement("div");
            title.setAttribute("class", "item-title");
            title.setAttribute("style", "background:" + setting.color + ";width: 192px;top: 64px;right: 105px;");
            title.setAttribute("title", typeAt);
            title.innerHTML = subLong(typeAt);
            title.addEventListener("click", function () {
                currentPage = 0;
                $(".div-full-search-bar .hp-search_field input").val($(this).attr("title").toLowerCase());
                restFullSearchList($(this).html(), 0, false, 4, cls, target);
            });
            b.appendChild(title);
            var icons = document.createElement("div");
            icons.setAttribute("class", "item-icon");
            icons.innerHTML = "<i class=\"far fa-file-image\" /><i class=\"" + setting.icon + "\" />";
            b.appendChild(icons);
            b.appendChild(d);
            a.append(b);
        }
    }
}



var procedureList = [["Simple Déclaration",
    "Établissement classé;Classe 2",
    "Établissement classé;Classe 3",
    "Occupation Domaine Public;Travaux Publics",
    "Occupation Domaine Public;Télécom",
    "Occupation Domaine Public;Affichage Publicitaire",
    "Occupation Domaine Public;Activité Normale",
    "Occupation Domaine Public;Stationnement Réservé",
    "Autorisations urbanisme;Projets de construction de groupes d'habitation",
    "Autorisations urbanisme;Projet de lotissement",
    "Autorisations urbanisme;Modifications de constructions existantes",
    "Autorisations urbanisme;Projet de morcellement",
    "Autorisations urbanisme;Projet de construction d'équipement à usage public",
    "Autorisations urbanisme;Projet de construction à usage d'habitation",
    "Autorisations urbanisme;Projet de construction d'institution à caractère industriel",
    "Autorisations urbanisme;Projet de construction à usage mixte",
    "Autorisations urbanisme;Equipements commerciaux",
    "Autorisations urbanisme;Projet de construction d'équipement à usage commercial"],
["SimpleDeclaration",
    "EtablissementClasse2",
    "EtablissementClasse",
    "OccupationDomainPubRp",
    "OccupationDomainPubRT",
    "AffichagePub",
    "OccupationDomainPubUC",
    "OccupationDomainPubUC",
    "autorusationConstructionGroupesHabitations",
    "autorusationLotissement",
    "",
    "autorisationMorcellement",
    "AutorisationsConstructionGrandsProjets",
    "AutorisationsConstructionGrandsProjets",
    "AutorisationsConstructionGrandsProjets",
    "AutorisationsConstructionGrandsProjets",
    "AutorisationsConstructionGrandsProjets",
    "AutorisationsConstructionGrandsProjets"
]];


function subLong(text, max) {
    if (text.length > max) {
        return text.substring(0, max - 6) + "<span class=\"dot-3\">...</span>";
    }
    return text;
}

function subLongAr(text, max) {
    if (text.length > max) {
        return "<span class=\"dot-3\">...</span>" + text.substring(0, max - 6);
    }
    return text;
}

function addEventSpan(spanClass, text, cls, target) {
    var span = document.createElement("span");
    span.setAttribute("class", "p " + spanClass);
    span.addEventListener("click", function () {
        currentPage = 0;
        $("." + cls + " .div-full-search-bar .hp-search_field input").val($(this).html().toLowerCase());
        if ($(this).attr("class").split(' ')[1] === "p1") {
            restFullSearchList($(this).html(), 0, false, 1, cls, target);
        } else if ($(this).attr("class").split(' ')[1] === "p2") {
            restFullSearchList($(this).html(), 0, false, 2, cls, target);
        } else if ($(this).attr("class").split(' ')[1] === "p3") {
            restFullSearchList($(this).html(), 0, false, 3, cls, target);
        } else {
            restFullSearchList($(this).html(), 0, false, 1, cls, target);
        }
    });
    span.innerHTML = text;
    return span;
}


function highlights(request, result) {
    result = result.toLowerCase();
    var hl = "";
    var resultUp = result;
    var positionsBegin = [];
    var positionsEnd = [];
    var positions = [new Array(), new Array()];

    var j = 0;
    var reqsplit = removeLastSpace(request).split(" ").sort(function (a, b) { return b.length - a.length; });
    var existreq = [];

    for (var i = 0; i < reqsplit.length; i++) {
        var word = reqsplit[i];
        var pos = hasNext(word, result, -1);
        while (pos != -1) {
            if (checkPrefix(positions, pos, pos + word.length).pos === -1) {
                positions[0].push(pos);
                positions[1].push(pos + word.length);

            } else if (checkPrefix(positions, pos, pos + word.length).type == true) {
                var posEx = checkPrefix(positions, pos, pos + word.length).pos;
                positions[0][posEx] = Math.min(pos, positions[0][posEx]);
                positions[1][posEx] = Math.max(positions[1][posEx], pos + word.length);
            }
            pos = hasNext(word, result, pos);
        }
    }
    return [positions[0].sort(function (a, b) { return a - b; }), positions[1].sort(function (a, b) { return a - b; })];
}




function hasNext(word, result, posNext) {
    var pos = posNext;
    pos = result.indexOf(word, posNext + 1);
    return pos;
}

function checkPrefix(positions, posB, posE) {
    var pos = -1;
    var type = null;
    for (var i = 0; i < positions[0].length; i++) {

        if ((posB >= positions[0][i] & posE <= positions[1][i])) {
            pos = i;
            type = false;
            return { "pos": pos, "type": type };
        } else if ((posB <= positions[0][i] & posE <= positions[0][i]) || (posB >= positions[1][i] & posE >= positions[1][i])) {
            pos = -1;
            type = false;
        } else {
            pos = i;
            type = true;
            return { "pos": pos, "type": type };
        }
    }
    return { "pos": pos, "type": type };
}

function addSpansHL(request, result) {
    var hl = "";
    var requestSplit = request.replace(/'/g, " ").replace(/"/g, " ").replace(/`/g, " ");
    var posArray = highlights(requestSplit, result);
    var nbrPos = posArray[0].length;

    if (nbrPos != 0) {
        hl += result.substring(0, posArray[0][0]);
        for (var i = 0; i < nbrPos - 1; i++) {
            hl += "<span>";
            hl += result.substring(posArray[0][i], posArray[1][i]);
            hl += "</span>";
            hl += result.substring(posArray[1][i], posArray[0][i + 1]);
        }

        hl += "<span>";
        hl += result.substring(posArray[0][nbrPos - 1], posArray[1][nbrPos - 1]);
        hl += "</span>";
        hl += result.substring(posArray[1][nbrPos - 1]);
    } else {
        hl = result;
    }

    return hl;
}

function removeLastSpace(request) {
    if (request.lastIndexOf(" ") == request.length - 1) {
        return removeLastSpace(request.substring(0, request.length - 1));
    }
    return request;
}


function checkExistReq(word, tab) {
    var exist = 0;
    for (var i = 0; i < tab.length; i++) {
        if (word === tab[i]) {
            exist++;
        }
    }
    return exist;
}

function checkIsPrefix(word, tab) {
    var exist = 0;
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].indexOf(word) != -1) {
            exist++;
        }
    }
    return exist;
}

function getObject(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(id);
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response);
            rempl(JSON.parse(xhttp.response));
            $(".div-fsb-details .search-details-icon").hide();
            $(".div-fsb-details .fsb-container").show();

        }
    };
    // xhttp.open("POST", "http://localhost:9200/activite_economique/activite/_search");
    xhttp.open("GET", URL_SEARCH + "?operation=wselastic&shortUrl=" + "/activite_economique/activite/" + id);
    xhttp.setRequestHeader("Authorization", AUTH);
    xhttp.send();

    return;
}

function rempl(results) {
    var id = results._id;
    var intituleFr = results._source.content.intituleFr;
    var typeAc = checkUndefined(results._source.parents["TypeActivité"]);
    var nature = checkUndefined(results._source.parents["NatureActivité"]);
    var typeAt = checkUndefined(results._source.parents["TypeAutorisation"]);
    var typeAG = "Activités économiques";

    $(".div-fsb-details .vpanel-title .title-2x").html(intituleFr);
    $(".div-fsb-details .details-body .title-4x").html(intituleFr);
    $(".div-fsb-details .fsb-container .c-path .p1").html(typeAG);
    $(".div-fsb-details .fsb-container .c-path .p2").html(typeAc);
    $(".div-fsb-details .fsb-container .c-path .p3").html(nature);
}

function noResults(cls) {
    var a = document.createElement("div");
    a.setAttribute("style", "text-align: left;width: 50;margin: auto;width: 60%;");
    a.innerHTML = "Aucune activité ne correspond aux termes de recherche spécifiés.<br/><br/>Suggestions :<br/>- Vérifiez l’orthographe des termes de recherche.<br/>- Essayez d'autres mots.<br/>- Utilisez des mots clés plus généraux.";
    $("." + cls + " .full-search-list").append(a);
}


/*feature etat d'avancement dossier*/

function getFolderId(ref, cin) {
    $(".folder-feature .folder-feature-body i.fa-caret-right,.folder-feature .folder-feature-body i.fa-caret-left").hide();
    var indexOf = getWsLink(ref.trim());
    console.log("indexOf :" + indexOf);

    if (ref.trim() == "") {
        $(".last-log input").blur();
        $(".folder-feature .folder-feature-header i").click();
    } else if (ref.trim() != "" && indexOf == null) {
        $(".folder-feature-body .folder-steps .no-response").show();
        $(".folder-feature .folder-feature-body .progressbar").html("");
        $(".folder-feature-body .folder-steps .no-response .ref").html(ref);

        if (testWidth($(window).width(), 640)) {
            $(".folder-feature").find("div:not(.no-response)").show("fast");
            $(".folder-feature").animate({ 'width': 'show' }, function () { });
        } else {
            $(".folder-feature").find("div:not(.no-response)").show("fast");
            $(".folder-feature").slideDown();
        }
    } else {
        $(".relative-position .last-log .loadGif").show();
        $(".relative-position .folder-feature-header span").html(ref);
        $.ajax({
            type: "get",
            url: autListId[indexOf].url + "?query.reference=" + ref.trim().toUpperCase() + "&apiKey=" + autListId[indexOf].apiKey + "&offset=0&limit=10&sortInfo=id=ASC",
            datatype: "application/json",
            success: function (result) {
                var newArray = transformFolder2Array(result.data);
                var index = newArray[1].indexOf(ref.trim().toUpperCase());
                if (index != -1) {
                    $(".folder-feature-body .folder-steps .no-response").hide();
                    getFolder(newArray[0][index], ref.trim().toUpperCase(), indexOf);
                } else {
                    $(".relative-position .last-log .loadGif").hide();
                    $(".folder-feature-body .folder-steps .no-response").show();
                    $(".folder-feature .folder-feature-body .progressbar").html("");
                    $(".folder-feature-body .folder-steps .no-response .ref").html(ref);

                    if (testWidth($(window).width(), 640)) {
                        $(".folder-feature").find("div:not(.no-response)").show("fast");
                        $(".folder-feature").animate({ 'width': 'show' }, function () { });
                    } else {
                        $(".folder-feature").find("div:not(.no-response)").show("fast");
                        $(".folder-feature").slideDown();
                    }
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}

var prefixList = [["AMN", "PCT", "GRP", "LOT", "MDF", "MRC", "ELV"], ["PH"], ["ODP-AP"], ["EC"], ["ODP-AN"], ["ODP"], ["SD"]];


function getWsLink(ref) {
    var prefix = ref.split("-")[0];

    if (prefix == "ODP") {
        if (ref.split("-")[1] == "AN") {
            prefix += "-AN";
        } else if (ref.split("-")[1] == "AP") {
            prefix += "-AP";
        }
    }

    for (var i = 0; i < URL_WS_FE2.length; i++) {
        if (prefixList[i].indexOf(prefix) != -1) {
            break;
        }
    }

    if (i == prefixList.length) {
        return null;
    } else {
        return i;
    }
}

function getFolder(id, ref, indexOf) {
    $.ajax({
        type: "get",
        url: autListId[indexOf].url_id + "/" + id + "?processStates=true&apiKey=" + autListId[indexOf].apiKey,
        datatype: "application/json",
        success: function (result) {
            var array1 = arrayHistoricGenrated(result.historic);
            var array2 = refrechArrayHistoriques(array1);

            /* 
            console.log(array2);
            
            if(array2[0][0].length>10){
            array2[0][0] = array2[0][0].splice(array2[0][0].length-10,array2[0][0].length);
            array2[0][1] = array2[0][1].splice(array2[0][1].length-10,array2[0][1].length);
            array2[0][2] = array2[0][2].splice(array2[0][2].length-10,array2[0][2].length);
            }
            */
            var begEnd = begEndSteps(array2[0][2]);
            arrayHistoricGenratedDiv(array2[0], ref, begEnd);

            if (testWidth($(window).width(), 640)) {
                $(".folder-feature").find("div:not(.no-response)").show("fast");
                $(".folder-feature").animate({ 'width': 'show' }, function () { });
            } else {
                $(".folder-feature .folder-feature-body i.fa-caret-right,.folder-feature .folder-feature-body i.fa-caret-left").hide();
                $(".folder-feature").find("div:not(.no-response)").show("fast");
                $(".folder-feature").slideDown();
            }

            $(".relative-position .last-log .loadGif").hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function begEndSteps(tab) {
    var beg = 0;
    var end = tab.length - 1;
    var maxSize = 7;
    if (tab.indexOf("active") != -1) {
        if (tab.length <= maxSize) {
            return { "begin": beg, "end": end };
        } else if (tab.indexOf("active") < tab.length - 3 && tab.indexOf("active") > 3) {
            return { "begin": tab.indexOf("active") - 3, "end": tab.indexOf("active") + 3 };
        } else {
            if (tab.indexOf("tree") <= 3) {
                return { "begin": beg, "end": beg + 6 }
            } else if (tab.indexOf("active") >= tab.length - 3) {
                return { "begin": end - 6, "end": end };
            }
        }
    } else {
        if (tab.length >= maxSize) {
            if (tab[0] == "active") {
                return { "begin": end - 6, "end": end };
            } else {
                return { "begin": beg, "end": beg + 6 }
            }
        } else {
            return { "begin": beg, "end": end };
        }
    }
}

function testExactFolder(ref, newRef) {
    if (ref == newRef) {
        return true;
    } else {
        return false;
    }
}

function createFolderStatus(array) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}

function transformFolder2Array(result) {
    var newArray = [[], []];

    for (var i = 0; i < result.length; i++) {
        newArray[0].push(result[i].id);
        newArray[1].push(result[i].stringIndex1);
    }

    return newArray;
}


var UID = {
    _current: 0,
    getNew: function () {
        this._current++;
        return this._current;
    }
};

var proc = 13;
var beginStep = 0;
var endStep = 10;
var totalStep = 10;

/*
function showSteps(beg,end){
var stepsH = $(".folder-feature .folder-feature-body .progressbar li");
for(var i=0;i<stepsH.length;i++){
if( (i>=begEnd.begin && i<=begEnd.end) || !testWidth($(window).width(),640) ){
li.setAttribute("style","width:"+(proc-1)+"%");
}else{
li.setAttribute("style","visibility:hidden;width:0;height:0");
}
}    
}*/

function nextGeneratedDiv() {
    if (endStep + 6 < totalStep) {
        var begEnd = {
            "begin": beginStep + 6,
            "end": Math.min(endStep + 6, totalStep)
        };
    } else {
        console.log("this");
        var begEnd = {
            "begin": totalStep - 6,
            "end": totalStep
        };
    }
    arrayHistoricGenratedDiv(historiquesGlo, refer, begEnd);
}

function prevGeneratedDiv() {
    if (beginStep - 6 > 6) {
        var begEnd = {
            "begin": Math.max(0, beginStep - 6),
            "end": endStep - 6
        };
    } else {
        var begEnd = {
            "begin": 0,
            "end": 6
        };
    }
    arrayHistoricGenratedDiv(historiquesGlo, refer, begEnd);
}

var historiquesGlo = [];
var refer = "";
function arrayHistoricGenratedDiv(historiques, ref, begEnd) {

    historiquesGlo = historiques;
    refer = ref;
    var maxSize = 7;

    var divGlo = $(".folder-feature .folder-feature-body .progressbar");
    divGlo.html("");
    $(".folder-feature .folder-feature-header div span").html(ref);

    var leng = (begEnd.end - begEnd.begin + 1);

    proc = 100 / leng;

    if (historiques[0].length > maxSize) {
        $(".folder-feature .folder-feature-body i.fa-caret-right,.folder-feature .folder-feature-body i.fa-caret-left").show();
    }

    totalStep = historiques[0].length - 1;

    for (var i = 0; i < historiques[0].length; i++) {
        var label = historiques[0][i];
        var date = historiques[1][i];
        var status = historiques[2][i];
        var li = document.createElement("li");

        beginStep = begEnd.begin;
        endStep = begEnd.end;

        if ((i >= begEnd.begin && i <= begEnd.end) || !testWidth($(window).width(), 640)) {
            li.setAttribute("style", "width:" + (proc - 1) + "%");
        } else {
            li.setAttribute("style", "visibility:hidden;width:0;height:0");
        }

        if (status == "done") {
            if (i == begEnd.begin) {
                li.setAttribute("class", "bf-active first-step");
            } else {
                li.setAttribute("class", "bf-active");
            }
            li.innerHTML = "<span class=\"step-title\">" + label + "</span><span class=\"step-date\">" + date.split(" ")[0] + "</span>";
        } else if (status == "active") {
            if (i == begEnd.begin) {
                li.setAttribute("class", "active first-step");
            } else {
                li.setAttribute("class", "active");
            }
            li.innerHTML = "<span class=\"step-title\">" + label + "</span><span class=\"step-date\"></span>";
        } else {
            if (i == begEnd.begin) {
                li.setAttribute("class", "first-step");
            } else {
                li.setAttribute("class", "");
            }
            li.innerHTML = "<span class=\"step-title\">" + label + "</span><span class=\"step-date\"></span>";
        }
        divGlo.append(li);
    }
}

function arrayHistoricGenrated(historiques) {
    var generatedArray = [[], [], [], []];
    var object = 1;

    for (var i = 0; i < historiques.length; i++) {
        var index = generatedArray[0].indexOf(historiques[i].LABEL.replace(/V[0-9]+/g, "").trim().toLowerCase())

        if (index != -1) {


            if (stringToDate(historiques[i].START_TIME) >= stringToDate(generatedArray[1][index])) {
                if (index == 0) {
                    object++;
                }
                generatedArray[1][index] = historiques[i].START_TIME;
                generatedArray[2][index] = historiques[i].STATUS;
                generatedArray[3][index] = object;
            }

        } else {
            generatedArray[0].push(historiques[i].LABEL.replace(/V[0-9]+/g, "").trim().toLowerCase());
            generatedArray[1].push(historiques[i].START_TIME);
            generatedArray[2].push(historiques[i].STATUS);
            generatedArray[3].push(object);
        }
    }

    return generatedArray;
}


function stringToDate(str) {
    if (str == "") {
        return new Date();
    }
    var timeSplit = str.split(" ");
    var date = timeSplit[0];
    var dateSplit = date.split("/");
    var hourSplit = timeSplit[1].split(":");

    return new Date(dateSplit[2], dateSplit[1], dateSplit[0], hourSplit[0], hourSplit[1], hourSplit[2], 0);
}

function refrechArrayHistoriques(hist) {
    var objects = [];
    var indexs = [];
    var index = 0;
    for (var i = 0; i < hist[3].length; i++) {
        if (indexs.indexOf(hist[3][i]) == -1) {
            indexs.push(hist[3][i]);
            var obj = [[], [], []];
            obj[0].push(hist[0][i]);
            obj[1].push(hist[1][i]);
            obj[2].push(hist[2][i]);
            objects.push(obj);
        } else {
            objects[indexs.indexOf(hist[3][i])][0].push(hist[0][i]);
            objects[indexs.indexOf(hist[3][i])][1].push(hist[1][i]);
            objects[indexs.indexOf(hist[3][i])][2].push(hist[2][i]);

        }
    }
    return objects;
}

function getColIcon(typeAut) {
    var tabAct = ["simple déclaration", "établissement classé", "occupation domaine public", "activité courante"];
    var tabActc = ["autorisations urbanisme", "permis de construire", "permis d'habiter", "réceptions", "démolition", "régularisation", "réfection", "dérogation aux documents d’urbanisme"];
    var tabColor1 = ["#38a", "#36a048", "#712ea4", "#cd4141"];
    var tabColor2 = ["#c5bb48", "#c5bb48", "#c5bb48", "#c5bb48", "#c5bb48", "#c5bb48", "#c5bb48", "#c5bb48"];
    var tabIcon = ["fas fa-cogs", "fas fa-building"];
    if (typeAut == undefined) {
        typeAut = "";
    }

    console.log(typeAut);

    if (tabAct.indexOf(typeAut.toLowerCase()) != -1) {
        var color = tabColor1[tabAct.indexOf(typeAut.toLowerCase())];
        var icon = tabIcon[0];
        var inde = 1;
    } else if (tabActc.indexOf(typeAut.toLowerCase()) != -1) {
        var color = tabColor2[tabActc.indexOf(typeAut.toLowerCase())];
        var icon = tabIcon[1];
        var inde = 2;

    } else {
        var color = "#38a";
        var icon = "fas fa-cogs";
        var inde = 3;
    }

    return {
        color: color,
        icon: icon,
        type: inde
    }
}

var chiffres = [1500, 900, 800, 300];
var chiffresIni = [1500, 900, 800, 300];


function getCountCommune() {
    $.ajax({
        type: "get",
        url: URL_COMMUNE,
        datatype: "application/json",
        //contentType: "application/json",
        success: function (result) {
            chiffres[0] = result.totalLength;
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function scrollChiffreFunction() {
    $(window).scroll(function () {
        console.log($(this).scrollTop());
        if ($(this).scrollTop() > $("cms-topictitle").eq(0).offset().top + 200) {
            counterNumber($("box-card box-big-title").eq(4), chiffres[0], 1)
            counterNumber($("box-card box-big-title").eq(5), chiffres[1], 1)
            counterNumber($("box-card box-big-title").eq(6), chiffres[2], 1)
            counterNumber($("box-card box-big-title").eq(7), chiffres[3], 1)
        }
    });
}

function counterNumber(counter, number, type) {

    if (type == 0) {
        var duration = 5000;
    } else if (type == 1) {
        //counter.stop();
        var duration = 1500;
    }

    counter.animate({ countNum: number }, {
        duration: duration,
        easing: 'linear',
        step: function () {
            counter.html("+" + Math.floor(this.countNum));
        },
        complete: function () {
            //$("box-card box-big-title").eq(4).html(this.countNum + "+");
            //alert('finished');
        }
    });
}/* from file karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/globalSearch.js  */
function setPaganateSizeValueById(divId, childId, size) {
    try {
        console.log("setPaganateSizeValueById(divId,size) ......." + divId + "size==" + size);
        if (size >= 10) {
            return;
        }
        var v0 = size;
        var v1 = size * 2;

        if (size < 5) {
            v1 = size * 3;
        }
        var v2 = parseInt(30 / size) * size;
        var v3 = parseInt(50 / size) * size;
        var v4 = parseInt(100 / size) * size;
        var v5 = parseInt(250 / size) * size;
        var v6 = parseInt(500 / size) * size;
        var v7 = parseInt(1000 / size) * size;
        var optionsStr = '<option value="' + v0 + '" selected="true">' + v0 + '</option><option value="' + v1 + '">' + v1 + '</option><option value="' + v2 + '">' + v2 + '</option><option value="' + v3 + '">' + v3 + '</option><option value="' + v4 + '">' + v4 + '</option><option value="' + v5 + '">' + v5 + '</option> <option value="' + v6 + '">' + v6 + '</option><option value="' + v7 + '">' + v7 + '</option>';
        $("#" + divId + " #" + childId + " .ow-pagination-pageSize").each(function (i) {
            $(this).empty();
            $(this).html(optionsStr);
            $(this).val(v0).change();
            //alert("i======"+i); 
        });
    } catch (e) {
        console.log("ERROR in Javascript function setPaganateSizeValueById(divId,size) ......." + e);
    }
}
function setProgressSearch(divId, childId, loadingId) {
    try {
        console.log("setProgressSearch......." + divId + "childId==" + childId);
        $("#" + divId + " #" + childId + " .ow-pagination-navgroup").children().each(function (i) {
            var classNme = $(this).attr("class");
            //alert(classNme);
            if (!("ow-pagination-pageLabel" == classNme || "ow-pagination-pageNbrLable" == classNme || "ow-pagination-pageNbrValue" == classNme)) {
                $(this).click(function () {
                    console.dir($("#" + childId));
                    $("#" + loadingId).show();
                    var oftop = parseInt($("#" + childId).offset().top) - 250;
                    //alert($("#"+childId).offset().top);
                    $("#" + divId + " #" + childId + " .ow-vl-inner.list-wrapper").empty();
                    $('html').animate({
                        scrollTop: oftop
                    }, 1000);

                });
            }
        });
        $("#" + divId + " #" + childId + " .ow-pagination-pageSize").change(function () {
            $("#" + loadingId).show();
            $("#" + divId + " #" + childId + " .ow-vl-inner.ow-gbox.list-wrapper").empty();

        });
    } catch (e) {
        console.log("ERROR in Javascript function setProgressSearch ......." + e);
    }
}

function setShowProgressSearch(divId, childId, loadingId) {
    try {
        console.log("setShowProgressSearch.......");
        $("#" + loadingId).show();
        $("#" + divId + " #" + childId + " .ow-vl-inner.list-wrapper").empty();
    } catch (e) {
        console.log("ERROR in Javascript function setShowProgressSearch ......." + e);
    }
}
function setPaganateSizeValueById(divId, childId, size, timeOut) {
    try {
        console.log("setPaganateSizeValueById(divId,size) ......." + divId + "size==" + size);
        setTimeout(function () {
            if (size >= 10) {
                return;
            }
            var v0 = size;
            var v1 = size * 2;

            if (size < 5) {
                v1 = size * 3;
            }
            var v2 = parseInt(30 / size) * size;
            var v3 = parseInt(50 / size) * size;
            var v4 = parseInt(100 / size) * size;
            var v5 = parseInt(250 / size) * size;
            var v6 = parseInt(500 / size) * size;
            var v7 = parseInt(1000 / size) * size;
            var optionsStr = '<option value="' + v0 + '" selected="true">' + v0 + '</option><option value="' + v1 + '">' + v1 + '</option><option value="' + v2 + '">' + v2 + '</option><option value="' + v3 + '">' + v3 + '</option><option value="' + v4 + '">' + v4 + '</option><option value="' + v5 + '">' + v5 + '</option> <option value="' + v6 + '">' + v6 + '</option><option value="' + v7 + '">' + v7 + '</option>';
            $("#" + divId + " #" + childId + " .ow-pagination-pageSize").each(function (i) {
                $(this).empty();
                $(this).html(optionsStr);
                $(this).val(v0).change();
                //alert("i======"+i); 
            });
        }, timeOut);

    } catch (e) {
        console.log("ERROR in Javascript function setPaganateSizeValueById(divId,size) ......." + e);
    }
}

function forceClickElement(divId, childId, fwkclass) {
    $("#" + divId + " #" + childId + " ." + fwkclass).click();
}
function hideLoadingElement(loadingId) {
    console.log("hideLoadingElement ......." + loadingId);
    $("#" + loadingId).hide();
}/* from file karazapps/karaz/ux/hub/portailsearch/model/portailsearch/web/proceduresJS.js  */

function NQF_remove_subtitle() {
    $(".NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").html(`QUESTIONS FREQUENTES`);
}

function PCD_addtitle() {
    $(".PCD-addtitle> .ow-pl-toolbar .ow-label-pl:not(:has(>i))").append(`<i class="fas fa-info-circle PCD-tooltip" title="Il s'agit d'indicateurs contextuels représentants la performances relatifs au processus, à l'entité ou à l'utilisateur concerné"/>`)
}

function PCD_headerfieldset_color(pcdClasstype) {
    $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl").css("color", "#999999");
}

function PCD_add_header_style_action(pcdClasstype, pcdSecondheader) {

    PCD_headerfieldset_color(pcdClasstype);
    $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick", "displaySearchByHisto('karaz/ux/hub/portailsearch/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
    $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").append(` | <span class="title-2x" style="color:#38a; ">` + pcdSecondheader + `</span>`);

}

function PCD_add_header_style_action_eco(pcdClasstype, pcdSecondheader) {
    PCD_headerfieldset_color(pcdClasstype);
    $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick", "displaySearchByHisto('karaz/ux/hub/portailsearch/search/proceduresEconomique', 'search', 'procedures Economique', {});");
    $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").append(` | <span class="title-2x" style="color:#38a; ">` + pcdSecondheader + `</span>`);
}

/* start procedure  */

/* start NQF */
function PCD_header_style_quest_type(qtypeCls, fontAwsCls) {

    $(qtypeCls + "> .ow-pl-toolbar .ow-label-pl:not(:has(>i))").prepend('<i class="' + fontAwsCls + ' NFQ-fa-style" />')

}




function NQF_edit(type, clas) {
    if (type == 1) {
        let question = $("." + clas + " .NQF-vue-question .NQF-prev-quest b").text();

        let resp = $("." + clas + " .NQF-prev-resp").html();
        let categ = $("." + clas + " .NQF-categorie").val();
        let ID = $("." + clas + " .NQF-id").val();
        console.log(ID)

        $(".NQF-edit-float .ow-field-container.ow-field-text-container").addClass("focusedInput");
        $('.ow-field-input[data-xpath="question"]').val(question);
        if (categ == "E-SIGN") {
            $("." + clas + " .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
            $("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text("Signature électronique");
        } else if (categ == "GENERAL") {
            $("." + clas + " .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
            $("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text("Général");
        } else if (categ == "DOCUMENT") {
            $("." + clas + " .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
            $("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text("Document");
        } else if (categ == "PLATEFORME") {
            $("." + clas + " .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
            $("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text("Plateforme");
        } else if (categ == "ARCHITECTE") {
            $("." + clas + " .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
            $("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text("Architecte");
        } else if (categ == "ADMINISTRATION") {
            $("." + clas + " .NQF-edit-select-float  .ow-field-container.ow-field-select-container").addClass("filledInput")
            $("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text("Administration");
        }

        $("." + clas + '  .ql-editor').html(resp)
        $("." + clas + " .NQF-edit-modif").show();
        $("." + clas + " .NQF-btn-alg").hide();
    } else if (type == 2) {
        // add edit here

    }
}


function NQF_preview_QR(type, clas, dataroot, target) {

    let title = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFtitle"]').val();
    let typee = target.find('.' + clas + ' .ow-field-input-select[data-xpath="NQFtype"]').text();
    let categ = target.find('.' + clas + ' .ow-field-input-select[data-xpath="NQFcategorie"]').text();
    let lang = target.find('.' + clas + ' .ow-field-input-select[data-xpath="NQFlang"]').text();
    let author = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFauthor"]').val();
    if (categ == "REVUE DE PRESSE") {
        var source = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFsource"]').val();
        var link = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFlink"]').val();
    } else {
        var source = "";
        var link = "";
    }

    let tags = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFtags"]').val();
    let texte = target.find('.' + clas + '  .ql-editor').html();
    let description = target.find('.' + clas + ' .NFQ-desc-refjuridique textarea').val();

    if (dataroot.attachementArImg.gedId != "") {
        imgUrl = "/karazal/DownloadFile?gedId=" + dataroot.attachementArImg.gedId + "";
    }
    target.find("." + clas + " .NQF-vue-question .vue-video-frame").html("<img src=" + imgUrl + " width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
    target.find("." + clas + " .NQF-vue-question .vue-video-title b").html(title);
    target.find("." + clas + " .NQF-vue-question .vue-video-description").html(description);
    target.find("." + clas + " .NQF-vue-video").show();
    target.find("." + clas + " .NQF-btn-alg").hide();
    target.find("." + clas + " .NQF-vue-question").show();

}

function NQF_new_QR(type, clas, target) {

    if (type == 1) {
        //add header
        // $(pcdClasstype + "> .ow-pl-toolbar .ow-label-pl:not(:has(>span))").attr("onclick","displaySearchByHisto('cug/cri/urbanisme/daycommission/search/proceduresUrbanisme', 'search', 'procedures Urbanisme', {});");
        target.find("." + clas + " .NQF-titre-quest > .ow-pl-toolbar .ow-label-pl").html(`NOUVELLE QUESTIONS FREQUENTES `);

        target.find("." + clas + ' .ow-field-input[data-xpath="question"]').val("");
        target.find("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text("");
        target.find("." + clas + '  .ql-editor').text("")
        target.find("." + clas + " .NQF-id").val("");


        target.find("." + clas + " .NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput");
        target.find("." + clas + " .NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput");


        target.find("." + clas + " .NQF-vue-question").hide();
    } else if (type == 2) {
        target.find("." + clas + " .NQF-titre-ref > .ow-pl-toolbar .ow-label-pl").html(`NOUVEAU RÉFÉRENTIEL JURIDIQUE`);


        target.find("." + clas + ' .ow-field-input[data-xpath="NQFtitle"]').val("");
        target.find("." + clas + ' .ow-field-input-select[data-xpath="NQFtype"]').text("");
        target.find("." + clas + ' .NFQ-desc-refjuridique textarea').val("");
        target.find("." + clas + ' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html("")
        target.find("." + clas + " .NQF-id-ref").val("");


        target.find("." + clas + " .NQF-edit-float .ow-field-container.ow-field-text-container").removeClass("focusedInput filledInput");
        target.find("." + clas + " .NQF-edit-select-float  .ow-field-container.ow-field-select-container").removeClass("filledInput");
        target.find("." + clas + " .ow-field-textArea-container:has(.NFQ-desc-refjuridique)").removeClass("filledInput")

        target.find("." + clas + " .NQF-vue-ref").hide();
    }

}


function verifieVideo(clas) {
    var vr = true;
    let title = $("." + clas + ' .ow-field-input[data-xpath="title"]').val();
    let categ = $("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text();
    let urlV = $("." + clas + ' .ow-field-input[data-xpath="url"]').val();
    let description = $("." + clas + ' .ow-field-input-line textarea[data-xpath="description"]').val();
    let playlist = $("." + clas + ' .ow-field-input-select[data-xpath="playlist"]').text();

    if (title.trim() == "") {
        alert("Veuillez saisir le titre de vidéo");
        return false;
    }

    if (categ.trim() == "") {
        alert("Veuillez selectionner la plateforme d'hébergement de vidéo !");
        return false;
    }

    if (urlV.trim() == "") {
        alert("Veuillez saisir le lien de vidéo !");
        return false;
    }

    return vr;
}


function verifieArticle(clas, root, target) {
    var vr = true;
    let title = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFtitle"]').val();
    let typee = target.find('.' + clas + ' .ow-field-input-select[data-xpath="NQFtype"]').text();
    let categ = target.find('.' + clas + ' .ow-field-input-select[data-xpath="NQFcategorie"]').text();
    let lang = target.find('.' + clas + ' .ow-field-input-select[data-xpath="NQFlang"]').text();
    let author = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFauthor"]').val();
    let tags = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFtags"]').val();
    let texte = target.find('.' + clas + '  .ql-editor').html();
    let description = target.find('.' + clas + ' .NFQ-desc-refjuridique textarea').val();
    let source = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFsource"]').val();
    let link = target.find('.' + clas + ' .ow-field-input[data-xpath="NQFlink"]').val();
    var attachement = root.attachementArImg;

    if (title.trim() == "") {
        alert("Veuillez saisir le titre de l'article");
        return false;
    }

    if (categ.trim() == "") {
        alert("Veuillez selectionner le type d'article !");
        return false;
    }

    if (typee.trim() == "") {
        alert("Veuillez selectionner la categorie d'article !");
        return false;
    }

    if (attachement.gedId.trim() == "") {
        alert("Veuillez ajouter l'image principale de l'article !");
        return false;
    }

    if (categ == "REVUE DE PRESSE") {
        if (source.trim() == "") {
            alert("Veuillez ajouter source de l'article !");
            return false;
        }
        if (link.trim() == "") {
            alert("Veuillez ajouter lien de l'article !");
            return false;
        }
    }

    return vr;
}

function verifieDownload(clas, root) {
    var vr = true;
    let title = $("." + clas + ' .ow-field-input[data-xpath="title"]').val();
    let categ = $("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text();
    let urlV = $("." + clas + ' .ow-field-input[data-xpath="url"]').val();
    let description = $("." + clas + ' .ow-field-input-line textarea[data-xpath="description"]').val();
    let playlist = $("." + clas + ' .ow-field-input-select[data-xpath="playlist"]').text();

    if (title.trim() == "") {
        alert("Veuillez saisir le titre de vidéo");
        return false;
    }

    if (categ.trim() == "") {
        alert("Veuillez selectionner le type d'attachement !");
        return false;
    }

    if (urlV.trim() == "" && root.attachement.gedId == "") {
        alert("Veuillez saisir le lien de l'attachement ou attacher un fichier !");
        return false;
    }

    return vr;
}

function NQF_save_QR(type, root, target) {
    if (type == 1) {
        var clas = "classSearch-5";

        let question = target.find("." + clas + ' .ow-field-input[data-xpath="question"]').val();
        let categ = target.find("." + clas + ' .ow-field-input-select[data-xpath="categ"]').text();
        let resp = target.find("." + clas + '  .ql-editor').html()
        let ID = target.find("." + clas + " .NQF-id").val();
        let visibility = root.visibility;

        if (visibility.trim() == "") {
            visibility = "ADMIN";
        }


        target.find("." + clas + " .NQF-vue-question .NQF-prev-quest >b").text(question);
        target.find("." + clas + " .NQF-prev-resp").html(resp);

        var req = {
            "QUESTIONS": "",
            "REPONSES": "",
            "type": "",
            "visibility": ""
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
            updateQuestionNQF(ID, req, target);

            if (target.find("." + clas + " .ow-btn-container:has(> i)").length == 0) {
                target.find("." + clas + " .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
            }

            setTimeout(function () {
                target.find("." + clas + " .ow-btn-container i.fa-check").remove()
                target.find("." + clas + " .NQF-edit-modif").hide()
                target.find("." + clas + " .NQF-new-quest-btn").show();
                target.find("." + clas + " .NQF-vue-question").show();
            }, 2000);


        } else {
            alert("verifier que tout les champs sont bien remplis");
            target.find("." + clas + " .NQF-vue-question").hide();
        }

    } else if (type == 2) {

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
        let description = target.find('.' + clas + ' .NFQ-desc-refjuridique textarea').val();

        if (title.trim() == "" || categ.trim() == "" || typee.trim() == "") {
            alert("verifier que tout les champs sont bien remplis");
            return;
        }

        var attachement = root.attachementRef;
        if (attachement.gedId.trim() != "") {
            var urlV = "/karazal/DownloadFile?gedId=" + attachement.gedId;
        } else {
            var urlV = "";
        }

        var attachement2 = root.attachementRefAr;
        if (attachement2.gedId.trim() != "") {
            var urlV2 = "/karazal/DownloadFile?gedId=" + attachement2.gedId;
        } else {
            var urlV2 = "";
        }

        console.log(title, categ, texte, description)
        var T = 0;
        if (categ == "Urbanisme") {
            T = 2;
        } else if (categ == "Economique") {
            T = 1;
        } else if (categ == "Autre") {
            T = 3;
        }
        let id = "";
        id = $("." + clas + " .NQF-id-ref").val();
        $("." + clas + " .NQF-title-ref").text(title);
        $("." + clas + " .NQF-desc-ref").text(description);
        $("." + clas + " .NQF-text-ref").html(texte);

        var req = {
            "title": "",
            "type": "",
            "content": "",
            "desc": "",
            "attachementRef": "",
            "urlV": "",
            "attachementRefAr": "",
            "urlV2": "",
            "typeRef": ""
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
        try {
            req.decsCnt = htmlToString(texte);
        } catch (e) {
        }

        console.log(req, id);

        //
        if (target.find("." + clas + " .ow-btn-container:has(> i)").length == 0) {
            target.find("." + clas + " .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
        }
        setTimeout(function () {
            target.find("." + clas + " .ow-btn-container i.fa-check").remove()
            target.find("." + clas + " .NQF-edit-modif").hide()
            target.find("." + clas + " .NQF-new-quest-btn").show();
            target.find("." + clas + " .NQF-vue-ref").show();
            target.find("." + clas + " .NQF-btn-alg").hide();
        }, 2000);

        updateReglementation(id, req, target);
    } else if (type == 3) {
        var clas = "classSearch-6";
        let title = $('.' + clas + ' .ow-field-input[data-xpath="title"]').val();
        let categ = $('.' + clas + ' .ow-field-input-select[data-xpath="categ"]').text();
        let urlV = $('.' + clas + ' .ow-field-input[data-xpath="url"]').val();
        let description = $('.' + clas + ' .ow-field-input-line textarea[data-xpath="description"]').val();
        let playlist = $('.' + clas + ' .ow-field-input-select[data-xpath="playlist"]').text();
        let tag = $('.' + clas + ' .ow-field-input-select[data-xpath="tag"]').text();

        if (categ == "Vimeo") {
            var video_id = urlV.match(/\/\d+/)[0].replace(/\//g, "");
        } else if (categ == "Youtube") {
            var video_id = urlV.match(/v=\w+[&]*/)[0].replace("v=", '');;
        }

        if (playlist.trim() == "") {
            playlist = "Général";
        }

        if (tag.trim() == "") {
            tag = "without_tag";
        }

        var current_datetime = new Date();

        var dateYear = current_datetime.getFullYear();
        var dateMonths = (current_datetime.getMonth() + 1).toString().length == 1 ? "0" + (current_datetime.getMonth() + 1) : (current_datetime.getMonth() + 1);
        var dateDays = current_datetime.getDate().toString().length == 1 ? "0" + current_datetime.getDate() : current_datetime.getDate();

        var hours = current_datetime.getHours().toString().length == 1 ? "0" + current_datetime.getHours() : current_datetime.getHours();
        var minutes = current_datetime.getMinutes().toString().length == 1 ? "0" + current_datetime.getMinutes() : current_datetime.getMinutes();
        var seconds = current_datetime.getSeconds().toString().length == 1 ? "0" + current_datetime.getSeconds() : current_datetime.getSeconds();

        var formatted_date = dateYear + "-" + dateMonths + "-" + dateDays + " " + hours + ":" + minutes + ":" + seconds + "";

        var req = {
            "title": title,
            "plateforme": categ,
            "url": urlV,
            "playlist": playlist,
            "description": description,
            "video_id": video_id,
            "img_url": "",
            "tag": tag,
            "date": formatted_date,
        };

        let id = "";
        id = $(".NQF-id-ref").val();
        if (categ == "Vimeo") {
            $.ajax({
                type: 'GET',
                url: 'https://vimeo.com/api/v2/video/' + video_id + '.json',
                jsonp: 'callback',
                dataType: 'jsonp',
                success: function (data) {
                    var thumbnail_src = data[0].thumbnail_large;
                    req.img_url = thumbnail_src;
                    if ($("." + clas + " .ow-btn-container:has(> i)").length == 0) {
                        $("." + clas + " .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
                    }


                    var urlemb = "https://player.vimeo.com/video/" + urlV.match(/\/\d+/)[0].replace(/\//g, "");
                    console.log(urlemb);
                    $("." + clas + " .NQF-vue-question .vue-video-frame").html("<iframe src=" + urlemb + " width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
                    $("." + clas + " .NQF-vue-question .vue-video-title b").html(title);
                    $("." + clas + " .NQF-vue-question .vue-video-description").html(description);

                    setTimeout(function () {
                        $("." + clas + " .ow-btn-container i.fa-check").remove()
                        $("." + clas + " .NQF-edit-modif").hide()
                        $("." + clas + " .NQF-new-quest-btn").show();
                        $("." + clas + " .NQF-vue-ref").show();
                        $("." + clas + " .NQF-btn-alg").hide();
                        $("." + clas + " .NQF-vue-question").show();

                        getAllplayLists(1, 100, clas);

                    }, 2000);

                    updateVideo(req.video_id, req);
                }
            });

        } else if (categ == "Youtube") {


            req.img_url = "https://img.youtube.com/vi/" + req.video_id + "/0.jpg";

            if ($("." + clas + " .ow-btn-container:has(> i)").length == 0) {
                $("." + clas + " .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
            }


            var urlemb = "https://www.youtube.com/embed/" + req.video_id;
            console.log(urlemb);
            $("." + clas + " .NQF-vue-question .vue-video-frame").html("<iframe src=" + urlemb + " width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
            $("." + clas + " .NQF-vue-question .vue-video-title b").html(title);
            $("." + clas + " .NQF-vue-question .vue-video-description").html(description);

            setTimeout(function () {
                $("." + clas + " .ow-btn-container i.fa-check").remove()
                $("." + clas + " .NQF-edit-modif").hide()
                $("." + clas + " .NQF-new-quest-btn").show();
                $("." + clas + " .NQF-vue-ref").show();
                $("." + clas + " .NQF-btn-alg").hide();
                $("." + clas + " .NQF-vue-question").show();

                getAllplayLists(1, 100, clas);

            }, 2000);

            updateVideo(req.video_id, req);
        }


    } else if (type == 4) {
        var clas = "classSearch-11";
        let title = $('.' + clas + ' .ow-field-input[data-xpath="title"]').val();
        let categ = $('.' + clas + ' .ow-field-input-select[data-xpath="categ"]').text();
        let urlV = $('.' + clas + ' .ow-field-input[data-xpath="url"]').val();
        let description = $('.' + clas + ' .ow-field-input-line textarea[data-xpath="description"]').val();
        let playlist = $('.' + clas + ' .ow-field-input-select[data-xpath="playlist"]').text();
        let text = $('.' + clas + ' .ql-editor').html();
        var imgUrl = $('.' + clas + ' .ow-field-input[data-xpath="imgUrl"]').val();
        console.log("root.attachement== " + root.attachement);
        var attachement = root.attachement;
        var attachementImg = root.attachementImg;
        console.log("saveeeeeeeeee : " + attachement);

        if (attachementImg.gedId != "") {
            imgUrl = "/karazal/DownloadFile?gedId=" + attachementImg.gedId + "";
        }

        if (playlist.trim() == "") {
            playlist = "Général";
        }


        var current_datetime = new Date();

        var dateYear = current_datetime.getFullYear();
        var dateMonths = (current_datetime.getMonth() + 1).toString().length == 1 ? "0" + (current_datetime.getMonth() + 1) : (current_datetime.getMonth() + 1);
        var dateDays = current_datetime.getDate().toString().length == 1 ? "0" + current_datetime.getDate() : current_datetime.getDate();

        var hours = current_datetime.getHours().toString().length == 1 ? "0" + current_datetime.getHours() : current_datetime.getHours();
        var minutes = current_datetime.getMinutes().toString().length == 1 ? "0" + current_datetime.getMinutes() : current_datetime.getMinutes();
        var seconds = current_datetime.getSeconds().toString().length == 1 ? "0" + current_datetime.getSeconds() : current_datetime.getSeconds();

        var formatted_date = dateYear + "-" + dateMonths + "-" + dateDays + " " + hours + ":" + minutes + ":" + seconds + "";

        var req = {
            "title": title,
            "plateforme": categ,
            "url": urlV,
            "playlist": playlist,
            "description": description,
            "img_url": imgUrl,
            "date": formatted_date,
            "attachement": attachement,
            "attachementImg": attachementImg,
            "text": text
        };

        if (attachement.gedId == "") {
            if (imgUrl.trim() != "") {
                $("." + clas + " .NQF-vue-question .vue-video-frame").html("<img src=" + imgUrl + " width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
            } else {
                if (categ == "DOC") {
                    $("." + clas + " .NQF-vue-question .vue-video-frame").html("<i class=\"fas fa-file-download\" style=\"font-size: 9VW;padding-top: 28px;padding-bottom: 28px;color: #38A;\"></i>")
                } else if (categ == "INSTALL") {
                    $("." + clas + " .NQF-vue-question .vue-video-frame").html("<i class=\"fas fa-download\" style=\"font-size: 9VW;padding-top: 28px;padding-bottom: 28px;color: #38A;\"></i>")
                }
            }
        } else {
            var krn = attachement.gedId.split("/")[0];
            var str = '<div class="docthumbnail"><img class="smallThumbnailImg" src="' + contextPath + '/DownloadFile?gedId=' + attachement.gedId + '&amp;thumbnail=small&amp;or=img/no-file.svg"><img class="largeThumbnailImg" src="' + contextPath + '/DownloadFile?gedId=' + attachement.gedId + '&amp;thumbnail=large&amp;or=img/no-file.svg"></div>';
        }

        let id = "";
        id = $("." + clas + " .NQF-id").val();

        $("." + clas + " .NQF-vue-question .vue-video-title b").html(title);
        $("." + clas + " .NQF-vue-question .vue-video-description").html(description);
        setTimeout(function () {
            $("." + clas + " .ow-btn-container i.fa-check").remove()
            $("." + clas + " .NQF-edit-modif").hide()
            $("." + clas + " .NQF-new-quest-btn").show();
            $("." + clas + " .NQF-vue-ref").show();
            $("." + clas + " .NQF-btn-alg").hide();
            $("." + clas + " .NQF-vue-question").show();

            getAllplayListsD(1, 100, clas, target);

        }, 2000);

        updatePlaylist(id, req);

    } else if (type == 7) {
        var clas = "classSearch-99";

        // let title = $('.'+clas+' .ow-field-input[data-xpath="NQFtitle"]').val();
        // let typee = $('.'+clas+' .ow-field-input-select[data-xpath="NQFtype"]').text();
        // let categ = $('.'+clas+' .ow-field-input-select[data-xpath="NQFcategorie"]').text();
        // let author = $('.'+clas+' .ow-field-input[data-xpath="NQFauthor"]').val();
        // let tags = $('.'+clas+' .ow-field-input[data-xpath="NQFtags"]').val();
        // let texte = $('.'+clas+' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html();
        // let description = $('.'+clas+' .NFQ-desc-refjuridique textarea').val(); 

        if (root.articleCms != "") {
            console.log("articleCms!=null");
            var title = root.NQFtitle;
            var typee = root.NQFtype;
            var categ = root.NQFcategorie;
            var author = root.NQFauthor;
            var tags = root.NQFtags;
            var lang = root.NQFlang;
            var source = root.NQFsource;
            var link = root.NQFlink;
            var texte = target.find('.' + clas + '  .ql-editor').html();
            var description = target.find('.' + clas + ' .NFQ-desc-refjuridique textarea').val();
            var attachement = root.attachementArImg;

            if (attachement.gedId.trim() != "") {
                var urlV = "/karazal/DownloadFile?gedId=" + attachement.gedId;
            } else {
                var urlV = "";
            }

            var formatted_date = root.articleCms.datePr;
            var vue = root.articleCms.vue;
            var like = root.articleCms.like;
            var comments = root.articleCms.comments;
            var list_vue = root.articleCms.list_vue;
            var liste_like = root.articleCms.liste_like;

        } else {
            var title = root.NQFtitle;
            var typee = root.NQFtype;
            var categ = root.NQFcategorie;
            var lang = root.NQFlang;
            var author = root.NQFauthor;
            var tags = root.NQFtags;
            var source = root.NQFsource;
            var link = root.NQFlink;
            var texte = target.find('.' + clas + '  .ql-editor').html();
            var description = target.find('.' + clas + ' .NFQ-desc-refjuridique textarea').val();
            var attachement = root.attachementArImg;
            if (attachement.gedId.trim() != "") {
                var urlV = "/karazal/DownloadFile?gedId=" + attachement.gedId;
            } else {
                var urlV = "";
            }

            var current_datetime = new Date();

            var dateYear = current_datetime.getFullYear();
            var dateMonths = (current_datetime.getMonth() + 1).toString().length == 1 ? "0" + (current_datetime.getMonth() + 1) : (current_datetime.getMonth() + 1);
            var dateDays = current_datetime.getDate().toString().length == 1 ? "0" + current_datetime.getDate() : current_datetime.getDate();

            var hours = current_datetime.getHours().toString().length == 1 ? "0" + current_datetime.getHours() : current_datetime.getHours();
            var minutes = current_datetime.getMinutes().toString().length == 1 ? "0" + current_datetime.getMinutes() : current_datetime.getMinutes();
            var seconds = current_datetime.getSeconds().toString().length == 1 ? "0" + current_datetime.getSeconds() : current_datetime.getSeconds();

            var formatted_date = dateYear + "-" + dateMonths + "-" + dateDays + " " + hours + ":" + minutes + ":" + seconds + "";

            var vue = 0;
            var like = 0;
            var comments = [];
            var list_vue = [];
            var liste_like = [];

        }








        console.log(title, categ, texte, description)

        let id = "";

        id = target.find("." + clas + " .NQF-id").val();

        /*$("."+clas+" .NQF-title-ref").text(title);
        $("."+clas+" .NQF-desc-ref").text(description);
        $("."+clas+" .NQF-text-ref").html(texte);
        */

        var req = {
            "title": "",
            "type": "",
            "content": "",
            "description": "",
            "attachementRef": "",
            "imgP": "",
            "datePr": "",
            "categorie": "",
            "author": "",
            "tags": "",
            "tagsText": "",
            "vue": 0,
            "like": 0,
            "comments": [],
            "list_vue": [],
            "liste_like": [],
            "source": "",
            "link": "",
            "lang": ""
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
        req.vue = vue;
        req.like = like;
        req.source = source;
        req.link = link;
        req.comments = comments;
        req.list_vue = list_vue;
        req.liste_like = liste_like;
        req.lang = lang;

        var ttg = tags.split("//");
        var tagsArr = [];

        ttg.forEach(function (elm) {
            var tagObj = {
                "tag": elm,
                "id": ""
            };
            tagsArr.push(tagObj);
        })

        req.tags = tagsArr;

        target.find("." + clas + " .NQF-vue-question .vue-video-frame").html("<img src=" + urlV + " width=\"100%\" height=\"100%\" frameborder=\"0\" ></iframe>");
        target.find("." + clas + " .NQF-vue-question .vue-video-title b").html(title);
        target.find("." + clas + " .NQF-vue-question .vue-video-description").html(description);


        console.log(req, id);

        //
        if (target.find("." + clas + " .ow-btn-container:has(> i)").length == 0) {
            target.find("." + clas + " .ow-btn-container:has(> .NQF-btn-check)").prepend('<i  class="fas fa-check fa-lg" style="color:green"></i>')
        }

        setTimeout(function () {
            target.find("." + clas + " .ow-btn-container i.fa-check").remove()
            target.find("." + clas + " .NQF-edit-modif").hide()
            target.find("." + clas + " .NQF-new-quest-btn").show();
            target.find("." + clas + " .NQF-vue-video").show();
            target.find("." + clas + " .NQF-btn-alg").hide();
        }, 2000);
        console.log(req);
        updateArticle(id, req, target, root);
    }
}


function NQF_add_question(quest, id, cls, type, target) {
    var clas = "classSearch-5";
    // console.log(id);
    if (type == 1) {
        var div = document.createElement("div");
        div.setAttribute("idd", id);
        var div2 = document.createElement("div");
        div2.setAttribute("class", "vpanel-body-title NQF-quest-delete");
        div2.setAttribute("style", "font-size: 14px;");
        var span1 = document.createElement("span");
        span1.setAttribute("class", "NFQ-click-btn");
        span1.innerHTML = quest;
        span1.addEventListener("click", function () {
            getQsFaq(id, 0, clas, target);
        });
        var span2 = document.createElement("span");
        span2.setAttribute("class", "far fa-times-circle NFQ-close-quest");
        span2.addEventListener("click", function () {
            getQsFaq(id, 0, clas, target);
            removeQuestionNFQ(id, "/" + faq_index + "/qr/")
        });
        var hr = document.createElement("hr");
        hr.setAttribute("class", "NQF-horizontal-line");
        div2.appendChild(span1);
        div2.appendChild(span2);
        div.appendChild(div2);
        div.appendChild(hr);
        target.find(cls + ":not(:has(>.NFQ-end))").append(div);

    } else if (type == 2 || type == 3) {

        if (profilesT.match(/CONTENT_EDITOR/) == 'CONTENT_EDITOR' || profilesT.match(/ADMINISTRATEUR/) == 'ADMINISTRATEUR') {
            var str = `toModifyFaq("${id}")`;
        } else {
            var str = `displaySearchByHisto("karaz/ux/hub/portailsearch/search/FaqDetail?query.idObject=${id}","search", "FaqDetail", {});`
        }

        target.find(cls + ":not(:has(>.NFQ-end))").append(`<div class="NFQ-mgn-bt">
<div class="vpanel-body-title " style="font-size: 14px;">
    <span class = 'NFQ-click-btn' onclick='javascript:`+ str + `' >` + quest + `</span>
</div>
<hr class="NQF-horizontal-line " />

</div>`)
    }

}


function viderUrl(type, root, context) {
    if (type == 0) {
        var attachement = root.attachement;
        console.log("Emptyyyyyyyyyyy:" + JSON.stringify(attachement));
        root.attachement.fileId = "";
        root.attachement.gedId = "";
        root.url = "";
        context.formRender.notifyObservers("attachement");
        attachement = root.attachement;
        console.log(attachement);

    } else if (type == 1) {
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



function updateQuestionNQF(id, obj, target) {

    let newID = ""
    if (id != "") {
        newID = id;
    }
    $.ajax({
        type: "post",

        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/" + faq_index + "/qr/" + newID,
        datatype: "application/json",
        data: JSON.stringify(obj),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            $(".NQF-id").val(result._id);
            voidRestSearch("", 0, 5, 0, [".NFQ-quest-type-document", ".NFQ-quest-type-plat", ".NFQ-quest-type-general", ".NFQ-quest-type-esign", ".NFQ-quest-type-archit", ".NFQ-quest-type-adminis"], 1, target);
            console.log(result);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });

}

function updateReglementation(id, obj, target) {


    let newID = ""
    if (id != "") {
        newID = id;
    }
    $.ajax({
        type: "post",

        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/reglementation_index/reglementation/" + newID,
        datatype: "application/json",
        data: JSON.stringify(obj),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            voidRestSearch("", 0, 7, 0, [".vv1 .NFQ-quest-type-eco1", ".vv1 .NFQ-quest-type-urba1"], 0, target);
            console.log(result);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });

}

function restAutoComplete2(inp, req, index, field) {

    var obj = {
        "size": 5, "query":
        {
            "bool": {
                "must": [{
                    "query_string": {
                        "fields": [field],
                        "query": "*" + req + "*",
                        "fuzziness": "AUTO",
                        "minimum_should_match": "100%"
                    }
                }],
                "should": [{
                    "match_phrase_prefix": {
                        "value": req
                    }
                }]
            }
        }
    };

    console.log(JSON.stringify(obj));

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/" + index + "/_search",
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);

            createListeRes(inp, result.hits.hits, req, 2);

        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function createListeRes(inp, arr, val, type) {
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


        b.setAttribute("title", str);
        if (val == "") {
            b.innerHTML = str.toLowerCase();
        } else {
            b.innerHTML = addSpansHL(val.toLowerCase(), str.toLowerCase());
        }

        if (type == 1) {
            /*insert a input field that will hold the current array item's value:*/
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("value", arr[i]._id);
            b.appendChild(input);
            /*execute a function when someone clicks on the item value (DIV element):*/

            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").html(this.getAttribute("title"));
                $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").attr("title", this.getElementsByTagName("input")[0].value);
                $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").show();
                $(".cms-form .body-cms-form .class-question .link-sim-cms span.update").hide();
                $(".cms-form .body-cms-form .class-question .link-sim-cms .fa-edit").show();
                $(".cms-form .body-cms-form .class-question .link-sim-cms .fa-plus").hide();
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllListsSim(1);
            });
        } else {
            b.addEventListener("click", function (e) {
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

function createListeRes(inp, arr, val, type) {
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


        b.setAttribute("title", str);
        if (val == "") {
            b.innerHTML = str.toLowerCase();
        } else {
            b.innerHTML = addSpansHL(val.toLowerCase(), str.toLowerCase());
        }

        if (type == 1) {
            /*insert a input field that will hold the current array item's value:*/
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("value", arr[i]._id);
            b.appendChild(input);
            /*execute a function when someone clicks on the item value (DIV element):*/

            b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").html(this.getAttribute("title"));
                $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").attr("title", this.getElementsByTagName("input")[0].value);
                $(".cms-form .body-cms-form .class-question .link-sim-cms span.qst").show();
                $(".cms-form .body-cms-form .class-question .link-sim-cms span.update").hide();
                $(".cms-form .body-cms-form .class-question .link-sim-cms .fa-edit").show();
                $(".cms-form .body-cms-form .class-question .link-sim-cms .fa-plus").hide();
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllListsSim(1);
            });
        } else {
            b.addEventListener("click", function (e) {
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




function getCountArticles(cls) {

    var str = "{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{ \"size\":0,\"query\": { \"match_all\": {}}}\n{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{ \"size\":0,\"query\": { \"term\": { \"type.keyword\":\"PRATIQUE\" }}}\n{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{ \"size\":0,\"query\": { \"term\": { \"type.keyword\":\"A LA UNE\" }}}\n{ \"index\": \"geo_article_index\", \"type\": \"_doc\" }\n{ \"size\":0,\"query\": { \"term\": { \"type.keyword\":\"REVUE DE PRESSE\" }}}\n";

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data: str,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            //voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0);
            var count_all = result.responses[0].hits.total.value;
            var count_astuce = result.responses[1].hits.total.value;
            var count_alaune = result.responses[2].hits.total.value;
            var count_avenir = result.responses[3].hits.total.value;

            $("." + cls + " .article-categorie li.li-1 span").html("(" + count_all + ")");
            $("." + cls + " .article-categorie li.li-2 span").html("(" + count_astuce + ")");
            $("." + cls + " .article-categorie li.li-3 span").html("(" + count_alaune + ")");
            $("." + cls + " .article-categorie li.li-4 span").html("(" + count_avenir + ")");


        },
        error: function (error) {
            console.log(error.responseText);
        }
    });




}

function updateArticle(id, obj, target, root) {


    let newID = ""
    if (id != "") {
        newID = id;
    }
    $.ajax({
        type: "post",

        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_article_index/_doc/" + newID,
        datatype: "application/json",
        data: JSON.stringify(obj),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            //voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0);
            setTimeout(function () {
                RestSearchArticleSec("", 0, 5, ["PRATIQUE", "A LA UNE", "REVUE DE PRESSE"], 2, [".vv1 .NFQ-quest-type-astuce", ".vv1 .NFQ-quest-type-alune", ".vv1 .NFQ-quest-type-avenir"], 0, "classSearch-99", target, root)
            }, 2000);
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

        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/" + videos_index + "/video/" + newID,
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
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/attachements_index/attachement/" + newID,
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

function voidRestSearch(prefix, page, size, type, cls, atr, target) {
    $(".faq-vbox .no-response-find").hide();
    if (atr == 0) {
        var str = ""

        if (type == 0) {
            str += generateRequestRefSearch(prefix, "1", page, size);
            str += generateRequestRefSearch(prefix, "2", page, size);
        } else if (type == 1) {
            str += generateRequestRefSearch(prefix, "1", page, size);
        } else if (type == 2) {
            str += generateRequestRefSearch(prefix, "2", page, size);
        }

    } else {

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
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data: str,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log("go ...! " + result);

            if (atr == 0) {
                setTimeout(function () {
                    RestSearchref("", 0, 7, 0, 1, [".vv1 .NFQ-quest-type-eco1", ".vv1 .NFQ-quest-type-urba1", ".vv1 .NFQ-quest-type-autre1"], "classSearch-3", target);
                }, 1000);
            } else {
                setTimeout(function () {
                    RestSearchFaqSec("", 0, 5, 0, [".vv1 .NFQ-quest-type-document", ".vv1 .NFQ-quest-type-plat", ".vv1 .NFQ-quest-type-general", ".vv1 .NFQ-quest-type-esign", ".vv1 .NFQ-quest-type-archit", ".vv1 .NFQ-quest-type-adminis"], 1, null, target);
                    RestSearchFaqSec("", 0, 5, 0, [".vv1 .NFQ-quest-type-document1", ".vv1 .NFQ-quest-type-plat1", ".vv1 .NFQ-quest-type-general1", ".vv1 .NFQ-quest-type-esign1", ".vv1 .NFQ-quest-type-archit1", ".vv1 .NFQ-quest-type-adminis1"], 2, null, target);
                }, 1000);
            }
        }, error: function (error) {
            console.log(error);
        }
    })
}

function RestSearchFaqSec(prefix, page, size, type, cls, atr, typee, target) {

    var str = ""
    //$(".faq-vbox .no-response-find").hide();

    if (type == 0) {
        target.find(".vv2 .faq-fieldset").hide();
        str += generateRequestFaqSearch(prefix, "DOCUMENT", page, size, typee);
        str += generateRequestFaqSearch(prefix, "PLATEFORME", page, size, typee);
        str += generateRequestFaqSearch(prefix, "GENERAL", page, size, typee);
        str += generateRequestFaqSearch(prefix, "E-SIGN", page, size, typee);
        str += generateRequestFaqSearch(prefix, "ARCHITECTE", page, size, typee);
        str += generateRequestFaqSearch(prefix, "ADMINISTRATION", page, size, typee);
    } else if (type == 1) {
        str += generateRequestFaqSearch(prefix, "DOCUMENT", page, size, typee);
    } else if (type == 2) {
        str += generateRequestFaqSearch(prefix, "PLATEFORME", page, size, typee);
    } else if (type == 3) {
        str += generateRequestFaqSearch(prefix, "GENERAL", page, size, typee);
    } else if (type == 4) {
        str += generateRequestFaqSearch(prefix, "E-SIGN", page, size, typee);
    } else if (type == 5) {
        str += generateRequestFaqSearch(prefix, "ARCHITECTE", page, size, typee);
    } else if (type == 6) {
        str += generateRequestFaqSearch(prefix, "ADMINISTRATION", page, size, typee);
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
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data: str,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);
            if (type != 0) {
                for (var i = 0; i < result.responses.length; i++) {
                    if (result.responses[i].hits.hits.length != 0) {


                        for (let j = 0; j < result.responses[i].hits.hits.length; j++) {

                            NQF_add_question(result.responses[i].hits.hits[j]._source.QUESTIONS, result.responses[i].hits.hits[j]._id, cls, atr, target)

                        }
                        if (atr != 3 && result.responses[i].hits.hits != 0) {
                            target.find(cls).append(`<span  class="NFQ-end" onclick='displaySearchByHisto("karaz/ux/hub/portailsearch/search/FaqPage","search", "Faq Page", {});'> Toutes les questions de la catégorie<span>`);
                        }

                    }
                }
            } else {
                for (var i = 0; i < result.responses.length; i++) {
                    target.find(cls[i]).html("");
                    for (let j = 0; j < result.responses[i].hits.hits.length; j++) {

                        NQF_add_question(result.responses[i].hits.hits[j]._source.QUESTIONS, result.responses[i].hits.hits[j]._id, cls[i], atr, target)

                    }
                    if (atr != 3 && result.responses[i].hits.hits != 0) {
                        console.log(result.responses[i].hits);
                        target.find(cls[i]).append(`<span  class="NFQ-end" onclick="RestSearchFaqWithIntilize('',0,2,${typesList.indexOf(result.responses[i].hits.hits[0]._source.type) + 1},-1)"> Toutes les questions de la catégorie<span>`);
                    } else {
                    }
                }
            }

        },
        error: function (error) {
            console.log(error.responseText);
        }
    })


}

function RestSearchFaqWithIntilize(var1, var2, var3, var4, var5, target) {
    intializeFaqPages();
    RestSearchFaq(var1, var2, var3, var4, var5, undefined, undefined, target);
}


function RestSearchRefWithIntilize(var1, var2, var3, var4, var5) {
    intializeFaqPages();
    RestSearchref(var1, var2, var3, var4, var5);
}


function toModifyFaq(id) {
    displaySearchByHisto("karaz/ux/hub/portailsearch/search/NewfreqQuestion?query.idObject=" + id, "search", "Edit question fréquente", {});
};


function removeQuestionNFQ(id, indexType) {

    var str = "Do you really want to delete this element ?";
    if (window.confirm(str)) {
        console.log(URL_SEARCH + "?operation=wselastic&shortUrl=" + indexType + id);
        $.ajax({
            type: "delete",
            url: URL_SEARCH + "?operation=wselastic&shortUrl=" + indexType + id,
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

function NQF_edit_av(type, dataroot, ctx, clas, target) {

    if (type == 1) {
        ctx.formRender.targetPanel.find("." + clas + " .NFQ-all-quest").hide();

        let resp = ctx.formRender.targetPanel.find("." + clas + " .NQF-prev-resp").html();
        let ID = ctx.formRender.targetPanel.find("." + clas + " .NQF-id").val();
        dataroot.question = faqObject.QUESTIONS;
        // dataroot.nfqresponse=resp;
        dataroot.categ = faqObject.type;
        dataroot.visibility = faqObject.visibility;
        ctx.formRender.notifyObservers("question");
        ctx.formRender.notifyObservers("nfqresponse");
        ctx.formRender.notifyObservers("categ");
        ctx.formRender.notifyObservers("visibility");

        ctx.formRender.targetPanel.find("." + clas + '  .ql-editor').empty();
        ctx.formRender.targetPanel.find("." + clas + '  .ql-editor').html(resp)
        ctx.formRender.targetPanel.find("." + clas + " .NQF-edit-modif").show();
        ctx.formRender.targetPanel.find("." + clas + " .NQF-btn-alg").hide();
    } else if (type == 2) {
        // add edit here
        let title = refObject.title;
        let desc = refObject.desc;
        let text = refObject.content;
        let type = refObject.type;
        let typeRef = refObject.typeRef;
        let lang = refObject.lang;


        if (refObject.urlV != undefined) {
            var urlV = refObject.urlV;
        } else {
            var urlV = "";
        }

        if (refObject.attachementRef != undefined) {
            let attachement = refObject.attachementRef;
            dataroot.attachementRef = attachement;
            ctx.formRender.notifyObservers("attachementRef");
        } else {
            let attachement = {
                "fileId": "",
                "fileName": "",
                "fileSize": "",
                "fileSignature": "",
                "fileTime": "",
                "gedId": ""
            };
            dataroot.attachementRef = attachement;
            ctx.formRender.notifyObservers("attachementRef");
        }

        if (refObject.urlV2 != undefined) {
            var urlV2 = refObject.urlV2;
        } else {
            var urlV2 = "";
        }

        if (refObject.attachementRefAr != undefined) {
            let attachement2 = refObject.attachementRefAr;
            dataroot.attachementRefAr = attachement2;
            ctx.formRender.notifyObservers("attachementRefAr");
        } else {
            let attachement2 = {
                "fileId": "",
                "fileName": "",
                "fileSize": "",
                "fileSignature": "",
                "fileTime": "",
                "gedId": ""
            };
            dataroot.attachementRefAr = attachement;
            ctx.formRender.notifyObservers("attachementRefAr");
        }

        console.log(title, desc, text, type);

        dataroot.NQFtitle = title;
        dataroot.NQFtype = type;
        dataroot.NQFdesc = desc;
        dataroot.urlRef = urlV;
        dataroot.urlRef2 = urlV2;
        dataroot.NQFtypeRef = typeRef;
        dataroot.NQFLang = lang;

        ctx.formRender.notifyObservers("NQFtitle");
        ctx.formRender.notifyObservers("NQFtype");
        ctx.formRender.notifyObservers("NQFtypeRef");
        ctx.formRender.notifyObservers("NQFdesc");
        ctx.formRender.notifyObservers("urlRef");
        ctx.formRender.notifyObservers("NQFLang");

        $("." + clas + ' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').empty();
        $("." + clas + ' .ow-field-htmleditor[data-xpath="NQFtext"] .ql-editor').html(text)
        $("." + clas + " .NQF-edit-modif").show();
        $("." + clas + " .NQF-btn-alg").hide();

    } else if (type == 3) {

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

        $("." + clas + " .NQF-edit-modif").show();
        $("." + clas + " .NQF-btn-alg").hide();
    } else if (type == 4) {
        dataroot.title = attachementObject.title;
        dataroot.url = attachementObject.url;
        dataroot.playlist = attachementObject.playlist;
        dataroot.categ = attachementObject.plateforme;
        dataroot.description = attachementObject.description;
        dataroot.imgUrl = attachementObject.img_url;
        dataroot.attachement = attachementObject.attachement;
        dataroot.attachementImg = attachementObject.attachementImg;

        if (attachementObject.attachement.gedId != "") {
            dataroot.url = contextPath + "/DownloadFile?gedId=" + attachementObject.attachement.gedId;
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

        $("." + clas + ' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').empty();
        $("." + clas + ' .ow-field-htmleditor[data-xpath="nfqresponse"] .ql-editor').html(text);

        $("." + clas + " .NQF-edit-modif").show();
        $("." + clas + " .NQF-btn-alg").hide();
    } else if (type == 7) {
        // add edit here
        let title = dataroot.articleCms.title;
        let desc = dataroot.articleCms.description;
        let text = dataroot.articleCms.content;
        let type = dataroot.articleCms.type;
        let categ = dataroot.articleCms.categorie;
        let author = dataroot.articleCms.author;
        let tag = dataroot.articleCms.tagsText;

        if (dataroot.articleCms.lang != undefined) {
            var lang = dataroot.articleCms.lang;
        } else {
            var lang = "Fr";
        }


        try {
            var source = dataroot.articleCms.source;
            var link = dataroot.articleCms.link;
        } catch (e) {
            console.log(e);
        }

        if (dataroot.articleCms.imgP != undefined) {
            var urlV = dataroot.articleCms.imgP;
        } else {
            var urlV = "";
        }

        if (dataroot.articleCms.attachementRef != undefined) {
            let attachement = dataroot.articleCms.attachementRef;
            dataroot.attachementArImg = attachement;
            ctx.formRender.notifyObservers("attachementArImg");
        } else {
            let attachement = {
                "fileId": "",
                "fileName": "",
                "fileSize": "",
                "fileSignature": "",
                "fileTime": "",
                "gedId": ""
            };
            dataroot.attachementArImg = attachement;
            ctx.formRender.notifyObservers("attachementArImg");
        }

        console.log(title, desc, text, type);

        dataroot.NQFtitle = title;
        dataroot.NQFtype = categ;
        dataroot.NQFdesc = desc;
        dataroot.urlRef = urlV;
        dataroot.NQFcategorie = type;
        dataroot.NQFauthor = author;
        dataroot.NQFtags = tag;
        dataroot.NQFlang = lang;

        try {
            dataroot.NQFsource = source;
            dataroot.NQFlink = link;
        } catch (e) {
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

        target.find("." + clas + '  .ql-editor').empty();
        target.find("." + clas + '  .ql-editor').html(text)
        target.find("." + clas + " .NQF-edit-modif").show();
        target.find("." + clas + " .NQF-btn-alg").hide();

    }
}

function getFormatedDate(date) {
    var current_datetime = date;

    var dateYear = current_datetime.getFullYear();
    var dateMonths = (current_datetime.getMonth() + 1).toString().length == 1 ? "0" + (current_datetime.getMonth() + 1) : (current_datetime.getMonth() + 1);
    var dateDays = current_datetime.getDate().toString().length == 1 ? "0" + current_datetime.getDate() : current_datetime.getDate();

    var hours = current_datetime.getHours().toString().length == 1 ? "0" + current_datetime.getHours() : current_datetime.getHours();
    var minutes = current_datetime.getMinutes().toString().length == 1 ? "0" + current_datetime.getMinutes() : current_datetime.getMinutes();
    var seconds = current_datetime.getSeconds().toString().length == 1 ? "0" + current_datetime.getSeconds() : current_datetime.getSeconds();

    var formatted_date = dateYear + "-" + dateMonths + "-" + dateDays + " " + hours + ":" + minutes + ":" + seconds + "";

    return formatted_date;
}


function closeGeoPopUp(id) {
    var modal = $("#" + id + " #myModal").get(0);
    stopVideo("#" + id);
    modal.style.display = "none";
}

function openGeoPopUp(id) {
    var modal = $("#" + id + " #myModal").get(0);
    modal.style.display = "block";
}


function stopVideo(text) {
    var iframe = document.querySelector(text + ' iframe');
    console.log("close Video");
    var video = document.querySelector(text + ' video');
    if (iframe !== null) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if (video !== null) {
        video.pause();
    }
}

function autocompleteGeo(inp, type, kmapid, context, root) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllListsGeo();
        if (inp.value.length >= 3) {
            if (type != "" && kmapid != "none") {
                type = $(inp).parents("#searchBlockContainer").find("select option:selected").val();
                searchByLocationName(inp, type, inp.value, kmapid, null, null);
            } else if (kmapid == "none") {
                searchByLocationName(inp, type, inp.value, kmapid, context, root);
            } else {
                searchByLocationName(inp, type, inp.value, kmapid, null, null);
            }
        }


    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        closeAllListsGeo();
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllListsGeo(e.target);
    });
}

function closeAllListsGeo() {
    currentFocus = -1;

    var y = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < y.length; i++) {
        y[i].parentNode.removeChild(y[i]);
    }

}

//comment:  ajout de la recherche by Id :
function searchById(id, kmapid){
    console.log("the id is :"+id)
    var obj = {
        "query": {
            "terms": {
              "_id": [ id ] 
            }
          }
    }
    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_location_index2/_search",
        contentType: "application/json",
        datatype: "application/json",
        async: false,
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log("success id");
            drawGeoObjEs(result.hits.hits[0]._source, kmapid);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function searchByLocationName(inp, type, req, kmapid, context, root) {

    var obj = {
        "size": 5,
         "query":
        {
            "bool": {
                "must": [{
                    "query_string": {
                        "fields": ["location"],
                        "query": "*" + req + "*",
                        "fuzziness": "AUTO",
                        "minimum_should_match": "80%"
                    }
                }],
                "should": [{
                    "match_phrase_prefix": {
                        "location": req
                    }
                }]
            }
        },
        "_source": ["location", "type"]
    };

    console.log("type is :"+type);

    if (type != "") {
        var temp = {
            "term": { "type.keyword": type }
        };
        obj.query.bool.must.push(temp);
    }
    

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_location_index2/_search",
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);
            createListeResGeo(inp, result.hits.hits, req, kmapid, context, root);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function searchByRefFon(txt, mapId) {
    var obj = {
        "size": 5, "query":
        {

            "term": { "titre.keyword": txt }

        }
    };

    console.log(txt);


    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/titrefoncier_index/_search",
        contentType: "application/json",
        datatype: "application/json",
        data: JSON.stringify(obj),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);
            if (result.hits.length != 0) {
                var ring = result.hits.hits[0]._source.ring.all;
                mapBrowserPolygonDrawPlg(mapId, JSON.stringify(ring), "EPSG:26191");
            }
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

var arrayLocation = [];

function createListeResGeo(inp, arr, val, kmapid, context, root) {
    closeAllListsGeo();
    a = document.createElement("DIV");
    a.setAttribute("id", "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    inp.parentNode.appendChild(a);

    arrayLocation = [];
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        /*create a DIV element for each matching element:*/
        var b = document.createElement("DIV");
        /*make the matching letters bold:*/

        var str = arr[i]._source.location;
        var typee = arr[i]._source.type;

        //arrayLocation.push(arr[i]._source);

        b.setAttribute("title", str);

        if (typee == "Documents urbanisme") {
            if (val == "") {
                b.innerHTML = str.toLowerCase();
            } else {
                b.innerHTML = addSpansHL(val.toLowerCase(), str.toLowerCase());
            }
        } else {
            if (val == "") {
                b.innerHTML = typee + " de " + str.toLowerCase();
            } else {
                b.innerHTML = typee + " de " + addSpansHL(val.toLowerCase(), str.toLowerCase());
            }
        }



        /*insert a input field that will hold the current array item's value:*/
        var input = document.createElement("input");
        input.setAttribute("id", "value");
        input.setAttribute("type", "hidden");
        input.setAttribute("value", i);

        var input2 = document.createElement("input");
        input2.setAttribute("id", "label");
        input2.setAttribute("type", "hidden");
        input2.setAttribute("value", typee + " de " + str.toLowerCase());

        var input3 = document.createElement("input");
        input3.setAttribute("id", "objId");
        input3.setAttribute("type", "hidden");
        input3.setAttribute("value", arr[i]._id);

        b.appendChild(input);
        b.appendChild(input2);
        b.appendChild(input3);

        /*execute a function when someone clicks on the item value (DIV element):*/

        b.addEventListener("click", function (e) {
            /*insert the value for the autocomplete text field:*/
            console.log("kmapId is : "+kmapid);
            inp.value = $(this).find("#label").val();
            if (kmapid != null && kmapid != "none") {
                 //comment:  ajout de la recherche by Id dans le cliq dans la map:
                searchById($(this).find("#objId").val(), kmapid);
                //drawGeoObjEs(arrayLocation[Number($(this).find("#value").val())], kmapid);
            } else if (kmapid == "none") {
                root.data.mappingMapAid = $(this).find("#objId").val();
                root.data.mappingMapName = $(this).find("#label").val();
                context.formRender.notifyObservers("root.data.mappingMapAid");
                context.formRender.notifyObservers("root.data.mappingMapName");
            } else {
                console.log("kmapId is : 3");
                displaySearchByHisto("gis/virtual/search/MapBoxSearch?query.objId=" + $(this).find("#objId").val(), "search", "GÉOPORTAIL", {});
            }
            closeAllListsGeo();
        });

        a.appendChild(b);
    }
}


function getObjFromGeoLocationById(id, kmapid) {
    $.ajax({
        type: "get",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/geo_location_index2/_doc/" + id,
        contentType: "application/json",
        datatype: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            console.log(result);
            console.log("result== " + result);

            drawGeoObjEs(result._source, kmapid);

        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function drawGeoObjEs(layer, kmapid) {
    console.log("drawGeoObjEs " + layer);

    var obj = {
        "type": "FeatureCollection",
        "features": [],
        "styles": {
            "_857": {
                "id": "857",
                "labelColor": "",
                "labelScale": "1",
                "color": "#1E1E20e5",
                "lineWidth": 1.0,
                "fillColor": "#313187ff",
                "weight": 1
            }
        }
    };

    var features = [];

    for (var i = 0; i < layer.config[0].length; i++) {
        var feature = {
            "type": "Feature",
            "properties": {
            },
            "geometry": {

            }
        }

        feature.properties[layer.type] = layer.location;
        feature.geometry.type = "polygon";
        feature.geometry.coordinates = [layer.config[0][i]];


        console.log(feature);
        features.push(feature);
    };

    obj.features = features;
    console.log(features);

    addGeoJsonLayerObj(kmapid, obj, 'KML-ATTACH-x', 'KML Attachement', true);
}

var countries = ["Bab Lamrissa", "Saidia", "Oujda", "Taza"];
var mapIds = [5956, 1090, 1048, 1063];

function searchBtn() {
    var index = countries.indexOf($("#searchQr").val());
    openGeoMap(mapIds[index]);
}

function openGeoMap(text) {
    if (text == 1063) {
        mapId = "0004";
    } else if (text == 1084) {
        mapId = "0005";
    } else if (text == 1090) {
        mapId = "0006";
    } else {
        mapId = "0002";

    }
    displaySearchByHisto("karaz/ux/hub/portailsearch/search/MapBrwSearch?query.mapId=" + mapId, "search", "GÉOPORTAIL", {});
}


function addReview(msg, star) {
    var obj = {
        "msg": msg,
        "star": star
    }

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/review_index/review/",
        datatype: "application/json",
        data: JSON.stringify(obj),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            //voidRestSearch("",0,7,0,[".vv1 .NFQ-quest-type-eco1",".vv1 .NFQ-quest-type-urba1"],0);
            console.log("result", result);
            $("#reveiw-container").hide();
            $("#message-done").show();
            setTimeout(function () {
                getReviews(null);
            }, 2000);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });

}

function getReviews(context) {
    var str = "{ \"index\": \"review_index\", \"type\": \"review\" }\n{\"size\":10000,\"query\":{ \"term\":{\"star\":\"1\"} }}\n";
    str += "{ \"index\": \"review_index\", \"type\": \"review\" }\n{\"size\":10000,\"query\":{ \"term\":{\"star\":\"2\"} }}\n";
    str += "{ \"index\": \"review_index\", \"type\": \"review\" }\n{\"size\":10000,\"query\":{ \"term\":{\"star\":\"3\"} }}\n";
    str += "{ \"index\": \"review_index\", \"type\": \"review\" }\n{\"size\":10000,\"query\":{ \"term\":{\"star\":\"4\"} }}\n";
    str += "{ \"index\": \"review_index\", \"type\": \"review\" }\n{\"size\":10000,\"query\":{ \"term\":{\"star\":\"5\"} }}\n";

    $.ajax({
        type: "post",
        url: URL_SEARCH + "?operation=wselastic&shortUrl=" + "/_msearch",
        datatype: "application/json",
        contentType: "application/x-ndjson",
        data: str,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", AUTH);
        },
        success: function (result) {
            var tab = {
                "1": result.responses[0].hits.total.value,
                "2": result.responses[1].hits.total.value,
                "3": result.responses[2].hits.total.value,
                "4": result.responses[3].hits.total.value,
                "5": result.responses[4].hits.total.value
            }
            console.log(tab);

            reviewDraw(context, tab);
            console.log(result);
        },
        error: function (error) {
            console.log(error.responseText);
        }
    });
}

function reviewDraw(context, tab) {
    var total = Number(tab[1]) + Number(tab[2]) + Number(tab[3]) + Number(tab[4]) + Number(tab[5]);
    console.log(total);
    var avg = (Number(tab[1]) * 1 + Number(tab[2]) * 2 + Number(tab[3]) * 3 + Number(tab[4]) * 4 + Number(tab[5]) * 5) / total;
    console.log(avg);
    $(".avg").html(avg.toFixed(1));
    $(".total-hits").html(total);
    $(".side1").html(Number(tab[1]));
    $(".side2").html(Number(tab[2]));
    $(".side3").html(Number(tab[3]));
    $(".side4").html(Number(tab[4]));
    $(".side5").html(Number(tab[5]));
    $(".bar-1").css("width", Number(tab[1]) * 100 / total + "%");
    $(".bar-2").css("width", Number(tab[2]) * 100 / total + "%");
    $(".bar-3").css("width", Number(tab[3]) * 100 / total + "%");
    $(".bar-4").css("width", Number(tab[4]) * 100 / total + "%");
    $(".bar-5").css("width", Number(tab[5]) * 100 / total + "%");
}

function sendReveiwRender() {
    var stars = $(".rating label");
    var star = 0;
    for (var i = 9; i >= 0; i--) {
        if (stars.eq(i).css("color") == "rgb(255, 215, 0)") {
            star++;
        }
    }
    var star = Math.round(star / 2);
    var msg = $("textarea#review-msg").val();
    addReview(msg, star);
}

function showReviewContainer() {
    $("#reveiw-container").show();
    $("#showViewBtn").hide();
}

function closeFilesPopUp(obj) {
    console.log(obj);
    $(obj).parents(".container-popup-block").find("iframe").hide();
    $(obj).parents(".container-popup-block").hide();
    $(obj).parents(".container-popup-block").find("iframe").attr("src", "");
}

function fullScreenPopUp(obj) {
    $(obj).parents(".container-popup-docs").find(".rev-full-screen-btn").show();
    $(obj).parents(".container-popup-docs").find(".full-screen-btn").hide();
    $(obj).parents(".container-popup-docs").addClass("fullscreenPP");
    $(obj).parents(".container-popup-block").addClass("fullscreenPP");
}

function revFullScreenPopUp(obj) {
    $(obj).parents(".container-popup-docs").find(".rev-full-screen-btn").hide();
    $(obj).parents(".container-popup-docs").find(".full-screen-btn").show();
    $(obj).parents(".container-popup-docs").removeClass("fullscreenPP");
    $(obj).parents(".container-popup-block").removeClass("fullscreenPP");
}

function showFilePP(obj, gedId) {
    $(obj).parents(".container-popup-block").find("iframe").attr("src", "/karazal/DownloadFile?gedId=" + gedId);
    $(obj).parents(".container-popup-block").find("iframe").show();
    $(obj).parents(".header-pp").find("li").removeClass("active");
    $(obj).addClass("active");
}

function showPopUp(obj) {
    console.log($(obj).parent(".main_search"));
    $(obj).parents(".main_search").find(".container-popup-block").show();
}

function rootPage(e) {
    if ($(event.target).hasClass("slider-height") || $(event.target).hasClass("container") || $(event.target).hasClass("align-items-center")) {
        displaySearchByHisto("karaz/ux/hub/portailsearch/search/MapBrwSearch?query.mapId=0002", "search", "GÉOPORTAIL", {});
    }
}

function convertFromGeoJsonToPnts(obj) {
    var globalObj = { "pnt": [] };
    for (var i = 0; i < obj.length; i++) {
        var objj = {
            "num": "",
            "e": "",
            "n": "",
            "geo": ""
        };

        console.log(obj[i]);

        objj.e = obj[i][0];
        objj.n = obj[i][1];
        globalObj.pnt.push(objj);
    }
    return globalObj;
}


function showSearchBlock() {
    $(".showSearchBlockBtn").hide();
    $(".hideSearchBlockBtn").show();
    $(".searchBlockContainerCls").show();
}

function hideSearchBlock() {
    $(".hideSearchBlockBtn").hide();
    $(".showSearchBlockBtn").show();
    $(".searchBlockContainerCls").hide();
} 

$(".showSearchBlockBtn").cli

function runRemoteActionPLayer(id, context) {
    return ApplicationManager.runRemoteAction('karazapps/gis/mapbrowser/action/MapBrowserBacker?operation=publishBundlesFromLayer&id=' + parseInt(id), parseInt(id), context.formRender.dataObjectRoot, context.formRender);
}

function showLoadingGif(context){
    context.formRender.targetPanel.find(".objectList-search-avr .list-wrapper").html("<div style='height:500px;text-align:center;'><img style='margin-top:120px' src='extensions/img/loadGif.gif'></img></div>");
}


//comment: copier le style de deux elements
function copyNodeStyle(sourceNode, targetNode) {
    const computedStyle = getComputedStyle(sourceNode);
    Array.from(computedStyle).forEach(key => targetNode.style.setProperty(key, computedStyle.getPropertyValue(key)))
  }
/*
//comment: Ajout du loading modal , computedStyle.getPropertyPriority(key)
$(document).on({
    ajaxStart: function() { $(".modalloading").fadeIn(100);    },
    ajaxStop: function() { $(".modalloading").fadeOut(300); }    
});*/

function showChartGif() {
    $(".modalloading").fadeIn(100);
}
function hideChartGif() {
    $(".modalloading").fadeOut(250);
}

function showgenloading(t){
    if($("#imgLoading"+t).length ==0){
        console.log("the id",$("#"+t));
        $("#"+t).append("<img id='imgLoading"+t+"' src='extensions/img/loader.gif' style='position:absolute; width:7%; right:680px; top:200px; z-index:100;'/>")
    }
    console.log("the id is: ",t)
    $("#imgLoading"+t).fadeIn(100);
}
function hidegenloaging(t){
    console.log("the id is done: ",t)
    $("#imgLoading"+t).fadeOut(100);

} 

function imgError(image) { 
    image.onerror = "";
    image.src = "/karazal/extensions/img/maroc.png";
    image.style="height: 118px;margin-left: 50px;"
    return true;
}