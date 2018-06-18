//exceptに含まれてなければコールバックを実行
function act_on(callback){
  window["g_sm"].get(`except_all`,function(a){
    if(a.except_all) return;
    var is_color = true;
    window["g_sm"].get("except_url",function(u){
      window["g_sm"].get("except_page",function(p){
        window["g_sm"].get("except_domain",function(d){
          var url_obj = new URL(location.href);
          var u_ary = u.except_url || []
          var p_ary = p.except_page || []
          var d_ary = d.except_domain || []
          if(u_ary.includes(url_obj.href)) return;
          if(p_ary.includes(url_obj.origin+url_obj.pathname)) return;
          if(d_ary.includes(url_obj.origin)) return;
          callback();
        });
      });
    });
  });
}


function change_color(){
  act_on(function(){
    //これでブラウザの画面の色変え
    window["g_sm"].get("text_color",function(t){
      if(t.text_color) $("*").css("color",`#${t.text_color}`);
    });
    window["g_sm"].get("bg_color",function(t){
      if(t.bg_color){
         $("*").css("background-color",`#${t.bg_color}`);
         $("div").css("background-color",`#${t.bg_color}`);
         $("li").css("background-color",`#${t.bg_color}`);
       }
    });
    window["g_sm"].get("link_color",function(t){
      if(t.link_color) $("a:link").css("color","#"+t.link_color);
    });
  });
}

$(function(){
  //ページ移動時に実行
  change_color();
  //メッセージリスナー
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.name == "change_color"){
      change_color();
    }
  });

  act_on(function(){
    //DOMの変更を検知、追加要素に色を反映する
    var observer = new MutationObserver(function (MutationRecords, MutationObserver) {
      change_color();
    });
    observer.observe($("body").get(0), {childList:true,subtree:true});
  });

});
