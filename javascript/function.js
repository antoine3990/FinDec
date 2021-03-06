/* global $ */
var previousLang = "fr";
var lang = "fr";

function search() {
	if ($("#search_input").is(":hidden")) {
		$("#search_input").show();
		$("#search > button").unbind("mouseenter mouseleave"); // Enlever la fonction hover
		$("#search > button").css("background", "#525252 url(images/search_active.png) no-repeat center");
        showSearchInput(true);
	}
	else {
		
	}
}

function showSearchInput(animate) {
    var inputWidth = 330;
    var searchWidth = 400;
    var anime_time = 200;
    var anime_style = "linear";
    
    if (animate) {
		$("#search_input").animate({width: inputWidth}, anime_time, anime_style);
		$("#search").animate({width: searchWidth, left: ($(window).width() - offsetSearch())}, anime_time, anime_style);
    }
    else {
		$("#search_input").stop().css({ width: inputWidth });
		$("#search").stop().css({ width: searchWidth, left: ($(window).width() - offsetSearch()) });
    }
}

function positionSearchbar() {
	$("#search").css({left: ($(window).width() - offsetSearch())});
}

function offsetSearch() {
	return ($("#language").find("#lang_fr").length > 0 && $("#language").find("#lang_en").length > 0) ? $("#search_input").is(":visible") ? 529 : 199 : 
		$("#search_input").is(":visible") ? $('#language > div:first-child').is(":hover") ? 529 : 489 : 
		$('#language > div:first-child').is(":hover") ? 199 : 159;
}

function addDropDownLang() {
	var id = $("#language").find("#lang_fr").length > 0 ? "lang_en" : "lang_fr";
	
	$("#language").append("<div id=\"" + id + "\"></div>")
	$("#" + id).append("<span display=\"block\">" + id.substr(5).toUpperCase() + "</span>");
	$("#" + id).append("<div class=\"flag\"></div>");
	langClick();
}

function removeDropDownLang() {
	$("#language > div:nth-child(2)").remove();
}

function changeLang() {
	if ($("#language").find("#lang_fr").length > 0 && $("#language").find("#lang_en").length > 0) {
		$('#language').hover(function() { langHover(); }, function() { langReplace(); }); // Ajouter la fonction hover
		removeDropDownLang(); // Retirer le 2e élément
		langHover();
		
		if (previousLang != lang)
        {
			langReplace();
            previousLang = lang;
        }
	}
	else {
		addDropDownLang();
		langClick();
	}
}

function langHover() {
	$("#language").css({
		height: "100%",
		backgroundColor: "#d4d4d4",
		width: 129
	});
	$("#lang_fr, #lang_en").css({
		height: "100%",
		backgroundColor: "transparent"
	});
	$("#language .flag").css({
		margin: 0,
		right: -61,
		backgroundColor: "#acacac",
		borderColor: "#acacac"
	});
	$("#language > div > span").css({
		display: "block",
		color: "#acacac"
	});
	
    if ($("#search_input").is(":visible"))
        showSearchInput(false);
        
	positionSearchbar();
}

function langClick() {
	langHover();
	$("#language").unbind("mouseenter mouseleave"); // Enlever la fonction hover
	$("#lang_fr, #lang_en").show();
	$("#language").css({
		height: "200%",
		backgroundColor: "rgba(0,0,0,0.4)",
	});
	$("#lang_fr, #lang_en").css({
		height: "50%",
	});
	$("#language .flag").css({
		backgroundColor: "#464646", 
		borderColor: "#464646"
	});
	$("#language > div > span").css({
		color: "#424141"
	});

	$("#lang_fr, #lang_en").hover(function() { 
		$(this).css({ backgroundColor: "rgba(0,0,0,0.1)" });
	}, function() { 
		$(this).css({ backgroundColor: "transparent" });
	});
	$("#language > div:first-child").css({ backgroundColor: "rgba(0,0,0,0.1)" });
	
	positionSearchbar();
}

function langReplace() {
	$("#language").css({
		backgroundColor: "#e7e7e7",
		width: 89
	});
	$("#language .flag").css({
		margin: "0 auto",
		left: "auto",
		right: "auto",
		backgroundColor: "#d4d4d4",
		borderColor: "#d4d4d4"
	});
	$("#language > div > span").css({
		display: "none",
		color: "#acacac"
	});
	
	positionSearchbar();
}

