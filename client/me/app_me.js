webpackJsonp([0],{2:function(o,n,e){"use strict";e(0),e(1),$(function(){$(document).on("click",".section__open-post",function(o){var n=$(this).closest(".fp-tableCell").find(".section__post");n.hasClass("section__post--open")?($.fn.fullpage.setAllowScrolling(!0),n.removeClass("section__post--open")):($.fn.fullpage.setAllowScrolling(!1),n.addClass("section__post--open"))}),$(document).on("click",".section__down",function(){$.fn.fullpage.moveSectionDown()})})}},[2]);