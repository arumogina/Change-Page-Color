//ポップアップを開いたときに実行される初期化処理
$(function(){

  window["g_sm"].get("text_color",function(t){
    $("#text_color_input").val(t.text_color);
    $("#text_color_input").css("background-color","#"+t.text_color);
  });

  window["g_sm"].get("bg_color",function(t){
    $("#bg_color_input").val(t.bg_color);
    $("#bg_color_input").css("background-color","#"+t.bg_color);
  });

  window["g_sm"].get("link_color",function(t){
    $("#link_color_input").val(t.link_color);
    $("#link_color_input").css("background-color","#"+t.link_color);
  });

  //url:url_obj.href
  //page:url_obj.origin+url_obj.pathname)
  //domain:url_obj.origin
  //ポップアップを開いたとき,クリック済みのURLのボタンの色を変える処理
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

  window["g_sm"].get(`except_all`,function(d){
    if(d.except_all) $("#all_btn").addClass("pcc_clicked_btn");
  });

});