$(function() {
	$('#language').hover(function() { langHover(); }, function() { langReplace(); });
});

function prependLang(id) {
	$("#language").prepend("<div id=\"" + id + "\"></div>")
	$("#" + id).append("<span display=\"block\">" + id.substr(5).toUpperCase() + "</span>");
	$("#" + id).append("<div class=\"flag\"></div>");
}

function addTiles() {
    var tiles = ["restaurant", "bar", "club", "cinema", "attraction", "nature"];
    
    $("body").append("<div id=\"tiles\"></div>")
    for (var i = 0; i < tiles.length; i++) {
        $("#tiles").append("<div id=\"" + tiles[i] + "\"class=\"tile\"></div>")
        $("#" + tiles[i]).append("<span>" + tiles[i].toUpperCase() + "</span>")
        $("#tiles > #" + tiles[i]).css({
            background: " #fff url(images/" + tiles[i] + "_black.png) no-repeat center" 
        });
    }
    
    var tilePos = ($(window).height() + $("#header").height()) / 2 - $("#tiles").height() / 2;
    $("#tiles").css({
        top: tilePos > $("#header").height() ? tilePos : $("#header").height()
    });
}

function removeTiles() {
    $("#tiles").remove();
}

function tileHover() {
    
}

$(document).ready(function(){
    addTiles();
	positionSearchbar();
	$(window).resize(function() {
		positionSearchbar();
        positionMain();
        
        if ($(document).find("#tiles").length > 0) {
            var tilePos = ($(window).height() + $("#header").height()) / 2 - $("#tiles").height() / 2;
            $("#tiles").css({
                top: tilePos > $("#header").height() ? tilePos : $("#header").height()
            });
        }
        
        if ($(window).width() <= 850) {
            
        }
        else {
            
        }
	});
});

function positionMain() {
    var posTop = $("#header").height();
    $("#main").css("top", posTop);
}

$(document).mouseup(function (e) {
	var container = $("#search");
	if (!container.is(e.target) && container.has(e.target).length === 0)
	{
		$("#search_input").hide();
		$("#search_input").stop().css({width: 0});
		$("#search").stop().css({width: 70, left: ($(window).width() - offsetSearch())});
		$("#search > button").stop().css("background", "#e7e7e7 url(images/search.png) no-repeat center");
		$('#search > button').hover(function() { 
			$("#search > button").css("background", "#d4d4d4 url(images/search_hover.png) no-repeat center");
		}, function() { 
			$("#search > button").css("background", "#e7e7e7 url(images/search.png) no-repeat center");
		});
	}
	
	container = $("#language");
	if (!container.is(e.target) && container.has(e.target).length === 0)
	{
		container.hover(function() { langHover(); }, function() { langReplace(); });
		removeDropDownLang(); // Retirer le 2e élément
		langHover(); // S'assurer d'appliquer tout les styles du div à defaut
		langReplace(); // Remettre le div language à son état de base
	}
});

$(document).on('click', "div#lang_fr", function() {
	var id = $("#language > div:nth-child(2)");
	if(id.is("div#lang_fr")) {
		removeDropDownLang();
		prependLang("lang_fr");
        lang = "fr";
	}
	changeLang();
});

$(document).on('click', "div#lang_en", function() {
	var id = $("#language > div:nth-child(2)");
	if(id.is("div#lang_en")) {
		removeDropDownLang();
		prependLang("lang_en");
        lang = "en";
	}
	changeLang();
});

$(document).on('click', "div.tile", function() {
    removeTiles(); // Supprimer les tiles
    createMain("header", $(this).attr('id')); // Créer le MainMenu
    positionSearchbar(); // S'assurer que le bouton de search est à la bonne position
});

$(document).on('click', "#mainHeader > #back", function() {
    removeMain(); // Retirer le Main
    addTiles(); // Ajouter les tiles
    positionSearchbar(); // S'assurer que le bouton de search est à la bonne position
});

$(document).on('click', "#mainHeader > #optionButton", function() {
    if ($("#main").find("#options").length === 0) {
        var text = $("#mainHeader > h1").text();
        var id = (text[text.length - 1].toLowerCase() == 's' ? text.substr(0, text.length - 1) : text).toLowerCase();
        createOptions(id);
    }
    else {
        removeOptions();
    }
});

