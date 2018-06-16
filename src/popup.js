$(function(){
  //url:url_obj.href
  //page:url_obj.origin+url_obj.pathname)
  //domain:url_obj.origin

  $.each(["url","page","domain"],function(_,tar){
    window["g_sm"].get(`except_${tar}`,function(d){
      chrome.tabs.getSelected(null,function(tab) {
        var url_obj = new URL(tab.url);
        var ep_ary = d[`except_${tar}`] || [];
        var luna = "kawaii";

        if(tar=="url") luna = url_obj.href;
        if(tar=="page") luna = url_obj.origin+url_obj.pathname;
        if(tar=="domain") luna = url_obj.origin;

        if(ep_ary.includes(luna)){
          $(`#${tar}_btn`).addClass("pcc_clicked_btn");
        }
      });
    })
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

  function save_url(type,url){
    window["g_sm"].get(type,function(d){
      u_ary = d[type] || [];
      if(u_ary.includes(url)){
        temp = u_ary.filter(v => v != url); //既にあれば削除
        u_ary = temp;//なんかep_ary = ep_ary.filterにすると上手くいかない
      }else{
        u_ary.push(url);
      }
      h = {};
      h[type] = u_ary;
      window["g_sm"].set(h);
    });
  }

});

/*  usage
非同期処理のため、getした値を入力するなどの処理はcallback内で行う
window['g_sm'].set({"hello":"miracle---"},function(){});
window['g_sm'].get("hello",function(d){
  alert(d.hello);
});
*/
