$(function(){
  //url:url_obj.href
  //page:url_obj.origin+url_obj.pathname)
  //domain:url_obj.origin

  $("body").on("change","#text_color_input",function(){
    window["g_sm"].set({text_color:$(this).val()});
  });

  $("body").on("change","#bg_color_input",function(){
    window["g_sm"].set({bg_color:$(this).val()});
  });

  $("body").on("change","#link_color_input",function(){
    window["g_sm"].set({link_color:$(this).val()});
  });

  $("body").on("click","#url_btn",function(){
    chrome.tabs.getSelected(null,function(tab) {
      var tem = new URL(tab.url)
      save_url("except_url",tem.href);
    });
  });

  $("body").on("click","#page_btn",function(){
    chrome.tabs.getSelected(null,function(tab) {
      var tem = new URL(tab.url)
      save_url("except_page",tem.origin+tem.pathname);
    });
  });

  $("body").on("click","#domain_btn",function(){
    chrome.tabs.getSelected(null,function(tab) {
      var tem = new URL(tab.url)
      save_url("except_domain",tem.origin);
    });
  });

  $("body").on("click","#all_btn",function(){
    window["g_sm"].get("except_all",function(d){
      var tem = d.except_all || false;
      var h = {};
      h["except_all"] = !tem;
      window["g_sm"].set(h);
      $("#debug").text("OK! If not change,refresh page.")
    });
  });

  function save_url(type,url){
    window["g_sm"].get(type,function(d){
      u_ary = d[type] || [];
      if(u_ary.includes(url)){
        temp = u_ary.filter(v => v != url); //既にあれば削除
        u_ary = temp;//なんかep_ary = ep_ary.filterにすると上手くいかない
      }else{
        u_ary.push(url);
      }
      var h = {};
      h[type] = u_ary;
      window["g_sm"].set(h);
    });
    $("#debug").text("OK! If not change,refresh page.")
  }

});

/*  usage
非同期処理のため、getした値を入力するなどの処理はcallback内で行う
window['g_sm'].set({"hello":"miracle---"},function(){});
window['g_sm'].get("hello",function(d){
  alert(d.hello);
});
*/
