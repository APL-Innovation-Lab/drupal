(function ($,jQuery) {
  $(document).ready(function(){

$('#ask_top').click(function() {
   $('.apl-my-body').toggleClass('active');
/*
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
$([document.documentElement, document.body]).animate({
        scrollTop: $("#block-block-237").offset().top
    }, 1000);
}
*/
});

(function() { var options = {"id":6492,"hash":"9467931c20bf27a0ed2e294d322f132f","base_domain":"v2.libanswers.com","width":"578px","height":"320px","color_backg":"#F8F8F8","color_border":"transparent"}; var cascadeServer = "https:\/\/chat-us.libanswers.com"; var referer = ""; var refererTitle = ""; const embedWidget={config:{},online:!1,loaded:!1,chatContainer:null,referer:"",refererTitle:"",insertWidgetCSS:function(){const id="#"+this.chatContainer.id,css=`/* LibChat Widget CSS */\n        ${id} .lci_chat_load { width: ${this.config.width}; height: ${this.config.height}; background-color: ${this.config.color_backg}; border: 1px solid ${this.config.color_border}; box-sizing: content-box; }\n        ${id} iframe { width: 100%; height: ${this.config.height}; background-color: ${this.config.color_backg}; border: 0px; box-sizing: border-box; }`,head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style");style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css)),head.appendChild(style)},buildIFrame:function(){""===this.referer&&(this.referer=window.location.href),""===this.refererTitle&&window.document.title&&(this.refererTitle=window.document.title);const widgetUrl=`https://${this.config.base_domain}/chati.php?hash=${this.config.hash}&referer=${encodeURIComponent(this.referer)}&referer_title=${encodeURIComponent(this.refererTitle)}`,iframeContainer=document.createElement("div");iframeContainer.classList.add("lci_chat_load");const iframe=document.createElement("iframe");iframe.setAttribute("id","iframe_"+this.config.hash),iframe.setAttribute("name","iframe_"+this.config.hash),iframe.setAttribute("src",widgetUrl),iframe.setAttribute("title","Chat Widget"),iframe.setAttribute("scrolling","no"),iframe.innerHTML="Content is loading...",iframeContainer.appendChild(iframe),this.chatContainer.appendChild(iframeContainer)},start:function(){!0!==this.loaded&&(this.loaded=!0,this.chatContainer=document.querySelector(`#libchat_${this.config.hash}, #libchat_inline_widget, #libchat_d2oi_widget`),null!==this.chatContainer&&(this.insertWidgetCSS(),this.buildIFrame()))}};embedWidget.config=options,embedWidget.referer=referer,embedWidget.refererTitle=refererTitle,"complete"===document.readyState||"interactive"===document.readyState?embedWidget.start():(document.addEventListener("DOMContentLoaded",embedWidget.start.bind(embedWidget),!1),window.addEventListener("load",embedWidget.start.bind(embedWidget),!1));})();

});
})(jQuery);