$(document).on("mouseenter", "#view > div", function() {
    var id = $(this).attr("id");
    if (id != "triangle") 
        $(this).css("background", "#797979 url(images/" + id + "_hover.png) no-repeat center");
});

$(document).on("mouseleave", "#view > div", function() {
    var id = $(this).attr("id");
    if (id != "triangle") 
        $(this).css("background", "#f2f2f2 url(images/" + id + ".png) no-repeat center");
});

$(document).on("click", "#view > div", function() {
    
});

function createMain(insAfter, id) {
    $("#" + insAfter).after("<div id=\"main\"></div>");
    createMainHeader(id);
}

function createMainHeader(id) {
    $("#main").append("<div id=\"mainHeader\"></div>");
    $("#mainHeader").append("<div id=\"back\"></div>");
    
    $("#mainHeader").append("<div id=\"category\"></div>");
    $("#mainHeader > #category").css("background-image", "url(images/" + id + "_small_grey.png)");
    
    var title = id == "nature" ? id : (id + "s");
    $("#mainHeader").append("<h1>" + title.toUpperCase() + "</h1>");
    
    $("#mainHeader").append("<div id=\"optionButton\"></div>");
    alignVertical("mainHeader", "#optionButton", 51);
    
    $("#mainHeader").append("<div class=\"line\"></div>");
    alignVertical("mainHeader", ".line", 32);
    
    $("#mainHeader").append("<div id=\"mediaContainer\" class=\"noselect\"></div>");
    alignVertical("mainHeader", "#mediaContainer", 32);
    
    createMedias("mediaContainer", ["twitter", "facebook", "google+"]);
    
    positionMain();
}

function alignVertical(parentId, elemId, elemHeight) {
    var margins = ($("#" + parentId).height() - elemHeight) / 2;
    $(elemId).css({
       height: elemHeight,
       marginTop: margins,
       marginBottom: margins 
    });
}



function createOptions(id) {
    $("#main").append("<div id=\"options\"></div>");
    createOptionView();
    createOptionFilter(id);
    // Slide to left
    var leftPos = $('#container').scrollLeft();
    $("#container").animate({scrollLeft: leftPos + $("#options").width() + 50}, 100);
}

function createOptionView() {
    $("#options").append("<div id=\"view\"></div>");
    $("#options > #view").append("<div id=\"triangle\"></div>");
    $("#options > #view").append("<span>VIEW</span>");
    
    var viewStyles = ["listView", "tileView"];
    for (var i = 0; i < viewStyles.length; i++) {
        $("#options > #view").append("<div id=\"" + viewStyles[i] + "\"></div>");
        $("#" + viewStyles[i]).css({
           background: "#f2f2f2 url(images/" + viewStyles[i] + ".png) no-repeat center" 
        });
    }
    
    alignVertical("view", "#triangle", 37);
    
    var inputSize = 60;
    var margins = ($("#view").height() - inputSize) / 2;
    $("#view > div").not("div:first").css({
        width: inputSize,
        height: inputSize,
        marginTop: margins,
        marginBottom: margins 
    });
}

function createOptionFilter(id) {
    $("#options").append("<div id=\"filters\"></div>");
    $("#filters").append("<h2>FILTERS</h2>");
    $("#filters").append("<div class=\"line\"></div>");
    addFilter("filters", "first cat", ["1", "2", "3", "4"]);
}

function addFilter(id, category, choices) {
    for (var i = 0; i < choices.length; i++) {
        $("#" + id).append("<input type=\"checkbox\" value=\"" + choices[i] + "\"><span>" + choices[i].toUpperCase() + "</span>");
    }
}

function removeOptions() {
    $("#main #options").remove();
}

function createMedias(id, medias) {
    for (var i = 0; i < medias.length; i++) {
        var name = medias[i] === "google+" ? medias[i].substr(0,6) : medias[i];
        var formattedName = medias[i].substr(0, 1).toUpperCase() + medias[i].substr(1);
        
        $("#mediaContainer").append("<button class=\"media_img\" id=\"" + name + "_img\"></button>");
        $("#mediaContainer").append("<div class=\"media_text\" id=\"" + name + "_text\"></div>");
        $("#" + name + "_text").append("<p>Share on " + formattedName + "</p>");
    }
}

function removeMain() {
    $("#main").remove();
}