/*
TO DO
Ligne 54-56 - Problème d'affichage lorsqu'on clique sur la 2e langue / Détecter quelle langue est cliquée







*/
var previousLang = "fr";
var lang = "fr";

function search() {
	if ($("#search_input").is(":hidden")) {
		$("#search_input").show();
		$("#search > button").unbind("mouseenter mouseleave"); // Enlever la fonction hover
		$("#search_input").animate({width: 330}, 200, "linear");
		$("#search").animate({width: 400, left: ($(window).width() - offsetSearch())}, 200, "linear");
		$("#search > button").css("background", "#525252 url(images/search_active.png) no-repeat center");
	}
	else {
		
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
	
    if ($("#search_input").is(":visible")) {
		$("#search_input").stop().css({ width: 330 });
		$("#search").stop().css({ width: 400, left: ($(window).width() - offsetSearch()) });
    }
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

$(document).ready(function(){
	$(window).resize(function() {
		positionSearchbar();
	});
});

$(function() {
	$('#language').hover(function() { langHover(); }, function() { langReplace(); });
});

$(document).mouseup(function (e) {
	var container = $("#search");
	if (!container.is(e.target) && container.has(e.target).length === 0)
	{
		$("#search_input").hide();
		$("#search_input").css({width: 0});
		$("#search").css({width: 70, left: ($(window).width() - offsetSearch())});
		$("#search > button").css("background", "#e7e7e7 url(images/search.png) no-repeat center");
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

function prependLang(id) {
	$("#language").prepend("<div id=\"" + id + "\"></div>")
	$("#" + id).append("<span display=\"block\">" + id.substr(5).toUpperCase() + "</span>");
	$("#" + id).append("<div class=\"flag\"></div>");
}

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








